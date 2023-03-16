module.exports = function (app) {
    app.constant('logopath2', './assets/mobilyst_logo2.svg');

    let urlSite = "";
    let urlMobileSite = "";
    let urlTrackandTrace = "";
    // let httpsON = false;
    let site = "MTD"; //เปลี่ยนตรงนี้นะ อย่าซนนน เปลี่ยนข้างล่างง มันงง

    if (site == 'MTD_PROD') {
        urlSite = "https://mobilysttech-uat.inet.co.th/api-tms-mtd/";
        urlMobileSite = "https://mobilysttech-uat.inet.co.th/api-mbtp/";
        urlTrackandTrace = "https://mobilysttech-uat.inet.co.th/web-tms-mtd/standard/#/";
    } else if (site == 'MTD') {
        urlSite = "http://203.151.215.171/api-mtd-std/";
        urlMobileSite = "https://mobilysttech-uat.inet.co.th/api-mbtp/";
        urlTrackandTrace = "http://203.151.215.171/tms-mtd-std/#/";
    }

    app.constant('urlSite', urlSite);
    app.constant('urlTrackandTrace', urlTrackandTrace);
    const _webServiceAPI = urlSite + 'MC-SVC-TMS-STD/api/'
    app.constant('webServiceAPI', _webServiceAPI);
    app.constant('webServiceAPI2', urlSite + 'MC-SVC-CONTRACT/api/');
    app.constant('webServiceAPIMaster', urlSite + 'MC-SVC-Master/api/');
    app.constant('webServiceAPITransport', urlSite + 'MC-SVC-TRANSPORT/api/');
    app.constant('webServiceAPIMobile', urlSite + 'MC-SVC-TMS-STD/api/tmsstd/Mobilys/');
    app.constant('webServiceAPImobile2', urlMobileSite + 'TransportWebPotal.API/');
    app.constant('webServiceAPImobileAuth', urlMobileSite + 'Authentication.API/');
    app.constant('webServiceAPImobileIP', 'mobilysttech-uat.inet.co.th');




    app.constant('webServiceAPI2test', 'https://localhost:44346/api/');
    app.constant('systemInfo', {
        title: 'Register and Authentication System',
        login: 'Register and Authentication System',
        name: 'Register and Authentication System',
        menuPath: 'http://203.151.56.165/TP/DEV/MC-WEB-TMS/app/img/kasco.png',
        loadingPath: './assets/processing.gif',
        pdfPath: 'http://localhost:63483/',
        tableSizeDefault: 'L',
        tableSizeList: [{
            value: 'L',
            display: 'S_LOW'
        },
        {
            value: 'M',
            display: 'S_MEDIUM'
        },
        {
            value: 'H',
            display: 'S_HIGH'
        }
        ],
        dateNow: function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            today = yyyy.toString() + mm.toString() + dd.toString();
            return today;
        },
        dateTimeNow: function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            var hour = today.getHours();
            var minute = today.getMinutes();
            var second = today.getSeconds();
            if (hour < 10)
                hour = '0' + hour
            if (minute < 10)
                minute = '0' + minute
            if (second < 10)
                second = '0' + second
            if (dd < 10)
                dd = '0' + dd
            if (mm < 10)
                mm = '0' + mm
            today = yyyy.toString() + mm.toString() + dd.toString() + hour.toString() + minute.toString() + second.toString();
            return today;
        },
        dateEndNow: function (param) {
            var mm = param.substring(4, 2);
            var yyyy = param.substring(0, 4);
            var dd = new Date(yyyy, mm, 0).getDate();
            today = yyyy.toString() + mm.toString() + dd.toString();
            // return today;
            return today;
        },
        monthNow: function () {
            var today = new Date();
            return today.getMonth() + 1;;
        },
        yearNow: function () {
            var today = new Date();
            return today.getFullYear();;
        },
        chkAge: function (getDate) {
            console.log(getDate);
            var today = new Date(),
                result = {
                    years: 0,
                    months: 0,
                    days: 0,
                    toString: function () {
                        return (this.years + ' Year ') +
                            (this.months + ' Month ');
                    }
                };
            result.months =
                ((today.getFullYear() * 12) + (today.getMonth() + 1)) -
                ((parseInt(getDate.substring(0, 4)) * 12) + (parseInt(getDate.substring(4, 6))));
            if (0 > (result.days = today.getDate() - parseInt(getDate.substring(6, 8)))) {
                var y = today.getFullYear(),
                    m = today.getMonth();
                m = (--m < 0) ? 11 : m;
                result.days += [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m] +
                    (((1 == m) && ((y % 4) == 0) && (((y % 100) > 0) || ((y % 400) == 0))) ?
                        1 : 0);
                --result.months;
            }
            result.years = (result.months - (result.months % 12)) / 12;
            result.months = (result.months % 12);
            return result;
        },
        convertCurrency: function (val, fixDigit) {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: fixDigit
            }).format(parseFloat(val).toFixed(3))
        }
    })

    app.constant('authenConstant', {
        url: 'Account/AD/Token',
    });
    app.constant('refreshTokenConstant', {
        url: 'Account/RefreshToken',
    });
    app.constant('ngAuthSettings', {
        WebService: 'http://175.176.221.140/TMS.API/api/',
        rootUrl: '',
        WebClient: '',
        ClientDirective: '',
        clientId: 'id',
        directory: {
            directive: '',
            modules: '',
            assets: '',
            widgets: ''
        }
    });
    app.constant('ngLangauge', [{
        id: 1,
        lang: "en",
        name: "EN"
    },
    {
        id: 2,
        lang: "th",
        name: "TH"
    }
    ]);
    var apiDirectory = {
        production: 'http://10.56.2.210/AUTH/api/',
        local: 'http://10.56.2.200/AUTH/api/',
        dev: 'http://10.211.55.4:24988/api/',
        devOMS: 'http://localhost:64435/api/',
    };
    var _urlDirectory = apiDirectory.dev;
    app.constant('directoryModulePath', 'modules/ModuleDirectotry/');
    app.constant('webServiceDirectory', _urlDirectory);


    app.constant('trackandtracebg', './assets/trackandtrace.png');
    app.constant('imgstatus', './assets/tracking/');
    app.constant('imgwarroom', './assets/warroom/');

    ///////// Set API V2 /////////////

    const _webServiceAPIREPORT = urlSite + 'MC-SVC-REPORT/api/'
    const _webServiceAPI_REPORT = urlSite + 'Report/api/'
    const _webServiceAPI_OrderManagement = urlSite + "Order-Management/api/"
    const _webServiceAPI_MASTER = urlSite + "MC-SVC-MASTER/api/"
    const _webServiceAPI_DRIVER = urlSite + "MC-SVC-DRIVER/api/"
    const _webServiceAPI_BILLING = urlSite + "billing/api/"
    const _webServiceAPI_TM = urlSite + "Transport-Manifest/api/"
    const _webServiceAPI_IMPORT = urlSite + "Import-Excel/api/"
    const _webServiceAPI_VEHICLE = urlSite + "MC-SVC-VEHICLE/api/"
    const _webServiceAPI_TRANSPORT = urlSite + "MC-SVC-TRANSPORT/api/"
    const _webServiceAPI_autosuggest = urlSite + "autosuggest/api/"


    // const _webServiceAPI_INTERFACE = urlSite + "interface/api/"


    const _APIStore = {

        // Master
        owner: { api: _webServiceAPI_MASTER, path: "Owner/" },
        ownertype: { api: _webServiceAPI_MASTER, path: "OwnerType/" },
        country: { api: _webServiceAPI_MASTER, path: "Country/" },
        subroutepostcode: { api: _webServiceAPI_MASTER, path: "SubRoutePostCode/" },
        distributioncenter: { api: _webServiceAPI_MASTER, path: "DistributionCenter/" },
        producttype: { api: _webServiceAPI_MASTER, path: "ProductType/" },
        subroute: { api: _webServiceAPI_MASTER, path: "subroute/" },
        businessmodel: { api: _webServiceAPI_MASTER, path: "businessmodel/" },
        transportjobtype: { api: _webServiceAPI_MASTER, path: "transportJobtype/" },
        volume: { api: _webServiceAPI_MASTER, path: "Volume/" },
        productconversion: { api: _webServiceAPI_MASTER, path: "ProductConversion/" },
        documenttype: { api: _webServiceAPI_MASTER, path: "documentType/" },
        transportmodel: { api: _webServiceAPI_MASTER, path: "transportModel/" },
        shipper: { api: _webServiceAPI_MASTER, path: "Shipper/" },
        transportdirectiontype: { api: _webServiceAPI_MASTER, path: "transportDirectionType/" },
        processstatus: { api: _webServiceAPI_MASTER, path: "processstatus/" },
        distributioncentertype: { api: _webServiceAPI_MASTER, path: "DistributionCenterType/" },
        transit_hub: { api: _webServiceAPI_MASTER, path: "transit_hub/" },
        province: { api: _webServiceAPI_MASTER, path: "Province/" },
        cargotype: { api: _webServiceAPI_MASTER, path: "cargoType/" },
        district: { api: _webServiceAPI_MASTER, path: "District/" },
        subdistrict: { api: _webServiceAPI_MASTER, path: "subDistrict/" },
        transportregion: { api: _webServiceAPI_MASTER, path: "TransportRegion/" },
        bank: { api: _webServiceAPI_MASTER, path: "bank/" },
        freightkind: { api: _webServiceAPI_MASTER, path: "FreightKind/" },

        //TRANSPORT
        auto_suggestion: { api: _webServiceAPI_autosuggest, path: "suggest/" },
        customer_shipping_location_setting: { api: _webServiceAPI_TRANSPORT, path: "Customer_Shipping_Location_Setting/" },
        transportcontract: { api: _webServiceAPI_TRANSPORT, path: "transportcontract/" },
        servicelevel: { api: _webServiceAPI_TRANSPORT, path: "servicelevel/" },
        servicepackage: { api: _webServiceAPI_TRANSPORT, path: "servicepackage/" },
        servicepackageprice: { api: _webServiceAPI_TRANSPORT, path: "servicepackageprice/" },
        transportfuelprice: { api: _webServiceAPI_TRANSPORT, path: "transportfuelprice/" },
        transportfuelprice_gap: { api: _webServiceAPI_TRANSPORT, path: "transportfuelprice_gap/" },
        servicecharge: { api: _webServiceAPI_TRANSPORT, path: "servicecharge/" },
        log_report: { api: _webServiceAPI_TRANSPORT, path: "log_report/" },
        transporttransaction: { api: _webServiceAPI_TRANSPORT, path: "transaction/" },


        //interface
        // interface: { api: _webServiceAPI_INTERFACE, path: "interface/" },

        // Driver
        driver: { api: _webServiceAPI_DRIVER, path: "driver/" },
        subdriver: { api: _webServiceAPI_DRIVER, path: "subdriver/" },
        divertype: { api: _webServiceAPI_DRIVER, path: "driverType/" },

        //Vehicle
        vehicle: { api: _webServiceAPI, path: "tmsstd/vehicle/" },
        vehicletype: { api: _webServiceAPI, path: "tmsstd/vehicletype/" },
        tail: { api: _webServiceAPI, path: "tmsstd/tail/" },
        tailtype: { api: _webServiceAPI, path: "tmsstd/tailtype/" },
        vehicleowner: { api: _webServiceAPI_VEHICLE, path: "VehicleOwner/" },
        vehiclecompany: { api: _webServiceAPI, path: "tmsstd/VehicleCompany/" },
        brand: { api: _webServiceAPI, path: "tmsstd/brand/" },
        fuelvehicle: { api: _webServiceAPI, path: "tmsstd/fuelvehicle/" },
        engine: { api: _webServiceAPI, path: "tmsstd/engine/" },
        suggestion: { api: _webServiceAPI_VEHICLE, path: "Suggestion/" },

        // Order Management
        transportorder: { api: _webServiceAPI, path: "tmsstd/TransportOrder/" },
        transportproblem: { api: _webServiceAPI, path: "tmsstd/TransportProblem/" },
        source_dc: { api: _webServiceAPI, path: "tmsstd/source_dc/" },
        tracking: { api: _webServiceAPI, path: "tmsstd/tracking/" },
        jobsolution: { api: _webServiceAPI, path: "tmsstd/JobSolution/" },
        jobproblemtype: { api: _webServiceAPI, path: "tmsstd/JobProblemType/" },
        jobproblem: { api: _webServiceAPI, path: "tmsstd/JobProblem/" },
        transaction: { api: _webServiceAPI, path: "tmsstd/transaction/" },
        transport_charge_amount: { api: _webServiceAPI, path: "tmsstd/transport_charge_amount/" },
        transithub: { api: _webServiceAPI, path: "tmsstd/transit_hub/" },
        return_over_flow: { api: _webServiceAPI, path: "tmsstd/return_over_flow/" },
        confirmjob: { api: _webServiceAPI, path: "tmsstd/ConfirmJob/" },
        return_job: { api: _webServiceAPI, path: "tmsstd/return_job/" },
        transit_hub2: { api: _webServiceAPI, path: "tmsstd/transit_hub/" },

        //Billing
        Transportcod: { api: _webServiceAPI_BILLING, path: "TransportCOD/" },
        transportamount: { api: _webServiceAPI_BILLING, path: "transportamount/" },
        transfer_back: { api: _webServiceAPI_BILLING, path: "transfer_back/" },
        transportamountbybranch: { api: _webServiceAPI_BILLING, path: "transportamountbybranch/" },
        invoice_non_cod: { api: _webServiceAPI_BILLING, path: "invoice_non_cod/" },

        //Transport Manifest
        transportmanifest: { api: _webServiceAPI_TM, path: "TransportManifest/" },
        paymentvoucher: { api: _webServiceAPI_TM, path: "paymentvoucher/" },
        pod_manual: { api: _webServiceAPI_TM, path: "pod_manual/" },
        assigntransport: { api: _webServiceAPI_TM, path: "AssignTransport/" },
        deliverymessger: { api: _webServiceAPI_TM, path: "DeliveryMessger/" },
        booking_vehicle: { api: _webServiceAPI_TM, path: "booking_vehicle/" },
        transaction: { api: _webServiceAPI_OrderManagement, path: "transaction/" },
        interfaceTM: { api: _webServiceAPI_TM, path: "interface/" },

        // import
        // imports: { api: _webServiceAPI_IMPORT, path: "imports/" },
        imports_excel: { api: _webServiceAPI_IMPORT, path: "imports_excel/" },


        // ETC ม่ายรู้ๆ 
        customershippinglocation: { api: _webServiceAPI, path: "tmsstd/CustomerShippingLocation/" },
        customershipping: { api: _webServiceAPI, path: "tmsstd/CustomerShipping/" },
        waypoint: { api: _webServiceAPI, path: "tmsstd/waypoint/" },
        transit_hub: { api: _webServiceAPI, path: "tmsstd/transit_hub/" },
        cal_cod_price: { api: _webServiceAPI, path: "tmsstd/cal_cod_price/" },
        activitytype: { api: _webServiceAPI, path: "tmsstd/activitytype/" },
        route: { api: _webServiceAPI, path: "tmsstd/route/" },
        product: { api: _webServiceAPI, path: "tmsstd/Product/" },
        shipping_cost: { api: _webServiceAPI, path: "tmsstd/shipping_cost/" },
        usergroup: { api: _webServiceAPI, path: "tmsstd/userGroup/" },
        title: { api: _webServiceAPI, path: "tmsstd/title/" },
        drivertitle: { api: _webServiceAPI, path: "tmsstd/Drivertitle/" },
        driverlicensetype: { api: _webServiceAPI, path: "tmsstd/DriverLicenseType/" },
        licensetype: { api: _webServiceAPI, path: "tmsstd/DriverLicenseType/" },
        topic: { api: _webServiceAPI, path: "tmsstd/topic/" },
        vehiclecompanytype: { api: _webServiceAPI, path: "tmsstd/VehicleCompanyType/" },
        distributioncenter_hub: { api: _webServiceAPI, path: "tmsstd/DistributionCenter_hub/" },
        boxsize: { api: _webServiceAPI, path: "tmsstd/Boxsize/" },
        trip: { api: _webServiceAPI, path: "tmsstd/trip/" },
        container: { api: _webServiceAPI, path: "tmsstd/container/" },
        rgt: { api: _webServiceAPI, path: "rgt/" },
        transport_charge_type: { api: _webServiceAPI, path: "tmsstd/Transport_Charge_Type/" },
        reporttpsticker: { api: _webServiceAPI, path: "tmsstd/ReportTPSticker/" },
        reportai_to: { api: _webServiceAPI, path: "tmsstd/ReportAI_TO/" },
        reporttpprintout: { api: _webServiceAPI, path: "tmsstd/ReportTPprintout/" },
        report: { api: _webServiceAPI, path: "tmsstd/Report/" },
        transport_sla: { api: _webServiceAPI, path: "tmsstd/Transport_SLA/" },
        config_transport_sla: { api: _webServiceAPI, path: "tmsstd/Config_Transport_SLA/" },
        truckconfiguration: { api: _webServiceAPI, path: "tmsstd/TruckConfiguration/" },
        containertype: { api: _webServiceAPI, path: "tmsstd/containerType/" },
        booking: { api: _webServiceAPI, path: "tmsstd/booking/" },
        freightkind: { api: _webServiceAPI, path: "tmsstd/FreightKind/" },
        transportmanifestdriver: { api: _webServiceAPI, path: "tmsstd/TransportManifestDriver/" },
        interface: { api: _webServiceAPI, path: "tmsstd/interface/" },
        guid: { api: _webServiceAPI, path: "tmsstd/guid/" },
        imports: { api: _webServiceAPI, path: "tmsstd/imports/" },


    }

    app.constant('APIStore', _APIStore);
    ///////////////////////////
}