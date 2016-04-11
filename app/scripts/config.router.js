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
          resolve: load(['scripts/controllers/app/home.js', 'scripts/services/home/pull.js']),
          views: {
            'menuContent': {
              templateUrl: 'views/app/home.html',
              controller: 'HomeCtrl'
            }
          }
        })
        .state('app.order', {
          url: '/Order',
          views: {
            'menuContent': {
              templateUrl: 'views/app/order/create.html'
            }
          }
        })

        .state('app.configuration', {
          url: '/configuration',
          views: {
            'menuContent': {
              templateUrl: 'views/app/system/configuration.html',
              controller: 'ConfigurationCtrl'
            }
          }
        })
        .state('app.configuration.general', {
          url: '/general',
          views: {
            'configTab': {templateUrl: 'views/app/system/tabs/general.html'}
          }
        })
        .state('app.configuration.shop', {
          url: '/shop',
          views: {
            'configTab': {templateUrl: 'views/app/system/tabs/shop.html'}
          }
        })
        .state('app.configuration.advanced', {
          url: '/advanced',
          views: {
            'configTab': {templateUrl: 'views/app/system/tabs/advanced.html'}
          }
        });

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
