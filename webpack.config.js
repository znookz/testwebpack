const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
    entry: './src/app/app.js',
    mode: 'development',
    output: {
        filename: 'tms.[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 8086
    },
    module: {
        rules: [{
            test: /\.(html)$/,
            // exclude: /node_modules/,
            use: 'html-loader',
        },
        {
            test: /\.(css)$/,
            // exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(scss)$/,
            // exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
            test: /\.(png|gif|jpg|woff|woff2|eot|ttf|svg)$/,
            use: [{
                loader: 'url-loader?limit=100000',
                options: {
                    Esmodule: false,
                    name: '[name].[ext]',
                    limit: 10240,
                    outputPath: 'assets'
                }
            }]
        },
        {
            test: /\.(woff|woff2) (\?v=\d+\.\d+\.\d+)?$/,
            // exclude: /node_modules/,
            use: [{
                loader: 'url-loader?limit=10000&mimetype=application/font-woff',
                options: {
                    Esmodule: false,
                    name: '[name].[ext]',
                    outputPath: 'assets'
                }
            }]
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            // exclude: /node_modules/,
            use: [{
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
                options: {
                    Esmodule: false,
                    name: '[name].[ext]',
                    outputPath: 'assets'
                }
            }]
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    Esmodule: false,
                    name: '[name].[ext]',
                    outputPath: 'assets'
                }
            }]
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            // exclude: /node_modules/,
            use: [{
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
                options: {
                    Esmodule: false,
                    name: '[name].[ext]',
                    outputPath: 'assets'
                }
            }]
        },
        {
            test: /[\\\/]modernizr dependecie path[\\\/]modernizr\.js$/,
            loader: "imports?this=>window!exports?window.Modernizr"
        }
        ]
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CopyPlugin({
            patterns: [

                //html file
                { from: "./src/app/views/state/login.html", to: "./views/state/login.html" },

                { from: "./src/app/assets/dpDialog/contents/style.css", to: "./assets/dpDialog/contents/style.css" },
                { from: "./src/app/assets/kasco-wing/vendor/bootstrap/css/bootstrap.css", to: "./assets/kasco-wing/vendor/bootstrap/css/bootstrap.css" },
                { from: "./src/app/assets/kasco-wing/javascripts/particles/css/style.css", to: "./assets/kasco-wing/javascripts/particles/css/style.css" },

                //picture
                { from: "./src/app/assets/mobilyst_logo2.svg", to: "./assets/mobilyst_logo2.svg" },


                { from: "./src/app/assets/kasco-wing/styles/js/jquery.js", to: "./assets/kasco-wing/styles/js/jquery.js" },
                { from: "./src/app/assets/kasco-wing/vendor/bootstrap/js/bootstrap.js", to: "./assets/kasco-wing/vendor/bootstrap/js/bootstrap.js" },
                { from: "./src/app/assets/kasco-wing/javascripts/particles/js/particles.js", to: "./assets/kasco-wing/javascripts/particles/js/particles.js" },
                { from: "./src/app/assets/kasco-wing/javascripts/particles/js/app.js", to: "./assets/kasco-wing/javascripts/particles/js/app.js" },


                { from: "./src/app/awesome.js", to: "./awesome.js" },

                { from: "./src/app/css/free.min.css", to: "./css/free.min.css" },
                { from: "./src/app/css/free-v4-font-face.min.css", to: "./css/free-v4-font-face.min.css" },
                { from: "./src/app/css/free-v4-shims.min.css", to: "./css/free-v4-shims.min.css" },

                { from: "./src/app/assets/kasco-wing/images/default-profile-pic.png", to: "./assets/kasco-wing/images/default-profile-pic.png" },
                { from: "./src/app/assets/kasco-wing/images/default-profile-pic.png", to: "./assets/default-profile-pic.png" },
                { from: "./src/app/styles/kascowing/fonts/icomoon.ttf", to: "./styles/kascowing/fonts/icomoon.ttf" },
                { from: "./src/app/styles/kascowing/fonts/icomoon.woff", to: "./styles/kascowing/fonts/icomoon.woff" },

                { from: "./src/app/fontawesome/v5.15.1/webfonts/free-fa-regular-400.ttf", to: "./fontawesome/v5.15.1/webfonts/free-fa-regular-400.ttf" },
                { from: "./src/app/fontawesome/v5.15.1/webfonts/free-fa-regular-400.woff", to: "./fontawesome/v5.15.1/webfonts/free-fa-regular-400.woff" },
                { from: "./src/app/fontawesome/v5.15.1/webfonts/free-fa-regular-400.woff2", to: "./fontawesome/v5.15.1/webfonts/free-fa-regular-400.woff2" },
                { from: "./src/app/fontawesome/v5.15.1/webfonts/free-fa-solid-900.ttf", to: "./fontawesome/v5.15.1/webfonts/free-fa-solid-900.ttf" },
                { from: "./src/app/fontawesome/v5.15.1/webfonts/free-fa-solid-900.woff", to: "./fontawesome/v5.15.1/webfonts/free-fa-solid-900.woff" },
                { from: "./src/app/fontawesome/v5.15.1/webfonts/free-fa-solid-900.woff2", to: "./fontawesome/v5.15.1/webfonts/free-fa-solid-900.woff2" },

                { from: "./src/app/assets/kasco-wing/iconmoon-files/icomoon1.ttf", to: "./assets/kasco-wing/iconmoon-files/icomoon1.ttf" },
                { from: "./src/app/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2", to: "./bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2" },
                { from: "./src/app/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff", to: "./bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff" },
                { from: "./src/app/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf", to: "./bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf" },

                { from: "./src/app/assets/kasco-wing/vendor/flot/jquery.flot.min.js", to: "./assets/kasco-wing/vendor/flot/jquery.flot.min.js" },
                { from: "./src/app/assets/kasco-wing/vendor/flot/jquery.flot.pie.js", to: "./assets/kasco-wing/vendor/flot/jquery.flot.pie.js" },
                { from: "./src/app/assets/kasco-wing/vendor/flot/jquery.flot.pie.min.js", to: "./assets/kasco-wing/vendor/flot/jquery.flot.pie.min.js" },
                { from: "./src/app/assets/kasco-wing/vendor/flot/jquery.flot.tooltip.min.js", to: "./assets/kasco-wing/vendor/flot/jquery.flot.tooltip.min.js" },
                { from: "./src/app/assets/kasco-wing/javascripts/datepicker/css/daterangepicker.min.js", to: "./assets/kasco-wing/javascripts/datepicker/css/daterangepicker.min.js" },


                { from: "./src/app/jquery-2.1.1.min.js", to: "./jquery-2.1.1.min.js" },
                { from: "./src/app/jquery-ui.min.js", to: "./jquery-ui.min.js" },
                { from: "./src/app/angular.min.js", to: "./angular.min.js" },
                { from: "./src/app/sortable.js", to: "./sortable.js" },
                { from: "./src/app/assets/Scripts/jquery.signalR.min.js", to: "./assets/Scripts/jquery.signalR.min.js" },
                { from: "./src/app/node_modules/bootstrap/dist/css/bootstrap-grid.css", to: "./node_modules/bootstrap/dist/css/bootstrap-grid.css" },
                { from: "./src/app/node_modules/bootstrap/dist/css/bootstrap-grid.min.css", to: "./node_modules/bootstrap/dist/css/bootstrap-grid.min.css" },
                { from: "./src/app/node_modules/bootstrap/dist/css/bootstrap-reboot.css", to: "./node_modules/bootstrap/dist/css/bootstrap-reboot.css" },
                { from: "./src/app/node_modules/bootstrap/dist/css/bootstrap-reboot.min.css", to: "./node_modules/bootstrap/dist/css/bootstrap-reboot.min.css" },
                { from: "./src/app/node_modules/bootstrap/dist/css/bootstrap.css", to: "./node_modules/bootstrap/dist/css/bootstrap.css" },
                { from: "./src/app/node_modules/bootstrap/dist/css/bootstrap.min.css", to: "./node_modules/bootstrap/dist/css/bootstrap.min.css" },
                { from: "./src/app/assets/css/bootstrap.css", to: "./assets/css/bootstrap.css" },
                { from: "./src/app/styles/css/app.css", to: "./styles/css/app.css" },
                //Theme KascoWing
                { from: "./src/app/styles/kascowing/kw-styles.css", to: "./styles/kascowing/kw-styles.css" },
                { from: "./src/app/styles/kascowing/size-styles.css", to: "./styles/kascowing/size-styles.css" },
                { from: "./src/app/styles/kascowing/fonts/Prompt/stylefontPrompt.css", to: "./styles/kascowing/fonts/Prompt/stylefontPrompt.css" },
                { from: "./src/app/styles/kascowing/fonts/Prompt/Prompt-Regular.ttf", to: "./styles/kascowing/fonts/Prompt/Prompt-Regular.ttf" },
                //************************************************************ POpOz มีผลกับ Menu ************************************************************ -->
                { from: "./src/app/bower_components/bootstrap/dist/css/bootstrap.css", to: "./bower_components/bootstrap/dist/css/bootstrap.css" },
                //Theme CSS -->
                { from: "./src/app/assets/kasco-wing/stylesheets/theme.css", to: "./assets/kasco-wing/stylesheets/theme.css" },
                { from: "./src/app/assets/kasco-wing/vendor/morris/morris.css", to: "./assets/kasco-wing/vendor/morris/morris.css" },
                //{ from: "./src/app/assets/kasco-wing/vendor/bootstrap/css/bootstrap.css", to: "./" }, -->
                { from: "./src/app/assets/kasco-wing/javascripts/datepicker/css/daterangepicker.css", to: "./assets/kasco-wing/javascripts/datepicker/css/daterangepicker.css" },
                { from: "./src/app/assets/kasco-wing/vendor/bootstrap-multiselect/bootstrap-multiselect.css", to: "./assets/kasco-wing/vendor/bootstrap-multiselect/bootstrap-multiselect.css" },
                { from: "./src/app/assets/kasco-wing/iconmoon-files/styleicon.css", to: "./assets/kasco-wing/iconmoon-files/styleicon.css" },
                { from: "./src/app/styles/kascowing/fonts/styleIcon/styleicon.css", to: "./styles/kascowing/fonts/styleIcon/styleicon.css" },



                { from: "./src/app/assets/kasco-wing/vendor/bootstrap-multiselect/bootstrap-multiselect.js", to: "./assets/kasco-wing/vendor/bootstrap-multiselect/bootstrap-multiselect.js" },
                { from: "./src/app/assets/kasco-wing/javascripts/theme.js", to: "./assets/kasco-wing/javascripts/theme.js" },
                //Theme Custom -->
                { from: "./src/app/assets/kasco-wing/javascripts/theme.custom.js", to: "./assets/kasco-wing/javascripts/theme.custom.js" },
                //Theme Initialization Files -->
                { from: "./src/app/assets/kasco-wing/javascripts/theme.init.js", to: "./assets/kasco-wing/javascripts/theme.init.js" },
                { from: "./src/app/assets/kasco-wing/vendor/morris/morris.js", to: "./assets/kasco-wing/vendor/morris/morris.js" },
                { from: "./src/app/assets/kasco-wing/vendor/raphael/raphael.js", to: "./assets/kasco-wing/vendor/raphael/raphael.js" },
                { from: "./src/app/assets/kasco-wing/vendor/modernizr/modernizr.js", to: "./assets/kasco-wing/vendor/modernizr/modernizr.js" },
                { from: "./src/app/bower_components/angular/angular.js", to: "./bower_components/angular/angular.js" },
                { from: "./src/app/bower_components/angular-ui-router/release/angular-ui-router.min.js", to: "./bower_components/angular-ui-router/release/angular-ui-router.min.js" },
                { from: "./src/app/bower_components/angular-local-storage/dist/angular-local-storage.min.js", to: "./bower_components/angular-local-storage/dist/angular-local-storage.min.js" },
                { from: "./src/app/bower_components/angular-animate/angular-animate.min.js", to: "./bower_components/angular-animate/angular-animate.min.js" },
                { from: "./src/app/bower_components/angular-aria/angular-aria.min.js", to: "./bower_components/angular-aria/angular-aria.min.js" },
                { from: "./src/app/bower_components/angular-filter/dist/angular-filter.min.js", to: "./bower_components/angular-filter/dist/angular-filter.min.js" },
                { from: "./src/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js", to: "./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js" },
                { from: "./src/app/bower_components/angular-translate/angular-translate.js", to: "./bower_components/angular-translate/angular-translate.js" },
                { from: "./src/app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js", to: "./bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js" },
                { from: "./src/app/bower_components/angular-chips/dist/angular-chips.min.js", to: "./bower_components/angular-chips/dist/angular-chips.min.js" },
                { from: "./src/app/bower_components/angular-chips-master/dist/angular-chips.min.js", to: "./bower_components/angular-chips-master/dist/angular-chips.min.js" },
                //google Map-->
                { from: "./src/app/bower_components/ngmap/ng-map.js", to: "./bower_components/ngmap/ng-map.js" },
                //Upload file -->
                { from: "./src/app/bower_components/src/isteven-multi-select.js", to: "./bower_components/src/isteven-multi-select.js" },
                { from: "./src/app/bower_components/moment/moment.js", to: "./bower_components/moment/moment.js" },
                { from: "./src/app/bower_components/angular-moment/angular-moment.js", to: "./bower_components/angular-moment/angular-moment.js" },
                { from: "./src/app/bower_components/moment/locale/th.js", to: "./bower_components/moment/locale/th.js" },
                //Calendar assests-->
                { from: "./src/app/bower_components/angular-ui-calendar/src/calendar.js", to: "./bower_components/angular-ui-calendar/src/calendar.js" },
                { from: "./src/app/bower_components/fullcalendar/dist/fullcalendar.js", to: "./bower_components/fullcalendar/dist/fullcalendar.js" },
                { from: "./src/app/bower_components/fullcalendar/dist/gcal.js", to: "./bower_components/fullcalendar/dist/gcal.js" },
                //angular datatables -->
                { from: "./src/app/bower_components/chart.js/dist/Chart.min.js", to: "./bower_components/chart.js/dist/Chart.min.js" },
                { from: "./src/app/bower_components/angular-chart.js/dist/angular-chart.min.js", to: "./bower_components/angular-chart.js/dist/angular-chart.min.js" },
                { from: "./src/app/bower_components/angular-qrcode/angular-qrcode.js", to: "./bower_components/angular-qrcode/angular-qrcode.js" },
                { from: "./src/app/bower_components/qrcode-generator/js/qrcode.js", to: "./bower_components/qrcode-generator/js/qrcode.js" },
                { from: "./src/app/bower_components/qrcode-generator/js/qrcode_UTF8.js", to: "./bower_components/qrcode-generator/js/qrcode_UTF8.js" },
                { from: "./src/app/angular-ui-utils.min.js", to: "./angular-ui-utils.min.js" },
                { from: "./src/app/bower_components/ng-json-explorer/dist/angular-json-explorer.min.js", to: "./bower_components/ng-json-explorer/dist/angular-json-explorer.min.js" },
                { from: "./src/app/bower_components/ng-json-explorer/dist/angular-json-explorer.css", to: "./bower_components/ng-json-explorer/dist/angular-json-explorer.css" },
                //Angular Modules -->

                { from: "./src/app/bower_components/json-excel/json-export-excel.min.js", to: "./bower_components/json-excel/json-export-excel.min.js" },
                { from: "./src/app/bower_components/fileSaver/FileSaver.min.js", to: "./bower_components/fileSaver/FileSaver.min.js" },
                { from: "./src/app/bower_components/angular-drag/angular-dragdrop.min.js", to: "./bower_components/angular-drag/angular-dragdrop.min.js" },
                //assets library -->

                { from: "./src/app/assets/totalsummaryrow/totalsumrow.js", to: "./assets/totalsummaryrow/totalsumrow.js" },
                { from: "./src/app/assets/signaturePad/app.js", to: "./assets/signaturePad/app.js" },
                //Load filters -->

                { from: "./src/app/assets/kasco-wing/javascripts/oauth-1.0a/oauth-1.0a.js", to: "./assets/kasco-wing/javascripts/oauth-1.0a/oauth-1.0a.js" },
                { from: "./src/app/assets/kasco-wing/javascripts/crypto/aes.js", to: "./assets/kasco-wing/javascripts/crypto/aes.js" },
                { from: "./src/app/assets/kasco-wing/javascripts/crypto/hmac-sha256.js", to: "./assets/kasco-wing/javascripts/crypto/hmac-sha256.js" },
                { from: "./src/app/assets/kasco-wing/javascripts/crypto/hmac-sha1.js", to: "./assets/kasco-wing/javascripts/crypto/hmac-sha1.js" },
                //************************************************************ POpOz Directive ************************************************************ -->

                //************************************************************ POpOz Context Menu ************************************************************ -->
                { from: "./src/app/bower_components/ng-context-menu/dist/ng-context-menu.min.js", to: "./bower_components/ng-context-menu/dist/ng-context-menu.min.js" },

                //Master data module -->			
                { from: "./src/app/assets/kasco-wing/javascripts/datepicker/css/daterangepicker.min.js", to: "./assets/kasco-wing/javascripts/datepicker/css/daterangepicker.min.js" },
                { from: "./src/app/bower_components/angular/angular.js", to: "./bower_components/angular/angular.js" },
                { from: "./src/app/bower_components/moment/moment.js", to: "./bower_components/moment/moment.js" },
                { from: "./src/app/bower_components/bootstrap-daterangepicker/daterangepicker.js", to: "./bower_components/bootstrap-daterangepicker/daterangepicker.js" },
                { from: "./src/app/bower_components/angular-daterangepicker/js/angular-daterangepicker.js", to: "./bower_components/angular-daterangepicker/js/angular-daterangepicker.js" },
                { from: "./src/app/pdfmake.min.js", to: "./pdfmake.min.js" },
                { from: "./src/app/vfs_fonts.js", to: "./vfs_fonts.js" },
                { from: "./src/app/html2canvas.min.js", to: "./html2canvas.min.js" },
                { from: "./src/app/popper.min.js", to: "./popper.min.js" },
                { from: "./src/app/jszip.js", to: "./jszip.js" },
                { from: "./src/app/xlsx.js", to: "./xlsx.js" },
                { from: "./src/app/alasql.min.js", to: "./alasql.min.js" },
                { from: "./src/app/bootstrap.min.js", to: "./bootstrap.min.js" },
            ],
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};