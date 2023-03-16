import angular from 'angular';
import uirouter from '@uirouter/angularjs/release/angular-ui-router';
import angularMoment from 'angular-moment';
//import routing from './app.routing';
import translate from 'angular-translate';
//import ngAnimate from 'angular-moment/angular-moment';
import ngMap from 'ngmap';
import 'angular-animate';
import 'angular-ui-bootstrap';
import 'angular-ui-calendar';
import 'angular-chips/dist/angular-chips';
import 'angular-ui-sortable';
import 'angular-aria';
import 'angular-jwt';
import 'json-tree2';
import 'angular-filter';
import 'angular-translate-loader-static-files';
import 'isteven-angular-multiselect/isteven-multi-select';
import './awesome.js';
import './bootstrap.min.js';
import './bower_components/moment/locale/th.js';
import './bower_components/angular-ui-calendar/src/calendar.js';
import './bower_components/fullcalendar/dist/fullcalendar.js';
import './bower_components/fullcalendar/dist/gcal.js';
import './bower_components/angular-qrcode/angular-qrcode.js';
import './bower_components/qrcode-generator/js/qrcode.js';
//import './bower_components/qrcode-generator/js/qrcode_UTF8.js';
import './bower_components/json-excel/json-export-excel.min.js';
import './bower_components/fileSaver/FileSaver.min.js';
import './bower_components/angular-drag/angular-dragdrop.min.js';
import './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js';
import './bower_components/src/isteven-multi-select.js';
import './bower_components/moment/locale/th.js';
import './assets/kasco-wing/vendor/bootstrap-multiselect/bootstrap-multiselect.js';
import './assets/kasco-wing/vendor/flot/jquery.flot.min.js';
import './assets/kasco-wing/vendor/flot/jquery.flot.pie.min.js';
import './assets/kasco-wing/vendor/flot/jquery.flot.tooltip.min.js';
import './bower_components/ng-context-menu/dist/ng-context-menu.min.js';
import '@microsoft/signalr';

import ngFileUpload from 'ng-file-upload';
import 'angular-file-upload-shim/dist/angular-file-upload-shim';

var app = angular.module('myApp', ['ui.sortable', uirouter, translate, 'ngAria', 'chart.js', 'LocalStorageModule', 'ngAnimate', 'ngLocale', 'ui.calendar', 'ui.bootstrap', angularMoment, 'pascalprecht.translate', ngFileUpload, require('textAngular'), 'angular.chips', 'monospaced.qrcode', ngMap, 'ngJsonExplorer', 'ngJsonExportExcel', 'ngDragDrop', 'ng-context-menu', 'daterangepicker', 'ui.utils']);

//Angular Modules
require('./routers/config.js')(app);
require('./controllers/state/login.js')(app);
//Load services
require('./services/dataConstant.js')(app);




var version = '11.1.3';

app.run(['ngAuthSettings', '$window',
    function (ngAuthSettings, $window) {
        ngAuthSettings.WebClient = $window.location.origin;
        ngAuthSettings.ClientDirective = ngAuthSettings.WebClient + '/tms/app/';
        // directory
        ngAuthSettings.directory.directive = ngAuthSettings.ClientDirective + 'widgets/';
        ngAuthSettings.directory.modules = ngAuthSettings.ClientDirective + 'modules/';
        ngAuthSettings.directory.assets = ngAuthSettings.ClientDirective + 'assets/';
        ngAuthSettings.directory.widgets = ngAuthSettings.ClientDirective + 'widgets/';
        ngAuthSettings.directory.theme = ngAuthSettings.ClientDirective + 'contents/ace-master/';

    }
]);

app.config(function ($httpProvider, $translateProvider) {

    // $httpProvider.interceptors.push('authInterceptorService');

    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/local-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
});

// app.run(['authService', 'langService', function (authService) {

//     authService.fillAuthData();
// }]);


app.controller('AppCtrl', ['$rootScope', '$scope', '$http', '$document', 'ngAuthSettings',
    function ($rootScope, $scope, $http, $document, $ngAuthSettings) {
        $rootScope.onProgress = false;
    }
]);