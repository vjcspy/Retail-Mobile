/**
 * Created by vjcspy on 19/04/2016.
 */
app.controller('ViewOrderCtrl', ['$scope', '$state', 'lodash', function ($scope, $state, _) {
  // define data and model
  $scope.ViewOrderCtrl = {
    data: {},
    model: {
      currentPage: 1
    }
  };
  $scope.ViewOrderCtrl.model.currentPage = 1;

  $scope.ViewOrderCtrl.data.pages = [
    {
      value: 1,
      label: '1'
    }, {
      value: 2,
      label: '2'
    }, {
      value: 3,
      label: '3'
    }
    , {
      value: 4,
      label: '4'
    }
  ]
}]);
