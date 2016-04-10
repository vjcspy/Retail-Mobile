/**
 * Created by vjcspy on 09/04/2016.
 */
app.controller('AppCtrl', ['$scope', '$ionicHistory', '$ionicNavBarDelegate', function ($scope, $ionicHistory, $ionicNavBarDelegate) {
  $scope.goBack = function () {
    $ionicHistory.goBack();
  };
  $scope.showBackButton = function () {
    $ionicNavBarDelegate.showBackButton(true);
  };
}]);
