/**
 * Created by vjcspy on 11/04/2016.
 */
app.service('pullService', ['urlManagement', '$indexedDB', '$log', '$http', '$q', 'appConfigData', '$timeout', 'toastr',
  function (urlManagement, $indexedDB, $log, $http, $q, appConfigData, $timeout, toastr) {
    // function to check pull full data entity
    var websiteUrl, websitePass;
    var vm = this;
    var isPullFull = function (key) {
      var defer = $q.defer();
      $indexedDB.openStore('pullData', function (pullData) {
        pullData.find('pull_data_' + key).then(function (e) {
          //Found pull_data_customer
          if (e.isPullFull === true)
            return defer.resolve(true);
          else
            return defer.resolve(false);
        }, function (er) {
          // Not found
          return defer.resolve(false);
        });
      });
      return defer.promise;
    };
    /*getter/setter*/
    this.getPullData = function (key) {
      var defer = $q.defer();
      $indexedDB.openStore('pullData', function (pullData) {
        pullData.find('pull_data_' + key).then(function (e) {
          //Found
          return defer.resolve(e);
        }, function (er) {
          // Not found
          return defer.resolve(false);
        });
      });
      return defer.promise;
    };
    this.setPullData = function (data) {
      return $indexedDB.openStore('pullData', function (pullData) {
        pullData.upsert(data).then(function () {

        }, function (err) {
          toastr.error(err);
        })
      });
    };


    this.isPullFullData = function () {
      var defer = $q.defer();
      isPullFull('product')
        .then(function (isFull) {
          if (isFull)
            return isPullFull('customer');
          else
            return defer.resolve(false);
        })
        .then(function (isFull) {
          if (isFull)
            return isPullFull('sales_rule');
          else
            return defer.resolve(false);
        })
        .then(function (isFull) {
          if (isFull)
            return isPullFull('another_data');
          else
            return defer.resolve(false);
        })
        .then(function (isFull) {
          if (isFull)
            return defer.resolve(true);
          else
            return defer.resolve(false);
        });
      return defer.promise;
    };

    this.isHasInformationWebsite = function () {
      var defer = $q.defer();
      appConfigData.getConfig('website_url').then(function (ok) {
        if (typeof ok == 'undefined' || !ok)
          return defer.resolve(false);
        else {
          websiteUrl = ok;
          appConfigData.getConfig('website_pass').then(function (ok) {
            if (typeof ok == 'undefined' || !ok)
              return defer.resolve(false);
            else {
              websitePass = ok;
              return defer.resolve(true);
            }
          }, function () {
            return defer.resolve(false);
          })
        }
      }, function () {
        return defer.resolve(false);
      });
      return defer.promise;
    };
    var dataPulling = {};
    /*FUNCTION PULL DATA*/
    this.pullDataByPage = function (type, page) {
      var defer = $q.defer();
      var url = websiteUrl + urlManagement.getUrl('pull_' + type) + "?searchCriteria[currentPage]=" + page;
      $log.info('Pull data with URL: ' + url);
      $http.get(url, {ignoreLoadingBar: true}).then(function (res) {
        if (res.data.items.length > 0) {
          // add to total
          if (!dataPulling.hasOwnProperty(type)) {
            dataPulling[type] = 0;
          }
          dataPulling[type] += res.data.items.length;

          vm.setPullData({
            pull_data_id: 'pull_data_' + type,
            isPullFull: false,
            currentPage: page
          }).then(function () {
            if (type == 'customer') {
              $indexedDB.openStore('customers', function (c) {
                c.upsert(res.data.items).then(function (e) {
                  // do something
                  return defer.resolve({res: res, totalSave: dataPulling[type]});
                }, function (err) {
                  toastr.error(err);
                  return defer.reject(err);
                });
              });
            }
            if (type == 'product') {
              $indexedDB.openStore('products', function (c) {
                c.upsert(res.data.items).then(function (e) {
                  // do something
                  return defer.resolve({res: res, totalSave: dataPulling[type]});
                }, function (err) {
                  toastr.error(err);
                  return defer.reject(err);
                });
              });
            }
          });
        } else {
          vm.setPullData({
            pull_data_id: 'pull_data_' + type,
            totalCount: res.data.total_count,
            totalSave: dataPulling[type],
            isPullFull: true
          }).then(function () {
            return defer.resolve({res: res, totalSave: dataPulling[type]});
          })
        }
      }, function (rej) {
        return defer.reject(rej);
      });
      return defer.promise;
    }

  }]);
