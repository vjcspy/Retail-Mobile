/**
 * Created by vjcspy on 11/04/2016.
 */
app.service('pullService', ['urlManagement', '$indexedDB', '$log', '$http', '$q', 'appConfigData', '$timeout', 'toastr', 'izIndexedDBService',
  function (urlManagement, $indexedDB, $log, $http, $q, appConfigData, $timeout, toastr, izIndexedDBService) {
    // function to check pull full data entity
    var websiteUrl, websitePass;
    var vm = this;
    var $scope;

    var countDataIndexedByType = function (type) {
      var defer = $q.defer();
      $indexedDB.openStore(type, function (store) {
        store.count().then(function (e) {
          return defer.resolve(e);
        });
      });
      return defer.promise;
    };

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
    this.setScope = function (scope) {
      $scope = scope;
    };

    /*Kiểm tra xem đã pull xong chưa*/
    this.isPullFullData = function () {
      var defer = $q.defer();
      isPullFull('products')
        .then(function (isFull) {
          if (isFull)
            return isPullFull('customers');
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
    /*Kiểm tra xem đã có thông tin website chưa*/
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

    /*FUNCTION PULL DATA*/
    this.pullDataFromSV = function () {
      var productDefer = $q.defer();
      pullDataByType('products', productDefer).then(function () {
        var customerDefer = $q.defer();
        pullDataByType('customers', customerDefer).then(function () {
          setPercentLoading('salesRule', {percent: 100});

          //Another data
          setPercentLoading('anotherData', {percent: 10});

          var countriesDefer = $q.defer();
          pullDataByType('countries', countriesDefer).then(function () {
            var customerGroupsDefer = $q.defer();
            setPercentLoading('anotherData', {percent: 20});
            pullDataByType('customerGroups', customerGroupsDefer).then(function () {
              setPercentLoading('anotherData', {percent: 100});
            });
          });

        })
      });
    };

    this.renewDataByType = function (type) {
      $indexedDB.openStore(type, function (store) {
        store.clear().then(function () {
          $indexedDB.openStore('pullData', function (pullData) {
            pullData.delete('pull_data_' + type).then(function () {
              var defer = $q.defer();
              setPercentLoading(type, {percent: 0, totalSave: '-', totalCount: '-'});
              pullDataByType(type, defer);
            }, function (err) {
              return err;
            });
          })
        }, function (rej) {
          return rej;
        });
      });
    };
    this.renewAllData = function () {
      var defer = $q.defer();
      izIndexedDBService.clearStore('products')
        .then(function () {
          return izIndexedDBService.clearStore('customers');
        })
        .then(function () {
          return izIndexedDBService.clearStore('pullData');
        })
        .then(function () {
          setPercentLoading('reset_all');
          return defer.resolve(true);
        });
      return defer.promise;
    };

    var setPercentLoading = function (type, data) {
      $timeout(function () {
        switch (type) {
          case 'customers':
            $scope.HomeCtrl.model.percentCustomer = data.percent;
            $scope.HomeCtrl.model.percentCustomerDetail = data.totalSave + '/' + data.totalCount;
            break;
          case 'products':
            $scope.HomeCtrl.model.percentProduct = data.percent;
            $scope.HomeCtrl.model.percentProductDetail = data.totalSave + '/' + data.totalCount;
            break;
          case 'salesRule':
            $scope.HomeCtrl.model.percentSalesRule = data.percent;
            break;
          case 'anotherData':
            $scope.HomeCtrl.model.percentAnotherData = data.percent;
            break;
          case 'reset_all':
            $scope.HomeCtrl.model.percentCustomer = 0;
            $scope.HomeCtrl.model.percentCustomerDetail = 0 + '/' + 0;
            $scope.HomeCtrl.model.percentProduct = 0;
            $scope.HomeCtrl.model.percentProductDetail = 0 + '/' + 0;
            $scope.HomeCtrl.model.percentSalesRule = 0;
            $scope.HomeCtrl.model.percentAnotherData = 0;
            break;
        }
      }, 100);
    };

    var pullDataByType = function (type, defer) {
      var dataPullingByType = vm.getPullData(type);
      dataPullingByType.then(function (dataPull) {
        /*Kiem tra dieu kien dung cua vong lap nay neu pull full data*/
        if (!dataPull || (dataPull.hasOwnProperty('isPullFull') && dataPull.isPullFull == false)) {
          // lấy page hiện tại nếu đang pull dở
          if (dataPull.hasOwnProperty('currentPage'))
            var page = dataPull.currentPage + 1;
          else
            page = 1;

          pullDataByPage(type, page).then(function (ok) {
            setPercentLoading(type, {
              percent: (ok.totalSave / ok.res.data.total_count) * 100,
              totalCount: ok.res.data.total_count,
              totalSave: ok.totalSave
            });
            return pullDataByType(type, defer);
          }, function (rej) {
            toastr.error(rej);
            return defer.reject(rej);
          });
        }
        if (dataPull.hasOwnProperty('isPullFull') && dataPull.isPullFull === true) {
          setPercentLoading(type, {
            percent: 100,
            totalCount: dataPull.totalCount,
            totalSave: dataPull.totalSave
          });
          return defer.resolve('PULL_FULL_TYPE');
        }
      });

      return defer.promise;
    };

    var pullDataByPage = function (type, page) {
      var defer = $q.defer();
      var url = websiteUrl + urlManagement.getUrl('pull_' + type) + "?searchCriteria[currentPage]=" + page;
      $log.info('Pull data with URL: ' + url);
      $http.get(url, {ignoreLoadingBar: true}).then(function (res) {
        if (res.data.items.length > 0) {
          // add to total

          vm.setPullData({
            pull_data_id: 'pull_data_' + type,
            isPullFull: false,
            currentPage: page
          }).then(function () {
            $indexedDB.openStore(type, function (c) {
              c.upsert(res.data.items).then(function (e) {
                countDataIndexedByType(type).then(function (e) {
                  return defer.resolve({res: res, totalSave: e});
                })

              }, function (err) {
                toastr.error(err);
                return defer.reject(err);
              });
            });
          });
        } else {
          countDataIndexedByType(type).then(function (e) {
            vm.setPullData({
              pull_data_id: 'pull_data_' + type,
              totalCount: res.data.total_count,
              totalSave: e,
              isPullFull: true
            }).then(function () {
              return defer.resolve({res: res, totalSave: e});
            })
          })
        }
      }, function (rej) {
        return defer.reject(rej);
      });
      return defer.promise;
    }

  }]);
