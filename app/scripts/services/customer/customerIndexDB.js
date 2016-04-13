/**
 * Created by vjcspy on 13/04/2016.
 */
app.service('customerService', ['$indexedDB', '$q', '$http', 'appConfigData', 'urlManagement', function ($indexedDB, $q, $http, appConfigData, urlManagement) {
  this.getAllCustomers = function () {
    var defer = $q.defer();
    $indexedDB.openStore('customers', function (store) {
      store.getAll().then(function (e) {
        return defer.resolve(e);
      });
    });
    return defer.promise;
  };
  this.getOrdersByCustomerId = function (id) {
    var defer = $q.defer();
    appConfigData.getConfig('website_url').then(function (websiteUrl) {
      var url = websiteUrl + urlManagement.getUrl('customer_orders') + "?searchCriteria[currentPage]=1&searchCriteria[customer_id]=" + id;
      $http.get(url).then(function (res) {
        return defer.resolve(res.data.items);
      }, function (rej) {
        return defer.reject(rej);
      });
    });
    return defer.promise;
  };
  return this;
}]);
