webpackJsonp([3],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../ionic-qr-code-scanner-app/ionic-qr-code-scanner-app/pages/textview/textview.module": [
		275,
		1
	],
	"../ionic-qr-code-scanner-app/pages/textview/textview.module": [
		274,
		0
	],
	"../pages/textview/textview.module": [
		273,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 152;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_qr_scanner__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_streaming_media__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__textview_textview__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = (function () {
    function HomePage(network, platform, toastCtrl, dataService, iab, navCtrl, qrScanner, sqlite, streamingMedia, zone) {
        var _this = this;
        this.network = network;
        this.toastCtrl = toastCtrl;
        this.dataService = dataService;
        this.iab = iab;
        this.navCtrl = navCtrl;
        this.qrScanner = qrScanner;
        this.sqlite = sqlite;
        this.streamingMedia = streamingMedia;
        this.zone = zone;
        this.toggoleShowHide = true;
        this.dataTable = "CREATE TABLE IF NOT EXISTS scannerData (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        scan_id INTEGER ,\n        type INTEGER,\n        answer TEXT,\n        sortOrder INTEGER) ";
        this.dataList = [];
        this.recordAvailable = false;
        this.edited = false;
        this.connectionAvailable = false;
        this.toggoleShowHide = true;
        platform.ready().then(function () {
            _this.sortOrder = 0;
            _this.scanTextCheck = " ";
            _this.scannedText = "";
            //this.testDataFunction();
            _this.network.onConnect().subscribe(function () {
                _this.connectionAvailable = true;
            });
            _this.network.onDisconnect().subscribe(function () {
                _this.connectionAvailable = false;
            });
            if (network.type === 'none')
                _this.connectionAvailable = false;
            else {
                _this.connectionAvailable = true;
            }
            _this.initDatabase();
            _this.edited = false;
            _this.textToDisplay = "";
            //this.showButton();  
        });
    }
    HomePage.prototype.ionViewDidEnter = function () {
        this.toggoleShowHide = true;
    };
    HomePage.prototype.itemClicked = function () {
        this.toggoleShowHide = false;
        this.scan();
    };
    HomePage.prototype.testDataFunction = function () {
        var _this = this;
        this.dataService.getMessages().subscribe(function (data) {
            _this.dataList = data;
            for (var _i = 0, _a = _this.dataList; _i < _a.length; _i++) {
                var entry = _a[_i];
                console.log("" + entry.scan_id);
            }
        });
    };
    HomePage.prototype.checkInternet = function () {
        return this.connectionAvailable;
    };
    HomePage.prototype.showButton = function () {
        this.toggoleShowHide = true;
    };
    HomePage.prototype.initDatabase = function () {
        var _this = this;
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        }).then(function (db) {
            _this.myDatabase = db;
            _this.myDatabase.executeSql(_this.dataTable, {}).then(function () {
                _this.getDataFromServer();
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    HomePage.prototype.getDataFromServer = function () {
        var _this = this;
        this.dataService.getMessages().subscribe(function (data) {
            _this.dataList = data;
            _this.deleteFromdatabase();
        });
    };
    HomePage.prototype.deleteFromdatabase = function () {
        var _this = this;
        this.myDatabase.executeSql('DELETE FROM scannerData', {}).then(function () {
            console.log('Executed SQL Table Empty');
            _this.addToDataBase();
        }).catch(function (e) { return console.log(e); });
    };
    HomePage.prototype.addToDataBase = function () {
        //let i = 1;
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var entry = _a[_i];
            console.log(entry.answer);
            this.myDatabase.executeSql("insert into scannerData(scan_id,type,answer,sortOrder) values (?,?,?,?)", [entry.scan_id, entry.type, entry.answer, entry.sort]);
            // i++;
        }
    };
    HomePage.prototype.scan = function () {
        var _this = this;
        this.qrScanner.prepare()
            .then(function (status) {
            if (status.authorized) {
                // camera permission was granted
                console.log("Authorized");
                // start scanning
                var scanSub_1 = _this.qrScanner.scan().subscribe(function (text) {
                    console.log("Scanned");
                    console.log(text);
                    _this.qrScanner.hide(); // hide camera preview
                    scanSub_1.unsubscribe(); // stop scanning
                    if (text == _this.scannedText) {
                        _this.sortOrder += 1;
                    }
                    else {
                        _this.scannedText = text;
                        _this.sortOrder = 1;
                    }
                    // this.showButton();
                    _this.lookIntoDatabase();
                });
                //show camera preview
                _this.qrScanner.show();
                //wait for user to scan something, then the observable callback will be called
            }
            else if (status.denied) {
                console.log("Denied");
                // camera permission was permanently denied
                // you must use QRScanner.openSettings() method to guide the user to the settings page
                // then they can grant the permission from there
            }
            else {
                console.log("Denied temp");
            }
        })
            .catch(function (e) { return console.log('Error is', e); });
    };
    HomePage.prototype.lookIntoDatabase = function () {
        var _this = this;
        this.myDatabase.executeSql('SELECT * FROM scannerData where scan_id = ?', [+this.scannedText]).then(function (data) {
            if (data.rows.length > 0) {
                var flag = 0;
                for (var x = 0; x < data.rows.length; x++) {
                    if (data.rows.item(x).sortOrder == _this.sortOrder) {
                        _this.myType = data.rows.item(x).type + "";
                        _this.myText = data.rows.item(x).answer + "";
                        flag = 1;
                    }
                }
                /* if(flag == 0){
                     this.sortOrder = 0;
                     this.myType = data.rows.item(0).type+"";
                     this.myText = data.rows.item(0).answer+"";
                 }*/
                _this.doSomeThingWithData();
            }
            else {
                _this.recordAvailable = false;
                _this.presentToast("Product Not Found!");
                _this.showButton();
            }
        });
    };
    HomePage.prototype.doSomeThingWithData = function () {
        if (this.myType == "1") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__textview_textview__["a" /* TextviewPage */], {
                first: this.myText
            });
        }
        else if (this.checkInternet()) {
            if (this.myType == "2") {
                var tempArray = this.myText.split('.');
                var len = tempArray.length;
                if (tempArray[len - 1] == "mp4" || tempArray[len - 1] == "mkv" || tempArray[len - 1] == "flv") {
                    this.playVideo();
                }
                else {
                    this.openLinkInBrowser();
                }
            }
            if (this.myType == "3") {
                this.playAudio();
            }
            if (this.myType == "4") {
                this.openLinkInBrowser();
            }
        }
        else {
            this.presentToast("Internet Not Available!");
            this.showButton();
        }
    };
    HomePage.prototype.playVideo = function () {
        var _this = this;
        var options = {
            successCallback: function () { _this.showButton(); },
            errorCallback: function (e) {
                _this.presentToast("Error Playing Video!");
                _this.showButton();
            },
            orientation: 'landscape'
        };
        this.streamingMedia.playVideo(this.myText, options);
    };
    HomePage.prototype.stopPlayingAudio = function () {
        this.streamingMedia.stopAudio();
    };
    HomePage.prototype.playAudio = function () {
        var _this = this;
        var options = {
            successCallback: function () { _this.showButton(); },
            errorCallback: function (e) {
                _this.presentToast("Error Playing Audio!");
                _this.showButton();
            },
            initFullscreen: true,
        };
        this.streamingMedia.playAudio(this.myText, options);
    };
    HomePage.prototype.openLinkInBrowser = function () {
        var _this = this;
        var browser = this.iab.create(this.myText);
        this.zone.run(function () {
            _this.toggoleShowHide = true;
        });
        browser.show();
        browser.on("exit").subscribe(function () {
            _this.showButton();
        });
    };
    HomePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: '' + msg,
            duration: 4000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\Clients\Ch Waqas\scanner\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Barcode/QR Scanner v1.0 </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content> \n    <div [style.display]="toggoleShowHide ? \'block\' : \'none\'">\n  <button ion-button full large  (click)=" itemClicked()"> Scan</button>\n    </div>\n</ion-content>\n'/*ion-inline-end:"E:\Clients\Ch Waqas\scanner\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__["a" /* DataServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_qr_scanner__["a" /* QRScanner */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_streaming_media__["a" /* StreamingMedia */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DataServiceProvider = (function () {
    function DataServiceProvider(http) {
        this.http = http;
        this.s = " ";
        this.url = "http://smartyfox.com/api/scans";
        console.log('Hello DataServiceProvider Provider');
    }
    DataServiceProvider.prototype.getMessages = function () {
        try {
            return this.http.get(this.url)
                .map((function (res) { return res.json(); }));
        }
        catch (error) {
        }
    };
    DataServiceProvider.prototype.getTestData = function () {
        this.s = "[{\"id\":1,\"created_at\":\"2017-09-05 13:07:17\",\"updated_at\":\"2017-09-05 13:07:17\",\"scan_id\":1,\"type\":1,\"answer\":\"<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>\",\"sort\":1},{\"id\":2,\"created_at\":\"2017-09-05 13:08:46\",\"updated_at\":\"2017-09-05 13:08:46\",\"scan_id\":2,\"type\":1,\"answer\":\"<ul>\n   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>\n   <li>Aliquam tincidunt mauris eu risus.</li>\n   <li>Vestibulum auctor dapibus neque.</li>\n</ul>\n         \",\"sort\":1},{\"id\":3,\"created_at\":\"2017-09-05 13:08:46\",\"updated_at\":\"2017-09-05 13:08:46\",\"scan_id\":2,\"type\":1,\"answer\":\"<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>\",\"sort\":2},{\"id\":4,\"created_at\":\"2017-09-05 13:08:46\",\"updated_at\":\"2017-09-05 13:08:46\",\"scan_id\":2,\"type\":2,\"answer\":\"https://www.youtube.com/watch?v=S1mFoDK4sUQ\",\"sort\":3},{\"id\":5,\"created_at\":\"2017-09-05 13:08:46\",\"updated_at\":\"2017-09-05 13:08:46\",\"scan_id\":1,\"type\":2,\"answer\":\"https://www.youtube.com/watch?v=S1mFoDK4sUQ\",\"sort\":2},{\"id\":6,\"created_at\":\"2017-09-05 13:08:46\",\"updated_at\":\"2017-09-05 13:08:46\",\"scan_id\":2,\"type\":3,\"answer\":\"http://innsite.net.au/audio/P005_EN_Daily Life_Escape.mp3\",\"sort\":4},{\"id\":7,\"created_at\":\"2017-09-05 13:08:46\",\"updated_at\":\"2017-09-05 13:08:46\",\"scan_id\":3,\"type\":4,\"answer\":\"https://www.google.com.au/\",\"sort\":2},{\"id\":8,\"created_at\":\"2017-09-05 13:08:46\",\"updated_at\":\"2017-09-05 13:08:46\",\"scan_id\":3,\"type\":3,\"answer\":\"http://innsite.net.au/audio/P004_EN_Excavator_Local Help.mp3\",\"sort\":1}]";
        this.s = this.s.replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
        // remove non-printable and other non-valid JSON chars
        this.s = this.s.replace(/[\u0000-\u0019]+/g, "");
        return JSON.parse(this.s);
    };
    return DataServiceProvider;
}());
DataServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], DataServiceProvider);

//# sourceMappingURL=data-service.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_qr_scanner__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_streaming_media__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_network__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_data_service_data_service__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_textview_textview__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_textview_textview__["a" /* TextviewPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/textview/textview.module#TextviewPageModule', name: 'TextviewPage', segment: 'textview', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../ionic-qr-code-scanner-app/pages/textview/textview.module#TextviewPageModule', name: 'TextviewPage', segment: 'textview', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../ionic-qr-code-scanner-app/ionic-qr-code-scanner-app/pages/textview/textview.module#TextviewPageModule', name: 'TextviewPage', segment: 'textview', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_textview_textview__["a" /* TextviewPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_13__providers_data_service_data_service__["a" /* DataServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_qr_scanner__["a" /* QRScanner */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_streaming_media__["a" /* StreamingMedia */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_network__["a" /* Network */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Clients\Ch Waqas\scanner\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"E:\Clients\Ch Waqas\scanner\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TextviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TextviewPage = (function () {
    function TextviewPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.textToshow = true;
        this.textToshow = navParams.get("first");
    }
    TextviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TextviewPage');
    };
    return TextviewPage;
}());
TextviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-textview',template:/*ion-inline-start:"E:\Clients\Ch Waqas\scanner\src\pages\textview\textview.html"*/'<!--\n  Generated template for the TextviewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>textview</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div [innerHtml]=textToshow></div>\n</ion-content>\n'/*ion-inline-end:"E:\Clients\Ch Waqas\scanner\src\pages\textview\textview.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], TextviewPage);

//# sourceMappingURL=textview.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map