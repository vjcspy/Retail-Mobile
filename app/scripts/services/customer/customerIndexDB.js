/**
 * Created by vjcspy on 13/04/2016.
 */
app.service('customerService', ['$indexedDB', '$q', function ($indexedDB, $q) {
  this.getAllCustomers = function () {
    var defer = $q.defer();
    $indexedDB.openStore('customers', function (store) {
      store.getAll().then(function (e) {
        return defer.resolve(e);
      });
    });
    return defer.promise;
  };
  return this;
}]);
