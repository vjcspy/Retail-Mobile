/**
 * Created by vjcspy on 10/04/2016.
 */
app.controller('HomeCtrl',
  function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $indexedDB, $log, lodash) {
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
    $scope.reloadProduct = function () {
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
    };
  });
