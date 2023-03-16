module.exports = function(app) {
    app.factory("totalsumrow", function() {
        return {
            cal: function(curPage, perPage, totalPage, item) {

                var numberpage = "";
                if (curPage > 1) {
                    numberpage = ((perPage * (curPage - 1)) + 1) + "-" + ((perPage * (curPage - 1)) + item)
                } else {
                    if (totalPage == 0) {
                        numberpage = "0-0";
                    } else {
                        numberpage = "1-" + item;
                    }
                }

                return numberpage + " of " + totalPage;
            }
        };
    });

    app.factory("dateexpire", function() {

        function diffdate(date) {
            var ret = 0;
            var today = moment(new Date()).format("YYYYMMDD");
            var setdate = date.format("YYYYMMDD");
            var cal = date.diff(moment(new Date()), 'days');
            if (today == setdate) {
                ret = 0
            } else {
                ret = cal + 1;
            }

            return ret;
        }


        return {
            cal: function(data, massagesoon, massageexprie) {

                let havedt = [];
                var dtres = {}
                if (data.length >= 2) {

                    data.forEach(element => {
                        if (element != "") {
                            havedt.push(element);
                        }
                    });

                    if (havedt.length == 0) {
                        dtres.LicenseExp = "";
                        dtres.LicenseExpColor = { 'color': 'green' }
                        return dtres;
                    }

                    var trun = 1000000000000000000;
                    if (havedt.length == 1) {
                        trun = diffdate(havedt[0]);
                    } else {

                        havedt.forEach((element, key) => {

                            havedt.forEach((ele, ke) => {

                                if (key != ke) {

                                    if (element.diff(ele) <= 0) {
                                        if (trun > diffdate(element)) {
                                            trun = diffdate(element);
                                        }
                                    }

                                }

                            })

                        });
                    }

                }

                if (trun == 1000000000000000000) {
                    trun = diffdate(havedt[0]);
                }


                if (trun == undefined || trun > 30) {
                    dtres.LicenseExp = "";
                    dtres.LicenseExpColor = { 'color': 'green' }
                } else if (trun > 0 && trun != 0) {
                    dtres.LicenseExp = massagesoon;
                    dtres.LicenseExpColor = { 'color': '#dcd500' }
                } else {
                    dtres.LicenseExp = massageexprie;
                    dtres.LicenseExpColor = { 'color': 'red' }
                }

                return dtres;

                // if (IDexp != "" && DLexp != "") {

                //     if (IDexp.diff(DLexp) < 0) {
                //         //ปชช ล่าสุดวันหมด น้อยกว่า ใบขับ
                //         return checkdate = IDexp.diff(moment(new Date()), 'days') + 1;

                //     } else {
                //         //ใบขับ ล่าสุดวันหมด น้อยกว่า ปชช
                //         return checkdate = DLexp.diff(moment(new Date()), 'days') + 1;
                //     }

                // } else if (IDexp != "" && DLexp == "") {

                //     return checkdate = IDexp.diff(moment(new Date()), 'days') + 1;

                // } else if (IDexp == "" && DLexp != "") {

                //     return checkdate = DLexp.diff(moment(new Date()), 'days') + 1;

                // } else {


                // }

                // var checkdate = date.diff(moment(new Date()), 'days') + 1;


            }
        };
    });


    app.factory("Setoffset", function() {

        function offset(el) {
            var rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }

        return {
            focus: function(elementid) {
                var div = document.getElementById(elementid);
                div.focus();
                var divOffset = offset(div);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = divOffset.top - 200;
            }
        };
    });

    app.directive('idcardInput', function($filter, $browser) {
        return {
            require: 'ngModel',
            link: function($scope, $element, $attrs, ngModelCtrl) {
                var listener = function() {
                    var value = $element.val().replace(/[^0-9]/g, '');
                    $element.val($filter('idcard')(value, false));
                };

                // This runs when we update the text field
                ngModelCtrl.$parsers.push(function(viewValue) {
                    return viewValue.replace(/[^0-9]/g, '').slice(0, 13);
                });

                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function() {
                    $element.val($filter('idcard')(ngModelCtrl.$viewValue, false));
                };

                $element.bind('change', listener);
                $element.bind('keydown', function(event) {
                    var key = event.keyCode;
                    // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                    // This lets us support copy and paste too
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                        return;
                    }
                    $browser.defer(listener); // Have to do this or changes don't get picked up properly
                });

                $element.bind('paste cut', function() {
                    $browser.defer(listener);
                });
            }

        };
    });
    app.filter('idcard', function() {
        return function(idcard) {
            //console.log(idcard);
            if (!idcard) { return ''; }

            var value = idcard.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return idcard;
            }

            var country, city, number;

            switch (value.length) {
                case 1:
                    city = value;
                    break;

                default:
                    city = value.slice(0, 1);
                    number = value.slice(1, 13);
            }

            if (number) {

                if (number.length > 11) {
                    number = number.slice(0, 4) + '-' + number.slice(4, 9) + '-' + number.slice(9, 11) + '-' + number.slice(11, 12);
                } else if (number.length > 9) {
                    number = number.slice(0, 4) + '-' + number.slice(4, 9) + '-' + number.slice(9, 11);
                } else if (number.length > 4) {
                    number = number.slice(0, 4) + '-' + number.slice(4, 9);
                } else {
                    number = number;
                }

                return (city + "-" + number).trim();
            } else {
                return city;
            }

        };
    });

    app.directive('phoneInput', function($filter, $browser) {
        return {
            require: 'ngModel',
            link: function($scope, $element, $attrs, ngModelCtrl) {
                var listener = function() {
                    var value = $element.val().replace(/[^0-9]/g, '');
                    $element.val($filter('tel')(value, false));
                };

                // This runs when we update the text field
                ngModelCtrl.$parsers.push(function(viewValue) {
                    return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
                });

                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function() {
                    $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
                };

                $element.bind('change', listener);
                $element.bind('keydown', function(event) {
                    var key = event.keyCode;
                    // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                    // This lets us support copy and paste too
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                        return;
                    }
                    $browser.defer(listener); // Have to do this or changes don't get picked up properly
                });

                $element.bind('paste cut', function() {
                    $browser.defer(listener);
                });
            }

        };
    });
    app.filter('tel', function() {
        return function(tel) {
            //console.log(tel);
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 1:
                case 2:
                case 3:
                    city = value;
                    break;

                default:
                    city = value.slice(0, 3);
                    number = value.slice(3, 10);
            }

            if (number) {

                if (number.length > 3) {
                    number = number.slice(0, 3) + '-' + number.slice(3, 10);
                } else {
                    number = number;
                }

                return (city + "-" + number).trim();
            } else {
                return city;
            }

        };
    });


    // app.filter('tel', function () {
    //     return function (tel) {
    //         console.log(tel);
    //         if (!tel) { return ''; }

    //         var value = tel.toString().trim().replace(/^\+/, '');

    //         if (value.match(/[^0-9]/)) {
    //             return tel;
    //         }

    //         var country, city, number;

    //         switch (value.length) {
    //             case 1:
    //             case 2:
    //             case 3:
    //                 city = value;
    //                 break;

    //             default:
    //                 city = value.slice(0, 3);
    //                 number = value.slice(3);
    //         }

    //         if(number){
    //             if(number.length>3){
    //                 number = number.slice(0, 3) + '-' + number.slice(3,7);
    //             }
    //             else{
    //                 number = number;
    //             }

    //             return ("(" + city + ") " + number).trim();
    //         }
    //         else{
    //             return "(" + city;
    //         }

    //     };
    // });
}