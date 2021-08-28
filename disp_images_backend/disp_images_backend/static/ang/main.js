(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _get_next_image_name_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./get-next-image-name.service */ "./src/app/get-next-image-name.service.ts");
/* harmony import */ var _load_image_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./load-image.service */ "./src/app/load-image.service.ts");
/* harmony import */ var _counter_counter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./counter/counter.component */ "./src/app/counter/counter.component.ts");
/* harmony import */ var _event_event_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./event/event.component */ "./src/app/event/event.component.ts");
/* harmony import */ var _pause_indicator_pause_indicator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pause-indicator/pause-indicator.component */ "./src/app/pause-indicator/pause-indicator.component.ts");
/* harmony import */ var _navigator_navigator_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./navigator/navigator.component */ "./src/app/navigator/navigator.component.ts");











class AppComponent {
    constructor(getNextImageNameService, loadImageService) {
        this.getNextImageNameService = getNextImageNameService;
        this.loadImageService = loadImageService;
        this.endPoint = `http://${_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl}:8000/view_photos/get_image_details/`;
        // private backendURL: string = `http://${environment.baseUrl}:8000/view_photos/get_image_details/?command=get_next_image_details`;
        this.mediaURL = `http://${_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl}:8000/media/`;
        this.image = undefined;
        this.pause = false;
        this.image_count = "1/1";
        this.year_event = "";
        this.title = 'disp-images-angular-frontend';
    }
    ngOnInit() {
        this._doGet();
        this.image = document.images[0];
    }
    _doGet() {
        let url = this.buildURL(this.endPoint, 'next');
        const interval$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(5000);
        const imgObjs$ = interval$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["concatMap"])((_) => this.getNextImageNameService.getNextImageName(url, this.pause)));
        // imgObjs: a stream of ImageObject's every interval
        this.buildImageURLandDisplay(imgObjs$);
    }
    buildImageURLandDisplay(imgObjs$) {
        const imageObjectsFullURL$ = imgObjs$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((imgObject) => {
            imgObject.image_path = `${this.mediaURL}${imgObject.image_path}`;
            return imgObject;
        }));
        // imageObjectsFullURL$ : a stream of ImageObject's where each imgObject.image_name contains the full image URL
        // load URL: imageObjectsFullURL.image_name. using  concatMap so every load is done only after the previous finished
        imageObjectsFullURL$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["concatMap"])((imageObjectsFullURL) => this.loadImageService.load(imageObjectsFullURL.image_path)));
        // display the image
        // this.imgSrc is input binding to the html img tag
        imageObjectsFullURL$.subscribe((imageObjectsFullURL) => {
            this.imgSrc = imageObjectsFullURL.image_path;
            this.image_count = this.createImageCountString(imageObjectsFullURL.image_index, imageObjectsFullURL.total_number_of_images);
            this.year_event = `${imageObjectsFullURL.image_year} ${imageObjectsFullURL.image_event}`;
        });
    }
    fullScreen() {
        console.log('full screen');
        if (this.image.requestFullscreen) {
            this.image.requestFullscreen();
        } /* else if(this.image.mozRequestFullScreen){ // Firefox
            this.image.mozRequestFullScreen();
          } else if(this.image.webkitRequestFullscreen){ // Chrome, Safari and Opera
            this.image.webkitRequestFullscreen();
          } else if(this.image.msRequestFullscreen) { // IE/Edge
            this.image.msRequestFullscreen();
          }*/
    }
    handleImageClickEvent(event) {
        if (event.shiftKey) {
            this.fullScreen();
            return;
        }
        this.pause = !this.pause;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
    createImageCountString(image_index, total_images) {
        return `${image_index + 1}/${total_images}`;
    }
    hide_pause_indicator() {
        return !this.pause;
    }
    navigate(navigateCommand) {
        console.log(`got navigate command: ${navigateCommand}`);
        if (navigateCommand === "pause") {
            this.pause = true;
            return;
        }
        if (navigateCommand === "play") {
            this.pause = false;
            return;
        }
        if (navigateCommand === "prev") {
            console.log("prev pressed");
            let url = this.buildURL(this.endPoint, "prev");
            this.getAndLoadImage(url);
            return;
        }
        if (navigateCommand === "next") {
            console.log("next pressed");
            let url = this.buildURL(this.endPoint, "next");
            this.getAndLoadImage(url);
            return;
        }
        console.log(`unknown command: ${navigateCommand}`);
    }
    getAndLoadImage(url) {
        const imgObjs$ = this.getNextImageNameService.getNextImageName(url, false);
        this.buildImageURLandDisplay(imgObjs$);
    }
    buildURL(endPoint, param) {
        if (param === "next") {
            let command = '?command=get_next_image_details';
            let url = `${endPoint}${command}`;
            return url;
        }
        if (param === 'prev') {
            let command = '?command=get_prev_image_details';
            let url = `${endPoint}${command}`;
            return url;
        }
        console.log(`unsupported parameter: ${param}`);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_get_next_image_name_service__WEBPACK_IMPORTED_MODULE_4__["GetNextImageNameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_load_image_service__WEBPACK_IMPORTED_MODULE_5__["LoadImageService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 6, vars: 4, consts: [[1, "image-container"], [1, "counter", 3, "count"], [1, "year_event", 3, "year_event"], [1, "pause", 3, "hidden"], ["alt", "loading", 1, "center-fit", 3, "src", "click"], [3, "navigationCommandCreated"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-counter", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-event", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-pause-indicator", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_img_click_4_listener($event) { return ctx.handleImageClickEvent($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "app-navigator", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("navigationCommandCreated", function AppComponent_Template_app_navigator_navigationCommandCreated_5_listener($event) { return ctx.navigate($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("count", ctx.image_count);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("year_event", ctx.year_event);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", ctx.hide_pause_indicator());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, directives: [_counter_counter_component__WEBPACK_IMPORTED_MODULE_6__["CounterComponent"], _event_event_component__WEBPACK_IMPORTED_MODULE_7__["EventComponent"], _pause_indicator_pause_indicator_component__WEBPACK_IMPORTED_MODULE_8__["PauseIndicatorComponent"], _navigator_navigator_component__WEBPACK_IMPORTED_MODULE_9__["NavigatorComponent"]], styles: [".pause[_ngcontent-%COMP%] {\n  position: absolute;\n  font-size: 30px;\n  top: 1%;\n  left: 50%;\n  background: black;\n  \n  background: rgba(0, 0, 0, 0);\n  \n  color: #f1f1f1;\n}\n.year_event[_ngcontent-%COMP%] {\n  position: absolute;\n  font-size: 30px;\n  top: 1%;\n  left: 1%;\n  color: black;\n}\n.counter[_ngcontent-%COMP%] {\n  position: absolute;\n  font-size: 30px;\n  top: 1%;\n  left: 85%;\n  color: black;\n}\n.center-fit[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 85vh;\n  margin: auto;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.image-container[_ngcontent-%COMP%] {\n  display: grid;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBOzs7R0FBQTtBQUtBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUEwQixtQkFBQTtFQUMxQiw0QkFBQTtFQUFnQyxzQ0FBQTtFQUNoQyxjQUFBO0FBQ0Y7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtBQUNGO0FBRUE7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7QUFDRjtBQUVBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtBQUNGO0FBRUE7RUFDRSxhQUFBO0VBQ0EsWUFBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKiBpbWcge1xuICB3aWR0aDoxMDAlO1xuICBoZWlnaHQ6YXV0bztcbn0gKi9cblxuLnBhdXNle1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGZvbnQtc2l6ZTogMzBweDtcbiAgdG9wOiAxJTtcbiAgbGVmdDogNTAlO1xuICBiYWNrZ3JvdW5kOiByZ2IoMCwgMCwgMCk7IC8qIEZhbGxiYWNrIGNvbG9yICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4wKTsgLyogQmxhY2sgYmFja2dyb3VuZCB3aXRoIDAuMCBvcGFjaXR5ICovXG4gIGNvbG9yOiAjZjFmMWYxO1xufVxuXG4ueWVhcl9ldmVudHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBmb250LXNpemU6IDMwcHg7XG4gIHRvcDogMSU7XG4gIGxlZnQ6IDElO1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5jb3VudGVye1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGZvbnQtc2l6ZTogMzBweDtcbiAgdG9wOiAxJTtcbiAgbGVmdDogODUlO1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5jZW50ZXItZml0IHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiA4NXZoO1xuICBtYXJnaW46IGF1dG87XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5pbWFnZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBoZWlnaHQ6IDEwMCU7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss'],
            }]
    }], function () { return [{ type: _get_next_image_name_service__WEBPACK_IMPORTED_MODULE_4__["GetNextImageNameService"] }, { type: _load_image_service__WEBPACK_IMPORTED_MODULE_5__["LoadImageService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _pause_indicator_pause_indicator_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pause-indicator/pause-indicator.component */ "./src/app/pause-indicator/pause-indicator.component.ts");
/* harmony import */ var _counter_counter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./counter/counter.component */ "./src/app/counter/counter.component.ts");
/* harmony import */ var _event_event_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./event/event.component */ "./src/app/event/event.component.ts");
/* harmony import */ var _navigator_navigator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./navigator/navigator.component */ "./src/app/navigator/navigator.component.ts");










class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _pause_indicator_pause_indicator_component__WEBPACK_IMPORTED_MODULE_5__["PauseIndicatorComponent"],
        _counter_counter_component__WEBPACK_IMPORTED_MODULE_6__["CounterComponent"],
        _event_event_component__WEBPACK_IMPORTED_MODULE_7__["EventComponent"],
        _navigator_navigator_component__WEBPACK_IMPORTED_MODULE_8__["NavigatorComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _pause_indicator_pause_indicator_component__WEBPACK_IMPORTED_MODULE_5__["PauseIndicatorComponent"],
                    _counter_counter_component__WEBPACK_IMPORTED_MODULE_6__["CounterComponent"],
                    _event_event_component__WEBPACK_IMPORTED_MODULE_7__["EventComponent"],
                    _navigator_navigator_component__WEBPACK_IMPORTED_MODULE_8__["NavigatorComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/counter/counter.component.ts":
/*!**********************************************!*\
  !*** ./src/app/counter/counter.component.ts ***!
  \**********************************************/
/*! exports provided: CounterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CounterComponent", function() { return CounterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class CounterComponent {
    constructor() { }
    ngOnInit() {
    }
}
CounterComponent.ɵfac = function CounterComponent_Factory(t) { return new (t || CounterComponent)(); };
CounterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CounterComponent, selectors: [["app-counter"]], inputs: { image_count: ["count", "image_count"] }, decls: 2, vars: 1, template: function CounterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.image_count);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvdW50ZXIvY291bnRlci5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CounterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-counter',
                templateUrl: './counter.component.html',
                styleUrls: ['./counter.component.scss']
            }]
    }], function () { return []; }, { image_count: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['count']
        }] }); })();


/***/ }),

/***/ "./src/app/event/event.component.ts":
/*!******************************************!*\
  !*** ./src/app/event/event.component.ts ***!
  \******************************************/
/*! exports provided: EventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventComponent", function() { return EventComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class EventComponent {
    constructor() { }
    ngOnInit() {
    }
}
EventComponent.ɵfac = function EventComponent_Factory(t) { return new (t || EventComponent)(); };
EventComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: EventComponent, selectors: [["app-event"]], inputs: { year_event: "year_event" }, decls: 2, vars: 1, template: function EventComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.year_event);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2V2ZW50L2V2ZW50LmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EventComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-event',
                templateUrl: './event.component.html',
                styleUrls: ['./event.component.scss']
            }]
    }], function () { return []; }, { year_event: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['year_event']
        }] }); })();


/***/ }),

/***/ "./src/app/get-next-image-name.service.ts":
/*!************************************************!*\
  !*** ./src/app/get-next-image-name.service.ts ***!
  \************************************************/
/*! exports provided: GetNextImageNameService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetNextImageNameService", function() { return GetNextImageNameService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");




class GetNextImageNameService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getNextImageName(url, pause) {
        if (!pause) {
            return this.httpClient.get(url);
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"];
    }
}
GetNextImageNameService.ɵfac = function GetNextImageNameService_Factory(t) { return new (t || GetNextImageNameService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
GetNextImageNameService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GetNextImageNameService, factory: GetNextImageNameService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GetNextImageNameService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/load-image.service.ts":
/*!***************************************!*\
  !*** ./src/app/load-image.service.ts ***!
  \***************************************/
/*! exports provided: LoadImageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadImageService", function() { return LoadImageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_internal_observable_fromEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/internal/observable/fromEvent */ "./node_modules/rxjs/internal/observable/fromEvent.js");
/* harmony import */ var rxjs_internal_observable_fromEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_observable_fromEvent__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs_internal_operators_take__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/internal/operators/take */ "./node_modules/rxjs/internal/operators/take.js");
/* harmony import */ var rxjs_internal_operators_take__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators_take__WEBPACK_IMPORTED_MODULE_2__);




class LoadImageService {
    constructor() {
    }
    load(imgURL) {
        const img = new Image();
        img.src = imgURL;
        // return an Observable of load event when the image was loaded
        return Object(rxjs_internal_observable_fromEvent__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(img, 'load').pipe(Object(rxjs_internal_operators_take__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
    }
}
LoadImageService.ɵfac = function LoadImageService_Factory(t) { return new (t || LoadImageService)(); };
LoadImageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoadImageService, factory: LoadImageService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadImageService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/navigator/navigator.component.ts":
/*!**************************************************!*\
  !*** ./src/app/navigator/navigator.component.ts ***!
  \**************************************************/
/*! exports provided: NavigatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigatorComponent", function() { return NavigatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class NavigatorComponent {
    constructor() {
        this.navigationCommandCreated = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.playbackState = "";
        this.pauseButtonCaption = "";
        this.disablePrevNextButtons = false;
    }
    ngOnInit() {
        this.playbackState = "play";
        this.pauseButtonCaption = "pause";
        this.disablePrevNextButtons = true;
    }
    pauseButtonPressed() {
        if (this.playbackState === "pause") {
            this.playbackState = "play";
            this.pauseButtonCaption = "pause";
            this.disablePrevNextButtons = true;
            this.navigationCommandCreated.emit(this.playbackState);
            return;
        }
        if (this.playbackState === "play") {
            this.playbackState = "pause";
            this.pauseButtonCaption = "play";
            this.disablePrevNextButtons = false;
            this.navigationCommandCreated.emit(this.playbackState);
            return;
        }
    }
    prevButtonPressed() {
        this.navigationCommandCreated.emit("prev");
    }
    nextButtonPressed() {
        this.navigationCommandCreated.emit("next");
    }
}
NavigatorComponent.ɵfac = function NavigatorComponent_Factory(t) { return new (t || NavigatorComponent)(); };
NavigatorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavigatorComponent, selectors: [["app-navigator"]], outputs: { navigationCommandCreated: "navigationCommandCreated" }, decls: 7, vars: 3, consts: [[3, "disabled", "click"], [3, "click"]], template: function NavigatorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavigatorComponent_Template_button_click_1_listener() { return ctx.prevButtonPressed(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "prev");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavigatorComponent_Template_button_click_3_listener() { return ctx.pauseButtonPressed(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavigatorComponent_Template_button_click_5_listener() { return ctx.nextButtonPressed(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "next");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.disablePrevNextButtons);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.pauseButtonCaption);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.disablePrevNextButtons);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25hdmlnYXRvci9uYXZpZ2F0b3IuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavigatorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-navigator',
                templateUrl: './navigator.component.html',
                styleUrls: ['./navigator.component.scss']
            }]
    }], function () { return []; }, { navigationCommandCreated: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/pause-indicator/pause-indicator.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pause-indicator/pause-indicator.component.ts ***!
  \**************************************************************/
/*! exports provided: PauseIndicatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PauseIndicatorComponent", function() { return PauseIndicatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class PauseIndicatorComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
PauseIndicatorComponent.ɵfac = function PauseIndicatorComponent_Factory(t) { return new (t || PauseIndicatorComponent)(); };
PauseIndicatorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PauseIndicatorComponent, selectors: [["app-pause-indicator"]], decls: 3, vars: 0, template: function PauseIndicatorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Pause");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhdXNlLWluZGljYXRvci9wYXVzZS1pbmRpY2F0b3IuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PauseIndicatorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pause-indicator',
                templateUrl: './pause-indicator.component.html',
                styleUrls: ['./pause-indicator.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    baseUrl: "localhost"
    // baseUrl: "192.168.1.110"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
open;
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/oferoded/Documents/AngularProjects/disp_images/disp-images-angular-frontend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map