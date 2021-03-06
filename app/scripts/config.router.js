/**
 * Created by vjcspy on 09/04/2016.
 */
'use strict';
app
  .run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
    function ($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
      $urlRouterProvider
        .otherwise('/app/home');
      $stateProvider
        .state('app', {
          abstract: true,
          url: '/app',
          templateUrl: 'views/app/menu.html',
          controller: 'AppCtrl'
        })
        .state('app.home', {
          url: '/home',
          resolve: {
            deps: load(['scripts/controllers/app/home.js', 'scripts/services/home/pull.js']).deps,
            isHasInfomationAuth: function (pullService, $state, toastr, $q) {
              var defer = $q.defer();
              var isHasInfo = pullService.isHasInformationWebsite();
              isHasInfo.then(function (hasInfo) {
                if (!hasInfo) {
                  // toastr.clear([toast]);
                  toastr.info('Phải có thông tin đăng nhập');
                  $state.go('app.configuration.shop');
                  return defer.reject('NOT_HAVE_INFORMATION');
                }
                return defer.resolve(true);
              });
              return defer.promise;
            }
          },
          views: {
            'menuContent': {
              templateUrl: 'views/app/home.html',
              controller: 'HomeCtrl'
            }
          }
        })
        .state('app.choose-customer', {
          url: '/choose-customer',
          resolve: {
            deps: load(['izOrder', 'scripts/controllers/order/choose-customer.js']).deps
          },
          views: {
            'menuContent': {
              templateUrl: 'views/app/order/choose-customer.html',
              controller: 'ChooseCustomerCtrl'
            }
          }
        })

        .state('app.choose-customer.create', {
          url: '/create',
          resolve: {
            deps: load([
              'scripts/filters/general/cut-string.js',
              'scripts/services/product/productIndexedDB.js',
              'scripts/services/order/create.js',
              'scripts/controllers/order/create.js'
            ]).deps
          },
          views: {
            'menuContent@app': {
              templateUrl: 'views/app/order/create.html',
              controller: 'CreateOrderCtrl'
            }
          }
        })
        .state('app.view-orders', {
          url: '/view-orders',
          resolve: {
            deps: load([
              'scripts/controllers/order/view.js'
            ]).deps,
            pullOrders: function ($http, urlManagement, appConfigData, $q) {
              var defer = $q.defer();
              appConfigData.getConfig('website_url').then(function (ok) {
                var url = ok + urlManagement.getUrl('pull_orders') + "?searchCriteria[currentPage]=1&searchCriteria[pageSize]=10";
                $http.get(url).then(function (res) {
                  return defer.resolve(res.data);
                }, function (rej) {
                  return defer.reject(rej);
                });
              });
              return defer.promise;
            }
          },
          views: {
            'menuContent': {
              templateUrl: 'views/app/order/view.html',
              controller: 'ViewOrderCtrl'
            }
          }
        })
        .state('app.configuration', {
          url: '/configuration',
          abstract: true,
          resolve: load('scripts/controllers/app/system/configuration.js'),
          views: {
            'menuContent': {
              templateUrl: 'views/app/system/configuration.html',
              controller: 'ConfigurationCtrl'
            }
          }
        })
        .state('app.configuration.general', {
          url: '/general',
          resolve: load('scripts/controllers/app/system/tabs/general.js'),
          views: {
            'contentConfig': {
              templateUrl: 'views/app/system/tabs/general.html',
              controller: 'GeneralCtrl'
            }
          }
        })
        .state('app.configuration.shop', {
          url: '/shop',
          resolve: load('scripts/controllers/app/system/tabs/shop.js'),
          views: {
            'contentConfig': {
              templateUrl: 'views/app/system/tabs/shop.html',
              controller: 'ShopConfigCtrl'
            }
          }
        })
        .state('app.configuration.advance', {
          url: '/advance',
          resolve: load('scripts/controllers/app/system/tabs/advance.js'),
          views: {
            'contentConfig': {
              templateUrl: 'views/app/system/tabs/advanced.html',
              controller: 'AdvanceConfigCtrl'
            }
          }
        })
        .state('app.customer', {
          url: '/customer',
          resolve: {
            deps: load(['scripts/filters/customer/totals.js', 'scripts/controllers/customer/search.js']).deps
          },
          views: {
            'menuContent': {
              templateUrl: 'views/app/customer/search.html',
              controller: 'SearchCustomerCtrl'
            }
          }
        })
        .state('app.customer-create-update', {
          url: '/customer-create-update',
          resolve: {
            deps: load(['scripts/controllers/customer/create-update.js']).deps
          },
          params: {customer: null, customerAdd: null},
          views: {
            'menuContent': {
              templateUrl: 'views/app/customer/create-update.html',
              controller: 'CreateUpdateCustomerCtrl'
            }
          }
        })
        .state('app.product', {
          url: '/product',
          resolve: {
            deps: load(['scripts/services/product/productIndexedDB.js', 'scripts/controllers/product/search.js']).deps
          },
          views: {
            'menuContent': {
              templateUrl: 'views/app/product/search.html',
              controller: 'searchProductCtrl'
            }
          }
        })
      ;

      function load(srcs, callback) {
        return {
          deps: ['$ocLazyLoad', '$q',
            function ($ocLazyLoad, $q) {
              var deferred = $q.defer();
              var promise = false;
              srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
              if (!promise) {
                promise = deferred.promise;
              }
              angular.forEach(srcs, function (src) {
                promise = promise.then(function () {
                  var name;
                  angular.forEach(MODULE_CONFIG, function (module) {
                    if (module.name == src) {
                      if (!module.module) {
                        name = module.files;
                      } else {
                        name = module.name;
                      }
                    } else {
                      name = src;
                    }
                  });
                  return $ocLazyLoad.load(name);
                });
              });
              deferred.resolve();
              return callback ? promise.then(function () {
                return callback();
              }) : promise;
            }]
        }
      }
    }]);
