/**
 * Created by vjcspy on 09/04/2016.
 */
app.controller('AppCtrl', ['$scope', '$ionicHistory', '$ionicNavBarDelegate', '$ionicLoading', function ($scope, $ionicHistory, $ionicNavBarDelegate, $ionicLoading) {
  $scope.AppCtrl = {};
  $scope.AppCtrl.data = {
    iconLoading: 'android'
  };

  $scope.goBack = function () {
    $ionicHistory.goBack();
  };
  $scope.showBackButton = function () {
    $ionicNavBarDelegate.showBackButton(true);
  };

  $scope.showLoadingData = function () {
    $ionicLoading.show({
      template: '<ion-spinner icon="' + $scope.AppCtrl.data.iconLoading + '"></ion-spinner>'
    });
  };
  $scope.hideLoadingData = function () {
    $ionicLoading.hide();
  };

  ////////////////////////////////////////
  // Layout Methods
  ////////////////////////////////////////

  $scope.hideNavBar = function () {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
  };

  $scope.showNavBar = function () {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
  };

  $scope.noHeader = function () {
    var content = document.getElementsByTagName('ion-content');
    for (var i = 0; i < content.length; i++) {
      if (content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }
  };

  $scope.setExpanded = function (bool) {
    $scope.isExpanded = bool;
  };

  $scope.setHeaderFab = function (location) {
    var hasHeaderFabLeft = false;
    var hasHeaderFabRight = false;

    switch (location) {
      case 'left':
        hasHeaderFabLeft = true;
        break;
      case 'right':
        hasHeaderFabRight = true;
        break;
    }

    $scope.hasHeaderFabLeft = hasHeaderFabLeft;
    $scope.hasHeaderFabRight = hasHeaderFabRight;
  };

  $scope.hasHeader = function () {
    var content = document.getElementsByTagName('ion-content');
    for (var i = 0; i < content.length; i++) {
      if (!content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }

  };

  $scope.hideHeader = function () {
    $scope.hideNavBar();
    $scope.noHeader();
  };

  $scope.showHeader = function () {
    $scope.showNavBar();
    $scope.hasHeader();
  };

  $scope.clearFabs = function () {
    var fabs = document.getElementsByClassName('button-fab');
    if (fabs.length && fabs.length > 1) {
      fabs[0].remove();
    }
  };
}]);
