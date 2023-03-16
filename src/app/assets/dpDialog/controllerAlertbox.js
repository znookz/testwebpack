module.exports = function (app) {
    app.controller('controllerAlertbox', function ($scope, $uibModalInstance, ngAuthSettings, items) {
        $scope.ClientDirective = ngAuthSettings.ClientDirective;
        $scope.Items = {};
        $scope.Config = {};

        if (items.title == undefined) {
            $scope.Config.Title = false;
        } else {
            $scope.Config.Title = true;
        }
        $scope.Config.Confirm = false;
        $scope.Config.MessageBox = true;

        $scope.Items.title = items.title;
        $scope.Items.content = items.content;
        $scope.Items.contentNewLine = items.contentNewLine;
        $scope.Items.contentNewLine2 = items.contentNewLine2;
        $scope.Items.Yes = items.okBtn;

        $scope.trushedHtml = function (param) {
            return $sce.trustAsHtml(param);
        }

        $scope.ok = function () {
            $uibModalInstance.close();
            // if (items.callback)
            // callback();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            // if (items.onCancel)
            // onCancel();
        };
    });
}