/**
 * Created by vjcspy on 10/04/2016.
 */

app.controller('ConfigurationCtrl', ['$scope', '$log', 'ionicMaterialMotion', '$timeout', '$izTranslate', 'appConfigData', '$translate', '$ionicNavBarDelegate',
  function ($scope, $log, ionicMaterialMotion, $timeout, $izTranslate, appConfigData, $translate, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBar(false);
    // ionicMaterialMotion.pushDown({
    //   selector: '.push-down'
    // });
    // ionicMaterialMotion.fadeSlideInRight({
    //   selector: '.animate-fade-slide-in .item'
    // });

    $scope.ConfigurationCtrl = {};

    $scope.ConfigurationCtrl.model = {};

    $scope.ConfigurationCtrl.data = {
      loadingType: [
        {label: 'android', value: 'android'},
        {label: 'ios', value: 'ios'},
        {label: 'ios-small', value: 'ios-small'},
        {label: 'bubbles', value: 'bubbles'},
        {label: 'circles', value: 'circles'},
        {label: 'crescent', value: 'crescent'},
        {label: 'dots', value: 'dots'},
        {label: 'lines', value: 'lines'},
        {label: 'ripple', value: 'ripple'},
        {label: 'spiral', value: 'spiral'}
      ],
      languages: $izTranslate.getLanguagesSupport()
    };

    $translate('CONFIG_TILE_GENERAL').then(function (t) {
      $scope.ConfigurationCtrl.data.title = t;
    });

    $scope.changeConfig = function (configName, configValue) {
      appConfigData.saveConfig(configName, configValue);
    }
  }]);
