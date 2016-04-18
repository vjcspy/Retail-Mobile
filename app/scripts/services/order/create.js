/**
 * Created by vjcspy on 18/04/2016.
 */

app.service('OrderService', ['$http', 'lodash', function ($http, _) {

  var storeId, paymentMethod, shippingMethod, customerData, customerAdd;

  /*setter*/
  this.setStoreId = function (d) {
    storeId = d;
  };
  this.setPaymentMethod = function (d) {
    paymentMethod = d;
    return this;
  };
  this.setShippingMethod = function (d) {
    shippingMethod = d;
    return this;
  };
  this.setCustomerData = function (d) {
    customerData = d;
    return this;
  };
  this.setCustomerAdd = function (d) {
    customerAdd = d;
    return this;
  };

  this.getCustomer = function () {
    return customerData;
  };

  this.getCustomerAddress = function () {
    return customerAdd;
  }

}]);
