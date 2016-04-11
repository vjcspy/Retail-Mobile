'use strict';

/**
 * @ngdoc provider
 * @name xtranslateApp.izTranslate
 * @description
 * # izTranslate
 * Provider in the xtranslateApp.
 */
var izTranslate = angular.module('izTranslate', ['ngCookies', 'pascalprecht.translate', 'ngLodash'])
  .provider("$izTranslate", ['lodash', function (_) {
    var moduleParts = [];
    var moduleCanEditLanguage = [];
    var supportLanguages = [];
    var urlSaveTran = '';

    this.addModuleCanEditLanguage = function (module) {
      if (typeof module == 'string')
        moduleCanEditLanguage.push(module);
      else if (typeof module == 'object')
        _.forEach(module, function (v) {
          moduleCanEditLanguage.push(v);
        })
    };

    this.setUrlSaveTranslation = function (url) {
      urlSaveTran = url;
    };

    /*storage data to show select language*/
    this.addSupportLanguages = function (languages) {
      if (typeof languages == 'string')
        supportLanguages.push(languages);
      else if (typeof languages == 'object')
        _.forEach(languages, function (v) {
          supportLanguages.push(v);
        })
    };

    var isInPart = function (module) {
      return _.indexOf(moduleParts, _.find(moduleParts, function (v) {
          if (v == module)
            return true;
        })) > -1;
    };
    this.$get = function ($http, $q, $translatePartialLoader, $translate, $log) {
      return {
        /*add module to load partial*/
        addModules: function (modules) {
          var f = false;
          if (typeof modules == 'string') {
            if (!isInPart(modules)) {
              moduleParts.push(modules);
              $translatePartialLoader.addPart(modules);
              $translate.refresh();
            }
          } else if (typeof modules == 'object') {
            _.forEach(modules, function (v) {
              if (isInPart(v)) {
                $translatePartialLoader.addPart(v);
                f = true;
              }
            });
            if (f)
              $translate.refresh();
          }
        },
        /*change language in select language*/
        changeLanguage: function (langKey) {
          $translate.use(langKey);
        },
        /*get data to show select language*/
        getLanguagesSupport: function () {
          return supportLanguages;
        },
        getModuleCanEditLanguage: function () {
          return moduleCanEditLanguage;
        },
        loadLanguageDataFromFile: function (module, langeKey) {
          return $http.get('i18n/' + module + '/' + langeKey + '.json').then(function (response) {
            var trans = [];
            _.forEach(response.data, function (v, k) {
              trans.push({id: k, text: v});
            });
            return trans;
          }, function (reject) {
            return $log.error("Can't load file");
          })
        },
        saveTranslation: function (data) {
          return $http.post(urlSaveTran, data);
        },
        translateTextUseApi: function (text, from, to) {
          $http.get('translator.php?text=' + text + '&to=' + to).then(function (data) {
            var tran = data.data.translation;
            var rx = />.*(<\/string>)$/g;
            return rx.exec(tran);
          })
        }
      };
    };
  }])
  .factory('izErrorTranslateHandle', function ($q, $log) {
    return function (part, lang) {
      $log.error('The "' + part + '/' + lang + '" part was not loaded.');
      return $q.when({});
    };
  })
  .filter('izCut', function () {
    return function (value, wordwise, max, tail) {
      if (!value) return '';

      max = parseInt(max, 10);
      if (!max) return value;
      if (value.length <= max) return value;

      value = value.substr(0, max);
      if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace != -1) {
          value = value.substr(0, lastspace);
        }
      }

      return value + (tail || ' …');
    };
  })
  .config(['$translateProvider', '$translatePartialLoaderProvider', function ($translateProvider, $translatePartialLoaderProvider) {
    // Enable escaping of HTML for security
    // $translateProvider.useSanitizeValueStrategy('sanitize');

    // pluralization
    $translateProvider.useMessageFormatInterpolation();

    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'i18n/{part}/{lang}.json',
      loadFailureHandler: 'izErrorTranslateHandle'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');

    $translateProvider.useCookieStorage();

  }]);
