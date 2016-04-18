/**
 * Created by vjcspy on 18/04/2016.
 */
app.controller('ChooseCustomerCtrl', ['$scope', 'customerService', 'lodash', '$timeout', '$ionicPlatform', 'toastr', 'OrderService', '$state',
  function ($scope, customerService, _, $timeout, $ionicPlatform, toastr, OrderService, $state) {
    $scope.ChooseCustomerCtrl = {};
    $scope.ChooseCustomerCtrl.data = {};
    $scope.ChooseCustomerCtrl.model = {};

    customerService.getAllCustomers().then(function (cus) {
      $scope.ChooseCustomerCtrl.data.customers = cus;
    });
    $scope.selectCustomer = function () {
      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.close();
        }
      });
      $scope.showLoadingData();

      /*FIND CUSTOMER address and Orders*/
      $timeout(function () {
        var defaultShipping = $scope.ChooseCustomerCtrl.model.customer.default_shipping;
        $scope.ChooseCustomerCtrl.model.customerAdd = _.find($scope.ChooseCustomerCtrl.model.customer.address, {
          'entity_id': defaultShipping,
          'is_active': "1"
        });
        $scope.hideLoadingData();
      }, 700);
    };

    $scope.chooseCustomer = function () {
      OrderService.setCustomerData($scope.ChooseCustomerCtrl.model.customer);
      OrderService.setCustomerAdd($scope.ChooseCustomerCtrl.model.customerAdd);
      $state.go('app.choose-customer.create');
    }
  }]);
