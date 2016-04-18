/**
 * Created by vjcspy on 18/04/2016.
 */
app.controller('CreateOrderCtrl', ['$scope', 'customerService', 'lodash', '$timeout', '$ionicPlatform', 'toastr', 'OrderService', '$state',
  function ($scope, customerService, _, $timeout, $ionicPlatform, toastr, OrderService, $state) {
    $scope.CreateOrderCtrl = {};
    $scope.CreateOrderCtrl.data = {};
    $scope.CreateOrderCtrl.model = {};

    customerService.getAllCustomers().then(function (cus) {
      $scope.CreateOrderCtrl.data.customers = cus;
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
        var defaultShipping = $scope.CreateOrderCtrl.model.customer.default_shipping;
        $scope.CreateOrderCtrl.model.customerAdd = _.find($scope.CreateOrderCtrl.model.customer.address, {
          'entity_id': defaultShipping,
          'is_active': "1"
        });
        $scope.hideLoadingData();
      }, 700);
    };

    $scope.chooseCustomer = function () {
      OrderService.setCustomerData($scope.CreateOrderCtrl.model.customer);
      OrderService.setCustomerAdd($scope.CreateOrderCtrl.model.customerAdd);
      $state.go('app.order.create');
    }
  }]);
