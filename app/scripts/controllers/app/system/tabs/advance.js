/**
 * Created by vjcspy on 10/04/2016.
 */

app.controller('AdvanceConfigCtrl', ['$scope', '$log', 'ionicMaterialMotion', 'toastr', 'appConfigData', '$translate', '$ionicNavBarDelegate', '$indexedDB',
  function ($scope, $log, ionicMaterialMotion, toastr, appConfigData, $translate, $ionicNavBarDelegate, $indexedDB) {
    // $ionicNavBarDelegate.showBar(false);

    $scope.clearAppData = function () {
      $indexedDB.deleteDatabase().then(function () {
        $translate('DELETE_DATABASE_SUCCESS').then(function (t) {
          toastr.success(t);
        });
      })
    }
  }]);
