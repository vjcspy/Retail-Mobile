/**
 * Created by vjcspy on 10/04/2016.
 */

app.controller('ConfigurationCtrl', ['$scope', '$log', 'ionicMaterialMotion', '$timeout', function ($scope, $log, ionicMaterialMotion, $timeout) {

  ionicMaterialMotion.pushDown({
    selector: '.push-down'
  });
  ionicMaterialMotion.fadeSlideInRight({
    selector: '.animate-fade-slide-in .item'
  });

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
    ]
  };

  $scope.changeLoadingType = function () {
    $scope.$parent.showLoadingData();
    $timeout(function () {
      $scope.$parent.hideLoadingData();
    }, 1000);
  }
}]);
