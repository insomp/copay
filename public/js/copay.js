'use strict';

var modules = [
  'ui.router',
  'angularMoment',
  'mm.foundation',
  'monospaced.qrcode',
  'gettext',
  'ngAnimate',
  'ngTouch',
  'ngLodash',
  'uiSwitch',
  'bwcModule',
  'copayApp.filters',
  'copayApp.services',
  'copayApp.controllers',
  'copayApp.directives'
];

var copayApp = window.copayApp = angular.module('copayApp', modules);

angular.module('copayApp.filters', []);
angular.module('copayApp.services', []);
angular.module('copayApp.controllers', []);
angular.module('copayApp.directives', []);

'use strict';

var unsupported;

if (window && window.navigator) {
  var rxaosp = window.navigator.userAgent.match(/Android.*AppleWebKit\/([\d.]+)/);
  var isaosp = (rxaosp && rxaosp[1] < 537);
  if (!window.cordova && isaosp)
    unsupported = true;
}


//Setting up route
angular
  .module('copayApp')
  .config(function(bwcServiceProvider, $stateProvider, $urlRouterProvider) {
    bwcServiceProvider.setBaseUrl('http://192.168.1.102:3001/bws/api');
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('splash', {
        url: '/splash',
        needProfile: false,
        views: {
          'splash': {
            template: '<div ui-view="steps"></div>',
            controller: function($state) {
              $state.transitionTo('splash.one');
            }
          }
        }
      })
      .state('splash.one', {
        views: {
          'steps': {
            templateUrl: 'views/splash/1.html'
          }
        }
      })
      .state('splash.two', {
        views: {
          'steps': {
            templateUrl: 'views/splash/2.html'
          }
        }
      })
      .state('splash.three', {
        views: {
          'steps': {
            templateUrl: 'views/splash/3.html'
          }
        }
      })
      .state('splash.four', {
        views: {
          'steps': {
            templateUrl: 'views/splash/4.html'
          }
        }
      })
      .state('splash.five', {
        views: {
          'steps': {
            templateUrl: 'views/splash/5.html'
          }
        }
      })
      .state('walletHome', {
        url: '/',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/walletHome.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html'
          },
          'menu': {
            templateUrl: 'views/includes/menu.html',
            controller: function($scope) {
              $scope.activeMenu = 'walletHome';
            }
          }
        }
      })
      .state('createProfile', {
        url: '/createProfile',
        needProfile: false,
        views: {
          'main': {
            templateUrl: 'views/createProfile.html'
          }
        }
      })
      .state('unsupported', {
        url: '/unsupported',
        needProfile: false,
        views: {
          'main': {
            templateUrl: 'views/unsupported.html'
          }
        }
      })
      .state('uri-payment', {
        url: '/uri-payment/:data',
        templateUrl: 'views/paymentUri.html',
        views: {
          'main': {
            templateUrl: 'views/paymentUri.html',
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.goBackToState = 'walletHome';
            }
          }
        },
        needProfile: true
      })
      .state('selectWalletForPayment', {
        url: '/selectWalletForPayment',
        controller: 'walletForPaymentController',
        needProfile: true
      })
      .state('join', {
        url: '/join',
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/join.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Join shared wallet';
              $scope.goBackToState = 'add';
            }
          }
        }
      })
      .state('import', {
        url: '/import',
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/import.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Import wallet';
              $scope.goBackToState = 'add';
            }
          }
        }
      })
      .state('importProfile', {
        url: '/importProfile',
        templateUrl: 'views/importProfile.html',
        needProfile: false
      })
      .state('importLegacy', {
        url: '/importLegacy',
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/importLegacy.html',
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Import legacy wallet';
              $scope.goBackToState = 'add';
            }
          }
        }

      })
      .state('create', {
        url: '/create',
        templateUrl: 'views/create.html',
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/create.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Create new wallet';
              $scope.goBackToState = 'add';
            }
          }
        }
      })
      .state('copayers', {
        url: '/copayers',
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/copayers.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html'
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'profileController',
        templateUrl: 'views/profile.html',
        needProfile: true
      })
      .state('receive', {
        url: '/receive',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/receive.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html'
          },
          'menu': {
            templateUrl: 'views/includes/menu.html',
            controller: function($scope) {
              $scope.activeMenu = 'receive';
            }
          }
        }
      })
      .state('send', {
        url: '/send',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/send.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html'
          },
          'menu': {
            templateUrl: 'views/includes/menu.html',
            controller: function($scope) {
              $scope.activeMenu = 'send';
            }
          }
        }
      })
      .state('history', {
        url: '/history',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/history.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html'
          },
          'menu': {
            templateUrl: 'views/includes/menu.html',
            controller: function($scope) {
              $scope.activeMenu = 'history';
            }
          }
        }
      })
      .state('preferences', {
        url: '/preferences',
        templateUrl: 'views/preferences.html',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/preferences.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Preferences';
              $scope.goBackToState = 'walletHome';
            }
          }
        }
      })
      .state('preferencesUnit', {
        url: '/preferencesUnit',
        templateUrl: 'views/preferencesUnit.html',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/preferencesUnit.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Unit';
              $scope.goBackToState = 'preferences';
            }
          }
        }
      })
      .state('preferencesColor', {
        url: '/preferencesColor',
        templateUrl: 'views/preferencesColor.html',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/preferencesColor.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Color';
              $scope.goBackToState = 'preferences';
            }
          }
        }
      })
 
      .state('preferencesAltCurrency', {
        url: '/preferencesAltCurrency',
        templateUrl: 'views/preferencesAltCurrency.html',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/preferencesAltCurrency.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Alternative Currency';
              $scope.goBackToState = 'preferences';
            }
          }
        }
      })
      .state('preferencesBwsUrl', {
        url: '/preferencesBwsUrl',
        templateUrl: 'views/preferencesBwsUrl.html',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/preferencesBwsUrl.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Bitcore Wallet Service';
              $scope.goBackToState = 'preferences';
            }
          }
        }
      })
      .state('delete', {
        url: '/delete',
        templateUrl: 'views/preferencesDeleteWallet.html',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/preferencesDeleteWallet.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Delete';
              $scope.goBackToState = 'preferences';
            }
          }
        }
      })
      .state('backup', {
        url: '/backup',
        templateUrl: 'views/backup.html',
        walletShouldBeComplete: true,
        needProfile: true,
        views: {
          'main': {
            templateUrl: 'views/backup.html'
          },
          'topbar': {
            templateUrl: 'views/includes/topbar.html',
            controller: function($scope) {
              $scope.titleSection = 'Backup';
              $scope.goBackToState = 'preferences';
            }
          }
        }
      })
      .state('settings', {
        url: '/settings',
        controller: 'settingsController',
        templateUrl: 'views/settings.html',
        needProfile: false
      })
      .state('warning', {
        url: '/warning',
        controller: 'warningController',
        templateUrl: 'views/warning.html',
        needProfile: false
      })

    .state('add', {
      url: '/add',
      needProfile: true,
      views: {
        'main': {
          templateUrl: 'views/add.html'
        },
        'topbar': {
          templateUrl: 'views/includes/topbar.html',
          controller: function($scope) {
            $scope.titleSection = 'Add wallet';
            $scope.goBackToState = 'walletHome';
          }
        }
      }
    })
      .state('network', {
        url: '/network/:status',
        views: {
          'main': {
            controller: function($scope, $stateParams, go) {
              switch ($stateParams.status) {
                case 'online':
                  $scope.$emit('Local/OnLine');
                  break;
                case 'offline':
                  $scope.$emit('Local/OffLine');
                  break;
              };
              go.walletHome();
            }
          }
        },
        needProfile: false
      });
  })
  .run(function($rootScope, $state, $log, gettextCatalog, uriHandler, isCordova, amMoment, profileService) {

    var userLang, androidLang;

    if (navigator && navigator.userAgent && (androidLang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
      userLang = androidLang[1];
    } else {
      // works for iOS and Android 4.x
      userLang = navigator.userLanguage || navigator.language;
    }

    userLang = userLang ? (userLang.split('-', 1)[0] || 'en') : 'en';
    gettextCatalog.setCurrentLanguage(userLang);
    amMoment.changeLocale(userLang);

    // Register URI handler, not for mobileApp
    if (!isCordova) {
      uriHandler.register();
    }

    var pageWeight = {
      walletHome: 10,
      receive: 20,
      send: 30,
      history: 40,
      preferences: 11,
      preferencesColor: 12,
      backup: 12,
      delete: 12,
      preferencesUnit: 12,
      preferencesAltCurrency: 12,
      preferencesBwsUrl: 12,
      add: 11,
      create: 12,
      join: 12,
      import: 12,
      importLegacy: 12
    };

    $rootScope.$on('$stateChangeSuccess', function() {
      $rootScope.$emit('Animation/Disable');
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

      if (pageWeight[fromState.name] > pageWeight[toState.name]) {
        $rootScope.$emit('Animation/SwipeRight');
      }
      else if (pageWeight[fromState.name] < pageWeight[toState.name]) {
        $rootScope.$emit('Animation/SwipeLeft');
      }

      if (unsupported) {
        $state.transitionTo('unsupported');
        event.preventDefault();
      }

      if (!profileService.profile && toState.needProfile) {

        // Try to open local profile
        profileService.loadAndBindProfile(function(err) {
          if (err) {
            if (err.message.match('NOPROFILE')) {
              $log.debug('No profile... redirecting');
              $state.transitionTo('splash');
              event.preventDefault();
            } else {
              throw new Error(err); // TODO
            }
          } else {
            // Profile was loaded
          }
        });
      }

      if (profileService.focusedClient && !profileService.focusedClient.isComplete() && toState.walletShouldBeComplete) {
        $state.transitionTo('copayers');
        event.preventDefault();
      }
    });
  });

'use strict';

function selectText(element) {
  var doc = document;
  if (doc.body.createTextRange) { // ms
    var range = doc.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    var selection = window.getSelection();
    var range = doc.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);

  }
}


angular.module('copayApp.directives')

.directive('validAddress', ['$rootScope', 'bitcore', 'profileService',
    function($rootScope, bitcore, profileService) {
      return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
          var networkName = profileService.focusedClient.credentials.network;
          var URI = bitcore.URI;
          var Address = bitcore.Address
          var validator = function(value) {
            // Regular url
            if (/^https?:\/\//.test(value)) {
              ctrl.$setValidity('validAddress', true);
              return value;
            }

            // Bip21 uri
            if (/^bitcoin:/.test(value)) {
              var uri, isAddressValid;
              var isUriValid = URI.isValid(value);
              if (isUriValid) { 
                uri = new URI(value);
                isAddressValid = Address.isValid(uri.address.toString(), networkName)
              }
              ctrl.$setValidity('validAddress', isUriValid && isAddressValid);
              return value;
            }

            if (typeof value == 'undefined') {
              ctrl.$pristine = true;
              return;
            }

            // Regular Address
            ctrl.$setValidity('validAddress', Address.isValid(value, networkName));
            return value;
          };


          ctrl.$parsers.unshift(validator);
          ctrl.$formatters.unshift(validator);
        }
      };
    }
  ])
  .directive('validUrl', [

    function() {
      return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
          var validator = function(value) {
            // Regular url
            if (/^https?:\/\//.test(value)) {
              ctrl.$setValidity('validUrl', true);
              return value;
            } else {
              ctrl.$setValidity('validUrl', false);
              return value;
            }
          };

          ctrl.$parsers.unshift(validator);
          ctrl.$formatters.unshift(validator);
        }
      };
    }
  ])
  .directive('validAmount', ['configService', '$locale',
    function(configService, locale) {
      var formats = locale.NUMBER_FORMATS;

      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          var val = function(value) {
            var settings = configService.getSync().wallet.settings;
            var vNum = Number((value * settings.unitToSatoshi).toFixed(0));

            if (typeof value == 'undefined') {
              ctrl.$pristine = true;
            }

            if (typeof vNum == "number" && vNum > 0) {
              var decimals = Number(settings.unitDecimals);
              var sep_index = ('' + value).indexOf(formats.DECIMAL_SEP);
              var str_value = ('' + value).substring(sep_index + 1);
              if (sep_index > 0 && str_value.length > decimals) {
                ctrl.$setValidity('validAmount', false);
              } else {
                ctrl.$setValidity('validAmount', true);
              }
            } else {
              ctrl.$setValidity('validAmount', false);
            }
            return value;
          }
          ctrl.$parsers.unshift(val);
          ctrl.$formatters.unshift(val);
        }
      };
    }
  ])
  .directive('walletSecret', function(bitcore) {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        var validator = function(value) {
          if (value.length > 0) {
            var m = value.match(/^[1-9A-HJ-NP-Za-km-z]{70,80}$/);
            ctrl.$setValidity('walletSecret', m ? true : false);
          }
          return value;
        };

        ctrl.$parsers.unshift(validator);
      }
    };
  })
  .directive('loading', function() {
    return {
      restrict: 'A',
      link: function($scope, element, attr) {
        var a = element.html();
        var text = attr.loading;
        element.on('click', function() {
          element.html('<i class="size-21 fi-bitcoin-circle icon-rotate spinner"></i> ' + text + '...');
        });
        $scope.$watch('loading', function(val) {
          if (!val) {
            element.html(a);
          }
        });
      }
    }
  })
  .directive('ngFileSelect', function() {
    return {
      link: function($scope, el) {
        el.bind('change', function(e) {
          $scope.file = (e.srcElement || e.target).files[0];
          $scope.getFile();
        });
      }
    }
  })
  .directive('contact', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        if (!scope.wallet) return;

        var address = attrs.address;
        var contact = scope.wallet.addressBook[address];
        if (contact && !contact.hidden) {
          element.append(contact.label);
          element.attr('tooltip', attrs.address);
        } else {
          element.append(address);
        }

        element.bind('click', function() {
          selectText(element[0]);
        });
      }
    };
  })
  .directive('highlightOnChange', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.$watch(attrs.highlightOnChange, function(newValue, oldValue) {
          element.addClass('highlight');
          setTimeout(function() {
            element.removeClass('highlight');
          }, 500);
        });
      }
    }
  })
  .directive('checkStrength', function() {
    return {
      replace: false,
      restrict: 'EACM',
      require: 'ngModel',
      link: function(scope, element, attrs) {

        var MIN_LENGTH = 8;
        var MESSAGES = ['Very Weak', 'Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        var COLOR = ['#dd514c', '#dd514c', '#faa732', '#faa732', '#16A085', '#16A085'];

        function evaluateMeter(password) {
          var passwordStrength = 0;
          var text;
          if (password.length > 0) passwordStrength = 1;
          if (password.length >= MIN_LENGTH) {
            if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) {
              passwordStrength++;
            } else {
              text = ', add mixed case';
            }
            if (password.match(/\d+/)) {
              passwordStrength++;
            } else {
              if (!text) text = ', add numerals';
            }
            if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
              passwordStrength++;
            } else {
              if (!text) text = ', add punctuation';
            }
            if (password.length > 12) {
              passwordStrength++;
            } else {
              if (!text) text = ', add characters';
            }
          } else {
            text = ', that\'s short';
          }
          if (!text) text = '';

          return {
            strength: passwordStrength,
            message: MESSAGES[passwordStrength] + text,
            color: COLOR[passwordStrength]
          }
        }

        scope.$watch(attrs.ngModel, function(newValue, oldValue) {
          if (newValue && newValue !== '') {
            var info = evaluateMeter(newValue);
            scope[attrs.checkStrength] = info;
          }
        });
      }
    };
  })
  .directive('showFocus', function($timeout) {
    return function(scope, element, attrs) {
      scope.$watch(attrs.showFocus,
        function(newValue) {
          $timeout(function() {
            newValue && element[0].focus();
          });
        }, true);
    };
  })
  .directive('match', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        match: '='
      },
      link: function(scope, elem, attrs, ctrl) {
        scope.$watch(function() {
          return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.match === ctrl.$modelValue;
        }, function(currentValue) {
          ctrl.$setValidity('match', currentValue);
        });
      }
    };
  })
  .directive('clipCopy', function() {
    return {
      restrict: 'A',
      scope: {
        clipCopy: '=clipCopy'
      },
      link: function(scope, elm) {
        // TODO this does not work (FIXME)
        elm.attr('tooltip', 'Press Ctrl+C to Copy');
        elm.attr('tooltip-placement', 'top');

        elm.bind('click', function() {
          selectText(elm[0]);
        });
      }
    };
  });

'use strict';

angular.module('copayApp.filters', [])
  .filter('amTimeAgo', ['amMoment',
    function(amMoment) {
      return function(input) {
        return amMoment.preprocessDate(input).fromNow();
      };
    }
  ])
  .filter('paged', function() {
    return function(elements) {
      if (elements) {
        return elements.filter(Boolean);
      }

      return false;
    };
  })
  .filter('removeEmpty', function() {
    return function(elements) {
      elements = elements || [];
      // Hide empty change addresses from other copayers
      return elements.filter(function(e) {
        return !e.isChange || e.balance > 0;
      });
    }
  })

.filter('noFractionNumber', ['$filter', '$locale', 'configService',
  function(filter, locale, configService) {
    var numberFilter = filter('number');
    var formats = locale.NUMBER_FORMATS;
    var config = configService.getSync().wallet.settings;
    return function(amount, n) {
      if (typeof(n) === 'undefined' && !config) return amount;

      var fractionSize = (typeof(n) !== 'undefined') ?
        n : config.unitToSatoshi.toString().length - 1;
      var value = numberFilter(amount, fractionSize);
      var sep = value.indexOf(formats.DECIMAL_SEP);
      var group = value.indexOf(formats.GROUP_SEP);
      if (amount >= 0) {
        if (group > 0) {
          if (sep < 0) {
            return value;
          }
          var intValue = value.substring(0, sep);
          var floatValue = parseFloat(value.substring(sep));
          if (floatValue === 0) {
            floatValue = '';
          } else {
            if (floatValue % 1 === 0) {
              floatValue = floatValue.toFixed(0);
            }
            floatValue = floatValue.toString().substring(1);
          }
          var finalValue = intValue + floatValue;
          return finalValue;
        } else {
          value = parseFloat(value);
          if (value % 1 === 0) {
            value = value.toFixed(0);
          }
          return value;
        }
      }
      return 0;
    };
  }
]);

'use strict';

/**
 * Profile
 *
 * credential: array of OBJECTS
 */
function Profile() {
  this.version = '1.0.0';
};

Profile.create = function(opts) {
  opts = opts || {};

  var x = new Profile();
  x.createdOn = Date.now();
  x.credentials = opts.credentials;
  return x;
};


Profile.fromObj = function(obj) {
  var x = new Profile();
  x.createdOn = obj.createdOn;
  x.credentials = obj.credentials;
  if (x.credentials[0] && typeof x.credentials[0] != 'object')
    throw ("credentials should be an object");
  return x;
};


Profile.fromString = function(str) {
  return Profile.fromObj(JSON.parse(str));
};

Profile.prototype.toObj = function() {
console.log('[profile.js.37:this:]',this); //TODO
  return JSON.stringify(this);
};



'use strict';
angular.module('copayApp.services')
  .factory('applicationService', function($rootScope, $timeout, isCordova) {
    var root = {};

    root.restart = function(hard) {
      if (isCordova) {
        $rootScope.iden = $rootScope.wallet = undefined;
        if (hard) {
          location.reload();
        }
        $timeout(function() {
          $rootScope.$digest();
        }, 1);

      } else {
        // Go home reloading the application
        var hashIndex = window.location.href.indexOf('#!/');
        window.location = window.location.href.substr(0, hashIndex);
      }
    };

    return root;
  });

'use strict';
angular.module('copayApp.services')
  .factory('backupService', function backupServiceFactory($log, $timeout, profileService, sjcl) {

    var root = {};

    var _download = function(ew, filename, cb) {
      var NewBlob = function(data, datatype) {
        var out;

        try {
          out = new Blob([data], {
            type: datatype
          });
          $log.debug("case 1");
        } catch (e) {
          window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;

          if (e.name == 'TypeError' && window.BlobBuilder) {
            var bb = new BlobBuilder();
            bb.append(data);
            out = bb.getBlob(datatype);
            $log.debug("case 2");
          } else if (e.name == "InvalidStateError") {
            // InvalidStateError (tested on FF13 WinXP)
            out = new Blob([data], {
              type: datatype
            });
            $log.debug("case 3");
          } else {
            // We're screwed, blob constructor unsupported entirely   
            $log.debug("Errore");
          }
        }
        return out;
      };

      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";

      var blob = new NewBlob(ew, 'text/plain;charset=utf-8');
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      $timeout(function() {
        window.URL.revokeObjectURL(url);
      }, 250);
      return cb();
    };

    root.walletExport = function(password) {
      if (!password) {
        return null;
      }
      var fc = profileService.focusedClient;
      try {
        var b = fc.export({});
        var e = sjcl.encrypt(password, b, {
          iter: 10000
        });
        return e;
      } catch (err) {
        $log.debug('Error exporting wallet: ', err);
        return null;
      };
    };

    root.walletDownload = function(password, cb) {
      var fc = profileService.focusedClient;
      var ew = root.walletExport(password);
      if (!ew) return cb('Could not create backup');

      var walletName = fc.credentials.walletName;
      var filename = walletName + '-Copaybackup.aes.json';
      _download(ew, filename, cb)
    };
    return root;
  });

'use strict';

angular.module('copayApp.services')
  .factory('balanceService', function($rootScope, $filter, $timeout, bwcService) {
    var root = {};
    var _balanceCache = {};
    root.clearBalanceCache = function(w) {
      w.clearUnspentCache();
      delete _balanceCache[w.getId()];
    };

    root._fetchBalance = function(w, cb) {
      cb = cb || function() {};
      var satToUnit = 1 / w.settings.unitToSatoshi;
      var COIN = bwcService.Bitcore.util.COIN;
      w.getBalance(function(err, balanceSat, balanceByAddrSat, safeBalanceSat, safeUnspentCount) {
        if (err) return cb(err);

        var r = {};
        r.totalBalance = $filter('noFractionNumber')(balanceSat * satToUnit);
        r.totalBalanceBTC = (balanceSat / COIN);
        var availableBalanceNr = safeBalanceSat * satToUnit;
        r.availableBalance = $filter('noFractionNumber')(safeBalanceSat * satToUnit);
        r.availableBalanceBTC = (safeBalanceSat / COIN);
        r.safeUnspentCount = safeUnspentCount;

        var lockedBalance = (balanceSat - safeBalanceSat) * satToUnit;
        r.lockedBalance = lockedBalance ? $filter('noFractionNumber')(lockedBalance) : null;
        r.lockedBalanceBTC = (balanceSat - safeBalanceSat) / COIN;


        if (r.safeUnspentCount) {
          var estimatedFee = copay.Wallet.estimatedFee(r.safeUnspentCount);
          r.topAmount = (((availableBalanceNr * w.settings.unitToSatoshi).toFixed(0) - estimatedFee) / w.settings.unitToSatoshi);
        }

        var balanceByAddr = {};
        for (var ii in balanceByAddrSat) {
          balanceByAddr[ii] = balanceByAddrSat[ii] * satToUnit;
        }
        r.balanceByAddr = balanceByAddr;

        r.totalBalanceAlternative = $filter('noFractionNumber')(totalBalanceAlternative, 2);
        r.lockedBalanceAlternative = $filter('noFractionNumber')(lockedBalanceAlternative, 2);
        r.alternativeConversionRate = $filter('noFractionNumber')(alternativeConversionRate, 2);

        r.alternativeBalanceAvailable = true;
        r.alternativeIsoCode = w.settings.alternativeIsoCode;

        r.updatingBalance = false;

        return cb(null, r)
      });
    };

    root.update = function(w, cb, isFocused) {
      w = w || $rootScope.wallet;
      if (!w || !w.isComplete()) return;

      copay.logger.debug('Updating balance of:', w.getName(), isFocused);
      var wid = w.getId();


      // cache available? Set the cached values until we updated them
      if (_balanceCache[wid]) {
        w.balanceInfo = _balanceCache[wid];
      } else {
        if (isFocused)
          $rootScope.updatingBalance = true;
      }

      w.balanceInfo = w.balanceInfo || {};
      w.balanceInfo.updating = true;

      root._fetchBalance(w, function(err, res) {
        if (err) throw err;
        w.balanceInfo = _balanceCache[wid] = res;
        w.balanceInfo.updating = false;

        if (isFocused) {
          $rootScope.updatingBalance = false;
        }
        // we alwalys calltimeout because if balance is cached, we are still on the same
        // execution path
        if (cb) $timeout(function() {
          return cb();
        }, 1);
      });
    };

    return root;
  });

'use strict';
angular.module('copayApp.services')
  .factory('bitcore', function bitcoreFactory(bwcService) {
    var bitcore = bwcService.getBitcore();
    return bitcore;
  });

'use strict';

angular.module('copayApp.services').factory('configService', function(localStorageService, lodash, bwcService) {
  var root = {};

  var defaultConfig = {
    // wallet limits
    limits: {
      totalCopayers: 6,
      mPlusN: 100,
    },

    // Bitcore wallet service URL
    bws: {
      url: 'http://162.242.245.33:3004/bws/api',
    },

    // insight
    insight: {
      testnet: {
        url: 'https://test-insight.bitpay.com:443',
        transports: ['polling'],
      },
      livenet: {
        url: 'https://insight.bitpay.com:443',
        transports: ['polling'],
      },
    },

    // wallet default config
    wallet: {
      requiredCopayers: 2,
      totalCopayers: 3,
      spendUnconfirmed: true,
      reconnectDelay: 5000,
      idleDurationMin: 4,
      settings: {
        unitName: 'bits',
        unitToSatoshi: 100,
        unitDecimals: 2,
        unitCode: 'bit',
        alternativeName: 'US Dollar',
        alternativeIsoCode: 'USD',
      }
    },

    // local encryption/security config
    passphraseConfig: {
      iterations: 5000,
      storageSalt: 'mjuBtGybi/4=',
    },

    rates: {
      url: 'https://insight.bitpay.com:443/api/rates',
    },
  };

  var configCache = null;




  root.getSync = function() {
    if (!configCache)
      throw new Error('configService#getSync called when cache is not initialized');

    return configCache;
  };

  root.get = function(cb) {
    localStorageService.get('config', function(err, localConfig) {

      if (localConfig) {
        configCache = JSON.parse(localConfig);

        //these ifs are to avoid migration problems
        if (!configCache.bws) {
          configCache.bws = defaultConfig.bws;
        }
        if (!configCache.wallet.settings.unitCode) {
          configCache.wallet.settings.unitCode = defaultConfig.wallet.settings.unitCode;
        }

      } else {
        configCache = defaultConfig;
      };

      return cb(err, configCache);
    });
  };

  root.set = function(newOpts, cb) {
    var config = defaultConfig;
    localStorageService.get('config', function(err, oldOpts) {
      if (lodash.isString(oldOpts)) {
        oldOpts = JSON.parse(oldOpts);
      }
      if (lodash.isString(config)) {
        config = JSON.parse(config);
      }
      if (lodash.isString(newOpts)) {
        newOpts = JSON.parse(newOpts);
      }
      lodash.merge(config, oldOpts, newOpts);
      configCache = config;

      localStorageService.set('config', JSON.stringify(config), cb);
    });
  };

  root.reset = function(cb) {
    localStorageService.remove('config', cb);
  };

  root.getDefaults = function() {
    return defaultConfig;
  };

  root.get(function(err, c) {
    if (err) throw Error(err);
    bwcService.setBaseUrl(c.bws.url);
  });

  return root;
});

'use strict';

angular.module('copayApp.services').factory('go', function($window, $rootScope, $location, $state, profileService) {
  var root = {};

  var hideSidebars = function() {
    if (typeof document === 'undefined')
      return;

    // hack to hide sidebars and use ng-click (no href=)
    var win = angular.element($window);
    var elem = angular.element(document.querySelector('#off-canvas-wrap'))
    elem.removeClass('move-right');
    elem.removeClass('move-left');
  };

  var toggleSidebar = function(invert) {
    if (typeof document === 'undefined')
      return;

    var elem = angular.element(document.querySelector('#off-canvas-wrap'));
    var leftbarActive = angular.element(document.getElementsByClassName('move-right')).length;

    if (invert) {
      if (profileService.profile && !$rootScope.hideNavigation) {
        elem.addClass('move-right');
      }
    } else {
      if (leftbarActive) {
        hideSidebars();
      }
    }
  };

  root.openExternalLink = function(url) {
    var ref = window.open(url, '_blank', 'location=no');
  };

  root.path = function(path) {
    $state.transitionTo(path);
    hideSidebars();
  };

  root.swipe = function(invert) {
    toggleSidebar(invert);
  };

  root.walletHome = function() {
    var fc = profileService.focusedClient;

    if (fc && !fc.isComplete()) {
      root.path('copayers');
    } else {
      root.path('walletHome');
    }
  };

  root.home = function() {
    if ($rootScope.iden)
      root.walletHome();
    else
      root.path('signin');
  };

  root.addWallet = function() {
    $state.go('add');
  };

  root.send = function() {
    $state.go('send');
  };

  root.preferences = function() {
    $state.go('preferences');
  };

  root.reload = function() {
    $state.reload();
  };


  // Global go. This should be in a better place TODO
  // We dont do a 'go' directive, to use the benefits of ng-touch with ng-click
  $rootScope.go = function(path) {
    root.path(path);
  };

  $rootScope.openExternalLink = function(url) {
    root.openExternalLink(url);
  };



  return root;
});

'use strict';

angular.module('copayApp.services').value('isCordova',  window.cordova ? true : false);

'use strict';

// Detect mobile devices
var isMobile = {
  Android: function() {
    return !!navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return !!navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return !!navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return !!navigator.userAgent.match(/IEMobile/i);
  },
  Safari: function() {
    return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};


angular.module('copayApp.services').value('isMobile', isMobile);

'use strict';
angular.module('copayApp.services')
  .factory('legacyImportService', function($rootScope, $log, $timeout, $http, lodash, bitcore, bwcService, sjcl, profileService) {

    var root = {};
    var wc = bwcService.getClient();

    root.getKeyForEmail = function(email) {
      var hash = bitcore.crypto.Hash.sha256ripemd160(new bitcore.deps.Buffer(email)).toString('hex');
      $log.debug('Storage key:' + hash);
      return 'profile::' + hash;
    };

    root.getKeyForWallet = function(id) {
      return 'wallet::' + id;
    };

    root._importOne = function(user, pass, walletId, get, cb) {
      get(root.getKeyForWallet(walletId), function(err, blob) {
        if (err) {
          $log.warn('Could not fetch wallet: ' + walletId + ":" + err);
          return cb('Could not fetch ' + walletId);
        }
        profileService.importLegacyWallet(user, pass, blob, cb);
      });
    };


    root._doImport = function(user, pass, get, cb) {
      var self = this;
      get(root.getKeyForEmail(user), function(err, p) {
        if (err || !p)
          return cb(err || ('Could not find profile for ' + user));


        var ids = wc.getWalletIdsFromOldCopay(user, pass, p);
        if (!ids)
          return cb('Could not find wallets on the profile');

        $rootScope.$emit('Local/ImportStatusUpdate',
          'Found ' + ids.length + ' wallets to import:' + ids.join());

        $log.info('Importing Wallet Ids:', ids);

        var i = 0;
        var okIds = [];
        var toScanIds = [];
        lodash.each(ids, function(walletId) {
          $timeout(function() {
            $rootScope.$emit('Local/ImportStatusUpdate',
              'Importing wallet ' + walletId + ' ... ');

            self._importOne(user, pass, walletId, get, function(err, id, name, existed) {
              if (err) {
                $rootScope.$emit('Local/ImportStatusUpdate',
                  'Failed to import wallet ' + (name || walletId));
              } else {
                okIds.push(walletId);
                $rootScope.$emit('Local/ImportStatusUpdate',
                  'Wallet ' + id + '[' + name + '] imported successfully');

                if (!existed) {
                  $log.info('Wallet ' + walletId + ' was created. need to be scanned');
                  toScanIds.push(id);
                }
              }

              if (++i == ids.length) {
                return cb(null, okIds, toScanIds);
              }
            });
          }, 100);
        });
      });
    };

    root.import = function(user, pass, serverURL, fromCloud, cb) {

      var insightGet = function(key, cb) {


        var kdfbinary = function(password, salt, iterations, length) {
          iterations = iterations || defaultIterations;
          length = length || 512;
          salt = sjcl.codec.base64.toBits(salt || defaultSalt);

          var hash = sjcl.hash.sha256.hash(sjcl.hash.sha256.hash(password));
          var prff = function(key) {
            return new sjcl.misc.hmac(hash, sjcl.hash.sha1);
          };

          return sjcl.misc.pbkdf2(hash, salt, iterations, length, prff);
        };

        var salt = 'jBbYTj8zTrOt6V';
        var iter = 1000;
        var SEPARATOR = '|';

        var kdfb = kdfbinary(pass + SEPARATOR + user, salt, iter);
        var kdfb64 = sjcl.codec.base64.fromBits(kdfb);


        var keyBuf = new bitcore.deps.Buffer(kdfb64);
        var passphrase = bitcore.crypto.Hash.sha256sha256(keyBuf).toString('base64');
        var authHeader = new bitcore.deps.Buffer(user + ':' + passphrase).toString('base64');
        var retrieveUrl = serverURL + '/retrieve';
        var getParams = {
          method: 'GET',
          url: retrieveUrl + '?key=' + encodeURIComponent(key) + '&rand=' + Math.random(),
          headers: {
            'Authorization': authHeader,
          },
        };
        $log.debug('Insight GET', getParams);

        $http(getParams)
          .success(function(data) {
            data = JSON.stringify(data);
            $log.info('Fetch from insight OK:' + getParams.url);
            return cb(null, data);
          })
          .error(function() {
            $log.warn('Failed to fetch from insight');
            return cb('PNOTFOUND: Profile not found');
          });
      };

      var localStorageGet = function(key, cb) {
        var v = localStorage.getItem(key);
        return cb(null, v);
      };

      var get = fromCloud ? insightGet : localStorageGet;

      root._doImport(user, pass, get, cb);
    };

    return root;
  });

'use strict';

angular.module('copayApp.services')
  .factory('localStorageService', function() {

    var isChromeApp = typeof window !== "undefined" && window.chrome && chrome.runtime && chrome.runtime.id;
    var root = {};

    var ls = ((typeof localStorage !== "undefined") ? localStorage : null);

    if (isChromeApp && !ls) {
      ls = localStorage = chrome.storage.local;
      window.localStorage = chrome.storage.local;
    }

    if (!ls)
      throw new Error('localstorage not available, cannot run plugin');

    root.init = function() {};

    root.get = function(k, cb) {
      if (isChromeApp) {
        chrome.storage.local.get(k,
          function(data) {
            //TODO check for errors
            return cb(null, data[k]);
          });
      } else {
        return cb(null, ls.getItem(k));
      }
    };

    /**
     * Same as setItem, but fails if an item already exists
     */
    root.create = function(name, value, callback) {
      root.get(name,
        function(err, data) {
          if (data) {
            return callback('EEXISTS');
          } else {
            return root.set(name, value, callback);
          }
        });
    };

    root.set = function(k, v, cb) {
      if (isChromeApp) {
        var obj = {};
        obj[k] = v;

        chrome.storage.local.set(obj, cb);
      } else {
        ls.setItem(k, v);
        return cb();
      }

    };

    root.remove = function(k, cb) {
      if (isChromeApp) {
        chrome.storage.local.remove(k, cb);
      } else {
        ls.removeItem(k);
        return cb();
      }

    };

    root.clear = function(cb) {
      // NOP
      return cb();
    };

    root.list = function(cb) {
      if (isChromeApp) {
        chrome.storage.local.get(null, function(items) {
          return cb(null, lodash.keys(items));
        });
      } else {
        var ret = [];
        var l = ls.length;

        for (var i = 0; i < l; i++)
          ret.push(ls.key(i));

        return cb(null, ret);
      }
    };

    return root;
  });

'use strict';

angular.module('copayApp.services').
factory('notification', ['$timeout',
  function($timeout) {

    var notifications = [];

    /*
    ls.getItem('notifications', function(err, data) {
      if (data) {
        notifications = JSON.parse(data);
      }
    });
    */

    var queue = [];
    var settings = {
      info: {
        duration: 6000,
        enabled: true
      },
      funds: {
        duration: 7000,
        enabled: true
      },
      version: {
        duration: 60000,
        enabled: true
      },
      warning: {
        duration: 7000,
        enabled: true
      },
      error: {
        duration: 7000,
        enabled: true
      },
      success: {
        duration: 5000,
        enabled: true
      },
      progress: {
        duration: 0,
        enabled: true
      },
      custom: {
        duration: 35000,
        enabled: true
      },
      details: true,
      localStorage: false,
      html5Mode: false,
      html5DefaultIcon: 'img/favicon.ico'
    };

    function html5Notify(icon, title, content, ondisplay, onclose) {
      if (window.webkitNotifications && window.webkitNotifications.checkPermission() === 0) {
        if (!icon) {
          icon = 'img/favicon.ico';
        }
        var noti = window.webkitNotifications.createNotification(icon, title, content);
        if (typeof ondisplay === 'function') {
          noti.ondisplay = ondisplay;
        }
        if (typeof onclose === 'function') {
          noti.onclose = onclose;
        }
        noti.show();
      } else {
        settings.html5Mode = false;
      }
    }


    return {

      /* ========== SETTINGS RELATED METHODS =============*/

      disableHtml5Mode: function() {
        settings.html5Mode = false;
      },

      disableType: function(notificationType) {
        settings[notificationType].enabled = false;
      },

      enableHtml5Mode: function() {
        // settings.html5Mode = true;
        settings.html5Mode = this.requestHtml5ModePermissions();
      },

      enableType: function(notificationType) {
        settings[notificationType].enabled = true;
      },

      getSettings: function() {
        return settings;
      },

      toggleType: function(notificationType) {
        settings[notificationType].enabled = !settings[notificationType].enabled;
      },

      toggleHtml5Mode: function() {
        settings.html5Mode = !settings.html5Mode;
      },

      requestHtml5ModePermissions: function() {
        if (window.webkitNotifications) {
          if (window.webkitNotifications.checkPermission() === 0) {
            return true;
          } else {
            window.webkitNotifications.requestPermission(function() {
              if (window.webkitNotifications.checkPermission() === 0) {
                settings.html5Mode = true;
              } else {
                settings.html5Mode = false;
              }
            });
            return false;
          }
        } else {
          return false;
        }
      },


      /* ============ QUERYING RELATED METHODS ============*/

      getAll: function() {
        // Returns all notifications that are currently stored
        return notifications;
      },

      getQueue: function() {
        return queue;
      },

      /* ============== NOTIFICATION METHODS ==============*/

      info: function(title, content, userData) {
        return this.awesomeNotify('info', 'fi-info', title, content, userData);
      },

      funds: function(title, content, userData) {
        return this.awesomeNotify('funds', 'icon-receive', title, content, userData);
      },

      version: function(title, content, severe) {
        return this.awesomeNotify('version', severe ? 'fi-alert' : 'fi-flag', title, content);
      },

      error: function(title, content, userData) {
        return this.awesomeNotify('error', 'fi-x', title, content, userData);
      },

      success: function(title, content, userData) {
        return this.awesomeNotify('success', 'fi-check', title, content, userData);
      },

      warning: function(title, content, userData) {
        return this.awesomeNotify('warning', 'fi-alert', title, content, userData);
      },

      new: function(title, content, userData) {
        return this.awesomeNotify('warning', 'fi-plus', title, content, userData);
      },

      sent: function(title, content, userData) {
        return this.awesomeNotify('warning', 'icon-paperplane', title, content, userData);
      },

      awesomeNotify: function(type, icon, title, content, userData) {
        /**
         * Supposed to wrap the makeNotification method for drawing icons using font-awesome
         * rather than an image.
         *
         * Need to find out how I'm going to make the API take either an image
         * resource, or a font-awesome icon and then display either of them.
         * Also should probably provide some bits of color, could do the coloring
         * through classes.
         */
        // image = '<i class="icon-' + image + '"></i>';
        return this.makeNotification(type, false, icon, title, content, userData);
      },

      notify: function(image, title, content, userData) {
        // Wraps the makeNotification method for displaying notifications with images
        // rather than icons
        return this.makeNotification('custom', image, true, title, content, userData);
      },

      makeNotification: function(type, image, icon, title, content, userData) {
        var notification = {
          'type': type,
          'image': image,
          'icon': icon,
          'title': title,
          'content': content,
          'timestamp': +new Date(),
          'userData': userData
        };

        notifications.push(notification);

        if (settings.html5Mode) {
          html5Notify(image, title, content, function() {
            // inner on display function
          }, function() {
            // inner on close function
          });
        }

        //this is done because html5Notify() changes the variable settings.html5Mode
        if (!settings.html5Mode) {
          queue.push(notification);
          $timeout(function removeFromQueueTimeout() {
            queue.splice(queue.indexOf(notification), 1);
          }, settings[type].duration);
        }

        // Mobile notification
        if (window && window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate([200, 100, 200]);
        };

        if (document.hidden && (type == 'info' || type == 'funds')) {
          new window.Notification(title, {
            body: content,
            icon: 'img/notification.png'
          });
        }

        this.save();
        return notification;
      },


      /* ============ PERSISTENCE METHODS ============ */

      save: function() {
        // Save all the notifications into localStorage
        if (settings.localStorage) {
          localStorage.setItem('notifications', JSON.stringify(notifications));
        }
      },

      restore: function() {
        // Load all notifications from localStorage
      },

      clear: function() {
        notifications = [];
        this.save();
      }

    };
  }
]).directive('notifications', function(notification, $compile) {
  /**
   *
   * It should also parse the arguments passed to it that specify
   * its position on the screen like "bottom right" and apply those
   * positions as a class to the container element
   *
   * Finally, the directive should have its own controller for
   * handling all of the notifications from the notification service
   */
  function link(scope, element, attrs) {
    var position = attrs.notifications;
    position = position.split(' ');
    element.addClass('dr-notification-container');
    for (var i = 0; i < position.length; i++) {
      element.addClass(position[i]);
    }
  }

  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'views/includes/notifications.html',
    link: link,
    controller: ['$scope',
      function NotificationsCtrl($scope) {
        $scope.queue = notification.getQueue();

        $scope.removeNotification = function(noti) {
          $scope.queue.splice($scope.queue.indexOf(noti), 1);
        };
      }
    ]

  };
});

'use strict';
angular.module('copayApp.services')
  .factory('notificationService', function profileServiceFactory($filter, notification, lodash, configService) {

    var root = {};

    var groupingTime = 4000;
    var lastNotificationOnWallet = {};

    root.getLast = function(walletId) {
      var last = lastNotificationOnWallet[walletId];
      if (!last) return null;

      return Date.now() - last.ts < groupingTime ? last : null;
    };

    root.storeLast = function(notificationData, walletId) {
      lastNotificationOnWallet[walletId] = {
        creatorId: notificationData.creatorId,
        type: notificationData.type,
        ts: Date.now(),
      };
    };

    root.shouldSkip = function(notificationData, last) {
      if (!last) return false;

      // rules...
      if (last.type === 'NewTxProposal' 
          && notificationData.type === 'TxProposalAcceptedBy')
        return true;

      if (last.type === 'TxProposalFinallyAccepted' 
          && notificationData.type === 'NewOutgoingTx')
        return true;

      if (last.type === 'TxProposalRejectedBy' 
          && notificationData.type === 'TxProposalFinallyRejected')
        return true;


      return false;
    };


    root.newBWCNotification = function(notificationData, walletId, walletName) {
      var last = root.getLast(walletId);
      root.storeLast(notificationData, walletId);

      if (root.shouldSkip(notificationData, last))
        return;

      var config = configService.getSync();
      config.colorFor = config.colorFor || {};
      var color = config.colorFor[walletId] || '#1ABC9C';

      switch (notificationData.type) {
        case 'NewTxProposal':
          notification.new('New Transaction',
            walletName, {color: color} );
          break;
        case 'TxProposalAcceptedBy':
          notification.success('Transaction Signed',
            walletName, {color: color} );
          break;
        case 'TxProposalRejectedBy':
          notification.error('Transaction Rejected',
            walletName, {color: color} );
          break;
        case 'TxProposalFinallyRejected':
          notification.error('A transaction was finally rejected',
            walletName, {color: color} );
          break;
        case 'NewOutgoingTx':
          notification.sent('Transaction Sent',
            walletName, {color: color} );
          break;
        case 'NewIncomingTx':
          notification.funds('Funds received',
            walletName, {color: color} );
          break;
        case 'ScanFinished':
          notification.success('Scan Finished',
            walletName, {color: color} );;
          break;

        case 'NewCopayer':
          // No UX notification
          break;
      }
    };

    return root;
  });

'use strict';

angular.module('copayApp.services').factory('pluginManager', function() {
  var root = {};
  root.getInstance = function(config){
    return new copay.PluginManager(config);
  };

  return root;
});

'use strict';
angular.module('copayApp.services')
  .factory('profileService', function profileServiceFactory($rootScope, $location, $timeout, $filter, $log, lodash, pluginManager, balanceService, applicationService, storageService, bwcService, configService, notificationService, notification) {

    var root = {};

    root.profile = null;
    root.focusedClient = null;
    root.walletClients = {};

    root.getUtils = function() {
      return bwcService.getUtils();
    };

    root.formatAmount = function(amount) {
      var config = configService.getSync().wallet.settings;
      if (config.unitCode == 'sat') return amount;

      //TODO : now only works for english, specify opts to change thousand separator and decimal separator
      return this.getUtils().formatAmount(amount, config.unitCode);
    };

    root._setFocus = function(walletId, cb) {
      $log.debug('Set focus:', walletId);

      // Set local object
      root.focusedClient = root.walletClients[walletId];

      if (lodash.isEmpty(root.focusedClient)) {
        root.focusedClient = root.walletClients[lodash.keys(root.walletClients)[0]];
      }

      if (lodash.isEmpty(root.focusedClient)) {
        $rootScope.$emit('Local/NoWallets');
      }

      // set if completed
      if (!lodash.isEmpty(root.focusedClient)) {
        $rootScope.$emit('Local/NewFocusedWallet');
      }

      return cb();
    };

    root.setAndStoreFocus = function(walletId, cb) {
      root._setFocus(walletId, function() {
        storageService.storeFocusedWalletId(walletId, cb);
      });
    };

    root.setWalletClients = function() {
      lodash.each(root.profile.credentials, function(credentials) {

        if (root.walletClients[credentials.walletId] &&
          root.walletClients[credentials.walletId].started) {
          return;
        }

        var client = bwcService.getClient(JSON.stringify(credentials));
        root.walletClients[credentials.walletId] = client;
        client.removeAllListeners();

        client.on('notification', function(n) {
          $log.debug('BWC Notification:', n);
          notificationService.newBWCNotification(n,
            client.credentials.walletId, client.credentials.walletName);

          // Actions for both focuses and unfocuses wallets...
          if (n.type == 'ScanFinished') {
            client.scanning = false;
          }

          if (root.focusedClient.credentials.walletId == client.credentials.walletId) {
            $rootScope.$emit(n.type);
          } else {
            $rootScope.$apply();
          }
        });

        client.on('walletCompleted', function() {
          $log.debug('Wallet completed');

          root.updateCredentialsFC(function() {
            $rootScope.$emit('Local/WalletCompleted')
          });

        });

        root.walletClients[credentials.walletId].started = true;
        client.initNotifications(function(err) {
          if (err) {
            $log.error('Could not init notifications err:', err);
            root.walletClients[credentials.walletId].started = false;
            return;
          }
        });
      });
      $rootScope.$emit('Local/WalletListUpdated');
    };


    root.bindProfile = function(profile, cb) {
      root.profile = profile;

      configService.get(function(err) {
        if (err) return cb(err);
        root.setWalletClients();
        storageService.getFocusedWalletId(function(err, focusedWalletId) {
          if (err) return cb(err);
          root._setFocus(focusedWalletId, cb);
        });
      });
    };


    root.loadAndBindProfile = function(cb) {
      storageService.getProfile(function(err, profile) {
        if (err) {
          notification.error('CRITICAL ERROR: ' + err);
          return cb(err);
        }
        if (!profile) return cb(new Error('NOPROFILE: No profile'));

        return root.bindProfile(profile, cb);
      });
    };

    root._createNewProfile = function(pin, cb) {
      var walletClient = bwcService.getClient();

      walletClient.createWallet('Personal Wallet', 'me', 1, 1, {
        network: 'livenet'
      }, function(err) {
        if (err) return cb('Error creating wallet. Check your internet connection');
        var p = Profile.create({
          credentials: [JSON.parse(walletClient.export())],
        });
        return cb(null, p);
      })
    };

    // TODO copayer name
    root.createWallet = function(opts, cb) {
      var walletClient = bwcService.getClient();
      $log.debug('Creating Wallet:', opts);

      if (opts.extendedPrivateKey) {
        try {
          walletClient.seedFromExtendedPrivateKey(opts.extendedPrivateKey);
        } catch (ex) {
          return cb('Could not create using the specified extended private key');
        }
      }
      walletClient.createWallet(opts.name, opts.myName || 'me', opts.m, opts.n, {
        network: opts.networkName
      }, function(err, secret) {
        if (err) return cb('Error creating wallet');

        root.profile.credentials.push(JSON.parse(walletClient.export()));
        root.setWalletClients();

        root.setAndStoreFocus(walletClient.credentials.walletId, function() {
          storageService.storeProfile(root.profile, function(err) {
            return cb(null, secret);
          });
        });
      })
    };

    root.joinWallet = function(opts, cb) {
      var walletClient = bwcService.getClient();
      $log.debug('Joining Wallet:', opts);
      if (opts.extendedPrivateKey) {
        try {
          walletClient.seedFromExtendedPrivateKey(opts.extendedPrivateKey);
        } catch (ex) {
          return cb('Could not join using the specified extended private key');
        }
      }
      // TODO name
      walletClient.joinWallet(opts.secret, opts.myName || 'me', function(err) {
        // TODO: err
        if (err) return cb('Error joining wallet' + err);

        root.profile.credentials.push(JSON.parse(walletClient.export()));
        root.setWalletClients();

        root.setAndStoreFocus(walletClient.credentials.walletId, function() {
          storageService.storeProfile(root.profile, function(err) {
            return cb(null, secret);
          });
        });
      })
    };

    root.deleteWalletFC = function(opts, cb) {
      var fc = root.focusedClient;
      $log.debug('Deleting Wallet:', fc.credentials.walletName);

      fc.removeAllListeners();
      root.profile.credentials = lodash.reject(root.profile.credentials, {
        walletId: fc.credentials.walletId
      });

      delete root.walletClients[fc.credentials.walletId];
      root.focusedClient = null;

      $timeout(function() {
        root.setWalletClients();
        root.setAndStoreFocus(null, function() {
          storageService.storeProfile(root.profile, function(err) {
            if (err) return cb(err);
            return cb();
          });
        });
      });
    };

    root.importWallet = function(str, opts, cb) {
      var walletClient = bwcService.getClient();
      $log.debug('Importing Wallet:', opts);
      try {
        walletClient.import(str, {
          compressed: opts.compressed,
          password: opts.password
        });
      } catch (err) {
        return cb('Could not import. Check input file and password');
      }

      var walletId = walletClient.credentials.walletId;

      // check if exist
      if (lodash.find(root.profile.credentials, {
        'walletId': walletId
      })) {
        return cb('Wallet already exists');
      }

      root.profile.credentials.push(JSON.parse(walletClient.export()));
      root.setWalletClients();

      root.setAndStoreFocus(walletId, function() {
        storageService.storeProfile(root.profile, function(err) {
          $rootScope.$emit('Local/WalletImported', walletId);
          return cb(null, walletId);
        });
      });
    };



    root.create = function(pin, cb) {
      root._createNewProfile(pin, function(err, p) {
        if (err) return cb(err);
        root.bindProfile(p, function(err) {
          storageService.storeNewProfile(p, function(err) {
            return cb(err);
          });
        });
      });
    };

    root.importLegacyWallet = function(username, password, blob, cb) {
      var walletClient = bwcService.getClient();

      walletClient.createWalletFromOldCopay(username, password, blob, function(err, existed) {
        if (err) return cb('Error importing wallet: ' + err);

        if (root.walletClients[walletClient.credentials.walletId]) {
          $log.debug('Wallet:' + walletClient.credentials.walletName + ' already imported');
          return cb('Wallet Already Imported: ' + walletClient.credentials.walletName);
        };

        $log.debug('Creating Wallet:', walletClient.credentials.walletName);
        root.profile.credentials.push(JSON.parse(walletClient.export()));
        root.setWalletClients();
        root.setAndStoreFocus(walletClient.credentials.walletId, function() {
          storageService.storeProfile(root.profile, function(err) {
            return cb(null, walletClient.credentials.walletId, walletClient.credentials.walletName, existed);
          });
        });
      });
    };

    root.updateCredentialsFC = function(cb) {
      var fc = root.focusedClient;

      var newCredentials = lodash.reject(root.profile.credentials, {
        walletId: fc.credentials.walletId
      });
      newCredentials.push(JSON.parse(fc.export()));
      root.profile.credentials = newCredentials;

      storageService.storeProfile(root.profile, cb);
    };


    root.setPrivateKeyEncryptionFC = function(password, cb) {
      var fc = root.focusedClient;
      $log.debug('Encrypting private key for', fc.credentials.walletName);

      fc.setPrivateKeyEncryption(password);
      fc.lock();
      root.updateCredentialsFC(function() {
        $log.debug('Wallet encrypted');
        return cb();
      });
    };


    root.disablePrivateKeyEncryptionFC = function(cb) {
      var fc = root.focusedClient;
      $log.debug('Disabling private key encryption for', fc.credentials.walletName);

      try {
        fc.disablePrivateKeyEncryption();
      } catch (e) {
        return cb(e);
      }
      root.updateCredentialsFC(function() {
        $log.debug('Wallet encryption disabled');
        return cb();
      });
    };

    root.lockFC = function() {
      var fc = root.focusedClient;
      try {
        fc.lock();
      } catch (e) {};
    };

    root.unlockFC = function(cb) {
      var fc = root.focusedClient;
      $log.debug('Wallet is encrypted');
      $rootScope.$emit('Local/NeedsPassword', false, function(err2, password) {
        if (err2 || !password) {
          return cb(err2 || 'Password needed');
        }
        try {
          fc.unlock(password);
        } catch (e) {
          $log.debug(e);
          return cb('Wrong password');
        }
        $timeout(function() {
          if( fc.isPrivKeyEncrypted()) {
            $log.debug('Locking wallet automatically');
            root.lockFC();
          };
        },2000);
        return cb();
      });
    };


    return root;
  });

'use strict';

//var util = require('util');
//var _ = require('lodash');
//var log = require('../util/log');
//var preconditions = require('preconditions').singleton();
//var request = require('request');

/*
  This class lets interfaces with BitPay's exchange rate API.
*/

var RateService = function(opts) {
  var self = this;

  opts = opts || {};
  self.httprequest = opts.httprequest; // || request;
  self.lodash = opts.lodash;

  self.SAT_TO_BTC = 1 / 1e8;
  self.BTC_TO_SAT = 1e8;
  self.UNAVAILABLE_ERROR = 'Service is not available - check for service.isAvailable() or use service.whenAvailable()';
  self.UNSUPPORTED_CURRENCY_ERROR = 'Currency not supported';

  self._url = opts.url || 'https://insight.bitpay.com:443/api/rates';

  self._isAvailable = false;
  self._rates = {};
  self._alternatives = [];
  self._queued = [];

  self._fetchCurrencies();
};


var _instance;
RateService.singleton = function(opts) {
  if (!_instance) {
    _instance = new RateService(opts);
  }
  return _instance;
};

RateService.prototype._fetchCurrencies = function() {
  var self = this;

  var backoffSeconds = 5;
  var updateFrequencySeconds = 3600;
  var rateServiceUrl = 'https://bitpay.com/api/rates';

  var retrieve = function() {
    //log.info('Fetching exchange rates');
    self.httprequest.get(rateServiceUrl).success(function(res) {
      self.lodash.each(res, function(currency) {
        self._rates[currency.code] = currency.rate;
        self._alternatives.push({
          name: currency.name,
          isoCode: currency.code,
          rate: currency.rate
        });
      });
      self._isAvailable = true;
      self.lodash.each(self._queued, function(callback) {
        setTimeout(callback, 1);
      });
      setTimeout(retrieve, updateFrequencySeconds * 1000);
    }).error(function(err) {
      //log.debug('Error fetching exchange rates', err);
      setTimeout(function() {
        backoffSeconds *= 1.5;
        retrieve();
      }, backoffSeconds * 1000);
      return;
    });

  };

  retrieve();
};

RateService.prototype.getRate = function(code) {
  return this._rates[code];
};

RateService.prototype.getHistoricRate = function(code, date, cb) {
  var self = this;

  self.httprequest.get(self._url + '/' + code + '?ts=' + date)
    .success(function(body) {
      return cb(null, body.rate)
    })
    .error(function(err) {
      return cb(err)
    });

};

RateService.prototype.getHistoricRates = function(code, dates, cb) {
  var self = this;

  var tsList = dates.join(',');

  self.httprequest.get(self._url + '/' + code + '?ts=' + tsList)
    .success(function(body) {
      if (!self.lodash.isArray(body)) {
        body = [{
          ts: dates[0],
          rate: body.rate
        }];
      }
      return cb(null, body);
    })
    .error(function(err) {
      return cb(err)
    });
};

RateService.prototype.getAlternatives = function() {
  return this._alternatives;
};

RateService.prototype.isAvailable = function() {
  return this._isAvailable;
};

RateService.prototype.whenAvailable = function(callback) {
  if (this.isAvailable()) {
    setTimeout(callback, 1);
  } else {
    this._queued.push(callback);
  }
};

RateService.prototype.toFiat = function(satoshis, code) {
  if (!this.isAvailable()) {
    return null;
  }

  return satoshis * this.SAT_TO_BTC * this.getRate(code);
};

RateService.prototype.toFiatHistoric = function(satoshis, code, date, cb) {
  var self = this;

  self.getHistoricRate(code, date, function(err, rate) {
    if (err) return cb(err);
    return cb(null, satoshis * self.SAT_TO_BTC * rate);
  });
};

RateService.prototype.fromFiat = function(amount, code) {
  if (!this.isAvailable()) {
    return null;
  }
  return amount / this.getRate(code) * this.BTC_TO_SAT;
};

RateService.prototype.listAlternatives = function() {
  var self = this;
  if (!this.isAvailable()) {
    return [];
  }

  return self.lodash.map(this.getAlternatives(), function(item) {
    return {
      name: item.name,
      isoCode: item.isoCode
    }
  });
};

angular.module('copayApp.services').factory('rateService', function($http, lodash) {
  // var cfg = _.extend(config.rates, {
  //   httprequest: $http
  // });

  var cfg = {
    httprequest: $http,
    lodash: lodash
  };
  return RateService.singleton(cfg);
});


'use strict';
angular.module('copayApp.services')
  .factory('sjcl', function bitcoreFactory(bwcService) {
    var sjcl = bwcService.getSJCL();
    return sjcl;
  });

'use strict';
angular.module('copayApp.services')
  .factory('storageService', function(localStorageService, sjcl, $log, lodash) {

    var root = {};

    var getUUID = function(cb) {
      // TO SIMULATE MOBILE
      //return cb('hola');
      if (!window || !window.plugins || !window.plugins.uniqueDeviceID)
        return cb(null);

      window.plugins.uniqueDeviceID.get(
        function(uuid) {
          return cb(uuid);
        }, cb);
    };

    var encryptOnMobile = function(text, cb) {
      getUUID(function(uuid) {
        if (uuid) {
          $log.debug('Encrypting profile');
          text = sjcl.encrypt(uuid, text);
        }
        return cb(null, text);
      });
    };


    var decryptOnMobile = function(text, cb) {
      var json;
      try {
        json = JSON.parse(text);
      } catch (e) {};

      if (!json.iter || !json.ct)
        return cb(null, text);

      $log.debug('Profile is encrypted');
      getUUID(function(uuid) {
        if (!uuid)
          return cb(new Error('Could not decrypt localstorage profile'));

        text = sjcl.decrypt(uuid, text);
        return cb(null, text);
      });
    };

    root.storeNewProfile = function(profile, cb) {
      encryptOnMobile(profile.toObj(), function(err, x) {
        localStorageService.create('profile', x, cb);
      });
    };

    root.storeProfile = function(profile, cb) {
      encryptOnMobile(profile.toObj(), function(err, x) {
        localStorageService.set('profile', x, cb);
      });
    };

    root.getProfile = function(cb) {
      localStorageService.get('profile', function(err, str) {
        if (err || !str) return cb(err);

        decryptOnMobile(str, function(err, str) {
          if (err) return cb(err);
          var p, err;
          try {
            p = Profile.fromString(str);
          } catch (e) {
            err = new Error('Could not read profile:' + p);
          }
          return cb(err, p);
        });
      });
    };

    root.deleteProfile = function(cb) {
      localStorageService.remove('profile', cb);
    };

    root.storeFocusedWalletId = function(id, cb) {
      localStorageService.set('focusedWalletId', id, cb);
    };

    root.getFocusedWalletId = function(cb) {
      localStorageService.get('focusedWalletId', cb);
    };

    root.getLastAddress = function(walletId, cb) {
      localStorageService.get('lastAddress-' + walletId, cb);
    };

    root.storeLastAddress = function(walletId, address, cb) {
      localStorageService.set('lastAddress-' + walletId, address, cb);
    };

    root.clearLastAddress = function(walletId, cb) {
      localStorageService.remove('lastAddress-' + walletId, cb);
    };

    root.setBackupFlag = function(walletId, cb) {
      localStorageService.set('backup-' + walletId, Date.now(), cb);
    };

    root.getBackupFlag = function(walletId, cb) {
      localStorageService.get('backup-' + walletId, cb);
    };

    return root;
  });

'use strict';

angular.module('copayApp.services').factory('txStatus', function($modal, lodash, profileService) {
  var root = {};

  root.notify = function(txp) {
    var fc = profileService.focusedClient;
    var msg;

    var status = txp.status;
    
    if (status == 'broadcasted') {
      msg = 'Transaction broadcasted';
    }
    else {
      var action = lodash.find(txp.actions, {
        copayerId: fc.credentials.copayerId
      });
      if (!action) {
        msg = 'Transaction proposal created';
      } else if (action.type == 'accept') {
        msg = 'Transaction proposal signed';
      } else if (action.type == 'reject') {
        msg = 'Transaction was rejected';
      }
    }

    if (msg)
      root.openModal(msg);
  };

  root.openModal = function(statusStr) {
    var ModalInstanceCtrl = function($scope, $modalInstance) {
      $scope.statusStr = statusStr;
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    };
    $modal.open({
      templateUrl: 'views/modals/tx-status.html',
      windowClass: 'full',
      controller: ModalInstanceCtrl,
    });
  };

  return root;
});

'use strict';

var UriHandler = function() {};

UriHandler.prototype.register = function() {
  var base = window.location.origin + '/';
  var url = base + '#/uri-payment/%s';

  if(navigator.registerProtocolHandler) {
    navigator.registerProtocolHandler('bitcoin', url, 'Copay');
  }
};

angular.module('copayApp.services').value('uriHandler', new UriHandler());


'use strict';

angular.module('copayApp.controllers').controller('backupController',
  function($rootScope, $scope, $timeout, backupService, profileService, isMobile, isCordova, notification, go) {
    this.isSafari = isMobile.Safari();
    this.isCordova = isCordova;
    this.error = null;
    this.success = null;

    var fc = profileService.focusedClient;
    this.isEncrypted = fc.isPrivKeyEncrypted();

    this.copyText = function(text) {
      if (isCordova) {
        window.cordova.plugins.clipboard.copy(text);
        window.plugins.toast.showShortCenter('Copied to clipboard');
      }
    };

    this.downloadWalletBackup = function() {
      backupService.walletDownload(this.password, function() {
        $rootScope.$emit('Local/BackupDone');
        notification.success('Backup created', 'Encrypted backup file saved');
        go.walletHome();
      });
    };

    this.getBackup = function() {
      return backupService.walletExport(this.password);
    };

    this.viewWalletBackup = function() {
      var self = this;
      this.loading = true;
      $timeout(function() {
        self.backupWalletPlainText = self.getBackup();
        $rootScope.$emit('Local/BackupDone');
      }, 100);
    };

    this.copyWalletBackup = function() {
      var ew = this.getBackup();
      window.cordova.plugins.clipboard.copy(ew);
      window.plugins.toast.showShortCenter('Copied to clipboard');
      $rootScope.$emit('Local/BackupDone');
    };

    this.sendWalletBackup = function() {
      var fc = profileService.focusedClient;
      if (isMobile.Android() || isMobile.Windows()) {
        window.ignoreMobilePause = true;
      }
      window.plugins.toast.showShortCenter('Preparing backup...');
      var name = (fc.credentials.walletName || fc.credentials.walletId);
      var ew = this.getBackup();
      var properties = {
        subject: 'Copay Wallet Backup: ' + name,
        body: 'Here is the encrypted backup of the wallet ' + name + ': \n\n' + ew + '\n\n To import this backup, copy all text between {...}, including the symbols {}',
        isHtml: false
      };
      $rootScope.$emit('Local/BackupDone');
      window.plugin.email.open(properties);
    };

  });

'use strict';

angular.module('copayApp.controllers').controller('copayersController',
  function($scope, $rootScope, $timeout, $log, $modal, profileService, go, notification, isCordova) {
    var self = this;


    self.init = function() {
      var fc = profileService.focusedClient;
      if (fc.isComplete()) {
        $log.debug('Wallet Complete...redirecting')
        go.walletHome();
        return;
      }
      self.loading = false;
      self.isCordova = isCordova;
    };

    var _modalDeleteWallet = function() {
      var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.title = 'Are you sure you want to delete this wallet?';
        $scope.loading = false;

        $scope.ok = function() {
          $scope.loading = true;
          $modalInstance.close('ok');

        };
        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      var modalInstance = $modal.open({
        templateUrl: 'views/modals/confirmation.html',
        windowClass: 'full',
        controller: ModalInstanceCtrl
      });
      modalInstance.result.then(function(ok) {
        if (ok) {
          _deleteWallet();
        }
      });
    };

    var _deleteWallet = function() {
      var fc = profileService.focusedClient;
      $timeout(function() {
        var fc = profileService.focusedClient;
        var walletName = fc.credentials.walletName;

        profileService.deleteWalletFC({}, function(err) {
          if (err) {
            this.error = err.message || err;
            console.log(err);
            $timeout(function() {
              $scope.$digest();
            });
          } else {
            go.walletHome();
            $timeout(function() {
              notification.success('Success', 'The wallet "' + walletName + '" was deleted');
            });
          }
        });
      }, 100);
    };

    self.deleteWallet = function() {
      var fc = profileService.focusedClient;
      if (isCordova) {
        navigator.notification.confirm(
          'Are you sure you want to delete this wallet?',
          function(buttonIndex) {
            if (buttonIndex == 2) {
              _deleteWallet();
            }
          },
          'Confirm', ['Cancel', 'OK']
        );
      } else {
        _modalDeleteWallet();
      }
    };

    self.copySecret = function(secret) {
      if (isCordova) {
        window.cordova.plugins.clipboard.copy(secret);
        window.plugins.toast.showShortCenter('Copied to clipboard');
      }
    };

    self.shareSecret = function(secret) {
      if (isCordova) {
        if (isMobile.Android() || isMobile.Windows()) {
          window.ignoreMobilePause = true;
        }
        window.plugins.socialsharing.share(secret, null, null, null);
      }
    };

  });

'use strict';

angular.module('copayApp.controllers').controller('createController',
  function($scope, $rootScope, $location, $timeout, $log, lodash, go, profileService, configService, isCordova) {

    var self = this;
    var defaults = configService.getDefaults();

    /* For compressed keys, m*73 + n*34 <= 496 */
    var COPAYER_PAIR_LIMITS = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 4,
      6: 4,
      7: 3,
      8: 3,
      9: 2,
      10: 2,
      11: 1,
      12: 1,
    };

    // ng-repeat defined number of times instead of repeating over array?
    this.getNumber = function(num) {
      return new Array(num);
    }

    var updateRCSelect = function(n) {
      var maxReq = COPAYER_PAIR_LIMITS[n];
      self.RCValues = lodash.range(1, maxReq + 1);
      $scope.requiredCopayers = Math.min(parseInt(n / 2 + 1), maxReq);
    };

    $scope.$watch('totalCopayers', function(tc) {
      updateRCSelect(tc);
    });

    this.TCValues = lodash.range(1, defaults.limits.totalCopayers + 1);
    $scope.totalCopayers = defaults.wallet.totalCopayers;

    this.create = function(form) {
      if (form && form.$invalid) {
        this.error = 'Please enter the required fields';
        return;
      }
      var opts = {
        m: $scope.requiredCopayers,
        n: $scope.totalCopayers,
        name: form.walletName.$modelValue,
        extendedPrivateKey: form.privateKey.$modelValue,
        myName: $scope.totalCopayers > 1 ? form.myName.$modelValue : null,
        networkName: form.isTestnet.$modelValue ? 'testnet' : 'livenet'
      };
      self.loading = true;

      $timeout(function() {
        profileService.createWallet(opts, function(err, secret) {
          self.loading = false;
          if (err) {
            $log.debug(err);
            self.error = 'Could not create wallet: ' + err;
          }
          else {
            go.walletHome();
          }
        });
      }, 100);
    };

    $scope.$on("$destroy", function() {
      $rootScope.hideWalletNavigation = false;
    });
  });

'use strict';

angular.module('copayApp.controllers').controller('createProfileController', function($rootScope, $scope, $log, $timeout, profileService, go) {
  var self = this;

  if (profileService.profile)
    go.walletHome();

  var pin='';
  // $rootScope.$on('pin', function(event, pin) {
    self.creatingProfile = true;

    $timeout(function() {
      profileService.create(pin, function(err) {
        if (err) {
          self.creatingProfile = false;
          $log.warn(err);
          self.error = err;
          $scope.$apply();
          $timeout(function() {
            go.reload();
          }, 3000);
        } else {
          go.walletHome();
        }
      });
     }, 100);
  // });
});

'use strict';

angular.module('copayApp.controllers').controller('DevLoginController', function($scope, $rootScope, $routeParams, identityService) {

  var mail = $routeParams.mail;
  var password = $routeParams.password;

  var form = {};
  form.email = {};
  form.password = {};
  form.email.$modelValue = mail;
  form.password.$modelValue = password;

  identityService.open($scope, form);

});

'use strict';

angular.module('copayApp.controllers').controller('EmailConfirmationController', function($scope, $rootScope, $location) {
  $rootScope.fromEmailConfirmation = true;
  $location.path('/');
});

'use strict';

angular.module('copayApp.controllers').controller('historyController',
  function($scope, $rootScope, $filter, $timeout, $modal, $log, profileService, notification, go, configService, rateService, lodash) {

    function strip(number) {
      return (parseFloat(number.toPrecision(12)));
    }

    var fc = profileService.focusedClient;
    var config = configService.getSync().wallet.settings;
    var formatAmount = profileService.formatAmount;
    this.unitToSatoshi = config.unitToSatoshi;
    this.satToUnit = 1 / this.unitToSatoshi;
    this.unitName = config.unitName;
    this.alternativeIsoCode = config.alternativeIsoCode;

    this.getUnitName = function() {
      return this.unitName;
    };

    this.getAlternativeIsoCode = function() {
      return this.alternativeIsoCode;
    };

    this._addRates = function(txs, cb) {
      if (!txs || txs.length == 0) return cb();
      var index = lodash.groupBy(txs, 'rateTs');

      rateService.getHistoricRates(config.alternativeIsoCode, lodash.keys(index), function(err, res) {
        if (err || !res) return cb(err);
        lodash.each(res, function(r) {
          lodash.each(index[r.ts], function(tx) {
            var alternativeAmount = (r.rate != null ? tx.amount * rateService.SAT_TO_BTC * r.rate : null);
            tx.alternativeAmount = alternativeAmount ? $filter('noFractionNumber')(alternativeAmount, 2) : null;
          });
        });
        return cb();
      });
    };

    this.openTxModal = function(btx) {
      var self = this;
      var fc = profileService.focusedClient;
      var ModalInstanceCtrl = function($scope, $modalInstance, profileService) {
        $scope.btx = btx;
        $scope.settings = config;
        $scope.btx.amountStr = profileService.formatAmount(btx.amount);
        $scope.color = fc.backgroundColor;

        $scope.getAmount = function(amount) {
          return self.getAmount(amount);
        };

        $scope.getUnitName = function() {
          return self.getUnitName();
        };

        $scope.getShortNetworkName = function() {
          var n = fc.credentials.network;
          return n.substring(0, 4);
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      $modal.open({
        templateUrl: 'views/modals/tx-details.html',
        windowClass: 'full',
        controller: ModalInstanceCtrl,
      });
    };


    this.formatAmount = function(amount) {
      return profileService.formatAmount(amount);
    };

    this.hasAction = function(actions, action) {
      return actions.hasOwnProperty('create');
    };

  });

'use strict';

angular.module('copayApp.controllers').controller('importController',
  function($scope, $rootScope, $location, $timeout, $log, profileService, notification, go, isMobile, isCordova, sjcl) {

    var self = this;

    this.isSafari = isMobile.Safari();
    this.isCordova = isCordova;
    var reader = new FileReader();

    window.ignoreMobilePause = true;
    $scope.$on('$destroy', function() {
      $timeout(function(){
        window.ignoreMobilePause = false;
      }, 100);
    });

    var _import = function(str, opts) {
      var str2;
      try {
       str2 = sjcl.decrypt(self.password, str);
      } catch (e) {
        self.error = 'Could not decrypt file, check your password';
        $log.warn(e);
        $scope.$apply();
        return;
      };

      self.loading = true;

      $timeout(function() {
        profileService.importWallet(str2, {
          compressed: null,
          password: null
        }, function(err, walletId) {
          self.loading = false;
          if (err) {
            self.error = err;
          }
          else {
            go.walletHome();
            notification.success('Success', 'Your wallet has been imported correctly');
          }
        });
      }, 100);
    };

    $scope.getFile = function() {
      // If we use onloadend, we need to check the readyState.
      reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          _import(evt.target.result);
        }
      }
    };

    this.import = function(form) {
      if (form.$invalid) {
        this.error = 'There is an error in the form';
        $scope.$apply();
        return;
      }

      var backupFile = $scope.file;
      var backupText = form.backupText.$modelValue;
      var password = form.password.$modelValue;

      if (!backupFile && !backupText) {
        this.error = 'Please, select your backup file';
        $scope.$apply();
        return;
      }

      if (backupFile) {
        reader.readAsBinaryString(backupFile);
      } else {
        _import(backupText);
      }
    };
  });

'use strict';

angular.module('copayApp.controllers').controller('importLegacyController',
  function($rootScope, $scope, $log, $timeout, notification, legacyImportService, profileService, go, lodash, bitcore) {

    var self = this;
    self.messages = [];
    self.fromCloud = true;
    self.server = "https://insight.bitpay.com:443/api/email";


    $rootScope.$on('Local/ImportStatusUpdate', function(event, status) {
      $timeout(function() {
        $log.debug(status);

        self.messages.unshift({
          message: status,
        });

        var op = 1;
        lodash.each(self.messages, function(m) {
          if (op < 0.1) op = 0.1;
          m.opacity = op;
          op = op - 0.15;
        });
      }, 100);
    });

    self.scan = function(ids) {
      $log.debug('### Scaning: ' + ids)
      var i = 0;
      lodash.each(ids, function(id) {
        $rootScope.$emit('Local/WalletImported', id);
        if (++i == ids.length) {
          go.walletHome();
        };
      });
    };


    self.import = function(form) {
      var username = form.username.$modelValue;
      var password = form.password.$modelValue;
      var serverURL = form.server.$modelValue;
      var fromCloud = form.fromCloud.$modelValue;

      self.error = null;
      self.importing = true;
      $timeout(function() {
        legacyImportService.import(username, password, serverURL, fromCloud, function(err, ids, toScanIds) {
          if (err || !ids || !ids.length) {
            self.importing = false;
            self.error = err || 'Failed to import wallets';
            return;
          }

          notification.success( ids.length + ' wallets imported. Funds scanning in progress. Hold on to see updated balance.');
          self.scan(toScanIds);
        });
      }, 100);
    };
    // TODO destroy event...
  });

'use strict';

angular.module('copayApp.controllers').controller('importProfileController',
  function($scope, $rootScope, $timeout, notification, isMobile, isCordova, identityService) {
    this.importStatus = 'Importing profile - Reading backup...';
    this.hideAdv = true;
    this.isSafari = isMobile.Safari();
    this.isCordova = isCordova;

    window.ignoreMobilePause = true;
    $scope.$on('$destroy', function() {
      $timeout(function(){
        window.ignoreMobilePause = false;
      }, 100);
    });

    var reader = new FileReader();

    var updateStatus = function(status) {
      this.importStatus = status;
    }

    var _importBackup = function(str) {
      var password = this.password;
      updateStatus('Importing profile - Setting things up...');

      identityService.importProfile(str,password, function(err, iden) {
        if (err) {
          $rootScope.starting = false;
          copay.logger.warn(err);
          if ((err.toString() || '').match('BADSTR')) {
            this.error = 'Bad password or corrupt profile file';
          } else if ((err.toString() || '').match('EEXISTS')) {
            this.error = 'Profile already exists';
          } else {
            this.error = 'Unknown error';
          }
          $timeout(function() {
            $rootScope.$digest();
          }, 1);
        } 
      });
    };

    this.getFile = function() {
      // If we use onloadend, we need to check the readyState.
      reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          var encryptedObj = evt.target.result;
          _importBackup(encryptedObj);
        }
      };
    };

    this.import = function(form) {

      if (form.$invalid) {
        this.error = 'Please enter the required fields';
        return;
      }
      var backupFile = this.file;
      var backupText = form.backupText.$modelValue;
      var password = form.password.$modelValue;

      if (!backupFile && !backupText) {
        this.error = 'Please, select your backup file';
        return;
      }
      
      $rootScope.starting = true;

      $timeout(function() {

        if (backupFile) {
          reader.readAsBinaryString(backupFile);
        } else {
          _importBackup(backupText);
        }
      }, 100);
    };
  });

'use strict';

angular.module('copayApp.controllers').controller('indexController', function($rootScope, $scope, $log, $filter, $timeout, lodash, go, profileService, configService, isCordova, rateService, storageService) {
  var self = this;
  self.isCordova = isCordova;
  self.onGoingProcess = {};
  self.limitHistory = 5;

  function strip(number) {
    return (parseFloat(number.toPrecision(12)));
  };

  self.setOngoingProcess = function(processName, isOn) {
    $log.debug('onGoingProcess', processName, isOn);
    self[processName] = isOn;
    self.onGoingProcess[processName] = isOn;

    // derived rules
    self.hideBalance = self.updatingBalance || self.updatingStatus || self.openingWallet;

    var name;
    self.anyOnGoingProcess = lodash.any(self.onGoingProcess, function(isOn, processName) {
      if (isOn)
        name = name || processName;
      return isOn;
    });
    // The first one
    self.onGoingProcessName = name;
  };

  self.setFocusedWallet = function() {
    var fc = profileService.focusedClient;
    if (!fc) return;

    $timeout(function() {
      self.hasProfile = true;
      self.noFocusedWallet = false;
      self.onGoingProcess = {};

      // Credentials Shortcuts 
      self.m = fc.credentials.m;
      self.n = fc.credentials.n;
      self.network = fc.credentials.network;
      self.copayerId = fc.credentials.copayerId;
      self.copayerName = fc.credentials.copayerName;
      self.requiresMultipleSignatures = fc.credentials.m > 1;
      self.isShared = fc.credentials.n > 1;
      self.walletName = fc.credentials.walletName;
      self.walletId = fc.credentials.walletId;
      self.isComplete = fc.isComplete();
      self.txps = [];
      self.copayers = [];
      self.setOngoingProcess('scanning', fc.scanning);
      self.lockedBalance = null;
      self.totalBalanceStr = null;
      self.notAuthorized = false;
      self.clientError = null;
      self.txHistory = [];
      self.txHistoryPaging = false;

      storageService.getBackupFlag(self.walletId, function(err, val) {
        self.needsBackup = !val;
        self.openWallet();
      });
    });
  };

  self.updateAll = function(walletStatus) {
    var get = function(cb) {
      if (walletStatus)
        return cb(null, walletStatus);
      else
        return fc.getStatus(cb);
    };

    var fc = profileService.focusedClient;
    if (!fc) return;

    $timeout(function() {
      self.setOngoingProcess('updatingStatus', true);
      $log.debug('Updating Status:', fc);
      get(function(err, walletStatus) {
        self.setOngoingProcess('updatingStatus', false);
        if (err) {
          self.handleError(err);
          return;
        }
        $log.debug('Wallet Status:', walletStatus);
        self.setPendingTxps(walletStatus.pendingTxps);

        // Status Shortcuts
        self.walletName = walletStatus.wallet.name;
        self.walletSecret = walletStatus.wallet.secret;
        self.walletStatus = walletStatus.wallet.status;
        self.copayers = walletStatus.wallet.copayers;
        self.setBalance(walletStatus.balance);
      });
    });
  };

  self.updateBalance = function() {
    var fc = profileService.focusedClient;
    $timeout(function() {
      self.setOngoingProcess('updatingBalance', true);
      $log.debug('Updating Balance');
      fc.getBalance(function(err, balance) {
        self.setOngoingProcess('updatingBalance', false);
        if (err) {
          $log.debug('Wallet Balance ERROR:', err);
          $scope.$emit('Local/ClientError', err);
          return;
        }
        $log.debug('Wallet Balance:', balance);
        self.setBalance(balance);
      });
    });
  };

  self.updatePendingTxps = function() {
    var fc = profileService.focusedClient;
    $timeout(function() {
      self.setOngoingProcess('updatingPendingTxps', true);
      $log.debug('Updating PendingTxps');
      fc.getTxProposals({}, function(err, txps) {
        self.setOngoingProcess('updatingPendingTxps', false);
        if (err) {
          $log.debug('Wallet PendingTxps ERROR:', err);
          $scope.$emit('Local/ClientError', err);
        } else {
          $log.debug('Wallet PendingTxps:', txps);
          self.setPendingTxps(txps);
        }
        $rootScope.$apply();
      });
    });
  };

  self.updateTxHistory = function(skip) {
    var fc = profileService.focusedClient;
    if (!skip) {
      self.txHistory = [];
    }
    self.skipHistory = skip || 0;
    $timeout(function() {
      self.setOngoingProcess('updatingTxHistory', true);
      $log.debug('Updating Transaction History');
      fc.getTxHistory({
        skip: self.skipHistory,
        limit: self.limitHistory + 1
      }, function(err, txs) {
        self.setOngoingProcess('updatingTxHistory', false);
        if (err) {
          $log.debug('TxHistory ERROR:', err);
          $scope.$emit('Local/ClientError', err);
        }
        else {
          $log.debug('Wallet Transaction History:', txs);
          self.skipHistory = self.skipHistory + self.limitHistory;
          self.setTxHistory(txs);
        }
        $rootScope.$apply();
      });
    });
  };

  self.handleError = function(err) {
    $log.debug('ERROR:', err);
    if (err.code === 'NOTAUTHORIZED') {
      $scope.$emit('Local/NotAuthorized');
    } else if (err.code === 'NOTFOUND') {
      $scope.$emit('Local/BWSNotFound');
    } else if (err.code === 'ETIMEDOUT') {
      $scope.$emit('Local/BWSTimeOut');
    } else {
      $scope.$emit('Local/ClientError', err);
    }
  };
  self.openWallet = function() {
    var fc = profileService.focusedClient;
    self.updateColor();
    $timeout(function() {
      self.setOngoingProcess('openingWallet', true);
      fc.openWallet(function(err, walletStatus) {
        self.setOngoingProcess('openingWallet', false);
        if (err) {
          self.handleError(err);
          return;
        }
        $log.debug('Wallet Opened');
        self.updateAll(lodash.isObject(walletStatus) ? walletStatus : null);
        $rootScope.$apply();
      });
    });
  };

  self.setPendingTxps = function(txps) {
    var config = configService.getSync().wallet.settings;
    self.pendingTxProposalsCountForUs = 0;
    lodash.each(txps, function(tx) {
      var amount = tx.amount * self.satToUnit;
      tx.amountStr = profileService.formatAmount(tx.amount) + ' ' + config.unitName;
      tx.alternativeAmount = rateService.toFiat(tx.amount, config.alternativeIsoCode) ? rateService.toFiat(tx.amount, config.alternativeIsoCode).toFixed(2) : 'N/A';
      tx.alternativeAmountStr = tx.alternativeAmount + " " + config.alternativeIsoCode;
      tx.alternativeIsoCode = config.alternativeIsoCode;



      var action = lodash.find(tx.actions, {
        copayerId: self.copayerId
      });

      if (!action && tx.status == 'pending') {
        tx.pendingForUs = true;
      }

      if (action && action.type == 'accept') {
        tx.statusForUs = 'accepted';
      } else if (action && action.type == 'reject') {
        tx.statusForUs = 'rejected';
      } else {
        tx.statusForUs = 'pending';
      }

      if (tx.creatorId == self.copayerId && tx.actions.length == 1) {
        tx.couldRemove = true;
      };

      if (tx.creatorId != self.copayerId) {
        self.pendingTxProposalsCountForUs = self.pendingTxProposalsCountForUs + 1;
      }
    });
    self.txps = txps;
  };

  self.setTxHistory = function(txs) {
    var now = new Date();
    var c = 0;
    self.txHistoryPaging = txs[self.limitHistory] ? true : false;
    lodash.each(txs, function(tx) {
      tx.ts = tx.minedTs || tx.sentTs;
      tx.rateTs = Math.floor((tx.ts || now) / 1000);
      tx.amountStr = profileService.formatAmount(tx.amount); //$filter('noFractionNumber')(
      if (c < self.limitHistory) {
        self.txHistory.push(tx);
        c++;
      }
    });
  };

  self.updateColor = function() {
    var config = configService.getSync();
    config.colorFor = config.colorFor || {};
    self.backgroundColor = config.colorFor[self.walletId] || '#1ABC9C';
    var fc = profileService.focusedClient;
    fc.backgroundColor = self.backgroundColor;
  };

  self.setBalance = function(balance) {
    if (!balance) return;
    var config = configService.getSync().wallet.settings;
    var COIN = 1e8;

    // Address with Balance
    self.balanceByAddress = balance.byAddress;

    // SAT
    self.totalBalanceSat = balance.totalAmount;
    self.lockedBalanceSat = balance.lockedAmount;
    self.availableBalanceSat = self.totalBalanceSat - self.lockedBalanceSat;

    // Selected unit
    self.unitToSatoshi = config.unitToSatoshi;
    self.satToUnit = 1 / self.unitToSatoshi;
    self.unitName = config.unitName;

    self.totalBalance = strip(self.totalBalanceSat * self.satToUnit);
    self.lockedBalance = strip(self.lockedBalanceSat * self.satToUnit);
    self.availableBalance = strip(self.availableBalanceSat * self.satToUnit);

    // BTC
    self.totalBalanceBTC = strip(self.totalBalanceSat / COIN);
    self.lockedBalanceBTC = strip(self.lockedBalanceSat / COIN);
    self.availableBalanceBTC = strip(self.availableBalanceBTC / COIN);


    //STR
    self.totalBalanceStr = profileService.formatAmount(self.totalBalanceSat) + ' ' + self.unitName;
    self.lockedBalanceStr = profileService.formatAmount(self.lockedBalanceSat) + ' ' + self.unitName;
    self.availableBalanceStr = profileService.formatAmount(self.availableBalanceSat) + ' ' + self.unitName;

    self.alternativeName = config.alternativeName;
    self.alternativeIsoCode = config.alternativeIsoCode;

    // Check address
    self.checkLastAddress(balance.byAddress);

    rateService.whenAvailable(function() {

      var totalBalanceAlternative = rateService.toFiat(self.totalBalance * self.unitToSatoshi, self.alternativeIsoCode);
      var lockedBalanceAlternative = rateService.toFiat(self.lockedBalance * self.unitToSatoshi, self.alternativeIsoCode);
      var alternativeConversionRate = rateService.toFiat(100000000, self.alternativeIsoCode);

      self.totalBalanceAlternative = $filter('noFractionNumber')(totalBalanceAlternative, 2);
      self.lockedBalanceAlternative = $filter('noFractionNumber')(lockedBalanceAlternative, 2);
      self.alternativeConversionRate = $filter('noFractionNumber')(alternativeConversionRate, 2);

      self.alternativeBalanceAvailable = true;

      self.alternativeBalanceAvailable = true;
      self.updatingBalance = false;

      self.isRateAvailable = true;
      $rootScope.$apply();
    });

    if (!rateService.isAvailable()) {
      $rootScope.$apply();
    }
  };

  self.checkLastAddress = function(byAddress, cb) {
    storageService.getLastAddress(self.walletId, function(err, addr) {
      var used = lodash.find(byAddress, {
        address: addr
      });
      if (used) {
        $log.debug('Address ' + addr + ' was used. Cleaning Cache.')
        $rootScope.$emit('Local/NeedNewAddress', err);
        storageService.clearLastAddress(self.walletId, function(err, addr) {
          if (cb) return cb();
        });
      };
    });
  };



  self.recreate = function(cb) {
    var fc = profileService.focusedClient;
    self.setOngoingProcess('recreating', true);
    fc.recreateWallet(function(err) {
      self.notAuthorized = false;
      self.setOngoingProcess('recreating', false);

      profileService.setWalletClients();
      $timeout(function() {
        $rootScope.$emit('Local/WalletImported', self.walletId);
      }, 100);
    });
  };

  self.openMenu = function() {
    go.swipe(true);
  };

  self.closeMenu = function() {
    go.swipe();
  };

  self.startScan = function(walletId) {
    var c = profileService.walletClients[walletId];
    c.scanning = true;

    if (self.walletId == walletId)
      self.setOngoingProcess('scanning', true);

    c.startScan({
      includeCopayerBranches: true,
    }, function(err) {
      if (err) {
        c.scanning = false;
        if (self.walletId == walletId)
          self.setOngoingProcess('scanning', false);
      }
    });
  };


  // UX event handlers
  $rootScope.$on('Local/ColorUpdated', function(event) {
    self.updateColor();
  });

  $rootScope.$on('Local/ConfigurationUpdated', function(event) {
    self.updateAll();
  });

  $rootScope.$on('Local/WalletCompleted', function(event) {
    self.setFocusedWallet();
    go.walletHome();
  });

  $rootScope.$on('Local/OnLine', function(event) {
    self.isOffLine = false;
    self.updateAll();
    self.updateTxHistory();
  });

  $rootScope.$on('Local/OffLine', function(event) {
    self.isOffLine = true;
  });

  $rootScope.$on('Local/BackupDone', function(event) {
    self.needsBackup = false;
    storageService.setBackupFlag(self.walletId, function() {});
  });

  $rootScope.$on('Local/NotAuthorized', function(event) {
    self.notAuthorized = true;
    $rootScope.$apply();
  });

  $rootScope.$on('Local/BWSNotFound', function(event) {
    self.clientError = 'Could not access to Bitcore Wallet Service: Service not found';
    $rootScope.$apply();
  });

  $rootScope.$on('Local/BWSTimeOut', function(event) {
    self.clientError = 'Could not access to Bitcore Wallet Service: Timed out';
    $rootScope.$apply();
  });

  $rootScope.$on('Local/ClientError', function(event, err) {
    self.clientError = err;
    $rootScope.$apply();
  });

  $rootScope.$on('Local/WalletImported', function(event, walletId) {
    self.startScan(walletId);
  });

  $rootScope.$on('Animation/Disable', function(event) {
    $timeout(function() {
      self.swipeLeft = false;
      self.swipeRight = false;
    }, 370);
  });

  $rootScope.$on('Animation/SwipeLeft', function(event) {
    self.swipeLeft = true;
  });

  $rootScope.$on('Animation/SwipeRight', function(event) {
    self.swipeRight = true;
  });

  lodash.each(['NewIncomingTx', 'ScanFinished'], function(eventName) {
    $rootScope.$on(eventName, function() {
      if (eventName == 'ScanFinished') {
        self.setOngoingProcess('scanning', false);
      }
      self.updateBalance();
      $timeout(function() {
        self.updateTxHistory();
      }, 5000);
    });
  });

  // remove transactionProposalRemoved (only for compat)

  lodash.each(['NewOutgoingTx', 'NewTxProposal', 'TxProposalFinallyRejected', 'transactionProposalRemoved', 'TxProposalRemoved',
    'Local/NewTxProposal', 'Local/TxProposalAction'
  ], function(eventName) {
    $rootScope.$on(eventName, function() {
      self.updateAll();
      $timeout(function() {
        self.updateTxHistory();
      }, 5000);
    });
  });


  lodash.each(['TxProposalRejectedBy', 'TxProposalAcceptedBy'], function(eventName) {
    $rootScope.$on(eventName, function() {
      var f = function() {
        if (self.updatingStatus) {
          return $timeout(f, 200);
        };
        self.updatePendingTxps();
      };
      f();
    });
  });

  $rootScope.$on('Local/NoWallets', function(event) {
    $timeout(function() {
      self.hasProfile = true;
      self.noFocusedWallet = true;
      self.clientError = null;
      self.isComplete = null;
      self.walletName = null;
      go.addWallet();
    });
  });

  $rootScope.$on('Local/NewFocusedWallet', function() {
    self.setFocusedWallet();
    self.updateTxHistory();
  });

  $rootScope.$on('Local/NeedsPassword', function(event, isSetup, cb) {
    self.askPassword = {
      isSetup: isSetup,
      callback: function (err, pass) {
        self.askPassword = null;
        return cb(err, pass);
      },
    };
  });

  lodash.each(['NewCopayer', 'CopayerUpdated'], function(eventName) {
    $rootScope.$on(eventName, function() {
      // Re try to open wallet (will triggers) 
      self.setFocusedWallet();
    });
  });
});

'use strict';

angular.module('copayApp.controllers').controller('joinController',
  function($scope, $rootScope, $timeout, go, isMobile, notification, profileService, isCordova, $modal) {

    var self = this;

    //TODO : make one function - this was copied from topbar.js
    var cordovaOpenScanner = function() {
      window.ignoreMobilePause = true;
      cordova.plugins.barcodeScanner.scan(
        function onSuccess(result) {
          $timeout(function() {
            window.ignoreMobilePause = false;
          }, 100);
          if (result.cancelled) return;

          $timeout(function() {
            var data = result.text;
            $scope.secret = data;
            $scope.joinForm.secret.$setViewValue(data);
            $scope.joinForm.secret.$render();
          }, 1000);
        },
        function onError(error) {
          $timeout(function() {
            window.ignoreMobilePause = false;
          }, 100);
          alert('Scanning error');
        });
    };

    var modalOpenScanner = function() {
      var _scope = $scope;
      var ModalInstanceCtrl = function($scope, $rootScope, $modalInstance) {
        // QR code Scanner
        var video;
        var canvas;
        var $video;
        var context;
        var localMediaStream;

        var _scan = function(evt) {

          if (localMediaStream) {
            context.drawImage(video, 0, 0, 300, 225);
            try {
              qrcode.decode();
            } catch (e) {
              //qrcodeError(e);
            }
          }
          $timeout(_scan, 500);
        };

        var _scanStop = function() {
          if (localMediaStream && localMediaStream.stop) localMediaStream.stop();
          localMediaStream = null;
          video.src = '';
        };

        qrcode.callback = function(data) {
          _scanStop();
          $modalInstance.close(data);
        };

        var _successCallback = function(stream) {
          video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
          localMediaStream = stream;
          video.play();
          $timeout(_scan, 1000);
        };

        var _videoError = function(err) {
          $scope.cancel();
        };

        var setScanner = function() {

          navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
          window.URL = window.URL || window.webkitURL ||
            window.mozURL || window.msURL;
        };

        $scope.init = function() {
          setScanner();
          $timeout(function() {
            canvas = document.getElementById('qr-canvas');
            context = canvas.getContext('2d');

            video = document.getElementById('qrcode-scanner-video');
            $video = angular.element(video);
            canvas.width = 300;
            canvas.height = 225;
            context.clearRect(0, 0, 300, 225);

            navigator.getUserMedia({
              video: true
            }, _successCallback, _videoError);
          }, 500);
        };

        $scope.cancel = function() {
          _scanStop();
          $modalInstance.dismiss('cancel');
        };
      };

      var modalInstance = $modal.open({
        templateUrl: 'views/modals/scanner.html',
        windowClass: 'full',
        controller: ModalInstanceCtrl,
        backdrop: 'static',
        keyboard: false
      });
      modalInstance.result.then(function(data) {
        $scope.secret = data;
        $scope.joinForm.secret.$setViewValue(data);
        $scope.joinForm.secret.$render();
      });

    };

    this.openScanner = function() {
      if (isCordova) {
        cordovaOpenScanner();
      } else {
        modalOpenScanner();
      }
    };


    this.join = function(form) {
      if (form && form.$invalid) {
        notification.error('Error', 'Please enter the required fields');
        return;
      }
      self.loading = true;

      $timeout(function() {
        profileService.joinWallet({
          secret: form.secret.$modelValue,
          extendedPrivateKey: form.privateKey.$modelValue,
          myName: form.myName.$modelValue
        }, function(err) {
          self.loading = false;
          if (err) {
            notification.error(err);
          }
          else {
            go.walletHome();
          }
        });
      }, 100);
    }
  });

'use strict';

angular.module('copayApp.controllers').controller('menuController', function($state) {

  this.menu = [{
    'title': 'Home',
    'icon': 'icon-home',
    'link': 'walletHome'
  }, {
    'title': 'Receive',
    'icon': 'icon-receive',
    'link': 'receive'
  }, {
    'title': 'Send',
    'icon': 'icon-paperplane',
    'link': 'send'
  }, {
    'title': 'History',
    'icon': 'icon-history',
    'link': 'history'
  }];

  this.go = function(state) {
    $state.go(state);
  };

});

'use strict';

angular.module('copayApp.controllers').controller('passwordController',
  function($rootScope, $scope, $timeout,  profileService, notification, go) {

    var self = this;

    var pass1;

    self.isVerification = false;

    self.close = function(cb){
      return cb('No password given');
    };

    self.set = function(isSetup, cb){
      self.error = false;

      if (isSetup && !self.isVerification) {
        self.isVerification = true;
        pass1= self.password;
        self.password = null;
        $timeout(function(){
          $rootScope.$apply();
        })
        return;
      }
      if (isSetup) {
        if (pass1 != self.password) {
          self.error = 'Passwords do not match';
          self.isVerification = false;
          self.password = null;
          pass1 =null;

          return;
        }
      }
      return cb(null, self.password);
    };

  });

'use strict';
angular.module('copayApp.controllers').controller('paymentUriController', 
    function($rootScope, $stateParams, $location, $timeout, profileService, configService, lodash, bitcore, go) {

      function strip(number) {
        return (parseFloat(number.toPrecision(12)));
      };

      // Build bitcoinURI with querystring
      this.checkBitcoinUri = function() {
        var query = [];
        angular.forEach($location.search(), function(value, key) {
          query.push(key + "=" + value);
        });
        var queryString = query ? query.join("&") : null;
        this.bitcoinURI = $stateParams.data + ( queryString ? '?' + queryString : '');

        var URI = bitcore.URI;
        var isUriValid = URI.isValid(this.bitcoinURI);
        if (!URI.isValid(this.bitcoinURI)) {
          this.error = true;
          return;
        }
        var uri = new URI(this.bitcoinURI);

        if (uri && uri.address) {
          var config = configService.getSync().wallet.settings;
          var unitToSatoshi = config.unitToSatoshi;
          var satToUnit = 1 / unitToSatoshi;
          var unitName = config.unitName;

          uri.amount = strip(uri.amount * satToUnit) + ' ' + unitName;
          return uri;
        }
      };

      this.getWallets = function() {
        if (!profileService.profile) return;
        var ret = lodash.map(profileService.profile.credentials, function(c) {
          return {
            m: c.m,
            n: c.n,
            name: c.walletName,
            id: c.walletId,
          };
        });
        return lodash.sortBy(ret, 'walletName');
      };

      this.selectWallet = function(wid) {
        var self = this;
        if (wid != profileService.focusedClient.credentials.walletId) {
          profileService.setAndStoreFocus(wid, function() {});
        }
        go.send();
        $timeout(function() {
          $rootScope.$emit('paymentUri', self.bitcoinURI);
        }, 100);
      };
    });

'use strict';

angular.module('copayApp.controllers').controller('pinController', function($scope, $timeout) {
  this.init = function(confirmPin, testPin) {
    this._firstpin = null;
    this.askForPin = 1;
    this.confirmPin = confirmPin;
    this.clear();
    if (testPin) {
      console.log('WARN: using test pin:', testPin);
      $timeout(function() {
        $scope.$emit('pin', testPin);
      }, 100);
    }
  };

  this.clear = function() {
    this.digits = [];
    this.defined = [];
  };

  this.press = function(digit) {
    var self = this;
    $timeout(function() {
      self._press(digit);
    }, 1);
  };

  this._press = function(digit) {
    var self = this;
    this.error = null;
    this.digits.push(digit);
    this.defined.push(true);

    if (this.digits.length == 4) {
      var pin = this.digits.join('');

      if (this.confirmPin) {
        if (!this._firstpin) {
          this._firstpin = pin;
          this.askForPin = 2;
          $timeout(function() {
            self.clear();
          }, 100);
          return;
        } else {
          if (pin === this._firstpin) {
            $scope.$emit('pin', pin);
            return;
          } else {
            this._firstpin = null;
            this.askForPin = 1;
            $timeout(function() {
              self.clear();
              self.error = 'Entered PINs were not equal. Try again';
              var _self = self;
              $timeout(function() {
                _self.error = null;
              }, 2000);
            }, 100);
            return;
          }
        }
      } else {
        $scope.$emit('pin', pin);
      }
    }
  };

  this.skip = function() {
    $scope.$emit('pin', null);
  };
});

'use strict';

angular.module('copayApp.controllers').controller('preferencesController',
  function($scope, $rootScope, $filter, $timeout, $modal, $log, configService, profileService) {
    this.error = null;
    this.success = null;

    var config = configService.getSync();

    this.unitName = config.wallet.settings.unitName;
    this.bwsurl = config.bws.url;
    this.selectedAlternative = {
      name: config.wallet.settings.alternativeName,
      isoCode: config.wallet.settings.alternativeIsoCode
    };
    var fc = profileService.focusedClient;
    $scope.encrypt = fc.hasPrivKeyEncrypted();

    var unwatch = $scope.$watch('encrypt', function(val) {
      var fc = profileService.focusedClient;
      if (val && !fc.hasPrivKeyEncrypted()) {
        $rootScope.$emit('Local/NeedsPassword', true, function(err, password) {
          if (err || !password) {
            $scope.encrypt = false;
            return;
          }
          profileService.setPrivateKeyEncryptionFC(password, function() {
            $scope.encrypt = true;
          });
        });
      } else {
        if (!val && fc.hasPrivKeyEncrypted())  {
          profileService.unlockFC(function(err){
            if (err) {
              $scope.encrypt = true;
              return;
            }
            profileService.disablePrivateKeyEncryptionFC(function(err) {
              if (err) {
                $scope.encrypt = true;
                $log.error(err);
                return;
              }
              $scope.encrypt = false;
            });
          });
        }
      }
    });

    $scope.$on('$destroy', function() {
      unwatch();
    });
  });

'use strict';

angular.module('copayApp.controllers').controller('preferencesAltCurrencyController',
  function($scope, $rootScope, configService, go, rateService, lodash) {
    this.hideAdv = true;
    this.hidePriv = true;
    this.hideSecret = true;
    this.error = null;
    this.success = null;

    var config = configService.getSync();

    this.selectedAlternative = {
      name: config.wallet.settings.alternativeName,
      isoCode: config.wallet.settings.alternativeIsoCode
    };

    this.alternativeOpts = [this.selectedAlternative]; //default value

    var self = this;
    rateService.whenAvailable(function() {
      self.alternativeOpts = rateService.listAlternatives();
      lodash.remove(self.alternativeOpts, function(n) {
        return n.isoCode == 'BTC';
      });

      for (var ii in self.alternativeOpts) {
        if (config.wallet.settings.alternativeIsoCode === self.alternativeOpts[ii].isoCode) {
          self.selectedAlternative = self.alternativeOpts[ii];
        }
      }
      $scope.$digest();
    });


    this.save = function(newAltCurrency) {
      var opts = {
        wallet: {
          settings: {
            alternativeName: newAltCurrency.name,
            alternativeIsoCode: newAltCurrency.isoCode,
          }
        }
      };
      this.selectedAlternative = {
        name: newAltCurrency.name,
        isoCode: newAltCurrency.isoCode,
      };

      configService.set(opts, function(err) {
        if (err) console.log(err);
        $scope.$emit('Local/ConfigurationUpdated');
      });
    };


  });

'use strict';

angular.module('copayApp.controllers').controller('preferencesBwsUrlController',
  function($scope, $rootScope, $filter, $timeout, $modal, balanceService, notification, backupService, profileService, configService, isMobile, isCordova, go, rateService, applicationService, bwcService) {
    this.isSafari = isMobile.Safari();
    this.isCordova = isCordova;
    this.hideAdv = true;
    this.hidePriv = true;
    this.hideSecret = true;
    this.error = null;
    this.success = null;

    var config = configService.getSync();

    this.bwsurl = config.bws.url;

    this.save = function() {
      var opts = {
        bws: {
          url: this.bwsurl,
        }
      };

      configService.set(opts, function(err) {
        if (err) console.log(err);
        applicationService.restart(true);
        go.walletHome();
        $scope.$emit('Local/ConfigurationUpdated');
      });
    };


  });

'use strict';

angular.module('copayApp.controllers').controller('preferencesColorController',
  function($scope, configService, profileService, go) {
    var config = configService.getSync();
    this.colorOpts = [
      '#1ABC9C',
      '#4A90E2',
      '#F39C12',
      '#FF3366',
      '#9B59B6',
      '#213140',
    ];

    var fc = profileService.focusedClient;
    var walletId = fc.credentials.walletId;

    var config = configService.getSync();
    config.colorFor = config.colorFor || {};
    this.color = config.colorFor[walletId] || '#1ABC9C';

    this.save = function(color) {
      var self = this;
      var opts = {
        colorFor: {}
      };
      opts.colorFor[walletId] = color;

      configService.set(opts, function(err) {
        if (err) console.log(err);
        self.color = color;
        $scope.$emit('Local/ColorUpdated');
      });

    };
  });

'use strict';

angular.module('copayApp.controllers').controller('preferencesDeleteWalletController',
  function($scope, $rootScope, $filter, $timeout, $modal, notification, profileService, isCordova, go) {
    this.isCordova = isCordova;
    this.error = null;

    var _modalDeleteWallet = function() {
      var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.title = 'Are you sure you want to delete this wallet?';
        $scope.loading = false;

        $scope.ok = function() {
          $scope.loading = true;
          $modalInstance.close('ok');

        };
        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      var modalInstance = $modal.open({
        templateUrl: 'views/modals/confirmation.html',
        windowClass: 'full',
        controller: ModalInstanceCtrl
      });
      modalInstance.result.then(function(ok) {
        if (ok) {
          _deleteWallet();
        }
      });
    };

    var _deleteWallet = function() {
      $timeout(function() {
        var fc = profileService.focusedClient;
        var walletName = fc.credentials.walletName;

        profileService.deleteWalletFC({}, function(err) {
          if (err) {
            this.error = err.message || err;
            console.log(err);
            $timeout(function() {
              $scope.$digest();
            });
          } else {
            go.walletHome();
            $timeout(function() {
              notification.success('Success', 'The wallet "' + walletName + '" was deleted');
            });
          }
        });
      }, 100);
    };

    this.deleteWallet = function() {
      if (isCordova) {
        navigator.notification.confirm(
          'Are you sure you want to delete this wallet?',
          function(buttonIndex) {
            if (buttonIndex == 2) {
              _deleteWallet();
            }
          },
          'Confirm', ['Cancel', 'OK']
        );
      } else {
        _modalDeleteWallet();
      }
    };
  });

'use strict';

angular.module('copayApp.controllers').controller('preferencesUnitController',
  function($rootScope, $scope, configService, go) {
    var config = configService.getSync();
    this.unitName = config.wallet.settings.unitName;
    this.unitOpts = [
      // TODO : add Satoshis to bitcore-wallet-client formatAmount()
      // {
      //     name: 'Satoshis (100,000,000 satoshis = 1BTC)',
      //     shortName: 'SAT',
      //     value: 1,
      //     decimals: 0,
      //     code: 'sat',
      //   }, 
      {
        name: 'bits (1,000,000 bits = 1BTC)',
        shortName: 'bits',
        value: 100,
        decimals: 2,
        code: 'bit',
      }
      // TODO : add mBTC to bitcore-wallet-client formatAmount()
      // ,{
      //   name: 'mBTC (1,000 mBTC = 1BTC)',
      //   shortName: 'mBTC',
      //   value: 100000,
      //   decimals: 5,
      //   code: 'mbtc',
      // }
      , {
        name: 'BTC',
        shortName: 'BTC',
        value: 100000000,
        decimals: 8,
        code: 'btc',
      }
    ];

    this.save = function(newUnit) {
      var opts = {
        wallet: {
          settings: {
            unitName: newUnit.shortName,
            unitToSatoshi: newUnit.value,
            unitDecimals: newUnit.decimals,
            unitCode: newUnit.code,
          }
        }
      };
      this.unitName = newUnit.shortName;

      configService.set(opts, function(err) {
        if (err) console.log(err);
        $scope.$emit('Local/ConfigurationUpdated');
      });

    };
  });

'use strict';
angular.module('copayApp.controllers').controller('ProfileController', function($scope, $rootScope, $location, $modal, $filter, $timeout, backupService, identityService, isMobile, isCordova, notification) {
  $scope.username = $rootScope.iden.getName();
  $scope.isSafari = isMobile.Safari();
  $scope.isCordova = isCordova;

  $rootScope.title = 'Profile';
  $scope.hideAdv = true;

  $scope.downloadProfileBackup = function() {
    backupService.profileDownload($rootScope.iden);
  };

  $scope.viewProfileBackup = function() {
    $scope.loading = true;
    $timeout(function() {
      $scope.backupProfilePlainText = backupService.profileEncrypted($rootScope.iden);
    }, 100);
  };

  $scope.copyProfileBackup = function() {
    var ep = backupService.profileEncrypted($rootScope.iden);
    window.cordova.plugins.clipboard.copy(ep);
    window.plugins.toast.showShortCenter('Copied to clipboard');
  };

  $scope.sendProfileBackup = function() {
    if (isMobile.Android() || isMobile.Windows()) {
      window.ignoreMobilePause = true;
    }
    window.plugins.toast.showShortCenter('Preparing backup...');
    var name = $rootScope.iden.fullName;
    var ep = backupService.profileEncrypted($rootScope.iden);
    var properties = {
      subject: 'Copay Profile Backup: ' + name,
      body: 'Here is the encrypted backup of the profile ' + name + ': \n\n' + ep + '\n\n To import this backup, copy all text between {...}, including the symbols {}',
      isHtml: false
    };
    window.plugin.email.open(properties);
  };

  $scope.init = function() {
    if ($rootScope.quotaPerItem) {
      $scope.perItem = $filter('noFractionNumber')($rootScope.quotaPerItem / 1000, 1);
      $scope.nrWallets = parseInt($rootScope.quotaItems) - 1;
    }
    // no need to add event handlers here. Wallet deletion is handle by callback.
  };

  $scope.deleteProfile = function() {
    $scope.loading = true;
    identityService.deleteProfile(function(err, res) {
      $scope.loading = false;
      if (err) {
        log.warn(err);
        notification.error('Error', 'Could not delete profile');
        $timeout(function() {
          $scope.$digest();
        });
      } else {
        $location.path('/');
        $timeout(function() {
          notification.success('Success', 'Profile successfully deleted');
        });
      }
    });
  };
});

'use strict';

angular.module('copayApp.controllers').controller('receiveController',
  function($rootScope, $scope, $timeout, $modal, $log, isCordova, isMobile, profileService, storageService) {
    var self = this;
    var fc = profileService.focusedClient;


    this.isCordova = isCordova;
    self.addresses = [];

    var newAddrListener = $rootScope.$on('Local/NeedNewAddress', function() {
      self.getAddress();
    });
    $scope.$on('$destroy', newAddrListener);

    this.newAddress = function() {
      self.generatingAddress = true;
      fc.createAddress(function(err, addr) {
        if (err) {
          $log.debug('Creating address ERROR:', err);
          $scope.$emit('Local/ClientError', err);
        } else {
          self.addr = addr.address;
          storageService.storeLastAddress(fc.credentials.walletId, addr.address, function() {});
        }
        self.generatingAddress = false;
        $scope.$digest();
      });
    };

    this.getAddress = function() {
      $timeout(function() {
        storageService.getLastAddress(fc.credentials.walletId, function(err, addr) {
          if (addr) {
            self.addr = addr;
          } else {
            self.newAddress();
          }
        });
      });
    };

    this.copyAddress = function(addr) {
      if (isCordova) {
        window.cordova.plugins.clipboard.copy('bitcoin:' + addr);
        window.plugins.toast.showShortCenter('Copied to clipboard');
      }
    };

    this.shareAddress = function(addr) {
      if (isCordova) {
        if (isMobile.Android() || isMobile.Windows()) {
          window.ignoreMobilePause = true;
        }
        window.plugins.socialsharing.share('bitcoin:' + addr, null, null, null);
      }
    };

    this.openAddressModal = function(address) {
      var self = this;
      var ModalInstanceCtrl = function($scope, $modalInstance, address) {
        $scope.address = address;
        $scope.isCordova = self.isCordova;
        $scope.copyAddress = function(addr) {
          self.copyAddress(addr);
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      $modal.open({
        templateUrl: 'views/modals/qr-address.html',
        windowClass: 'full',
        controller: ModalInstanceCtrl,
        resolve: {
          address: function() {
            return address;
          }
        }
      });
    };

  }
);

'use strict';

angular.module('copayApp.controllers').controller('sendController',
  function($rootScope, $scope, $window, $timeout, $modal, $filter, $log, notification, isMobile, txStatus, isCordova, bitcore, profileService, configService, rateService) {
    var fc = profileService.focusedClient;
    var self = this;

    this.init = function() {
      this.isMobile = isMobile.any();
      this.isWindowsPhoneApp = isMobile.Windows() && isCordova;
      $rootScope.wpInputFocused = false;

      $rootScope.title = fc.credentials.m > 1 ? 'Send Proposal' : 'Send';
      this.blockUx = false;
      this.error = this.success = null;

      this.isRateAvailable = false;
      this.showScanner = false;
      this.isMobile = isMobile.any();

      var paymentUri = $rootScope.$on('paymentUri', function(event, uri) {
        $timeout(function() {
          self.setForm(uri);
        }, 100);
      });

      var config = configService.getSync().wallet.settings;
      this.alternativeName = config.alternativeName;
      this.alternativeAmount = 0;
      this.alternativeIsoCode = config.alternativeIsoCode;
      this.unitToSatoshi = config.unitToSatoshi;
      this.unitDecimals = config.unitDecimals;
      this.unitName = config.unitName;


      rateService.whenAvailable(function() {
        self.isRateAvailable = true;
        $rootScope.$digest();
      });


      var openScannerCordova = $rootScope.$on('dataScanned', function(event, data) {
        self.setForm(data);
      });

      $scope.$on('$destroy', function() {
        openScannerCordova();
        paymentUri();
      });

      this.setInputs();
    };

    this.formFocus = function(what) {
      if (!this.isWindowsPhoneApp) return

      if (!what) {
        $rootScope.wpInputFocused = false;
        this.hideAddress = false;
        this.hideAmount = false;

      } else {
        $rootScope.wpInputFocused = true;
        if (what == 'amount') {
          this.hideAddress = true;
        } else if (what == 'msg') {
          this.hideAddress = true;
          this.hideAmount = true;
        }
      }
      $timeout(function() {
        $rootScope.$digest();
      }, 1);
    };

    this.setInputs = function() {
      var unitToSat = this.unitToSatoshi;
      var satToUnit = 1 / unitToSat;
      /**
       * Setting the two related amounts as properties prevents an infinite
       * recursion for watches while preserving the original angular updates
       *
       */
      Object.defineProperty($scope,
        "_alternative", {
          get: function() {
            return $scope.__alternative;
          },
          set: function(newValue) {
            $scope.__alternative = newValue;
            if (typeof(newValue) === 'number' && self.isRateAvailable) {
              $scope._amount = parseFloat((rateService.fromFiat(newValue, self.alternativeIsoCode) * satToUnit).toFixed(self.unitDecimals), 10);
            }
          },
          enumerable: true,
          configurable: true
        });
      Object.defineProperty($scope,
        "_amount", {
          get: function() {
            return $scope.__amount;
          },
          set: function(newValue) {
            $scope.__amount = newValue;
            if (typeof(newValue) === 'number' && self.isRateAvailable) {
              $scope.__alternative = parseFloat((rateService.toFiat(newValue * self.unitToSatoshi, self.alternativeIsoCode)).toFixed(2), 10);
            } else {
              $scope.__alternative = 0;
            }
            self.alternativeAmount = $scope.__alternative;
          },
          enumerable: true,
          configurable: true
        });

      Object.defineProperty($scope,
        "_address", {
          get: function() {
            return $scope.__address;
          },
          set: function(newValue) {
            $scope.__address = self.onAddressChange(newValue);
          },
          enumerable: true,
          configurable: true
        });
    };

    this.setError = function(err) {
      $log.warn(err);
      var errMessage = 'The transaction' + (fc.credentials.m > 1 ? ' proposal' : '') +

        ' could not be created: ' + (err.message ? err.message : err);

      this.error = errMessage;

      $timeout(function() {
        $scope.$digest();
      }, 1);
    };


    this.setOngoingProcess = function(name) {
      var self = this;
      $timeout(function() {
        self.onGoingProcess = name;
        $rootScope.$apply();
      })
    };

    this.submitForm = function(form) {
      var unitToSat = this.unitToSatoshi;

      if (form.$invalid) {
        this.error = 'Unable to send transaction proposal';
        return;
      }

      if (fc.isPrivKeyEncrypted()) {
        profileService.unlockFC(function(err) {
          if (err) return self.setError(err);
          return self.submitForm(form);
        });
        return;
      };

      self.blockUx = true;
      self.setOngoingProcess('Sending');

      if (isCordova) {
        window.plugins.spinnerDialog.show(null, 'Creating transaction...', true);
      }

      $timeout(function() {
        var comment = form.comment.$modelValue;
        var paypro = self._paypro;
        var address, amount;

        address = form.address.$modelValue;
        amount = parseInt((form.amount.$modelValue * unitToSat).toFixed(0));

        fc.sendTxProposal({
          toAddress: address,
          amount: amount,
          message: comment,
          payProUrl: paypro ? paypro.url : null,
        }, function(err, txp) {
          self.setOngoingProcess();
          if (err) {
            profileService.lockFC();
            if (isCordova) {
              window.plugins.spinnerDialog.hide();
            }
            self.blockUx = false;
            return self.setError(err);
          }

          self.signAndBroadcast(txp, function(err) {
            self.setOngoingProcess();
            if (isCordova) {
              window.plugins.spinnerDialog.hide();
            }
            self.blockUx = false;
            if (err) {
              profileService.lockFC();
              return self.setError(err);
            }
            self.resetForm(form);
          });
        });
      }, 100);
    };


    this.signAndBroadcast = function(txp, cb) {
      self.setOngoingProcess('Signing');
      fc.signTxProposal(txp, function(err, signedTx) {
        profileService.lockFC();
        self.setOngoingProcess();

        if (err) return cb(err);

        if (signedTx.status == 'accepted') {
          self.setOngoingProcess('Broadcasting');
          fc.broadcastTxProposal(signedTx, function(err, btx) {
            self.setOngoingProcess();
            if (err) {
              $scope.error = 'Transaction not broadcasted. Please try again.';
              $scope.$digest();
            } else {
              txStatus.notify(btx);
              $scope.$emit('Local/TxProposalAction');
            }
            return cb();
          });
        } else {
          txStatus.notify(signedTx);
          $scope.$emit('Local/TxProposalAction');
          return cb();
        }
      });
    };

    this.setTopAmount = function() {
      throw new Error('todo: setTopAmount');
      var form = $scope.sendForm;
      if (form) {
        form.amount.$setViewValue(w.balanceInfo.topAmount);
        form.amount.$render();
        form.amount.$isValid = true;
      }
    };

    this.setForm = function(to, amount, comment) {
      var form = $scope.sendForm;
      if (to) {
        form.address.$setViewValue(to);
        form.address.$isValid = true;
        form.address.$render();
        this.lockAddress = true;
      }

      if (amount) {
        form.amount.$setViewValue("" + amount);
        form.amount.$isValid = true;
        form.amount.$render();
        this.lockAmount = true;
      }

      if (comment) {
        form.comment.$setViewValue(comment);
        form.comment.$isValid = true;
        form.comment.$render();
      }
    };

    this.resetForm = function(form) {
      this.error = this.success = null;
      this.fetchingURL = null;
      this._paypro = null;

      this.lockAddress = false;
      this.lockAmount = false;

      this._amount = this._address = null;

      if (form && form.amount) {
        form.amount.$pristine = true;
        form.amount.$setViewValue('');
        form.amount.$render();

        form.comment.$setViewValue('');
        form.comment.$render();
        form.$setPristine();

        if (form.address) {
          form.address.$pristine = true;
          form.address.$setViewValue('');
          form.address.$render();
        }
      }
      $timeout(function() {
        $rootScope.$digest();
      }, 1);
    };

    this.openPPModal = function(paypro) {
      var ModalInstanceCtrl = function($scope, $modalInstance) {
        var satToUnit = 1 / self.unitToSatoshi;
        $scope.paypro = paypro;
        $scope.alternative = self.alternativeAmount;
        $scope.alternativeIsoCode = self.alternativeIsoCode;
        $scope.isRateAvailable = self.isRateAvailable;
        $scope.unitTotal = (paypro.amount * satToUnit).toFixed(self.unitDecimals);
        $scope.unitName = self.unitName;
        $scope.color = fc.backgroundColor;

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };
      $modal.open({
        templateUrl: 'views/modals/paypro.html',
        windowClass: 'full',
        controller: ModalInstanceCtrl,
      });
    };

    this.setFromPayPro = function(uri, form) {
      var isChromeApp = window.chrome && chrome.runtime && chrome.runtime.id;
      if (isChromeApp) {
        this.error = 'Payment Protocol not yet supported on ChromeApp';
        return;
      }

      var satToUnit = 1 / this.unitToSatoshi;
      this.fetchingURL = uri;
      this.blockUx = true;
      var self = this;

      $log.debug('Fetch PayPro Request...', uri);
      fc.fetchPayPro({
        payProUrl: uri,
      }, function(err, paypro) {
        $log.debug(paypro);
        self.blockUx = false;
        self.fetchingURL = null;

        if (err) {
          $log.warn(err);
          self.resetForm(form);
          var msg = err.toString();
          if (msg.match('HTTP')) {
            msg = 'Could not fetch payment information';
          }
          self.error = msg;
        } else {
          self._paypro = paypro;
          self.setForm(paypro.toAddress, (paypro.amount * satToUnit).toFixed(self.unitDecimals),
            paypro.memo);
        }
      });
    };

    this.setFromUri = function(uri) {
      function sanitizeUri(uri) {
        // Fixes when a region uses comma to separate decimals
        var regex = /[\?\&]amount=(\d+([\,\.]\d+)?)/i;
        var match = regex.exec(uri);
        if (!match || match.length === 0) {
          return uri;
        }
        var value = match[0].replace(',', '.');
        var newUri = uri.replace(regex, value);
        return newUri;
      };

      var satToUnit = 1 / this.unitToSatoshi;

      uri = sanitizeUri(uri);

      if (!bitcore.URI.isValid(uri)) {
        return uri;
      }
      var parsed = new bitcore.URI(uri);
      var addr = parsed.address.toString();
      var message = parsed.message;
      if (parsed.r)
        return this.setFromPayPro(parsed.r);

      var amount = parsed.amount ?
        (parsed.amount.toFixed(0) * satToUnit).toFixed(this.unitDecimals) : 0;

      this.setForm(addr, amount, message);
      return addr;
    };

    this.onAddressChange = function(value) {
      this.error = this.success = null;
      if (!value) return '';

      if (this._paypro)
        return value;

      if (value.indexOf('bitcoin:') === 0) {
        return this.setFromUri(value);
      } else if (/^https?:\/\//.test(value)) {
        return this.setFromPayPro(value);
      } else {
        return value;
      }
    };

    this.openAddressBook = function() {
      var w = $rootScope.wallet;
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/address-book.html',
        windowClass: 'full',
        controller: function($scope, $modalInstance) {

          $scope.showForm = null;
          $scope.addressBook = w.addressBook;

          $scope.hasEntry = function() {
            return _.keys($scope.addressBook).length > 0 ? true : false;
          };

          $scope.toggleAddressBookEntry = function(key) {
            w.toggleAddressBookEntry(key);
          };

          $scope.copyToSend = function(addr) {
            $modalInstance.close(addr);
          };

          $scope.cancel = function(form) {
            $scope.error = $scope.success = $scope.newaddress = $scope.newlabel = null;
            clearForm(form);
            $scope.toggleForm();
          };

          $scope.toggleForm = function() {
            $scope.showForm = !$scope.showForm;
          };

          var clearForm = function(form) {
            form.newaddress.$pristine = true;
            form.newaddress.$setViewValue('');
            form.newaddress.$render();

            form.newlabel.$pristine = true;
            form.newlabel.$setViewValue('');
            form.newlabel.$render();
            form.$setPristine();
          };

          // TODO change to modal
          $scope.submitAddressBook = function(form) {
            if (form.$invalid) {
              return;
            }
            $scope.blockUx = true;
            $timeout(function() {
              var errorMsg;
              var entry = {
                "address": form.newaddress.$modelValue,
                "label": form.newlabel.$modelValue
              };
              try {
                w.setAddressBook(entry.address, entry.label);
              } catch (e) {
                $log.warn(e);
                errorMsg = e.message;
              }

              if (errorMsg) {
                $scope.error = errorMsg;
              } else {
                clearForm(form);
                $scope.toggleForm();
                notification.success('Entry created', 'New addressbook entry created')
              }
              $scope.blockUx = false;
              $rootScope.$digest();
            }, 100);
            return;
          };

          $scope.close = function() {
            $modalInstance.dismiss('cancel');
          };
        },
      });

      modalInstance.result.then(function(addr) {
        $scope.setForm(addr);
      });
    };
  });

'use strict';

angular.module('copayApp.controllers').controller('settingsController', function(configService, applicationService) {
  var config;
  
  this.init = function() {
    config = configService.get();
    this.bws = config.bws.url;
  };

  this.save = function() {
    if (!this.bws) return;
    config.bws.url = this.bws;
    var res = configService.set(config);
    if (res) {
      applicationService.restart();
    }
  };

  this.reset = function() {
    if (configService.reset()) {
      applicationService.restart();
    }
  };

});

'use strict';

angular.module('copayApp.controllers').controller('sidebarController',
  function($rootScope, $timeout, lodash, profileService, configService, go) {
    var self = this;
    self.walletSelection = false;

    // wallet list change
    $rootScope.$on('Local/WalletListUpdated', function(event) {
      self.walletSelection = false;
      self.setWallets();
    });

    $rootScope.$on('Local/ColorUpdated', function(event) {
      self.setWallets();
    });

    self.signout = function() {
      profileService.signout();
    };

    self.switchWallet = function(wid) {
      self.walletSelection = false;
      profileService.setAndStoreFocus(wid, function() {});
      go.walletHome();
    };

    self.toggleWalletSelection = function() {
      self.walletSelection = !self.walletSelection;
      if (!self.walletSelection) return;
      self.setWallets();
    };

    self.setWallets = function() {
      if (!profileService.profile) return;
      var config = configService.getSync();
      config.colorFor = config.colorFor || {};
      var ret = lodash.map(profileService.profile.credentials, function(c) {
        return {
          m: c.m,
          n: c.n,
          name: c.walletName,
          id: c.walletId,
          color: config.colorFor[c.walletId] || '#1ABC9C',
        };
      });
      self.wallets = lodash.sortBy(ret, 'walletName');
    };

    self.setWallets();

  });

angular.module('copayApp.controllers').controller('signOutController', function(identityService) {

  identityService.signout();

});

'use strict';

angular.module('copayApp.controllers').controller('signinController',
  function($rootScope, $timeout, $window, go, notification, profileService, pinService, applicationService, isMobile, isCordova, localStorageService) {

    var KEY = 'CopayDisclaimer';
    var _credentials;

    this.init = function() {
      this.isMobile = isMobile.any();
      this.isWindowsPhoneApp = isMobile.Windows() && isCordova;
      this.hideForWP = 0;
      this.attempt = 0;
      this.digits = [];
      this.defined = [];
      this.askForPin = 0;

      // This is only for backwards compat, insight api should link to #!/confirmed directly
      if (getParam('confirmed')) {
        var hashIndex = window.location.href.indexOf('/?');
        window.location = window.location.href.substr(0, hashIndex) + '#!/confirmed';
        return;
      }

      if ($rootScope.fromEmailConfirmation) {
        this.confirmedEmail = true;
        $rootScope.fromEmailConfirmation = false;
      }

      if ($rootScope.wallet) {
        go.walletHome();
      }

    };

    this.clear = function() {
      pinService.clearPin(this);
    };

    this.press = function(digit) {
      pinService.pressPin(this, digit);
    };

    this.skip = function() {
      pinService.skipPin(this);
    };

    this.agreeDisclaimer = function() {
      if (localStorageService.set(KEY, true)) {
        this.showDisclaimer = null;
      }
    };

    this.formFocus = function() {
      if (this.isWindowsPhoneApp) {
        this.hideForWP = true;
        $timeout(function() {
          this.$digest();
        }, 1);
      }
    };

    this.openWithPin = function(pin) {

      if (!pin) {
        this.error = 'Please enter the required fields';
        return;
      }
      $rootScope.starting = true;

      $timeout(function() {
        var credentials = pinService.get(pin, function(err, credentials) {
          if (err || !credentials) {
            $rootScope.starting = null;
            this.error = 'Wrong PIN';
            this.clear();
            $timeout(function() {
              this.error = null;
            }, 2000);
            return;
          }
          this.open(credentials.email, credentials.password);
        });
      }, 100);
    };

    this.openWallets = function() {
      var iden = $rootScope.iden;
      $rootScope.hideNavigation = false;
      $rootScope.starting = true;
      iden.openWallets();
    };

    this.createPin = function(pin) {
      preconditions.checkArgument(pin);
      preconditions.checkState($rootScope.iden);
      preconditions.checkState(_credentials && _credentials.email);
      $rootScope.starting = true;

      $timeout(function() {
        pinService.save(pin, _credentials.email, _credentials.password, function(err) {
          _credentials.password = '';
          _credentials = null;
          this.askForPin = 0;
          $rootScope.hasPin = true;
          $rootScope.starting = null;
          this.openWallets();
        });
      }, 100);
    };

    this.openWithCredentials = function(form) {
      if (form && form.$invalid) {
        this.error = 'Please enter the required fields';
        return;
      }

      this.open(form.email.$modelValue, form.password.$modelValue);
    };


    this.pinLogout = function() {
      pinService.clear(function() {
        copay.logger.debug('PIN erased');
        delete $rootScope['hasPin'];
        applicationService.restart();
      });
    };

    this.open = function(username, password) {
      $rootScope.starting = true;
      profileService.open(username, password, function(err) {
        if (err) {
          $rootScope.starting = false;
          $rootScope.hasPin = false;
          pinService.clear(function() {});
          this.error = 'Unknown error';
          return;
        }

        // mobile
        if (this.isMobile && !$rootScope.hasPin) {
          _credentials = {
            email: email,
            password: password,
          };
          this.askForPin = 1;
          $rootScope.starting = false;
          $rootScope.hideNavigation = true;
          $timeout(function() {
            $rootScope.$digest();
          }, 1);
        }
        // no mobile
        else {
          //        this.openWallets();
        }
      });
    };

    function getParam(sname) {
      var params = location.search.substr(location.search.indexOf("?") + 1);
      var sval = "";
      params = params.split("&");
      // split param and value into individual pieces
      for (var i = 0; i < params.length; i++) {
        var temp = params[i].split("=");
        if ([temp[0]] == sname) {
          sval = temp[1];
        }
      }
      return sval;
    }
  });

'use strict';

angular.module('copayApp.controllers').controller('topbarController', function($rootScope, $scope, $timeout, $modal, isCordova, isMobile, go) {   
  var cordovaOpenScanner = function() {
    window.ignoreMobilePause = true;
    cordova.plugins.barcodeScanner.scan(
      function onSuccess(result) {
        $timeout(function() {
          window.ignoreMobilePause = false;
        }, 100);
        if (result.cancelled) return;

        $timeout(function() {
          var data = result.text;
          $rootScope.$emit('dataScanned', data); 
        }, 1000);
      },
      function onError(error) {
        $timeout(function() {
          window.ignoreMobilePause = false;
        }, 100);
        alert('Scanning error');
      });
    go.send();
  }; 

  var modalOpenScanner = function() { 
    var _scope = $scope;
    var ModalInstanceCtrl = function($scope, $rootScope, $modalInstance) {
      // QR code Scanner
      var video;
      var canvas;
      var $video;
      var context;
      var localMediaStream;

      var _scan = function(evt) {
        if (localMediaStream) {
          context.drawImage(video, 0, 0, 300, 225);
          try {
            qrcode.decode();
          } catch (e) {
            //qrcodeError(e);
          }
        }
        $timeout(_scan, 500);
      };

      var _scanStop = function() {
        if (localMediaStream && localMediaStream.stop) localMediaStream.stop();
        localMediaStream = null;
        video.src = '';
      }; 

      qrcode.callback = function(data) {
        _scanStop();
        $modalInstance.close(data);
      };

      var _successCallback = function(stream) {
        video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        localMediaStream = stream;
        video.play();
        $timeout(_scan, 1000);
      };

      var _videoError = function(err) {
        $scope.cancel();
      };

      var setScanner = function() {
        navigator.getUserMedia = navigator.getUserMedia ||
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL ||
        window.mozURL || window.msURL;
      };

      $scope.init = function() {
        setScanner();
        $timeout(function() {
          go.send();
          canvas = document.getElementById('qr-canvas');
          context = canvas.getContext('2d');

          
          video = document.getElementById('qrcode-scanner-video');
          $video = angular.element(video);
          canvas.width = 300;
          canvas.height = 225;
          context.clearRect(0, 0, 300, 225);

          navigator.getUserMedia({
            video: true
          }, _successCallback, _videoError);
        }, 500);
      };

      $scope.cancel = function() {
        _scanStop();
        $modalInstance.dismiss('cancel');
      };
    };

    var modalInstance = $modal.open({
      templateUrl: 'views/modals/scanner.html',
      windowClass: 'full',
      controller: ModalInstanceCtrl,
      backdrop : 'static',
      keyboard: false
    });
    modalInstance.result.then(function(data) {
      $rootScope.$emit('dataScanned', data); 
    });

  };

  this.openScanner = function() {
    if (isCordova) {
      cordovaOpenScanner();
    }
    else {
      modalOpenScanner();
    }
  };

});

'use strict';

angular.module('copayApp.controllers').controller('unsupportedController', function($state) {
  if (localStorage && localStorage.length > 0) {
    $state.go('signin');
  }
});

'use strict';

angular.module('copayApp.controllers').controller('versionController', function() {
  this.version = window.version;
  this.commitHash = window.commitHash;
});

'use strict';
angular.module('copayApp.controllers').controller('walletForPaymentController', function($rootScope, $scope, $modal, identityService, go) {

  // INIT: (not it a function, since there is no associated html)

  var ModalInstanceCtrl = function($scope, $modalInstance, identityService) {
    $scope.loading = true;
    preconditions.checkState($rootScope.iden);

    var iden = $rootScope.iden;
    iden.on('newWallet', function() {
      $scope.setWallets();
    });

    $scope.setWallets = function() {
      $scope.wallets = $rootScope.iden.getWallets();
    };

    $scope.ok = function(w) {
      $modalInstance.close(w);
    };

    $scope.cancel = function() {
      $rootScope.pendingPayment = null;
      $modalInstance.close();
    };
  };

  var modalInstance = $modal.open({
    templateUrl: 'views/modals/walletSelection.html',
    windowClass: 'full',
    controller: ModalInstanceCtrl,
  });

  modalInstance.result.then(function(w) {
    if (w) {
      identityService.setFocusedWallet(w);
      $rootScope.walletForPaymentSet = true;
    } else {
      $rootScope.pendingPayment = null;
    }
    go.walletHome();
  }, function() {
    $rootScope.pendingPayment = null;
    go.walletHome();
  });
});

'use strict';


// TODO rateService
angular.module('copayApp.controllers').controller('walletHomeController', function($scope, $rootScope, $timeout, $filter, $modal, notification, txStatus, isCordova, profileService, lodash) {


  $scope.openCopayersModal = function(copayers, copayerId) {
    var ModalInstanceCtrl = function($scope, $modalInstance) {
      $scope.copayers = copayers;
      $scope.copayerId = copayerId;
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    };
    $modal.open({
      templateUrl: 'views/modals/copayers.html',
      windowClass: 'full',
      controller: ModalInstanceCtrl,
    });
  };



  $scope.openTxModal = function(tx, copayers) {
    var fc = profileService.focusedClient;
    var ModalInstanceCtrl = function($scope, $modalInstance) {
      $scope.error = null;
      $scope.tx = tx;
      $scope.copayers = copayers
      $scope.loading = null;
      $scope.color = fc.backgroundColor;

      $scope.getShortNetworkName = function() {
        return fc.credentials.networkName.substring(0, 4);
      };

      lodash.each(['TxProposalRejectedBy', 'TxProposalAcceptedBy', 'transactionProposalRemoved', 'TxProposalRemoved'], function(eventName) {
        $rootScope.$on(eventName, function() {
          fc.getTx($scope.tx.id, function(err, tx) {
            if (err) {

              if (err.code && err.code == 'BADREQUEST' &&
                (eventName == 'transactionProposalRemoved' || eventName == 'TxProposalRemoved')) {
                $scope.tx.removed = true;
                $scope.tx.couldRemove = false;
                $scope.tx.pendingForUs = false;
                $scope.$apply();
                return;
              }
              return;
            }

            var action = lodash.find(tx.actions, {
              copayerId: fc.credentials.copayerId
            });
            $scope.tx = tx;
            if (!action && tx.status == 'pending')
              $scope.tx.pendingForUs = true;
            $scope.updateCopayerList();
            $scope.$apply();
          });
        });
      });

      $scope.updateCopayerList = function() {
        lodash.map($scope.copayers, function(cp) {
          lodash.each($scope.tx.actions, function(ac) {
            if (cp.id == ac.copayerId) {
              cp.action = ac.type;
            }
          });
        });
      };

      $scope.sign = function(txp) {
        var fc = profileService.focusedClient;
        if (fc.isPrivKeyEncrypted()) {
          profileService.unlockFC(function(err) {
            if (err) {
              $scope.error = err;
              return;
            }
            return $scope.sign(txp);
          });
          return;
        };

        if (isCordova) {
          window.plugins.spinnerDialog.show(null, 'Signing transaction...', true);
        }
        $scope.loading = true;
        $scope.error = null;
        $timeout(function() {
          fc.signTxProposal(txp, function(err, txpsi) {
            profileService.lockFC();
            if (isCordova) {
              window.plugins.spinnerDialog.hide();
            }
            $scope.loading = false;
            if (err) {
              $scope.error = err.message || 'Transaction not signed. Please try again.';
              $scope.$digest();
            } else {
              //if txp has required signatures then broadcast it
              var txpHasRequiredSignatures = txpsi.status == 'accepted';
              if (txpHasRequiredSignatures) {
                fc.broadcastTxProposal(txpsi, function(err, txpsb) {
                  if (err) {
                    $scope.error = 'Transaction not broadcasted. Please try again.';
                    $scope.$digest();
                  } else {
                    $modalInstance.close(txpsb);
                  }
                });
              } else {
                $modalInstance.close(txpsi);
              }
            }
          });
        }, 100);
      };

      $scope.reject = function(txp) {
        if (isCordova) {
          window.plugins.spinnerDialog.show(null, 'Rejecting transaction...', true);
        }
        $scope.loading = true;
        $scope.error = null;
        $timeout(function() {
          fc.rejectTxProposal(txp, null, function(err, txpr) {
            if (isCordova) {
              window.plugins.spinnerDialog.hide();
            }
            $scope.loading = false;
            if (err) {
              $scope.error = err.message || 'Transaction not rejected. Please try again.';
              $scope.$digest();
            } else {
              $modalInstance.close(txpr);
            }
          });
        }, 100);
      };


      $scope.remove = function(txp) {
        if (isCordova) {
          window.plugins.spinnerDialog.show(null, 'Deleting transaction...', true);
        }
        $scope.loading = true;
        $scope.error = null;
        $timeout(function() {
          fc.removeTxProposal(txp, function(err, txpb) {
            if (isCordova) {
              window.plugins.spinnerDialog.hide();
            }
            $scope.loading = false;

            // Hacky: request tries to parse an empty response
            if (err && !(err.message && err.message.match(/Unexpected/)) ) {
              $scope.error = err.message || 'Transaction could not be deleted. Please try again.';
              $scope.$digest();
              return;
            } 
            $modalInstance.close();
          });
        }, 100);
      };

      $scope.broadcast = function(txp) {
        if (isCordova) {
          window.plugins.spinnerDialog.show(null, 'Sending transaction...', true);
        }
        $scope.loading = true;
        $scope.error = null;
        $timeout(function() {
          fc.broadcastTxProposal(txp, function(err, txpb) {
            if (isCordova) {
              window.plugins.spinnerDialog.hide();
            }
            $scope.loading = false;
            if (err) {
              $scope.error = err.message || 'Transaction not sent. Please try again.';
              $scope.$digest();
            } else {
              $modalInstance.close(txpb);
            }
          });
        }, 100);
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    };

    var modalInstance = $modal.open({
      templateUrl: 'views/modals/txp-details.html',
      windowClass: 'full',
      controller: ModalInstanceCtrl,
    });

    modalInstance.result.then(function(txp) {
      if (txp) {
        txStatus.notify(txp);
      }
      $scope.$emit('Local/TxProposalAction');
    });

  };

});

'use strict';
angular.module('copayApp.controllers').controller('WarningController', function($scope, $rootScope, $location, identityService) {

  $scope.checkLock = function() {
    if (!$rootScope.tmp || !$rootScope.tmp.getLock()) {
      console.log('[warning.js.7] TODO LOCK'); //TODO
    }
  };

  $scope.signout = function() {
    identityService.signout();
  };

  $scope.ignoreLock = function() {
    var w = $rootScope.tmp;
    delete $rootScope['tmp'];

    if (!w) {
      $location.path('/');
    } else {
      w.ignoreLock = 1;
      $scope.loading = true;
      //controllerUtils.startNetwork(w, $scope);
      // TODO
    }
  };
});

angular.module('copayApp').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('es', {"* Using this device storage. Change to cloud storage on 'settings'.":"* Utilizando este dispositivo para guardar. Cambiar a almacenamiento en la nube desde 'preferencias'.","-- choose wallet --":"-- Seleccionar monedero --","A transaction was rejected by":"Una transacción fue rechazada por","A transaction was signed by":"Una transacción fue firmada por","ALL Transactions Proposals will be discarded. This needs to be done on <b>ALL</b> peers of a wallet, to prevent the old proposals to be resynced again.":"TODAS las Propuestas de Transacciones serán descartadas. Es necesario que lo hagan <b>TODOS</b> los compañeros del monedero, para prevenir que las viejas propuestas sean re sincronizadas de nuevo.","Access your wallets anywhere":"Acceder a sus monederos en cualquier lugar","Accessing your profile":"Abriendo tu perfil","Add":"Agregar","Add Wallet":"Agregar Monedero","Add a new entry":"Nueva Entrada","Add a private comment to identify the transaction":"Agregar comentario privado para identificar la transacción","Add entry":"Nueva Entrada","Add wallet":"Agregar monedero","Address":"Dirección","Address Book":"Libreta de Direcciones","Alternative Currency":"Moneda Alternativa","Amount":"Importe","Amount in":"Importe en","An email was sent to":"Se envió un correo electrónico a","Aprox. size:":"Tamaño aprox.:","Are you sure you want to cancel and delete this wallet":"¿Estas seguro de cancelar y borrar este monedero?","Are you sure you want to delete this profile?":"¿Estas seguro de borrar este perfil?","Are you sure you want to delete this wallet?":"¿Estas seguro de borrar este monedero?","Attempting to reconnect...":"Intentando reconectar...","Available Balance":"Balance disponible","BIP32 master extended private key (hex)":"BIP32 master extended private key (hex)","Back":"Volver","Backup created":"Copia de Seguridad creada","Backup options":"Opciones de copia de seguridad","Backups managed by the server":"Copias de seguridad gestionada por el servidor","Balance:":"Balance:","Bitcoin address":"Dirección bitcoin","Broadcast Transaction":"Emitir Transacción","Browser unsupported":"Navegador no soportado","Cancel":"Cancelar","Certified by:":"Certificado por:","Choose a password":"Escribe una contraseña","Choose backup file from your computer":"Seleccione el archivo backup de su computadora","Close":"Cerrar","Confirm your email address":"Confirmar tu correo electrónico","Confirm your email address to increase storage usage limits.":"Confirmar correo electrónico para incrementar el límite de almacenamiento.","Confirmations:":"Confirmaciones:","Continue anyways":"Continuar de todas maneras","Copay now needs a profile to access wallets.":"Copay ahora requiere un perfil para acceder a los monederos","Copayers":"Compañeros","Copied to clipboard":"Copiado al portapapeles","Copy backup in a safe place":"Guardar copia de seguridad en un lugar seguro","Copy this text as it is in a safe place (notepad or email)":"Copiar el texto como esta en un lugar seguro (notepad o correo electrónico)","Copy to clipboard":"Copiar al portapapeles","Could not connect to the Insight server. Check your settings and network configuration":"No se pudo conectar con el servidor Insight. Verifica la configuración de red","Create":"Crear","Create Profile":"Crear Perfil","Create in the cloud":"Crear en la nube","Create new wallet":"Crear nuevo monedero","Create on this device":"Crear en este dispositivo","Create profile":"Crear perfil","Create, join or import":"Crear, unirse o importar","Creating in the cloud":"Creando en la nube","Creating on this device":"Creando en este dispositivo","Creator":"Creador","Date":"Fecha","Date:":"Fecha:","Delete":"Eliminar","Delete Profile":"Borrar Perfil","Delete wallet":"Borrar monedero","Disclaimer":"Renuncia","Download CSV file":"Descargar archivo CSV","Download backup":"Descargar copia de seguridad","Email":"Correo electrónico","Email address confirmation needed":"Confirmar correo electrónico","Email not confirmed":"Correo sin confirmar","Empty. Create an alias for your addresses":"Vacío. Crea una etiqueta para tus direcciones","Encrypted backup file saved":"Archivo de copia de seguridad encriptado guardado","Enter PIN":"Ingresar PIN","Entry":"Entrada","Error updating indexes:":"Error al actualizar índices:","Expires:":"Expira:","Family vacation funds":"Fondos para vacaciones en familia","Fatal error connecting to Insight server":"Error fatal al conectar con el servidor Insight","Fetching Payment Information...":"Buscando información del pago","Finished":"Finalizado","Form Error":"Error en formulario","Funds received!":"¡Fondos recibidos!","Generate new address":"Generar nueva dirección","Generating file...":"Generando archivo...","Get QR code":"Obtener código QR","Getting transactions...":"Cargando transacciones...","Hide":"Ocultar","Hide them":"Ocultar","History":"Historial","Home":"Inicio","I read and agree with these terms":"He leído y aceptado estos términos","Import":"Importar","Import Profile":"Importar Perfil","Import a backup":"Importar una copia de seguridad","Import backup":"Importar copia de seguridad","Import wallet":"Importar monedero","Importing wallet - Reading backup...":"Importando monedero - Leyendo archivo...","Importing wallet - Setting things up...":"Importando monedero - Configurando...","Importing wallet - We are almost there...":"Importando monedero - Finalizando...","In the Cloud":"En la nube","Insight API server":"Servidor de Insight API","Insight API server is open-source software. You can run your own instances, check":"Servidor de Insight API es un software código-abierto. Puedes correr tu propia instancia en <a href=\"http://insight.is\" target=\"_blank\">Insight API Homepage</a>","It's important that you update your wallet at https://copay.io":"Es importante que actualices tu monedero en https://copay.io","It's important to backup your profile so that you can recover it in case of disaster. The backup will include all your profile's wallets":"Es importante hacer copia de seguridad de tu monedero para que puedas recuperarlo en caso de pérdidas de datos de tu computadora","Join":"Unirse","Join Secret":"Ingresar Secreto","Join shared wallet":"Unirse a un monedero","Label":"Etiqueta","Learn more about this option":"Más detalles de esta opción","Leave a private message to your copayers":"Dejar mensaje privado a tus compañeros","Leave feedback":"Dejar comentarios","Loading...":"Cargando...","Lock":"Bloquear","Log level":"Nivel de registro","Log level shows information on the console. This is useful to find bugs and to help users. 'debug' is the most verbose level while 'fatal' only shows unexpected errors":"Nivel de registro muestra información de la consola. Esto es útil para encontrar errores y ayudar a los usuarios. 'debug' es el nivel más detallado, mientras que 'mortal' sólo muestra errores inesperados","Login Required":"Inicio de Sesión Requerido","Master Private Key":"Master Private Key","Master extended private key":"Master extended private key","Me":"Yo","Merchant Message:":"Mensaje del negocio:","More pluggins are welcomed!":"¡Más extensiones son bienvenidas!","Multisignature wallet":"Monedero multifirma","My Bitcoin address:":"Mi dirección Bitcoin:","My Profile":"Mi Perfil","Name:":"Nombre:","Need to be careful with backups":"Necesita ser cuidadoso con las copias de seguridad","Needs Backup":"Copia de Seguridad necesaria","Network Error":"Error de Red","Networking Error":"Error de Red","New Transaction":"Nueva Transacción","New entry has been created":"Nueva entrada fue creada","Next":"Siguiente","No":"No","No email required":"Correo electrónico no es requerido","No pending spend proposals at the moment.":"No hay gastos pendientes en este momento.","No transactions yet.":"Sin propuestas de transacciones aún.","Not valid":"No válido","Note":"Nota","Note:":"Nota:","OKAY":"LISTO","On this Device":"En este dispositivo","Opening the wallet in multiple browser tabs could lead to unexpected results":"Abrir el monedero en varias ventanas del mismo navegador podría conducir a resultados inesperados","Page not found":"Página no encontrada","Password":"Contraseña","Passwords must match":"Las contraseñas deben coincidir","Paste backup plain text code":"Pegar copia de seguridad en texto plano","Paste wallet secret here":"Pegar código secreto del monedero aquí","Payment to":"Pago a","Pending Transactions Proposals will be discarded. This needs to be done on <b>ALL</b> peers of a wallet, to prevent the old proposals to be resynced again.":"Las Propuestas de Transacciones Pendientes serán descartadas. Esto es necesario hacerlo con <b>TODOS</b> los compañeros del monedero, para prevenir que viejas propuestas sean re sincronizadas de nuevo.","Permanently delete this profile and all its wallets. WARNING: this action cannot be reversed.":"Borrar permanentemente este perfil y sus monederos. ADVERTENCIA: esta acción no puede deshacerse.","Permanently delete this wallet. WARNING: this action cannot be reversed.":"Borrar permanentemente este monedero. ADVERTENCIA: esta acción no puede deshacerse.","Personal Wallet":"Monedero Personal","Please complete required fields":"Por favor complete los campos requeridos","Please confirm your email address using the confirmation link at the message we sent you":"Por favor confirma tu correo electrónico usando el enlace de este mensaje","Please enter the required fields":"Por favor ingrese los campos requeridos","Please follow the link on it to confirm it. Unconfirmed profiles could be deleted from server.":"Por favor sigue el enlace para confirmar. Perfiles sin confirmar podrían ser eliminados del servidor.","Please note the wallet creator <b>must be online</b> until all copayers have joined.":"Por favor note que el creador del monedero <b>debe estar conectado</b> hasta que todos los compañeros se hayan unido.","Please open wallet to complete payment":"Por favor abrir un monedero para completar el pago","Please sign in to access your wallets":"Por favor ingresa para ver tus monederos","Please sign in to make the payment":"Por favor ingresa para completar el pago","Please update your wallet at https://copay.io":"Por favor actualiza tu monedero de https://copay.io","Please, select your backup file":"Por favor, selecciona el archivo de copia de seguridad","Profile":"Perfil","Purge":"Purgar","Purge ALL Transaction Proposals":"Purgar TODAS las Propuestas de Transacciones","Purge All":"Purgar Todo","Purge Pending Transaction Proposals":"Purgar Propuestas de Transacciones Pendientes","Read and Store Profiles:":"Leer y guardar perfiles:","Receive":"Recibir","Received corrupt message from":"Se recibió un mensaje corrupto de","Received corrupt transaction from":"Se recibió una transacción corrupta de","Recommended":"Recomendado","Reject":"Rechazar","Repeat PIN":"Repetir PIN","Repeat password":"Repite la contraseña","Require pin to unlock":"Requiere PIN para desbloquear","Required":"Requerido","Reset settings":"Restablecer","Save":"Guardar","Scan":"Explorar","Scan Wallet Addresses":"Explorar Direcciones del Monedero","Scaning for transactions":"Explorando transacciones","See it on the blockchain":"Ver en la blockchain","Select a backup file":"Seleccionar el archivo de copia de seguridad","Select a wallet to make the payment":"Seleccione monedero para realizar el pago","Select required signatures":"Seleccione las firmas requeridas","Select total number of copayers":"Seleccione el total de compañeros","Send":"Enviar","Send by email":"Enviar por correo electrónico","Session closed":"Sesión cerrada","Session closed because a long time of inactivity":"La sesión fue cerrada por mucho tiempo de inactividad","Session will be closed":"La sesión se cerrará","Set up a PIN":"Configure un PIN","Settings":"Configuración","Share address":"Compartir dirección","Share secret":"Compartir código secreto","Share this secret with your copayers":"Compartir el secreto con tus compañeros","Share this with anyone to have them send you payments. To protect your privacy, new addresses are generated automatically once you use them.":"Compartir esto para que le envíen los pagos. Para proteger tu privacidad, nuevas direcciones se generan automáticamente una vez que los usas.","Show":"Mostrar","Show all my addresses":"Mostrar todas mis direcciones","Sign":"Firmar","Sign in":"Ingresar","Signatures:":"Firmas:","Signing out":"Saliendo","Skip":"Omitir","Skip public keys":"Ignorar claves pública","Skip transaction proposals":"Ignorar propuestas de transacciones","Skipping fields: {{skipFields}}":"Saltear campos: {{skipFields}}","Spend proposals":"Propuestas de gastos","Status:":"Estado:","Storage":"Almacenamiento","Success":"Listo","Testnet":"Testnet","The balance is updated using the derived addresses":"El balance es actualizado utilizando direcciones derivadas","The secret string you entered is invalid":"La palabra secreta ingresada no es válida","The software you are about to use is free, open source, and unsupported beta software. It is important to understand\n      that beta software refers to software that is undergoing testing and has not officially been released, could have\n      bugs, and may not act in a reliable fashion. Because the software is currently in beta, it is possible but not certain\n      that you may lose bitcoin or the value of your bitcoin. It is recommended that you store only nominal amounts of\n      bitcoins. You acknowledge that your use of this software is at your own discretion and in compliance with all\n      applicable laws. You are responsible for safekeeping your login IDs, passwords, private key pairs, PINs and any other\n      codes you use to access the software. IF YOU HAVE NOT SEPARATELY STORED A BACKUP OF ANY WALLET ADDRESSES AND PRIVATE\n      KEY PAIRS MAINTAINED IN YOUR ACCOUNT, YOU ACKNOWLEDGE AND AGREE THAT ANY BITCOINS YOU HAVE ASSOCIATED WITH SUCH WALLET\n      ADDRESSES WILL BECOME INACCESSIBLE IF YOU DO NOT HAVE YOUR ACCOUNT PASSWORD AND/OR PIN.  All transaction requests are\n      irreversible.  The authors of the software, employees and affiliates of Bitpay, copyright holders, and BitPay, Inc.\n      cannot retrieve your private keys or passwords if you lose or forget them and cannot guarantee transaction\n      confirmation as they do not have control over the Bitcoin network. You agree to provide accurate and complete\n      information in connection with your use of the account. You assume any and all risk associated with the use of the\n      software. To the fullest extent permitted by law, this software is provided “as is” and no representations or\n      warranties can be made of any kind, express or implied, including but not limited to the warranties of\n      merchantability, fitness or a particular purpose and noninfringement. In no event shall the authors of the software,\n      employees and affiliates of Bitpay, copyright holders, or BitPay, Inc. be held liable for any claim, damages or other\n      liability, whether in an action of contract, tort, or otherwise, arising from, out of or in connection with the\n      software or the use or other dealings in the software. We reserve the right to modify this disclaimer from time to\n      time.":"El software que van a utilizar es libre de código abierto y software beta no admitido. Es importante entender que el software beta se refiere al software que es someterse a la prueba no ha sido lanzado oficialmente, puede tener errores y no puede actuar de una manera confiable. Porque el software está actualmente en fase beta, es posible pero no seguro de que puede perder bitcoin o el valor de tu bitcoin. Se recomienda que guarde sólo nominales cantidades de bitcoins. Usted reconoce que el uso de este software es bajo su propia discreción y cumple con todas las leyes aplicables. Usted es responsable de la custodia su ID de inicio de sesión, contraseñas, pares de claves privadas, pernos y cualquier otros códigos que utilizas para acceder al software. SI NO HAS ALMACENADO POR SEPARADO UNA COPIA DE SEGURIDAD DE CUALQUIER CARTERA DIRECCIONES Y PARES DE CLAVES PRIVADAS MANTENIDAS EN SU CUENTA, USTED RECONOCE Y ACEPTA QUE CUALQUIER BITCOINS SE HA ASOCIADO CON TALES DIRECCIONES CARTERA SERÁ INACCESIBLES SI NO TIENES TU CONTRASEÑA O PIN. Todas las solicitudes de transacción son irreversibles.  Los autores del software, empleados y afiliados de Bitpay, los titulares del copyright y BitPay, Inc. no pueden recuperar sus claves o contraseñas si pierde u olvida y no garantiza la confirmación de la transacción como no tienen control sobre la red Bitcoin. Usted acepta proporcionar información precisa y completa en relación con su uso de la cuenta. Usted asume todo riesgo asociado con el uso del software. En la medida permitida por la ley, este software se proporciona \"tal cual\" y sin representaciones o garantías pueden ser hechas de cualquier tipo, expresas o implícitas, incluyendo pero no limitadas a, las garantías de comerciabilidad, idoneidad o un propósito particular y no infracción. En ningún caso los autores del software, empleados y afiliados de Bitpay, los titulares del copyright o BitPay, Inc. responderá de cualquier reclamación, daños u otra responsabilidad, ya sea en una acción de contrato, agravio o de lo contrario, que se presentaba de, fuera de o en relación con el software o el uso u otras reparticiones en el software. Nos reservamos el derecho de modificar este aviso de vez en cuando.","The transaction proposal has been created":"La propuesta de transacción fue creada","The wallet is full":"El monedero esta completo","There was an error sending the transaction":"Hubo un error al enviar la transacción","There was an error signing the transaction":"Hubo un error al firmar la transacción","This is the initial secret join string. Since your wallet it is already complete, this is only useful to rejoin peers that lost their backup BUT have the extended private key stored (they will be rejected on other case). They need to enter their extended private key during the join process (in advanced options).":"Esta es el secreto para unirse. Desde la cartera ya está completa, esto sólo es útil para reunirse con sus compañeros que perdieron su respaldo pero tienen la extended private key almacenada (serán rechazadas en otro caso). Necesitan ingresar su extended private key durante el proceso de ingresar (en opciones avanzadas).","This wallet appears to be currently open.":"Este monedero parece estar actualmente abierto.","This will scan the blockchain looking for addresses derived from your wallet, in case you have funds in addresses not yet generated (e.g.: you restored an old backup). This will also trigger a synchronization of addresses to other connected peers.":"Esto verificará la blockchain buscando direcciones derivadas de tu monedero, en caso de tener fondo en direcciones que no fueron generadas aún (por ej.: si restauraste una copia de seguridad antigua). Esto también activará la sincronización de direcciones a los demás compañeros conectados.","To":"A","To:":"Para:","Total Locked Balance":"Balance total bloqueado","Transaction Error":"Error en Transacción","Transaction Update":"Actualización de una Transacción","Transaction broadcasted":"Transacción transmitida","Transaction finally rejected":"Transacción finalmente rechazada","Transaction rejected":"Transacción rechazada","Transaction sent!":"¡Transacción enviada!","Transactions Proposals Purged":"Propuestas de Transacciones Purgadas","Type:":"Tipo:","Unable to send transaction proposal":"No se puede enviar propuesta de transacción","Unconfirmed":"Sin confirmar","Unsent transactions":"Transacciones no enviadas","Untrusted":"No es de confianza","Updating balance":"Actualizando balance","Use test network":"Red de prueba","Username":"Nombre de usuario","Using derived addresses from your wallet":"Usando direcciones derivadas de tu monedero","Using network:":"Utilizando red:","View My Profile":"Ver Mi Perfil","View backup":"Ver Copia de Seguridad","Visible":"Visible","Waiting for copayers":"Esperando compañeros","Waiting...":"Esperando...","Wallet Secret":"Código Secreto del Monedero","Wallet Secret is not valid!":"¡El código secreto no es válido!","Wallet Unit":"Unidad del monedero","Wallet info":"Información del monedero","Wallet name":"Nombre del monedero","Wallet network configuration missmatch":"Configuración de la Red del monedero no coinciden","Wallets and profiles are stored encrypted using your password as a key. You can store the encrypted data locally, on this device, or remotely on the cloud (Insight Server).":"Monederos y perfiles son almacenados encriptados utilizando tu contraseña. Puedes guardar los datos encriptados en tu dispositivo o remotamente en la nube (Servidor Insight).","Warning!":"¡Advertencia!","Wrong password":"Contraseña incorrecta","Yes":"Si","You can import your current wallets after":"Puedes importar tus monederos después","You have":"Tienes","You have a pending transaction proposal":"Tienes una propuesta de transacción pendiente","You have no wallets":"No tienes monederos","You have old wallets in your localStorage. Choose one to import":"Tienes monederos locales antiguos. Selecciona para importar","You rejected the transaction successfully":"Rechazaste la transacción con éxito","Your current server usage quotas are: <b>{{perItem}}kB</b> per wallet and up to <b>{{nrWallets}}</b> wallets.":"Actual uso de cuotas: <b>{{perItem}}kB</b> por monedero y hasta <b>{{nrWallets}}</b> monederos permitidos.","Your email was confimed!":"¡Tu correo electrónico fue confirmado!","Your master private key contains the information to sign <b>any</b> transaction on this wallet. Handle with care.":"Tu \"master private key\" contiene la información para firmar <b>cualquier</b> transacción de este monedero. Tenga cuidado al usar.","Your private keys never leave this device":"Tus claves privadas nunca dejan este dispositivo","Your profile password":"Contraseña de tu perfil","Your session is about to expire due to inactivity in":"Tu sesión está va a expirar por inactividad en","Your session is about to expire due to inactivity in {{countdown}} seconds":"Tu sesión actual va a expirar por inactividad en {{countdown}} segundos","Your wallet password":"Contraseña de tu monedero","advanced options":"opciones avanzadas","at":"en","available.":"disponible.","change":"vuelto","creating your profile":"creando tu perfil","in TESTNET":"en TESTNET","in pending transactions":"en transacciones pendientes","of":"de","optional":"opcional","pending transaction proposals":"propuestas de transacciones pendientes","seconds":"segundos","too long!":"¡demasiado largo!","transaction proposal purged":"propuestas de transacciones purgadas","wallet":"monedero","Language":"Idioma","Create {{requiredCopayers}}-of-{{totalCopayers}} wallet":"Crea monedero {{requiredCopayers}}-de-{{totalCopayers}}","(*) The limits are imposed by the bitcoin network.":"(*) Los límites son impuestos por la red de bitcoin.","Addresses":"Direcciones","Balance locked in pending transaction proposals":"Balance bloqueado en las propuestas de transacción pendientes","Choose your password":"Escribe tu contraseña","Connecting to Insight Wallet Server...":"Conectando al Servidor Insight...","Connecting...":"Conectando...","Create a new wallet":"Crear un nuevo monedero","Creating and storing a backup will allow you to recover wallet funds":"Crear y guardar una copia de seguridad  le permitirá recuperar el dinero de su monedero","Fee":"Tasa","If all funds have been removed from your wallet and you do not wish to have the wallet data stored on your computer anymore, you can delete your wallet.":"Si todos los fondos fueron removidos de tu monedero y no deseas tener los datos guardados en tu computadora, puedes eliminar tu monedero.","Including fee of":"Incluye tasa de","Insufficient funds":"Fondos insuficientes","Join a Wallet in Creation":"Unirse a un monedero","Manual Update":"Actualización Manual","New Wallet Created":"Nuevo Monedero Creado","No transactions proposals yet.":"Sin propuestas de transacciones aún.","One person has":"Una persona","One signature missing":"Falta una firma","Open":"Abrir","Open in external application":"Abrir en una aplicación externa","Preparing payment...":"Preparando pago...","Proposal ID":"ID de Propuesta","Ready":"Listo","Send all funds":"Enviar todos los fondos","Send to":"Enviar a","Sent":"Enviado","Server Says:":"Mensaje del Servidor:","Show all":"Ver todo","Show less":"Ver menos","Skip transaction proposals from Backup":"Ignorar propuestas de transacciones desde la Copia de Seguridad","Total":"Total","Total amount for this transaction:":"Cantidad total de esta transacción:","Transaction Proposals":"Propuestas de Transacción","Use all funds":"Todos los fondos","User information":"Información de Usuario","Valid":"Válido","Waiting Copayers for {{$root.wallet.getName()}}":"Esperando compañeros a {{$root.wallet.getName()}}","Waiting for other copayers to make a Backup":"Esperando que los otros compañeros hagan su copia de seguridad","Your name":"Tu nombre","Your name (optional)":"Tu nombre (opcional)","Your password":"Tu contraseña","first seen at":"Visto el","mined":"minado el","not valid":"no válido","people have":"personas","required":"requerido","valid!":"¡válido!","yet to backup the wallet.":"deben hacer su copia de seguridad","yet to join.":"deben unirse","{{tx.missingSignatures}} signatures missing":"Faltan {{tx.missingSignatures}} firmas","Authenticating and looking for peers...":"Autenticando y buscando compañeros...","Private Key (Hex)":"Clave Privada (Hex)","Scan Ended":"Búsqueda Finalizada","There is an error in the form.":"Hubo un error en el formulario.","Add Address":"Agregar Dirección","Add Address Book Entry":"Nueva entrada","Bitcoin Network":"Red Bitcoin","Download seed backup":"Descargar copia de seguridad","Network has been fixed to <strong>{{networkName}}</strong> in this setup. See <a href=\"https://copay.io\">copay.io</a> for options to use Copay on both livenet and testnet.":"La red fue fijada a <strong>{{networkName}}</strong> para esta configuración. Ver <a href=\"https://copay.io\">copay.io</a> para más opciones de uso de Copay en livenet y testnet.","Port":"Puerto","Use SSL":"Usar SSL","Your Wallet Password":"Contraseña de tu Monedero","{{$root.wallet.requiredCopayers}}-of-{{$root.wallet.totalCopayers}} wallet":"Monedero {{requiredCopayers}}-de-{{totalCopayers}}","&laquo; Back":"&laquo; Volver","Fees":"Tasas","Wallet\n                name":"Nombre del\n                monedero"});
    gettextCatalog.setStrings('fr', {"* Using this device storage. Change to cloud storage on 'settings'.":"* Utilise le stockage de cet appareil. Changez-le en stockage cloud sur \"paramètres\".","-- choose wallet --":"-- choisissez un portefeuille --","A transaction was rejected by":"Une transaction a été rejetée par","A transaction was signed by":"Une transaction a été signée par","ALL Transactions Proposals will be discarded. This needs to be done on <b>ALL</b> peers of a wallet, to prevent the old proposals to be resynced again.":"TOUTES les propositions de transactions seront jetées. Cela doit être fait sur <b>TOUS</b> les pairs d'un portefeuille, afin d'empêcher que les anciennes propositions ne se resynchronisent de nouveau.","Access your wallets anywhere":"Accédez à votre portefeuille n'importe où","Accessing your profile":"Connexion à votre profil","Add":"Ajouter","Add Wallet":"Ajouter un portefeuille","Add a new entry":"Ajouter une nouvelle entrée","Add a private comment to identify the transaction":"Ajouter un commentaire privé pour identifier cette transaction","Add entry":"Ajouter une entrée","Add wallet":"Ajouter un portefeuille","Address":"Adresse","Address Book":"Carnet d'adresses","Alternative Currency":"Devise alternative","Amount":"Montant","Amount in":"Montant en","An email was sent to":"Un e-mail a été envoyé à","Aprox. size:":"Taille approximative :","Are you sure you want to cancel and delete this wallet":"Êtes-vous sûr de vouloir annuler et supprimer ce portefeuille","Are you sure you want to delete this profile?":"Êtes-vous sûr de vouloir supprimer ce profil ?","Are you sure you want to delete this wallet?":"Êtes-vous sûr de vouloir supprimer ce portefeuille ?","Attempting to reconnect...":"Tentative de reconnexion...","Available Balance":"Solde disponible","BIP32 master extended private key (hex)":"Clé privée étendue maîtresse BIP32 (hex)","Back":"Retour","Backup created":"Sauvegarde créé","Backup options":"Options de sauvegarde","Backups managed by the server":"Sauvegardes gérées par le serveur","Balance:":"Solde :","Bitcoin address":"Adresse Bitcoin","Broadcast Transaction":"Diffuser transaction","Browser unsupported":"Navigateur non supporté","Cancel":"Annuler","Certified by:":"Certifié par :","Choose a password":"Choisissez un mot de passe","Choose backup file from your computer":"Choisissez un fichier de sauvegarde depuis votre ordinateur","Close":"Fermer","Confirm your email address":"Confirmez votre adresse e-mail","Confirm your email address to increase storage usage limits.":"Confirmez votre adresse e-mail pour augmenter les limites d'usage de stockage","Confirmations:":"Confirmations :","Continue anyways":"Continuer quand même","Copay now needs a profile to access wallets.":"Copay a maintenant besoin d'un profil pour accéder aux portefeuilles.","Copayers":"Copayers","Copied to clipboard":"Copié dans le presse-papier","Copy backup in a safe place":"Copier la sauvegarde dans un endroit sûr","Copy this text as it is in a safe place (notepad or email)":"Copier le texte dans un endroit sûr (bloc-notes ou e-mail)","Copy to clipboard":"Copier dans le presse-papier","Could not connect to the Insight server. Check your settings and network configuration":"Impossible de se connecter au serveur Insight. Vérifiez vos paramètres et votre configuration réseau","Create":"Créer","Create Profile":"Créer un profil","Create in the cloud":"Créer dans le cloud","Create new wallet":"Créer un nouveau portefeuille","Create on this device":"Créer sur cet appareil","Create profile":"Créer un profil","Create, join or import":"Créer, joindre ou importer","Creating in the cloud":"Création dans le cloud","Creating on this device":"Création sur cet appareil","Creator":"Créateur","Date":"Date","Date:":"Date :","Delete":"Supprimer","Delete Profile":"Supprimer le profil","Delete wallet":"Supprimer le portefeuille","Disclaimer":"Avis de non responsabilité","Download CSV file":"Télécharger fichier CSV","Download backup":"Télécharger sauvegarde","Email":"E-mail","Email address confirmation needed":"L'adresse e-mail a besoin d'être confirmée","Email not confirmed":"E-mail non confirmé","Empty. Create an alias for your addresses":"Vide. Créer un alias pour vos adresses","Encrypted backup file saved":"Fichier de sauvegarde chiffré sauvegardé","Enter PIN":"Entrer PIN","Entry":"Entrée","Error updating indexes:":"Erreur de mise à jour des index","Expires:":"Expire :","Family vacation funds":"Fonds de vacance familiale","Fatal error connecting to Insight server":"Erreur de connexion au serveur Insight","Fetching Payment Information...":"Importation des informations de paiement...","Finished":"Terminé","Form Error":"Erreur de forme","Funds received!":"Fonds reçus !","Generate new address":"Générer une nouvelle adresse","Generating file...":"Génération du fichier...","Get QR code":"Obtenir le code QR","Getting transactions...":"Acquisition des transactions...","Hide":"Masquer","Hide them":"Les masquer","History":"Historique","Home":"Accueil","I read and agree with these terms":"J'ai lu et je suis d'accord avec ces termes","Import":"Importer","Import Profile":"Importer un profil","Import a backup":"Importer une sauvegarde","Import backup":"Importer sauvegarde","Import wallet":"Importer un portefeuille","Importing wallet - Reading backup...":"Importation du portefeuille - Lecture de la sauvegarde...","Importing wallet - Setting things up...":"Importation du portefeuille - Réglages de certaines choses...","Importing wallet - We are almost there...":"Importation du portefeuille - Nous y sommes presque...","In the Cloud":"Dans le Cloud","Insight API server":"Serveur API Insight","Insight API server is open-source software. You can run your own instances, check":"Le serveur API Insight est un logiciel open source. Vous pouvez faire tourner vos propres sessions, vérifiez","It's important that you update your wallet at https://copay.io":"Il est important que vous mettiez à jour votre portefeuille sur https://copay.io","It's important to backup your profile so that you can recover it in case of disaster. The backup will include all your profile's wallets":"Il est important de sauvegarder votre profil, sauvegarde qui permettra de récupérer vos fonds en cas de sinistre. Cette sauvegarde inclura les portefeuilles de votre profil.","Join":"Joindre","Join Secret":"Joindre un secret","Join shared wallet":"Joindre un portefeuille partagé","Label":"Étiquette ","Learn more about this option":"En savoir plus sur cette option","Leave a private message to your copayers":"Laisser un message privé à vos copayers","Leave feedback":"Laisser un commentaire","Loading...":"Chargement...","Lock":"Verrouiller","Log level":"Niveau de log","Log level shows information on the console. This is useful to find bugs and to help users. 'debug' is the most verbose level while 'fatal' only shows unexpected errors":"Le niveau de log montre les informations dans la console. C'est utile pour trouver des bugs et pour aider les utilisateurs. 'debug' est le niveau le plus détaillé alors que 'fatal' ne montre que les erreurs inattendus","Login Required":"Connexion requise","Master Private Key":"Clé privée maîtresse","Master extended private key":"Clé privée étendue maîtresse","Me":"Moi","Merchant Message:":"Message marchand :","More pluggins are welcomed!":"Plus de plugins sont les bienvenus !","Multisignature wallet":"Portefeuille multi-signatures","My Bitcoin address:":"Mon adresse Bitcoin :","My Profile":"Mon profil","Name:":"Nom :","Need to be careful with backups":"Vous devez être prudent avec les sauvegardes","Needs Backup":"Besoin d'une sauvegarde","Network Error":"Erreur réseau","Networking Error":"Erreur réseau","New Transaction":"Nouvelle transaction","New entry has been created":"Une nouvelle entrée a été créée","Next":"Suivant","No":"Non","No email required":"Aucun e-mail requis","No pending spend proposals at the moment.":"Aucune propositions de dépense en attente à ce moment.","No transactions yet.":"Aucune transaction pour le moment.","Not valid":"Non valide","Note":"Note","Note:":"Note :","OKAY":"Ok","On this Device":"Sur cet appareil","Opening the wallet in multiple browser tabs could lead to unexpected results":"Ouvrir le portefeuille dans une multitude d'onglets dans le navigateur peut mener à des résultats inattendus","Page not found":"Page non trouvée","Password":"Mot de passe","Passwords must match":"Le mot de passe doit correspondre","Paste backup plain text code":"Coller le code texte de sauvegarde","Paste wallet secret here":"Coller le secret du portefeuille ici","Payment to":"Paiement à","Pending Transactions Proposals will be discarded. This needs to be done on <b>ALL</b> peers of a wallet, to prevent the old proposals to be resynced again.":"Les propositions de transactions en attente seront jetées. Cela doit être fait sur <b>TOUS</b> les pairs d'un portefeuille, afin d'empêcher que les anciennes propositions ne se resynchronisent de nouveau.","Permanently delete this profile and all its wallets. WARNING: this action cannot be reversed.":"Supprimer définitivement ce profil et tous ses portefeuilles. ATTENTION : cette action ne peut pas être annulée.","Permanently delete this wallet. WARNING: this action cannot be reversed.":"Supprimer définitivement ce portefeuille. ATTENTION : cette action ne peut pas être annulée.","Personal Wallet":"Portefeuille personnel","Please complete required fields":"Veuillez compléter les champs requis","Please confirm your email address using the confirmation link at the message we sent you":"Veuillez confirmer votre adresse e-mail avec le lien de confirmation qui vous a été envoyé","Please enter the required fields":"Veuillez entrer les champs requis","Please follow the link on it to confirm it. Unconfirmed profiles could be deleted from server.":"Veuillez suivre le lien pour confirmer. Les profils non confirmés pourraient être supprimés du serveur.","Please note the wallet creator <b>must be online</b> until all copayers have joined.":"Veuillez noter que le créateur du portefeuille <b>doit être connecté</b> jusqu'à ce que tous les copayers ont rejoint.","Please open wallet to complete payment":"Veuillez ouvrir le portefeuille pour compléter le paiement ","Please sign in to access your wallets":"Veuillez vous connecter pour accéder à vos portefeuilles","Please sign in to make the payment":"Veuillez vous connecter pour faire le paiement","Please update your wallet at https://copay.io":"Veuillez mettre à jour votre portefeuille sur https://copay.io","Please, select your backup file":"Veuillez sélectionner le fichier de sauvegarde ","Profile":"Profil","Purge":"Purger","Purge ALL Transaction Proposals":"Purger TOUTES les demandes de transaction","Purge All":"Purger tout","Purge Pending Transaction Proposals":"Purger les propositions de transaction en attente.","Read and Store Profiles:":"Lire et stocker les profils :","Receive":"Recevoir","Received corrupt message from":"Message endommagé reçu de","Received corrupt transaction from":"Transaction endommagée reçue de","Recommended":"Recommandé","Reject":"Rejeter","Repeat PIN":"Répéter le code PIN","Repeat password":"Répétez le mot de passe","Require pin to unlock":"Exiger un code PIN pour déverrouiller","Required":"Requis","Reset settings":"Réinitialiser les paramètres","Save":"Sauvegarder","Scan":"Numériser","Scan Wallet Addresses":"Numériser des adresses de portefeuille","Scaning for transactions":"Recherche de transactions","See it on the blockchain":"La voir sur la chaine de blocs","Select a backup file":"Sélectionner un fichier de sauvegarde","Select a wallet to make the payment":"Sélectionner un portefeuille pour faire le paiement","Select required signatures":"Sélectionner les signatures requises","Select total number of copayers":"Sélectionner un nombre total de copayers","Send":"Envoyer","Send by email":"Envoyer par e-mail","Session closed":"Session fermée","Session closed because a long time of inactivity":"La session a été fermée à cause d'un trop long temps d'inactivité","Session will be closed":"La session va être fermée","Set up a PIN":"Définir un code PIN","Settings":"Paramètres","Share address":"Partager l'adresse","Share secret":"Partager le secret","Share this secret with your copayers":"Partager ce secret avec vos copayers","Share this with anyone to have them send you payments. To protect your privacy, new addresses are generated automatically once you use them.":"Partagez ceci avec quiconque pour recevoir des paiements. Pour protéger votre anonymat, des nouvelles adresses sont générées automatiquement une fois que vous les utilisez.","Show":"Montrer","Show all my addresses":"Montrer toutes mes adresses","Sign":"Signer","Sign in":"Se connecter","Signatures:":"Signatures :","Signing out":"Déconnexion","Skip":"Passer","Skip public keys":"Passer les clés publiques","Skip transaction proposals":"Passer la proposition de transaction","Skipping fields: {{skipFields}}":"Ignore les champs : {{skipFields}}","Spend proposals":"Propositions de dépense","Status:":"Statut :","Storage":"Stockage","Success":"Succès","Testnet":"Testnet","The balance is updated using the derived addresses":"Le solde est mis à jour en utilisant les adresses dérivées","The secret string you entered is invalid":"La chaîne secrète que vous avez entré est invalide ","The software you are about to use is free, open source, and unsupported beta software. It is important to understand\n      that beta software refers to software that is undergoing testing and has not officially been released, could have\n      bugs, and may not act in a reliable fashion. Because the software is currently in beta, it is possible but not certain\n      that you may lose bitcoin or the value of your bitcoin. It is recommended that you store only nominal amounts of\n      bitcoins. You acknowledge that your use of this software is at your own discretion and in compliance with all\n      applicable laws. You are responsible for safekeeping your login IDs, passwords, private key pairs, PINs and any other\n      codes you use to access the software. IF YOU HAVE NOT SEPARATELY STORED A BACKUP OF ANY WALLET ADDRESSES AND PRIVATE\n      KEY PAIRS MAINTAINED IN YOUR ACCOUNT, YOU ACKNOWLEDGE AND AGREE THAT ANY BITCOINS YOU HAVE ASSOCIATED WITH SUCH WALLET\n      ADDRESSES WILL BECOME INACCESSIBLE IF YOU DO NOT HAVE YOUR ACCOUNT PASSWORD AND/OR PIN.  All transaction requests are\n      irreversible.  The authors of the software, employees and affiliates of Bitpay, copyright holders, and BitPay, Inc.\n      cannot retrieve your private keys or passwords if you lose or forget them and cannot guarantee transaction\n      confirmation as they do not have control over the Bitcoin network. You agree to provide accurate and complete\n      information in connection with your use of the account. You assume any and all risk associated with the use of the\n      software. To the fullest extent permitted by law, this software is provided “as is” and no representations or\n      warranties can be made of any kind, express or implied, including but not limited to the warranties of\n      merchantability, fitness or a particular purpose and noninfringement. In no event shall the authors of the software,\n      employees and affiliates of Bitpay, copyright holders, or BitPay, Inc. be held liable for any claim, damages or other\n      liability, whether in an action of contract, tort, or otherwise, arising from, out of or in connection with the\n      software or the use or other dealings in the software. We reserve the right to modify this disclaimer from time to\n      time.":"Le logiciel que vous êtes sur le point d'utiliser est gratuit, open source et en phase de bêta. Il est important de comprendre\n      que ce logiciel bêta se réfère à un logiciel qui n'a pas été amplement testé et qui n'a pas été sortie officiellement, qu'il pourrait\n      avoir des bugs et ne pas réagir de manière fiable. Parce que ce logiciel est actuellement en bêta, il est possible mais non certain\n      que vous perdiez des bitoins ou la valeur de vos bitcoins. Il est recommandé que vous ne stockiez que de faible montant de bitcoins.\n      Vous reconnaissez que vous utilisez ce logiciel à vos propres risques et périls, en conformité des lois applicables.\n      Vous êtes responsable de la sécurité de vos identifiants de connexion, mots de passe, paires de clés privées, codes PIN, et tout\n      autre code que vous utilisez pour accéder à ce logiciel. Si vous n'avez pas stocké séparément une sauvegarde des paires de clés privées\n      et des adresses d'un quelconque portefeuille dans votre compte, vous reconnaissez et êtes d'accord que n'importe quel bitcoin que vous\n       avez associé avec ces adresses de portefeuille deviendra inaccessible si vous n'avez pas votre mot de passe ou code PIN de compte.\n      Toutes les demandes de transactions sont irréversibles. Les auteurs du logiciel, employés et affiliés à Bitpay, les détenteurs de\n      copyright et Bitpay Inc. ne peuvent pas retrouver vos clés privées ou des mots de passe si vous les oubliez ou les perdez et ne\n      peuvent garantir les confirmations de transaction étant donné qu'ils n'ont pas de contrôle sur le réseau Bitcoin. Vous êtes d'accord\n      pour fournir des informations précises et complètes en connexion avec votre utilisation du compte. Vous assumez tous les risques\n      associés avec l'utilisation de ce logiciel. Dans toute la mesure permise par la loi, ce logiciel est fourni \"tel quel\" et aucunes\n      représentations ou garanties ne peuvent être fait de toute nature, expresse ou implicite, y compris mais non limité aux garanties\n      de qualité marchande, de remise en forme ou un usage particulier et de non-contrefaçon. En aucun cas les auteurs du logiciel,\n      employés et affiliés à Bitpay, détenteurs de copyright ou Bitpay Inc. ne peuvent être tenus responsables de toute réclamation\n      dommages ou autre responsabilité, que ce soit dans une action contractuelle, délictuelle au autre, découlant, ou non, d'une\n      connexion avec le logiciel ou l'utilisation et autres opérations dans le logiciel.\n      Nous nous réservons le droit de modifier cette clause de temps à autre.","The transaction proposal has been created":"La proposition de transaction a été créée","The wallet is full":"Le portefeuille est plein","There was an error sending the transaction":"Il y a eu une erreur pendant l'envoi de la transaction","There was an error signing the transaction":"Une erreur s'est produite durant la signature de la transaction","This is the initial secret join string. Since your wallet it is already complete, this is only useful to rejoin peers that lost their backup BUT have the extended private key stored (they will be rejected on other case). They need to enter their extended private key during the join process (in advanced options).":"Ceci est la chaîne de connexion secrète initiale. Puisque votre portefeuille est déjà complet, ceci est uniquement utile pour rejoindre des pairs qui ont perdu leur sauvegarde MAIS qui ont stocké leur clé privée étendue (ils seront rejetés dans le cas contraire). Ils ont besoin d'entrer leur clé privée étendue durant le processus de connexion (dans les options avancées).","This wallet appears to be currently open.":"Ce portefeuille est apparemment déjà ouvert.","This will scan the blockchain looking for addresses derived from your wallet, in case you have funds in addresses not yet generated (e.g.: you restored an old backup). This will also trigger a synchronization of addresses to other connected peers.":"Ceci va analyser la chaîne de blocs pour trouver des adresses dérivées de votre portefeuille, au cas où vous avez des fonds dans des adresses qui ne sont pas encore générées (e.g.: vous avez restauré une ancienne sauvegarde). Ceci va également déclencher une synchronisation des adresses à d'autres pairs connectés.","To":"À","To:":"À :","Total Locked Balance":"Solde verrouillé total","Transaction Error":"Erreur de transaction","Transaction Update":"Transaction mise à jour","Transaction broadcasted":"Transaction diffusée","Transaction finally rejected":"Transaction finalement rejetée","Transaction rejected":"Transaction rejetée","Transaction sent!":"Transaction envoyée !","Transactions Proposals Purged":"Propositions de transactions purgées","Type:":"Type :","Unable to send transaction proposal":"Impossible d'envoyer la proposition de transaction","Unconfirmed":"Non confirmée","Unsent transactions":"Transactions non envoyées","Untrusted":"Non-approuvé","Updating balance":"Mise à jour du solde","Use test network":"Utiliser le réseau de test","Username":"Nom d'utilisateur","Using derived addresses from your wallet":"Utilisation des adresses dérivées de votre portefeuille","Using network:":"Utilise le réseau :","View My Profile":"Voir mon profil","View backup":"Voir la sauvegarde","Visible":"Visible","Waiting for copayers":"Attente des copayers","Waiting...":"Attente...","Wallet Secret":"Secret de portefeuille","Wallet Secret is not valid!":"Le secret de portefeuille n'est pas valide !","Wallet Unit":"Unité du portefeuille","Wallet info":"Informations du portefeuille","Wallet name":"Nom du portefeuille","Wallet network configuration missmatch":"La configuration réseau du portefeuille ne correspond pas","Wallets and profiles are stored encrypted using your password as a key. You can store the encrypted data locally, on this device, or remotely on the cloud (Insight Server).":"Les portefeuilles et les profils sont stockés et chiffrés en utilisant votre mot de passe comme une clé. Vous pouvez stocker les données chiffrées localement, sur cet appareil, ou à distance sur le cloud (Insight Server).","Warning!":"Attention !","Wrong password":"Mauvais mot de passe","Yes":"Oui","You can import your current wallets after":"Vous pouvez importer vos portefeuilles actuels après","You have":"Vous avez","You have a pending transaction proposal":"Vous avez une proposition de transaction en attente.","You have no wallets":"Vous n'avez pas de portefeuilles","You have old wallets in your localStorage. Choose one to import":"Vous avez des anciens portefeuilles dans votre localStorage. Choisissez-en un à importer.","You rejected the transaction successfully":"Vous avez rejeté la transaction avec succès","Your current server usage quotas are: <b>{{perItem}}kB</b> per wallet and up to <b>{{nrWallets}}</b> wallets.":"Vos quotas d'utilisation du serveur sont de : <b>{{perItem}}kB</b> par portefeuille et  jusqu'à <b>{{nrWallets}}</b> portefeuilles.","Your email was confimed!":"Votre e-mail a été confirmé !","Your master private key contains the information to sign <b>any</b> transaction on this wallet. Handle with care.":"Votre clé privée maîtresse contient les information pour signer <b>n'importe</b> quelle transaction sur ce portefeuille. Faites attention.","Your private keys never leave this device":"Vos clés privées ne quittent jamais ce dispositif","Your profile password":"Votre mot de passe de profil","Your session is about to expire due to inactivity in":"Votre session est sur le point d'expirer à cause d'inactivité dans","Your session is about to expire due to inactivity in {{countdown}} seconds":"Votre session est sur le point d'expirer à cause d'inactivité dans {{countdown}} secondes","Your wallet password":"Votre mot de passe de portefeuille","advanced options":"options avancées","at":"à","available.":"disponible.","change":"change","creating your profile":"création de votre profil","in TESTNET":"dans TESTNET","in pending transactions":"dans les transactions en attente","of":"de","optional":"optionnel","pending transaction proposals":"propositions de transaction en attente","seconds":"secondes","too long!":"trop long !","transaction proposal purged":"proposition de transaction purgé","wallet":"portefeuille","Language":"Langue","Create {{requiredCopayers}}-of-{{totalCopayers}} wallet":"Créer portefeuille {{requiredCopayers}}-de-{{totalCopayers}}","<strong class=\"size-16\">Network Error</strong>.<br> Attempting to reconnect..":"<strong class=\"size-16\">Erreur réseau</strong>.<br> Tentative de reconnexion...","(*) The limits are imposed by the bitcoin network.":"(*) Les limites sont imposées par le réseau bitcoin.","Addresses":"Adresses","Balance locked in pending transaction proposals":"Le solde est verrouillé dans l'attente des propositions de transaction ","Choose your password":"Choisissez votre mot de passe","Connecting to Insight Wallet Server...":"Connexion au serveur de portefeuille Insight...","Connecting...":"Connexion...","Create a new wallet":"Créer un nouveau portefeuille","Creating and storing a backup will allow you to recover wallet funds":"Créer et stocker une sauvegarde vous permettra de récupérer les fonds de votre portefeuille","Fee":"Frais","If all funds have been removed from your wallet and you do not wish to have the wallet data stored on your computer anymore, you can delete your wallet.":"Si tous les fonds ont été supprimés de votre portefeuille et que vous ne souhaitez plus avoir les données du portefeuille stockés sur votre ordinateur, vous pouvez supprimer ce portefeuille.","Including fee of":"Frais inclus de","Insufficient funds":"Fonds insuffisants ","Join a Wallet in Creation":"Joindre un portefeuille en création","Manual Update":"Mise à jour manuelle","New Wallet Created":"Nouveau portefeuille créé","No transactions proposals yet.":"Aucune proposition de transaction pour le moment.","One person has":"Une personne a","One signature missing":"Une signature est manquante","Open":"Ouvrir","Open in external application":"Ouvrir dans une application externe","Preparing payment...":"Préparation du paiement...","Proposal ID":"ID de proposition","Ready":"Prêt","Send all funds":"Envoyer tous les fonds","Send to":"Envoyer à","Sent":"Envoyé","Server Says:":"Le serveur dit :","Show all":"Montrer tout","Show less":"Montrer moins","Skip transaction proposals from Backup":"Ignorer la proposition de transaction depuis Sauvegarde","Total":"Total","Total amount for this transaction:":"Montant total pour cette transaction :","Transaction Proposals":"Propositions de transaction","Use all funds":"Utiliser tous les fonds","User information":"Informations utilisateur","Valid":"Valide","Waiting Copayers for {{$root.wallet.getName()}}":"Attente des Copayers pour  {{$root.wallet.getName()}}","Waiting for other copayers to make a Backup":"Attente des autres copayers pour faire une sauvegarde","Your name":"Votre nom","Your name (optional)":"Votre nom (optionnel)","Your password":"Votre mot de passe","first seen at":"vu le","mined":"miné","not valid":"non valide","people have":"les personnes ont","required":"requis","valid!":"valide !","yet to backup the wallet.":"deben hacer su copia de seguridad","yet to join.":"deben unirse","{{tx.missingSignatures}} signatures missing":"{{tx.missingSignatures}} signatures manquantes","<em><strong>No transactions yet.</strong></em>":"<em><strong>Aucune transaction pour le moment.</strong></em>","Authenticating and looking for peers...":"Authentification et recherche de pairs...","Private Key (Hex)":"Clé privée (Hex)","Scan Ended":"Numérisation terminée","There is an error in the form.":"Il y a une erreur dans la forme","Wrong password que parece":"Mot de passe incorrect","Add Address":"Ajouter une adresse","Add Address Book Entry":"Ajouter une entrée au carnet d'adresse","Your Password":"Votre mot de passe","Bitcoin Network":"Réseau Bitcoin","Download seed backup":"Télécharger la sauvegarde du seed","Network has been fixed to <strong>{{networkName}}</strong> in this setup. See <a href=\"https://copay.io\">copay.io</a> for options to use Copay on both livenet and testnet.":"La réseau a été fixé sur <strong>{{networkName}}</strong>dans la configuration. Regardez <a href=\"https://copay.io\">copay.io</a> pour les options d'utilisation de Copay sur livenet et testnet.","Port":"Port","Use SSL":"Utiliser SSL","Your Wallet Password":"Votre mot de passe de portefeuille","{{$root.wallet.requiredCopayers}}-of-{{$root.wallet.totalCopayers}} wallet":"portefeuille {{$root.wallet.requiredCopayers}}-de-{{$root.wallet.totalCopayers}}","&laquo; Back":"&laquo; Retour","Fees":"Frais","Wallet\n                name":"Portefeuille\n                nom"});
/* jshint +W100 */
}]);
window.version="0.10.2";
window.commitHash="6fe88cd";
'use strict';

angular.element(document).ready(function() {

  // this is now in HTML tab, witch is compatible with Windows Phone
  // var startAngular = function() {
  //   angular.bootstrap(document, ['copayApp']);
  // };
  /* Cordova specific Init */
  if (window.cordova !== undefined) {

    // Fastclick event
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }

    document.addEventListener('deviceready', function() {

      document.addEventListener('pause', function() {
        if (!window.ignoreMobilePause) {
          window.location = '#/';
        }
      }, false);
      
      document.addEventListener('resume', function() {
        setTimeout(function() {
          window.ignoreMobilePause = false;
        }, 100);
      }, false);

      document.addEventListener('backbutton', function() {
        window.location = '#/walletHome';
      }, false);

      document.addEventListener('menubutton', function() {
        window.location = '#/preferences';
      }, false);

      document.addEventListener('offline', function() {
        window.location = '#/network/offline';
      }, false);

      document.addEventListener("online", function() {
        window.location = '#/network/online';
      }, false);

      setTimeout(function() {
        navigator.splashscreen.hide();
      }, 2000);

      function handleBitcoinURI(url) {
        if (!url) return;
        window.location = '#/uri-payment/' + url;
      }

      window.plugins.webintent.getUri(handleBitcoinURI);
      window.plugins.webintent.onNewIntent(handleBitcoinURI);
      window.handleOpenURL = handleBitcoinURI;

      // startAngular();
    }, false);
  } else {
    // startAngular();
  }

});
