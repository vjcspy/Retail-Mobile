/**
 * Created by vjcspy on 13/04/2016.
 */
app.service('izIndexedDBService', ['$timeout', '$indexedDB', '$q', function ($timeout, $indexedDB, $q) {
  this.clearStore = function (store) {
    var defer = $q.defer();
    $indexedDB.openStore(store, function (storeData) {
      storeData.clear().then(function () {
        return defer.resolve(true);
      }, function () {
        return defer.reject(false);
      })
    });
    return defer.promise;
  };
  return this;
}]);
