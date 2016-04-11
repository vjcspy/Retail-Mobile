/**
 * Created by vjcspy on 10/04/2016.
 */

app.controller('GeneralCtrl', ['$scope', '$log', 'ionicMaterialMotion', '$timeout', '$izTranslate', 'appConfigData', '$translate', '$ionicNavBarDelegate',
  function ($scope, $log, ionicMaterialMotion, $timeout, $izTranslate, appConfigData, $translate, $ionicNavBarDelegate) {
    // $ionicNavBarDelegate.showBar(false);

    $scope.changeLoadingType = function () {
      $scope.$parent.showLoadingData();
      $timeout(function () {
        $scope.$parent.hideLoadingData();
      }, 1000);

      appConfigData.saveConfig('loading_type', $scope.$parent.AppCtrl.data.iconLoading);
    };

    $scope.changeLanguage = function () {
      $izTranslate.changeLanguage($scope.$parent.AppCtrl.data.language);
      appConfigData.saveConfig('app_language', $scope.$parent.AppCtrl.data.language);
    };
  }]);
