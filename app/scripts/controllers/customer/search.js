/**
 * Created by vjcspy on 13/04/2016.
 */
'use strict';
app.controller('SearchCustomerCtrl', ['$scope', 'customerService', 'lodash', '$timeout', '$ionicPlatform', 'toastr',
  function ($scope, customerService, _, $timeout, $ionicPlatform, toastr) {

    $scope.SearchCustomerCtrl = {};
    $scope.SearchCustomerCtrl.data = {};
    $scope.SearchCustomerCtrl.model = {};

    customerService.getAllCustomers().then(function (cus) {
      $scope.SearchCustomerCtrl.data.customers = cus;
    });
    $scope.toppings = [
      {name: 'Active', wanted: true}
    ];

    var customerInfoPanelElem = $('.customerInfoPanel');

    $scope.selectCustomer = function () {
      customerInfoPanelElem.click().focus();
      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.close();
        }
      });
      $scope.showLoadingData();

      /*FIND CUSTOMER address and Orders*/
      $timeout(function () {
        var defaultShipping = $scope.SearchCustomerCtrl.model.customer.default_shipping;
        $scope.SearchCustomerCtrl.model.customerAdd = _.find($scope.SearchCustomerCtrl.model.customer.address, {
          'entity_id': defaultShipping,
          'is_active': "1"
        });
        customerService.getOrdersByCustomerId($scope.SearchCustomerCtrl.model.customer.id).then(function (data) {
          $scope.SearchCustomerCtrl.model.customerOrders = data;
          $scope.hideLoadingData();
        }, function (rej) {
          toastr.error(rej);
        });

      }, 500);

    }

  }]);
