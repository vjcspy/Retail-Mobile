/**
 * Created by vjcspy on 10/04/2016.
 */
app.controller('HomeCtrl',
  ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$indexedDB', '$log', 'lodash', 'toastr', '$translate', 'cfpLoadingBar', '$timeout', 'pullService', 'isLoadFull', '$rootScope', '$q',
    function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $indexedDB, $log, lodash, toastr, $translate, cfpLoadingBar, $timeout, pullService, isLoadFull, $rootScope, $q) {
      var startAnimate = function () {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
          selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
          selector: '.animate-fade-slide-in .item'
        });
      };
      startAnimate();

      /*Data Controller*/
      $scope.HomeCtrl = {};
      $scope.HomeCtrl.data = {
        percentProduct: 0,
        percentCustomer: 0,
        percentSalesRule: 0,
        percentAnotherData: 0
      };
      $scope.HomeCtrl.model = {};

      /*PULL DATA*/
      var pullDataByType = function (type, defer) {
        var dataPullingByType = pullService.getPullData(type);
        dataPullingByType.then(function (dataPull) {
          /*Kiem tra dieu kien dung cua vong lap nay neu pull full data*/
          if (!dataPull || (dataPull.hasOwnProperty('isPullFull') && dataPull.isPullFull == false)) {
            console.log(dataPull);
            // lấy page hiện tại nếu đang pull dở
            if (dataPull.hasOwnProperty('currentPage'))
              var page = dataPull.currentPage + 1;
            else
              page = 1;

            pullService.pullDataByPage(type, page).then(function (ok) {
              setPercentLoading(type, {
                percent: (ok.totalSave / ok.res.data.total_count) * 100,
                totalCount: ok.res.data.total_count,
                totalSave: ok.totalSave
              });
              return pullDataByType(type, defer);
            }, function (rej) {
              toastr.error(rej);
              return defer.reject(rej);
            });
          }
          if (dataPull.hasOwnProperty('isPullFull') && dataPull.isPullFull === true) {
            setPercentLoading(type, {
              percent: 100,
              totalCount: dataPull.totalCount,
              totalSave: dataPull.totalSave
            });
            return defer.resolve('PULL_FULL_TYPE');
          }
        });

        return defer.promise;
      };
      var setPercentLoading = function (type, data) {
        $timeout(function () {
          switch (type) {
            case 'customer':
              $scope.HomeCtrl.model.percentCustomer = data.percent;
              $scope.HomeCtrl.model.percentCustomerDetail = data.totalSave + '/' + data.totalCount;
              break;
            case 'product':
              $scope.HomeCtrl.model.percentProduct = data.percent;
              $scope.HomeCtrl.model.percentProductDetail = data.totalSave + '/' + data.totalCount;
              break;
            case 'salesRule':
              $scope.HomeCtrl.model.percentSalesRule = data.percent;
              break;
            case 'anotherData':
              $scope.HomeCtrl.model.percentAnotherData = data.percent;
              break;
          }
        }, 100);
      };
      var pullDataFromSV = function () {
        if (!isLoadFull && isLoadFull != 'NOT_HAVE_INFORMATION') {
          //pull customer
          var productDefer = $q.defer();
          pullDataByType('product', productDefer).then(function () {
            var customerDefer = $q.defer();
            pullDataByType('customer', customerDefer).then(function () {
              setPercentLoading('salesRule', {percent: 100});
              setPercentLoading('anotherData', {percent: 100});
            })
          }, function (rej) {
            console.log(rej);
          });
        }
      };
      pullDataFromSV();

      /*bat su kien chuyen state*/
      $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
          if (toState.hasOwnProperty('name') && toState.name == 'app.home') {
            pullDataFromSV();
          }
        });

      /*FUNCTION IN VIEW*/
      /*Clear indexedDB*/
      $scope.clearDataIndexedDB = function () {
        // var req1 = indexedDB.deleteDatabase('izIndexedDB');
        var req = $indexedDB.deleteDatabase().then(function (res) {
          $translate('DELETE_DATABASE_SUCCESS').then(function (t) {
            toastr.success(t);
          });
        }, function (err) {
          $translate('DELETE_BLOCK').then(function (t) {
            toastr.error(t, 'Error');
          });
        });
      };
      /*Reload product*/
      $scope.reloadProduct = function () {
        // cfpLoadingBar.start();
        $indexedDB.openStore('people', function (store) {
          store.insert({"name": "John " + lodash.random(0, 100), "age": 57}).then(function (res) {
            $log.info(res);
          }, function (err) {
            $log.info(err);
          });
          store.getAll().then(function (people) {
            // Update scope
            $scope.HomeCtrl.model.percentProduct = people.length;
            // $log.info(people);
          });
        });
        // $timeout(function () {
        //   cfpLoadingBar.complete();
        // }, 2000);
      };
      /*Reload Customer*/
      $scope.reloadCustomer = function () {
        pullService.pullCustomer();
      };
      $scope.testGetData = function () {
        console.log('here');
        $indexedDB.openStore('products', function (product) {
          product.find(1).then(function (data) {
            console.log(data);
          }, function (err) {
            console.log(err);
          })
        })
      }
    }]);
