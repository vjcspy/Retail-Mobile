/**
 * Created by vjcspy on 09/04/2016.
 */
app.controller('AppCtrl', ['$scope', '$ionicHistory', '$ionicNavBarDelegate', '$ionicLoading', '$izTranslate', '$translate', 'appConfigData', '$state',
  function ($scope, $ionicHistory, $ionicNavBarDelegate, $ionicLoading, $izTranslate, $translate, appConfigData, $state) {
    $scope.AppCtrl = {};
    $scope.AppCtrl.data = {};
    // get current language, if it save before
    appConfigData.getConfig('app_language').then(function (o) {
      $scope.AppCtrl.data.language = o;
      if (!o)
        $scope.AppCtrl.data.language = 'en';
      $izTranslate.changeLanguage($scope.AppCtrl.data.language);
    });
    appConfigData.getConfig('loading_type').then(function (o) {
      if (!o)
        o = 'android';
      $scope.AppCtrl.data.iconLoading = o;
    });

    /*Nav-bar function*/
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.showBackButton = function () {
      $ionicNavBarDelegate.showBackButton(true);
    };

    /*iz-translate*/
    $izTranslate.addModules('home');


    /*Loading */
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

    /*direct to loading page when not have data*/
    $scope.AppCtrl.data.pullFullData = false;
    if ($scope.AppCtrl.data.pullFullData) {
      $state.go('app.home');
    }
  }]);
