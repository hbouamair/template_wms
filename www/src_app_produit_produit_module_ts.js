"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_produit_produit_module_ts"],{

/***/ 6819:
/*!*************************************!*\
  !*** ./src/app/database.service.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatabaseService": () => (/* binding */ DatabaseService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _ionic_native_sqlite_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/sqlite/ngx */ 4297);




let DatabaseService = class DatabaseService {
    constructor(platform, sqlite) {
        this.platform = platform;
        this.sqlite = sqlite;
        this.db_name = "wmsa.db";
        this.db_table = "produits";
        this.databaseConn();
    }
    databaseConn() {
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: this.db_name,
                location: 'default'
            }).then((sqLite) => {
                this.dbInstance = sqLite;
                sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS ${this.db_table} (
                product_id INTEGER PRIMARY KEY, 
                material varchar(255),
                description varchar(255),
                cagette varchar(255),

              )`, [])
                    .then((res) => {
                    // alert(JSON.stringify(res));
                })
                    .catch((error) => alert(JSON.stringify(error)));
            })
                .catch((error) => alert(JSON.stringify(error)));
        });
    }
    // Crud
    addProduct(n, e, c) {
        // validation
        if (!n.length || !e.length || !c.length) {
            alert('');
            return;
        }
        this.dbInstance.executeSql(`
  INSERT INTO ${this.db_table} (material, description , cagette) VALUES ('${n}', '${e}' , '${c}')`, [])
            .then(() => {
            alert("Success");
            this.getAllProducts();
        }, (e) => {
            alert(JSON.stringify(e.err));
        });
    }
    getAllProducts() {
        return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
            this.Products = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    this.Products.push(res.rows.item(i));
                }
                return this.Products;
            }
        }, (e) => {
            alert(JSON.stringify(e));
        });
    }
    // Get user
    getProduct(id) {
        return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE product_id = ?`, [id])
            .then((res) => {
            return {
                product_id: res.rows.item(0).product_id,
                material: res.rows.item(0).material,
                description: res.rows.item(0).description,
                cagette: res.rows.item(0).cagette,
            };
        });
    }
    // Update
    updateUser(id, material, description, cagette) {
        let data = [material, description, cagette];
        return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET material = ?, description = ? , cagette = ? WHERE product_id = ${id}`, data);
    }
    // Delete
    deleteProduct(product) {
        this.dbInstance.executeSql(`
  DELETE FROM ${this.db_table} WHERE product_id = ${product}`, [])
            .then(() => {
            alert("produit deleted!");
            this.getAllProducts();
        })
            .catch(e => {
            alert(JSON.stringify(e));
        });
    }
};
DatabaseService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.Platform },
    { type: _ionic_native_sqlite_ngx__WEBPACK_IMPORTED_MODULE_0__.SQLite }
];
DatabaseService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
        providedIn: 'root'
    })
], DatabaseService);



/***/ }),

/***/ 2108:
/*!***************************************************!*\
  !*** ./src/app/produit/produit-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProduitPageRoutingModule": () => (/* binding */ ProduitPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _produit_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./produit.page */ 4500);




const routes = [
    {
        path: '',
        component: _produit_page__WEBPACK_IMPORTED_MODULE_0__.ProduitPage
    }
];
let ProduitPageRoutingModule = class ProduitPageRoutingModule {
};
ProduitPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ProduitPageRoutingModule);



/***/ }),

/***/ 8608:
/*!*******************************************!*\
  !*** ./src/app/produit/produit.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProduitPageModule": () => (/* binding */ ProduitPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _produit_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./produit-routing.module */ 2108);
/* harmony import */ var _produit_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./produit.page */ 4500);







let ProduitPageModule = class ProduitPageModule {
};
ProduitPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _produit_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProduitPageRoutingModule
        ],
        declarations: [_produit_page__WEBPACK_IMPORTED_MODULE_1__.ProduitPage]
    })
], ProduitPageModule);



/***/ }),

/***/ 4500:
/*!*****************************************!*\
  !*** ./src/app/produit/produit.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProduitPage": () => (/* binding */ ProduitPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _Users_macbookpro_Desktop_wms_mobilee_node_modules_ngtools_webpack_src_loaders_direct_resource_js_produit_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./produit.page.html */ 1825);
/* harmony import */ var _produit_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./produit.page.scss */ 6975);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _database_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../database.service */ 6819);





let ProduitPage = class ProduitPage {
    constructor(crud) {
        this.crud = crud;
        this.material = "";
        this.description = "";
        this.cagette = "";
        this.crud.databaseConn();
    }
    ngOnInit() { }
    ionViewDidEnter() {
        this.crud.getAllProducts();
    }
    createProduct() {
        this.crud.addProduct(this.material, this.description, this.cagette);
    }
    remove(product) {
        this.crud.deleteProduct(product);
    }
};
ProduitPage.ctorParameters = () => [
    { type: _database_service__WEBPACK_IMPORTED_MODULE_2__.DatabaseService }
];
ProduitPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-produit',
        template: _Users_macbookpro_Desktop_wms_mobilee_node_modules_ngtools_webpack_src_loaders_direct_resource_js_produit_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_produit_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProduitPage);



/***/ }),

/***/ 1825:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/produit/produit.page.html ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>produit</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list class=\"form ion-padding\">\n              \n    <ion-item class=\"select\">\n      <ion-label position=\"floating\"> Material\n      <ion-input [(ngModel)]=\"material\"  type=\"text\"> </ion-input ></ion-label> \n    </ion-item>\n\n    <ion-item>\n      <ion-label position=\"floating\"\n        >Description<ion-input [(ngModel)]=\"description\"  type=\"text\"></ion-input\n      ></ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label position=\"floating\">cagette</ion-label>\n      <ion-input [(ngModel)]=\"cagette\"  type=\"text\"></ion-input>\n    </ion-item>\n    \n\n    \n    <ion-fab-button (click)=\"createProduct()\"\n    ><ion-icon src=\"../../assets/save.svg\"></ion-icon>\n  </ion-fab-button   >\n  <ion-label> Enregistrer</ion-label>\n\n  </ion-list>\n  <ion-scroll *ngIf=\"hideMe\" scrollY=\"true\" direction=\"xy\">\n\n        \n    <ion-row  *ngFor=\"let product of crud.Products\"   class=\"data-row\">\n      <ion-col size=\"3\"> {{product.material}}</ion-col>\n      <ion-col size=\"3\"> {{product.description}} </ion-col>\n      <ion-col size=\"4\"> {{product.cagette}} </ion-col>\n      \n    </ion-row>\n  </ion-scroll>\n\n</ion-content>\n");

/***/ }),

/***/ 6975:
/*!*******************************************!*\
  !*** ./src/app/produit/produit.page.scss ***!
  \*******************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9kdWl0LnBhZ2Uuc2NzcyJ9 */";

/***/ })

}]);
//# sourceMappingURL=src_app_produit_produit_module_ts.js.map