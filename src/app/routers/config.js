module.exports = function (app) {
    app.run([
        "$rootScope",
        "$state",
        "$stateParams",
        function ($rootScope, $state, $stateParams) {

            $state.go("login");


        }
    ]);

    app.config([
        "$httpProvider",
        "$stateProvider",
        "$urlRouterProvider",
        "ngAuthSettings",
        "webServiceAPI",
        function ($httpProvider, $stateProvider, $urlRouterProvider, $ngAuthSettings, webServiceAPI) {

            var initInjector = angular.injector(['ng']);
            var $http = initInjector.get('$http');
            var $window = initInjector.get('$window');

            // if ($window.localStorage['userName']) {

            if ($window.localStorage['PC_ST'] != undefined) {
                var retrievedData = $window.localStorage.getItem("PC_ST");
                var routes = JSON.parse(retrievedData);
                routes.forEach(function (route) {
                    $stateProvider.state(route.state, {
                        url: route.url,
                        template: route.template,
                        params: { params: null }
                    });
                    // $routeProvider.when(route.path, route.properties);
                });
            } else {
                $http.post(webServiceAPI + "state/filter", { menuName: {} }).then(function (result) {

                    if (result.status === 200) {
                        $window.localStorage.setItem("PC_ST", result.data);
                        // $window.localStorage['state'] = JSON.stringify(result.data);
                        var routes = JSON.parse(result.data);
                        var len = routes.length;
                        routes.forEach(function (route) {
                            $stateProvider.state(route.state, {
                                url: route.url,
                                template: route.template,
                                params: { params: null }
                            });
                            // $routeProvider.when(route.path, route.properties);
                        });
                    } else { }
                }).catch(function (error) {
                    // defer.reject({ 'Message': error });
                });
            }

            // back office
            $stateProvider.state("tms.backoffice", {
                url: "/backoffice/",
                template: "<pc-backoffice-main></pc-backoffice-main>",
                params: { params: null }
            });



            // use controller 
            $stateProvider.state("tms.index", {
                url: "/index",
                templateUrl: $ngAuthSettings.ClientDirective + "views/partials/home/index.html",
                controller: "indexController"
            });

            $stateProvider.state("tms.dynamictable", {
                url: "/dynamictable",
                template: "<dynamic-table></dynamic-table>"
            });

            // $stateProvider.state("tms.querytool", {
            //     url: "/querytool",
            //     template: "<query-tool></query-tool>"
            // });


            // login router
            $stateProvider.state("login", {
                url: "/login",
                templateUrl: $ngAuthSettings.ClientDirective + "views/state/login.html",
                controller: "loginController"
            });





            $stateProvider.state("tms.add_charge", {
                url: "/add-charge",
                controller: [
                    "$scope",
                    "$state",
                    function ($scope, $state) {
                        $scope.splitItems = [];
                        $scope.coloadQTY1 = 12;

                        $scope.back = function () {
                            return $state.go("tms.international_plant_selected");
                        };
                    }
                ],
                templateUrl: "modules/transport/addCharge/view.html"
            });

            $stateProvider.state("tms.adjust_time", {
                url: "/adjust-time",
                // controller: ['$scope', '$state', function($scope, $state) {
                //     $scope.splitItems = [];
                //     $scope.coloadQTY1 = 12;

                //     $scope.back = function() {
                //         return $state.go('tms.coload_list');
                //     }

                // }],
                //templateUrl: 'modules/transport/adjustTime/view.html',
                template: "<adjust-time></adjust-time>"
            });

            // p' Benz Assign
            $stateProvider.state("tms.driver_and_truck", {
                url: "/driver-and-truck",
                template: "<assign-driver-and-truck></assign-driver-and-truck>"
            });
            // 5.2
            $stateProvider.state("tms.tr_charge", {
                url: "/tr-charge",
                controller: [
                    "$scope",
                    "$state",
                    function ($scope, $state) {
                        $scope.splitItems = [];
                        $scope.coloadQTY1 = 12;

                        $scope.back = function () {
                            return $state.go("tms.coload_list");
                        };

                        $scope.addCharge = function () {
                            return $state.go("tms.add_charge");
                        };
                    }
                ],
                templateUrl: "modules/transport/addTask/view.html"
            });

            // 5.4
            $stateProvider.state("tms.tr_accept", {
                url: "/tr-accept",
                controller: [
                    "$scope",
                    "$state",
                    function ($scope, $state) {
                        $scope.splitItems = [];
                        $scope.coloadQTY1 = 12;

                        $scope.back = function () {
                            return $state.go("tms.coload_list");
                        };

                        $scope.addCharge = function () {
                            return $state.go("tms.add_charge");
                        };
                    }
                ],
                templateUrl: "modules/transport/acceptAndRejectOrder/view.html"
            });

            $stateProvider.state("tms.tr_list_order", {
                url: "/tr-list-order",
                controller: [
                    "$scope",
                    "$state",
                    function ($scope, $state) {
                        $scope.splitItems = [];
                        $scope.coloadQTY1 = 12;

                        $scope.back = function () {
                            return $state.go("tms.coload_list");
                        };

                        $scope.addCharge = function () {
                            return $state.go("tms.add_charge");
                        };
                    }
                ],
                templateUrl: "modules/transport/listOrder/view.html"
            });

            // 5.5
            $stateProvider.state("tms.task_manager", {
                url: "/task-manager",
                // template: '<tms-task-manager></tms-task-manager>'
                template: "<ttms-e-pod-monitoring></ttms-e-pod-monitoring>"
                // controller: ['$scope', '$state', function($scope, $state) {
                //     $scope.splitItems = [];
                //     $scope.coloadQTY1 = 12;

                //     $scope.back = function() {
                //         return $state.go('tms.coload_list');
                //     }

                //     $scope.addCharge = function() {
                //         return $state.go('tms.add_charge');
                //     }

                //     $scope.showDetail = false;

                //     $scope.detail = function() {
                //         $scope.showDetail = true;
                //     }

                //     $scope.googleMap = {
                //         delegates: {},
                //         config: {
                //             title: 'Estimate Time',
                //         },
                //         invokes: {
                //             add: function() {

                //             },
                //             edit: function(item) {},
                //             delete: function(item) {}
                //         }

                //     };
                // }],
                // templateUrl: 'modules/transport/taskManager/view.html'
            });

            $stateProvider.state("tms.container_tracking", {
                url: "/container-tracking",
                controller: [
                    "$scope",
                    "$state",
                    function ($scope, $state) {
                        $scope.splitItems = [];
                        $scope.coloadQTY1 = 12;

                        $scope.back = function () {
                            return $state.go("tms.coload_list");
                        };

                        $scope.addCharge = function () {
                            return $state.go("tms.add_charge");
                        };
                    }
                ],
                templateUrl: "modules/transport/containerTracking/view.html"
            });

            $stateProvider.state("tms.task_tracking", {
                url: "/task-tracking",
                controller: [
                    "$scope",
                    "$state",
                    function ($scope, $state) {
                        $scope.splitItems = [];
                        $scope.coloadQTY1 = 12;

                        $scope.back = function () {
                            return $state.go("tms.coload_list");
                        };

                        $scope.addCharge = function () {
                            return $state.go("tms.add_charge");
                        };
                    }
                ],
                templateUrl: "modules/transport/taskTracking/view.html"
            });

            $stateProvider.state("tms.sale_customer", {
                url: "/sale-customer",
                controller: [
                    "$scope",
                    "$state",
                    function ($scope, $state) {
                        $scope.splitItems = [];
                        $scope.coloadQTY1 = 12;

                        $scope.back = function () {
                            return $state.go("tms.coload_list");
                        };

                        $scope.addCharge = function () {
                            return $state.go("tms.add_charge");
                        };
                    }
                ],
                templateUrl: "modules/procurement/sale/customer/view.html"
            });

            $stateProvider.state("tms.sale_quotation", {
                url: "/sale-quotation",
                controller: [
                    "$scope",
                    "$state",
                    function ($scope, $state) {
                        $scope.splitItems = [];
                        $scope.coloadQTY1 = 12;

                        $scope.back = function () {
                            return $state.go("tms.coload_list");
                        };

                        $scope.createQuotation = function () {
                            return $state.go("tms.sale_quotation_form");
                        };
                    }
                ],
                templateUrl: "modules/procurement/sale/myQuotation/view.html"
            });

            // Domestic order
            $stateProvider.state("tms.tms_domestic_order", {
                url: "/tms-domestic-order",
                template: "<domestic-main></domestic-main>"
            });

            $stateProvider.state("tms.demo", {
                url: "/demo",
                template: "<demo-main></demo-main>"
            });

            // Domestic planning
            $stateProvider.state("tms.tms_domestic_planning", {
                url: "/tms-domestic-planning",
                template: "<tms-domestic-planning></tms-domestic-planning>"
            });

            // Transfer Order
            $stateProvider.state("tms.tms_transfer_order", {
                url: "/tms-transfer-order",
                template: "<tms-transfer-order></tms-transfer-order>"
            });

            // Transfer planning
            $stateProvider.state("tms.tms_transfer_planning", {
                url: "/tms-transfer-planning",
                template: "<tms-transfer-planning></tms-transfer-planning>"
            });

            // Crossboarder planning
            $stateProvider.state("tms.tms_crossboarder_planning", {
                url: "/tms-crossboarder-planning",
                template: "<tms-crossboarder-planning></tms-crossboarder-planning>"
            });

            // Crossboarder order
            $stateProvider.state("tms.tms_crossboarder_order", {
                url: "/tms-crossboarder-order",
                template: "<tms-crossboarder-order></tms-crossboarder-order>"
            });

            // Import planning
            $stateProvider.state("tms.tms_import_planning", {
                url: "/tms-import-planning",
                template: "<general-shipment-schedule></general-shipment-schedule>"
            });

            // Import order
            $stateProvider.state("tms.tms_import_order", {
                url: "/tms-import-order",
                template: "<import-order></import-order>"
            });

            // Export order
            $stateProvider.state("tms.tms_export_order", {
                url: "/tms-export-order",
                template: "<export-order></export-order>"
            });

            // Job Request
            $stateProvider.state("tms.tms_job_request", {
                url: "/tms-job-request",
                template: "<job-request></job-request>"
            });

            // Job Request create
            $stateProvider.state("tms.tms_job_request_create", {
                url: "/tms-job-request-create",
                template: "<job-request-create></job-request-create>"
            });

            //Old module split shipment  ****
            $stateProvider.state("tms.tms_order_list", {
                url: "/tms-order-list",
                template: "<tms-order-list></tms-order-list>"
            });
            //New module split shipment  ****
            $stateProvider.state("tms.tms_split_shipment_domestic", {
                url: "/tms-split-shipment-domestic",
                template: "<tms-split-shipment-domestic></tms-split-shipment-domestic>"
            });
            $stateProvider.state("tms.tms_split_shipment_transfer", {
                url: "/tms-split-shipment-transfer",
                template: "<tms-split-shipment-transfer></tms-split-shipment-transfer>"
            });
            $stateProvider.state("tms.tms_coload_order", {
                url: "/tms-coload-shipment",
                template: "<tms-coload-shipment></tms-coload-shipment>"
            });
            $stateProvider.state("tms.tms_charge_detail", {
                url: "/tms-charge-detail",
                template: "<tms-charge-detail></tms-charge-detail>"
            });
            $stateProvider.state("tms.tms_add_charge", {
                url: "/tms-add-charge",
                template: "<tms-add-charge></tms-add-charge>"
            });
            $stateProvider.state("tms.charge_detail", {
                url: "/charge-detail",
                template: "<charge-detail></charge-detail>"
            });

            // Assign
            $stateProvider.state("tms.tms_truck_utilization", {
                url: "/tms-truck-utilization",
                template: "<tms-truck-utilization></tms-truck-utilization>"
            });

            $stateProvider.state("tms.tms_assign_time", {
                url: "/tms-assign-time",
                template: "<tms-assign-time></tms-assign-time>"
            });

            $stateProvider.state("tms.tms_assign_time_domestic", {
                url: "/tms-assign-time-domestic",
                template: "<tms-assign-time-domestic></tms-assign-time-domestic>"
            });

            //Configuration
            $stateProvider.state("tms.tms_all_config", {
                url: "/tms-all-config",
                template: "<tms-all-config></tms-all-config>"
            });
            $stateProvider.state("tms.tms_vender_info", {
                url: "/tms-vender-info",
                template: "<tms-vender-info></tms-vender-info>"
            });

            //*** Template master
            $stateProvider.state("tms.ms-region", {
                url: "/ms-region",
                template: "<oms-region></oms-region>"
            });
            $stateProvider.state("tms.ms-subregion", {
                url: "/ms-sub-region",
                template: "<oms-sub-region></oms-sub-region>"
            });
            $stateProvider.state("tms.ms-country", {
                url: "/ms-country",
                template: "<oms-country></oms-country>"
            });
            $stateProvider.state("tms.ms-province", {
                url: "/ms-province",
                template: "<oms-province></oms-province>"
            });
            $stateProvider.state("tms.ms-district", {
                url: "/ms-district",
                template: "<oms-district></oms-district>"
            });
            $stateProvider.state("tms.ms-packaging", {
                url: "/ms-packaging",
                template: "<oms-packaging></oms-packaging>"
            });
            $stateProvider.state("tms.ms-kind", {
                url: "/ms-kind",
                template: "<oms-kind></oms-kind>"
            });
            $stateProvider.state("tms.ms-tucktype", {
                url: "/ms-tucktype",
                template: "<oms-tuck-type></oms-tuck-type>"
            });
            $stateProvider.state("tms.ms-deliveryplace", {
                url: "/ms-deliveryplace",
                template: "<oms-delivery-place></oms-delivery-place>"
            });

            // POpOz
            $stateProvider.state("tms.ms-categoryOfBagging", {
                url: "/ms-categoryOfBagging",
                template: "<oms-category-of-bagging></oms-category-of-bagging>"
            });
            $stateProvider.state("tms.ms-finishGoods", {
                url: "/ms-finishGoods",
                template: "<oms-finish-goods></oms-finish-goods>"
            });
            $stateProvider.state("tms.ms-baggingType", {
                url: "/ms-baggingType",
                template: "<oms-bagging-type></oms-bagging-type>"
            });
            $stateProvider.state("tms.ms-productSize", {
                url: "/ms-productSize",
                template: "<oms-product-size></oms-product-size>"
            });

            $stateProvider.state("tms.ms-semi", {
                url: "/ms-semi",
                template: "<oms-semi></oms-semi>"
            });
            $stateProvider.state("tms.ms-grade", {
                url: "/ms-grade",
                template: "<oms-grade></oms-grade>"
            });
            $stateProvider.state("tms.ms-siloProduct", {
                url: "/ms-siloProduct",
                template: "<oms-silo-product></oms-silo-product>"
            });
            $stateProvider.state("tms.ms-buyer", {
                url: "/ms-buyer",
                template: "<oms-buyer></oms-buyer>"
            });
            $stateProvider.state("tms.ms-customer", {
                url: "/ms-customer",
                template: "<oms-customer></oms-customer>"
            });
            $stateProvider.state("tms.ms-pm-customer", {
                url: "/ms-pm-customer",
                template: "<oms-p-m-customer></oms-p-m-customer>"
            });
            $stateProvider.state("tms.ms-domesticType", {
                url: "/ms-domesticType",
                template: "<oms-domestic-type></oms-domestic-type>"
            });
            $stateProvider.state("tms.ms-purchaseOrder", {
                url: "/ms-purchaseOrder",
                template: "<oms-purchase-order></oms-purchase-order>"
            });
            $stateProvider.state("tms.ms-deliveteam", {
                url: "/ms-deliveteam",
                template: "<oms-deliver-team></oms-deliver-team>"
            });
            $stateProvider.state("tms.ms-DomesticDeliveryPlan", {
                url: "/ms-domesticdeliveryplan",
                template: "<oms-domestic-delivery-plan></oms-domestic-delivery-plan>"
            });
            $stateProvider.state("tms.ms-product", {
                url: "/ms-product",
                template: "<oms-product></oms-product>"
            });

            $stateProvider.state("tms.ms-plant", {
                url: "/ms-plant",
                template: "<oms-plant></oms-plant>"
            });

            // FMS Planning
            $stateProvider.state("tms.general_shipment_schedule", {
                url: "/general-shipment-schedule",
                template: "<general-shipment-schedule></general-shipment-schedule>"
            });

            $stateProvider.state("tms.pm_shipment_schedule", {
                url: "/pm-shipment-schedule",
                template: "<manage-planning></manage-planning>"
            });

            $stateProvider.state("tms.import_order", {
                url: "/import-order",
                template: "<import-order></import-order>"
            });

            $stateProvider.state("tms.check_in", {
                url: "/check-in",
                template: "<tms-check-in></tms-check-in>"
            });

            $stateProvider.state("tms.tms_tr_accept", {
                url: "/tms-tr-accept",
                template: "<tms-tr-accept></tms-tr-accept>"
            });

            $stateProvider.state("tms.tms_tr_list_order", {
                url: "/tms-tr-list-order",
                template: "<tms-order-list></tms-order-list>"
                // template: '<tms-tr-list-order-main></tms-tr-list-order-main>'
            });

            $stateProvider.state("tms.tms_vendor", {
                url: "/tms-vendor",
                template: "<tms-vendor></tms-vendor>"
            });

            $stateProvider.state("tms.tms_truck", {
                url: "/tms-truck",
                template: "<tms-truck></tms-truck>"
            });

            $stateProvider.state("tms.tms_driver", {
                url: "/tms-driver",
                template: "<tms-driver></tms-driver>"
            });
            $stateProvider.state("tms.tms_full_container", {
                url: "/tms-full-container",
                template: "<tms-full-container></tms-full-container>"
            });

            $stateProvider.state("tms.tms_empty_container", {
                url: "/tms-empty-container",
                template: "<tms-empty-container></tms-empty-container>"
            });

            //==============================================
            $stateProvider.state("tms.tms_ranking", {
                url: "/tms-ranking",
                template: "<tms-ranking></tms-ranking>"
            });
            $stateProvider.state("tms.tms-job-request-list", {
                url: "/tms-job-request-list",
                template: "<tms-job-request-list></tms-job-request-list>"
            });
            $stateProvider.state("tms.tms-new-vendor-list", {
                url: "/tms-new-vendor-list",
                template: "<tms-new-vendor-list></tms-new-vendor-list>"
            });
            $stateProvider.state("tms.tms-job-vendor-list", {
                url: "/tms-job-vendor-list",
                template: "<tms-job-vendor-list></tms-job-vendor-list>"
            });
            $stateProvider.state("tms.tms-message", {
                url: "/tms-message",
                template: "<tms-message></tms-message>"
            });
            $stateProvider.state("tms.tms-register", {
                url: "/tms-register",
                template: "<tms-register></tms-register>"
            });
            $stateProvider.state("tms.tms-document", {
                url: "/tms-document",
                template: "<tms-document></tms-document>"
            });
            $stateProvider.state("tms.tms-business-profile", {
                url: "/tms-business-profile",
                template: "<tms-business-profile></tms-business-profile>"
            });
            $stateProvider.state("tms.tms-coporate-document", {
                url: "/tms-coporate-document",
                template: "<tms-coporate-document></tms-coporate-document>"
            });
            $stateProvider.state("tms.tms_job_invitation", {
                url: "/tms-job-invitation",
                template: "<tms-job-invitation></tms-job-invitation>"
            });

            // Interface View
            $stateProvider.state("tms.tms_interface_in", {
                url: "/tms-interface-in",
                template: "<ttms-interface-in></ttms-interface-in>"
            });
            $stateProvider.state("tms.tms_interface_out", {
                url: "/tms-interface-out",
                template: "<interface-out></interface-out>"
            });

            // Inspection
            $stateProvider.state("tms.tms_inspection_verify_container", {
                url: "/tms_inspection_verify_container",
                template: "<tms-verify-container></tms-verify-container>"
            });

            // New -----------------
            $stateProvider.state("tms.ttms_list_order", {
                url: "/ttms-list-order",
                template: "<ttms-list-order></ttms-list-order>"
            });

            $stateProvider.state("tms.ttms_truck_utilization", {
                url: "/ttms-truck-utilization",
                template: "<ttms-truck-utilization></ttms-truck-utilization>"
            });

            $stateProvider.state("tms.ttms_assign_transporter", {
                url: "/ttms-assign-transporter",
                template: "<ttms-assign-transporter></ttms-assign-transporter>"
            });

            $stateProvider.state("tms.ttms_failure", {
                url: "/ttms-failure",
                template: "<ttms-failure></ttms-failure>"
            });

            $stateProvider.state("tms.tms_assign_truck", {
                url: "/tms-assign-truck",
                template: "<ttms-assign-transporter></ttms-assign-transporter>" //'<tms-assign-truck></tms-assign-truck>'
            });

            $stateProvider.state("tms.ttms_task_tracking", {
                url: "/ttms-task-tracking",
                template: "<ttms-task-tracking></ttms-task-tracking>" //'<tms-task-tracking></tms-task-tracking>'
            });

            $stateProvider.state("tms.tms_task_tracking", {
                url: "/tms-task-tracking",
                template: "<ttms-task-tracking></ttms-task-tracking>"
            });

            $stateProvider.state("tms.tms_inspection_verify_truck", {
                url: "/tms_inspection_verify_truck",
                template: "<tms-verify-truck></tms-verify-truck>"
            });

            $stateProvider.state("tms.tms_inspection_verify_tank_car", {
                url: "/tms_inspection_verify_tank_car",
                template: "<tms-verify-tank-car></tms-verify-tank-car>"
            });

            $stateProvider.state("tms.tms_inspection_verify_own_fleet_head", {
                url: "/tms_inspection_verify_own_fleet_tank_car_head",
                template: "<tms-verify-own-fleet-tank-car-head></tms-verify-own-fleet-tank-car-head>"
            });

            $stateProvider.state("tms.tms_inspection_verify_own_fleet_tank_car_tail", {
                url: "/tms_inspection_verify_own_fleet_tank_car_tail",
                template: "<tms-verify-own-fleet-tank-car-tail></tms-verify-own-fleet-tank-car-tail>"
            });

            $stateProvider.state("tms.tms_inspection_verify_seul", {
                url: "/tms_inspection_verify_seul",
                template: "<tms-verify-seul></tms-verify-seul>"
            });

            $stateProvider.state("tms.tms_inspection_verify_methanol", {
                url: "/tms_inspection_verify_methanol",
                template: "<tms-verify-methanol></tms-verify-methanol>"
            });

            $stateProvider.state("tms.tms_inspection_verify_behavior", {
                url: "/tms_inspection_verify_behavior",
                template: "<tms-verify-behavior></tms-verify-behavior>"
            });

            $stateProvider.state("tms.tms_verify_tank_truck", {
                url: "/tms-verify-tank-truck",
                template: "<tms-verify-tank-truck></tms-verify-tank-truck>"
            });

            $stateProvider.state("tms.tms_verify-driving-observation", {
                url: "/tms-verify-driving-observation",
                template: "<tms-verify-driving-observation></tms-verify-driving-observation>"
            });

            $stateProvider.state("tms.tms_inspection_verify_biodiesel", {
                url: "/tms_inspection_verify_biodiesel",
                template: "<tms-verify-biodiesel></tms-verify-biodiesel>"
            });

            $stateProvider.state("tms.tms_inspection_verify_car_check", {
                url: "/tms_inspection_verify_car_check",
                template: "<tms-verify-car-check></tms-verify-car-check>"
            });

            $stateProvider.state("tms.tms_inspection_verify_car_check_tank", {
                url: "/tms_inspection_verify_car_check_tank",
                template: "<tms-verify-car-check-tank></tms-verify-car-check-tank>"
            });

            $stateProvider.state("tms.tms_inspection_verify_driving_behavior", {
                url: "/tms_inspection_verify_driving_behavior",
                template: "<tms-verify-driving-behavior></tms-verify-driving-behavior>"
            });

            $stateProvider.state("tms.tms_inspection_verify_tire_condition", {
                url: "/tms_inspection_verify_tire_condition",
                template: "<tms-verify-tire-condition></tms-verify-tire-condition>"
            });

            //configCoload
            $stateProvider.state("tms.tms_config_coload", {
                url: "/tms_config_coload",
                template: "<tms-maintain-coload></tms-maintain-coload>"
            });

            //configAssignTime
            $stateProvider.state("tms.tms_config_assigntime", {
                url: "/tms_config_assigntime",
                template: "<tms-maintain-assign-time></tms-maintain-assign-time>"
            });

            //configContainer
            $stateProvider.state("tms.tms_config_container", {
                url: "/tms_config_container",
                template: "<tms-maintain-container></tms-maintain-container>"
            });

            //postToBilling
            $stateProvider.state("tms.tms_post_to_billing_ap", {
                url: "/tms_post_to_billing_ap",
                template: "<ttms-post-to-billing-ap></ttms-post-to-billing-ap>"
            });
            $stateProvider.state("tms.tms_post_to_billing_ar", {
                url: "/tms_post_to_billing_ar",
                template: "<ttms-post-to-billing-ar></ttms-post-to-billing-ar>"
            });

            // criteriaReport
            $stateProvider.state("tms.tms-criteria-domestic", {
                url: "/tms-criteria-domestic",
                template: "<criteria-domestic-form></criteria-domestic-form>"
            });
            $stateProvider.state("tms.tms-criteria-export", {
                url: "/tms-criteria-export",
                template: "<criteria-export-form></criteria-export-form>"
            });
            $stateProvider.state("tms.tms-criteria-crossborder", {
                url: "/tms-criteria-crossborder",
                template: "<criteria-crossborder-form></criteria-crossborder-form>"
            });
            $stateProvider.state("tms.tms-criteria-import", {
                url: "/tms-criteria-import",
                template: "<criteria-import-form></criteria-import-form>"
            });
            $stateProvider.state("tms.tms-criteria-transfer", {
                url: "/tms-criteria-transfer",
                template: "<criteria-transfer-form></criteria-transfer-form>"
            });
            $stateProvider.state("tms.tms-criteria-vendor", {
                url: "/tms-criteria-vendor",
                template: "<criteria-vendor-form></criteria-vendor-form>"
            });
            // $stateProvider.state('tms.ttms_check_in_truck', {
            //     url: '/ttms_check_in_truck',
            //     template: '<ttms-Check-In-Truck></ttms-Check-In-Truck>'
            // });
            $stateProvider.state("tms.tms_check_in", {
                url: "/tms_check_in",
                template: "<tms-Check-In></tms-Check-In>"
            });
            $stateProvider.state("tms.ttms_user", {
                url: "/ttms_user",
                template: "<user-directory-module></user-directory-module>"
            });
            //Accept&RejectBackhual
            $stateProvider.state("tms.tms_tr_accept_backhual", {
                url: "/tms-tr-accept-backhual",
                template: "<tms-tr-accept-backhual></tms-tr-accept-backhual>"
            });
            //GPS
            $stateProvider.state("tms.tms-gps-tracking", {
                url: "/tms-gps-tracking",
                template: "<ttms-gps-tracking></ttms-gps-tracking>"
            });
            $stateProvider.state("tms.tms-gps-backhual", {
                url: "/tms-gps-backhual",
                template: "<ttms-gps-backhual></ttms-gps-backhual>"
            });
            $stateProvider.state("tms.tms-gps-station", {
                url: "/tms-gps-station",
                template: "<ttms-gps-station></ttms-gps-station>"
            });
            $stateProvider.state("tms.tms-gps-route", {
                url: "/tms-gps-route",
                template: "<ttms-gps-route></ttms-gps-route>"
            });
            $stateProvider.state("tms.tms-gps-estimate", {
                url: "/tms-gps-estimate",
                template: "<ttms-gps-estimate></ttms-gps-estimate>"
            });
            $stateProvider.state("tms.tms-gps-notification", {
                url: "/tms-gps-notification",
                template: "<ttms-gps-notification></ttms-gps-notification>"
            });
            $stateProvider.state("tms.tms-gps-stationIcon", {
                url: "/tms-gps-stationIcon",
                template: "<ttms-gps-station-icon></ttms-gps-station-icon>"
            });
            $stateProvider.state("tms.tms-gps-setting", {
                url: "/tms-gps-setting",
                template: "<ttms-gps-setting></ttms-gps-setting>"
            });
            // Alert
            $stateProvider.state("tms.tms-config-alert", {
                url: "/tms-config-alert",
                template: "<ttms-config-alert></ttms-config-alert>"
            });
            $stateProvider.state("tms.tms-config-alert-field", {
                url: "/tms-config-alert-field",
                template: "<ttms-config-alert-field></ttms-config-alert-field>"
            });
            // TMSMangaementBilling
            $stateProvider.state("tms.tms-mangaement-billing", {
                url: "/tms-mangaement-billing",
                template: "<ttms-mangaement-billing></ttms-mangaement-billing>"
            });
            // MasterBillingCompany
            $stateProvider.state("tms.master-billing-company", {
                url: "/master-billing-company",
                template: "<master-billing-company></master-billing-company>"
            });
            // MasterBillingCustomer
            $stateProvider.state("tms.master-billing-customer", {
                url: "/master-billing-customer",
                template: "<master-billing-customer></master-billing-customer>"
            });
            // MasterShipTo
            $stateProvider.state("tms.tms-master-ship-to-main", {
                url: "/tms-master-ship-to-main",
                template: "<tms-master-ship-to-main></tms-master-ship-to-main>"
            });
            // MaintainSuggestTime
            $stateProvider.state("tms.tms-maintain-suggest-time-main", {
                url: "/tms-maintain-suggest-time-main",
                template: "<tms-maintain-suggest-time-main></tms-maintain-suggest-time-main>"
            });
            // MasterTruckType
            $stateProvider.state("tms.tms-master-truck-type-main", {
                url: "/tms-master-truck-type-main",
                template: "<tms-master-truck-type-main></tms-master-truck-type-main>"
            });
            // MasterPlant
            $stateProvider.state("tms.tms-master-plant-main", {
                url: "/tms-master-plant-main",
                template: "<tms-master-plant-main></tms-master-plant-main>"
            });
            // MasterWH
            $stateProvider.state("tms.tms-master-w-h-main", {
                url: "/tms-master-w-h-main",
                template: "<tms-master-w-h-main></tms-master-w-h-main>"
            });
            // MasterLoadingType
            $stateProvider.state("tms.tms-master-loading-type-main", {
                url: "/tms-master-loading-type-main",
                template: "<tms-master-loading-type-main></tms-master-loading-type-main>"
            });
            // MasterEmail
            $stateProvider.state("tms.tms-master-email-main", {
                url: "/tms-master-email-main",
                template: "<tms-master-email-main></tms-master-email-main>"
            });


            // $stateProvider.state("tms.tms-demo", {
            //   url: "/tms-demo",
            //   template: "<demo-main></demo-main>"
            // });

            // $stateProvider.state("tms.tms-demo2", {
            //   url: "/tms-demo2",
            //   template: "<demo-main></demo-main>"
            // });

            // $stateProvider.state("tms.tms-demo3", {
            //   url: "/tms-demo3",
            //   template: "<demo-main></demo-main>"
            // });

            // $stateProvider.state("tms.tms-demo4", {
            //   url: "/tms-demo4",
            //   template: "<demo-main></demo-main>"
            // });

            /*** embed the routes ***/
            // var routes = Html.Raw(new ClientRouteBuilder().BuildRoutesFor(User))

            // var routes = [];
            // routes.push({
            //   state: 'tms.tms-demo',
            //   url: '/tms-demo',
            //   template: '<demo-main></demo-main>'
            // });

            // routes.push({
            //   state: 'tms.tms-demo2',
            //   url: '/tms-demo2',
            //   template: '<demo-main></demo-main>'
            // });

            // routes.push({
            //   state: 'tms.tms-demo3',
            //   url: '/tms-demo3',
            //   template: '<demo-main></demo-main>'
            // });

            // routes.push({
            //   state: 'tms.tms-demo4',
            //   url: '/tms-demo4',
            //   template: '<demo-main></demo-main>'
            // });

            // debugger
            // var routes = JSON.parse($window.localStorage['state']);
            // routes.forEach(function (route) {
            //   $stateProvider.state(route.state, {
            //     url: route.url,
            //     template: route.template
            //   });
            //   // $routeProvider.when(route.path, route.properties);
            // });


            // stateService.service.filter({}).then(function (res) {

            //   debugger
            //   res.data.forEach(function (route) {
            //     $stateProvider.state(route.state, {
            //       url: route.url,
            //       template: route.template
            //     });

            //   });

            // }, function error(res) {

            // })

            // $routeProvider.otherwise({
            //   redirectTo: routes[0].path
            // });

            /*** register the routes ***/
            // app.config(function ($routeProvider) {
            //   routes.forEach(function (route) {
            //     $routeProvider.when(route.path, route.properties);
            //   });
            //   $routeProvider.otherwise({
            //     redirectTo: routes[0].path
            //   });
            // });

            //Fremlalalala

            /* 
                   $stateProvider.state('tms.transportOrderView', {
                       url: '/transport-order-view',
                       template: '<transport-order-view></transport-order-view>'
                   });  */


            //End Fremlalalala
        }
    ]);
}