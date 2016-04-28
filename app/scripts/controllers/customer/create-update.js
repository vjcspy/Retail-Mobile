/**
 * Created by vjcspy on 27/04/2016.
 */
app.controller('CreateUpdateCustomerCtrl', ['$scope', '$state', 'urlManagement', 'toastr', '$http', 'appConfigData', '$indexedDB', 'customerService', '$timeout',
  function ($scope, $state, urlManagement, toastr, $http, appConfigData, $indexedDB, customerService, $timeout) {
    // define data and model
    $scope.CreateUpdateCustomerCtrl = {
      data: {},
      model: {}
    };
    $scope.sizes = [1, 2, 3];
    $scope.CreateUpdateCustomerCtrl.model.customer = {};
    $scope.CreateUpdateCustomerCtrl.model.customerAdd = {};

    $scope.cancel = function () {
      $scope.CreateUpdateCustomerCtrl = {
        data: {},
        model: {}
      };
      $state.go('app.dashboard');
    };


    $timeout(function () {
      $indexedDB.openStore('countries', function (store) {
        store.getAll().then(function (data) {
          $scope.CreateUpdateCustomerCtrl.data.countries = data;
          $scope.CreateUpdateCustomerCtrl.model.customerAdd.countryId = 'VN';
        })
      });
    }, 69);

    $timeout(function () {
      $indexedDB.openStore('customerGroups', function (store) {
        store.getAll().then(function (data) {
          $scope.CreateUpdateCustomerCtrl.data.customerGroups = data;
          $scope.CreateUpdateCustomerCtrl.model.customer.customerGroups = 1;
        })
      });
    }, 69);


    $scope.CreateUpdateCustomerCtrl.data.genders = [
      {id: 1, name: 'Male'},
      {id: 2, name: 'Female'}
    ];

    $scope.CreateUpdateCustomerCtrl.model.customer.gender = 1;

    $scope.save = function () {
      $scope.showLoadingData();
      var data = {};
      data.account = {
        website_id: 0,
        group_id: $scope.CreateUpdateCustomerCtrl.model.customer.customerGroups,
        prefix: '',
        firstname: $scope.CreateUpdateCustomerCtrl.model.customer.firstname,
        middlename: '',
        lastname: $scope.CreateUpdateCustomerCtrl.model.customer.lastname,
        suffix: '',
        email: $scope.CreateUpdateCustomerCtrl.model.customer.email,
        dob: '',
        taxvat: '',
        gender: $scope.CreateUpdateCustomerCtrl.model.customer.gender,
        password: '12345678',
        default_billing: '_item1',
        default_shipping: '_item1'
      };
      data.address =
      {
        _item1: {
          'prefix': '',
          'firstname': $scope.CreateUpdateCustomerCtrl.model.customer.firstname,
          'middlename': '',
          'lastname': $scope.CreateUpdateCustomerCtrl.model.customer.lastname,
          'suffix': '',
          'company': '',
          'street': [$scope.CreateUpdateCustomerCtrl.model.customerAdd.street],
          'city': $scope.CreateUpdateCustomerCtrl.model.customerAdd.city,
          'country_id': $scope.CreateUpdateCustomerCtrl.model.customerAdd.countryId,
          'region_id': '16',
          'region': '',
          'postcode': 'df2dfdsf',
          'telephone': $scope.CreateUpdateCustomerCtrl.model.customerAdd.telephone,
          'fax': '',
          'vat_id': ''
        }
      };

      appConfigData.getConfig('website_url')
        .then(function (website_url) {
          var url = website_url + urlManagement.getUrl('customer_save');
          $http.post(url, data).then(function (res) {
            toastr.success('Customer created success');
            if (res.data.hasOwnProperty('id'))
              customerService.addCustomer(res.data);
            $scope.hideLoadingData();
          }, function (rej) {
            if (rej.data.hasOwnProperty('error') && rej.data.error == true)
              toastr.error(rej.data.message);
            $scope.hideLoadingData();
          })
        });
    }
  }]);
