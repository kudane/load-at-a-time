/*!
 * A load images by Sequential
 *
 * Version : Demo
 *
 * Copyright (c) 2019
 *  
 * References Pattern by "https://github.com/verlok/lazyload"
 *  
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = factory(root);
    } else if (typeof define === "function" && define.amd) {
        define([], factory(root));
    } else {
        root.LoadAtATime = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    "use strict";

    var defaultSettings = {
        selector: "img"
    };

    var getSettings = function getSettings(customSettings) {
        return _extends({}, defaultSettings, customSettings);
    };

    var getElements = function getElements(selector) {
        return document.querySelectorAll(selector);
    };

    var setElementSrc = function setElementSrc(element, src) {
        element.setAttribute("src", src);
    };

    var removeDataSrc = function removeDataSrc(element) {
        element.removeAttribute("data-src");
    };

    var LoadAtATime = function LoadAtATime(customSettings) {
        this._settings = getSettings(customSettings);
        this._elements = getElements(this._settings.selector);
        this._loadingCount = 0;
        this._onLoading();
    };

    LoadAtATime.prototype = {
        _onLoading: function _onLoading() {
            var this2 = this;
            var img = new Image();

            img.addEventListener('load', function () {
                setElementSrc(this2._elements[this2._loadingCount], this.src);
                removeDataSrc(this2._elements[this2._loadingCount]);

                if (this2._loadingCount === this2._elements.length - 1) {
                    return;
                }

                this2._loadingCount++;
                this2._onLoading();
            }, false);

            img.src = this2._elements[this2._loadingCount].dataset.src;
        }
    };

    return LoadAtATime;
});
