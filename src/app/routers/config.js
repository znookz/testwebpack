module.exports = function (app) {
    app.run([
        "$state",
        function ($state) {
            $state.go("login");
        }
    ]);

    app.config([
        "$stateProvider",
        function ($stateProvider) {
            // login router
            $stateProvider.state("login", {
                url: "/login",
                templateUrl: "views/state/login.html",
                controller: "loginController"
            });

        }
    ]);
}