/**
 * Created by vjcspy on 11/04/2016.
 */
app.service('pullService', ['urlManagement', '$indexedDB', '$log', '$http',
  function (urlManagement, $indexedDB, $log, $http) {
    var isPulling = false;
    this.pullCustomer = function () {
      var url = urlManagement.getUrl('pull_customer');
      $indexedDB.openStore('pullData', function (pullData) {
        pullData.find('pull_data_customer').then(function (e) {
          //Found pull_data_customer
        }, function (er) {
          // Not found
          $log.info('Not found data pull customer -> will pull customer from page 1');
          var _pageUrl = url + '?searchCriteria[currentPage]=';
          var _start = 1;
          var _currentPage = _pageUrl + _start;
        });
      });
    }
  }]);
