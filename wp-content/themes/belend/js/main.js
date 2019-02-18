/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp-content/themes/belend/js";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./wp-content/themes/belend/src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/intersection-observer/intersection-observer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/intersection-observer/intersection-observer.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */

(function(window, document) {
'use strict';


// Exits early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observing a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }
  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}(window, document));


/***/ }),

/***/ "./wp-content/themes/belend/src/js/Fallback.js":
/*!*****************************************************!*\
  !*** ./wp-content/themes/belend/src/js/Fallback.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Snif__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Snif */ "./wp-content/themes/belend/src/js/Snif.js");


function Fallback() {
  this.html = document.documentElement;
}

Fallback.prototype.init = function init() {
  if (_Snif__WEBPACK_IMPORTED_MODULE_0__["default"].isIOS()) this.html.classList.add('is-ios');
  if (_Snif__WEBPACK_IMPORTED_MODULE_0__["default"].isSafari()) this.html.classList.add('is-safari');
  if (_Snif__WEBPACK_IMPORTED_MODULE_0__["default"].isFF()) this.html.classList.add('is-ff');
  if (_Snif__WEBPACK_IMPORTED_MODULE_0__["default"].isChromeAndroid()) this.html.classList.add('is-ca');
  if (_Snif__WEBPACK_IMPORTED_MODULE_0__["default"].isMS()) this.html.classList.add('is-ms');
  if (_Snif__WEBPACK_IMPORTED_MODULE_0__["default"].isIe11()) this.html.classList.add('is-ie');
};

/* harmony default export */ __webpack_exports__["default"] = (new Fallback());

/***/ }),

/***/ "./wp-content/themes/belend/src/js/Io.js":
/*!***********************************************!*\
  !*** ./wp-content/themes/belend/src/js/Io.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! intersection-observer */ "./node_modules/intersection-observer/intersection-observer.js");
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(intersection_observer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./wp-content/themes/belend/src/js/utils.js");



function IntersectionObserver() {
  var _this = this;

  this.resized = true;

  this.init = function () {
    var objectsToIO = [].slice.call(document.querySelectorAll('[data-io]'));
    var observer = new IntersectionObserver(function (entries) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["forEach"])(entries, function (entry) {
        if (entry.intersectionRatio > 0.15) {
          _this["".concat(entry.target.dataset.io, "In")](entry.target);

          if (entry.target.hasAttribute('data-io-single')) observer.unobserve(entry.target);
        } else if (entry.intersectionRatio < 0.15) {
          _this["".concat(entry.target.dataset.io, "Out")](entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-100px 0px'
    });
    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["forEach"])(objectsToIO, function (obj) {
      if (!obj.hasAttribute('data-io-observed')) {
        observer.observe(obj);
        obj.setAttribute('data-io-observed', '');
      }
    });
  };
}

/* harmony default export */ __webpack_exports__["default"] = (new IntersectionObserver());

/***/ }),

/***/ "./wp-content/themes/belend/src/js/Scroll.js":
/*!***************************************************!*\
  !*** ./wp-content/themes/belend/src/js/Scroll.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./wp-content/themes/belend/src/js/utils.js");


function Scroll() {
  this.scrollTop = null;
  this.event = null;
  this.timeoutScroll = null;
  this.scrollEnd = true;
}

Scroll.prototype.scrollHandler = function scrollHandler() {
  var _this = this;

  this.scrollTop = window.pageYOffset || window.scrollY;

  if (this.scrollEnd) {
    this.scrollEnd = false;
  }

  clearTimeout(this.timeoutScroll);
  this.timeoutScroll = setTimeout(function () {
    _this.onScrollEnd();
  }, 66);
};

Scroll.prototype.launchScroll = function launchScroll(e) {
  var _this2 = this;

  this.event = e;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["requestAnimFrame"])(function () {
    _this2.scrollHandler();
  });
};

Scroll.prototype.init = function initScroll() {
  var _this3 = this;

  this.scrollHandler();
  window.addEventListener('scroll', function () {
    _this3.launchScroll();
  }, false);
};

Scroll.prototype.destroyScroll = function destroyScroll() {
  var _this4 = this;

  window.removeEventListener('scroll', function () {
    _this4.launchScroll();
  }, false);
};

Scroll.prototype.onScrollEnd = function onScrollEnd() {
  this.scrollEnd = true;
};

/* harmony default export */ __webpack_exports__["default"] = (new Scroll());

/***/ }),

/***/ "./wp-content/themes/belend/src/js/Snif.js":
/*!*************************************************!*\
  !*** ./wp-content/themes/belend/src/js/Snif.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function Snif() {
  var uA = navigator.userAgent.toLowerCase();
  var snifTests = {
    isIOS: /iphone|ipad|ipod/i.test(uA),
    isSafari: !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== 'undefined' && !window.chrome || /a/.__proto__ == '//',
    isBlackberry: /blackberry/i.test(uA),
    isMobileIE: /iemobile/i.test(uA),
    isFF: 'MozAppearance' in document.documentElement.style,
    isMS: '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style,
    mixBlendModeSupport: 'CSS' in window && 'supports' in window.CSS && window.CSS.supports('mix-blend-mode', 'multiply'),
    isMobileAndroid: /android.*mobile/.test(uA),
    safari: uA.match(/version\/[\d\.]+.*safari/)
  };
  snifTests.isAndroid = snifTests.isMobileAndroid || !snifTests.isMobileAndroid && /android/i.test(uA);
  snifTests.isSafari = !!snifTests.safari && !snifTests.isAndroid;

  this.getSnifTests = function () {
    return snifTests;
  };
}

Snif.prototype.isIOS = function isIOS() {
  return this.getSnifTests().isIOS;
};

Snif.prototype.isAndroid = function isAndroid() {
  return this.getSnifTests().isIOS;
};

Snif.prototype.isChrome = function isChrome() {
  return !!window.chrome && !!window.chrome.webstore;
};

Snif.prototype.isMobile = function isMobile() {
  return this.getSnifTests().isMobileAndroid || this.getSnifTests().isBlackberry || this.getSnifTests().isIOS || this.getSnifTests().isMobileIE;
}, Snif.prototype.isChromeAndroid = function isChromeAndroid() {
  return this.getSnifTests().isMobileAndroid && this.isChrome();
};

Snif.prototype.isSafari = function isSafari() {
  return this.getSnifTests().isSafari;
};

Snif.prototype.isFF = function isFF() {
  return this.getSnifTests().isFF;
};

Snif.prototype.isMS = function isMS() {
  return this.getSnifTests().isMS;
};

Snif.prototype.mixBlendModeSupport = function mixBlendModeSupport() {
  return this.getSnifTests().mixBlendModeSupport;
};

Snif.prototype.isIe11 = function isIe11() {
  return document.body.style.msTouchAction !== undefined;
};

/* harmony default export */ __webpack_exports__["default"] = (new Snif());

/***/ }),

/***/ "./wp-content/themes/belend/src/js/Window.js":
/*!***************************************************!*\
  !*** ./wp-content/themes/belend/src/js/Window.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./wp-content/themes/belend/src/js/utils.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



function Window() {
  this.w = null;
  this.h = null;
  this.resizeFunctions = [];
  this.rtime = null;
  this.timeoutWindow = false;
  this.delta = 200;
  this.noTransitionElts = [];
}

Window.prototype.setNoTransitionElts = function setNoTransitionElts(elements) {
  this.noTransitionElts = elements;
};

Window.prototype.resizeend = function resizeend() {
  var _this = this;

  if (new Date() - this.rtime < this.delta) {
    setTimeout(function () {
      _this.resizeend();
    }, this.delta);
  } else {
    this.timeoutWindow = false;

    _toConsumableArray(this.noTransitionElts).map(function (el) {
      el.classList.remove('no-transition');
      return el;
    });
  }
};

Window.prototype.noTransition = function noTransition() {
  var _this2 = this;

  _toConsumableArray(this.noTransitionElts).map(function (el) {
    el.classList.add('no-transition');
    return el;
  });

  this.rtime = new Date();

  if (this.timeoutWindow === false) {
    this.timeoutWindow = true;
    setTimeout(function () {
      _this2.resizeend();
    }, this.delta);
  }
};

Window.prototype.resizeHandler = function resizeHandler() {
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  this.noTransition();
};

Window.prototype.launchWindow = function launchWindow() {
  var _this3 = this;

  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["requestAnimFrame"])(function () {
    _this3.resizeHandler();
  });
};

Window.prototype.init = function initWindow() {
  var _this4 = this;

  this.resizeHandler();
  window.addEventListener('resize', function () {
    _this4.launchWindow();
  }, false);
};

Window.prototype.destroyWindow = function destroyWindow() {
  var _this5 = this;

  window.removeEventListener('resize', function () {
    _this5.launchWindow();
  }, false);
};

/* harmony default export */ __webpack_exports__["default"] = (new Window());

/***/ }),

/***/ "./wp-content/themes/belend/src/js/burger.js":
/*!***************************************************!*\
  !*** ./wp-content/themes/belend/src/js/burger.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var burgerHandler = function burgerHandler() {
  var _document$getElements = document.getElementsByClassName('js-burger'),
      _document$getElements2 = _slicedToArray(_document$getElements, 1),
      burger = _document$getElements2[0];

  var _document$getElements3 = document.getElementsByClassName('js-main-navigation'),
      _document$getElements4 = _slicedToArray(_document$getElements3, 1),
      mainNav = _document$getElements4[0];

  if (burger) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('activated');
      mainNav.classList.toggle('activated');
    }, false);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (burgerHandler);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/main.js":
/*!*************************************************!*\
  !*** ./wp-content/themes/belend/src/js/main.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./wp-content/themes/belend/src/scss/main.scss");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Window */ "./wp-content/themes/belend/src/js/Window.js");
/* harmony import */ var _Io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Io */ "./wp-content/themes/belend/src/js/Io.js");
/* harmony import */ var _Scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Scroll */ "./wp-content/themes/belend/src/js/Scroll.js");
/* harmony import */ var _Fallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Fallback */ "./wp-content/themes/belend/src/js/Fallback.js");
/* harmony import */ var _burger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./burger */ "./wp-content/themes/belend/src/js/burger.js");







var loadHandler = function loadHandler() {
  _Scroll__WEBPACK_IMPORTED_MODULE_3__["default"].init();
  var noTransElem = [].slice.call(document.getElementsByClassName('element-without-transition-on-resize'));
  _Window__WEBPACK_IMPORTED_MODULE_1__["default"].setNoTransitionElts(noTransElem);
  _Window__WEBPACK_IMPORTED_MODULE_1__["default"].init();
  _Io__WEBPACK_IMPORTED_MODULE_2__["default"].init();
  _Fallback__WEBPACK_IMPORTED_MODULE_4__["default"].init();
  Object(_burger__WEBPACK_IMPORTED_MODULE_5__["default"])();
};

document.addEventListener('readystatechange', function () {
  if (document.readyState === 'complete') {
    loadHandler();
  }
}, false);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/utils.js":
/*!**************************************************!*\
  !*** ./wp-content/themes/belend/src/js/utils.js ***!
  \**************************************************/
/*! exports provided: forEach, requestAnimFrame, throttle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestAnimFrame", function() { return requestAnimFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
var forEach = function forEach(arr, callback) {
  var i = 0;
  var length = arr.length;

  while (i < length) {
    callback(arr[i], i);
    i += 1;
  }
};
var requestAnimFrame = function requestAnimFrame(cb) {
  var anim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  return anim(cb);
};
var throttle = function throttle(callback, delay) {
  var last;
  var timer;
  return function throttleFunction() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var now = +new Date();

    var reset = function reset() {
      last = now;
      callback.apply(_this, args);
    };

    if (last && now < last + delay) {
      // le délai n'est pas écoulé on reset le timer
      clearTimeout(timer);
      timer = setTimeout(reset, delay);
    } else {
      reset();
    }
  };
};
/* harmony default export */ __webpack_exports__["default"] = ({
  forEach: forEach,
  requestAnimFrame: requestAnimFrame,
  throttle: throttle
});

/***/ }),

/***/ "./wp-content/themes/belend/src/scss/main.scss":
/*!*****************************************************!*\
  !*** ./wp-content/themes/belend/src/scss/main.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleBuildError: Module build failed (from ./node_modules/sass-loader/lib/loader.js):\n\n@import \"pages/home\", \"pages/contact\";\n^\n      File to import not found or unreadable: pages/contact.\n      in /Users/elisabeth/Travail/Stereo/belend/wp-content/themes/belend/src/scss/main.scss (line 17, column 1)\n    at runLoaders (/Users/elisabeth/Travail/Stereo/belend/node_modules/webpack/lib/NormalModule.js:301:20)\n    at /Users/elisabeth/Travail/Stereo/belend/node_modules/loader-runner/lib/LoaderRunner.js:367:11\n    at /Users/elisabeth/Travail/Stereo/belend/node_modules/loader-runner/lib/LoaderRunner.js:233:18\n    at context.callback (/Users/elisabeth/Travail/Stereo/belend/node_modules/loader-runner/lib/LoaderRunner.js:111:13)\n    at Object.render [as callback] (/Users/elisabeth/Travail/Stereo/belend/node_modules/sass-loader/lib/loader.js:52:13)\n    at Object.done [as callback] (/Users/elisabeth/Travail/Stereo/belend/node_modules/neo-async/async.js:8077:18)\n    at options.error (/Users/elisabeth/Travail/Stereo/belend/node_modules/node-sass/lib/index.js:294:32)");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map