/**
 * Created by vjcspy on 18/04/2016.
 */
var orders = angular.module('izOrder', []);

orders
  .service('OrderService', ['$http', 'lodash', '$q', 'OrderItemService', 'OrderAddressService', 'urlManagement', 'toastr', 'appConfigData',
    function ($http, _, $q, OrderItemService, OrderAddressService, urlManagement, toastr, appConfigData) {

      var storeId, customerData, customerAdd;
      var shippingAmount = 0;
      var shippingMethod = 'xpos_shipping';
      var paymentMethod = 'xpayment_dummy1';
      var paymentAmount = 0;

      var totals = {};

      /*GETTER/SETTER*/
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

      this.setShippingAmount = function (d) {
        shippingAmount = d;
        return this;
      };

      this.getCustomer = function () {
        return customerData;
      };

      this.getCustomerAddress = function () {
        return customerAdd;
      };
      this.totals = function () {
        return totals;
      };
      /*END GETTER/SETTER*/


      var cart = [];
      this.addProductToCart = function (product) {
        if (product.type_id == 'simple') {
          var existed = _.find(cart, {'id': product.id});

          if (!existed) {
            product.buyQty = 1;
            cart.push(product);
          }
          else {
            var k;
            $.each(cart, function (key, value) {
              if (value.id == product.id) {
                k = key;
                return false;
              }
            });
            cart[k].buyQty++;
          }
        }
        return cart;
      };

      this.removeItem = function (product_id) {
        var k = null;
        _.forEach(cart, function (value, key) {
          if (value.id == product_id) {
            k = key;
            return false;
          }
        });
        if (k != null)
          cart.splice(k, 1);

      };

      this.cart = function () {
        return cart;
      };

      this.loadBlock = function (isSaveOrder) {
        var defer = $q.defer();
        var data = {};

        data.items = OrderItemService.getItems(cart);
        data.customer_id = customerData.id;
        data.store_id = 1
        data.order = {};
        data.order.billing_address = OrderAddressService.getBillingAddress(customerAdd);
        data.order.shipping_address = OrderAddressService.getShippingAddress(customerAdd);
        data.order.payment_method = paymentMethod;
        if (paymentMethod == 'xretail_multiple_payment') {
          data.payment_data = {};
          data.payment_data.xpayment_dummy1 = paymentAmount;
        }
        if (paymentMethod == 'xpayment_dummy1' && paymentMethod.hasOwnProperty('payment_data'))
          delete data.payment_data;
        data.order.shipping_method = shippingMethod;
        data.order.shipping_amount = shippingAmount;

        appConfigData.getConfig('website_url').then(function (websiteUrl) {

          var url;
          if (isSaveOrder === true)
            url = websiteUrl + urlManagement.getUrl('create_order');
          else
            url = websiteUrl + urlManagement.getUrl('load_block');

          $http.post(url, data).then(function (response) {
            totals = response.data.totals;
            return defer.resolve(response);
          }, function (reject) {
            if (reject.data.hasOwnProperty('error') && reject.data.error == true) {
              toastr.error(reject.data.message);
              return defer.reject(reject);
            }
          });
        });

        return defer.promise;
      };

    }])
  .service('OrderItemService', ['lodash', function (_) {
    this.getItems = function (cart) {
      var items = [];
      _.forEach(cart, function (value, key) {
        if (typeof value == 'undefined')
          return false;

        var currentItem = {};
        currentItem.qty = value.buyQty;
        if (value.customPrice != value.price)
          currentItem.custome_price = value.customePrice;
        if (value.discountPerItem)
          currentItem.discount_per_items = value.discountPerItem;
        currentItem.product_id = value.id;
        items.push(currentItem);
      });
      return items;
    }
  }])
  .service('OrderAddressService', ['lodash', function (_) {
    this.getBillingAddress = function (customer) {
      var billingData = {};
      // 'firstname'  => 'Jack',
      //   'lastname'   => 'Fitz',
      //   'street'     =>
      // array(
      //   0 => '7NWillowSt',
      // ),
      // 'city'       => 'Montclair',
      //   'country_id' => 'US',
      //   'region_id'  => '41',
      //   'region'     => 'NewJersey',
      //   'postcode'   => '07042',
      //   'telephone'  => '222-555-4190',
      billingData.city = customer.city;
      billingData.country_id = customer.country_id;
      billingData.region_id = customer.region_id;
      billingData.region = customer.region;
      billingData.postcode = customer.postcode;
      billingData.firstname = customer.firstname;
      billingData.lastname = customer.lastname;
      billingData.street = customer.street;
      billingData.telephone = customer.telephone;
      return billingData;
    };
    this.getShippingAddress = function (customer) {
      var shippingData = {};
      shippingData.city = customer.city;
      shippingData.country_id = customer.country_id;
      shippingData.region_id = customer.region_id;
      shippingData.region = customer.region;
      shippingData.postcode = customer.postcode;
      shippingData.firstname = customer.firstname;
      shippingData.lastname = customer.lastname;
      shippingData.street = customer.street;
      shippingData.telephone = customer.telephone;
      return shippingData;
    }
  }]);
