(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{51:function(t,e,n){var o=n(10),r=n(52);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var a={insert:"head",singleton:!1};o(r,a);t.exports=r.locals||{}},52:function(t,e,n){(e=n(11)(!1)).push([t.i,".imgBgContainer{width:100vw;height:20vh;background-color:#b7b5b5;position:absolute}.imgBgContainer .imgBg{z-index:-1;position:absolute;width:100%}.gradientBg{position:absolute;height:100%;width:100%;background:#191553;background:linear-gradient(0deg, #191553 0%, rgba(255, 255, 255, 0) 100%)}.mainSecondContainer{position:absolute;width:100%}",""]),t.exports=e},53:function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),a=n(33),i=n.n(a);n(51);function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=d(t);if(e){var r=d(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return p(this,n)}}function p(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var m=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(d,t);var e,n,a,l=s(d);function d(){var t,e;c(this,d);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return p(e,(t=e=l.call.apply(l,[this].concat(o)),e.state={loading:!0,pageContent:null,portfolios:null},t))}return e=d,(n=[{key:"componentDidMount",value:function(){this.fetPageContent()}},{key:"fetPageContent",value:function(){var t=this;this.setState({loading:!0}),i.a.get("/api/webpages/").then((function(e){var n=e.data;t.setState({pageContent:n})})),i.a.get("/api/portfolios/").then((function(e){var n=e.data;t.setState({loading:!1,portfolios:n})}))}},{key:"render",value:function(){var t=this.state,e=t.loading,n=t.pageContent,a=t.portfolios;return e||null===a||null===n?r.a.createElement("div",null,"content not loaded"):(console.log(e),r.a.createElement(o.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"gradientBg"}),r.a.createElement("div",{className:"imgBgContainer"},r.a.createElement("img",{className:"imgBg",src:n.portfolio.front_image})),r.a.createElement("div",{className:"mainSecondContainer",value:n?document.title="My Portfolio":""},r.a.createElement("div",{className:""},r.a.createElement("h1",null,n.portfolio.page_title),r.a.createElement("h2",null,n.portfolio.name),r.a.createElement("p",null,n.portfolio.description)),r.a.createElement("div",null,a.map((function(t){var e=t.id,n=t.title,o=t.description,a=t.project_startdate,i=t.project_enddate,l=t.direct_url;return t.project_image,r.a.createElement("div",{key:e},r.a.createElement("h3",null,n),r.a.createElement("p",null,o),r.a.createElement("p",null,a," - ",i),r.a.createElement("p",null,l))})))))))}}])&&u(e.prototype,n),a&&u(e,a),d}(o.Component);e.default=m}}]);