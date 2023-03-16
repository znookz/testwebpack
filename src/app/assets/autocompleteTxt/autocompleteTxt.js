module.exports = function (app) {
    app.directive('autocompleteTxt', function () {
        return {
            restrict: 'E',
            scope: {
                acModel: '=ngModel',
                sourceurl: '='
            },
            controller: function ($scope, $http) {
                $scope.sourceurl = $scope.sourceurl || {};
                // fetch data to autocomplete txt
                $scope.loadMatchList = function (val) {
                    var requestUrl = $scope.sourceurl;
                    // debugger
                    return $http.get(requestUrl, {
                        params: {
                            keyword: val,
                            sensor: false
                        }
                    }).then(function (response) {
                        var responseData = JSON.parse(response);
                        return responseData.data.results.map(function (item) {
                            return item.formatted_address;
                        });
                    });
                }

                $scope.$watch('txtSelect', function (newVal, oldVal) {
                    $scope.acModel = newVal;

                });
            },
            link: function (scope, attrt, element) {

            },
            template: require('./autocompleteTxt.html'),
        }
    });
}