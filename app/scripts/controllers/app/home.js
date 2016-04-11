/**
 * Created by vjcspy on 10/04/2016.
 */
app.controller('HomeCtrl',
  ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$indexedDB', '$log', 'lodash', 'toastr', '$translate', 'cfpLoadingBar', '$timeout',
    function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $indexedDB, $log, lodash, toastr, $translate, cfpLoadingBar, $timeout) {
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

      $scope.HomeCtrl = {};
      $scope.HomeCtrl.data = {};
      $scope.HomeCtrl.model = {};

      /**/
      $scope.clearDataIndexedDB = function () {
        var req = indexedDB.deleteDatabase('izIndexedDB');
        req.onsuccess = function () {
          $translate('DELETE_DATABASE_SUCCESS').then(function (t) {
            toastr.success(t);
          });
        };
        req.onerror = function () {
          $translate('DELETE_ERROR').then(function (t) {
            toastr.error(t, 'Error');
          });
        };
        req.onblocked = function () {
          $translate('DELETE_BLOCK').then(function (t) {
            toastr.error(t, 'Error');
          });
        };
      };

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
    }]);
