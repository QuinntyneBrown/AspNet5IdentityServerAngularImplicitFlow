!function(){var a=angular.module("mainApp",["ui.router","LocalStorageModule"]);a.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/unauthorized"),a.state("authorized",{url:"/authorized",templateUrl:"/templates/authorized.html",controller:"AuthorizeController"}).state("forbidden",{url:"/forbidden",templateUrl:"/templates/forbidden.html"}).state("unauthorized",{url:"/unauthorized",templateUrl:"/templates/unauthorized.html"}).state("logoff",{url:"/logoff",templateUrl:"/templates/unauthorized.html",controller:"LogoffController"}).state("details",{url:"/details/:id",templateUrl:"/templates/details.html",controller:"DetailsController",resolve:{DataEventRecordsService:"DataEventRecordsService",dataEventRecord:["DataEventRecordsService","$stateParams",function(a,b){var c=b.id;return console.log(b.id),a.GetDataEventRecord({id:c})}]}}).state("overviewindex",{url:"/overviewindex",templateUrl:"/templates/overviewindex.html",controller:"OverviewController",resolve:{DataEventRecordsService:"DataEventRecordsService",dataEventRecords:["DataEventRecordsService",function(a){return a.GetDataEventRecords()}]}}).state("create",{url:"/create",templateUrl:"/templates/create.html",controller:"DetailsController",resolve:{dataEventRecord:[function(){return{Id:"",Name:"",Description:"",Timestamp:"2016-02-15T08:57:32"}}]}}).state("reload",{url:"/reload/:destinationState",controller:["$state","$stateParams",function(a,b){b.destinationState?a.go(b.destinationState):a.go("overviewindex")}]}),c.html5Mode(!0)}]),a.run(["$rootScope",function(a){a.$on("$stateChangeError",function(a,b,c,d,e,f){console.log(a),console.log(b),console.log(c),console.log(d),console.log(e),console.log(f)}),a.$on("$stateNotFound",function(a,b,c,d){console.log(a),console.log(b),console.log(c),console.log(d)})}])}(),function(){"use strict";function a(a,b,c){a.info("AuthorizeController called"),b.message="AuthorizeController created",c.Authorize()}var b=angular.module("mainApp");b.controller("AuthorizeController",["$log","$scope","SecurityService",a])}(),function(){"use strict";function a(a,b,c,d,e){b.info("DetailsController called"),a.message="dataEventRecord Create, Update or Delete",a.DataEventRecordsService=d,a.state=e,a.dataEventRecord=c,a.Update=function(){b.info("Updating"),b.info(c),a.DataEventRecordsService.UpdateDataEventRecord(c).then(function(){a.state.go("reload",{destinationState:"overviewindex"})})},a.Create=function(){b.info("Creating"),b.info(c),a.DataEventRecordsService.AddDataEventRecord(c).then(function(){a.state.go("reload",{destinationState:"overviewindex"})})}}var b=angular.module("mainApp");b.controller("DetailsController",["$scope","$log","dataEventRecord","DataEventRecordsService","$state",a])}(),function(){"use strict";function a(a,b,c){a.info("LogoffController called"),b.message="LogoffController created",alert("called Logoff"),c.Logoff()}var b=angular.module("mainApp");b.controller("LogoffController",["$log","$scope","SecurityService",a])}(),function(){"use strict";function a(a,b,c,d,e){b.info("OverviewController called"),a.message="Overview",a.DataEventRecordsService=d,b.info(c),a.dataEventRecords=c,a.Delete=function(c){b.info("deleting"),a.DataEventRecordsService.DeleteDataEventRecord(c).then(function(){e.go(e.current,{},{reload:!0})})}}var b=angular.module("mainApp");b.controller("OverviewController",["$scope","$log","dataEventRecords","DataEventRecordsService","$state",a])}(),function(){"use strict";function a(a,b){console.log("AuthorizationInterceptor created");var c=function(c){return c.headers=c.headers||{},""!==b.get("authorizationData")&&(c.headers.Authorization="Bearer "+b.get("authorizationData")),c||a.when(c)},d=function(a){return console.log("console.log(responseFailure);"),console.log(a),403===a.status?(alert("forbidden"),window.location="https://localhost:44347/forbidden",window.href="forbidden"):401===a.status&&(alert("unauthorized"),b.set("authorizationData","")),this.q.reject(a)};return{request:c,responseError:d}}var b=angular.module("mainApp");b.service("authorizationInterceptor",["$q","localStorageService",a]),b.config(["$httpProvider",function(a){a.interceptors.push("authorizationInterceptor")}])}(),function(){"use strict";function a(a,b,c,d){b.info("DataEventRecordsService called");var e="https://localhost:44390/",f=function(b){var d=c.defer();return console.log("addDataEventRecord started"),console.log(b),a({url:e+"api/DataEventRecords",method:"POST",data:b}).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},g=function(b){var d=c.defer();return console.log("addDataEventRecord started"),console.log(b),a({url:e+"api/DataEventRecords/"+b.Id,method:"PUT",data:b}).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},h=function(b){var d=c.defer();return console.log("DeleteDataEventRecord begin"),console.log(b),a({url:e+"api/DataEventRecords/"+b,method:"DELETE",data:""}).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},i=function(){var b=c.defer();return console.log("GetDataEventRecords started"),console.log(d.authorizationData),a({url:e+"api/DataEventRecords",method:"GET"}).success(function(a){console.log("GetDataEventRecords success"),b.resolve(a)}).error(function(a){console.log("GetDataEventRecords error"),b.reject(a)}),b.promise},j=function(d){b.info("DataEventRecordService GetDataEventRecord called: "+d.id),b.info(d);var f=c.defer();return a({url:e+"api/DataEventRecords/"+d.id,method:"GET"}).success(function(a){console.log("GetDataEventRecords success"),f.resolve(a)}).error(function(a){console.log("GetDataEventRecords error"),f.reject(a)}),f.promise};return{AddDataEventRecord:f,UpdateDataEventRecord:g,DeleteDataEventRecord:h,GetDataEventRecords:i,GetDataEventRecord:j}}var b=angular.module("mainApp");b.factory("DataEventRecordsService",["$http","$log","$q","$rootScope",a])}(),function(){"use strict";function a(a,b,c,d,e,f,g){function h(a){var b=a.replace("-","+").replace("_","/");switch(b.length%4){case 0:break;case 2:b+="==";break;case 3:b+="=";break;default:throw"Illegal base64url string!"}return window.atob(b)}function i(a){var b={};if("undefined"!=typeof a){var c=a.split(".")[1];b=JSON.parse(h(c))}return b}b.info("SecurityService called"),d.IsAuthorized=!1,d.HasAdminRole=!1;var j=function(){g.set("authorizationData",""),d.IsAuthorized=!1,d.HasAdminRole=!1},k=function(a){""!==g.get("authorizationData")&&g.set("authorizationData",""),g.set("authorizationData",a),d.IsAuthorized=!0;for(var b=i(a),c=0;c<b.role.length;c++)"dataEventRecords.admin"===b.role[c]&&(d.HasAdminRole=!0)},l=function(){if(j(),console.log("BEGIN Authorize, no auth data"),e.location.hash){console.log("AuthorizedController created, has hash");var a=window.location.hash.substr(1),c=a.split("&").reduce(function(a,b){var c=b.split("=");return a[c[0]]=c[1],a},{}),d="";if(!c.error)if(c.state!==g.get("authStateControl"))console.log("AuthorizedController created. no myautostate");else{g.set("authStateControl",""),console.log("AuthorizedController created. returning access token"),console.log(c),d=c.access_token;var h=i(d);b.info(h)}k(d),console.log(g.get("authorizationData")),f.go("overviewindex")}else{console.log("AuthorizedController time to log on");var l="https://localhost:44345/connect/authorize",m="angularclient",n="https://localhost:44347/authorized",o="token",p="dataEventRecords aReallyCoolScope",q=Date.now()+""+Math.random();g.set("authStateControl",q),console.log("AuthorizedController created. adding myautostate: "+g.get("authStateControl"));var r=l+"?client_id="+encodeURI(m)+"&redirect_uri="+encodeURI(n)+"&response_type="+encodeURI(o)+"&scope="+encodeURI(p)+"&state="+encodeURI(q);e.location=r}},m=function(){j(),e.location="https://localhost:44347/unauthorized.html"};return{ResetAuthorizationData:j,SetAuthorizationData:k,Authorize:l,Logoff:m}}var b=angular.module("mainApp");b.factory("SecurityService",["$http","$log","$q","$rootScope","$window","$state","localStorageService",a])}();