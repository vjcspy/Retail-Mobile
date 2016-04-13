/**
 * Created by vjcspy on 13/04/2016.
 */
app.controller('SearchCustomerCtrl', ['$scope', 'customerService', 'lodash', '$timeout', function ($scope, customerService, _, $timeout) {

  $scope.SearchCustomerCtrl = {};
  $scope.SearchCustomerCtrl.data = {};
  $scope.SearchCustomerCtrl.model = {};

  customerService.getAllCustomers().then(function (cus) {
    $scope.SearchCustomerCtrl.data.customers = cus;
  });
  $scope.toppings = [
    {name: 'Active', wanted: true},
  ];
  $scope.selectCustomer = function () {
    $scope.showLoadingData();
    $timeout(function () {
      var defaultShipping = $scope.SearchCustomerCtrl.model.customer.default_shipping;
      $scope.SearchCustomerCtrl.model.customerAdd = _.find($scope.SearchCustomerCtrl.model.customer.address, {
        'entity_id': defaultShipping,
        'is_active': "1"
      });
      $scope.hideLoadingData();
    }, 500);
  }

}]);
