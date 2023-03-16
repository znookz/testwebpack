/**
 * @license Mr.Dhitipong Hongsawat
 * License: MIT
 */

/**
 * @ngdoc service
 * @name dpMessageBox
 * @description
 *
 * The `dpMessageBox` directeve provides support for common
 * of assistive technologies, such as screen readers.
 *
 *
 * ## Usage
 *
 * Below is a more detailed breakdown of the attributes handled by ngAria:
 * | Parameter              | Description                                                                   |
 * |------------------------|----------------------------------------------------------------------------------------|
 * | ok                     | text,button ok.          |
 * | cancel                 | text,button cancel.      |
 * | title                  | text,titlebar.           |
 * | message                | text,message.            |
 *
 * ##Example
 * Using dpMessageBox with Confirm Event:
 * ConfirmBox    
      dpMessageBox.Confirm({ok:'Yes',cancel:'No',title:'Information',message:'Confirm ?'})
            .then(function ok(){
            
            },function cancel(){
            
            });

* Alert    
      dpMessageBox.Alert({ok:'Yes',title:'Information',message:'Warining !!!'})
            .then(function yes(){
            
            },function close(){
            
            });
 */

module.exports = function (app) {
    app.factory('dpMessageBox', ['$http', '$q', 'dpDialog',
        function ($http, $q, dialog) {
            return {
                confirm: function (param) {
                    var deferred = $q.defer();

                    dialog.confirm({
                        'Ok': param.ok,
                        'Cancel': param.cancel,
                        'Titile': param.title,
                        'Content': param.message,
                        'onOk': function () {
                            deferred.resolve({ 'action': true });
                        },
                        'onCancel': function () {
                            deferred.reject({ 'action': false });
                        }
                    });
                    return deferred.promise;
                },
                alert: function (param) {
                    var deferred = $q.defer();
                    dialog.alert({
                        'Ok': param.ok,
                        'Cancel': param.cancel,
                        'Titile': param.title,
                        'Content': param.message,
                        'ContentNewLine': param.messageNewLine,
                        'ContentNewLine2': param.messageNewLine2,
                        'onOk': function () {
                            $('body').removeClass('modal-open');
                            $('.modal-backdrop').removeClass('modal-backdrop');
                            $('div[uib-modal-backdrop="modal-backdrop"]').remove();
                            $('div[uib-modal-window="modal-window"]').remove();
                            deferred.resolve({ 'action': true });
                        },
                        'onCancel': function () {
                            $('body').removeClass('modal-open');
                            $('.modal-backdrop').removeClass('modal-backdrop');
                            $('div[uib-modal-backdrop="modal-backdrop"]').remove();
                            $('div[uib-modal-window="modal-window"]').remove();
                            deferred.reject({ 'action': false });
                        }
                    });
                    return deferred.promise;
                },
                alertInModal: function (param) {
                    var deferred = $q.defer();
                    dialog.alert({
                        'Ok': param.ok,
                        'Cancel': param.cancel,
                        'Titile': param.title,
                        'Content': param.message,
                        'ContentNewLine': param.messageNewLine,
                        'onOk': function () {
                            $('body').removeClass('modal-open2');
                            $('div[uib-modal-backdrop="modal-backdrop2"]').remove();
                            $('div[uib-modal-window="modal-window2"]').remove();
                            deferred.resolve({ 'action': true });
                        },
                        'onCancel': function () {
                            $('body').removeClass('modal-open2');
                            $('div[uib-modal-backdrop="modal-backdrop2"]').remove();
                            $('div[uib-modal-window="modal-window2"]').remove();
                            deferred.reject({ 'action': false });
                        }
                    });
                    return deferred.promise;
                },
                confirmInModal: function (param) {
                    var deferred = $q.defer();

                    dialog.confirm({
                        'Ok': param.ok,
                        'Cancel': param.cancel,
                        'Titile': param.title,
                        'Content': param.message,
                        'onOk': function () {
                            $('body').removeClass('modal-open3');
                            $('div[uib-modal-backdrop="modal-backdrop3"]').remove();
                            $('div[uib-modal-window="modal-window3"]').remove();
                            deferred.resolve({ 'action': true });
                        },
                        'onCancel': function () {
                            $('body').removeClass('modal-open3');
                            $('div[uib-modal-backdrop="modal-backdrop3"]').remove();
                            $('div[uib-modal-window="modal-window3"]').remove();
                            deferred.reject({ 'action': false });
                        }
                    });
                    return deferred.promise;
                },
            };
        }
    ]);


    app.service("dpDialog", ['$uibModal', '$uibModalStack', 'ngAuthSettings', '$sce',
        function ($uibModal, $uibModalStack, ngAuthSettings, $sce) {
            var _title = "";

            var _textYes = "MESSAGE_YES";
            var _textNo = "MESSAGE_NO";


            // param
            // Content = text
            // Ok = text
            // Cancel = text
            // Titile = text 
            // onOk =function
            this.alert = function (param) {
                var okBtn = _textYes;
                var noBtn = _textNo;
                var content = "";
                var contentNewLine = "";
                var contentNewLine2 = "";
                var callback;
                var noCallback;
                var title;


                if (param.Ok)
                    okBtn = param.Ok;
                if (param.Cancel)
                    noBtn = param.Cancel;
                if (param.Content)
                    content = param.Content;
                if (param.ContentNewLine)
                    contentNewLine = param.ContentNewLine;
                if (param.ContentNewLine2)
                    contentNewLine2 = param.ContentNewLine2;
                if (param.Titile)
                    title = param.Titile;
                if (param.onOk)
                    callback = param.onOk;
                if (param.onCancel)
                    noCallback = param.onCancel;

                ShowAlertWithTitle(callback, content, contentNewLine, contentNewLine2, okBtn, title, noCallback);
            }

            // param
            // Content = text
            // Ok = text
            // Cancel = text
            // Titile = text 
            // onOk =function
            // onCancel  =function
            this.confirm = function (param) {
                var okBtn = _textYes;
                var noBtn = _textNo;
                var content = "";
                var contentNewLine = "";
                var okCallback;
                var noCallback;
                var title;

                if (param.Ok)
                    okBtn = param.Ok;
                if (param.Cancel)
                    noBtn = param.Cancel;
                if (param.Content)
                    content = param.Content;
                if (param.ContentNewLine)
                    contentNewLine = param.ContentNewLine;
                if (param.Titile)
                    title = param.Titile;
                if (param.onOk)
                    okCallback = param.onOk;
                if (param.onCancel)
                    noCallback = param.onCancel;
                ShowConfirmWithTitle(okCallback, noCallback, content, contentNewLine, okBtn, noBtn, title);
            }

            this.MessageBox = function (callback, content, contentNewLine, contentNewLine2, okBtn, title, onCancel) {

                if (content == undefined)
                    content = "";
                if (okBtn == undefined || okBtn == "")
                    okBtn = _textYes;
                ShowAlertWithTitle(callback, content, contentNewLine, contentNewLine2, okBtn, title, onCancel);

            }

            this.ConfirmBox = function (okCallback, content, contentNewLine, okBtn, noBtn, title, noCallback) {
                if (content == undefined)
                    content = "";
                if (okBtn == undefined || okBtn == "")
                    okBtn = _textYes;
                if (noBtn == undefined || noBtn == "")
                    noBtn = _textNo;
                ShowConfirmWithTitle(okCallback, noCallback, content, contentNewLine, okBtn, noBtn, title);
            }

            // Local Function 
            function ShowAlertWithTitle(callback, content, contentNewLine, contentNewLine2, okBtn, title, onCancel) {
                var windowAnimation = 'animated zoomIn dp-dialog';
                var modalInstance = $uibModal.open({
                    animation: true,
                    windowClass: windowAnimation,
                    backdrop: 'static',
                    template: require('./contents/template.html'),
                    controller: "controllerAlertbox",
                    link: function (scope, el, attrs) {

                    },
                    // size: 'sm',

                    resolve: {
                        // This function returns an object that will be passed to the ModalController as locals
                        items: function () {
                            // You can pass any variables that you need to access in the controller here
                            return {
                                callback: callback, content: content, contentNewLine: contentNewLine, contentNewLine2: contentNewLine2, okBtn: okBtn, title: title, onCancel: onCancel
                            };
                        }
                    }


                }).rendered.then(function () {
                    $uibModalStack.getTop().value.modalDomEl.attr('id', "alertbox");
                    let fec = $uibModalStack.getTop().value.modalDomEl[0].firstElementChild
                    fec.id = "alertbox";
                    fec.firstElementChild.id = "alertbox";
                });
            };

            function ShowConfirmWithTitle(okCallback, noCallback, content, contentNewLine, okBtn, noBtn, title) {
                var windowAnimation = 'animated zoomIn dp-dialog';
                var modalInstance = $uibModal.open({
                    animation: true,
                    windowClass: windowAnimation,
                    backdrop: 'static',
                    template: require('./contents/template.html'),
                    locals: {

                    },
                    controller: ['$scope', '$uibModalInstance', 'ngAuthSettings', '$sce', function ($scope, $uibModalInstance, ngAuthSettings, $sce) {
                        $scope.ClientDirective = ngAuthSettings.ClientDirective;

                        $scope.Items = {};
                        $scope.Config = {};

                        if (title == undefined) {
                            $scope.Config.Title = false;
                        } else {
                            $scope.Config.Title = true;
                        }
                        $scope.Config.Confirm = true;
                        $scope.Config.MessageBox = false;

                        $scope.Items.title = title;
                        $scope.Items.content = content;
                        $scope.Items.contentNewLine = contentNewLine;
                        $scope.Items.Yes = okBtn;
                        $scope.Items.No = noBtn;


                        $scope.trushedHtml = function (param) {
                            return $sce.trustAsHtml(param);
                        }

                        $scope.ok = function () {
                            $uibModalInstance.close();
                            if (okCallback)
                                okCallback();
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                            if (noCallback)
                                noCallback();
                        };
                    }],
                    link: function (scope, el, attrs) {

                    },
                    // size: 'sm',
                    resolve: {

                    }
                }).rendered.then(function () {
                    $uibModalStack.getTop().value.modalDomEl.attr('id', "alertbox");
                    let fec = $uibModalStack.getTop().value.modalDomEl[0].firstElementChild
                    fec.id = "alertbox";
                    fec.firstElementChild.id = "alertbox";
                });
            };
        }
    ]);
}