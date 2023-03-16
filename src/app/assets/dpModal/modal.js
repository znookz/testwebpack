/**
 * @license Mr.Dhitipong Hongsawat
 * License: MIT
 */

/**
 * @ngdoc directive
 * @name dpModal
 * @description
 *
 * The `dpModal` directeve provides support for common
 * of assistive technologies, such as screen readers.
 *
 * <dp-modal on-show="model.show" on-hide="invoke.hide"></dp-modal>
 *
 * ## Usage
 *
 */

module.exports = function (app) {
    app.directive('dpModal', function () {
        return {
            restrict: 'A',
            // replace: 'true',
            scope: {
                onShow: '=',
                onHide: '='
            },
            controller: function ($scope, $element) {
                $scope.$watchCollection("onShow", function (n, o) {
                    var myModal = angular.element($element);

                    if (n == true) {

                        //myModal.modal({ show: true, backdrop :true});
                        var options = {
                            "show": "true"
                        }
                        myModal.modal(options);
                        myModal.off('hidden.bs.modal');
                        myModal.on('hidden.bs.modal', function (e) {

                            try {
                                if ($scope.onShow == true) {
                                    if (!$scope.$$phase) {
                                        //$digest or $apply
                                        $scope.$apply(function () {
                                            $scope.onShow = false;
                                        });
                                    }
                                }
                            } catch (e) {
                                console.log('dp-model error : ' + e);
                            } finally {
                                // $digest();
                                if ($scope.onHide) $scope.onHide();
                            }

                        });

                    } else {
                        myModal.modal('hide');
                    }

                }, true);
            },
            link: function (scope, iElement, attr) {
                //  scope.$watch(attr.amModal, function (n, o) {

                // scope.$watch('onShow', function (n, o) {

                // });
            }
        };
    });
}