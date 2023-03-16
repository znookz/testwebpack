module.exports = function (app) {
    app.controller('loginController', ['$scope', '$state',
        function ($scope, $state) {
            // debugger
            return
            $scope.loginData = {};
            // check authen
            // var isAuth = authService.fillAuthData();
            var messageBox = dpMessageBox;
            var auth = authService.authentication;
            if (auth.isAuthentication() == true) {
                $state.go('tms.dashboard');
            }

            $scope.version_no = "M05.01.01.20220909"


            $scope.login = function (username, password) {
                // const salt = crypto.randomBytes(16).toString('hex');

                var loginData = {
                    "Username": username,
                    "Password": password,
                    "login_web": 1 // 1 Express , 2 Messager
                };

                authService.login(loginData).then(function (res) {

                    var auth = authService.authentication;
                    if (auth.isAuth == true) {

                        localStorage.setItem("PC_RGT", JSON.stringify(res));

                        // var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
                        //     (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
                        //     (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
                        //     (document.msFullscreenElement && document.msFullscreenElement !== null);

                        // var docElm = document.documentElement;
                        // if (!isInFullScreen) {
                        //     if (docElm.requestFullscreen) {
                        //         docElm.requestFullscreen();
                        //         // b.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Exit Screen';
                        //     } else if (docElm.mozRequestFullScreen) {
                        //         docElm.mozRequestFullScreen();
                        //         // b.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Exit Screen';
                        //     } else if (docElm.webkitRequestFullScreen) {
                        //         docElm.webkitRequestFullScreen();
                        //         // b.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Exit Screen';
                        //     } else if (docElm.msRequestFullscreen) {
                        //         docElm.msRequestFullscreen();
                        //         // b.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Exit Screen';
                        //     }
                        // } else {
                        //     if (document.exitFullscreen) {
                        //         document.exitFullscreen();
                        //         // b.innerHTML = '<i class="fa fa-arrows-alt" aria-hidden="true"></i> Full Screen';
                        //     } else if (document.webkitExitFullscreen) {
                        //         document.webkitExitFullscreen();
                        //         // b.innerHTML = '<i class="fa fa-arrows-alt" aria-hidden="true"></i> Full Screen';
                        //     } else if (document.mozCancelFullScreen) {
                        //         document.mozCancelFullScreen();
                        //         // b.innerHTML = '<i class="fa fa-arrows-alt" aria-hidden="true"></i> Full Screen';
                        //     } else if (document.msExitFullscreen) {
                        //         document.msExitFullscreen();
                        //         // b.innerHTML = '<i class="fa fa-arrows-alt" aria-hidden="true"></i> Full Screen';
                        //     }
                        // }

                        if (username == "pc" && password == "pc")
                            $state.go('tms.backoffice');
                        else if (username == "register")
                            $state.go('tms.authRegisterForm', {
                                params: "NEW"
                            });
                        else if (res.level_User == "9")
                            $state.go('tms.orderbookingordersummary');
                        else if (res.level_User == "3")
                            $state.go('tms.orderbookingordercvsummary');
                        else
                            $state.go('tms.dashboard');
                    } else {

                        var option = {
                            ok: 'ok',
                            cancel: 'cancel',
                            title: 'Information !!!',
                            message: 'Login Fail " ?',
                        };

                        messageBox.alert(option).then(function yes() { });
                    }

                },
                    function error(response) {

                        var option = {
                            ok: 'ok',
                            cancel: 'cancel',
                            title: 'Information !!!',
                            message: 'Login Fail "',
                        };

                        messageBox.alert(option).then(function yes() { });

                    });



                // var loginData = {
                //     "Username": username,
                //     "Password": password
                // }

                // authService.login(loginData).then(function(res) {

                //     var auth = authService.authentication;
                //     console.log(auth);
                //     if (auth.isAuth == true) {
                //         $state.go('tms.index');
                //     } else {
                //         alert('login Filed');
                //     }
                // }, function error(response) {
                //     alert('message: ' + response);
                // });
            }

            $scope.forgetpassword = function (user) {

                if (user == undefined || user == "" || user == null) {

                    dpMessageBox.alert({
                        title: 'Information',
                        message: 'กรุณากรอก User Name',
                    })

                    return
                }

                messageBox.confirm({
                    ok: 'ok',
                    cancel: 'cancel',
                    title: 'Information !!!',
                    message: 'Foget your Password?',
                }).then(function yes() {

                    authService.forgetpass(user).then(function (res) {

                        console.log(res);

                        if (res.response == "SUCCESS") {

                            dpMessageBox.alert({
                                title: 'SUCCESS!!',
                                message: res.message,
                            })

                        } else {
                            dpMessageBox.alert({
                                title: 'Alert!!',
                                message: res.message,
                            })
                        }

                    });


                });


            }

            $scope.register = function () {
                $scope.login("register", "1111");

            }

            $scope.ChangeTheme = function (para) {

                let theme = []
                if (para == 1) {
                    theme = [
                        { "variable": "--MainColor", "color": "#1EBCC5" },
                        { "variable": "--Header_Popup_Color", "color": "#1EBCC5" },
                        { "variable": "--tag_a_Color", "color": "#1EBCC5" },
                        { "variable": "--button_Color", "color": "#1EBCC5" },

                        { "variable": "--color-color1", "color": "#000" },
                        { "variable": "--color-color2", "color": "#1EBCC5" },
                        { "variable": "--color-color3", "color": "#9ad4de" },
                        { "variable": "--color-color4", "color": "#404041" },
                        { "variable": "--color-color5", "color": "#6d6e70" },
                        { "variable": "--color-color6", "color": "#f2f2f2" },
                        { "variable": "--color-color7", "color": "#fff" },
                        { "variable": "--color-color8", "color": "#6d6e70" },
                        { "variable": "--color-color9", "color": "#ececec" },
                        { "variable": "--color-color10", "color": "#dadada" },
                        { "variable": "--color-color11", "color": "#6fcf97" },
                        { "variable": "--color-color12", "color": "#ccc3" },
                        { "variable": "--color-color20", "color": "#fc9b7e" },
                    ]
                } else {
                    theme = [
                        { "variable": "--MainColor", "color": "#FF6433" },
                        { "variable": "--Header_Popup_Color", "color": "#FF6433" },
                        { "variable": "--tag_a_Color", "color": "#FF6433" },
                        { "variable": "--button_Color", "color": "#FF6433" },
                        { "variable": "--color-color1", "color": "#000" },
                        { "variable": "--color-color2", "color": "#FF6433" },
                        { "variable": "--color-color3", "color": "#9ad4de" },
                        { "variable": "--color-color4", "color": "#404041" },
                        { "variable": "--color-color5", "color": "#6d6e70" },
                        { "variable": "--color-color6", "color": "#f2f2f2" },
                        { "variable": "--color-color7", "color": "#fff" },
                        { "variable": "--color-color8", "color": "#6d6e70" },
                        { "variable": "--color-color9", "color": "#ececec" },
                        { "variable": "--color-color10", "color": "#dadada" },
                        { "variable": "--color-color11", "color": "#6fcf97" },
                        { "variable": "--color-color12", "color": "#ccc3" },
                        { "variable": "--color-color20", "color": "#fc9b7e" },
                    ]
                }

                var r = document.querySelector(':root');

                theme.forEach((ele) => {
                    r.style.setProperty(ele.variable, ele.color);
                });

            }

        }
    ]);
}