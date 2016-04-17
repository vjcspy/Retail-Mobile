/**
 * Created by vjcspy on 14/04/2016.
 */
app.controller('searchProductCtrl', ['$scope', '$ionicPlatform', 'toastr', 'productService', function ($scope, $ionicPlatform, toastr, productService) {

  $scope.searchProductCtrl = {};
  $scope.searchProductCtrl.data = {};
  $scope.searchProductCtrl.model = {};

  $scope.refreshProducts = function (searchText) {
    if (searchText.length >= 3)
      productService.searchProducts(searchText).then(function (productList) {
        $scope.searchProductCtrl.data.products = productList;
      });
    else
      return $scope.searchProductCtrl.data.products = [{name: 'Enter more than 3 characters', sku: ''}];
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
                $scope.searchProductCtrl.model.product = productList[0];
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

}]);
