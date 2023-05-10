(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SpyScroller", [], factory);
	else if(typeof exports === 'object')
		exports["SpyScroller"] = factory();
	else
		root["SpyScroller"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src_SpyScroller)
});

// UNUSED EXPORTS: ErrorMessages, SpyScroller

;// CONCATENATED MODULE: ./src/ErrorMessages.ts
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["INVALID_NUMBER"] = "Number must be greater then 1";
})(ErrorMessages || (ErrorMessages = {}));


;// CONCATENATED MODULE: ./src/SpyScroller.ts
// _____   _____    _____   _          __  _          __ 
// |  _  \ |  _  \  | ____| | |        / / | |        / / 
// | |_| | | |_| |  | |__   | |  __   / /  | |  __   / /  
// |  _  { |  _  /  |  __|  | | /  | / /   | | /  | / /   
// | |_| | | | \ \  | |___  | |/   |/ /    | |/   |/ /    
// |_____/ |_|  \_\ |_____| |___/|___/     |___/|___/     
//                                                    .io

var SpyScroller = /** @class */ (function () {
    // Define a constructor for the SpyScroller class
    function SpyScroller(
    // The menu element or its selector that contains the menu items
    menu, 
    // The options object that configures the behavior of the SpyScroller instance (optional)
    options) {
        if (menu === void 0) { menu = "#navMenu"; }
        if (options === void 0) { options = {}; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        this.isLastSection = false;
        // Set the options property by merging the default values with the provided options
        this.options = {
            sectionSelector: (_a = options.sectionSelector) !== null && _a !== void 0 ? _a : "section",
            targetSelector: (_b = options.targetSelector) !== null && _b !== void 0 ? _b : "[data-jump]",
            topOffset: { min: 0, max: 0, values: [{ topOffset: 500 }] },
            hrefAttribute: (_c = options.hrefAttribute) !== null && _c !== void 0 ? _c : "href",
            activeClass: Array.isArray(options.activeClass) ? options.activeClass : ["active"],
            onLastScrollInView: (_d = options.onLastScrollInView) !== null && _d !== void 0 ? _d : null,
            onFirstScrollInView: (_e = options.onFirstScrollInView) !== null && _e !== void 0 ? _e : null,
            onSectionChange: (_f = options.onSectionChange) !== null && _f !== void 0 ? _f : null,
            animation: {
                animType: (_h = (_g = options.animation) === null || _g === void 0 ? void 0 : _g.animType) !== null && _h !== void 0 ? _h : "attribute",
                enabled: (_k = (_j = options.animation) === null || _j === void 0 ? void 0 : _j.enabled) !== null && _k !== void 0 ? _k : false,
                animateTwoWay: (_m = (_l = options.animation) === null || _l === void 0 ? void 0 : _l.animateTwoWay) !== null && _m !== void 0 ? _m : true,
                opacityDistanceFromCenter: (_p = (_o = options.animation) === null || _o === void 0 ? void 0 : _o.opacityDistanceFromCenter) !== null && _p !== void 0 ? _p : 50,
            },
            smoothScroll: (_q = options.smoothScroll) !== null && _q !== void 0 ? _q : false,
        };
        // Validate the menu argument and throw an error if it is empty or invalid
        if (!menu) {
            throw new Error("First argument cannot be empty");
        }
        if (!(typeof menu === "string" || menu instanceof HTMLElement)) {
            throw new TypeError("menu can be either string or an instance of HTMLElement");
        }
        // Validate the options argument and throw an error if it is not an object
        if (typeof options !== "object") {
            throw new TypeError("options can only be of type object");
        }
        // Get the menu element from the menu argument or query the document for it
        this.menuList = menu instanceof HTMLElement ? menu : document.querySelector(menu);
        // Throw an error if no menu element is found
        if (!this.menuList) {
            throw new Error("No menu element found for selector \"".concat(menu, "\""));
        }
        // Get all the section elements from the document using the sectionSelector option
        this.sections = document.querySelectorAll(this.options.sectionSelector);
        // Bind the onSectionScroll and boundOnScroll methods to the current instance
        this.boundOnScroll = this.onScroll.bind(this);
        this.bind();
        // If smoothScroll option is enabled, call the setMoothScroll method to enable smooth scrolling behavior
        if (this.options.smoothScroll)
            this.setMoothScroll();
    }
    SpyScroller.prototype.setMoothScroll = function () {
        var links = document.querySelectorAll(this.options.targetSelector);
        var _loop_1 = function (i) {
            links[i].addEventListener("click", function (event) {
                event.preventDefault();
                var href = links[i].getAttribute("href");
                document.querySelector(href).scrollIntoView({ behavior: "smooth" });
            });
        };
        for (var i = 0; i < links.length; i++) {
            _loop_1(i);
        }
    };
    SpyScroller.prototype.currentActiveSection = function () {
        var _this = this;
        var currentPosition = (document.documentElement.scrollTop || document.body.scrollTop) +
            this.getTopOffset();
        return Array.from(this.sections).find(function (section) {
            var startAt = _this.getOffset(section);
            var endAt = startAt + section.offsetHeight;
            return currentPosition >= startAt && currentPosition < endAt;
        });
    };
    SpyScroller.prototype.getTopOffset = function () {
        var screenWidth = window.innerWidth;
        var topOffset = 200;
        if (Array.isArray(this.options.topOffset)) {
            for (var _i = 0, _a = this.options.topOffset; _i < _a.length; _i++) {
                var option = _a[_i];
                if ((!option.minWidth || screenWidth >= option.minWidth) &&
                    (!option.maxWidth || screenWidth <= option.maxWidth)) {
                    topOffset = option.topOffset;
                }
            }
        }
        else if (typeof this.options.topOffset === 'number') {
            topOffset = this.options.topOffset;
        }
        console.log("topoffset" + topOffset);
        return topOffset;
    };
    SpyScroller.prototype.getOffset = function (element, horizontal) {
        if (horizontal === void 0) { horizontal = false; }
        if (!element) {
            return 0;
        }
        var parentElement = element.offsetParent;
        return (this.getOffset(parentElement, horizontal) +
            (horizontal ? element.offsetLeft : element.offsetTop));
    };
    /**
     * Returns the active menu item based on the current active section
     * @since Version 1.0.0
     * @param section The currently active section
     * @returns The HTML anchor element of the corresponding menu item
     */
    SpyScroller.prototype.getActiveMenuItem = function (section) {
        if (!section) {
            return;
        }
        var sectionId = section.getAttribute("id");
        var attribute = this.options.targetSelector;
        if (this.options.targetSelector === "[data-jump]") {
            attribute = "data-jump";
            var items = document.querySelectorAll("[data-jump]");
            return Array.from(items).find(function (item) { return item.getAttribute(attribute) === sectionId; });
        }
        else {
            return this.menuList.querySelector("[href=\"#".concat(sectionId, "\"]"));
        }
    };
    SpyScroller.prototype.removeActiveLink = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.menuList
            .querySelectorAll(this.options.targetSelector)
            .forEach(function (item) {
            var _a;
            return (_a = item.classList).remove.apply(_a, _this.options.activeClass);
        });
    };
    /**
     * Check if the menuItem is a match to the targetSelector and doesn't contain activeClass,
     * if true, add the activeClass to the menuItem and call handleSubmenu function.
     * @param menuItem - the HTMLAnchorElement to be checked.
     * @returns void
     * @since Version 1.0.0
     */
    SpyScroller.prototype.ActiveLinkChecker = function (menuItem) {
        var _a;
        if (menuItem.matches(this.options.targetSelector) && !this.options.activeClass.some(function (className) { return menuItem.classList.contains(className); })) {
            (_a = menuItem.classList).add.apply(_a, this.options.activeClass);
            this.handleSubmenu(menuItem); // call handleSubmenu function to check for submenu and add active class
        }
        menuItem.scrollIntoView({ behavior: "smooth" }); // scroll the menuItem into view with smooth behavior
    };
    /**
     * Check if the menuItem is a submenu and add the active class to its parent <li> element if needed.
     * @param menuItem - the HTMLAnchorElement that represents the menu item to be checked.
     * @returns boolean - true if the menuItem is a submenu and its parent <li> element was updated, false otherwise.
     * @since Version 1.0.0
     */
    SpyScroller.prototype.handleSubmenu = function (menuItem) {
        var _a;
        // Check if the current section is nested inside a <ul> tag
        var parentLi = menuItem.closest("li");
        if (parentLi) {
            var parentUl = parentLi.closest("ul");
            if (parentUl && parentUl.closest("li")) {
                var parentLi_1 = parentUl.closest("li");
                if (parentLi_1) {
                    // Add the active class to the parent <li> element
                    (_a = parentLi_1.classList).add.apply(_a, this.options.activeClass);
                    // Return true to indicate that the submenu was handled
                    return true;
                }
            }
        }
        // Return false to indicate that the submenu was not handled
        return false;
    };
    /**
     * Perform actions based on the current scroll position and the active section and menu item.
     * @returns void
     * @since Version 1.0.0
     */
    SpyScroller.prototype.onScroll = function () {
        var section = this.currentActiveSection();
        if (this.lastActiveSection == section)
            return;
        this.lastActiveSection = section;
        this.executeSectionChanged(section, this.sections);
        var menuItem = this.getActiveMenuItem(section);
        //if (this.options.animation.enabled) BrewwAnimationHandlerObj.animateInitiater(this.options.animation,section,this.sections,this.options.animationType);
        if (menuItem) {
            this.removeActiveLink({ ignore: menuItem });
            this.ActiveLinkChecker(menuItem);
        }
        if (this.options.onLastScrollInView) {
            this.executeLastSectionCallbackIfInView(section);
        }
        if (this.options.onFirstScrollInView) {
            this.executeFistSectionCallbackIfInView(section);
        }
    };
    SpyScroller.prototype.executeSectionChanged = function (section, sections) {
        this.options.onSectionChange(section, sections, this.options.animation);
    };
    SpyScroller.prototype.executeLastSectionCallbackIfInView = function (section) {
        // const lastSection = this.sections[this.sections.length - 1];
        // const startAt = lastSection.offsetTop;
        // const endAt = startAt + lastSection.offsetHeight;
        // const currentPosition = (document.documentElement.scrollTop || document.body.scrollTop) + this.options.topOffset;
        // if (currentPosition >= startAt && currentPosition < endAt) {
        //   this.options.onLastScrollInView();
        // }
    };
    SpyScroller.prototype.executeFistSectionCallbackIfInView = function (section) {
        // const firstSection = this.sections[0];
        // const firstSectionTop = firstSection.offsetTop;
        // const scrollTop = window.pageYOffset;
        // if (scrollTop <= firstSectionTop) {
        //   this.options.onFirstScrollInView();
        // }
    };
    /**
     * Method open To All
     * Add an event listener to the window object that calls the boundOnScroll and onSectionScroll methods when the user scrolls.
     * @returns void
     * @since Version 1.0.0
     */
    SpyScroller.prototype.bind = function () {
        this.boundOnScroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.boundOnScroll);
    };
    /**
     * Remove the event listener from the window object that was added by the bind method.
     * @returns void
     * @since Version 1.0.0
     */
    SpyScroller.prototype.unbind = function () {
        window.removeEventListener("scroll", this.boundOnScroll);
        this.boundOnScroll = null;
    };
    SpyScroller.prototype.getCurrentSection = function (isChild) {
        if (isChild === void 0) { isChild = false; }
        var childObject = null;
        if (isChild)
            childObject = this.currentSectionChild();
        var sectioninfo = {
            currentActiveSectionElement: this.currentActiveSection(),
            currentActiveSectionIndex: Array.from(this.sections).indexOf(this.currentActiveSection()),
            currentSectionId: this.currentActiveSection().getAttribute("id"),
            currentSectionDataList: this.currentActiveSection().attributes,
            currentSectionClassList: this.currentActiveSection().classList,
            currentSectionChildElementCount: this.currentActiveSection().childElementCount,
            currentSectionFirstChild: this.currentActiveSection().firstElementChild,
            currentSectionLastChild: this.currentActiveSection().lastElementChild,
            currentSectiionChildElementNclass: childObject
        };
        return sectioninfo;
    };
    SpyScroller.prototype.currentSectionChild = function () {
        var children = this.currentActiveSection().children;
        var childObjects = [];
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var attributes = {};
            for (var j = 0; j < child.attributes.length; j++) {
                var attribute = child.attributes[j];
                attributes[attribute.name] = attribute.value;
            }
            var classes = Array.from(child.classList);
            var childObject = { tag: child.tagName, attributes: attributes, classes: classes };
            childObjects.push(childObject);
        }
    };
    return SpyScroller;
}());
/* harmony default export */ const src_SpyScroller = (SpyScroller);


__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});