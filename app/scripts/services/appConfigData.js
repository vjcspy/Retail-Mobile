/**
 * Created by vjcspy on 11/04/2016.
 */
'use strict';
app.service('appConfigData', ['$indexedDB', 'toastr', '$log', '$q', function ($indexedDB, toastr, $log, $q) {
  var _allDataConfig;
  this.getAll = function () {
    $indexedDB.openStore('retailAppData', function (retailAppData) {
      retailAppData.getAll().then(function (allData) {
        _allDataConfig = allData;
        console.log(_allDataConfig);
      });
    });
  };
  this.getConfig = function (key) {
    var defer = $q.defer();
    $indexedDB.openStore('retailAppData', function (retailAppData) {
      retailAppData.find(key).then(function (e) {
        if (typeof e != 'undefined')
          return defer.resolve(e.value);
        else
          return defer.resolve(null);
      }, function (err) {
        return defer.resolve(null);
      });
    });
    return defer.promise;
  };
  this.saveConfig = function (key, value) {
    $indexedDB.openStore('retailAppData', function (retailAppData) {
      // single item
      retailAppData.upsert({"retail_app_data_config_id": key, "name": key, "value": value}).then(function (e) {
        // do something
      }, function (err) {
        toastr.error(err, "Error");
      });
    });
  };
  return this;
}
]);
