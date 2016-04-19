/**
 * Created by vjcspy on 18/04/2016.
 */
app.controller('CreateOrderCtrl', ['$scope', '$state', 'OrderService', 'productService', '$ionicPopup',
  function ($scope, $state, OrderService, productService, $ionicPopup) {

    $scope.CreateOrderCtrl = {
      data: {},
      model: {}
    };
    var customer = OrderService.getCustomer();

    if (OrderService.getCustomer()) {
      $scope.CreateOrderCtrl.model.customer = OrderService.getCustomer();
      $scope.CreateOrderCtrl.model.customerAdd = OrderService.getCustomerAddress();
    } else
      $state.go('app.choose-customer');

    $scope.refreshProducts = function (searchText) {
      if (searchText.length >= 3)
        productService.searchProducts(searchText).then(function (productList) {
          $scope.CreateOrderCtrl.data.products = productList;
        });
      else
        return $scope.CreateOrderCtrl.data.products = [{name: 'Enter more than 3 characters', sku: ''}];
    };

    $scope.openBarcode = function () {
      $ionicPlatform.ready(function () {
        if (typeof cordova == 'undefined')
          toastr.error("UNDEFINED");
        else {
          cordova.plugins.barcodeScanner.scan(
            function (result) {
              var searchText = parseInt(result.text);
              toastr.success(searchText);
              productService.searchProducts(searchText).then(function (productList) {
                if (productList.length >= 1) {
                  $scope.CreateOrderCtrl.model.product = productList[0];
                }
              });
              // toastr.success("We got a barcode\n" +
              //   "Result: " + result.text + "\n" +
              //   "Format: " + result.format + "\n" +
              //   "Cancelled: " + result.cancelled);
            },
            function (error) {
              toastr.error("Scanning failed: " + error);
            }
          );
        }
      });
    };

    $scope.changeCustomer = function () {
      $state.go('app.choose-customer');
    };
    $scope.changeShippingAmount = function () {
      $scope.showLoadingData();
      OrderService.setShippingAmount($scope.CreateOrderCtrl.model.shippingAmount);
      OrderService.loadBlock().then(function () {
        $scope.CreateOrderCtrl.model.totals = OrderService.totals();
        $scope.hideLoadingData();
      }, function () {
        $scope.hideLoadingData();
      });
    };
    $scope.addToCart = function () {
      $scope.showLoadingData();
      OrderService.addProductToCart($scope.CreateOrderCtrl.model.product);
      OrderService.loadBlock().then(function () {
        $scope.CreateOrderCtrl.model.totals = OrderService.totals();
        $scope.hideLoadingData();
      }, function () {
        $scope.hideLoadingData();
      });
    };
    $scope.removeItem = function (id) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Item',
        template: 'Are you sure you want to delete this item?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          OrderService.removeItem(id);
          $scope.showLoadingData();
          OrderService.loadBlock().then(function () {
            $scope.CreateOrderCtrl.model.totals = OrderService.totals();
            $scope.hideLoadingData();
          }, function () {
            $scope.hideLoadingData();
          });
        }
      });
    };

    $scope.changePaymentAmount = function () {
      if (CreateOrderCtrl.model.paymentMethod == 'partial') {
        OrderService.setPaymentMethod('xretail_multiple_payment');
        OrderService.setPaymentAmount('')
      }
    };
    $scope.changePaymentMethod = function () {
      if (CreateOrderCtrl.model.paymentMethod == 'cash') {
        OrderService.setPaymentMethod('xpayment_dummy1');
      }
      if (CreateOrderCtrl.model.paymentMethod == 'partial') {
        OrderService.setPaymentMethod('xretail_multiple_payment');
      }
    };
    $scope.CreateOrderCtrl.model.cart = OrderService.cart();

    $scope.submitOrder = function () {
      OrderService.loadBlock(true).then(function () {
        $scope.hideLoadingData();
        $state.go('app.home');
      }, function () {
        $scope.hideLoadingData();
      });
    }
  }]);
