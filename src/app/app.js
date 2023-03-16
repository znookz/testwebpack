import angular from 'angular';
import uirouter from '@uirouter/angularjs/release/angular-ui-router';

var app = angular.module('myApp', [uirouter]);

//Angular Modules
require('./routers/config.js')(app);
require('./controllers/state/login.js')(app);


app.controller('AppCtrl', ['$rootScope', '$scope', '$http', '$document',
    function ($rootScope, $scope, $http, $document) {
        $rootScope.onProgress = false;
    }
]);