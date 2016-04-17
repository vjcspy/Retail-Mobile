/**
 * Created by vjcspy on 12/04/2016.
 */
app.service('productService', ['$indexedDB', 'lodash', '$q', function ($indexedDB, _, $q) {
  var vm = this;
  this.searchProducts = function (searchText) {
    var defer = $q.defer();
    var productList = [];
    $indexedDB.openStore('products', function (store) {
      store.each().then(function (products) {
        productList = _.filter(products, function (o) {
          return !(o.id.indexOf(searchText) == -1 && o.sku.indexOf(searchText) == -1 && o.name.indexOf(searchText) == -1);
        });
        return defer.resolve(productList);
      })
    });
    return defer.promise;
  };

  return this;
}]);
