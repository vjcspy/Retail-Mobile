/**
 * Created by vjcspy on 19/04/2016.
 */
app.controller('ViewOrderCtrl', ['$scope', '$state', 'lodash', 'pullOrders', 'urlManagement', 'appConfigData', '$q', '$http',
  function ($scope, $state, _, pullOrders, urlManagement, appConfigData, $q, $http) {
    // define data and model
    $scope.ViewOrderCtrl = {
      data: {},
      model: {
        currentPage: 1
      }
    };
    $scope.ViewOrderCtrl.model.currentPage = 1;
    $scope.ViewOrderCtrl.data.orders = pullOrders.items;

    $scope.ViewOrderCtrl.data.pages = [];
    console.log(pullOrders);
    var totalPage = parseInt(pullOrders.total_count / 10) + ((pullOrders.total_count % 10 > 0) ? 1 : 0);
    console.log(totalPage);
    for (var i = 1; i <= totalPage; i++) {
      $scope.ViewOrderCtrl.data.pages.push({value: i, label: i});
    }

    $scope.changePage = function () {
      $scope.showLoadingData();
      appConfigData.getConfig('website_url').then(function (ok) {
        var url = ok + urlManagement.getUrl('pull_orders') + "?searchCriteria[currentPage]=" + $scope.ViewOrderCtrl.model.currentPage + "&searchCriteria[pageSize]=10";
        $http.get(url).then(function (res) {
          $scope.ViewOrderCtrl.data.orders = res.data.items;
          $scope.hideLoadingData();
        }, function (rej) {
          $scope.hideLoadingData();
        });
      });
    }
  }]);
