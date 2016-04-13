/**
 * Created by vjcspy on 10/04/2016.
 */
app.controller('HomeCtrl',
  ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$indexedDB', '$log', 'lodash', 'toastr', '$translate', 'cfpLoadingBar', '$timeout', 'pullService', '$rootScope', '$q', '$state',
    function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $indexedDB, $log, lodash, toastr, $translate, cfpLoadingBar, $timeout, pullService, $rootScope, $q, $state) {
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
      pullService.setScope($scope);
      pullService.pullDataFromSV();

      /*bat su kien chuyen state*/
      $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
          if (toState.hasOwnProperty('name') && toState.name == 'app.home') {
            pullService.pullDataFromSV();
          }
        });

      /*FUNCTION IN VIEW*/
      /*Clear indexedDB*/
      $scope.clearDataIndexedDB = function () {
        pullService.renewAllData().then(function () {
          $translate('DELETE_DATABASE_SUCCESS').then(function (t) {
            toastr.success(t);
            $state.go($state.current, {}, {reload: true});
          });
        })
      };
      /*Reload product*/
      $scope.reloadProduct = function () {
        pullService.renewDataByType('products');
      };
      /*Reload Customer*/
      $scope.reloadCustomer = function () {
        pullService.renewDataByType('customers');
      };
      $scope.reloadSalesRule = function () {
        $scope.HomeCtrl.model.percentSalesRule = 0;
        $timeout(function () {
          $scope.HomeCtrl.model.percentSalesRule = 100;
        }, 200);
      };
      $scope.reloadAnotherData = function () {
        $scope.HomeCtrl.model.percentAnotherData = 0;
        $timeout(function () {
          $scope.HomeCtrl.model.percentAnotherData = 100;
        }, 200);
      }
    }
  ]);
