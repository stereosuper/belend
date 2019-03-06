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

/***/ "./node_modules/algoliasearch/node_modules/debug/src/browser.js":
/*!**********************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/debug/src/browser.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/algoliasearch/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/algoliasearch/node_modules/debug/src/debug.js":
/*!********************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/debug/src/debug.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/algoliasearch/node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/algoliasearch/node_modules/ms/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/ms/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/AlgoliaSearchCore.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/AlgoliaSearchCore.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {module.exports = AlgoliaSearchCore;

var errors = __webpack_require__(/*! ./errors */ "./node_modules/algoliasearch/src/errors.js");
var exitPromise = __webpack_require__(/*! ./exitPromise.js */ "./node_modules/algoliasearch/src/exitPromise.js");
var IndexCore = __webpack_require__(/*! ./IndexCore.js */ "./node_modules/algoliasearch/src/IndexCore.js");
var store = __webpack_require__(/*! ./store.js */ "./node_modules/algoliasearch/src/store.js");

// We will always put the API KEY in the JSON body in case of too long API KEY,
// to avoid query string being too long and failing in various conditions (our server limit, browser limit,
// proxies limit)
var MAX_API_KEY_LENGTH = 500;
var RESET_APP_DATA_TIMER =
  process.env.RESET_APP_DATA_TIMER && parseInt(process.env.RESET_APP_DATA_TIMER, 10) ||
  60 * 2 * 1000; // after 2 minutes reset to first host

/*
 * Algolia Search library initialization
 * https://www.algolia.com/
 *
 * @param {string} applicationID - Your applicationID, found in your dashboard
 * @param {string} apiKey - Your API key, found in your dashboard
 * @param {Object} [opts]
 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
 * another request will be issued after this timeout
 * @param {string} [opts.protocol='https:'] - The protocol used to query Algolia Search API.
 *                                        Set to 'http:' to force using http.
 * @param {Object|Array} [opts.hosts={
 *           read: [this.applicationID + '-dsn.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]),
 *           write: [this.applicationID + '.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]) - The hosts to use for Algolia Search API.
 *           If you provide them, you will less benefit from our HA implementation
 */
function AlgoliaSearchCore(applicationID, apiKey, opts) {
  var debug = __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js")('algoliasearch');

  var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

  if (opts._allowEmptyCredentials !== true && !applicationID) {
    throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
  }

  if (opts._allowEmptyCredentials !== true && !apiKey) {
    throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
  }

  this.applicationID = applicationID;
  this.apiKey = apiKey;

  this.hosts = {
    read: [],
    write: []
  };

  opts = opts || {};

  this._timeouts = opts.timeouts || {
    connect: 1 * 1000, // 500ms connect is GPRS latency
    read: 2 * 1000,
    write: 30 * 1000
  };

  // backward compat, if opts.timeout is passed, we use it to configure all timeouts like before
  if (opts.timeout) {
    this._timeouts.connect = this._timeouts.read = this._timeouts.write = opts.timeout;
  }

  var protocol = opts.protocol || 'https:';
  // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
  // we also accept `http` and `https`. It's a common error.
  if (!/:$/.test(protocol)) {
    protocol = protocol + ':';
  }

  if (protocol !== 'http:' && protocol !== 'https:') {
    throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
  }

  this._checkAppIdData();

  if (!opts.hosts) {
    var defaultHosts = map(this._shuffleResult, function(hostNumber) {
      return applicationID + '-' + hostNumber + '.algolianet.com';
    });

    // no hosts given, compute defaults
    var mainSuffix = (opts.dsn === false ? '' : '-dsn') + '.algolia.net';
    this.hosts.read = [this.applicationID + mainSuffix].concat(defaultHosts);
    this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
  } else if (isArray(opts.hosts)) {
    // when passing custom hosts, we need to have a different host index if the number
    // of write/read hosts are different.
    this.hosts.read = clone(opts.hosts);
    this.hosts.write = clone(opts.hosts);
  } else {
    this.hosts.read = clone(opts.hosts.read);
    this.hosts.write = clone(opts.hosts.write);
  }

  // add protocol and lowercase hosts
  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
  this.hosts.write = map(this.hosts.write, prepareHost(protocol));

  this.extraHeaders = {};

  // In some situations you might want to warm the cache
  this.cache = opts._cache || {};

  this._ua = opts._ua;
  this._useCache = opts._useCache === undefined || opts._cache ? true : opts._useCache;
  this._useRequestCache = this._useCache && opts._useRequestCache;
  this._useFallback = opts.useFallback === undefined ? true : opts.useFallback;

  this._setTimeout = opts._setTimeout;

  debug('init done, %j', this);
}

/*
 * Get the index object initialized
 *
 * @param indexName the name of index
 * @param callback the result callback with one argument (the Index instance)
 */
AlgoliaSearchCore.prototype.initIndex = function(indexName) {
  return new IndexCore(this, indexName);
};

/**
* Add an extra field to the HTTP request
*
* @param name the header field name
* @param value the header field value
*/
AlgoliaSearchCore.prototype.setExtraHeader = function(name, value) {
  this.extraHeaders[name.toLowerCase()] = value;
};

/**
* Get the value of an extra HTTP header
*
* @param name the header field name
*/
AlgoliaSearchCore.prototype.getExtraHeader = function(name) {
  return this.extraHeaders[name.toLowerCase()];
};

/**
* Remove an extra field from the HTTP request
*
* @param name the header field name
*/
AlgoliaSearchCore.prototype.unsetExtraHeader = function(name) {
  delete this.extraHeaders[name.toLowerCase()];
};

/**
* Augment sent x-algolia-agent with more data, each agent part
* is automatically separated from the others by a semicolon;
*
* @param algoliaAgent the agent to add
*/
AlgoliaSearchCore.prototype.addAlgoliaAgent = function(algoliaAgent) {
  if (this._ua.indexOf(';' + algoliaAgent) === -1) {
    this._ua += ';' + algoliaAgent;
  }
};

/*
 * Wrapper that try all hosts to maximize the quality of service
 */
AlgoliaSearchCore.prototype._jsonRequest = function(initialOpts) {
  this._checkAppIdData();

  var requestDebug = __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js")('algoliasearch:' + initialOpts.url);


  var body;
  var cacheID;
  var additionalUA = initialOpts.additionalUA || '';
  var cache = initialOpts.cache;
  var client = this;
  var tries = 0;
  var usingFallback = false;
  var hasFallback = client._useFallback && client._request.fallback && initialOpts.fallback;
  var headers;

  if (
    this.apiKey.length > MAX_API_KEY_LENGTH &&
    initialOpts.body !== undefined &&
    (initialOpts.body.params !== undefined || // index.search()
    initialOpts.body.requests !== undefined) // client.search()
  ) {
    initialOpts.body.apiKey = this.apiKey;
    headers = this._computeRequestHeaders({
      additionalUA: additionalUA,
      withApiKey: false,
      headers: initialOpts.headers
    });
  } else {
    headers = this._computeRequestHeaders({
      additionalUA: additionalUA,
      headers: initialOpts.headers
    });
  }

  if (initialOpts.body !== undefined) {
    body = safeJSONStringify(initialOpts.body);
  }

  requestDebug('request start');
  var debugData = [];


  function doRequest(requester, reqOpts) {
    client._checkAppIdData();

    var startTime = new Date();

    if (client._useCache && !client._useRequestCache) {
      cacheID = initialOpts.url;
    }

    // as we sometime use POST requests to pass parameters (like query='aa'),
    // the cacheID must also include the body to be different between calls
    if (client._useCache && !client._useRequestCache && body) {
      cacheID += '_body_' + reqOpts.body;
    }

    // handle cache existence
    if (isCacheValidWithCurrentID(!client._useRequestCache, cache, cacheID)) {
      requestDebug('serving response from cache');

      var responseText = cache[cacheID];

      // Cache response must match the type of the original one
      return client._promise.resolve({
        body: JSON.parse(responseText),
        responseText: responseText
      });
    }

    // if we reached max tries
    if (tries >= client.hosts[initialOpts.hostType].length) {
      if (!hasFallback || usingFallback) {
        requestDebug('could not get any response');
        // then stop
        return client._promise.reject(new errors.AlgoliaSearchError(
          'Cannot connect to the AlgoliaSearch API.' +
          ' Send an email to support@algolia.com to report and resolve the issue.' +
          ' Application id was: ' + client.applicationID, {debugData: debugData}
        ));
      }

      requestDebug('switching to fallback');

      // let's try the fallback starting from here
      tries = 0;

      // method, url and body are fallback dependent
      reqOpts.method = initialOpts.fallback.method;
      reqOpts.url = initialOpts.fallback.url;
      reqOpts.jsonBody = initialOpts.fallback.body;
      if (reqOpts.jsonBody) {
        reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
      }
      // re-compute headers, they could be omitting the API KEY
      headers = client._computeRequestHeaders({
        additionalUA: additionalUA,
        headers: initialOpts.headers
      });

      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
      client._setHostIndexByType(0, initialOpts.hostType);
      usingFallback = true; // the current request is now using fallback
      return doRequest(client._request.fallback, reqOpts);
    }

    var currentHost = client._getHostByType(initialOpts.hostType);

    var url = currentHost + reqOpts.url;
    var options = {
      body: reqOpts.body,
      jsonBody: reqOpts.jsonBody,
      method: reqOpts.method,
      headers: headers,
      timeouts: reqOpts.timeouts,
      debug: requestDebug,
      forceAuthHeaders: reqOpts.forceAuthHeaders
    };

    requestDebug('method: %s, url: %s, headers: %j, timeouts: %d',
      options.method, url, options.headers, options.timeouts);

    if (requester === client._request.fallback) {
      requestDebug('using fallback');
    }

    // `requester` is any of this._request or this._request.fallback
    // thus it needs to be called using the client as context
    return requester.call(client, url, options).then(success, tryFallback);

    function success(httpResponse) {
      // compute the status of the response,
      //
      // When in browser mode, using XDR or JSONP, we have no statusCode available
      // So we rely on our API response `status` property.
      // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
      // So we check if there's a `message` along `status` and it means it's an error
      //
      // That's the only case where we have a response.status that's not the http statusCode
      var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||

        // this is important to check the request statusCode AFTER the body eventual
        // statusCode because some implementations (jQuery XDomainRequest transport) may
        // send statusCode 200 while we had an error
        httpResponse.statusCode ||

        // When in browser mode, using XDR or JSONP
        // we default to success when no error (no response.status && response.message)
        // If there was a JSON.parse() error then body is null and it fails
        httpResponse && httpResponse.body && 200;

      requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j',
        httpResponse.statusCode, status, httpResponse.headers);

      var httpResponseOk = Math.floor(status / 100) === 2;

      var endTime = new Date();
      debugData.push({
        currentHost: currentHost,
        headers: removeCredentials(headers),
        content: body || null,
        contentLength: body !== undefined ? body.length : null,
        method: reqOpts.method,
        timeouts: reqOpts.timeouts,
        url: reqOpts.url,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime,
        statusCode: status
      });

      if (httpResponseOk) {
        if (client._useCache && !client._useRequestCache && cache) {
          cache[cacheID] = httpResponse.responseText;
        }

        return {
          responseText: httpResponse.responseText,
          body: httpResponse.body
        };
      }

      var shouldRetry = Math.floor(status / 100) !== 4;

      if (shouldRetry) {
        tries += 1;
        return retryRequest();
      }

      requestDebug('unrecoverable error');

      // no success and no retry => fail
      var unrecoverableError = new errors.AlgoliaSearchError(
        httpResponse.body && httpResponse.body.message, {debugData: debugData, statusCode: status}
      );

      return client._promise.reject(unrecoverableError);
    }

    function tryFallback(err) {
      // error cases:
      //  While not in fallback mode:
      //    - CORS not supported
      //    - network error
      //  While in fallback mode:
      //    - timeout
      //    - network error
      //    - badly formatted JSONP (script loaded, did not call our callback)
      //  In both cases:
      //    - uncaught exception occurs (TypeError)
      requestDebug('error: %s, stack: %s', err.message, err.stack);

      var endTime = new Date();
      debugData.push({
        currentHost: currentHost,
        headers: removeCredentials(headers),
        content: body || null,
        contentLength: body !== undefined ? body.length : null,
        method: reqOpts.method,
        timeouts: reqOpts.timeouts,
        url: reqOpts.url,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime
      });

      if (!(err instanceof errors.AlgoliaSearchError)) {
        err = new errors.Unknown(err && err.message, err);
      }

      tries += 1;

      // stop the request implementation when:
      if (
        // we did not generate this error,
        // it comes from a throw in some other piece of code
        err instanceof errors.Unknown ||

        // server sent unparsable JSON
        err instanceof errors.UnparsableJSON ||

        // max tries and already using fallback or no fallback
        tries >= client.hosts[initialOpts.hostType].length &&
        (usingFallback || !hasFallback)) {
        // stop request implementation for this command
        err.debugData = debugData;
        return client._promise.reject(err);
      }

      // When a timeout occured, retry by raising timeout
      if (err instanceof errors.RequestTimeout) {
        return retryRequestWithHigherTimeout();
      }

      return retryRequest();
    }

    function retryRequest() {
      requestDebug('retrying request');
      client._incrementHostIndex(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }

    function retryRequestWithHigherTimeout() {
      requestDebug('retrying request with higher timeout');
      client._incrementHostIndex(initialOpts.hostType);
      client._incrementTimeoutMultipler();
      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }
  }

  function isCacheValidWithCurrentID(
    useRequestCache,
    currentCache,
    currentCacheID
  ) {
    return (
      client._useCache &&
      useRequestCache &&
      currentCache &&
      currentCache[currentCacheID] !== undefined
    );
  }


  function interopCallbackReturn(request, callback) {
    if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
      request.catch(function() {
        // Release the cache on error
        delete cache[cacheID];
      });
    }

    if (typeof initialOpts.callback === 'function') {
      // either we have a callback
      request.then(function okCb(content) {
        exitPromise(function() {
          initialOpts.callback(null, callback(content));
        }, client._setTimeout || setTimeout);
      }, function nookCb(err) {
        exitPromise(function() {
          initialOpts.callback(err);
        }, client._setTimeout || setTimeout);
      });
    } else {
      // either we are using promises
      return request.then(callback);
    }
  }

  if (client._useCache && client._useRequestCache) {
    cacheID = initialOpts.url;
  }

  // as we sometime use POST requests to pass parameters (like query='aa'),
  // the cacheID must also include the body to be different between calls
  if (client._useCache && client._useRequestCache && body) {
    cacheID += '_body_' + body;
  }

  if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
    requestDebug('serving request from cache');

    var maybePromiseForCache = cache[cacheID];

    // In case the cache is warmup with value that is not a promise
    var promiseForCache = typeof maybePromiseForCache.then !== 'function'
      ? client._promise.resolve({responseText: maybePromiseForCache})
      : maybePromiseForCache;

    return interopCallbackReturn(promiseForCache, function(content) {
      // In case of the cache request, return the original value
      return JSON.parse(content.responseText);
    });
  }

  var request = doRequest(
    client._request, {
      url: initialOpts.url,
      method: initialOpts.method,
      body: body,
      jsonBody: initialOpts.body,
      timeouts: client._getTimeoutsForRequest(initialOpts.hostType),
      forceAuthHeaders: initialOpts.forceAuthHeaders
    }
  );

  if (client._useCache && client._useRequestCache && cache) {
    cache[cacheID] = request;
  }

  return interopCallbackReturn(request, function(content) {
    // In case of the first request, return the JSON value
    return content.body;
  });
};

/*
* Transform search param object in query string
* @param {object} args arguments to add to the current query string
* @param {string} params current query string
* @return {string} the final query string
*/
AlgoliaSearchCore.prototype._getSearchParams = function(args, params) {
  if (args === undefined || args === null) {
    return params;
  }
  for (var key in args) {
    if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
      params += params === '' ? '' : '&';
      params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
    }
  }
  return params;
};

/**
 * Compute the headers for a request
 *
 * @param [string] options.additionalUA semi-colon separated string with other user agents to add
 * @param [boolean=true] options.withApiKey Send the api key as a header
 * @param [Object] options.headers Extra headers to send
 */
AlgoliaSearchCore.prototype._computeRequestHeaders = function(options) {
  var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

  var ua = options.additionalUA ?
    this._ua + ';' + options.additionalUA :
    this._ua;

  var requestHeaders = {
    'x-algolia-agent': ua,
    'x-algolia-application-id': this.applicationID
  };

  // browser will inline headers in the url, node.js will use http headers
  // but in some situations, the API KEY will be too long (big secured API keys)
  // so if the request is a POST and the KEY is very long, we will be asked to not put
  // it into headers but in the JSON body
  if (options.withApiKey !== false) {
    requestHeaders['x-algolia-api-key'] = this.apiKey;
  }

  if (this.userToken) {
    requestHeaders['x-algolia-usertoken'] = this.userToken;
  }

  if (this.securityTags) {
    requestHeaders['x-algolia-tagfilters'] = this.securityTags;
  }

  forEach(this.extraHeaders, function addToRequestHeaders(value, key) {
    requestHeaders[key] = value;
  });

  if (options.headers) {
    forEach(options.headers, function addToRequestHeaders(value, key) {
      requestHeaders[key] = value;
    });
  }

  return requestHeaders;
};

/**
 * Search through multiple indices at the same time
 * @param  {Object[]}   queries  An array of queries you want to run.
 * @param {string} queries[].indexName The index name you want to target
 * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
 * @param {Object} queries[].params Any search param like hitsPerPage, ..
 * @param  {Function} callback Callback to be called
 * @return {Promise|undefined} Returns a promise if no callback given
 */
AlgoliaSearchCore.prototype.search = function(queries, opts, callback) {
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: client.search(arrayOfQueries[, callback])';

  if (!isArray(queries)) {
    throw new Error(usage);
  }

  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else if (opts === undefined) {
    opts = {};
  }

  var client = this;

  var postObj = {
    requests: map(queries, function prepareRequest(query) {
      var params = '';

      // allow query.query
      // so we are mimicing the index.search(query, params) method
      // {indexName:, query:, params:}
      if (query.query !== undefined) {
        params += 'query=' + encodeURIComponent(query.query);
      }

      return {
        indexName: query.indexName,
        params: client._getSearchParams(query.params, params)
      };
    })
  };

  var JSONPParams = map(postObj.requests, function prepareJSONPParams(request, requestId) {
    return requestId + '=' +
      encodeURIComponent(
        '/1/indexes/' + encodeURIComponent(request.indexName) + '?' +
        request.params
      );
  }).join('&');

  var url = '/1/indexes/*/queries';

  if (opts.strategy !== undefined) {
    postObj.strategy = opts.strategy;
  }

  return this._jsonRequest({
    cache: this.cache,
    method: 'POST',
    url: url,
    body: postObj,
    hostType: 'read',
    fallback: {
      method: 'GET',
      url: '/1/indexes/*',
      body: {
        params: JSONPParams
      }
    },
    callback: callback
  });
};

/**
* Search for facet values
* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
* This is the top-level API for SFFV.
*
* @param {object[]} queries An array of queries to run.
* @param {string} queries[].indexName Index name, name of the index to search.
* @param {object} queries[].params Query parameters.
* @param {string} queries[].params.facetName Facet name, name of the attribute to search for values in.
* Must be declared as a facet
* @param {string} queries[].params.facetQuery Query for the facet search
* @param {string} [queries[].params.*] Any search parameter of Algolia,
* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
*/
AlgoliaSearchCore.prototype.searchForFacetValues = function(queries) {
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: client.searchForFacetValues([{indexName, params: {facetName, facetQuery, ...params}}, ...queries])'; // eslint-disable-line max-len

  if (!isArray(queries)) {
    throw new Error(usage);
  }

  var client = this;

  return client._promise.all(map(queries, function performQuery(query) {
    if (
      !query ||
      query.indexName === undefined ||
      query.params.facetName === undefined ||
      query.params.facetQuery === undefined
    ) {
      throw new Error(usage);
    }

    var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
    var omit = __webpack_require__(/*! ./omit.js */ "./node_modules/algoliasearch/src/omit.js");

    var indexName = query.indexName;
    var params = query.params;

    var facetName = params.facetName;
    var filteredParams = omit(clone(params), function(keyName) {
      return keyName === 'facetName';
    });
    var searchParameters = client._getSearchParams(filteredParams, '');

    return client._jsonRequest({
      cache: client.cache,
      method: 'POST',
      url:
        '/1/indexes/' +
        encodeURIComponent(indexName) +
        '/facets/' +
        encodeURIComponent(facetName) +
        '/query',
      hostType: 'read',
      body: {params: searchParameters}
    });
  }));
};

/**
 * Set the extra security tagFilters header
 * @param {string|array} tags The list of tags defining the current security filters
 */
AlgoliaSearchCore.prototype.setSecurityTags = function(tags) {
  if (Object.prototype.toString.call(tags) === '[object Array]') {
    var strTags = [];
    for (var i = 0; i < tags.length; ++i) {
      if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
        var oredTags = [];
        for (var j = 0; j < tags[i].length; ++j) {
          oredTags.push(tags[i][j]);
        }
        strTags.push('(' + oredTags.join(',') + ')');
      } else {
        strTags.push(tags[i]);
      }
    }
    tags = strTags.join(',');
  }

  this.securityTags = tags;
};

/**
 * Set the extra user token header
 * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
 */
AlgoliaSearchCore.prototype.setUserToken = function(userToken) {
  this.userToken = userToken;
};

/**
 * Clear all queries in client's cache
 * @return undefined
 */
AlgoliaSearchCore.prototype.clearCache = function() {
  this.cache = {};
};

/**
* Set the number of milliseconds a request can take before automatically being terminated.
* @deprecated
* @param {Number} milliseconds
*/
AlgoliaSearchCore.prototype.setRequestTimeout = function(milliseconds) {
  if (milliseconds) {
    this._timeouts.connect = this._timeouts.read = this._timeouts.write = milliseconds;
  }
};

/**
* Set the three different (connect, read, write) timeouts to be used when requesting
* @param {Object} timeouts
*/
AlgoliaSearchCore.prototype.setTimeouts = function(timeouts) {
  this._timeouts = timeouts;
};

/**
* Get the three different (connect, read, write) timeouts to be used when requesting
* @param {Object} timeouts
*/
AlgoliaSearchCore.prototype.getTimeouts = function() {
  return this._timeouts;
};

AlgoliaSearchCore.prototype._getAppIdData = function() {
  var data = store.get(this.applicationID);
  if (data !== null) this._cacheAppIdData(data);
  return data;
};

AlgoliaSearchCore.prototype._setAppIdData = function(data) {
  data.lastChange = (new Date()).getTime();
  this._cacheAppIdData(data);
  return store.set(this.applicationID, data);
};

AlgoliaSearchCore.prototype._checkAppIdData = function() {
  var data = this._getAppIdData();
  var now = (new Date()).getTime();
  if (data === null || now - data.lastChange > RESET_APP_DATA_TIMER) {
    return this._resetInitialAppIdData(data);
  }

  return data;
};

AlgoliaSearchCore.prototype._resetInitialAppIdData = function(data) {
  var newData = data || {};
  newData.hostIndexes = {read: 0, write: 0};
  newData.timeoutMultiplier = 1;
  newData.shuffleResult = newData.shuffleResult || shuffle([1, 2, 3]);
  return this._setAppIdData(newData);
};

AlgoliaSearchCore.prototype._cacheAppIdData = function(data) {
  this._hostIndexes = data.hostIndexes;
  this._timeoutMultiplier = data.timeoutMultiplier;
  this._shuffleResult = data.shuffleResult;
};

AlgoliaSearchCore.prototype._partialAppIdDataUpdate = function(newData) {
  var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");
  var currentData = this._getAppIdData();
  foreach(newData, function(value, key) {
    currentData[key] = value;
  });

  return this._setAppIdData(currentData);
};

AlgoliaSearchCore.prototype._getHostByType = function(hostType) {
  return this.hosts[hostType][this._getHostIndexByType(hostType)];
};

AlgoliaSearchCore.prototype._getTimeoutMultiplier = function() {
  return this._timeoutMultiplier;
};

AlgoliaSearchCore.prototype._getHostIndexByType = function(hostType) {
  return this._hostIndexes[hostType];
};

AlgoliaSearchCore.prototype._setHostIndexByType = function(hostIndex, hostType) {
  var clone = __webpack_require__(/*! ./clone */ "./node_modules/algoliasearch/src/clone.js");
  var newHostIndexes = clone(this._hostIndexes);
  newHostIndexes[hostType] = hostIndex;
  this._partialAppIdDataUpdate({hostIndexes: newHostIndexes});
  return hostIndex;
};

AlgoliaSearchCore.prototype._incrementHostIndex = function(hostType) {
  return this._setHostIndexByType(
    (this._getHostIndexByType(hostType) + 1) % this.hosts[hostType].length, hostType
  );
};

AlgoliaSearchCore.prototype._incrementTimeoutMultipler = function() {
  var timeoutMultiplier = Math.max(this._timeoutMultiplier + 1, 4);
  return this._partialAppIdDataUpdate({timeoutMultiplier: timeoutMultiplier});
};

AlgoliaSearchCore.prototype._getTimeoutsForRequest = function(hostType) {
  return {
    connect: this._timeouts.connect * this._timeoutMultiplier,
    complete: this._timeouts[hostType] * this._timeoutMultiplier
  };
};

function prepareHost(protocol) {
  return function prepare(host) {
    return protocol + '//' + host.toLowerCase();
  };
}

// Prototype.js < 1.7, a widely used library, defines a weird
// Array.prototype.toJSON function that will fail to stringify our content
// appropriately
// refs:
//   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
//   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
//   - http://stackoverflow.com/a/3148441/147079
function safeJSONStringify(obj) {
  /* eslint no-extend-native:0 */

  if (Array.prototype.toJSON === undefined) {
    return JSON.stringify(obj);
  }

  var toJSON = Array.prototype.toJSON;
  delete Array.prototype.toJSON;
  var out = JSON.stringify(obj);
  Array.prototype.toJSON = toJSON;

  return out;
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function removeCredentials(headers) {
  var newHeaders = {};

  for (var headerName in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, headerName)) {
      var value;

      if (headerName === 'x-algolia-api-key' || headerName === 'x-algolia-application-id') {
        value = '**hidden for security purposes**';
      } else {
        value = headers[headerName];
      }

      newHeaders[headerName] = value;
    }
  }

  return newHeaders;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/algoliasearch/src/IndexCore.js":
/*!*****************************************************!*\
  !*** ./node_modules/algoliasearch/src/IndexCore.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var buildSearchMethod = __webpack_require__(/*! ./buildSearchMethod.js */ "./node_modules/algoliasearch/src/buildSearchMethod.js");
var deprecate = __webpack_require__(/*! ./deprecate.js */ "./node_modules/algoliasearch/src/deprecate.js");
var deprecatedMessage = __webpack_require__(/*! ./deprecatedMessage.js */ "./node_modules/algoliasearch/src/deprecatedMessage.js");

module.exports = IndexCore;

/*
* Index class constructor.
* You should not use this method directly but use initIndex() function
*/
function IndexCore(algoliasearch, indexName) {
  this.indexName = indexName;
  this.as = algoliasearch;
  this.typeAheadArgs = null;
  this.typeAheadValueOption = null;

  // make sure every index instance has it's own cache
  this.cache = {};
}

/*
* Clear all queries in cache
*/
IndexCore.prototype.clearCache = function() {
  this.cache = {};
};

/*
* Search inside the index using XMLHttpRequest request (Using a POST query to
* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
*
* @param {string} [query] the full text query
* @param {object} [args] (optional) if set, contains an object with query parameters:
* - page: (integer) Pagination parameter used to select the page to retrieve.
*                   Page is zero-based and defaults to 0. Thus,
*                   to retrieve the 10th page you need to set page=9
* - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
* - attributesToRetrieve: a string that contains the list of object attributes
* you want to retrieve (let you minimize the answer size).
*   Attributes are separated with a comma (for example "name,address").
*   You can also use an array (for example ["name","address"]).
*   By default, all attributes are retrieved. You can also use '*' to retrieve all
*   values when an attributesToRetrieve setting is specified for your index.
* - attributesToHighlight: a string that contains the list of attributes you
*   want to highlight according to the query.
*   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
*   If an attribute has no match for the query, the raw value is returned.
*   By default all indexed text attributes are highlighted.
*   You can use `*` if you want to highlight all textual attributes.
*   Numerical attributes are not highlighted.
*   A matchLevel is returned for each highlighted attribute and can contain:
*      - full: if all the query terms were found in the attribute,
*      - partial: if only some of the query terms were found,
*      - none: if none of the query terms were found.
* - attributesToSnippet: a string that contains the list of attributes to snippet alongside
* the number of words to return (syntax is `attributeName:nbWords`).
*    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
*    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
*    By default no snippet is computed.
* - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
* Defaults to 3.
* - minWordSizefor2Typos: the minimum number of characters in a query word
* to accept two typos in this word. Defaults to 7.
* - getRankingInfo: if set to 1, the result hits will contain ranking
* information in _rankingInfo attribute.
* - aroundLatLng: search for entries around a given
* latitude/longitude (specified as two floats separated by a comma).
*   For example aroundLatLng=47.316669,5.016670).
*   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
*   and the precision for ranking with aroundPrecision
*   (for example if you set aroundPrecision=100, two objects that are distant of
*   less than 100m will be considered as identical for "geo" ranking parameter).
*   At indexing, you should specify geoloc of an object with the _geoloc attribute
*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
* - insideBoundingBox: search entries inside a given area defined by the two extreme points
* of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
*   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
*   At indexing, you should specify geoloc of an object with the _geoloc attribute
*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
* - numericFilters: a string that contains the list of numeric filters you want to
* apply separated by a comma.
*   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
*   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
*   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
*   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
* - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
*   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
*   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
*   means tag1 AND (tag2 OR tag3).
*   At indexing, tags should be added in the _tags** attribute
*   of objects (for example {"_tags":["tag1","tag2"]}).
* - facetFilters: filter the query by a list of facets.
*   Facets are separated by commas and each facet is encoded as `attributeName:value`.
*   For example: `facetFilters=category:Book,author:John%20Doe`.
*   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
* - facets: List of object attributes that you want to use for faceting.
*   Comma separated list: `"category,author"` or array `['category','author']`
*   Only attributes that have been added in **attributesForFaceting** index setting
*   can be used in this parameter.
*   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
* - queryType: select how the query words are interpreted, it can be one of the following value:
*    - prefixAll: all query words are interpreted as prefixes,
*    - prefixLast: only the last word is interpreted as a prefix (default behavior),
*    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
* - optionalWords: a string that contains the list of words that should
* be considered as optional when found in the query.
*   Comma separated and array are accepted.
* - distinct: If set to 1, enable the distinct feature (disabled by default)
* if the attributeForDistinct index setting is set.
*   This feature is similar to the SQL "distinct" keyword: when enabled
*   in a query with the distinct=1 parameter,
*   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
*   For example, if the chosen attribute is show_name and several hits have
*   the same value for show_name, then only the best
*   one is kept and others are removed.
* - restrictSearchableAttributes: List of attributes you want to use for
* textual search (must be a subset of the attributesToIndex index setting)
* either comma separated or as an array
* @param {function} [callback] the result callback called with two arguments:
*  error: null or Error('message'). If false, the content contains the error.
*  content: the server answer that contains the list of results.
*/
IndexCore.prototype.search = buildSearchMethod('query');

/*
* -- BETA --
* Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
*
* @param {string} [query] the similar query
* @param {object} [args] (optional) if set, contains an object with query parameters.
*   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
*   are the two most useful to restrict the similar results and get more relevant content
*/
IndexCore.prototype.similarSearch = deprecate(
  buildSearchMethod('similarQuery'),
  deprecatedMessage(
    'index.similarSearch(query[, callback])',
    'index.search({ similarQuery: query }[, callback])'
  )
);

/*
* Browse index content. The response content will have a `cursor` property that you can use
* to browse subsequent pages for this query. Use `index.browseFrom(cursor)` when you want.
*
* @param {string} query - The full text query
* @param {Object} [queryParameters] - Any search query parameter
* @param {Function} [callback] - The result callback called with two arguments
*   error: null or Error('message')
*   content: the server answer with the browse result
* @return {Promise|undefined} Returns a promise if no callback given
* @example
* index.browse('cool songs', {
*   tagFilters: 'public,comments',
*   hitsPerPage: 500
* }, callback);
* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
*/
IndexCore.prototype.browse = function(query, queryParameters, callback) {
  var merge = __webpack_require__(/*! ./merge.js */ "./node_modules/algoliasearch/src/merge.js");

  var indexObj = this;

  var page;
  var hitsPerPage;

  // we check variadic calls that are not the one defined
  // .browse()/.browse(fn)
  // => page = 0
  if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
    page = 0;
    callback = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'number') {
    // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
    page = arguments[0];
    if (typeof arguments[1] === 'number') {
      hitsPerPage = arguments[1];
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
      hitsPerPage = undefined;
    }
    query = undefined;
    queryParameters = undefined;
  } else if (typeof arguments[0] === 'object') {
    // .browse(queryParameters)/.browse(queryParameters, cb)
    if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }
    queryParameters = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
    // .browse(query, cb)
    callback = arguments[1];
    queryParameters = undefined;
  }

  // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)

  // get search query parameters combining various possible calls
  // to .browse();
  queryParameters = merge({}, queryParameters || {}, {
    page: page,
    hitsPerPage: hitsPerPage,
    query: query
  });

  var params = this.as._getSearchParams(queryParameters, '');

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse',
    body: {params: params},
    hostType: 'read',
    callback: callback
  });
};

/*
* Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
*
* @param {string} query - The full text query
* @param {Object} [queryParameters] - Any search query parameter
* @param {Function} [callback] - The result callback called with two arguments
*   error: null or Error('message')
*   content: the server answer with the browse result
* @return {Promise|undefined} Returns a promise if no callback given
* @example
* index.browseFrom('14lkfsakl32', callback);
* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
*/
IndexCore.prototype.browseFrom = function(cursor, callback) {
  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse',
    body: {cursor: cursor},
    hostType: 'read',
    callback: callback
  });
};

/*
* Search for facet values
* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
*
* @param {string} params.facetName Facet name, name of the attribute to search for values in.
* Must be declared as a facet
* @param {string} params.facetQuery Query for the facet search
* @param {string} [params.*] Any search parameter of Algolia,
* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
* @param callback (optional)
*/
IndexCore.prototype.searchForFacetValues = function(params, callback) {
  var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
  var omit = __webpack_require__(/*! ./omit.js */ "./node_modules/algoliasearch/src/omit.js");
  var usage = 'Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])';

  if (params.facetName === undefined || params.facetQuery === undefined) {
    throw new Error(usage);
  }

  var facetName = params.facetName;
  var filteredParams = omit(clone(params), function(keyName) {
    return keyName === 'facetName';
  });
  var searchParameters = this.as._getSearchParams(filteredParams, '');

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' +
      encodeURIComponent(this.indexName) + '/facets/' + encodeURIComponent(facetName) + '/query',
    hostType: 'read',
    body: {params: searchParameters},
    callback: callback
  });
};

IndexCore.prototype.searchFacet = deprecate(function(params, callback) {
  return this.searchForFacetValues(params, callback);
}, deprecatedMessage(
  'index.searchFacet(params[, callback])',
  'index.searchForFacetValues(params[, callback])'
));

IndexCore.prototype._search = function(params, url, callback, additionalUA) {
  return this.as._jsonRequest({
    cache: this.cache,
    method: 'POST',
    url: url || '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
    body: {params: params},
    hostType: 'read',
    fallback: {
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(this.indexName),
      body: {params: params}
    },
    callback: callback,
    additionalUA: additionalUA
  });
};

/*
* Get an object from this index
*
* @param objectID the unique identifier of the object to retrieve
* @param attrs (optional) if set, contains the array of attribute names to retrieve
* @param callback (optional) the result callback called with two arguments
*  error: null or Error('message')
*  content: the object to retrieve or the error message if a failure occured
*/
IndexCore.prototype.getObject = function(objectID, attrs, callback) {
  var indexObj = this;

  if (arguments.length === 1 || typeof attrs === 'function') {
    callback = attrs;
    attrs = undefined;
  }

  var params = '';
  if (attrs !== undefined) {
    params = '?attributes=';
    for (var i = 0; i < attrs.length; ++i) {
      if (i !== 0) {
        params += ',';
      }
      params += attrs[i];
    }
  }

  return this.as._jsonRequest({
    method: 'GET',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
    hostType: 'read',
    callback: callback
  });
};

/*
* Get several objects from this index
*
* @param objectIDs the array of unique identifier of objects to retrieve
*/
IndexCore.prototype.getObjects = function(objectIDs, attributesToRetrieve, callback) {
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';

  if (!isArray(objectIDs)) {
    throw new Error(usage);
  }

  var indexObj = this;

  if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
    callback = attributesToRetrieve;
    attributesToRetrieve = undefined;
  }

  var body = {
    requests: map(objectIDs, function prepareRequest(objectID) {
      var request = {
        indexName: indexObj.indexName,
        objectID: objectID
      };

      if (attributesToRetrieve) {
        request.attributesToRetrieve = attributesToRetrieve.join(',');
      }

      return request;
    })
  };

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/*/objects',
    hostType: 'read',
    body: body,
    callback: callback
  });
};

IndexCore.prototype.as = null;
IndexCore.prototype.indexName = null;
IndexCore.prototype.typeAheadArgs = null;
IndexCore.prototype.typeAheadValueOption = null;


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js":
/*!****************************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AlgoliaSearchCore = __webpack_require__(/*! ../../AlgoliaSearchCore.js */ "./node_modules/algoliasearch/src/AlgoliaSearchCore.js");
var createAlgoliasearch = __webpack_require__(/*! ../createAlgoliasearch.js */ "./node_modules/algoliasearch/src/browser/createAlgoliasearch.js");

module.exports = createAlgoliasearch(AlgoliaSearchCore, '(lite) ');


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/createAlgoliasearch.js":
/*!***********************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/createAlgoliasearch.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! global */ "./node_modules/global/window.js");
var Promise = global.Promise || __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").Promise;

// This is the standalone browser build entry point
// Browser implementation of the Algolia Search JavaScript client,
// using XMLHttpRequest, XDomainRequest and JSONP as fallback
module.exports = function createAlgoliasearch(AlgoliaSearch, uaSuffix) {
  var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
  var errors = __webpack_require__(/*! ../errors */ "./node_modules/algoliasearch/src/errors.js");
  var inlineHeaders = __webpack_require__(/*! ./inline-headers */ "./node_modules/algoliasearch/src/browser/inline-headers.js");
  var jsonpRequest = __webpack_require__(/*! ./jsonp-request */ "./node_modules/algoliasearch/src/browser/jsonp-request.js");
  var places = __webpack_require__(/*! ../places.js */ "./node_modules/algoliasearch/src/places.js");
  uaSuffix = uaSuffix || '';

  if (false) {}

  function algoliasearch(applicationID, apiKey, opts) {
    var cloneDeep = __webpack_require__(/*! ../clone.js */ "./node_modules/algoliasearch/src/clone.js");

    opts = cloneDeep(opts || {});

    opts._ua = opts._ua || algoliasearch.ua;

    return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
  }

  algoliasearch.version = __webpack_require__(/*! ../version.js */ "./node_modules/algoliasearch/src/version.js");
  algoliasearch.ua = 'Algolia for vanilla JavaScript ' + uaSuffix + algoliasearch.version;
  algoliasearch.initPlaces = places(algoliasearch);

  // we expose into window no matter how we are used, this will allow
  // us to easily debug any website running algolia
  global.__algolia = {
    debug: __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js"),
    algoliasearch: algoliasearch
  };

  var support = {
    hasXMLHttpRequest: 'XMLHttpRequest' in global,
    hasXDomainRequest: 'XDomainRequest' in global
  };

  if (support.hasXMLHttpRequest) {
    support.cors = 'withCredentials' in new XMLHttpRequest();
  }

  function AlgoliaSearchBrowser() {
    // call AlgoliaSearch constructor
    AlgoliaSearch.apply(this, arguments);
  }

  inherits(AlgoliaSearchBrowser, AlgoliaSearch);

  AlgoliaSearchBrowser.prototype._request = function request(url, opts) {
    return new Promise(function wrapRequest(resolve, reject) {
      // no cors or XDomainRequest, no request
      if (!support.cors && !support.hasXDomainRequest) {
        // very old browser, not supported
        reject(new errors.Network('CORS not supported'));
        return;
      }

      url = inlineHeaders(url, opts.headers);

      var body = opts.body;
      var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
      var reqTimeout;
      var timedOut;
      var connected = false;

      reqTimeout = setTimeout(onTimeout, opts.timeouts.connect);
      // we set an empty onprogress listener
      // so that XDomainRequest on IE9 is not aborted
      // refs:
      //  - https://github.com/algolia/algoliasearch-client-js/issues/76
      //  - https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
      req.onprogress = onProgress;
      if ('onreadystatechange' in req) req.onreadystatechange = onReadyStateChange;
      req.onload = onLoad;
      req.onerror = onError;

      // do not rely on default XHR async flag, as some analytics code like hotjar
      // breaks it and set it to false by default
      if (req instanceof XMLHttpRequest) {
        req.open(opts.method, url, true);

        // The Analytics API never accepts Auth headers as query string
        // this option exists specifically for them.
        if (opts.forceAuthHeaders) {
          req.setRequestHeader(
            'x-algolia-application-id',
            opts.headers['x-algolia-application-id']
          );
          req.setRequestHeader(
            'x-algolia-api-key',
            opts.headers['x-algolia-api-key']
          );
        }
      } else {
        req.open(opts.method, url);
      }

      // headers are meant to be sent after open
      if (support.cors) {
        if (body) {
          if (opts.method === 'POST') {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
            req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
          } else {
            req.setRequestHeader('content-type', 'application/json');
          }
        }
        req.setRequestHeader('accept', 'application/json');
      }

      if (body) {
        req.send(body);
      } else {
        req.send();
      }

      // event object not received in IE8, at least
      // but we do not use it, still important to note
      function onLoad(/* event */) {
        // When browser does not supports req.timeout, we can
        // have both a load and timeout event, since handled by a dumb setTimeout
        if (timedOut) {
          return;
        }

        clearTimeout(reqTimeout);

        var out;

        try {
          out = {
            body: JSON.parse(req.responseText),
            responseText: req.responseText,
            statusCode: req.status,
            // XDomainRequest does not have any response headers
            headers: req.getAllResponseHeaders && req.getAllResponseHeaders() || {}
          };
        } catch (e) {
          out = new errors.UnparsableJSON({
            more: req.responseText
          });
        }

        if (out instanceof errors.UnparsableJSON) {
          reject(out);
        } else {
          resolve(out);
        }
      }

      function onError(event) {
        if (timedOut) {
          return;
        }

        clearTimeout(reqTimeout);

        // error event is trigerred both with XDR/XHR on:
        //   - DNS error
        //   - unallowed cross domain request
        reject(
          new errors.Network({
            more: event
          })
        );
      }

      function onTimeout() {
        timedOut = true;
        req.abort();

        reject(new errors.RequestTimeout());
      }

      function onConnect() {
        connected = true;
        clearTimeout(reqTimeout);
        reqTimeout = setTimeout(onTimeout, opts.timeouts.complete);
      }

      function onProgress() {
        if (!connected) onConnect();
      }

      function onReadyStateChange() {
        if (!connected && req.readyState > 1) onConnect();
      }
    });
  };

  AlgoliaSearchBrowser.prototype._request.fallback = function requestFallback(url, opts) {
    url = inlineHeaders(url, opts.headers);

    return new Promise(function wrapJsonpRequest(resolve, reject) {
      jsonpRequest(url, opts, function jsonpRequestDone(err, content) {
        if (err) {
          reject(err);
          return;
        }

        resolve(content);
      });
    });
  };

  AlgoliaSearchBrowser.prototype._promise = {
    reject: function rejectPromise(val) {
      return Promise.reject(val);
    },
    resolve: function resolvePromise(val) {
      return Promise.resolve(val);
    },
    delay: function delayPromise(ms) {
      return new Promise(function resolveOnTimeout(resolve/* , reject*/) {
        setTimeout(resolve, ms);
      });
    },
    all: function all(promises) {
      return Promise.all(promises);
    }
  };

  return algoliasearch;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/inline-headers.js":
/*!******************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/inline-headers.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = inlineHeaders;

var encode = __webpack_require__(/*! querystring-es3/encode */ "./node_modules/querystring-es3/encode.js");

function inlineHeaders(url, headers) {
  if (/\?/.test(url)) {
    url += '&';
  } else {
    url += '?';
  }

  return url + encode(headers);
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/jsonp-request.js":
/*!*****************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/jsonp-request.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = jsonpRequest;

var errors = __webpack_require__(/*! ../errors */ "./node_modules/algoliasearch/src/errors.js");

var JSONPCounter = 0;

function jsonpRequest(url, opts, cb) {
  if (opts.method !== 'GET') {
    cb(new Error('Method ' + opts.method + ' ' + url + ' is not supported by JSONP.'));
    return;
  }

  opts.debug('JSONP: start');

  var cbCalled = false;
  var timedOut = false;

  JSONPCounter += 1;
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  var cbName = 'algoliaJSONP_' + JSONPCounter;
  var done = false;

  window[cbName] = function(data) {
    removeGlobals();

    if (timedOut) {
      opts.debug('JSONP: Late answer, ignoring');
      return;
    }

    cbCalled = true;

    clean();

    cb(null, {
      body: data,
      responseText: JSON.stringify(data)/* ,
      // We do not send the statusCode, there's no statusCode in JSONP, it will be
      // computed using data.status && data.message like with XDR
      statusCode*/
    });
  };

  // add callback by hand
  url += '&callback=' + cbName;

  // add body params manually
  if (opts.jsonBody && opts.jsonBody.params) {
    url += '&' + opts.jsonBody.params;
  }

  var ontimeout = setTimeout(timeout, opts.timeouts.complete);

  // script onreadystatechange needed only for
  // <= IE8
  // https://github.com/angular/angular.js/issues/4523
  script.onreadystatechange = readystatechange;
  script.onload = success;
  script.onerror = error;

  script.async = true;
  script.defer = true;
  script.src = url;
  head.appendChild(script);

  function success() {
    opts.debug('JSONP: success');

    if (done || timedOut) {
      return;
    }

    done = true;

    // script loaded but did not call the fn => script loading error
    if (!cbCalled) {
      opts.debug('JSONP: Fail. Script loaded but did not call the callback');
      clean();
      cb(new errors.JSONPScriptFail());
    }
  }

  function readystatechange() {
    if (this.readyState === 'loaded' || this.readyState === 'complete') {
      success();
    }
  }

  function clean() {
    clearTimeout(ontimeout);
    script.onload = null;
    script.onreadystatechange = null;
    script.onerror = null;
    head.removeChild(script);
  }

  function removeGlobals() {
    try {
      delete window[cbName];
      delete window[cbName + '_loaded'];
    } catch (e) {
      window[cbName] = window[cbName + '_loaded'] = undefined;
    }
  }

  function timeout() {
    opts.debug('JSONP: Script timeout');
    timedOut = true;
    clean();
    cb(new errors.RequestTimeout());
  }

  function error() {
    opts.debug('JSONP: Script error');

    if (done || timedOut) {
      return;
    }

    clean();
    cb(new errors.JSONPScriptError());
  }
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/buildSearchMethod.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/buildSearchMethod.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = buildSearchMethod;

var errors = __webpack_require__(/*! ./errors.js */ "./node_modules/algoliasearch/src/errors.js");

/**
 * Creates a search method to be used in clients
 * @param {string} queryParam the name of the attribute used for the query
 * @param {string} url the url
 * @return {function} the search method
 */
function buildSearchMethod(queryParam, url) {
  /**
   * The search method. Prepares the data and send the query to Algolia.
   * @param {string} query the string used for query search
   * @param {object} args additional parameters to send with the search
   * @param {function} [callback] the callback to be called with the client gets the answer
   * @return {undefined|Promise} If the callback is not provided then this methods returns a Promise
   */
  return function search(query, args, callback) {
    // warn V2 users on how to search
    if (typeof query === 'function' && typeof args === 'object' ||
      typeof callback === 'object') {
      // .search(query, params, cb)
      // .search(cb, params)
      throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
    }

    // Normalizing the function signature
    if (arguments.length === 0 || typeof query === 'function') {
      // Usage : .search(), .search(cb)
      callback = query;
      query = '';
    } else if (arguments.length === 1 || typeof args === 'function') {
      // Usage : .search(query/args), .search(query, cb)
      callback = args;
      args = undefined;
    }
    // At this point we have 3 arguments with values

    // Usage : .search(args) // careful: typeof null === 'object'
    if (typeof query === 'object' && query !== null) {
      args = query;
      query = undefined;
    } else if (query === undefined || query === null) { // .search(undefined/null)
      query = '';
    }

    var params = '';

    if (query !== undefined) {
      params += queryParam + '=' + encodeURIComponent(query);
    }

    var additionalUA;
    if (args !== undefined) {
      if (args.additionalUA) {
        additionalUA = args.additionalUA;
        delete args.additionalUA;
      }
      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
      params = this.as._getSearchParams(args, params);
    }


    return this._search(params, url, callback, additionalUA);
  };
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/clone.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/clone.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/deprecate.js":
/*!*****************************************************!*\
  !*** ./node_modules/algoliasearch/src/deprecate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function deprecate(fn, message) {
  var warned = false;

  function deprecated() {
    if (!warned) {
      /* eslint no-console:0 */
      console.warn(message);
      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/deprecatedMessage.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/deprecatedMessage.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function deprecatedMessage(previousUsage, newUsage) {
  var githubAnchorLink = previousUsage.toLowerCase()
    .replace(/[\.\(\)]/g, '');

  return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
    '`. Please see https://github.com/algolia/algoliasearch-client-javascript/wiki/Deprecated#' + githubAnchorLink;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/errors.js":
/*!**************************************************!*\
  !*** ./node_modules/algoliasearch/src/errors.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This file hosts our error definitions
// We use custom error "types" so that we can act on them when we need it
// e.g.: if error instanceof errors.UnparsableJSON then..

var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

function AlgoliaSearchError(message, extraProperties) {
  var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

  var error = this;

  // try to get a stacktrace
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
  }

  this.name = 'AlgoliaSearchError';
  this.message = message || 'Unknown error';

  if (extraProperties) {
    forEach(extraProperties, function addToErrorObject(value, key) {
      error[key] = value;
    });
  }
}

inherits(AlgoliaSearchError, Error);

function createCustomError(name, message) {
  function AlgoliaSearchCustomError() {
    var args = Array.prototype.slice.call(arguments, 0);

    // custom message not set, use default
    if (typeof args[0] !== 'string') {
      args.unshift(message);
    }

    AlgoliaSearchError.apply(this, args);
    this.name = 'AlgoliaSearch' + name + 'Error';
  }

  inherits(AlgoliaSearchCustomError, AlgoliaSearchError);

  return AlgoliaSearchCustomError;
}

// late exports to let various fn defs and inherits take place
module.exports = {
  AlgoliaSearchError: AlgoliaSearchError,
  UnparsableJSON: createCustomError(
    'UnparsableJSON',
    'Could not parse the incoming response as JSON, see err.more for details'
  ),
  RequestTimeout: createCustomError(
    'RequestTimeout',
    'Request timedout before getting a response'
  ),
  Network: createCustomError(
    'Network',
    'Network issue, see err.more for details'
  ),
  JSONPScriptFail: createCustomError(
    'JSONPScriptFail',
    '<script> was loaded but did not call our provided callback'
  ),
  JSONPScriptError: createCustomError(
    'JSONPScriptError',
    '<script> unable to load due to an `error` event on it'
  ),
  Unknown: createCustomError(
    'Unknown',
    'Unknown error occured'
  )
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/exitPromise.js":
/*!*******************************************************!*\
  !*** ./node_modules/algoliasearch/src/exitPromise.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Parse cloud does not supports setTimeout
// We do not store a setTimeout reference in the client everytime
// We only fallback to a fake setTimeout when not available
// setTimeout cannot be override globally sadly
module.exports = function exitPromise(fn, _setTimeout) {
  _setTimeout(fn, 0);
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/map.js":
/*!***********************************************!*\
  !*** ./node_modules/algoliasearch/src/map.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

module.exports = function map(arr, fn) {
  var newArr = [];
  foreach(arr, function(item, itemIndex) {
    newArr.push(fn(item, itemIndex, arr));
  });
  return newArr;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/merge.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/merge.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

module.exports = function merge(destination/* , sources */) {
  var sources = Array.prototype.slice.call(arguments);

  foreach(sources, function(source) {
    for (var keyName in source) {
      if (source.hasOwnProperty(keyName)) {
        if (typeof destination[keyName] === 'object' && typeof source[keyName] === 'object') {
          destination[keyName] = merge({}, destination[keyName], source[keyName]);
        } else if (source[keyName] !== undefined) {
          destination[keyName] = source[keyName];
        }
      }
    }
  });

  return destination;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/omit.js":
/*!************************************************!*\
  !*** ./node_modules/algoliasearch/src/omit.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function omit(obj, test) {
  var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
  var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

  var filtered = {};

  foreach(keys(obj), function doFilter(keyName) {
    if (test(keyName) !== true) {
      filtered[keyName] = obj[keyName];
    }
  });

  return filtered;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/places.js":
/*!**************************************************!*\
  !*** ./node_modules/algoliasearch/src/places.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = createPlacesClient;

var qs3 = __webpack_require__(/*! querystring-es3 */ "./node_modules/querystring-es3/index.js");
var buildSearchMethod = __webpack_require__(/*! ./buildSearchMethod.js */ "./node_modules/algoliasearch/src/buildSearchMethod.js");

function createPlacesClient(algoliasearch) {
  return function places(appID, apiKey, opts) {
    var cloneDeep = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");

    opts = opts && cloneDeep(opts) || {};
    opts.hosts = opts.hosts || [
      'places-dsn.algolia.net',
      'places-1.algolianet.com',
      'places-2.algolianet.com',
      'places-3.algolianet.com'
    ];

    // allow initPlaces() no arguments => community rate limited
    if (arguments.length === 0 || typeof appID === 'object' || appID === undefined) {
      appID = '';
      apiKey = '';
      opts._allowEmptyCredentials = true;
    }

    var client = algoliasearch(appID, apiKey, opts);
    var index = client.initIndex('places');
    index.search = buildSearchMethod('query', '/1/places/query');
    index.reverse = function(options, callback) {
      var encoded = qs3.encode(options);

      return this.as._jsonRequest({
        method: 'GET',
        url: '/1/places/reverse?' + encoded,
        hostType: 'read',
        callback: callback
      });
    };

    index.getObject = function(objectID, callback) {
      return this.as._jsonRequest({
        method: 'GET',
        url: '/1/places/' + encodeURIComponent(objectID),
        hostType: 'read',
        callback: callback
      });
    };
    return index;
  };
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/store.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/store.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var debug = __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js")('algoliasearch:src/hostIndexState.js');
var localStorageNamespace = 'algoliasearch-client-js';

var store;
var moduleStore = {
  state: {},
  set: function(key, data) {
    this.state[key] = data;
    return this.state[key];
  },
  get: function(key) {
    return this.state[key] || null;
  }
};

var localStorageStore = {
  set: function(key, data) {
    moduleStore.set(key, data); // always replicate localStorageStore to moduleStore in case of failure

    try {
      var namespace = JSON.parse(global.localStorage[localStorageNamespace]);
      namespace[key] = data;
      global.localStorage[localStorageNamespace] = JSON.stringify(namespace);
      return namespace[key];
    } catch (e) {
      return localStorageFailure(key, e);
    }
  },
  get: function(key) {
    try {
      return JSON.parse(global.localStorage[localStorageNamespace])[key] || null;
    } catch (e) {
      return localStorageFailure(key, e);
    }
  }
};

function localStorageFailure(key, e) {
  debug('localStorage failed with', e);
  cleanup();
  store = moduleStore;
  return store.get(key);
}

store = supportsLocalStorage() ? localStorageStore : moduleStore;

module.exports = {
  get: getOrSet,
  set: getOrSet,
  supportsLocalStorage: supportsLocalStorage
};

function getOrSet(key, data) {
  if (arguments.length === 1) {
    return store.get(key);
  }

  return store.set(key, data);
}

function supportsLocalStorage() {
  try {
    if ('localStorage' in global &&
      global.localStorage !== null) {
      if (!global.localStorage[localStorageNamespace]) {
        // actual creation of the namespace
        global.localStorage.setItem(localStorageNamespace, JSON.stringify({}));
      }
      return true;
    }

    return false;
  } catch (_) {
    return false;
  }
}

// In case of any error on localStorage, we clean our own namespace, this should handle
// quota errors when a lot of keys + data are used
function cleanup() {
  try {
    global.localStorage.removeItem(localStorageNamespace);
  } catch (_) {
    // nothing to do
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/algoliasearch/src/version.js":
/*!***************************************************!*\
  !*** ./node_modules/algoliasearch/src/version.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '3.32.0';


/***/ }),

/***/ "./node_modules/autocomplete.js/index.js":
/*!***********************************************!*\
  !*** ./node_modules/autocomplete.js/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./src/standalone/ */ "./node_modules/autocomplete.js/src/standalone/index.js");


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/css.js":
/*!**************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/css.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");

var css = {
  wrapper: {
    position: 'relative',
    display: 'inline-block'
  },
  hint: {
    position: 'absolute',
    top: '0',
    left: '0',
    borderColor: 'transparent',
    boxShadow: 'none',
    // #741: fix hint opacity issue on iOS
    opacity: '1'
  },
  input: {
    position: 'relative',
    verticalAlign: 'top',
    backgroundColor: 'transparent'
  },
  inputWithNoHint: {
    position: 'relative',
    verticalAlign: 'top'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '100',
    display: 'none'
  },
  suggestions: {
    display: 'block'
  },
  suggestion: {
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  },
  suggestionChild: {
    whiteSpace: 'normal'
  },
  ltr: {
    left: '0',
    right: 'auto'
  },
  rtl: {
    left: 'auto',
    right: '0'
  },
  defaultClasses: {
    root: 'algolia-autocomplete',
    prefix: 'aa',
    noPrefix: false,
    dropdownMenu: 'dropdown-menu',
    input: 'input',
    hint: 'hint',
    suggestions: 'suggestions',
    suggestion: 'suggestion',
    cursor: 'cursor',
    dataset: 'dataset',
    empty: 'empty'
  },
  // will be merged with the default ones if appendTo is used
  appendTo: {
    wrapper: {
      position: 'absolute',
      zIndex: '100',
      display: 'none'
    },
    input: {},
    inputWithNoHint: {},
    dropdown: {
      display: 'block'
    }
  }
};

// ie specific styling
if (_.isMsie()) {
  // ie6-8 (and 9?) doesn't fire hover and click events for elements with
  // transparent backgrounds, for a workaround, use 1x1 transparent gif
  _.mixin(css.input, {
    backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
  });
}

// ie7 and under specific styling
if (_.isMsie() && _.isMsie() <= 7) {
  // if someone can tell me why this is necessary to align
  // the hint with the query in ie7, i'll send you $5 - @JakeHarding
  _.mixin(css.input, {marginTop: '-1px'});
}

module.exports = css;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/dataset.js":
/*!******************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/dataset.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var datasetKey = 'aaDataset';
var valueKey = 'aaValue';
var datumKey = 'aaDatum';

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var html = __webpack_require__(/*! ./html.js */ "./node_modules/autocomplete.js/src/autocomplete/html.js");
var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");
var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");

// constructor
// -----------

function Dataset(o) {
  o = o || {};
  o.templates = o.templates || {};

  if (!o.source) {
    _.error('missing source');
  }

  if (o.name && !isValidName(o.name)) {
    _.error('invalid dataset name: ' + o.name);
  }

  // tracks the last query the dataset was updated for
  this.query = null;
  this._isEmpty = true;

  this.highlight = !!o.highlight;
  this.name = typeof o.name === 'undefined' || o.name === null ? _.getUniqueId() : o.name;

  this.source = o.source;
  this.displayFn = getDisplayFn(o.display || o.displayKey);

  this.debounce = o.debounce;

  this.cache = o.cache !== false;

  this.templates = getTemplates(o.templates, this.displayFn);

  this.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
  this.cssClasses.prefix =
    o.cssClasses.formattedPrefix || _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);

  var clazz = _.className(this.cssClasses.prefix, this.cssClasses.dataset);
  this.$el = o.$menu && o.$menu.find(clazz + '-' + this.name).length > 0 ?
    DOM.element(o.$menu.find(clazz + '-' + this.name)[0]) :
    DOM.element(
      html.dataset.replace('%CLASS%', this.name)
        .replace('%PREFIX%', this.cssClasses.prefix)
        .replace('%DATASET%', this.cssClasses.dataset)
    );

  this.$menu = o.$menu;
  this.clearCachedSuggestions();
}

// static methods
// --------------

Dataset.extractDatasetName = function extractDatasetName(el) {
  return DOM.element(el).data(datasetKey);
};

Dataset.extractValue = function extractValue(el) {
  return DOM.element(el).data(valueKey);
};

Dataset.extractDatum = function extractDatum(el) {
  var datum = DOM.element(el).data(datumKey);
  if (typeof datum === 'string') {
    // Zepto has an automatic deserialization of the
    // JSON encoded data attribute
    datum = JSON.parse(datum);
  }
  return datum;
};

// instance methods
// ----------------

_.mixin(Dataset.prototype, EventEmitter, {

  // ### private

  _render: function render(query, suggestions) {
    if (!this.$el) {
      return;
    }
    var that = this;

    var hasSuggestions;
    var renderArgs = [].slice.call(arguments, 2);
    this.$el.empty();

    hasSuggestions = suggestions && suggestions.length;
    this._isEmpty = !hasSuggestions;

    if (!hasSuggestions && this.templates.empty) {
      this.$el
        .html(getEmptyHtml.apply(this, renderArgs))
        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
    } else if (hasSuggestions) {
      this.$el
        .html(getSuggestionsHtml.apply(this, renderArgs))
        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
    } else if (suggestions && !Array.isArray(suggestions)) {
      throw new TypeError('suggestions must be an array');
    }

    if (this.$menu) {
      this.$menu.addClass(
        this.cssClasses.prefix + (hasSuggestions ? 'with' : 'without') + '-' + this.name
      ).removeClass(
        this.cssClasses.prefix + (hasSuggestions ? 'without' : 'with') + '-' + this.name
      );
    }

    this.trigger('rendered', query);

    function getEmptyHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: true}].concat(args);
      return that.templates.empty.apply(this, args);
    }

    function getSuggestionsHtml() {
      var args = [].slice.call(arguments, 0);
      var $suggestions;
      var nodes;
      var self = this;

      var suggestionsHtml = html.suggestions.
        replace('%PREFIX%', this.cssClasses.prefix).
        replace('%SUGGESTIONS%', this.cssClasses.suggestions);
      $suggestions = DOM
        .element(suggestionsHtml)
        .css(this.css.suggestions);

      // jQuery#append doesn't support arrays as the first argument
      // until version 1.8, see http://bugs.jquery.com/ticket/11231
      nodes = _.map(suggestions, getSuggestionNode);
      $suggestions.append.apply($suggestions, nodes);

      return $suggestions;

      function getSuggestionNode(suggestion) {
        var $el;

        var suggestionHtml = html.suggestion.
          replace('%PREFIX%', self.cssClasses.prefix).
          replace('%SUGGESTION%', self.cssClasses.suggestion);
        $el = DOM.element(suggestionHtml)
          .attr({
            role: 'option',
            id: ['option', Math.floor(Math.random() * 100000000)].join('-')
          })
          .append(that.templates.suggestion.apply(this, [suggestion].concat(args)));

        $el.data(datasetKey, that.name);
        $el.data(valueKey, that.displayFn(suggestion) || undefined); // this led to undefined return value
        $el.data(datumKey, JSON.stringify(suggestion));
        $el.children().each(function() { DOM.element(this).css(self.css.suggestionChild); });

        return $el;
      }
    }

    function getHeaderHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
      return that.templates.header.apply(this, args);
    }

    function getFooterHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
      return that.templates.footer.apply(this, args);
    }
  },

  // ### public

  getRoot: function getRoot() {
    return this.$el;
  },

  update: function update(query) {
    function handleSuggestions(suggestions) {
      // if the update has been canceled or if the query has changed
      // do not render the suggestions as they've become outdated
      if (!this.canceled && query === this.query) {
        // concat all the other arguments that could have been passed
        // to the render function, and forward them to _render
        var extraArgs = [].slice.call(arguments, 1);
        this.cacheSuggestions(query, suggestions, extraArgs);
        this._render.apply(this, [query, suggestions].concat(extraArgs));
      }
    }

    this.query = query;
    this.canceled = false;

    if (this.shouldFetchFromCache(query)) {
      handleSuggestions.apply(this, [this.cachedSuggestions].concat(this.cachedRenderExtraArgs));
    } else {
      var that = this;
      var execSource = function() {
        // When the call is debounced the condition avoid to do a useless
        // request with the last character when the input has been cleared
        if (!that.canceled) {
          that.source(query, handleSuggestions.bind(that));
        }
      };

      if (this.debounce) {
        var later = function() {
          that.debounceTimeout = null;
          execSource();
        };
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(later, this.debounce);
      } else {
        execSource();
      }
    }
  },

  cacheSuggestions: function cacheSuggestions(query, suggestions, extraArgs) {
    this.cachedQuery = query;
    this.cachedSuggestions = suggestions;
    this.cachedRenderExtraArgs = extraArgs;
  },

  shouldFetchFromCache: function shouldFetchFromCache(query) {
    return this.cache &&
      this.cachedQuery === query &&
      this.cachedSuggestions &&
      this.cachedSuggestions.length;
  },

  clearCachedSuggestions: function clearCachedSuggestions() {
    delete this.cachedQuery;
    delete this.cachedSuggestions;
    delete this.cachedRenderExtraArgs;
  },

  cancel: function cancel() {
    this.canceled = true;
  },

  clear: function clear() {
    this.cancel();
    this.$el.empty();
    this.trigger('rendered', '');
  },

  isEmpty: function isEmpty() {
    return this._isEmpty;
  },

  destroy: function destroy() {
    this.clearCachedSuggestions();
    this.$el = null;
  }
});

// helper functions
// ----------------

function getDisplayFn(display) {
  display = display || 'value';

  return _.isFunction(display) ? display : displayFn;

  function displayFn(obj) {
    return obj[display];
  }
}

function getTemplates(templates, displayFn) {
  return {
    empty: templates.empty && _.templatify(templates.empty),
    header: templates.header && _.templatify(templates.header),
    footer: templates.footer && _.templatify(templates.footer),
    suggestion: templates.suggestion || suggestionTemplate
  };

  function suggestionTemplate(context) {
    return '<p>' + displayFn(context) + '</p>';
  }
}

function isValidName(str) {
  // dashes, underscores, letters, and numbers
  return (/^[_a-zA-Z0-9-]+$/).test(str);
}

module.exports = Dataset;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/dropdown.js":
/*!*******************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/dropdown.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");
var Dataset = __webpack_require__(/*! ./dataset.js */ "./node_modules/autocomplete.js/src/autocomplete/dataset.js");
var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");

// constructor
// -----------

function Dropdown(o) {
  var that = this;
  var onSuggestionClick;
  var onSuggestionMouseEnter;
  var onSuggestionMouseLeave;

  o = o || {};

  if (!o.menu) {
    _.error('menu is required');
  }

  if (!_.isArray(o.datasets) && !_.isObject(o.datasets)) {
    _.error('1 or more datasets required');
  }
  if (!o.datasets) {
    _.error('datasets is required');
  }

  this.isOpen = false;
  this.isEmpty = true;
  this.minLength = o.minLength || 0;
  this.templates = {};
  this.appendTo = o.appendTo || false;
  this.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
  this.cssClasses.prefix =
    o.cssClasses.formattedPrefix || _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);

  // bound functions
  onSuggestionClick = _.bind(this._onSuggestionClick, this);
  onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
  onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);

  var cssClass = _.className(this.cssClasses.prefix, this.cssClasses.suggestion);
  this.$menu = DOM.element(o.menu)
    .on('mouseenter.aa', cssClass, onSuggestionMouseEnter)
    .on('mouseleave.aa', cssClass, onSuggestionMouseLeave)
    .on('click.aa', cssClass, onSuggestionClick);

  this.$container = o.appendTo ? o.wrapper : this.$menu;

  if (o.templates && o.templates.header) {
    this.templates.header = _.templatify(o.templates.header);
    this.$menu.prepend(this.templates.header());
  }

  if (o.templates && o.templates.empty) {
    this.templates.empty = _.templatify(o.templates.empty);
    this.$empty = DOM.element('<div class="' +
      _.className(this.cssClasses.prefix, this.cssClasses.empty, true) + '">' +
      '</div>');
    this.$menu.append(this.$empty);
    this.$empty.hide();
  }

  this.datasets = _.map(o.datasets, function(oDataset) {
    return initializeDataset(that.$menu, oDataset, o.cssClasses);
  });
  _.each(this.datasets, function(dataset) {
    var root = dataset.getRoot();
    if (root && root.parent().length === 0) {
      that.$menu.append(root);
    }
    dataset.onSync('rendered', that._onRendered, that);
  });

  if (o.templates && o.templates.footer) {
    this.templates.footer = _.templatify(o.templates.footer);
    this.$menu.append(this.templates.footer());
  }

  var self = this;
  DOM.element(window).resize(function() {
    self._redraw();
  });
}

// instance methods
// ----------------

_.mixin(Dropdown.prototype, EventEmitter, {

  // ### private

  _onSuggestionClick: function onSuggestionClick($e) {
    this.trigger('suggestionClicked', DOM.element($e.currentTarget));
  },

  _onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
    var elt = DOM.element($e.currentTarget);
    if (elt.hasClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))) {
      // we're already on the cursor
      // => we're probably entering it again after leaving it for a nested div
      return;
    }
    this._removeCursor();

    // Fixes iOS double tap behaviour, by modifying the DOM right before the
    // native href clicks happens, iOS will requires another tap to follow
    // a suggestion that has an <a href> element inside
    // https://www.google.com/search?q=ios+double+tap+bug+href
    var suggestion = this;
    setTimeout(function() {
      // this exact line, when inside the main loop, will trigger a double tap bug
      // on iOS devices
      suggestion._setCursor(elt, false);
    }, 0);
  },

  _onSuggestionMouseLeave: function onSuggestionMouseLeave($e) {
    // $e.relatedTarget is the `EventTarget` the pointing device entered to
    if ($e.relatedTarget) {
      var elt = DOM.element($e.relatedTarget);
      if (elt.closest('.' + _.className(this.cssClasses.prefix, this.cssClasses.cursor, true)).length > 0) {
        // our father is a cursor
        // => it means we're just leaving the suggestion for a nested div
        return;
      }
    }
    this._removeCursor();
    this.trigger('cursorRemoved');
  },

  _onRendered: function onRendered(e, query) {
    this.isEmpty = _.every(this.datasets, isDatasetEmpty);

    if (this.isEmpty) {
      if (query.length >= this.minLength) {
        this.trigger('empty');
      }

      if (this.$empty) {
        if (query.length < this.minLength) {
          this._hide();
        } else {
          var html = this.templates.empty({
            query: this.datasets[0] && this.datasets[0].query
          });
          this.$empty.html(html);
          this.$empty.show();
          this._show();
        }
      } else if (_.any(this.datasets, hasEmptyTemplate)) {
        if (query.length < this.minLength) {
          this._hide();
        } else {
          this._show();
        }
      } else {
        this._hide();
      }
    } else if (this.isOpen) {
      if (this.$empty) {
        this.$empty.empty();
        this.$empty.hide();
      }

      if (query.length >= this.minLength) {
        this._show();
      } else {
        this._hide();
      }
    }

    this.trigger('datasetRendered');

    function isDatasetEmpty(dataset) {
      return dataset.isEmpty();
    }

    function hasEmptyTemplate(dataset) {
      return dataset.templates && dataset.templates.empty;
    }
  },

  _hide: function() {
    this.$container.hide();
  },

  _show: function() {
    // can't use jQuery#show because $menu is a span element we want
    // display: block; not dislay: inline;
    this.$container.css('display', 'block');

    this._redraw();

    this.trigger('shown');
  },

  _redraw: function redraw() {
    if (!this.isOpen || !this.appendTo) return;

    this.trigger('redrawn');
  },

  _getSuggestions: function getSuggestions() {
    return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.suggestion));
  },

  _getCursor: function getCursor() {
    return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.cursor)).first();
  },

  _setCursor: function setCursor($el, updateInput) {
    $el.first()
      .addClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))
      .attr('aria-selected', 'true');
    this.trigger('cursorMoved', updateInput);
  },

  _removeCursor: function removeCursor() {
    this._getCursor()
      .removeClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))
      .removeAttr('aria-selected');
  },

  _moveCursor: function moveCursor(increment) {
    var $suggestions;
    var $oldCursor;
    var newCursorIndex;
    var $newCursor;

    if (!this.isOpen) {
      return;
    }

    $oldCursor = this._getCursor();
    $suggestions = this._getSuggestions();

    this._removeCursor();

    // shifting before and after modulo to deal with -1 index
    newCursorIndex = $suggestions.index($oldCursor) + increment;
    newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;

    if (newCursorIndex === -1) {
      this.trigger('cursorRemoved');

      return;
    } else if (newCursorIndex < -1) {
      newCursorIndex = $suggestions.length - 1;
    }

    this._setCursor($newCursor = $suggestions.eq(newCursorIndex), true);

    // in the case of scrollable overflow
    // make sure the cursor is visible in the menu
    this._ensureVisible($newCursor);
  },

  _ensureVisible: function ensureVisible($el) {
    var elTop;
    var elBottom;
    var menuScrollTop;
    var menuHeight;

    elTop = $el.position().top;
    elBottom = elTop + $el.height() +
      parseInt($el.css('margin-top'), 10) +
      parseInt($el.css('margin-bottom'), 10);
    menuScrollTop = this.$menu.scrollTop();
    menuHeight = this.$menu.height() +
      parseInt(this.$menu.css('padding-top'), 10) +
      parseInt(this.$menu.css('padding-bottom'), 10);

    if (elTop < 0) {
      this.$menu.scrollTop(menuScrollTop + elTop);
    } else if (menuHeight < elBottom) {
      this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
    }
  },

  // ### public

  close: function close() {
    if (this.isOpen) {
      this.isOpen = false;

      this._removeCursor();
      this._hide();

      this.trigger('closed');
    }
  },

  open: function open() {
    if (!this.isOpen) {
      this.isOpen = true;

      if (!this.isEmpty) {
        this._show();
      }

      this.trigger('opened');
    }
  },

  setLanguageDirection: function setLanguageDirection(dir) {
    this.$menu.css(dir === 'ltr' ? this.css.ltr : this.css.rtl);
  },

  moveCursorUp: function moveCursorUp() {
    this._moveCursor(-1);
  },

  moveCursorDown: function moveCursorDown() {
    this._moveCursor(+1);
  },

  getDatumForSuggestion: function getDatumForSuggestion($el) {
    var datum = null;

    if ($el.length) {
      datum = {
        raw: Dataset.extractDatum($el),
        value: Dataset.extractValue($el),
        datasetName: Dataset.extractDatasetName($el)
      };
    }

    return datum;
  },

  getCurrentCursor: function getCurrentCursor() {
    return this._getCursor().first();
  },

  getDatumForCursor: function getDatumForCursor() {
    return this.getDatumForSuggestion(this._getCursor().first());
  },

  getDatumForTopSuggestion: function getDatumForTopSuggestion() {
    return this.getDatumForSuggestion(this._getSuggestions().first());
  },

  cursorTopSuggestion: function cursorTopSuggestion() {
    this._setCursor(this._getSuggestions().first(), false);
  },

  update: function update(query) {
    _.each(this.datasets, updateDataset);

    function updateDataset(dataset) {
      dataset.update(query);
    }
  },

  empty: function empty() {
    _.each(this.datasets, clearDataset);
    this.isEmpty = true;

    function clearDataset(dataset) {
      dataset.clear();
    }
  },

  isVisible: function isVisible() {
    return this.isOpen && !this.isEmpty;
  },

  destroy: function destroy() {
    this.$menu.off('.aa');

    this.$menu = null;

    _.each(this.datasets, destroyDataset);

    function destroyDataset(dataset) {
      dataset.destroy();
    }
  }
});

// helper functions
// ----------------
Dropdown.Dataset = Dataset;

function initializeDataset($menu, oDataset, cssClasses) {
  return new Dropdown.Dataset(_.mixin({$menu: $menu, cssClasses: cssClasses}, oDataset));
}

module.exports = Dropdown;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js":
/*!********************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/event_bus.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var namespace = 'autocomplete:';

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");

// constructor
// -----------

function EventBus(o) {
  if (!o || !o.el) {
    _.error('EventBus initialized without el');
  }

  this.$el = DOM.element(o.el);
}

// instance methods
// ----------------

_.mixin(EventBus.prototype, {

  // ### public

  trigger: function(type, suggestion, dataset, context) {
    var event = _.Event(namespace + type);
    this.$el.trigger(event, [suggestion, dataset, context]);
    return event;
  }
});

module.exports = EventBus;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js":
/*!************************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/event_emitter.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var immediate = __webpack_require__(/*! immediate */ "./node_modules/immediate/lib/index.js");
var splitter = /\s+/;

module.exports = {
  onSync: onSync,
  onAsync: onAsync,
  off: off,
  trigger: trigger
};

function on(method, types, cb, context) {
  var type;

  if (!cb) {
    return this;
  }

  types = types.split(splitter);
  cb = context ? bindContext(cb, context) : cb;

  this._callbacks = this._callbacks || {};

  while (type = types.shift()) {
    this._callbacks[type] = this._callbacks[type] || {sync: [], async: []};
    this._callbacks[type][method].push(cb);
  }

  return this;
}

function onAsync(types, cb, context) {
  return on.call(this, 'async', types, cb, context);
}

function onSync(types, cb, context) {
  return on.call(this, 'sync', types, cb, context);
}

function off(types) {
  var type;

  if (!this._callbacks) {
    return this;
  }

  types = types.split(splitter);

  while (type = types.shift()) {
    delete this._callbacks[type];
  }

  return this;
}

function trigger(types) {
  var type;
  var callbacks;
  var args;
  var syncFlush;
  var asyncFlush;

  if (!this._callbacks) {
    return this;
  }

  types = types.split(splitter);
  args = [].slice.call(arguments, 1);

  while ((type = types.shift()) && (callbacks = this._callbacks[type])) { // eslint-disable-line
    syncFlush = getFlush(callbacks.sync, this, [type].concat(args));
    asyncFlush = getFlush(callbacks.async, this, [type].concat(args));

    if (syncFlush()) {
      immediate(asyncFlush);
    }
  }

  return this;
}

function getFlush(callbacks, context, args) {
  return flush;

  function flush() {
    var cancelled;

    for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
      // only cancel if the callback explicitly returns false
      cancelled = callbacks[i].apply(context, args) === false;
    }

    return !cancelled;
  }
}

function bindContext(fn, context) {
  return fn.bind ?
    fn.bind(context) :
    function() { fn.apply(context, [].slice.call(arguments, 0)); };
}


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/html.js":
/*!***************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/html.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  wrapper: '<span class="%ROOT%"></span>',
  dropdown: '<span class="%PREFIX%%DROPDOWN_MENU%"></span>',
  dataset: '<div class="%PREFIX%%DATASET%-%CLASS%"></div>',
  suggestions: '<span class="%PREFIX%%SUGGESTIONS%"></span>',
  suggestion: '<div class="%PREFIX%%SUGGESTION%"></div>'
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/input.js":
/*!****************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/input.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var specialKeyCodeMap;

specialKeyCodeMap = {
  9: 'tab',
  27: 'esc',
  37: 'left',
  39: 'right',
  13: 'enter',
  38: 'up',
  40: 'down'
};

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");

// constructor
// -----------

function Input(o) {
  var that = this;
  var onBlur;
  var onFocus;
  var onKeydown;
  var onInput;

  o = o || {};

  if (!o.input) {
    _.error('input is missing');
  }

  // bound functions
  onBlur = _.bind(this._onBlur, this);
  onFocus = _.bind(this._onFocus, this);
  onKeydown = _.bind(this._onKeydown, this);
  onInput = _.bind(this._onInput, this);

  this.$hint = DOM.element(o.hint);
  this.$input = DOM.element(o.input)
    .on('blur.aa', onBlur)
    .on('focus.aa', onFocus)
    .on('keydown.aa', onKeydown);

  // if no hint, noop all the hint related functions
  if (this.$hint.length === 0) {
    this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
  }

  // ie7 and ie8 don't support the input event
  // ie9 doesn't fire the input event when characters are removed
  // not sure if ie10 is compatible
  if (!_.isMsie()) {
    this.$input.on('input.aa', onInput);
  } else {
    this.$input.on('keydown.aa keypress.aa cut.aa paste.aa', function($e) {
      // if a special key triggered this, ignore it
      if (specialKeyCodeMap[$e.which || $e.keyCode]) {
        return;
      }

      // give the browser a chance to update the value of the input
      // before checking to see if the query changed
      _.defer(_.bind(that._onInput, that, $e));
    });
  }

  // the query defaults to whatever the value of the input is
  // on initialization, it'll most likely be an empty string
  this.query = this.$input.val();

  // helps with calculating the width of the input's value
  this.$overflowHelper = buildOverflowHelper(this.$input);
}

// static methods
// --------------

Input.normalizeQuery = function(str) {
  // strips leading whitespace and condenses all whitespace
  return (str || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' ');
};

// instance methods
// ----------------

_.mixin(Input.prototype, EventEmitter, {

  // ### private

  _onBlur: function onBlur() {
    this.resetInputValue();
    this.$input.removeAttr('aria-activedescendant');
    this.trigger('blurred');
  },

  _onFocus: function onFocus() {
    this.trigger('focused');
  },

  _onKeydown: function onKeydown($e) {
    // which is normalized and consistent (but not for ie)
    var keyName = specialKeyCodeMap[$e.which || $e.keyCode];

    this._managePreventDefault(keyName, $e);
    if (keyName && this._shouldTrigger(keyName, $e)) {
      this.trigger(keyName + 'Keyed', $e);
    }
  },

  _onInput: function onInput() {
    this._checkInputValue();
  },

  _managePreventDefault: function managePreventDefault(keyName, $e) {
    var preventDefault;
    var hintValue;
    var inputValue;

    switch (keyName) {
    case 'tab':
      hintValue = this.getHint();
      inputValue = this.getInputValue();

      preventDefault = hintValue &&
        hintValue !== inputValue &&
        !withModifier($e);
      break;

    case 'up':
    case 'down':
      preventDefault = !withModifier($e);
      break;

    default:
      preventDefault = false;
    }

    if (preventDefault) {
      $e.preventDefault();
    }
  },

  _shouldTrigger: function shouldTrigger(keyName, $e) {
    var trigger;

    switch (keyName) {
    case 'tab':
      trigger = !withModifier($e);
      break;

    default:
      trigger = true;
    }

    return trigger;
  },

  _checkInputValue: function checkInputValue() {
    var inputValue;
    var areEquivalent;
    var hasDifferentWhitespace;

    inputValue = this.getInputValue();
    areEquivalent = areQueriesEquivalent(inputValue, this.query);
    hasDifferentWhitespace = areEquivalent && this.query ?
      this.query.length !== inputValue.length : false;

    this.query = inputValue;

    if (!areEquivalent) {
      this.trigger('queryChanged', this.query);
    } else if (hasDifferentWhitespace) {
      this.trigger('whitespaceChanged', this.query);
    }
  },

  // ### public

  focus: function focus() {
    this.$input.focus();
  },

  blur: function blur() {
    this.$input.blur();
  },

  getQuery: function getQuery() {
    return this.query;
  },

  setQuery: function setQuery(query) {
    this.query = query;
  },

  getInputValue: function getInputValue() {
    return this.$input.val();
  },

  setInputValue: function setInputValue(value, silent) {
    if (typeof value === 'undefined') {
      value = this.query;
    }
    this.$input.val(value);

    // silent prevents any additional events from being triggered
    if (silent) {
      this.clearHint();
    } else {
      this._checkInputValue();
    }
  },

  expand: function expand() {
    this.$input.attr('aria-expanded', 'true');
  },

  collapse: function collapse() {
    this.$input.attr('aria-expanded', 'false');
  },

  setActiveDescendant: function setActiveDescendant(activedescendantId) {
    this.$input.attr('aria-activedescendant', activedescendantId);
  },

  removeActiveDescendant: function removeActiveDescendant() {
    this.$input.removeAttr('aria-activedescendant');
  },

  resetInputValue: function resetInputValue() {
    this.setInputValue(this.query, true);
  },

  getHint: function getHint() {
    return this.$hint.val();
  },

  setHint: function setHint(value) {
    this.$hint.val(value);
  },

  clearHint: function clearHint() {
    this.setHint('');
  },

  clearHintIfInvalid: function clearHintIfInvalid() {
    var val;
    var hint;
    var valIsPrefixOfHint;
    var isValid;

    val = this.getInputValue();
    hint = this.getHint();
    valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
    isValid = val !== '' && valIsPrefixOfHint && !this.hasOverflow();

    if (!isValid) {
      this.clearHint();
    }
  },

  getLanguageDirection: function getLanguageDirection() {
    return (this.$input.css('direction') || 'ltr').toLowerCase();
  },

  hasOverflow: function hasOverflow() {
    // 2 is arbitrary, just picking a small number to handle edge cases
    var constraint = this.$input.width() - 2;

    this.$overflowHelper.text(this.getInputValue());

    return this.$overflowHelper.width() >= constraint;
  },

  isCursorAtEnd: function() {
    var valueLength;
    var selectionStart;
    var range;

    valueLength = this.$input.val().length;
    selectionStart = this.$input[0].selectionStart;

    if (_.isNumber(selectionStart)) {
      return selectionStart === valueLength;
    } else if (document.selection) {
      // NOTE: this won't work unless the input has focus, the good news
      // is this code should only get called when the input has focus
      range = document.selection.createRange();
      range.moveStart('character', -valueLength);

      return valueLength === range.text.length;
    }

    return true;
  },

  destroy: function destroy() {
    this.$hint.off('.aa');
    this.$input.off('.aa');

    this.$hint = this.$input = this.$overflowHelper = null;
  }
});

// helper functions
// ----------------

function buildOverflowHelper($input) {
  return DOM.element('<pre aria-hidden="true"></pre>')
    .css({
      // position helper off-screen
      position: 'absolute',
      visibility: 'hidden',
      // avoid line breaks and whitespace collapsing
      whiteSpace: 'pre',
      // use same font css as input to calculate accurate width
      fontFamily: $input.css('font-family'),
      fontSize: $input.css('font-size'),
      fontStyle: $input.css('font-style'),
      fontVariant: $input.css('font-variant'),
      fontWeight: $input.css('font-weight'),
      wordSpacing: $input.css('word-spacing'),
      letterSpacing: $input.css('letter-spacing'),
      textIndent: $input.css('text-indent'),
      textRendering: $input.css('text-rendering'),
      textTransform: $input.css('text-transform')
    })
    .insertAfter($input);
}

function areQueriesEquivalent(a, b) {
  return Input.normalizeQuery(a) === Input.normalizeQuery(b);
}

function withModifier($e) {
  return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
}

module.exports = Input;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/typeahead.js":
/*!********************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/typeahead.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var attrsKey = 'aaAttrs';

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var EventBus = __webpack_require__(/*! ./event_bus.js */ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js");
var Input = __webpack_require__(/*! ./input.js */ "./node_modules/autocomplete.js/src/autocomplete/input.js");
var Dropdown = __webpack_require__(/*! ./dropdown.js */ "./node_modules/autocomplete.js/src/autocomplete/dropdown.js");
var html = __webpack_require__(/*! ./html.js */ "./node_modules/autocomplete.js/src/autocomplete/html.js");
var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");

// constructor
// -----------

// THOUGHT: what if datasets could dynamically be added/removed?
function Typeahead(o) {
  var $menu;
  var $hint;

  o = o || {};

  if (!o.input) {
    _.error('missing input');
  }

  this.isActivated = false;
  this.debug = !!o.debug;
  this.autoselect = !!o.autoselect;
  this.autoselectOnBlur = !!o.autoselectOnBlur;
  this.openOnFocus = !!o.openOnFocus;
  this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
  this.autoWidth = (o.autoWidth === undefined) ? true : !!o.autoWidth;
  this.clearOnSelected = !!o.clearOnSelected;
  this.tabAutocomplete = (o.tabAutocomplete === undefined) ? true : !!o.tabAutocomplete;

  o.hint = !!o.hint;

  if (o.hint && o.appendTo) {
    throw new Error('[autocomplete.js] hint and appendTo options can\'t be used at the same time');
  }

  this.css = o.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
  this.cssClasses.prefix =
    o.cssClasses.formattedPrefix = _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);
  this.listboxId = o.listboxId = [this.cssClasses.root, 'listbox', _.getUniqueId()].join('-');

  var domElts = buildDom(o);

  this.$node = domElts.wrapper;
  var $input = this.$input = domElts.input;
  $menu = domElts.menu;
  $hint = domElts.hint;

  if (o.dropdownMenuContainer) {
    DOM.element(o.dropdownMenuContainer)
      .css('position', 'relative') // ensure the container has a relative position
      .append($menu.css('top', '0')); // override the top: 100%
  }

  // #705: if there's scrollable overflow, ie doesn't support
  // blur cancellations when the scrollbar is clicked
  //
  // #351: preventDefault won't cancel blurs in ie <= 8
  $input.on('blur.aa', function($e) {
    var active = document.activeElement;
    if (_.isMsie() && ($menu[0] === active || $menu[0].contains(active))) {
      $e.preventDefault();
      // stop immediate in order to prevent Input#_onBlur from
      // getting exectued
      $e.stopImmediatePropagation();
      _.defer(function() { $input.focus(); });
    }
  });

  // #351: prevents input blur due to clicks within dropdown menu
  $menu.on('mousedown.aa', function($e) { $e.preventDefault(); });

  this.eventBus = o.eventBus || new EventBus({el: $input});

  this.dropdown = new Typeahead.Dropdown({
    appendTo: o.appendTo,
    wrapper: this.$node,
    menu: $menu,
    datasets: o.datasets,
    templates: o.templates,
    cssClasses: o.cssClasses,
    minLength: this.minLength
  })
    .onSync('suggestionClicked', this._onSuggestionClicked, this)
    .onSync('cursorMoved', this._onCursorMoved, this)
    .onSync('cursorRemoved', this._onCursorRemoved, this)
    .onSync('opened', this._onOpened, this)
    .onSync('closed', this._onClosed, this)
    .onSync('shown', this._onShown, this)
    .onSync('empty', this._onEmpty, this)
    .onSync('redrawn', this._onRedrawn, this)
    .onAsync('datasetRendered', this._onDatasetRendered, this);

  this.input = new Typeahead.Input({input: $input, hint: $hint})
    .onSync('focused', this._onFocused, this)
    .onSync('blurred', this._onBlurred, this)
    .onSync('enterKeyed', this._onEnterKeyed, this)
    .onSync('tabKeyed', this._onTabKeyed, this)
    .onSync('escKeyed', this._onEscKeyed, this)
    .onSync('upKeyed', this._onUpKeyed, this)
    .onSync('downKeyed', this._onDownKeyed, this)
    .onSync('leftKeyed', this._onLeftKeyed, this)
    .onSync('rightKeyed', this._onRightKeyed, this)
    .onSync('queryChanged', this._onQueryChanged, this)
    .onSync('whitespaceChanged', this._onWhitespaceChanged, this);

  this._bindKeyboardShortcuts(o);

  this._setLanguageDirection();
}

// instance methods
// ----------------

_.mixin(Typeahead.prototype, {
  // ### private

  _bindKeyboardShortcuts: function(options) {
    if (!options.keyboardShortcuts) {
      return;
    }
    var $input = this.$input;
    var keyboardShortcuts = [];
    _.each(options.keyboardShortcuts, function(key) {
      if (typeof key === 'string') {
        key = key.toUpperCase().charCodeAt(0);
      }
      keyboardShortcuts.push(key);
    });
    DOM.element(document).keydown(function(event) {
      var elt = (event.target || event.srcElement);
      var tagName = elt.tagName;
      if (elt.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA') {
        // already in an input
        return;
      }

      var which = event.which || event.keyCode;
      if (keyboardShortcuts.indexOf(which) === -1) {
        // not the right shortcut
        return;
      }

      $input.focus();
      event.stopPropagation();
      event.preventDefault();
    });
  },

  _onSuggestionClicked: function onSuggestionClicked(type, $el) {
    var datum;
    var context = {selectionMethod: 'click'};

    if (datum = this.dropdown.getDatumForSuggestion($el)) {
      this._select(datum, context);
    }
  },

  _onCursorMoved: function onCursorMoved(event, updateInput) {
    var datum = this.dropdown.getDatumForCursor();
    var currentCursorId = this.dropdown.getCurrentCursor().attr('id');
    this.input.setActiveDescendant(currentCursorId);

    if (datum) {
      if (updateInput) {
        this.input.setInputValue(datum.value, true);
      }

      this.eventBus.trigger('cursorchanged', datum.raw, datum.datasetName);
    }
  },

  _onCursorRemoved: function onCursorRemoved() {
    this.input.resetInputValue();
    this._updateHint();
    this.eventBus.trigger('cursorremoved');
  },

  _onDatasetRendered: function onDatasetRendered() {
    this._updateHint();

    this.eventBus.trigger('updated');
  },

  _onOpened: function onOpened() {
    this._updateHint();
    this.input.expand();

    this.eventBus.trigger('opened');
  },

  _onEmpty: function onEmpty() {
    this.eventBus.trigger('empty');
  },

  _onRedrawn: function onRedrawn() {
    this.$node.css('top', 0 + 'px');
    this.$node.css('left', 0 + 'px');

    var inputRect = this.$input[0].getBoundingClientRect();

    if (this.autoWidth) {
      this.$node.css('width', inputRect.width + 'px');
    }

    var wrapperRect = this.$node[0].getBoundingClientRect();

    var top = inputRect.bottom - wrapperRect.top;
    this.$node.css('top', top + 'px');
    var left = inputRect.left - wrapperRect.left;
    this.$node.css('left', left + 'px');

    this.eventBus.trigger('redrawn');
  },

  _onShown: function onShown() {
    this.eventBus.trigger('shown');
    if (this.autoselect) {
      this.dropdown.cursorTopSuggestion();
    }
  },

  _onClosed: function onClosed() {
    this.input.clearHint();
    this.input.removeActiveDescendant();
    this.input.collapse();

    this.eventBus.trigger('closed');
  },

  _onFocused: function onFocused() {
    this.isActivated = true;

    if (this.openOnFocus) {
      var query = this.input.getQuery();
      if (query.length >= this.minLength) {
        this.dropdown.update(query);
      } else {
        this.dropdown.empty();
      }

      this.dropdown.open();
    }
  },

  _onBlurred: function onBlurred() {
    var cursorDatum;
    var topSuggestionDatum;

    cursorDatum = this.dropdown.getDatumForCursor();
    topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
    var context = {selectionMethod: 'blur'};

    if (!this.debug) {
      if (this.autoselectOnBlur && cursorDatum) {
        this._select(cursorDatum, context);
      } else if (this.autoselectOnBlur && topSuggestionDatum) {
        this._select(topSuggestionDatum, context);
      } else {
        this.isActivated = false;
        this.dropdown.empty();
        this.dropdown.close();
      }
    }
  },

  _onEnterKeyed: function onEnterKeyed(type, $e) {
    var cursorDatum;
    var topSuggestionDatum;

    cursorDatum = this.dropdown.getDatumForCursor();
    topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
    var context = {selectionMethod: 'enterKey'};

    if (cursorDatum) {
      this._select(cursorDatum, context);
      $e.preventDefault();
    } else if (this.autoselect && topSuggestionDatum) {
      this._select(topSuggestionDatum, context);
      $e.preventDefault();
    }
  },

  _onTabKeyed: function onTabKeyed(type, $e) {
    if (!this.tabAutocomplete) {
      // Closing the dropdown enables further tabbing
      this.dropdown.close();
      return;
    }

    var datum;
    var context = {selectionMethod: 'tabKey'};

    if (datum = this.dropdown.getDatumForCursor()) {
      this._select(datum, context);
      $e.preventDefault();
    } else {
      this._autocomplete(true);
    }
  },

  _onEscKeyed: function onEscKeyed() {
    this.dropdown.close();
    this.input.resetInputValue();
  },

  _onUpKeyed: function onUpKeyed() {
    var query = this.input.getQuery();

    if (this.dropdown.isEmpty && query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.moveCursorUp();
    }

    this.dropdown.open();
  },

  _onDownKeyed: function onDownKeyed() {
    var query = this.input.getQuery();

    if (this.dropdown.isEmpty && query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.moveCursorDown();
    }

    this.dropdown.open();
  },

  _onLeftKeyed: function onLeftKeyed() {
    if (this.dir === 'rtl') {
      this._autocomplete();
    }
  },

  _onRightKeyed: function onRightKeyed() {
    if (this.dir === 'ltr') {
      this._autocomplete();
    }
  },

  _onQueryChanged: function onQueryChanged(e, query) {
    this.input.clearHintIfInvalid();

    if (query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.empty();
    }

    this.dropdown.open();
    this._setLanguageDirection();
  },

  _onWhitespaceChanged: function onWhitespaceChanged() {
    this._updateHint();
    this.dropdown.open();
  },

  _setLanguageDirection: function setLanguageDirection() {
    var dir = this.input.getLanguageDirection();

    if (this.dir !== dir) {
      this.dir = dir;
      this.$node.css('direction', dir);
      this.dropdown.setLanguageDirection(dir);
    }
  },

  _updateHint: function updateHint() {
    var datum;
    var val;
    var query;
    var escapedQuery;
    var frontMatchRegEx;
    var match;

    datum = this.dropdown.getDatumForTopSuggestion();

    if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
      val = this.input.getInputValue();
      query = Input.normalizeQuery(val);
      escapedQuery = _.escapeRegExChars(query);

      // match input value, then capture trailing text
      frontMatchRegEx = new RegExp('^(?:' + escapedQuery + ')(.+$)', 'i');
      match = frontMatchRegEx.exec(datum.value);

      // clear hint if there's no trailing text
      if (match) {
        this.input.setHint(val + match[1]);
      } else {
        this.input.clearHint();
      }
    } else {
      this.input.clearHint();
    }
  },

  _autocomplete: function autocomplete(laxCursor) {
    var hint;
    var query;
    var isCursorAtEnd;
    var datum;

    hint = this.input.getHint();
    query = this.input.getQuery();
    isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();

    if (hint && query !== hint && isCursorAtEnd) {
      datum = this.dropdown.getDatumForTopSuggestion();
      if (datum) {
        this.input.setInputValue(datum.value);
      }

      this.eventBus.trigger('autocompleted', datum.raw, datum.datasetName);
    }
  },

  _select: function select(datum, context) {
    if (typeof datum.value !== 'undefined') {
      this.input.setQuery(datum.value);
    }
    if (this.clearOnSelected) {
      this.setVal('');
    } else {
      this.input.setInputValue(datum.value, true);
    }

    this._setLanguageDirection();

    var event = this.eventBus.trigger('selected', datum.raw, datum.datasetName, context);
    if (event.isDefaultPrevented() === false) {
      this.dropdown.close();

      // #118: allow click event to bubble up to the body before removing
      // the suggestions otherwise we break event delegation
      _.defer(_.bind(this.dropdown.empty, this.dropdown));
    }
  },

  // ### public

  open: function open() {
    // if the menu is not activated yet, we need to update
    // the underlying dropdown menu to trigger the search
    // otherwise we're not gonna see anything
    if (!this.isActivated) {
      var query = this.input.getInputValue();
      if (query.length >= this.minLength) {
        this.dropdown.update(query);
      } else {
        this.dropdown.empty();
      }
    }
    this.dropdown.open();
  },

  close: function close() {
    this.dropdown.close();
  },

  setVal: function setVal(val) {
    // expect val to be a string, so be safe, and coerce
    val = _.toStr(val);

    if (this.isActivated) {
      this.input.setInputValue(val);
    } else {
      this.input.setQuery(val);
      this.input.setInputValue(val, true);
    }

    this._setLanguageDirection();
  },

  getVal: function getVal() {
    return this.input.getQuery();
  },

  destroy: function destroy() {
    this.input.destroy();
    this.dropdown.destroy();

    destroyDomStructure(this.$node, this.cssClasses);

    this.$node = null;
  },

  getWrapper: function getWrapper() {
    return this.dropdown.$container[0];
  }
});

function buildDom(options) {
  var $input;
  var $wrapper;
  var $dropdown;
  var $hint;

  $input = DOM.element(options.input);
  $wrapper = DOM
    .element(html.wrapper.replace('%ROOT%', options.cssClasses.root))
    .css(options.css.wrapper);

  // override the display property with the table-cell value
  // if the parent element is a table and the original input was a block
  //  -> https://github.com/algolia/autocomplete.js/issues/16
  if (!options.appendTo && $input.css('display') === 'block' && $input.parent().css('display') === 'table') {
    $wrapper.css('display', 'table-cell');
  }
  var dropdownHtml = html.dropdown.
    replace('%PREFIX%', options.cssClasses.prefix).
    replace('%DROPDOWN_MENU%', options.cssClasses.dropdownMenu);
  $dropdown = DOM.element(dropdownHtml)
    .css(options.css.dropdown)
    .attr({
      role: 'listbox',
      id: options.listboxId
    });
  if (options.templates && options.templates.dropdownMenu) {
    $dropdown.html(_.templatify(options.templates.dropdownMenu)());
  }
  $hint = $input.clone().css(options.css.hint).css(getBackgroundStyles($input));

  $hint
    .val('')
    .addClass(_.className(options.cssClasses.prefix, options.cssClasses.hint, true))
    .removeAttr('id name placeholder required')
    .prop('readonly', true)
    .attr({
      'aria-hidden': 'true',
      autocomplete: 'off',
      spellcheck: 'false',
      tabindex: -1
    });
  if ($hint.removeData) {
    $hint.removeData();
  }

  // store the original values of the attrs that get modified
  // so modifications can be reverted on destroy
  $input.data(attrsKey, {
    'aria-autocomplete': $input.attr('aria-autocomplete'),
    'aria-expanded': $input.attr('aria-expanded'),
    'aria-owns': $input.attr('aria-owns'),
    autocomplete: $input.attr('autocomplete'),
    dir: $input.attr('dir'),
    role: $input.attr('role'),
    spellcheck: $input.attr('spellcheck'),
    style: $input.attr('style'),
    type: $input.attr('type')
  });

  $input
    .addClass(_.className(options.cssClasses.prefix, options.cssClasses.input, true))
    .attr({
      autocomplete: 'off',
      spellcheck: false,

      // Accessibility features
      // Give the field a presentation of a "select".
      // Combobox is the combined presentation of a single line textfield
      // with a listbox popup.
      // https://www.w3.org/WAI/PF/aria/roles#combobox
      role: 'combobox',
      // Let the screen reader know the field has an autocomplete
      // feature to it.
      'aria-autocomplete': (options.datasets &&
        options.datasets[0] && options.datasets[0].displayKey ? 'both' : 'list'),
      // Indicates whether the dropdown it controls is currently expanded or collapsed
      'aria-expanded': 'false',
      'aria-label': options.ariaLabel,
      // Explicitly point to the listbox,
      // which is a list of suggestions (aka options)
      'aria-owns': options.listboxId
    })
    .css(options.hint ? options.css.input : options.css.inputWithNoHint);

  // ie7 does not like it when dir is set to auto
  try {
    if (!$input.attr('dir')) {
      $input.attr('dir', 'auto');
    }
  } catch (e) {
    // ignore
  }

  $wrapper = options.appendTo
    ? $wrapper.appendTo(DOM.element(options.appendTo).eq(0)).eq(0)
    : $input.wrap($wrapper).parent();

  $wrapper
    .prepend(options.hint ? $hint : null)
    .append($dropdown);

  return {
    wrapper: $wrapper,
    input: $input,
    hint: $hint,
    menu: $dropdown
  };
}

function getBackgroundStyles($el) {
  return {
    backgroundAttachment: $el.css('background-attachment'),
    backgroundClip: $el.css('background-clip'),
    backgroundColor: $el.css('background-color'),
    backgroundImage: $el.css('background-image'),
    backgroundOrigin: $el.css('background-origin'),
    backgroundPosition: $el.css('background-position'),
    backgroundRepeat: $el.css('background-repeat'),
    backgroundSize: $el.css('background-size')
  };
}

function destroyDomStructure($node, cssClasses) {
  var $input = $node.find(_.className(cssClasses.prefix, cssClasses.input));

  // need to remove attrs that weren't previously defined and
  // revert attrs that originally had a value
  _.each($input.data(attrsKey), function(val, key) {
    if (val === undefined) {
      $input.removeAttr(key);
    } else {
      $input.attr(key, val);
    }
  });

  $input
    .detach()
    .removeClass(_.className(cssClasses.prefix, cssClasses.input, true))
    .insertAfter($node);
  if ($input.removeData) {
    $input.removeData(attrsKey);
  }

  $node.remove();
}

Typeahead.Dropdown = Dropdown;
Typeahead.Input = Input;
Typeahead.sources = __webpack_require__(/*! ../sources/index.js */ "./node_modules/autocomplete.js/src/sources/index.js");

module.exports = Typeahead;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/common/dom.js":
/*!********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/dom.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  element: null
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js":
/*!******************************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function parseAlgoliaClientVersion(agent) {
  var parsed = agent.match(/Algolia for vanilla JavaScript (\d+\.)(\d+\.)(\d+)/);
  if (parsed) return [parsed[1], parsed[2], parsed[3]];
  return undefined;
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/common/utils.js":
/*!**********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/utils.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DOM = __webpack_require__(/*! ./dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

module.exports = {
  // those methods are implemented differently
  // depending on which build it is, using
  // $... or angular... or Zepto... or require(...)
  isArray: null,
  isFunction: null,
  isObject: null,
  bind: null,
  each: null,
  map: null,
  mixin: null,

  isMsie: function(agentString) {
    if (agentString === undefined) { agentString = navigator.userAgent; }
    // from https://github.com/ded/bowser/blob/master/bowser.js
    if ((/(msie|trident)/i).test(agentString)) {
      var match = agentString.match(/(msie |rv:)(\d+(.\d+)?)/i);
      if (match) { return match[2]; }
    }
    return false;
  },

  // http://stackoverflow.com/a/6969486
  escapeRegExChars: function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  },

  isNumber: function(obj) { return typeof obj === 'number'; },

  toStr: function toStr(s) {
    return s === undefined || s === null ? '' : s + '';
  },

  cloneDeep: function cloneDeep(obj) {
    var clone = this.mixin({}, obj);
    var self = this;
    this.each(clone, function(value, key) {
      if (value) {
        if (self.isArray(value)) {
          clone[key] = [].concat(value);
        } else if (self.isObject(value)) {
          clone[key] = self.cloneDeep(value);
        }
      }
    });
    return clone;
  },

  error: function(msg) {
    throw new Error(msg);
  },

  every: function(obj, test) {
    var result = true;
    if (!obj) {
      return result;
    }
    this.each(obj, function(val, key) {
      if (result) {
        result = test.call(null, val, key, obj) && result;
      }
    });
    return !!result;
  },

  any: function(obj, test) {
    var found = false;
    if (!obj) {
      return found;
    }
    this.each(obj, function(val, key) {
      if (test.call(null, val, key, obj)) {
        found = true;
        return false;
      }
    });
    return found;
  },

  getUniqueId: (function() {
    var counter = 0;
    return function() { return counter++; };
  })(),

  templatify: function templatify(obj) {
    if (this.isFunction(obj)) {
      return obj;
    }
    var $template = DOM.element(obj);
    if ($template.prop('tagName') === 'SCRIPT') {
      return function template() { return $template.text(); };
    }
    return function template() { return String(obj); };
  },

  defer: function(fn) { setTimeout(fn, 0); },

  noop: function() {},

  formatPrefix: function(prefix, noPrefix) {
    return noPrefix ? '' : prefix + '-';
  },

  className: function(prefix, clazz, skipDot) {
    return (skipDot ? '' : '.') + prefix + clazz;
  },

  escapeHighlightedString: function(str, highlightPreTag, highlightPostTag) {
    highlightPreTag = highlightPreTag || '<em>';
    var pre = document.createElement('div');
    pre.appendChild(document.createTextNode(highlightPreTag));

    highlightPostTag = highlightPostTag || '</em>';
    var post = document.createElement('div');
    post.appendChild(document.createTextNode(highlightPostTag));

    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML
      .replace(RegExp(escapeRegExp(pre.innerHTML), 'g'), highlightPreTag)
      .replace(RegExp(escapeRegExp(post.innerHTML), 'g'), highlightPostTag);
  }
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/sources/hits.js":
/*!**********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/hits.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var version = __webpack_require__(/*! ../../version.js */ "./node_modules/autocomplete.js/version.js");
var parseAlgoliaClientVersion = __webpack_require__(/*! ../common/parseAlgoliaClientVersion.js */ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js");

module.exports = function search(index, params) {
  var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);
  if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
    params = params || {};
    params.additionalUA = 'autocomplete.js ' + version;
  }
  return sourceFn;

  function sourceFn(query, cb) {
    index.search(query, params, function(error, content) {
      if (error) {
        _.error(error.message);
        return;
      }
      cb(content.hits, content);
    });
  }
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/sources/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  hits: __webpack_require__(/*! ./hits.js */ "./node_modules/autocomplete.js/src/sources/hits.js"),
  popularIn: __webpack_require__(/*! ./popularIn.js */ "./node_modules/autocomplete.js/src/sources/popularIn.js")
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/sources/popularIn.js":
/*!***************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/popularIn.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var version = __webpack_require__(/*! ../../version.js */ "./node_modules/autocomplete.js/version.js");
var parseAlgoliaClientVersion = __webpack_require__(/*! ../common/parseAlgoliaClientVersion.js */ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js");

module.exports = function popularIn(index, params, details, options) {
  var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);
  if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
    params = params || {};
    params.additionalUA = 'autocomplete.js ' + version;
  }
  if (!details.source) {
    return _.error("Missing 'source' key");
  }
  var source = _.isFunction(details.source) ? details.source : function(hit) { return hit[details.source]; };

  if (!details.index) {
    return _.error("Missing 'index' key");
  }
  var detailsIndex = details.index;

  options = options || {};

  return sourceFn;

  function sourceFn(query, cb) {
    index.search(query, params, function(error, content) {
      if (error) {
        _.error(error.message);
        return;
      }

      if (content.hits.length > 0) {
        var first = content.hits[0];

        var detailsParams = _.mixin({hitsPerPage: 0}, details);
        delete detailsParams.source; // not a query parameter
        delete detailsParams.index; // not a query parameter

        var detailsAlgoliaVersion = parseAlgoliaClientVersion(detailsIndex.as._ua);
        if (detailsAlgoliaVersion && detailsAlgoliaVersion[0] >= 3 && detailsAlgoliaVersion[1] > 20) {
          params.additionalUA = 'autocomplete.js ' + version;
        }

        detailsIndex.search(source(first), detailsParams, function(error2, content2) {
          if (error2) {
            _.error(error2.message);
            return;
          }

          var suggestions = [];

          // add the 'all department' entry before others
          if (options.includeAll) {
            var label = options.allTitle || 'All departments';
            suggestions.push(_.mixin({
              facet: {value: label, count: content2.nbHits}
            }, _.cloneDeep(first)));
          }

          // enrich the first hit iterating over the facets
          _.each(content2.facets, function(values, facet) {
            _.each(values, function(count, value) {
              suggestions.push(_.mixin({
                facet: {facet: facet, value: value, count: count}
              }, _.cloneDeep(first)));
            });
          });

          // append all other hits
          for (var i = 1; i < content.hits.length; ++i) {
            suggestions.push(content.hits[i]);
          }

          cb(suggestions, content);
        });

        return;
      }

      cb([]);
    });
  }
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/standalone/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/standalone/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// this will inject Zepto in window, unfortunately no easy commonJS zepto build
var zepto = __webpack_require__(/*! ../../zepto.js */ "./node_modules/autocomplete.js/zepto.js");

// setup DOM element
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
DOM.element = zepto;

// setup utils functions
var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
_.isArray = zepto.isArray;
_.isFunction = zepto.isFunction;
_.isObject = zepto.isPlainObject;
_.bind = zepto.proxy;
_.each = function(collection, cb) {
  // stupid argument order for jQuery.each
  zepto.each(collection, reverseArgs);
  function reverseArgs(index, value) {
    return cb(value, index);
  }
};
_.map = zepto.map;
_.mixin = zepto.extend;
_.Event = zepto.Event;

var typeaheadKey = 'aaAutocomplete';
var Typeahead = __webpack_require__(/*! ../autocomplete/typeahead.js */ "./node_modules/autocomplete.js/src/autocomplete/typeahead.js");
var EventBus = __webpack_require__(/*! ../autocomplete/event_bus.js */ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js");

function autocomplete(selector, options, datasets, typeaheadObject) {
  datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 2);

  var inputs = zepto(selector).each(function(i, input) {
    var $input = zepto(input);
    var eventBus = new EventBus({el: $input});
    var typeahead = typeaheadObject || new Typeahead({
      input: $input,
      eventBus: eventBus,
      dropdownMenuContainer: options.dropdownMenuContainer,
      hint: options.hint === undefined ? true : !!options.hint,
      minLength: options.minLength,
      autoselect: options.autoselect,
      autoselectOnBlur: options.autoselectOnBlur,
      tabAutocomplete: options.tabAutocomplete,
      openOnFocus: options.openOnFocus,
      templates: options.templates,
      debug: options.debug,
      clearOnSelected: options.clearOnSelected,
      cssClasses: options.cssClasses,
      datasets: datasets,
      keyboardShortcuts: options.keyboardShortcuts,
      appendTo: options.appendTo,
      autoWidth: options.autoWidth,
      ariaLabel: options.ariaLabel || input.getAttribute('aria-label')
    });
    $input.data(typeaheadKey, typeahead);
  });

  // expose all methods in the `autocomplete` attribute
  inputs.autocomplete = {};
  _.each(['open', 'close', 'getVal', 'setVal', 'destroy', 'getWrapper'], function(method) {
    inputs.autocomplete[method] = function() {
      var methodArguments = arguments;
      var result;
      inputs.each(function(j, input) {
        var typeahead = zepto(input).data(typeaheadKey);
        result = typeahead[method].apply(typeahead, methodArguments);
      });
      return result;
    };
  });

  return inputs;
}

autocomplete.sources = Typeahead.sources;
autocomplete.escapeHighlightedString = _.escapeHighlightedString;

var wasAutocompleteSet = 'autocomplete' in window;
var oldAutocomplete = window.autocomplete;
autocomplete.noConflict = function noConflict() {
  if (wasAutocompleteSet) {
    window.autocomplete = oldAutocomplete;
  } else {
    delete window.autocomplete;
  }
  return autocomplete;
};

module.exports = autocomplete;


/***/ }),

/***/ "./node_modules/autocomplete.js/version.js":
/*!*************************************************!*\
  !*** ./node_modules/autocomplete.js/version.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "0.36.0";


/***/ }),

/***/ "./node_modules/autocomplete.js/zepto.js":
/*!***********************************************!*\
  !*** ./node_modules/autocomplete.js/zepto.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* istanbul ignore next */
/* Zepto v1.2.0 - zepto event assets data - zeptojs.com/license */
(function(global, factory) {
  module.exports = factory(global);
}(/* this ##### UPDATED: here we want to use window/global instead of this which is the current file context ##### */ window, function(window) {
  var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.matches || element.webkitMatchesSelector ||
                          element.mozMatchesSelector || element.oMatchesSelector ||
                          element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }

  function likeArray(obj) {
    var length = !!obj && 'length' in obj && obj.length,
      type = $.type(obj)

    return 'function' != type && !isWindow(obj) && (
      'array' == type || length === 0 ||
        (typeof length == 'number' && length > 0 && (length - 1) in obj)
    )
  }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overridden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. This method can be overridden in plugins.
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overridden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overridden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overridden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
      slice.call(
        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.isNumeric = function(val) {
    var num = Number(val), type = typeof val
    return val != null && type != 'boolean' &&
      (type != 'string' || val.length) &&
      !isNaN(num) && isFinite(num) || false
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }
  $.noop = function() {}

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    constructor: zepto.Z,
    length: 0,

    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    splice: emptyArray.splice,
    indexOf: emptyArray.indexOf,
    concat: function(){
      var i, value, args = []
      for (i = 0; i < arguments.length; i++) {
        value = arguments[i]
        args[i] = zepto.isZ(value) ? value.toArray() : value
      }
      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
    },

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = $()
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var nodes = [], collection = typeof selector == 'object' && $(selector)
      this.each(function(_, node){
        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
          node = node !== context && !isDocument(node) && node.parentNode
        if (node && nodes.indexOf(node) < 0) nodes.push(node)
      })
      return $(nodes)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this.pluck('textContent').join("") : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute)
      }, this)})
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    removeProp: function(name){
      name = propMap[name] || name
      return this.each(function(){ delete this[name] })
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      if (0 in arguments) {
        if (value == null) value = ""
        return this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
      } else {
        return this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
      }
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
        return {top: 0, left: 0}
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var element = this[0]
        if (typeof property == 'string') {
          if (!element) return
          return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
        } else if (isArray(property)) {
          if (!element) return
          var props = {}
          var computedStyle = getComputedStyle(element, '')
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) return
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            var arr = []
            argType = type(arg)
            if (argType == "array") {
              arg.forEach(function(el) {
                if (el.nodeType !== undefined) return arr.push(el)
                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())
                arr = arr.concat(zepto.fragment(el))
              })
              return arr
            }
            return argType == "object" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src){
              var target = el.ownerDocument ? el.ownerDocument.defaultView : window
              target['eval'].call(target, el.innerHTML)
            }
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        try {
          var dataPropDescriptor = Object.getOwnPropertyDescriptor(e, 'data')
          if (!dataPropDescriptor || dataPropDescriptor.writable)
            e.data = data
        } catch (e) {} // when using strict mode dataPropDescriptor will be undefined when e is InputEvent (even though data property exists). So we surround with try/catch
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      event.timeStamp || (event.timeStamp = Date.now())

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (callback === undefined || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var cache = [], timeout

  $.fn.remove = function(){
    return this.each(function(){
      if(this.parentNode){
        if(this.tagName === 'IMG'){
          cache.push(this)
          this.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
          if (timeout) clearTimeout(timeout)
          timeout = setTimeout(function(){ cache = [] }, 60000)
        }
        this.parentNode.removeChild(this)
      }
    })
  }
})(Zepto)

;(function($){
  var data = {}, dataAttr = $.fn.data, camelize = $.camelCase,
    exp = $.expando = 'Zepto' + (+new Date()), emptyArray = []

  // Get value from node:
  // 1. first try key as given,
  // 2. then try camelized key,
  // 3. fall back to reading "data-*" attribute.
  function getData(node, name) {
    var id = node[exp], store = id && data[id]
    if (name === undefined) return store || setData(node)
    else {
      if (store) {
        if (name in store) return store[name]
        var camelName = camelize(name)
        if (camelName in store) return store[camelName]
      }
      return dataAttr.call($(node), name)
    }
  }

  // Store value under camelized key on node
  function setData(node, name, value) {
    var id = node[exp] || (node[exp] = ++$.uuid),
      store = data[id] || (data[id] = attributeData(node))
    if (name !== undefined) store[camelize(name)] = value
    return store
  }

  // Read all "data-*" attributes from a node
  function attributeData(node) {
    var store = {}
    $.each(node.attributes || emptyArray, function(i, attr){
      if (attr.name.indexOf('data-') == 0)
        store[camelize(attr.name.replace('data-', ''))] =
          $.zepto.deserializeValue(attr.value)
    })
    return store
  }

  $.fn.data = function(name, value) {
    return value === undefined ?
      // set multiple values via object
      $.isPlainObject(name) ?
        this.each(function(i, node){
          $.each(name, function(key, value){ setData(node, key, value) })
        }) :
        // get value from first element
        (0 in this ? getData(this[0], name) : undefined) :
      // set value on all elements
      this.each(function(){ setData(this, name, value) })
  }

  $.data = function(elem, name, value) {
    return $(elem).data(name, value)
  }

  $.hasData = function(elem) {
    var id = elem[exp], store = id && data[id]
    return store ? !$.isEmptyObject(store) : false
  }

  $.fn.removeData = function(names) {
    if (typeof names == 'string') names = names.split(/\s+/)
    return this.each(function(){
      var id = this[exp], store = id && data[id]
      if (store) $.each(names || store, function(key){
        delete store[names ? camelize(this) : key]
      })
    })
  }

  // Generate extended `remove` and `empty` functions
  ;['remove', 'empty'].forEach(function(methodName){
    var origFn = $.fn[methodName]
    $.fn[methodName] = function() {
      var elements = this.find('*')
      if (methodName === 'remove') elements = elements.add(this)
      elements.removeData()
      return origFn.call(this)
    }
  })
})(Zepto)
  return Zepto
}))


/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.6+9869a4bc
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/foreach/index.js":
/*!***************************************!*\
  !*** ./node_modules/foreach/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),

/***/ "./node_modules/global/window.js":
/*!***************************************!*\
  !*** ./node_modules/global/window.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/gsap/AttrPlugin.js":
/*!*****************************************!*\
  !*** ./node_modules/gsap/AttrPlugin.js ***!
  \*****************************************/
/*! exports provided: AttrPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrPlugin", function() { return AttrPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AttrPlugin; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/*!
 * VERSION: 0.6.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */



var AttrPlugin = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine.plugin({
	propName: "attr",
	API: 2,
	version: "0.6.1",

	//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
	init: function(target, value, tween, index) {
		var p, end;
		if (typeof(target.setAttribute) !== "function") {
			return false;
		}
		for (p in value) {
			end = value[p];
			if (typeof(end) === "function") {
				end = end(index, target);
			}
			this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, false, p);
			this._overwriteProps.push(p);
		}
		return true;
	}

});







/***/ }),

/***/ "./node_modules/gsap/BezierPlugin.js":
/*!*******************************************!*\
  !*** ./node_modules/gsap/BezierPlugin.js ***!
  \*******************************************/
/*! exports provided: BezierPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BezierPlugin", function() { return BezierPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BezierPlugin; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/*!
 * VERSION: 1.3.8
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/


		var _RAD2DEG = 180 / Math.PI,
			_r1 = [],
			_r2 = [],
			_r3 = [],
			_corProps = {},
			_globals = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine.globals,
			Segment = function(a, b, c, d) {
				if (c === d) { //if c and d match, the final autoRotate value could lock at -90 degrees, so differentiate them slightly.
					c = d - (d - b) / 1000000;
				}
				if (a === b) { //if a and b match, the starting autoRotate value could lock at -90 degrees, so differentiate them slightly.
					b = a + (c - a) / 1000000;
				}
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.da = d - a;
				this.ca = c - a;
				this.ba = b - a;
			},
			_correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			cubicToQuadratic = function(a, b, c, d) {
				var q1 = {a:a},
					q2 = {},
					q3 = {},
					q4 = {c:d},
					mab = (a + b) / 2,
					mbc = (b + c) / 2,
					mcd = (c + d) / 2,
					mabc = (mab + mbc) / 2,
					mbcd = (mbc + mcd) / 2,
					m8 = (mbcd - mabc) / 8;
				q1.b = mab + (a - mab) / 4;
				q2.b = mabc + m8;
				q1.c = q2.a = (q1.b + q2.b) / 2;
				q2.c = q3.a = (mabc + mbcd) / 2;
				q3.b = mbcd - m8;
				q4.b = mcd + (d - mcd) / 4;
				q3.c = q4.a = (q3.b + q4.b) / 2;
				return [q1, q2, q3, q4];
			},
			_calculateControlPoints = function(a, curviness, quad, basic, correlate) {
				var l = a.length - 1,
					ii = 0,
					cp1 = a[0].a,
					i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;
				for (i = 0; i < l; i++) {
					seg = a[ii];
					p1 = seg.a;
					p2 = seg.d;
					p3 = a[ii+1].d;

					if (correlate) {
						r1 = _r1[i];
						r2 = _r2[i];
						tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
						m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : (r1 !== 0 ? tl / r1 : 0));
						m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : (r2 !== 0 ? tl / r2 : 0));
						mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0));
					} else {
						m1 = p2 - (p2 - p1) * curviness * 0.5;
						m2 = p2 + (p3 - p2) * curviness * 0.5;
						mm = p2 - (m1 + m2) / 2;
					}
					m1 += mm;
					m2 += mm;

					seg.c = cp2 = m1;
					if (i !== 0) {
						seg.b = cp1;
					} else {
						seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
					}

					seg.da = p2 - p1;
					seg.ca = cp2 - p1;
					seg.ba = cp1 - p1;

					if (quad) {
						qb = cubicToQuadratic(p1, cp1, cp2, p2);
						a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
						ii += 4;
					} else {
						ii++;
					}

					cp1 = m2;
				}
				seg = a[ii];
				seg.b = cp1;
				seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.
				seg.da = seg.d - seg.a;
				seg.ca = seg.c - seg.a;
				seg.ba = cp1 - seg.a;
				if (quad) {
					qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
					a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
				}
			},
			_parseAnchors = function(values, p, correlate, prepend) {
				var a = [],
					l, i, p1, p2, p3, tmp;
				if (prepend) {
					values = [prepend].concat(values);
					i = values.length;
					while (--i > -1) {
						if (typeof( (tmp = values[i][p]) ) === "string") if (tmp.charAt(1) === "=") {
							values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
						}
					}
				}
				l = values.length - 2;
				if (l < 0) {
					a[0] = new Segment(values[0][p], 0, 0, values[0][p]);
					return a;
				}
				for (i = 0; i < l; i++) {
					p1 = values[i][p];
					p2 = values[i+1][p];
					a[i] = new Segment(p1, 0, 0, p2);
					if (correlate) {
						p3 = values[i+2][p];
						_r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
						_r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
					}
				}
				a[i] = new Segment(values[i][p], 0, 0, values[i+1][p]);
				return a;
			},
			bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
				var obj = {},
					props = [],
					first = prepend || values[0],
					i, p, a, j, r, l, seamless, last;
				correlate = (typeof(correlate) === "string") ? ","+correlate+"," : _correlate;
				if (curviness == null) {
					curviness = 1;
				}
				for (p in values[0]) {
					props.push(p);
				}
				//check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)
				if (values.length > 1) {
					last = values[values.length - 1];
					seamless = true;
					i = props.length;
					while (--i > -1) {
						p = props[i];
						if (Math.abs(first[p] - last[p]) > 0.05) { //build in a tolerance of +/-0.05 to accommodate rounding errors.
							seamless = false;
							break;
						}
					}
					if (seamless) {
						values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens
						if (prepend) {
							values.unshift(prepend);
						}
						values.push(values[1]);
						prepend = values[values.length - 3];
					}
				}
				_r1.length = _r2.length = _r3.length = 0;
				i = props.length;
				while (--i > -1) {
					p = props[i];
					_corProps[p] = (correlate.indexOf(","+p+",") !== -1);
					obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
				}
				i = _r1.length;
				while (--i > -1) {
					_r1[i] = Math.sqrt(_r1[i]);
					_r2[i] = Math.sqrt(_r2[i]);
				}
				if (!basic) {
					i = props.length;
					while (--i > -1) {
						if (_corProps[p]) {
							a = obj[props[i]];
							l = a.length - 1;
							for (j = 0; j < l; j++) {
								r = (a[j+1].da / _r2[j] + a[j].da / _r1[j]) || 0;
								_r3[j] = (_r3[j] || 0) + r * r;
							}
						}
					}
					i = _r3.length;
					while (--i > -1) {
						_r3[i] = Math.sqrt(_r3[i]);
					}
				}
				i = props.length;
				j = quadratic ? 4 : 1;
				while (--i > -1) {
					p = props[i];
					a = obj[p];
					_calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties
					if (seamless) {
						a.splice(0, j);
						a.splice(a.length - j, j);
					}
				}
				return obj;
			},
			_parseBezierData = function(values, type, prepend) {
				type = type || "soft";
				var obj = {},
					inc = (type === "cubic") ? 3 : 2,
					soft = (type === "soft"),
					props = [],
					a, b, c, d, cur, i, j, l, p, cnt, tmp;
				if (soft && prepend) {
					values = [prepend].concat(values);
				}
				if (values == null || values.length < inc + 1) { throw "invalid Bezier data"; }
				for (p in values[0]) {
					props.push(p);
				}
				i = props.length;
				while (--i > -1) {
					p = props[i];
					obj[p] = cur = [];
					cnt = 0;
					l = values.length;
					for (j = 0; j < l; j++) {
						a = (prepend == null) ? values[j][p] : (typeof( (tmp = values[j][p]) ) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
						if (soft) if (j > 1) if (j < l - 1) {
							cur[cnt++] = (a + cur[cnt-2]) / 2;
						}
						cur[cnt++] = a;
					}
					l = cnt - inc + 1;
					cnt = 0;
					for (j = 0; j < l; j += inc) {
						a = cur[j];
						b = cur[j+1];
						c = cur[j+2];
						d = (inc === 2) ? 0 : cur[j+3];
						cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
					}
					cur.length = cnt;
				}
				return obj;
			},
			_addCubicLengths = function(a, steps, resolution) {
				var inc = 1 / resolution,
					j = a.length,
					d, d1, s, da, ca, ba, p, i, inv, bez, index;
				while (--j > -1) {
					bez = a[j];
					s = bez.a;
					da = bez.d - s;
					ca = bez.c - s;
					ba = bez.b - s;
					d = d1 = 0;
					for (i = 1; i <= resolution; i++) {
						p = inc * i;
						inv = 1 - p;
						d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
						index = j * resolution + i - 1;
						steps[index] = (steps[index] || 0) + d * d;
					}
				}
			},
			_parseLengthData = function(obj, resolution) {
				resolution = resolution >> 0 || 6;
				var a = [],
					lengths = [],
					d = 0,
					total = 0,
					threshold = resolution - 1,
					segments = [],
					curLS = [], //current length segments array
					p, i, l, index;
				for (p in obj) {
					_addCubicLengths(obj[p], a, resolution);
				}
				l = a.length;
				for (i = 0; i < l; i++) {
					d += Math.sqrt(a[i]);
					index = i % resolution;
					curLS[index] = d;
					if (index === threshold) {
						total += d;
						index = (i / resolution) >> 0;
						segments[index] = curLS;
						lengths[index] = total;
						d = 0;
						curLS = [];
					}
				}
				return {length:total, lengths:lengths, segments:segments};
			},



			BezierPlugin = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine.plugin({
					propName: "bezier",
					priority: -1,
					version: "1.3.8",
					API: 2,
					global:true,

					//gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
					init: function(target, vars, tween) {
						this._target = target;
						if (vars instanceof Array) {
							vars = {values:vars};
						}
						this._func = {};
						this._mod = {};
						this._props = [];
						this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution, 10);
						var values = vars.values || [],
							first = {},
							second = values[0],
							autoRotate = vars.autoRotate || tween.vars.orientToBezier,
							p, isFunc, i, j, prepend;

						this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [["x","y","rotation",((autoRotate === true) ? 0 : Number(autoRotate) || 0)]] : null;
						for (p in second) {
							this._props.push(p);
						}

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];

							this._overwriteProps.push(p);
							isFunc = this._func[p] = (typeof(target[p]) === "function");
							first[p] = (!isFunc) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
							if (!prepend) if (first[p] !== values[0][p]) {
								prepend = first;
							}
						}
						this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
						this._segCount = this._beziers[p].length;

						if (this._timeRes) {
							var ld = _parseLengthData(this._beziers, this._timeRes);
							this._length = ld.length;
							this._lengths = ld.lengths;
							this._segments = ld.segments;
							this._l1 = this._li = this._s1 = this._si = 0;
							this._l2 = this._lengths[0];
							this._curSeg = this._segments[0];
							this._s2 = this._curSeg[0];
							this._prec = 1 / this._curSeg.length;
						}

						if ((autoRotate = this._autoRotate)) {
							this._initialRotations = [];
							if (!(autoRotate[0] instanceof Array)) {
								this._autoRotate = autoRotate = [autoRotate];
							}
							i = autoRotate.length;
							while (--i > -1) {
								for (j = 0; j < 3; j++) {
									p = autoRotate[i][j];
									this._func[p] = (typeof(target[p]) === "function") ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ] : false;
								}
								p = autoRotate[i][2];
								this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0;
								this._overwriteProps.push(p);
							}
						}
						this._startRatio = tween.vars.runBackwards ? 1 : 0; //we determine the starting ratio when the tween inits which is always 0 unless the tween has runBackwards:true (indicating it's a from() tween) in which case it's 1.
						return true;
					},

					//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
					set: function(v) {
						var segments = this._segCount,
							func = this._func,
							target = this._target,
							notStart = (v !== this._startRatio),
							curIndex, inv, i, p, b, t, val, l, lengths, curSeg;
						if (!this._timeRes) {
							curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;
							t = (v - (curIndex * (1 / segments))) * segments;
						} else {
							lengths = this._lengths;
							curSeg = this._curSeg;
							v *= this._length;
							i = this._li;
							//find the appropriate segment (if the currently cached one isn't correct)
							if (v > this._l2 && i < segments - 1) {
								l = segments - 1;
								while (i < l && (this._l2 = lengths[++i]) <= v) {	}
								this._l1 = lengths[i-1];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s2 = curSeg[(this._s1 = this._si = 0)];
							} else if (v < this._l1 && i > 0) {
								while (i > 0 && (this._l1 = lengths[--i]) >= v) { }
								if (i === 0 && v < this._l1) {
									this._l1 = 0;
								} else {
									i++;
								}
								this._l2 = lengths[i];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
								this._s2 = curSeg[this._si];
							}
							curIndex = i;
							//now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)
							v -= this._l1;
							i = this._si;
							if (v > this._s2 && i < curSeg.length - 1) {
								l = curSeg.length - 1;
								while (i < l && (this._s2 = curSeg[++i]) <= v) {	}
								this._s1 = curSeg[i-1];
								this._si = i;
							} else if (v < this._s1 && i > 0) {
								while (i > 0 && (this._s1 = curSeg[--i]) >= v) {	}
								if (i === 0 && v < this._s1) {
									this._s1 = 0;
								} else {
									i++;
								}
								this._s2 = curSeg[i];
								this._si = i;
							}
							t = ((i + (v - this._s1) / (this._s2 - this._s1)) * this._prec) || 0;
						}
						inv = 1 - t;

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];
							b = this._beziers[p][curIndex];
							val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
							if (this._mod[p]) {
								val = this._mod[p](val, target);
							}
							if (func[p]) {
								target[p](val);
							} else {
								target[p] = val;
							}
						}

						if (this._autoRotate) {
							var ar = this._autoRotate,
								b2, x1, y1, x2, y2, add, conv;
							i = ar.length;
							while (--i > -1) {
								p = ar[i][2];
								add = ar[i][3] || 0;
								conv = (ar[i][4] === true) ? 1 : _RAD2DEG;
								b = this._beziers[ar[i][0]];
								b2 = this._beziers[ar[i][1]];

								if (b && b2) { //in case one of the properties got overwritten.
									b = b[curIndex];
									b2 = b2[curIndex];

									x1 = b.a + (b.b - b.a) * t;
									x2 = b.b + (b.c - b.b) * t;
									x1 += (x2 - x1) * t;
									x2 += ((b.c + (b.d - b.c) * t) - x2) * t;

									y1 = b2.a + (b2.b - b2.a) * t;
									y2 = b2.b + (b2.c - b2.b) * t;
									y1 += (y2 - y1) * t;
									y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;

									val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];

									if (this._mod[p]) {
										val = this._mod[p](val, target); //for modProps
									}

									if (func[p]) {
										target[p](val);
									} else {
										target[p] = val;
									}
								}
							}
						}
					}
			}),
			p = BezierPlugin.prototype;


		BezierPlugin.bezierThrough = bezierThrough;
		BezierPlugin.cubicToQuadratic = cubicToQuadratic;
		BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite
		BezierPlugin.quadraticToCubic = function(a, b, c) {
			return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
		};

		BezierPlugin._cssRegister = function() {
			var CSSPlugin = _globals.CSSPlugin;
			if (!CSSPlugin) {
				return;
			}
			var _internals = CSSPlugin._internals,
				_parseToProxy = _internals._parseToProxy,
				_setPluginRatio = _internals._setPluginRatio,
				CSSPropTween = _internals.CSSPropTween;
			_internals._registerComplexSpecialProp("bezier", {parser:function(t, e, prop, cssp, pt, plugin) {
				if (e instanceof Array) {
					e = {values:e};
				}
				plugin = new BezierPlugin();
				var values = e.values,
					l = values.length - 1,
					pluginValues = [],
					v = {},
					i, p, data;
				if (l < 0) {
					return pt;
				}
				for (i = 0; i <= l; i++) {
					data = _parseToProxy(t, values[i], cssp, pt, plugin, (l !== i));
					pluginValues[i] = data.end;
				}
				for (p in e) {
					v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
				}
				v.values = pluginValues;
				pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
				pt.data = data;
				pt.plugin = plugin;
				pt.setRatio = _setPluginRatio;
				if (v.autoRotate === 0) {
					v.autoRotate = true;
				}
				if (v.autoRotate && !(v.autoRotate instanceof Array)) {
					i = (v.autoRotate === true) ? 0 : Number(v.autoRotate);
					v.autoRotate = (data.end.left != null) ? [["left","top","rotation",i,false]] : (data.end.x != null) ? [["x","y","rotation",i,false]] : false;
				}
				if (v.autoRotate) {
					if (!cssp._transform) {
						cssp._enableTransforms(false);
					}
					data.autoRotate = cssp._target._gsTransform;
					data.proxy.rotation = data.autoRotate.rotation || 0;
					cssp._overwriteProps.push("rotation");
				}
				plugin._onInitTween(data.proxy, v, cssp._tween);
				return pt;
			}});
		};

		p._mod = function(lookup) {
			var op = this._overwriteProps,
				i = op.length,
				val;
			while (--i > -1) {
				val = lookup[op[i]];
				if (val && typeof(val) === "function") {
					this._mod[op[i]] = val;
				}
			}
		};

		p._kill = function(lookup) {
			var a = this._props,
				p, i;
			for (p in this._beziers) {
				if (p in lookup) {
					delete this._beziers[p];
					delete this._func[p];
					i = a.length;
					while (--i > -1) {
						if (a[i] === p) {
							a.splice(i, 1);
						}
					}
				}
			}
			a = this._autoRotate;
			if (a) {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i][2]]) {
						a.splice(i, 1);
					}
				}
			}
			return this._super._kill.call(this, lookup);
		};



/***/ }),

/***/ "./node_modules/gsap/CSSPlugin.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/CSSPlugin.js ***!
  \****************************************/
/*! exports provided: CSSPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSSPlugin", function() { return CSSPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CSSPlugin; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */


	_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","TweenLite"], function() {

		/** @constructor **/
		var CSSPlugin = function() {
				_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["TweenPlugin"].call(this, "css");
				this._overwriteProps.length = 0;
				this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_globals = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine.globals,
			_hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
			_suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
			_cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
			_overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
			_specialProps = {},
			p = CSSPlugin.prototype = new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["TweenPlugin"]("css");

		p.constructor = CSSPlugin;
		CSSPlugin.version = "2.0.2";
		CSSPlugin.API = 2;
		CSSPlugin.defaultTransformPerspective = 0;
		CSSPlugin.defaultSkewType = "compensated";
		CSSPlugin.defaultSmoothOrigin = true;
		p = "px"; //we'll reuse the "p" variable to keep file size down
		CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p, lineHeight:""};


		var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
			_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			_valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
			_NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, //also allows scientific notation and doesn't kill the leading -/+ in -= and +=
			_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
			_opacityExp = /opacity *= *([^)]*)/i,
			_opacityValExp = /opacity:([^;]*)/i,
			_alphaFilterExp = /alpha\(opacity *=.+?\)/i,
			_rgbhslExp = /^(rgb|hsl)/,
			_capsExp = /([A-Z])/g,
			_camelExp = /-([a-z])/gi,
			_urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
			_camelFunc = function(s, g) { return g.toUpperCase(); },
			_horizExp = /(?:Left|Right|Width)/i,
			_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
			_complexExp = /[\s,\(]/i, //for testing a string to find if it has a space, comma, or open parenthesis (clues that it's a complex value)
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			_forcePT = {},
			_dummyElement = {style:{}},
			_doc = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"].document || {createElement: function() {return _dummyElement;}},
			_createElement = function(type, ns) {
				return _doc.createElementNS ? _doc.createElementNS(ns || "http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
			},
			_tempDiv = _createElement("div"),
			_tempImg = _createElement("img"),
			_internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
			_agent = (_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"].navigator || {}).userAgent || "",
			_autoRound,
			_reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).

			_isSafari,
			_isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
			_isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
			_ieVers,
			_supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
				var i = _agent.indexOf("Android"),
					a = _createElement("a");
				_isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || parseFloat(_agent.substr(i+8, 2)) > 3));
				_isSafariLT6 = (_isSafari && (parseFloat(_agent.substr(_agent.indexOf("Version/")+8, 2)) < 6));
				_isFirefox = (_agent.indexOf("Firefox") !== -1);
				if ((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent) || (/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(_agent)) {
					_ieVers = parseFloat( RegExp.$1 );
				}
				if (!a) {
					return false;
				}
				a.style.cssText = "top:1px;opacity:.55;";
				return /^0.55/.test(a.style.opacity);
			}()),
			_getIEOpacity = function(v) {
				return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
			},
			_log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
				if (_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"].console) {
					console.log(s);
				}
			},
			_target, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
			_index, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params

			_prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
			_prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".

			// @private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
			_checkPropPrefix = function(p, e) {
				e = e || _tempDiv;
				var s = e.style,
					a, i;
				if (s[p] !== undefined) {
					return p;
				}
				p = p.charAt(0).toUpperCase() + p.substr(1);
				a = ["O","Moz","ms","Ms","Webkit"];
				i = 5;
				while (--i > -1 && s[a[i]+p] === undefined) { }
				if (i >= 0) {
					_prefix = (i === 3) ? "ms" : a[i];
					_prefixCSS = "-" + _prefix.toLowerCase() + "-";
					return _prefix + p;
				}
				return null;
			},

			_getComputedStyle = (typeof(window) !== "undefined" ? window : _doc.defaultView || {getComputedStyle:function() {}}).getComputedStyle,

			/**
			 * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
			 * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
			 *
			 * @param {!Object} t Target element whose style property you want to query
			 * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
			 * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
			 * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
			 * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
			 * @return {?string} The current property value
			 */
			_getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
				var rv;
				if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
					return _getIEOpacity(t);
				}
				if (!calc && t.style[p]) {
					rv = t.style[p];
				} else if ((cs = cs || _getComputedStyle(t))) {
					rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
				} else if (t.currentStyle) {
					rv = t.currentStyle[p];
				}
				return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
			},

			/**
			 * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
			 * @param {!Object} t Target element
			 * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
			 * @param {!number} v Value
			 * @param {string=} sfx Suffix (like "px" or "%" or "em")
			 * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
			 * @return {number} value in pixels
			 */
			_convertToPixels = _internals.convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px" || (!sfx && p !== "lineHeight")) { return v; }
				if (sfx === "auto" || !v) { return 0; }
				var horiz = _horizExp.test(p),
					node = t,
					style = _tempDiv.style,
					neg = (v < 0),
					precise = (v === 1),
					pix, cache, time;
				if (neg) {
					v = -v;
				}
				if (precise) {
					v *= 100;
				}
				if (p === "lineHeight" && !sfx) { //special case of when a simple lineHeight (without a unit) is used. Set it to the value, read back the computed value, and then revert.
					cache = _getComputedStyle(t).lineHeight;
					t.style.lineHeight = v;
					pix = parseFloat(_getComputedStyle(t).lineHeight);
					t.style.lineHeight = cache;
				} else if (sfx === "%" && p.indexOf("border") !== -1) {
					pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
				} else {
					style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";
					if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
						node = t.parentNode || _doc.body;
						if (_getStyle(node, "display").indexOf("flex") !== -1) { //Edge and IE11 have a bug that causes offsetWidth to report as 0 if the container has display:flex and the child is position:relative. Switching to position: absolute solves it.
							style.position = "absolute";
						}
						cache = node._gsCache;
						time = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].ticker.frame;
						if (cache && horiz && cache.time === time) { //performance optimization: we record the width of elements along with the ticker frame so that we can quickly get it again on the same tick (seems relatively safe to assume it wouldn't change on the same tick)
							return cache.width * v / 100;
						}
						style[(horiz ? "width" : "height")] = v + sfx;
					} else {
						style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
					}
					node.appendChild(_tempDiv);
					pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
					node.removeChild(_tempDiv);
					if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== false) {
						cache = node._gsCache = node._gsCache || {};
						cache.time = time;
						cache.width = pix / v * 100;
					}
					if (pix === 0 && !recurse) {
						pix = _convertToPixels(t, p, v, sfx, true);
					}
				}
				if (precise) {
					pix /= 100;
				}
				return neg ? -pix : pix;
			},
			_calculateOffset = _internals.calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
				if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
				var dim = ((p === "left") ? "Left" : "Top"),
					v = _getStyle(t, "margin" + dim, cs);
				return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
			},

			// @private returns at object containing ALL of the style properties in camelCase and their associated values.
			_getAllStyles = function(t, cs) {
				var s = {},
					i, tr, p;
				if ((cs = cs || _getComputedStyle(t, null))) {
					if ((i = cs.length)) {
						while (--i > -1) {
							p = cs[i];
							if (p.indexOf("-transform") === -1 || _transformPropCSS === p) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
							}
						}
					} else { //some browsers behave differently - cs.length is always 0, so we must do a for...in loop.
						for (i in cs) {
							if (i.indexOf("Transform") === -1 || _transformProp === i) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[i] = cs[i];
							}
						}
					}
				} else if ((cs = t.currentStyle || t.style)) {
					for (i in cs) {
						if (typeof(i) === "string" && s[i] === undefined) {
							s[i.replace(_camelExp, _camelFunc)] = cs[i];
						}
					}
				}
				if (!_supportsOpacity) {
					s.opacity = _getIEOpacity(t);
				}
				tr = _getTransform(t, cs, false);
				s.rotation = tr.rotation;
				s.skewX = tr.skewX;
				s.scaleX = tr.scaleX;
				s.scaleY = tr.scaleY;
				s.x = tr.x;
				s.y = tr.y;
				if (_supports3D) {
					s.z = tr.z;
					s.rotationX = tr.rotationX;
					s.rotationY = tr.rotationY;
					s.scaleZ = tr.scaleZ;
				}
				if (s.filters) {
					delete s.filters;
				}
				return s;
			},

			// @private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
			_cssDif = function(t, s1, s2, vars, forceLookup) {
				var difs = {},
					style = t.style,
					val, p, mpt;
				for (p in s2) {
					if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
						difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
						if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
							mpt = new MiniPropTween(style, p, style[p], mpt);
						}
					}
				}
				if (vars) {
					for (p in vars) { //copy properties (except className)
						if (p !== "className") {
							difs[p] = vars[p];
						}
					}
				}
				return {difs:difs, firstMPT:mpt};
			},
			_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
			_margins = ["marginLeft","marginRight","marginTop","marginBottom"],

			/**
			 * @private Gets the width or height of an element
			 * @param {!Object} t Target element
			 * @param {!string} p Property name ("width" or "height")
			 * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
			 * @return {number} Dimension (in pixels)
			 */
			_getDimension = function(t, p, cs) {
				if ((t.nodeName + "").toLowerCase() === "svg") { //Chrome no longer supports offsetWidth/offsetHeight on SVG elements.
					return (cs || _getComputedStyle(t))[p] || 0;
				} else if (t.getCTM && _isSVG(t)) {
					return t.getBBox()[p] || 0;
				}
				var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
					a = _dimensions[p],
					i = a.length;
				cs = cs || _getComputedStyle(t, null);
				while (--i > -1) {
					v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
					v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
				}
				return v;
			},

			// @private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
			_parsePosition = function(v, recObj) {
				if (v === "contain" || v === "auto" || v === "auto auto") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
					return v + " ";
				}
				if (v == null || v === "") {
					v = "0 0";
				}
				var a = v.split(" "),
					x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1],
					i;
				if (a.length > 3 && !recObj) { //multiple positions
					a = v.split(", ").join(",").split(",");
					v = [];
					for (i = 0; i < a.length; i++) {
						v.push(_parsePosition(a[i]));
					}
					return v.join(",");
				}
				if (y == null) {
					y = (x === "center") ? "50%" : "0";
				} else if (y === "center") {
					y = "50%";
				}
				if (x === "center" || (isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1)) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
					x = "50%";
				}
				v = x + " " + y + ((a.length > 2) ? " " + a[2] : "");
				if (recObj) {
					recObj.oxp = (x.indexOf("%") !== -1);
					recObj.oyp = (y.indexOf("%") !== -1);
					recObj.oxr = (x.charAt(1) === "=");
					recObj.oyr = (y.charAt(1) === "=");
					recObj.ox = parseFloat(x.replace(_NaNExp, ""));
					recObj.oy = parseFloat(y.replace(_NaNExp, ""));
					recObj.v = v;
				}
				return recObj || v;
			},

			/**
			 * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
			 * @param {(number|string)} e End value which is typically a string, but could be a number
			 * @param {(number|string)} b Beginning value which is typically a string but could be a number
			 * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
			 */
			_parseChange = function(e, b) {
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : (parseFloat(e) - parseFloat(b)) || 0;
			},

			/**
			 * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @return {number} Parsed value
			 */
			_parseVal = function(v, d) {
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				var isRelative = (typeof(v) === "string" && v.charAt(1) === "=");
				if (typeof(v) === "string" && v.charAt(v.length - 2) === "v") { //convert vw and vh into px-equivalents.
					v = (isRelative ? v.substr(0, 2) : 0) + (window["inner" + ((v.substr(-2) === "vh") ? "Height" : "Width")] * (parseFloat(isRelative ? v.substr(2) : v) / 100));
				}
				return (v == null) ? d : isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
			},

			/**
			 * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
			 * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
			 * @return {number} parsed angle in radians
			 */
			_parseAngle = function(v, d, p, directionalEnd) {
				var min = 0.000001,
					cap, split, dif, result, isRelative;
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				if (v == null) {
					result = d;
				} else if (typeof(v) === "number") {
					result = v;
				} else {
					cap = 360;
					split = v.split("_");
					isRelative = (v.charAt(1) === "=");
					dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * ((v.indexOf("rad") === -1) ? 1 : _RAD2DEG) - (isRelative ? 0 : d);
					if (split.length) {
						if (directionalEnd) {
							directionalEnd[p] = d + dif;
						}
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					result = d + dif;
				}
				if (result < min && result > -min) {
					result = 0;
				}
				return result;
			},

			_colorLookup = {aqua:[0,255,255],
				lime:[0,255,0],
				silver:[192,192,192],
				black:[0,0,0],
				maroon:[128,0,0],
				teal:[0,128,128],
				blue:[0,0,255],
				navy:[0,0,128],
				white:[255,255,255],
				fuchsia:[255,0,255],
				olive:[128,128,0],
				yellow:[255,255,0],
				orange:[255,165,0],
				gray:[128,128,128],
				purple:[128,0,128],
				green:[0,128,0],
				red:[255,0,0],
				pink:[255,192,203],
				cyan:[0,255,255],
				transparent:[255,255,255,0]},

			_hue = function(h, m1, m2) {
				h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
				return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
			},

			/**
			 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
			 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
			 * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
			 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
			 */
			_parseColor = CSSPlugin.parseColor = function(v, toHSL) {
				var a, r, g, b, h, s, l, max, min, d, wasHSL;
				if (!v) {
					a = _colorLookup.black;
				} else if (typeof(v) === "number") {
					a = [v >> 16, (v >> 8) & 255, v & 255];
				} else {
					if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
						v = v.substr(0, v.length - 1);
					}
					if (_colorLookup[v]) {
						a = _colorLookup[v];
					} else if (v.charAt(0) === "#") {
						if (v.length === 4) { //for shorthand like #9F0
							r = v.charAt(1);
							g = v.charAt(2);
							b = v.charAt(3);
							v = "#" + r + r + g + g + b + b;
						}
						v = parseInt(v.substr(1), 16);
						a = [v >> 16, (v >> 8) & 255, v & 255];
					} else if (v.substr(0, 3) === "hsl") {
						a = wasHSL = v.match(_numExp);
						if (!toHSL) {
							h = (Number(a[0]) % 360) / 360;
							s = Number(a[1]) / 100;
							l = Number(a[2]) / 100;
							g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
							r = l * 2 - g;
							if (a.length > 3) {
								a[3] = Number(a[3]);
							}
							a[0] = _hue(h + 1 / 3, r, g);
							a[1] = _hue(h, r, g);
							a[2] = _hue(h - 1 / 3, r, g);
						} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
							return v.match(_relNumExp);
						}
					} else {
						a = v.match(_numExp) || _colorLookup.transparent;
					}
					a[0] = Number(a[0]);
					a[1] = Number(a[1]);
					a[2] = Number(a[2]);
					if (a.length > 3) {
						a[3] = Number(a[3]);
					}
				}
				if (toHSL && !wasHSL) {
					r = a[0] / 255;
					g = a[1] / 255;
					b = a[2] / 255;
					max = Math.max(r, g, b);
					min = Math.min(r, g, b);
					l = (max + min) / 2;
					if (max === min) {
						h = s = 0;
					} else {
						d = max - min;
						s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
						h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
						h *= 60;
					}
					a[0] = (h + 0.5) | 0;
					a[1] = (s * 100 + 0.5) | 0;
					a[2] = (l * 100 + 0.5) | 0;
				}
				return a;
			},
			_formatColors = function(s, toHSL) {
				var colors = s.match(_colorExp) || [],
					charIndex = 0,
					parsed = "",
					i, color, temp;
				if (!colors.length) {
					return s;
				}
				for (i = 0; i < colors.length; i++) {
					color = colors[i];
					temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
					charIndex += temp.length + color.length;
					color = _parseColor(color, toHSL);
					if (color.length === 3) {
						color.push(1);
					}
					parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
				}
				return parsed + s.substr(charIndex);
			},
			_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		for (p in _colorLookup) {
			_colorExp += "|" + p + "\\b";
		}
		_colorExp = new RegExp(_colorExp+")", "gi");

		CSSPlugin.colorStringFilter = function(a) {
			var combined = a[0] + " " + a[1],
				toHSL;
			if (_colorExp.test(combined)) {
				toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
				a[0] = _formatColors(a[0], toHSL);
				a[1] = _formatColors(a[1], toHSL);
			}
			_colorExp.lastIndex = 0;
		};

		if (!_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].defaultStringFilter) {
			_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].defaultStringFilter = CSSPlugin.colorStringFilter;
		}

		/**
		 * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
		 * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
		 * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
		 * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
		 * @return {Function} formatter function
		 */
		var _getFormatter = function(dflt, clr, collapsible, multi) {
				if (dflt == null) {
					return function(v) {return v;};
				}
				var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
					dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
					pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
					sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
					delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
					numVals = dVals.length,
					dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
					formatter;
				if (!numVals) {
					return function(v) {return v;};
				}
				if (clr) {
					formatter = function(v) {
						var color, vals, i, a;
						if (typeof(v) === "number") {
							v += dSfx;
						} else if (multi && _commasOutsideParenExp.test(v)) {
							a = v.replace(_commasOutsideParenExp, "|").split("|");
							for (i = 0; i < a.length; i++) {
								a[i] = formatter(a[i]);
							}
							return a.join(",");
						}
						color = (v.match(_colorExp) || [dColor])[0];
						vals = v.split(color).join("").match(_valuesExp) || [];
						i = vals.length;
						if (numVals > i--) {
							while (++i < numVals) {
								vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
							}
						}
						return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
					};
					return formatter;

				}
				formatter = function(v) {
					var vals, a, i;
					if (typeof(v) === "number") {
						v += dSfx;
					} else if (multi && _commasOutsideParenExp.test(v)) {
						a = v.replace(_commasOutsideParenExp, "|").split("|");
						for (i = 0; i < a.length; i++) {
							a[i] = formatter(a[i]);
						}
						return a.join(",");
					}
					vals = v.match(_valuesExp) || [];
					i = vals.length;
					if (numVals > i--) {
						while (++i < numVals) {
							vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
						}
					}
					return pfx + vals.join(delim) + sfx;
				};
				return formatter;
			},

			/**
			 * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
			 * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
			 * @return {Function} a formatter function
			 */
			_getEdgeParser = function(props) {
				props = props.split(",");
				return function(t, e, p, cssp, pt, plugin, vars) {
					var a = (e + "").split(" "),
						i;
					vars = {};
					for (i = 0; i < 4; i++) {
						vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
					}
					return cssp.parse(t, vars, pt, plugin);
				};
			},

			// @private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
			_setPluginRatio = _internals._setPluginRatio = function(v) {
				this.plugin.setRatio(v);
				var d = this.data,
					proxy = d.proxy,
					mpt = d.firstMPT,
					min = 0.000001,
					val, pt, i, str, p;
				while (mpt) {
					val = proxy[mpt.v];
					if (mpt.r) {
						val = mpt.r(val);
					} else if (val < min && val > -min) {
						val = 0;
					}
					mpt.t[mpt.p] = val;
					mpt = mpt._next;
				}
				if (d.autoRotate) {
					d.autoRotate.rotation = d.mod ? d.mod.call(this._tween, proxy.rotation, this.t, this._tween) : proxy.rotation; //special case for ModifyPlugin to hook into an auto-rotating bezier
				}
				//at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method. Same for "b" at the beginning.
				if (v === 1 || v === 0) {
					mpt = d.firstMPT;
					p = (v === 1) ? "e" : "b";
					while (mpt) {
						pt = mpt.t;
						if (!pt.type) {
							pt[p] = pt.s + pt.xs0;
						} else if (pt.type === 1) {
							str = pt.xs0 + pt.s + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt[p] = str;
						}
						mpt = mpt._next;
					}
				}
			},

			/**
			 * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
			 * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
			 * @param {!string} p property name
			 * @param {(number|string|object)} v value
			 * @param {MiniPropTween=} next next MiniPropTween in the linked list
			 * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
			 */
			MiniPropTween = function(t, p, v, next, r) {
				this.t = t;
				this.p = p;
				this.v = v;
				this.r = r;
				if (next) {
					next._prev = this;
					this._next = next;
				}
			},

			/**
			 * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
			 * This method returns an object that has the following properties:
			 *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
			 *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
			 *  - firstMPT: the first MiniPropTween in the linked list
			 *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
			 * @param {!Object} t target object to be tweened
			 * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
			 * @param {!CSSPlugin} cssp The CSSPlugin instance
			 * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
			 * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
			 * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
			 * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
			 */
			_parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
				var bpt = pt,
					start = {},
					end = {},
					transform = cssp._transform,
					oldForce = _forcePT,
					i, p, xp, mpt, firstPT;
				cssp._transform = null;
				_forcePT = vars;
				pt = firstPT = cssp.parse(t, vars, pt, plugin);
				_forcePT = oldForce;
				//break off from the linked list so the new ones are isolated.
				if (shallow) {
					cssp._transform = transform;
					if (bpt) {
						bpt._prev = null;
						if (bpt._prev) {
							bpt._prev._next = null;
						}
					}
				}
				while (pt && pt !== bpt) {
					if (pt.type <= 1) {
						p = pt.p;
						end[p] = pt.s + pt.c;
						start[p] = pt.s;
						if (!shallow) {
							mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
							pt.c = 0;
						}
						if (pt.type === 1) {
							i = pt.l;
							while (--i > 0) {
								xp = "xn" + i;
								p = pt.p + "_" + xp;
								end[p] = pt.data[xp];
								start[p] = pt[xp];
								if (!shallow) {
									mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
								}
							}
						}
					}
					pt = pt._next;
				}
				return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
			},



			/**
			 * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
			 * CSSPropTweens have the following optional properties as well (not defined through the constructor):
			 *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
			 *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
			 *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
			 *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
			 *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
			 * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
			 * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
			 * @param {number} s Starting numeric value
			 * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
			 * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
			 * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
			 * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
			 * @param {boolean=} r If true, the value(s) should be rounded
			 * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
			 * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
			 * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
			 */
			CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
				this.t = t; //target
				this.p = p; //property
				this.s = s; //starting value
				this.c = c; //change value
				this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
				if (!(t instanceof CSSPropTween)) {
					_overwriteProps.push(this.n);
				}
				this.r = !r ? r : (typeof(r) === "function") ? r : Math.round; //round (boolean)
				this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
				if (pr) {
					this.pr = pr;
					_hasPriority = true;
				}
				this.b = (b === undefined) ? s : b;
				this.e = (e === undefined) ? s + c : e;
				if (next) {
					this._next = next;
					next._prev = this;
				}
			},

			_addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) { //cleans up some code redundancies and helps minification. Just a fast way to add a NUMERIC non-tweening CSSPropTween
				var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
				pt.b = start;
				pt.e = pt.xs0 = end;
				return pt;
			},

			/**
			 * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
			 * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
			 * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
			 * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
			 *
			 * @param {!Object} t Target whose property will be tweened
			 * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
			 * @param {string} b Beginning value
			 * @param {string} e Ending value
			 * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
			 * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
			 * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
			 * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
			 * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
			 * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
			 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
			 */
			_parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
				//DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
				b = b || dflt || "";
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
				e += ""; //ensures it's a string
				if (clrs && _colorExp.test(e + b)) { //if colors are found, normalize the formatting to rgba() or hsla().
					e = [b, e];
					CSSPlugin.colorStringFilter(e);
					b = e[0];
					e = e[1];
				}
				var ba = b.split(", ").join(",").split(" "), //beginning array
					ea = e.split(", ").join(",").split(" "), //ending array
					l = ba.length,
					autoRound = (_autoRound !== false),
					i, xi, ni, bv, ev, bnums, enums, bn, hasAlpha, temp, cv, str, useHSL;
				if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
					if ((e + b).indexOf("rgb") !== -1 || (e + b).indexOf("hsl") !== -1) { //keep rgb(), rgba(), hsl(), and hsla() values together! (remember, we're splitting on spaces)
						ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
						ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					} else {
						ba = ba.join(" ").split(",").join(", ").split(" ");
						ea = ea.join(" ").split(",").join(", ").split(" ");
					}
					l = ba.length;
				}
				if (l !== ea.length) {
					//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
					ba = (dflt || "").split(" ");
					l = ba.length;
				}
				pt.plugin = plugin;
				pt.setRatio = setRatio;
				_colorExp.lastIndex = 0;
				for (i = 0; i < l; i++) {
					bv = ba[i];
					ev = ea[i] + "";
					bn = parseFloat(bv);
					//if the value begins with a number (most common). It's fine if it has a suffix like px
					if (bn || bn === 0) {
						pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1) ? Math.round : false, true);

					//if the value is a color
					} else if (clrs && _colorExp.test(bv)) {
						str = ev.indexOf(")") + 1;
						str = ")" + (str ? ev.substr(str) : ""); //if there's a comma or ) at the end, retain it.
						useHSL = (ev.indexOf("hsl") !== -1 && _supportsOpacity);
						temp = ev; //original string value so we can look for any prefix later.
						bv = _parseColor(bv, useHSL);
						ev = _parseColor(ev, useHSL);
						hasAlpha = (bv.length + ev.length > 6);
						if (hasAlpha && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
							pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
							pt.e = pt.e.split(ea[i]).join("transparent");
						} else {
							if (!_supportsOpacity) { //old versions of IE don't support rgba().
								hasAlpha = false;
							}
							if (useHSL) {
								pt.appendXtra(temp.substr(0, temp.indexOf("hsl")) + (hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true)
									.appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false)
									.appendXtra("", bv[2], _parseChange(ev[2], bv[2]), (hasAlpha ? "%," : "%" + str), false);
							} else {
								pt.appendXtra(temp.substr(0, temp.indexOf("rgb")) + (hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", Math.round, true)
									.appendXtra("", bv[1], ev[1] - bv[1], ",", Math.round)
									.appendXtra("", bv[2], ev[2] - bv[2], (hasAlpha ? "," : str), Math.round);
							}

							if (hasAlpha) {
								bv = (bv.length < 4) ? 1 : bv[3];
								pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
							}
						}
						_colorExp.lastIndex = 0; //otherwise the test() on the RegExp could move the lastIndex and taint future results.

					} else {
						bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array

						//if no number is found, treat it as a non-tweening value and just append the string to the current xs.
						if (!bnums) {
							pt["xs" + pt.l] += (pt.l || pt["xs" + pt.l]) ? " " + ev : ev;

						//loop through all the numbers that are found and construct the extra values on the pt.
						} else {
							enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
							if (!enums || enums.length !== bnums.length) {
								//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
								return pt;
							}
							ni = 0;
							for (xi = 0; xi < bnums.length; xi++) {
								cv = bnums[xi];
								temp = bv.indexOf(cv, ni);
								pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px") ? Math.round : false, (xi === 0));
								ni = temp + cv.length;
							}
							pt["xs" + pt.l] += bv.substr(ni);
						}
					}
				}
				//if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
				if (e.indexOf("=") !== -1) if (pt.data) {
					str = pt.xs0 + pt.data.s;
					for (i = 1; i < pt.l; i++) {
						str += pt["xs" + i] + pt.data["xn" + i];
					}
					pt.e = str + pt["xs" + i];
				}
				if (!pt.l) {
					pt.type = -1;
					pt.xs0 = pt.e;
				}
				return pt.xfirst || pt;
			},
			i = 9;


		p = CSSPropTween.prototype;
		p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
		while (--i > 0) {
			p["xn" + i] = 0;
			p["xs" + i] = "";
		}
		p.xs0 = "";
		p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;


		/**
		 * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
		 * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
		 * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
		 * @param {string=} pfx Prefix (if any)
		 * @param {!number} s Starting value
		 * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
		 * @param {string=} sfx Suffix (if any)
		 * @param {boolean=} r Round (if true).
		 * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
		 * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
		 */
		p.appendXtra = function(pfx, s, c, sfx, r, pad) {
			var pt = this,
				l = pt.l;
			pt["xs" + l] += (pad && (l || pt["xs" + l])) ? " " + pfx : pfx || "";
			if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
				pt["xs" + l] += s + (sfx || "");
				return pt;
			}
			pt.l++;
			pt.type = pt.setRatio ? 2 : 1;
			pt["xs" + pt.l] = sfx || "";
			if (l > 0) {
				pt.data["xn" + l] = s + c;
				pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
				pt["xn" + l] = s;
				if (!pt.plugin) {
					pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
					pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
				}
				return pt;
			}
			pt.data = {s:s + c};
			pt.rxp = {};
			pt.s = s;
			pt.c = c;
			pt.r = r;
			return pt;
		};

		/**
		 * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
		 * @param {!string} p Property name (like "boxShadow" or "throwProps")
		 * @param {Object=} options An object containing any of the following configuration options:
		 *                      - defaultValue: the default value
		 *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
		 *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
		 *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
		 *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
		 *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
		 *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
		 *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
		 *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
		 */
		var SpecialProp = function(p, options) {
				options = options || {};
				this.p = options.prefix ? _checkPropPrefix(p) || p : p;
				_specialProps[p] = _specialProps[this.p] = this;
				this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
				if (options.parser) {
					this.parse = options.parser;
				}
				this.clrs = options.color;
				this.multi = options.multi;
				this.keyword = options.keyword;
				this.dflt = options.defaultValue;
				this.pr = options.priority || 0;
			},

			//shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
			_registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
				if (typeof(options) !== "object") {
					options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
				}
				var a = p.split(","),
					d = options.defaultValue,
					i, temp;
				defaults = defaults || [d];
				for (i = 0; i < a.length; i++) {
					options.prefix = (i === 0 && options.prefix);
					options.defaultValue = defaults[i] || d;
					temp = new SpecialProp(a[i], options);
				}
			},

			//creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
			_registerPluginProp = _internals._registerPluginProp = function(p) {
				if (!_specialProps[p]) {
					var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
					_registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
						var pluginClass = _globals.com.greensock.plugins[pluginName];
						if (!pluginClass) {
							_log("Error: " + pluginName + " js file not loaded.");
							return pt;
						}
						pluginClass._cssRegister();
						return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
					}});
				}
			};


		p = SpecialProp.prototype;

		/**
		 * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
		 * @param {!Object} t target element
		 * @param {(string|number|object)} b beginning value
		 * @param {(string|number|object)} e ending (destination) value
		 * @param {CSSPropTween=} pt next CSSPropTween in the linked list
		 * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
		 * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
		 * @return {CSSPropTween=} First CSSPropTween in the linked list
		 */
		p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
			var kwd = this.keyword,
				i, ba, ea, l, bi, ei;
			//if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
			if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
				ba = b.replace(_commasOutsideParenExp, "|").split("|");
				ea = e.replace(_commasOutsideParenExp, "|").split("|");
			} else if (kwd) {
				ba = [b];
				ea = [e];
			}
			if (ea) {
				l = (ea.length > ba.length) ? ea.length : ba.length;
				for (i = 0; i < l; i++) {
					b = ba[i] = ba[i] || this.dflt;
					e = ea[i] = ea[i] || this.dflt;
					if (kwd) {
						bi = b.indexOf(kwd);
						ei = e.indexOf(kwd);
						if (bi !== ei) {
							if (ei === -1) { //if the keyword isn't in the end value, remove it from the beginning one.
								ba[i] = ba[i].split(kwd).join("");
							} else if (bi === -1) { //if the keyword isn't in the beginning, add it.
								ba[i] += " " + kwd;
							}
						}
					}
				}
				b = ba.join(", ");
				e = ea.join(", ");
			}
			return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
		};

		/**
		 * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
		 * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
		 * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
		 * @param {!Object} t Target object whose property is being tweened
		 * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
		 * @param {!string} p Property name
		 * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
		 * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
		 * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
		 * @param {Object=} vars Original vars object that contains the data for parsing.
		 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
		 */
		p.parse = function(t, e, p, cssp, pt, plugin, vars) {
			return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
		};

		/**
		 * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
		 *  1) Target object whose property should be tweened (typically a DOM element)
		 *  2) The end/destination value (could be a string, number, object, or whatever you want)
		 *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
		 *
		 * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
		 *
		 * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
		 *      var start = target.style.width;
		 *      return function(ratio) {
		 *              target.style.width = (start + value * ratio) + "px";
		 *              console.log("set width to " + target.style.width);
		 *          }
		 * }, 0);
		 *
		 * Then, when I do this tween, it will trigger my special property:
		 *
		 * TweenLite.to(element, 1, {css:{myCustomProp:100}});
		 *
		 * In the example, of course, we're just changing the width, but you can do anything you want.
		 *
		 * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
		 * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
		 * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
		 */
		CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
			_registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
				var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
				rv.plugin = plugin;
				rv.setRatio = onInitTween(t, e, cssp._tween, p);
				return rv;
			}, priority:priority});
		};






		//transform-related methods and properties
		CSSPlugin.useSVGTransformAttr = true; //Safari and Firefox both have some rendering bugs when applying CSS transforms to SVG elements, so default to using the "transform" attribute instead (users can override this).
		var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent").split(","),
			_transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
			_transformPropCSS = _prefixCSS + "transform",
			_transformOriginProp = _checkPropPrefix("transformOrigin"),
			_supports3D = (_checkPropPrefix("perspective") !== null),
			Transform = _internals.Transform = function() {
				this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
				this.force3D = (CSSPlugin.defaultForce3D === false || !_supports3D) ? false : CSSPlugin.defaultForce3D || "auto";
			},
			_SVGElement = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"].SVGElement,
			_useSVGTransformAttr,
			//Some browsers (like Firefox and IE) don't honor transform-origin properly in SVG elements, so we need to manually adjust the matrix accordingly. We feature detect here rather than always doing the conversion for certain browsers because they may fix the problem at some point in the future.

			_createSVG = function(type, container, attributes) {
				var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
					reg = /([a-z])([A-Z])/g,
					p;
				for (p in attributes) {
					element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
				}
				container.appendChild(element);
				return element;
			},
			_docElement = _doc.documentElement || {},
			_forceSVGTransformAttr = (function() {
				//IE and Android stock don't support CSS transforms on SVG elements, so we must write them to the "transform" attribute. We populate this variable in the _parseTransform() method, and only if/when we come across an SVG element
				var force = _ieVers || (/Android/i.test(_agent) && !_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"].chrome),
					svg, rect, width;
				if (_doc.createElementNS && !force) { //IE8 and earlier doesn't support SVG anyway
					svg = _createSVG("svg", _docElement);
					rect = _createSVG("rect", svg, {width:100, height:50, x:100});
					width = rect.getBoundingClientRect().width;
					rect.style[_transformOriginProp] = "50% 50%";
					rect.style[_transformProp] = "scaleX(0.5)";
					force = (width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D)); //note: Firefox fails the test even though it does support CSS transforms in 3D. Since we can't push 3D stuff into the transform attribute, we force Firefox to pass the test here (as long as it does truly support 3D).
					_docElement.removeChild(svg);
				}
				return force;
			})(),
			_parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
				var tm = e._gsTransform,
					m = _getMatrix(e, true),
					v, x, y, xOrigin, yOrigin, a, b, c, d, tx, ty, determinant, xOriginOld, yOriginOld;
				if (tm) {
					xOriginOld = tm.xOrigin; //record the original values before we alter them.
					yOriginOld = tm.yOrigin;
				}
				if (!absolute || (v = absolute.split(" ")).length < 2) {
					b = e.getBBox();
					if (b.x === 0 && b.y === 0 && b.width + b.height === 0) { //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.
						b = {x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0, y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0, width:0, height:0};
					}
					local = _parsePosition(local).split(" ");
					v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x,
						 (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y];
				}
				decoratee.xOrigin = xOrigin = parseFloat(v[0]);
				decoratee.yOrigin = yOrigin = parseFloat(v[1]);
				if (absolute && m !== _identity2DMatrix) { //if svgOrigin is being set, we must invert the matrix and determine where the absolute point is, factoring in the current transforms. Otherwise, the svgOrigin would be based on the element's non-transformed position on the canvas.
					a = m[0];
					b = m[1];
					c = m[2];
					d = m[3];
					tx = m[4];
					ty = m[5];
					determinant = (a * d - b * c);
					if (determinant) { //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
						x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + ((c * ty - d * tx) / determinant);
						y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - ((a * ty - b * tx) / determinant);
						xOrigin = decoratee.xOrigin = v[0] = x;
						yOrigin = decoratee.yOrigin = v[1] = y;
					}
				}
				if (tm) { //avoid jump when transformOrigin is changed - adjust the x/y values accordingly
					if (skipRecord) {
						decoratee.xOffset = tm.xOffset;
						decoratee.yOffset = tm.yOffset;
						tm = decoratee;
					}
					if (smoothOrigin || (smoothOrigin !== false && CSSPlugin.defaultSmoothOrigin !== false)) {
						x = xOrigin - xOriginOld;
						y = yOrigin - yOriginOld;
						//originally, we simply adjusted the x and y values, but that would cause problems if, for example, you created a rotational tween part-way through an x/y tween. Managing the offset in a separate variable gives us ultimate flexibility.
						//tm.x -= x - (x * m[0] + y * m[2]);
						//tm.y -= y - (x * m[1] + y * m[3]);
						tm.xOffset += (x * m[0] + y * m[2]) - x;
						tm.yOffset += (x * m[1] + y * m[3]) - y;
					} else {
						tm.xOffset = tm.yOffset = 0;
					}
				}
				if (!skipRecord) {
					e.setAttribute("data-svg-origin", v.join(" "));
				}
			},
			_getBBoxHack = function(swapIfPossible) { //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
				var svg = _createElement("svg", (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"),
					oldParent = this.parentNode,
					oldSibling = this.nextSibling,
					oldCSS = this.style.cssText,
					bbox;
				_docElement.appendChild(svg);
				svg.appendChild(this);
				this.style.display = "block";
				if (swapIfPossible) {
					try {
						bbox = this.getBBox();
						this._originalGetBBox = this.getBBox;
						this.getBBox = _getBBoxHack;
					} catch (e) { }
				} else if (this._originalGetBBox) {
					bbox = this._originalGetBBox();
				}
				if (oldSibling) {
					oldParent.insertBefore(this, oldSibling);
				} else {
					oldParent.appendChild(this);
				}
				_docElement.removeChild(svg);
				this.style.cssText = oldCSS;
				return bbox;
			},
			_getBBox = function(e) {
				try {
					return e.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
				} catch (error) {
					return _getBBoxHack.call(e, true);
				}
			},
			_isSVG = function(e) { //reports if the element is an SVG on which getBBox() actually works
				return !!(_SVGElement && e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
			},
			_identity2DMatrix = [1,0,0,1,0,0],
			_getMatrix = function(e, force2D) {
				var tm = e._gsTransform || new Transform(),
					rnd = 100000,
					style = e.style,
					isDefault, s, m, n, dec, none;
				if (_transformProp) {
					s = _getStyle(e, _transformPropCSS, null, true);
				} else if (e.currentStyle) {
					//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
					s = e.currentStyle.filter.match(_ieGetMatrixExp);
					s = (s && s.length === 4) ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",") : "";
				}
				isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
				if (_transformProp && ((none = (!_getComputedStyle(e) || _getComputedStyle(e).display === "none")) || !e.parentNode)) { //note: Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
					if (none) { //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
						n = style.display;
						style.display = "block";
					}
					if (!e.parentNode) {
						dec = 1; //flag
						_docElement.appendChild(e);
					}
					s = _getStyle(e, _transformPropCSS, null, true);
					isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
					if (n) {
						style.display = n;
					} else if (none) {
						_removeProp(style, "display");
					}
					if (dec) {
						_docElement.removeChild(e);
					}
				}
				if (tm.svg || (e.getCTM && _isSVG(e))) {
					if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) { //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
						s = style[_transformProp];
						isDefault = 0;
					}
					m = e.getAttribute("transform");
					if (isDefault && m) {
						m = e.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.
						s = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
						isDefault = 0;
					}
				}
				if (isDefault) {
					return _identity2DMatrix;
				}
				//split the matrix values out into an array (m for matrix)
				m = (s || "").match(_numExp) || [];
				i = m.length;
				while (--i > -1) {
					n = Number(m[i]);
					m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
				}
				return (force2D && m.length > 6) ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
			},

			/**
			 * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
			 * @param {!Object} t target element
			 * @param {Object=} cs computed style object (optional)
			 * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
			 * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
			 * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
			 */
			_getTransform = _internals.getTransform = function(t, cs, rec, parse) {
				if (t._gsTransform && rec && !parse) {
					return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
				}
				var tm = rec ? t._gsTransform || new Transform() : new Transform(),
					invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
					min = 0.00002,
					rnd = 100000,
					zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
					defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
					m, i, scaleX, scaleY, rotation, skewX;

				tm.svg = !!(t.getCTM && _isSVG(t));
				if (tm.svg) {
					_parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));
					_useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
				}
				m = _getMatrix(t);
				if (m !== _identity2DMatrix) {

					if (m.length === 16) {
						//we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
						var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
							a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
							a13 = m[8], a23 = m[9], a33 = m[10],
							a14 = m[12], a24 = m[13], a34 = m[14],
							a43 = m[11],
							angle = Math.atan2(a32, a33),
							t1, t2, t3, t4, cos, sin;
						//we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
						if (tm.zOrigin) {
							a34 = -tm.zOrigin;
							a14 = a13*a34-m[12];
							a24 = a23*a34-m[13];
							a34 = a33*a34+tm.zOrigin-m[14];
						}
						//note for possible future consolidation: rotationX: Math.atan2(a32, a33), rotationY: Math.atan2(-a31, Math.sqrt(a33 * a33 + a32 * a32)), rotation: Math.atan2(a21, a11), skew: Math.atan2(a12, a22). However, it doesn't seem to be quite as reliable as the full-on backwards rotation procedure.
						tm.rotationX = angle * _RAD2DEG;
						//rotationX
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a12*cos+a13*sin;
							t2 = a22*cos+a23*sin;
							t3 = a32*cos+a33*sin;
							a13 = a12*-sin+a13*cos;
							a23 = a22*-sin+a23*cos;
							a33 = a32*-sin+a33*cos;
							a43 = a42*-sin+a43*cos;
							a12 = t1;
							a22 = t2;
							a32 = t3;
						}
						//rotationY
						angle = Math.atan2(-a31, a33);
						tm.rotationY = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a11*cos-a13*sin;
							t2 = a21*cos-a23*sin;
							t3 = a31*cos-a33*sin;
							a23 = a21*sin+a23*cos;
							a33 = a31*sin+a33*cos;
							a43 = a41*sin+a43*cos;
							a11 = t1;
							a21 = t2;
							a31 = t3;
						}
						//rotationZ
						angle = Math.atan2(a21, a11);
						tm.rotation = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(angle);
							sin = Math.sin(angle);
							t1 = a11*cos+a21*sin;
							t2 = a12*cos+a22*sin;
							t3 = a13*cos+a23*sin;
							a21 = a21*cos-a11*sin;
							a22 = a22*cos-a12*sin;
							a23 = a23*cos-a13*sin;
							a11 = t1;
							a12 = t2;
							a13 = t3;
						}

						if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) { //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
							tm.rotationX = tm.rotation = 0;
							tm.rotationY = 180 - tm.rotationY;
						}

						//skewX
						angle = Math.atan2(a12, a22);

						//scales
						tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21 + a31 * a31) * rnd + 0.5) | 0) / rnd;
						tm.scaleY = ((Math.sqrt(a22 * a22 + a32 * a32) * rnd + 0.5) | 0) / rnd;
						tm.scaleZ = ((Math.sqrt(a13 * a13 + a23 * a23 + a33 * a33) * rnd + 0.5) | 0) / rnd;
						a11 /= tm.scaleX;
						a12 /= tm.scaleY;
						a21 /= tm.scaleX;
						a22 /= tm.scaleY;
						if (Math.abs(angle) > min) {
							tm.skewX = angle * _RAD2DEG;
							a12 = 0; //unskews
							if (tm.skewType !== "simple") {
								tm.scaleY *= 1 / Math.cos(angle); //by default, we compensate the scale based on the skew so that the element maintains a similar proportion when skewed, so we have to alter the scaleY here accordingly to match the default (non-adjusted) skewing that CSS does (stretching more and more as it skews).
							}

						} else {
							tm.skewX = 0;
						}

						/* //for testing purposes
						var transform = "matrix3d(",
							comma = ",",
							zero = "0";
						a13 /= tm.scaleZ;
						a23 /= tm.scaleZ;
						a31 /= tm.scaleX;
						a32 /= tm.scaleY;
						a33 /= tm.scaleZ;
						transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
						transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
						transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
						transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
						transform += a14 + comma + a24 + comma + a34 + comma + (tm.perspective ? (1 + (-a34 / tm.perspective)) : 1) + ")";
						console.log(transform);
						document.querySelector(".test").style[_transformProp] = transform;
						*/

						tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
						tm.x = a14;
						tm.y = a24;
						tm.z = a34;
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
							tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
						}

					} else if ((!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY))) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
						var k = (m.length >= 6),
							a = k ? m[0] : 1,
							b = m[1] || 0,
							c = m[2] || 0,
							d = k ? m[3] : 1;
						tm.x = m[4] || 0;
						tm.y = m[5] || 0;
						scaleX = Math.sqrt(a * a + b * b);
						scaleY = Math.sqrt(d * d + c * c);
						rotation = (a || b) ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
						skewX = (c || d) ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
						tm.scaleX = scaleX;
						tm.scaleY = scaleY;
						tm.rotation = rotation;
						tm.skewX = skewX;
						if (_supports3D) {
							tm.rotationX = tm.rotationY = tm.z = 0;
							tm.perspective = defaultTransformPerspective;
							tm.scaleZ = 1;
						}
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
							tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
						}
					}
					if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
						if (invX) {
							tm.scaleX *= -1;
							tm.skewX += (tm.rotation <= 0) ? 180 : -180;
							tm.rotation += (tm.rotation <= 0) ? 180 : -180;
						} else {
							tm.scaleY *= -1;
							tm.skewX += (tm.skewX <= 0) ? 180 : -180;
						}
					}
					tm.zOrigin = zOrigin;
					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
					for (i in tm) {
						if (tm[i] < min) if (tm[i] > -min) {
							tm[i] = 0;
						}
					}
				}
				//DEBUG: _log("parsed rotation of " + t.getAttribute("id")+": "+(tm.rotationX)+", "+(tm.rotationY)+", "+(tm.rotation)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective+ ", origin: "+ tm.xOrigin+ ","+ tm.yOrigin);
				if (rec) {
					t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
					if (tm.svg) { //if we're supposed to apply transforms to the SVG element's "transform" attribute, make sure there aren't any CSS transforms applied or they'll override the attribute ones. Also clear the transform attribute if we're using CSS, just to be clean.
						if (_useSVGTransformAttr && t.style[_transformProp]) {
							_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].delayedCall(0.001, function(){ //if we apply this right away (before anything has rendered), we risk there being no transforms for a brief moment and it also interferes with adjusting the transformOrigin in a tween with immediateRender:true (it'd try reading the matrix and it wouldn't have the appropriate data in place because we just removed it).
								_removeProp(t.style, _transformProp);
							});
						} else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
							_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].delayedCall(0.001, function(){
								t.removeAttribute("transform");
							});
						}
					}
				}
				return tm;
			},

			//for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
			_setIETransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					ang = -t.rotation * _DEG2RAD,
					skew = ang + t.skewX * _DEG2RAD,
					rnd = 100000,
					a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
					b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
					c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
					d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
					style = this.t.style,
					cs = this.t.currentStyle,
					filters, val;
				if (!cs) {
					return;
				}
				val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
				b = -c;
				c = -val;
				filters = cs.filter;
				style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
				var w = this.t.offsetWidth,
					h = this.t.offsetHeight,
					clip = (cs.position !== "absolute"),
					m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
					ox = t.x + (w * t.xPercent / 100),
					oy = t.y + (h * t.yPercent / 100),
					dx, dy;

				//if transformOrigin is being used, adjust the offset x and y
				if (t.ox != null) {
					dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
					dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
					ox += dx - (dx * a + dy * b);
					oy += dy - (dx * c + dy * d);
				}

				if (!clip) {
					m += ", sizingMethod='auto expand')";
				} else {
					dx = (w / 2);
					dy = (h / 2);
					//translate to ensure that transformations occur around the correct origin (default is center).
					m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
				}
				if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
					style.filter = filters.replace(_ieSetMatrixExp, m);
				} else {
					style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
				}

				//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
				if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf( true && filters.indexOf("Alpha")) === -1) {
					style.removeAttribute("filter");
				}

				//we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).
				if (!clip) {
					var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
						marg, prop, dif;
					dx = t.ieOffsetX || 0;
					dy = t.ieOffsetY || 0;
					t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
					t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
					for (i = 0; i < 4; i++) {
						prop = _margins[i];
						marg = cs[prop];
						//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
						val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
						if (val !== t[prop]) {
							dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
						} else {
							dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
						}
						style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
					}
				}
			},

			/* translates a super small decimal to a string WITHOUT scientific notation
			_safeDecimal = function(n) {
				var s = (n < 0 ? -n : n) + "",
					a = s.split("e-");
				return (n < 0 ? "-0." : "0.") + new Array(parseInt(a[1], 10) || 0).join("0") + a[0].split(".").join("");
			},
			*/

			_setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					style = this.t.style,
					angle = t.rotation,
					rotationX = t.rotationX,
					rotationY = t.rotationY,
					sx = t.scaleX,
					sy = t.scaleY,
					sz = t.scaleZ,
					x = t.x,
					y = t.y,
					z = t.z,
					isSVG = t.svg,
					perspective = t.perspective,
					force3D = t.force3D,
					skewY = t.skewY,
					skewX = t.skewX,
					t1,	a11, a12, a13, a21, a22, a23, a31, a32, a33, a41, a42, a43,
					zOrigin, min, cos, sin, t2, transform, comma, zero, skew, rnd;
				if (skewY) { //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
					skewX += skewY;
					angle += skewY;
				}

				//check to see if we should render as 2D (and SVGs must use 2D when _useSVGTransformAttr is true)
				if (((((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime)) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1) || (_useSVGTransformAttr && isSVG) || !_supports3D) { //on the final render (which could be 0 for a from tween), if there are no 3D aspects, render in 2D to free up memory and improve performance especially on mobile devices. Check the tween's totalTime/totalDuration too in order to make sure it doesn't happen between repeats if it's a repeating tween.

					//2D
					if (angle || skewX || isSVG) {
						angle *= _DEG2RAD;
						skew = skewX * _DEG2RAD;
						rnd = 100000;
						a11 = Math.cos(angle) * sx;
						a21 = Math.sin(angle) * sx;
						a12 = Math.sin(angle - skew) * -sy;
						a22 = Math.cos(angle - skew) * sy;
						if (skew && t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan(skew - skewY * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							a12 *= t1;
							a22 *= t1;
							if (skewY) {
								t1 = Math.tan(skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
						if (isSVG) {
							x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
							y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
							if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) { //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the matrix to simulate it.
								min = this.t.getBBox();
								x += t.xPercent * 0.01 * min.width;
								y += t.yPercent * 0.01 * min.height;
							}
							min = 0.000001;
							if (x < min) if (x > -min) {
								x = 0;
							}
							if (y < min) if (y > -min) {
								y = 0;
							}
						}
						transform = (((a11 * rnd) | 0) / rnd) + "," + (((a21 * rnd) | 0) / rnd) + "," + (((a12 * rnd) | 0) / rnd) + "," + (((a22 * rnd) | 0) / rnd) + "," + x + "," + y + ")";
						if (isSVG && _useSVGTransformAttr) {
							this.t.setAttribute("transform", "matrix(" + transform);
						} else {
							//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
							style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
						}
					} else {
						style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
					}
					return;

				}
				if (_isFirefox) { //Firefox has a bug (at least in v25) that causes it to render the transparent part of 32-bit PNG images as black when displayed inside an iframe and the 3D scale is very small and doesn't change sufficiently enough between renders (like if you use a Power4.easeInOut to scale from 0 to 1 where the beginning values only change a tiny amount to begin the tween before accelerating). In this case, we force the scale to be 0.00002 instead which is visually the same but works around the Firefox issue.
					min = 0.0001;
					if (sx < min && sx > -min) {
						sx = sz = 0.00002;
					}
					if (sy < min && sy > -min) {
						sy = sz = 0.00002;
					}
					if (perspective && !t.z && !t.rotationX && !t.rotationY) { //Firefox has a bug that causes elements to have an odd super-thin, broken/dotted black border on elements that have a perspective set but aren't utilizing 3D space (no rotationX, rotationY, or z).
						perspective = 0;
					}
				}
				if (angle || skewX) {
					angle *= _DEG2RAD;
					cos = a11 = Math.cos(angle);
					sin = a21 = Math.sin(angle);
					if (skewX) {
						angle -= skewX * _DEG2RAD;
						cos = Math.cos(angle);
						sin = Math.sin(angle);
						if (t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan((skewX - skewY) * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							cos *= t1;
							sin *= t1;
							if (t.skewY) {
								t1 = Math.tan(skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
					}
					a12 = -sin;
					a22 = cos;

				} else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) { //if we're only translating and/or 2D scaling, this is faster...
					style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z +"px)" + ((sx !== 1 || sy !== 1) ? " scale(" + sx + "," + sy + ")" : "");
					return;
				} else {
					a11 = a22 = 1;
					a12 = a21 = 0;
				}
				// KEY  INDEX   AFFECTS a[row][column]
				// a11  0       rotation, rotationY, scaleX
				// a21  1       rotation, rotationY, scaleX
				// a31  2       rotationY, scaleX
				// a41  3       rotationY, scaleX
				// a12  4       rotation, skewX, rotationX, scaleY
				// a22  5       rotation, skewX, rotationX, scaleY
				// a32  6       rotationX, scaleY
				// a42  7       rotationX, scaleY
				// a13  8       rotationY, rotationX, scaleZ
				// a23  9       rotationY, rotationX, scaleZ
				// a33  10      rotationY, rotationX, scaleZ
				// a43  11      rotationY, rotationX, perspective, scaleZ
				// a14  12      x, zOrigin, svgOrigin
				// a24  13      y, zOrigin, svgOrigin
				// a34  14      z, zOrigin
				// a44  15
				// rotation: Math.atan2(a21, a11)
				// rotationY: Math.atan2(a13, a33) (or Math.atan2(a13, a11))
				// rotationX: Math.atan2(a32, a33)
				a33 = 1;
				a13 = a23 = a31 = a32 = a41 = a42 = 0;
				a43 = (perspective) ? -1 / perspective : 0;
				zOrigin = t.zOrigin;
				min = 0.000001; //threshold below which browsers use scientific notation which won't work.
				comma = ",";
				zero = "0";
				angle = rotationY * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					a31 = -sin;
					a41 = a43*-sin;
					a13 = a11*sin;
					a23 = a21*sin;
					a33 = cos;
					a43 *= cos;
					a11 *= cos;
					a21 *= cos;
				}
				angle = rotationX * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a12*cos+a13*sin;
					t2 = a22*cos+a23*sin;
					a32 = a33*sin;
					a42 = a43*sin;
					a13 = a12*-sin+a13*cos;
					a23 = a22*-sin+a23*cos;
					a33 = a33*cos;
					a43 = a43*cos;
					a12 = t1;
					a22 = t2;
				}
				if (sz !== 1) {
					a13*=sz;
					a23*=sz;
					a33*=sz;
					a43*=sz;
				}
				if (sy !== 1) {
					a12*=sy;
					a22*=sy;
					a32*=sy;
					a42*=sy;
				}
				if (sx !== 1) {
					a11*=sx;
					a21*=sx;
					a31*=sx;
					a41*=sx;
				}

				if (zOrigin || isSVG) {
					if (zOrigin) {
						x += a13*-zOrigin;
						y += a23*-zOrigin;
						z += a33*-zOrigin+zOrigin;
					}
					if (isSVG) { //due to bugs in some browsers, we need to manage the transform-origin of SVG manually
						x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
						y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
					}
					if (x < min && x > -min) {
						x = zero;
					}
					if (y < min && y > -min) {
						y = zero;
					}
					if (z < min && z > -min) {
						z = 0; //don't use string because we calculate perspective later and need the number.
					}
				}

				//optimized way of concatenating all the values into a string. If we do it all in one shot, it's slower because of the way browsers have to create temp strings and the way it affects memory. If we do it piece-by-piece with +=, it's a bit slower too. We found that doing it in these sized chunks works best overall:
				transform = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(");
				transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
				transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
				if (rotationX || rotationY || sz !== 1) { //performance optimization (often there's no rotationX or rotationY, so we can skip these calculations)
					transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
					transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
				} else {
					transform += ",0,0,0,0,1,0,";
				}
				transform += x + comma + y + comma + z + comma + (perspective ? (1 + (-z / perspective)) : 1) + ")";

				style[_transformProp] = transform;
			};

		p = Transform.prototype;
		p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
		p.scaleX = p.scaleY = p.scaleZ = 1;

		_registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {parser:function(t, e, parsingProp, cssp, pt, plugin, vars) {
			if (cssp._lastParsedTransform === vars) { return pt; } //only need to parse the transform once, and only if the browser supports it.
			cssp._lastParsedTransform = vars;
			var scaleFunc = (vars.scale && typeof(vars.scale) === "function") ? vars.scale : 0, //if there's a function-based "scale" value, swap in the resulting numeric value temporarily. Otherwise, if it's called for both scaleX and scaleY independently, they may not match (like if the function uses Math.random()).
				swapFunc;
			if (typeof(vars[parsingProp]) === "function") { //whatever property triggers the initial parsing might be a function-based value in which case it already got called in parse(), thus we don't want to call it again in here. The most efficient way to avoid this is to temporarily swap the value directly into the vars object, and then after we do all our parsing in this function, we'll swap it back again.
				swapFunc = vars[parsingProp];
				vars[parsingProp] = e;
			}
			if (scaleFunc) {
				vars.scale = scaleFunc(_index, t);
			}
			var originalGSTransform = t._gsTransform,
				style = t.style,
				min = 0.000001,
				i = _transformProps.length,
				v = vars,
				endRotations = {},
				transformOriginString = "transformOrigin",
				m1 = _getTransform(t, _cs, true, v.parseTransform),
				orig = v.transform && ((typeof(v.transform) === "function") ? v.transform(_index, _target) : v.transform),
				m2, copy, has3D, hasChange, dr, x, y, matrix, p;
			m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;
			cssp._transform = m1;
			if ("rotationZ" in v) {
				v.rotation = v.rotationZ;
			}
			if (orig && typeof(orig) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
				copy = _tempDiv.style; //don't use the original target because it might be SVG in which case some browsers don't report computed style correctly.
				copy[_transformProp] = orig;
				copy.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
				copy.position = "absolute";
				if (orig.indexOf("%") !== -1) { //%-based translations will fail unless we set the width/height to match the original target...
					copy.width = _getStyle(t, "width");
					copy.height = _getStyle(t, "height");
				}
				_doc.body.appendChild(_tempDiv);
				m2 = _getTransform(_tempDiv, null, false);
				if (m1.skewType === "simple") { //the default _getTransform() reports the skewX/scaleY as if skewType is "compensated", thus we need to adjust that here if skewType is "simple".
					m2.scaleY *= Math.cos(m2.skewX * _DEG2RAD);
				}
				if (m1.svg) { //if it's an SVG element, x/y part of the matrix will be affected by whatever we use as the origin and the offsets, so compensate here...
					x = m1.xOrigin;
					y = m1.yOrigin;
					m2.x -= m1.xOffset;
					m2.y -= m1.yOffset;
					if (v.transformOrigin || v.svgOrigin) { //if this tween is altering the origin, we must factor that in here. The actual work of recording the transformOrigin values and setting up the PropTween is done later (still inside this function) so we cannot leave the changes intact here - we only want to update the x/y accordingly.
						orig = {};
						_parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);
						x = orig.xOrigin;
						y = orig.yOrigin;
						m2.x -= orig.xOffset - m1.xOffset;
						m2.y -= orig.yOffset - m1.yOffset;
					}
					if (x || y) {
						matrix = _getMatrix(_tempDiv, true);
						m2.x -= x - (x * matrix[0] + y * matrix[2]);
						m2.y -= y - (x * matrix[1] + y * matrix[3]);
					}
				}
				_doc.body.removeChild(_tempDiv);
				if (!m2.perspective) {
					m2.perspective = m1.perspective; //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
				}
				if (v.xPercent != null) {
					m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
				}
				if (v.yPercent != null) {
					m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
				}
			} else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
				m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
					scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
					scaleZ:_parseVal(v.scaleZ, m1.scaleZ),
					x:_parseVal(v.x, m1.x),
					y:_parseVal(v.y, m1.y),
					z:_parseVal(v.z, m1.z),
					xPercent:_parseVal(v.xPercent, m1.xPercent),
					yPercent:_parseVal(v.yPercent, m1.yPercent),
					perspective:_parseVal(v.transformPerspective, m1.perspective)};
				dr = v.directionalRotation;
				if (dr != null) {
					if (typeof(dr) === "object") {
						for (copy in dr) {
							v[copy] = dr[copy];
						}
					} else {
						v.rotation = dr;
					}
				}
				if (typeof(v.x) === "string" && v.x.indexOf("%") !== -1) {
					m2.x = 0;
					m2.xPercent = _parseVal(v.x, m1.xPercent);
				}
				if (typeof(v.y) === "string" && v.y.indexOf("%") !== -1) {
					m2.y = 0;
					m2.yPercent = _parseVal(v.y, m1.yPercent);
				}

				m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : m1.rotation, m1.rotation, "rotation", endRotations);
				if (_supports3D) {
					m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
					m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
				}
				m2.skewX = _parseAngle(v.skewX, m1.skewX);
				m2.skewY = _parseAngle(v.skewY, m1.skewY);
			}
			if (_supports3D && v.force3D != null) {
				m1.force3D = v.force3D;
				hasChange = true;
			}

			has3D = (m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
			if (!has3D && v.scale != null) {
				m2.scaleZ = 1; //no need to tween scaleZ.
			}

			while (--i > -1) {
				p = _transformProps[i];
				orig = m2[p] - m1[p];
				if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
					hasChange = true;
					pt = new CSSPropTween(m1, p, m1[p], orig, pt);
					if (p in endRotations) {
						pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
					}
					pt.xs0 = 0; //ensures the value stays numeric in setRatio()
					pt.plugin = plugin;
					cssp._overwriteProps.push(pt.n);
				}
			}

			orig = v.transformOrigin;
			if (m1.svg && (orig || v.svgOrigin)) {
				x = m1.xOffset; //when we change the origin, in order to prevent things from jumping we adjust the x/y so we must record those here so that we can create PropTweens for them and flip them at the same time as the origin
				y = m1.yOffset;
				_parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);
				pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString); //note: if there wasn't a transformOrigin defined yet, just start with the destination one; it's wasteful otherwise, and it causes problems with fromTo() tweens. For example, TweenLite.to("#wheel", 3, {rotation:180, transformOrigin:"50% 50%", delay:1}); TweenLite.fromTo("#wheel", 3, {scale:0.5, transformOrigin:"50% 50%"}, {scale:1, delay:2}); would cause a jump when the from values revert at the beginning of the 2nd tween.
				pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);
				if (x !== m1.xOffset || y !== m1.yOffset) {
					pt = _addNonTweeningNumericPT(m1, "xOffset", (originalGSTransform ? x : m1.xOffset), m1.xOffset, pt, transformOriginString);
					pt = _addNonTweeningNumericPT(m1, "yOffset", (originalGSTransform ? y : m1.yOffset), m1.yOffset, pt, transformOriginString);
				}
				orig = "0px 0px"; //certain browsers (like firefox) completely botch transform-origin, so we must remove it to prevent it from contaminating transforms. We manage it ourselves with xOrigin and yOrigin
			}
			if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
				if (_transformProp) {
					hasChange = true;
					p = _transformOriginProp;
					orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors
					pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
					pt.b = style[p];
					pt.plugin = plugin;
					if (_supports3D) {
						copy = m1.zOrigin;
						orig = orig.split(" ");
						m1.zOrigin = ((orig.length > 2 && !(copy !== 0 && orig[2] === "0px")) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
						pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
						pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
						pt.b = copy;
						pt.xs0 = pt.e = m1.zOrigin;
					} else {
						pt.xs0 = pt.e = orig;
					}

					//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
				} else {
					_parsePosition(orig + "", m1);
				}
			}
			if (hasChange) {
				cssp._transformType = (!(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3)) ? 3 : 2; //quicker than calling cssp._enableTransforms();
			}
			if (swapFunc) {
				vars[parsingProp] = swapFunc;
			}
			if (scaleFunc) {
				vars.scale = scaleFunc;
			}
			return pt;
		}, prefix:true});

		_registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});

		_registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			e = this.format(e);
			var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
				style = t.style,
				ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
			w = parseFloat(t.offsetWidth);
			h = parseFloat(t.offsetHeight);
			ea1 = e.split(" ");
			for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
				if (this.p.indexOf("border")) { //older browsers used a prefix
					props[i] = _checkPropPrefix(props[i]);
				}
				bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
				if (bs.indexOf(" ") !== -1) {
					bs2 = bs.split(" ");
					bs = bs2[0];
					bs2 = bs2[1];
				}
				es = es2 = ea1[i];
				bn = parseFloat(bs);
				bsfx = bs.substr((bn + "").length);
				rel = (es.charAt(1) === "=");
				if (rel) {
					en = parseInt(es.charAt(0)+"1", 10);
					es = es.substr(2);
					en *= parseFloat(es);
					esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
				} else {
					en = parseFloat(es);
					esfx = es.substr((en + "").length);
				}
				if (esfx === "") {
					esfx = _suffixMap[p] || bsfx;
				}
				if (esfx !== bsfx) {
					hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
					vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
					if (esfx === "%") {
						bs = (hn / w * 100) + "%";
						bs2 = (vn / h * 100) + "%";
					} else if (esfx === "em") {
						em = _convertToPixels(t, "borderLeft", 1, "em");
						bs = (hn / em) + "em";
						bs2 = (vn / em) + "em";
					} else {
						bs = hn + "px";
						bs2 = vn + "px";
					}
					if (rel) {
						es = (parseFloat(bs) + en) + esfx;
						es2 = (parseFloat(bs2) + en) + esfx;
					}
				}
				pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
			}
			return pt;
		}, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
		_registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
		}, prefix:true, formatter:_getFormatter("0px 0px", false, true)});
		_registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
			var bp = "background-position",
				cs = (_cs || _getComputedStyle(t, null)),
				bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
				es = this.format(e),
				ba, ea, i, pct, overlap, src;
			if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
				src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
				if (src && src !== "none") {
					ba = bs.split(" ");
					ea = es.split(" ");
					_tempImg.setAttribute("src", src); //set the temp IMG's src to the background-image so that we can measure its width/height
					i = 2;
					while (--i > -1) {
						bs = ba[i];
						pct = (bs.indexOf("%") !== -1);
						if (pct !== (ea[i].indexOf("%") !== -1)) {
							overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
							ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
						}
					}
					bs = ba.join(" ");
				}
			}
			return this.parseComplex(t.style, bs, es, pt, plugin);
		}, formatter:_parsePosition});
		_registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:function(v) {
			v += ""; //ensure it's a string
			return (v.substr(0,2) === "co") ? v : _parsePosition(v.indexOf(" ") === -1 ? v + " " + v : v); //if set to something like "100% 100%", Safari typically reports the computed style as just "100%" (no 2nd value), but we should ensure that there are two values, so copy the first one. Otherwise, it'd be interpreted as "100% 0" (wrong). Also remember that it could be "cover" or "contain" which we can't tween but should be able to set.
		}});
		_registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
		_registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
		_registerComplexSpecialProp("transformStyle", {prefix:true});
		_registerComplexSpecialProp("backfaceVisibility", {prefix:true});
		_registerComplexSpecialProp("userSelect", {prefix:true});
		_registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
		_registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
		_registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
			var b, cs, delim;
			if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
				cs = t.currentStyle;
				delim = _ieVers < 8 ? " " : ",";
				b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
				e = this.format(e).split(",").join(delim);
			} else {
				b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
				e = this.format(e);
			}
			return this.parseComplex(t.style, b, e, pt, plugin);
		}});
		_registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
		_registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
		_registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
			var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"),
				end = this.format(e).split(" "),
				esfx = end[0].replace(_suffixExp, "");
			if (esfx !== "px") { //if we're animating to a non-px value, we need to convert the beginning width to that unit.
				bw = (parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx)) + esfx;
			}
			return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
			}, color:true, formatter:function(v) {
				var a = v.split(" ");
				return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
			}});
		_registerComplexSpecialProp("borderWidth", {parser:_getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}); //Firefox doesn't pick up on borderWidth set in style sheets (only inline).
		_registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
			var s = t.style,
				prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
			return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
		}});

		//opacity-related
		var _setIEOpacityRatio = function(v) {
				var t = this.t, //refers to the element's style property
					filters = t.filter || _getStyle(this.data, "filter") || "",
					val = (this.s + this.c * v) | 0,
					skip;
				if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
					if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
						t.removeAttribute("filter");
						skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
					} else {
						t.filter = filters.replace(_alphaFilterExp, "");
						skip = true;
					}
				}
				if (!skip) {
					if (this.xn1) {
						t.filter = filters = filters || ("alpha(opacity=" + val + ")"); //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
					}
					if (filters.indexOf("pacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8). We omit the "O" to avoid case-sensitivity issues
						if (val !== 0 || !this.xn1) { //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
							t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
						}
					} else {
						t.filter = filters.replace(_opacityExp, "opacity=" + val);
					}
				}
			};
		_registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
			var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
				style = t.style,
				isAutoAlpha = (p === "autoAlpha");
			if (typeof(e) === "string" && e.charAt(1) === "=") {
				e = ((e.charAt(0) === "-") ? -1 : 1) * parseFloat(e.substr(2)) + b;
			}
			if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
				b = 0;
			}
			if (_supportsOpacity) {
				pt = new CSSPropTween(style, "opacity", b, e - b, pt);
			} else {
				pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
				pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
				style.zoom = 1; //helps correct an IE issue.
				pt.type = 2;
				pt.b = "alpha(opacity=" + pt.s + ")";
				pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
				pt.data = t;
				pt.plugin = plugin;
				pt.setRatio = _setIEOpacityRatio;
			}
			if (isAutoAlpha) { //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
				pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "inherit" : "hidden"), ((e === 0) ? "hidden" : "inherit"));
				pt.xs0 = "inherit";
				cssp._overwriteProps.push(pt.n);
				cssp._overwriteProps.push(p);
			}
			return pt;
		}});


		var _removeProp = function(s, p) {
				if (p) {
					if (s.removeProperty) {
						if (p.substr(0,2) === "ms" || p.substr(0,6) === "webkit") { //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
							p = "-" + p;
						}
						s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
					} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
						s.removeAttribute(p);
					}
				}
			},
			_setClassNameRatio = function(v) {
				this.t._gsClassPT = this;
				if (v === 1 || v === 0) {
					this.t.setAttribute("class", (v === 0) ? this.b : this.e);
					var mpt = this.data, //first MiniPropTween
						s = this.t.style;
					while (mpt) {
						if (!mpt.v) {
							_removeProp(s, mpt.p);
						} else {
							s[mpt.p] = mpt.v;
						}
						mpt = mpt._next;
					}
					if (v === 1 && this.t._gsClassPT === this) {
						this.t._gsClassPT = null;
					}
				} else if (this.t.getAttribute("class") !== this.e) {
					this.t.setAttribute("class", this.e);
				}
			};
		_registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			var b = t.getAttribute("class") || "", //don't use t.className because it doesn't work consistently on SVG elements; getAttribute("class") and setAttribute("class", value") is more reliable.
				cssText = t.style.cssText,
				difData, bs, cnpt, cnptLookup, mpt;
			pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClassNameRatio;
			pt.pr = -11;
			_hasPriority = true;
			pt.b = b;
			bs = _getAllStyles(t, _cs);
			//if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
			cnpt = t._gsClassPT;
			if (cnpt) {
				cnptLookup = {};
				mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
				while (mpt) {
					cnptLookup[mpt.p] = 1;
					mpt = mpt._next;
				}
				cnpt.setRatio(1);
			}
			t._gsClassPT = pt;
			pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
			t.setAttribute("class", pt.e);
			difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
			t.setAttribute("class", b);
			pt.data = difData.firstMPT;
			t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
			pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
			return pt;
		}});


		var _setClearPropsRatio = function(v) {
			if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that and if the tween is the zero-duration one that's created internally to render the starting values in a from() tween, ignore that because otherwise, for example, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in).
				var s = this.t.style,
					transformParse = _specialProps.transform.parse,
					a, p, i, clearTransform, transform;
				if (this.e === "all") {
					s.cssText = "";
					clearTransform = true;
				} else {
					a = this.e.split(" ").join("").split(",");
					i = a.length;
					while (--i > -1) {
						p = a[i];
						if (_specialProps[p]) {
							if (_specialProps[p].parse === transformParse) {
								clearTransform = true;
							} else {
								p = (p === "transformOrigin") ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
							}
						}
						_removeProp(s, p);
					}
				}
				if (clearTransform) {
					_removeProp(s, _transformProp);
					transform = this.t._gsTransform;
					if (transform) {
						if (transform.svg) {
							this.t.removeAttribute("data-svg-origin");
							this.t.removeAttribute("transform");
						}
						delete this.t._gsTransform;
					}
				}

			}
		};
		_registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
			pt = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClearPropsRatio;
			pt.e = e;
			pt.pr = -10;
			pt.data = cssp._tween;
			_hasPriority = true;
			return pt;
		}});

		p = "bezier,throwProps,physicsProps,physics2D".split(",");
		i = p.length;
		while (i--) {
			_registerPluginProp(p[i]);
		}








		p = CSSPlugin.prototype;
		p._firstPT = p._lastParsedTransform = p._transform = null;

		//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, vars, tween, index) {
			if (!target.nodeType) { //css is only for dom elements
				return false;
			}
			this._target = _target = target;
			this._tween = tween;
			this._vars = vars;
			_index = index;
			_autoRound = vars.autoRound;
			_hasPriority = false;
			_suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
			_cs = _getComputedStyle(target, "");
			_overwriteProps = this._overwriteProps;
			var style = target.style,
				v, pt, pt2, first, last, next, zIndex, tpt, threeD;
			if (_reqSafariFix) if (style.zIndex === "") {
				v = _getStyle(target, "zIndex", _cs);
				if (v === "auto" || v === "") {
					//corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
					this._addLazySet(style, "zIndex", 0);
				}
			}

			if (typeof(vars) === "string") {
				first = style.cssText;
				v = _getAllStyles(target, _cs);
				style.cssText = first + ";" + vars;
				v = _cssDif(target, v, _getAllStyles(target)).difs;
				if (!_supportsOpacity && _opacityValExp.test(vars)) {
					v.opacity = parseFloat( RegExp.$1 );
				}
				vars = v;
				style.cssText = first;
			}

			if (vars.className) { //className tweens will combine any differences they find in the css with the vars that are passed in, so {className:"myClass", scale:0.5, left:20} would work.
				this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
			} else {
				this._firstPT = pt = this.parse(target, vars, null);
			}

			if (this._transformType) {
				threeD = (this._transformType === 3);
				if (!_transformProp) {
					style.zoom = 1; //helps correct an IE issue.
				} else if (_isSafari) {
					_reqSafariFix = true;
					//if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
					if (style.zIndex === "") {
						zIndex = _getStyle(target, "zIndex", _cs);
						if (zIndex === "auto" || zIndex === "") {
							this._addLazySet(style, "zIndex", 0);
						}
					}
					//Setting WebkitBackfaceVisibility corrects 3 bugs:
					// 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
					// 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
					// 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
					//Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
					if (_isSafariLT6) {
						this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
					}
				}
				pt2 = pt;
				while (pt2 && pt2._next) {
					pt2 = pt2._next;
				}
				tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
				this._linkCSSP(tpt, null, pt2);
				tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
				tpt.data = this._transform || _getTransform(target, _cs, true);
				tpt.tween = tween;
				tpt.pr = -1; //ensures that the transforms get applied after the components are updated.
				_overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
			}

			if (_hasPriority) {
				//reorders the linked list in order of pr (priority)
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				this._firstPT = first;
			}
			return true;
		};


		p.parse = function(target, vars, pt, plugin) {
			var style = target.style,
				p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
			for (p in vars) {
				es = vars[p]; //ending value string
				if (typeof(es) === "function") {
					es = es(_index, _target);
				}
				sp = _specialProps[p]; //SpecialProp lookup.
				if (sp) {
					pt = sp.parse(target, es, p, this, pt, plugin, vars);
				} else if (p.substr(0,2) === "--") { //for tweening CSS variables (which always start with "--"). To maximize performance and simplicity, we bypass CSSPlugin altogether and just add a normal property tween to the tween instance itself.
					this._tween._propLookup[p] = this._addTween.call(this._tween, target.style, "setProperty", _getComputedStyle(target).getPropertyValue(p) + "", es + "", p, false, p);
					continue;
				} else {
					bs = _getStyle(target, p, _cs) + "";
					isStr = (typeof(es) === "string");
					if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
						if (!isStr) {
							es = _parseColor(es);
							es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
						}
						pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);

					} else if (isStr && _complexExp.test(es)) {
						pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);

					} else {
						bn = parseFloat(bs);
						bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

						if (bs === "" || bs === "auto") {
							if (p === "width" || p === "height") {
								bn = _getDimension(target, p, _cs);
								bsfx = "px";
							} else if (p === "left" || p === "top") {
								bn = _calculateOffset(target, p, _cs);
								bsfx = "px";
							} else {
								bn = (p !== "opacity") ? 0 : 1;
								bsfx = "";
							}
						}

						rel = (isStr && es.charAt(1) === "=");
						if (rel) {
							en = parseInt(es.charAt(0) + "1", 10);
							es = es.substr(2);
							en *= parseFloat(es);
							esfx = es.replace(_suffixExp, "");
						} else {
							en = parseFloat(es);
							esfx = isStr ? es.replace(_suffixExp, "") : "";
						}

						if (esfx === "") {
							esfx = (p in _suffixMap) ? _suffixMap[p] : bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
						}

						es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.
						//if the beginning/ending suffixes don't match, normalize them...
						if (bsfx !== esfx) if (esfx !== "" || p === "lineHeight") if (en || en === 0) if (bn) { //note: if the beginning value (bn) is 0, we don't need to convert units!
							bn = _convertToPixels(target, p, bn, bsfx);
							if (esfx === "%") {
								bn /= _convertToPixels(target, p, 100, "%") / 100;
								if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
									bs = bn + "%";
								}

							} else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
								bn /= _convertToPixels(target, p, 1, esfx);

							//otherwise convert to pixels.
							} else if (esfx !== "px") {
								en = _convertToPixels(target, p, en, esfx);
								esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
							}
							if (rel) if (en || en === 0) {
								es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
							}
						}

						if (rel) {
							en += bn;
						}

						if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
							pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
							pt.xs0 = esfx;
							//DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
						} else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
							_log("invalid " + p + " tween value: " + vars[p]);
						} else {
							pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
							pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
							//DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
						}
					}
				}
				if (plugin) if (pt && !pt.plugin) {
					pt.plugin = plugin;
				}
			}
			return pt;
		};


		//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val, str, i;
			//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
			if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
				while (pt) {
					if (pt.type !== 2) {
						if (pt.r && pt.type !== -1) {
							val = pt.r(pt.s + pt.c);
							if (!pt.type) {
								pt.t[pt.p] = val + pt.xs0;
							} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
								i = pt.l;
								str = pt.xs0 + val + pt.xs1;
								for (i = 1; i < pt.l; i++) {
									str += pt["xn"+i] + pt["xs"+(i+1)];
								}
								pt.t[pt.p] = str;
							}
						} else {
							pt.t[pt.p] = pt.e;
						}
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = pt.r(val);
					} else if (val < min) if (val > -min) {
						val = 0;
					}
					if (!pt.type) {
						pt.t[pt.p] = val + pt.xs0;
					} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
						i = pt.l;
						if (i === 2) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
						} else if (i === 3) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
						} else if (i === 4) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
						} else if (i === 5) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
						} else {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = str;
						}

					} else if (pt.type === -1) { //non-tweening value
						pt.t[pt.p] = pt.xs0;

					} else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
			} else {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.b;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}
			}
		};

		/**
		 * @private
		 * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
		 * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
		 * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
		 * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
		 * doesn't have any transform-related properties of its own. You can call this method as many times as you
		 * want and it won't create duplicate CSSPropTweens.
		 *
		 * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
		 */
		p._enableTransforms = function(threeD) {
			this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.
			this._transformType = (!(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3)) ? 3 : 2;
		};

		var lazySet = function(v) {
			this.t[this.p] = this.e;
			this.data._linkCSSP(this, this._next, null, true); //we purposefully keep this._next even though it'd make sense to null it, but this is a performance optimization, as this happens during the while (pt) {} loop in setRatio() at the bottom of which it sets pt = pt._next, so if we null it, the linked list will be broken in that loop.
		};
		/** @private Gives us a way to set a value on the first render (and only the first render). **/
		p._addLazySet = function(t, p, v) {
			var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
			pt.e = v;
			pt.setRatio = lazySet;
			pt.data = this;
		};

		/** @private **/
		p._linkCSSP = function(pt, next, prev, remove) {
			if (pt) {
				if (next) {
					next._prev = pt;
				}
				if (pt._next) {
					pt._next._prev = pt._prev;
				}
				if (pt._prev) {
					pt._prev._next = pt._next;
				} else if (this._firstPT === pt) {
					this._firstPT = pt._next;
					remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
				}
				if (prev) {
					prev._next = pt;
				} else if (!remove && this._firstPT === null) {
					this._firstPT = pt;
				}
				pt._next = next;
				pt._prev = prev;
			}
			return pt;
		};

		p._mod = function(lookup) {
			var pt = this._firstPT;
			while (pt) {
				if (typeof(lookup[pt.p]) === "function") { //only gets called by RoundPropsPlugin (ModifyPlugin manages all the rendering internally for CSSPlugin properties that need modification). Remember, we handle rounding a bit differently in this plugin for performance reasons, leveraging "r" as an indicator that the value should be rounded internally.
					pt.r = lookup[pt.p];
				}
				pt = pt._next;
			}
		};

		//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
		p._kill = function(lookup) {
			var copy = lookup,
				pt, p, xfirst;
			if (lookup.autoAlpha || lookup.alpha) {
				copy = {};
				for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
					copy[p] = lookup[p];
				}
				copy.opacity = 1;
				if (copy.autoAlpha) {
					copy.visibility = 1;
				}
			}
			if (lookup.className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
				xfirst = pt.xfirst;
				if (xfirst && xfirst._prev) {
					this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
				} else if (xfirst === this._firstPT) {
					this._firstPT = pt._next;
				}
				if (pt._next) {
					this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
				}
				this._classNamePT = null;
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.plugin && pt.plugin !== p && pt.plugin._kill) { //for plugins that are registered with CSSPlugin, we should notify them of the kill.
					pt.plugin._kill(lookup);
					p = pt.plugin;
				}
				pt = pt._next;
			}
			return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["TweenPlugin"].prototype._kill.call(this, copy);
		};



		//used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
		var _getChildStyles = function(e, props, targets) {
				var children, i, child, type;
				if (e.slice) {
					i = e.length;
					while (--i > -1) {
						_getChildStyles(e[i], props, targets);
					}
					return;
				}
				children = e.childNodes;
				i = children.length;
				while (--i > -1) {
					child = children[i];
					type = child.type;
					if (child.style) {
						props.push(_getAllStyles(child));
						if (targets) {
							targets.push(child);
						}
					}
					if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
						_getChildStyles(child, props, targets);
					}
				}
			};

		/**
		 * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
		 * and then compares the style properties of all the target's child elements at the tween's start and end, and
		 * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
		 * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
		 * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
		 * is because it creates entirely new tweens that may have completely different targets than the original tween,
		 * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
		 * and it would create other problems. For example:
		 *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
		 *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
		 *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
		 *
		 * @param {Object} target object to be tweened
		 * @param {number} Duration in seconds (or frames for frames-based tweens)
		 * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
		 * @return {Array} An array of TweenLite instances
		 */
		CSSPlugin.cascadeTo = function(target, duration, vars) {
			var tween = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].to(target, duration, vars),
				results = [tween],
				b = [],
				e = [],
				targets = [],
				_reservedProps = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]._internals.reservedProps,
				i, difs, p, from;
			target = tween._targets || tween.target;
			_getChildStyles(target, b, targets);
			tween.render(duration, true, true);
			_getChildStyles(target, e);
			tween.render(0, true, true);
			tween._enabled(true);
			i = targets.length;
			while (--i > -1) {
				difs = _cssDif(targets[i], b[i], e[i]);
				if (difs.firstMPT) {
					difs = difs.difs;
					for (p in vars) {
						if (_reservedProps[p]) {
							difs[p] = vars[p];
						}
					}
					from = {};
					for (p in difs) {
						from[p] = b[i][p];
					}
					results.push(_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromTo(targets[i], duration, from, difs));
				}
			}
			return results;
		};

		_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["TweenPlugin"].activate([CSSPlugin]);
		return CSSPlugin;

	}, true);

var CSSPlugin = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].CSSPlugin;


/***/ }),

/***/ "./node_modules/gsap/DirectionalRotationPlugin.js":
/*!********************************************************!*\
  !*** ./node_modules/gsap/DirectionalRotationPlugin.js ***!
  \********************************************************/
/*! exports provided: DirectionalRotationPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectionalRotationPlugin", function() { return DirectionalRotationPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DirectionalRotationPlugin; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/*!
 * VERSION: 0.3.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/



var DirectionalRotationPlugin = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine.plugin({
		propName: "directionalRotation",
		version: "0.3.1",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween, index) {
			if (typeof(value) !== "object") {
				value = {rotation:value};
			}
			this.finals = {};
			var cap = (value.useRadians === true) ? Math.PI * 2 : 360,
				min = 0.000001,
				p, v, start, end, dif, split;
			for (p in value) {
				if (p !== "useRadians") {
					end = value[p];
					if (typeof(end) === "function") {
						end = end(index, target);
					}
					split = (end + "").split("_");
					v = split[0];
					start = parseFloat( (typeof(target[p]) !== "function") ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() );
					end = this.finals[p] = (typeof(v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
					dif = end - start;
					if (split.length) {
						v = split.join("_");
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					if (dif > min || dif < -min) {
						this._addTween(target, p, start, start + dif, p);
						this._overwriteProps.push(p);
					}
				}
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			var pt;
			if (ratio !== 1) {
				this._super.setRatio.call(this, ratio);
			} else {
				pt = this._firstPT;
				while (pt) {
					if (pt.f) {
						pt.t[pt.p](this.finals[pt.p]);
					} else {
						pt.t[pt.p] = this.finals[pt.p];
					}
					pt = pt._next;
				}
			}
		}

	});

DirectionalRotationPlugin._autoCSS = true;



/***/ }),

/***/ "./node_modules/gsap/EasePack.js":
/*!***************************************!*\
  !*** ./node_modules/gsap/EasePack.js ***!
  \***************************************/
/*! exports provided: Back, Elastic, Bounce, RoughEase, SlowMo, SteppedEase, Circ, Expo, Sine, ExpoScaleEase, Linear, Power0, Power1, Power2, Power3, Power4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Back", function() { return Back; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Elastic", function() { return Elastic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bounce", function() { return Bounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoughEase", function() { return RoughEase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlowMo", function() { return SlowMo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SteppedEase", function() { return SteppedEase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circ", function() { return Circ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Expo", function() { return Expo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sine", function() { return Sine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpoScaleEase", function() { return ExpoScaleEase; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Linear", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Linear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power0", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power0"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power1", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power2", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power3", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power4", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power4"]; });

/*!
 * VERSION: 1.16.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/



_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine("easing.Back", ["easing.Ease"], function() {
		
		var w = (_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"].GreenSockGlobals || _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]),
			gs = w.com.greensock,
			_2PI = Math.PI * 2,
			_HALF_PI = Math.PI / 2,
			_class = gs._class,
			_create = function(n, f) {
				var C = _class("easing." + n, function(){}, true),
					p = C.prototype = new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]();
				p.constructor = C;
				p.getRatio = f;
				return C;
			},
			_easeReg = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"].register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
				var C = _class("easing."+name, {
					easeOut:new EaseOut(),
					easeIn:new EaseIn(),
					easeInOut:new EaseInOut()
				}, true);
				_easeReg(C, name);
				return C;
			},
			EasePoint = function(time, value, next) {
				this.t = time;
				this.v = value;
				if (next) {
					this.next = next;
					next.prev = this;
					this.c = next.v - value;
					this.gap = next.t - time;
				}
			},

			//Back
			_createBack = function(n, f) {
				var C = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true), 
					p = C.prototype = new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]();
				p.constructor = C;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new C(overshoot);
				};
				return C;
			},

			Back = _wrap("Back",
				_createBack("BackOut", function(p) {
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
				}),
				_createBack("BackIn", function(p) {
					return p * p * ((this._p1 + 1) * p - this._p1);
				}),
				_createBack("BackInOut", function(p) {
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})
			),


			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio !== 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"](),
			SteppedEase, ExpoScaleEase, RoughEase, _createElastic;
			
		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? (p === 1 ? 0 : 1 - (p = (p - this._p3) / this._p1) * p) : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p); //added p === 1 ? 0 to avoid floating point rounding errors from affecting the final value, like 1 - 0.7 = 0.30000000000000004 instead of 0.3
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);
		
		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};


		//SteppedEase
		SteppedEase = _class("easing.SteppedEase", function(steps, immediateStart) {
				steps = steps || 1;
				this._p1 = 1 / steps;
				this._p2 = steps + (immediateStart ? 0 : 1);
				this._p3 = immediateStart ? 1 : 0;
			}, true);
		p = SteppedEase.prototype = new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]();	
		p.constructor = SteppedEase;
		p.getRatio = function(p) {
			if (p < 0) {
				p = 0;
			} else if (p >= 1) {
				p = 0.999999999;
			}
			return (((this._p2 * p) | 0) + this._p3) * this._p1;
		};
		p.config = SteppedEase.config = function(steps, immediateStart) {
			return new SteppedEase(steps, immediateStart);
		};


		//ExpoScaleEase
		ExpoScaleEase = _class("easing.ExpoScaleEase", function(start, end, ease) {
			this._p1 = Math.log(end / start);
			this._p2 = end - start;
			this._p3 = start;
			this._ease = ease;
		}, true);
		p = ExpoScaleEase.prototype = new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]();
		p.constructor = ExpoScaleEase;
		p.getRatio = function(p) {
			if (this._ease) {
				p = this._ease.getRatio(p);
			}
			return (this._p3 * Math.exp(this._p1 * p) - this._p3) / this._p2;
		};
		p.config = ExpoScaleEase.config = function(start, end, ease) {
			return new ExpoScaleEase(start, end, ease);
		};


		//RoughEase
		RoughEase = _class("easing.RoughEase", function(vars) {
			vars = vars || {};
			var taper = vars.taper || "none",
				a = [],
				cnt = 0,
				points = (vars.points || 20) | 0,
				i = points,
				randomize = (vars.randomize !== false),
				clamp = (vars.clamp === true),
				template = (vars.template instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]) ? vars.template : null,
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
				x, y, bump, invX, obj, pnt;
			while (--i > -1) {
				x = randomize ? Math.random() : (1 / points) * i;
				y = template ? template.getRatio(x) : x;
				if (taper === "none") {
					bump = strength;
				} else if (taper === "out") {
					invX = 1 - x;
					bump = invX * invX * strength;
				} else if (taper === "in") {
					bump = x * x * strength;
				} else if (x < 0.5) {  //"both" (start)
					invX = x * 2;
					bump = invX * invX * 0.5 * strength;
				} else {				//"both" (end)
					invX = (1 - x) * 2;
					bump = invX * invX * 0.5 * strength;
				}
				if (randomize) {
					y += (Math.random() * bump) - (bump * 0.5);
				} else if (i % 2) {
					y += bump * 0.5;
				} else {
					y -= bump * 0.5;
				}
				if (clamp) {
					if (y > 1) {
						y = 1;
					} else if (y < 0) {
						y = 0;
					}
				}
				a[cnt++] = {x:x, y:y};
			}
			a.sort(function(a, b) {
				return a.x - b.x;
			});

			pnt = new EasePoint(1, 1, null);
			i = points;
			while (--i > -1) {
				obj = a[i];
				pnt = new EasePoint(obj.x, obj.y, pnt);
			}

			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);
		}, true);
		p = RoughEase.prototype = new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]();
		p.constructor = RoughEase;
		p.getRatio = function(p) {
			var pnt = this._prev;
			if (p > pnt.t) {
				while (pnt.next && p >= pnt.t) {
					pnt = pnt.next;
				}
				pnt = pnt.prev;
			} else {
				while (pnt.prev && p <= pnt.t) {
					pnt = pnt.prev;
				}
			}
			this._prev = pnt;
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);
		};
		p.config = function(vars) {
			return new RoughEase(vars);
		};
		RoughEase.ease = new RoughEase();


		//Bounce
		_wrap("Bounce",
			_create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				}
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
			}),
			_create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
				}
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
			}),
			_create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			})
		);


		//CIRC
		_wrap("Circ",
			_create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			_create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			_create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			})
		);


		//Elastic
		_createElastic = function(n, f, def) {
			var C = _class("easing." + n, function(amplitude, period) {
					this._p1 = (amplitude >= 1) ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
					this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
					this._p2 = _2PI / this._p2; //precalculate to optimize
				}, true),
				p = C.prototype = new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]();
			p.constructor = C;
			p.getRatio = f;
			p.config = function(amplitude, period) {
				return new C(amplitude, period);
			};
			return C;
		};
		_wrap("Elastic",
			_createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * this._p2 ) + 1;
			}, 0.3),
			_createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2 ));
			}, 0.3),
			_createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * this._p2 ) * 0.5 + 1;
			}, 0.45)
		);


		//Expo
		_wrap("Expo",
			_create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			_create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			_create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			})
		);


		//Sine
		_wrap("Sine",
			_create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			_create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			_create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			})
		);

		_class("easing.EaseLookup", {
				find:function(s) {
					return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"].map[s];
				}
			}, true);

		//register the non-standard eases
		_easeReg(w.SlowMo, "SlowMo", "ease,");
		_easeReg(RoughEase, "RoughEase", "ease,");
		_easeReg(SteppedEase, "SteppedEase", "ease,");
		
		return Back;
		
	}, true);

var Back = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].Back;
var Elastic = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].Elastic;
var Bounce = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].Bounce;
var RoughEase = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].RoughEase;
var SlowMo = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].SlowMo;
var SteppedEase = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].SteppedEase;
var Circ = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].Circ;
var Expo = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].Expo;
var Sine = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].Sine;
var ExpoScaleEase = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].ExpoScaleEase;


/***/ }),

/***/ "./node_modules/gsap/RoundPropsPlugin.js":
/*!***********************************************!*\
  !*** ./node_modules/gsap/RoundPropsPlugin.js ***!
  \***********************************************/
/*! exports provided: RoundPropsPlugin, _getRoundFunc, _roundLinkedList, p, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoundPropsPlugin", function() { return RoundPropsPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getRoundFunc", function() { return _getRoundFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_roundLinkedList", function() { return _roundLinkedList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RoundPropsPlugin; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/*!
 * VERSION: 1.6.0
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/


var RoundPropsPlugin = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine.plugin({
				propName: "roundProps",
				version: "1.7.0",
				priority: -1,
				API: 2,

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {
					this._tween = tween;
					return true;
				}

			}),
			_getRoundFunc = function(v) { //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
				var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()
				return function(n) {
					return ((Math.round(n / v) * v * p) | 0) / p;
				};
			},
			_roundLinkedList = function(node, mod) {
				while (node) {
					if (!node.f && !node.blob) {
						node.m = mod || Math.round;
					}
					node = node._next;
				}
			},
			p = RoundPropsPlugin.prototype;

		p._onInitAllProps = function() {
			var tween = this._tween,
				rp = tween.vars.roundProps,
				lookup = {},
				rpt = tween._propLookup.roundProps,
				pt, next, i, p;
			if (typeof(rp) === "object" && !rp.push) {
				for (p in rp) {
					lookup[p] = _getRoundFunc(rp[p]);
				}
			} else {
				if (typeof(rp) === "string") {
					rp = rp.split(",");
				}
				i = rp.length;
				while (--i > -1) {
					lookup[rp[i]] = Math.round;
				}
			}

			for (p in lookup) {
				pt = tween._firstPT;
				while (pt) {
					next = pt._next; //record here, because it may get removed
					if (pt.pg) {
						pt.t._mod(lookup);
					} else if (pt.n === p) {
						if (pt.f === 2 && pt.t) { //a blob (text containing multiple numeric values)
							_roundLinkedList(pt.t._firstPT, lookup[p]);
						} else {
							this._add(pt.t, p, pt.s, pt.c, lookup[p]);
							//remove from linked list
							if (next) {
								next._prev = pt._prev;
							}
							if (pt._prev) {
								pt._prev._next = next;
							} else if (tween._firstPT === pt) {
								tween._firstPT = next;
							}
							pt._next = pt._prev = null;
							tween._propLookup[p] = rpt;
						}
					}
					pt = next;
				}
			}
			return false;
		};

		p._add = function(target, p, s, c, mod) {
			this._addTween(target, p, s, s + c, p, mod || Math.round);
			this._overwriteProps.push(p);
		};




/***/ }),

/***/ "./node_modules/gsap/TimelineLite.js":
/*!*******************************************!*\
  !*** ./node_modules/gsap/TimelineLite.js ***!
  \*******************************************/
/*! exports provided: TimelineLite, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineLite", function() { return TimelineLite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimelineLite; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */


_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function() {

		var TimelineLite = function(vars) {
				_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["SimpleTimeline"].call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var v = this.vars,
					val, p;
				for (p in v) {
					val = v[p];
					if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
						v[p] = this._swapSelfInParams(val);
					}
				}
				if (_isArray(v.tweens)) {
					this.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]._internals,
			_internals = TimelineLite._internals = {},
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine.globals,
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i]) : val[i % val.length];
				}
				delete vars.cycle;
			},
			_pauseCallback = _internals.pauseCallback = function() {},
			_slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			p = TimelineLite.prototype = new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["SimpleTimeline"]();

		TimelineLite.version = "2.0.2";
		p.constructor = TimelineLite;
		p.kill()._gc = p._forcingPlayhead = p._hasPause = false;

		/* might use later...
		//translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
		function localToGlobal(time, animation) {
			while (animation) {
				time = (time / animation._timeScale) + animation._startTime;
				animation = animation.timeline;
			}
			return time;
		}

		//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
		function globalToLocal(time, animation) {
			var scale = 1;
			time -= localToGlobal(0, animation);
			while (animation) {
				scale *= animation._timeScale;
				animation = animation.timeline;
			}
			return time * scale;
		}
		*/

		p.to = function(target, duration, vars, position) {
			var Engine = (vars.repeat && _globals.TweenMax) || _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"];
			return duration ? this.add( new Engine(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( ((vars.repeat && _globals.TweenMax) || _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]).from(target, duration, vars), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			var Engine = (toVars.repeat && _globals.TweenMax) || _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"];
			return duration ? this.add( Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, callbackScope:onCompleteAllScope, smoothChildTiming:this.smoothChildTiming}),
				cycle = vars.cycle,
				copy, i;
			if (typeof(targets) === "string") {
				targets = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].selector(targets) || targets;
			}
			targets = targets || [];
			if (_isSelector(targets)) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice(targets);
			}
			stagger = stagger || 0;
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			for (i = 0; i < targets.length; i++) {
				copy = _copy(vars);
				if (copy.startAt) {
					copy.startAt = _copy(copy.startAt);
					if (copy.startAt.cycle) {
						_applyCycle(copy.startAt, targets, i);
					}
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				tl.to(targets[i], duration, copy, i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = (position === this._time && !this._paused);
			}
			return this.add( new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"](target, 0, vars), position);
		};

		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline,
				hasNegativeStart, time,	tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"] && tween.target === tween.vars.onComplete)) {
					time = tween._startTime - tween._delay;
					if (time < 0) {
						hasNegativeStart = 1;
					}
					tl.add(tween, time);
				}
				tween = next;
			}
			root.add(tl, 0);
			if (hasNegativeStart) { //calling totalDuration() will force the adjustment necessary to shift the children forward so none of them start before zero, and moves the timeline backwards the same amount, so the playhead is still aligned where it should be globally, but the timeline doesn't have illegal children that start before zero.
				tl.totalDuration();
			}
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var curTime, l, i, child, tl, beforeRawTime;
			if (typeof(position) !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"])) {
				if ((value instanceof Array) || (value && value.push && _isArray(value))) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if (_isArray(child = value[i])) {
							child = new TimelineLite({tweens:child});
						}
						this.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof(value) === "string") {
					return this.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.");
				}
			}

			_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["SimpleTimeline"].prototype.add.call(this, value, position);

			if (value._time) { //in case, for example, the _startTime is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
				curTime = Math.max(0, Math.min(value.totalDuration(), (this.rawTime() - value._startTime) * value._timeScale));
				if (Math.abs(curTime - value._totalTime) > 0.00001) { //if an onComplete restarts the tween in a nested timeline, for example, there could be an endless loop without this logic (v2.0.2), like var masterTL = new TimelineMax({autoRemoveChildren: true}), tl = new TimelineMax(); tl.eventCallback("onComplete", function() { tl.restart() } );tl.fromTo('div', 1.1, { rotation: 0 }, { rotation: 360 }, 0);masterTL.add(tl);
					value.render(curTime, false, false);
				}
			}

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
			if (this._gc || this._time === this._duration) if (!this._paused) if (this._duration < this.duration()) {
				//in case any of the ancestors had completed but should now be enabled...
				tl = this;
				beforeRawTime = (tl.rawTime() > value._startTime); //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.
				while (tl._timeline) {
					if (beforeRawTime && tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
					} else if (tl._gc) {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function(value) {
			if (value instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"]) {
				this._remove(value, false);
				var tl = value._timeline = value.vars.useFrames ? _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"]._rootFramesTimeline : _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"]._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.
				value._startTime = (value._paused ? value._pauseTime : tl._time) - ((!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale); //ensure that if it gets played again, the timing is correct.
				return this;
			} else if (value instanceof Array || (value && value.push && _isArray(value))) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p._remove = function(tween, skipDisable) {
			_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["SimpleTimeline"].prototype._remove.call(this, tween, skipDisable);
			var last = this._last;
			if (!last) {
				this._time = this._totalTime = this._duration = this._totalDuration = 0;
			} else if (this._time > this.duration()) {
				this._time = this._duration;
				this._totalTime = this._totalDuration;
			}
			return this;
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.addPause = function(position, callback, params, scope) {
			var t = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].delayedCall(0, _pauseCallback, params, scope || this);
			t.vars.onComplete = t.vars.onReverseComplete = callback;
			t.data = "isPause";
			this._hasPause = true;
			return this.add(t, position);
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var clippedDuration, i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"] && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore && ((ignore instanceof Array) || (ignore.push && _isArray(ignore)))) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"] && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			clippedDuration = (typeof(timeOrLabel) === "number" && !offsetOrLabel) ? 0 : (this.duration() > 99999999999) ? this.recent().endTime(false) : this._duration; //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = clippedDuration + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : clippedDuration;
			} else if (timeOrLabel == null) {
				timeOrLabel = clippedDuration;
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var prevTime = this._time,
				totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevPaused = this._paused,
				tween, isComplete, next, callback, internalForce, pauseTween, curTime;
			if (prevTime !== this._time) { //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
				time += this._time - prevTime;
			}
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || this._rawPrevTime < 0 || this._rawPrevTime === _tinyNum) if (this._rawPrevTime !== time && this._first) {
						internalForce = true;
						if (this._rawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime !== _tinyNum && (this._rawPrevTime > 0 || (time < 0 && this._rawPrevTime >= 0)))) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) { //ensures proper GC if a timeline is resumed after it's finished reversing.
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (this._rawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					if (time >= prevTime) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || !this._duration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= curTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var disabled = this._gc,
				a = [],
				cnt = 0,
				tweens, i;
			if (disabled) {
				this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.
			}
			tweens = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].getTweensOf(target);
			i = tweens.length;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			if (disabled) {
				this._enabled(false, true);
			}
			return a;
		};

		p.recent = function() {
			return this._recent;
		};

		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"].prototype.invalidate.call(this);;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["SimpleTimeline"].prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			this._forcingPlayhead = true;
			var val = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"].prototype.totalTime.apply(this, arguments);
			this._forcingPlayhead = false;
			return val;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						tween = this._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused && !this._calculatingDuration) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this._calculatingDuration = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add(), like _parseTimeOrLabel().
							this.add(tween, tween._startTime - tween._delay);
							this._calculatingDuration = 0;
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
								this._time -= tween._startTime;
								this._totalTime -= tween._startTime;
								this._rawPrevTime -= tween._startTime;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (value && this.totalDuration()) ? this.timeScale(this._totalDuration / value) : this;
		};

		p.paused = function(value) {
			if (!value) { //if there's a pause directly at the spot from where we're unpausing, skip it.
				var tween = this._first,
					time = this._time;
				while (tween) {
					if (tween._startTime === time && tween.data === "isPause") {
						tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
					}
					tween = tween._next;
				}
			}
			return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"].prototype.paused.apply(this, arguments);
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"]._rootFramesTimeline);
		};

		p.rawTime = function(wrapRepeats) {
			return (wrapRepeats && (this._paused || (this._repeat && this.time() > 0 && this.totalProgress() < 1))) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
		};

		return TimelineLite;

	}, true);

var TimelineLite = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].TimelineLite;



/***/ }),

/***/ "./node_modules/gsap/TimelineMax.js":
/*!******************************************!*\
  !*** ./node_modules/gsap/TimelineMax.js ***!
  \******************************************/
/*! exports provided: TimelineMax, TimelineLite, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineMax", function() { return TimelineMax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimelineMax; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/* harmony import */ var _TimelineLite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimelineLite.js */ "./node_modules/gsap/TimelineLite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineLite", function() { return _TimelineLite_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */




_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function() {
		
		var TimelineMax = function(vars) {
				_TimelineLite_js__WEBPACK_IMPORTED_MODULE_1__["default"].call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._dirty = true;
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]._internals,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine.globals,
			_easeNone = new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"](null, null, 1, 0),
			p = TimelineMax.prototype = new _TimelineLite_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
			
		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = "2.0.2";
		
		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return _TimelineLite_js__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.invalidate.call(this);
		};
		
		p.addCallback = function(callback, position, params, scope) {
			return this.add( _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].delayedCall(0, callback, params, scope), position);
		};
		
		p.removeCallback = function(callback, position) {
			if (callback) {
				if (position == null) {
					this._kill(null, callback);
				} else {
					var a = this.getTweensOf(callback, false),
						i = a.length,
						time = this._parseTimeOrLabel(position);
					while (--i > -1) {
						if (a[i]._startTime === time) {
							a[i]._enabled(false, false);
						}
					}
				}
			}
			return this;
		};

		p.removePause = function(position) {
			return this.removeCallback(_TimelineLite_js__WEBPACK_IMPORTED_MODULE_1__["default"]._internals.pauseCallback, position);
		};

		p.tweenTo = function(position, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, useFrames:this.usesFrames(), immediateRender:false, lazy:false},
				Engine = (vars.repeat && _globals.TweenMax) || _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"],
				duration, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(position);
			duration = (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001;
			t = new Engine(this, duration, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time !== t.target.time() && duration === t.duration() && !t.isFromTo) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale ).render(t.time(), true, true); //render() right away to ensure that things look right, especially in the case of .tweenTo(0).
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					vars.onStart.apply(vars.onStartScope || vars.callbackScope || t, vars.onStartParams || []); //don't use t._callback("onStart") or it'll point to the copy.onStart and we'll get a recursion error.
				}
			};
			return t;
		};

		p.tweenFromTo = function(fromPosition, toPosition, vars) {
			vars = vars || {};
			fromPosition = this._parseTimeOrLabel(fromPosition);
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], callbackScope:this};
			vars.immediateRender = (vars.immediateRender !== false);
			var t = this.tweenTo(toPosition, vars);
			t.isFromTo = 1; //to ensure we don't mess with the duration in the onStart (we've got the start and end values here, so lock it in)
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);
		};
		
		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var prevTime = this._time,
				totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				dur = this._duration,
				prevTotalTime = this._totalTime,
				prevStart = this._startTime, 
				prevTimeScale = this._timeScale, 
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused, 
				prevCycle = this._cycle, 
				tween, isComplete, next, callback, internalForce, cycleDuration, pauseTween, curTime;
			if (prevTime !== this._time) { //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
				time += this._time - prevTime;
			}
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && this._first) {
						internalForce = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = time = 0;
				} else {
					this._time = dur;
					time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
				}
				
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || (time < 0 && prevRawPrevTime >= 0)) && !this._locked)) { //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration timeline (yeah, very rare)
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) {
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (prevRawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (dur || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}
				
			} else {
				if (dur === 0 && prevRawPrevTime < 0) { //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
					internalForce = true;
				}
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						cycleDuration = dur + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) !== 0) {
							this._time = dur - this._time;
						}
						if (this._time > dur) {
							this._time = dur;
							time = dur + 0.0001; //to avoid occasional floating point rounding error
						} else if (this._time < 0) {
							this._time = time = 0;
						} else {
							time = this._time;
						}
					}
				}

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					time = this._time;
					if (time >= prevTime || (this._repeat && prevCycle !== this._cycle)) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween && pauseTween._startTime < dur) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

			}
			
			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example, 
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So 
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work. 
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;
				
				this._totalTime = prevCycle * dur;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += dur;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.
				
				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;
				this.render(prevTime, suppressEvents, (dur === 0));
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this._cycle = recCycle; //in case the onRepeat alters the playhead or invalidates(), we shouldn't stay locked or use the previous cycle.
						this._locked = false;
						this._callback("onRepeat");
					}
				}
				if (prevTime !== this._time) { //in case there's a callback like onComplete in a nested tween/timeline that changes the playhead position, like via seek(), we should just abort.
					return;
				}
				if (wrap) {
					this._cycle = prevCycle; //if there's an onRepeat, we reverted this above, so make sure it's set properly again. We also unlocked in that scenario, so reset that too.
					this._locked = true;
					prevTime = (backwards) ? dur + 0.0001 : -0.0001;
					this.render(prevTime, true, false);
				}
				this._locked = false;
				if (this._paused && !prevPaused) { //if the render() triggered callback that paused this timeline, we should abort (very rare, but possible)
					return;
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
			}

			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._totalTime !== prevTotalTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}
			
			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0 || !this._totalDuration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}
			
			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};
		
		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [], 
				all = this.getChildren(nested, tweens, timelines), 
				cnt = 0, 
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				if (tween.isActive()) {
					a[cnt++] = tween;
				}
			}
			return a;
		};
		
		
		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		};
		
		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		};
		
		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		};

		p.invalidate = function() {
			this._locked = false; //unlock and set cycle in case invalidate() is called from inside an onRepeat
			return _TimelineLite_js__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.invalidate.call(this);
		};

		
//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------
		
		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? (this._time / this.duration()) || 0 : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};
		
		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? (this._totalTime / this.totalDuration()) || 0 : this.totalTime( this.totalDuration() * value, suppressEvents);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					_TimelineLite_js__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat === -1 || !value) ? this : this.timeScale( this.totalDuration() / value );
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		};
		
		return TimelineMax;
		
	}, true);

var TimelineMax = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].TimelineMax;


/***/ }),

/***/ "./node_modules/gsap/TweenLite.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/TweenLite.js ***!
  \****************************************/
/*! exports provided: _gsScope, TweenLite, globals, default, SimpleTimeline, Animation, Ease, Linear, Power0, Power1, Power2, Power3, Power4, TweenPlugin, EventDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module, global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_gsScope", function() { return _gsScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenLite", function() { return TweenLite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globals", function() { return globals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TweenLite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleTimeline", function() { return SimpleTimeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ease", function() { return Ease; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Linear", function() { return Linear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power0", function() { return Power0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power1", function() { return Power1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power2", function() { return Power2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power3", function() { return Power3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power4", function() { return Power4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenPlugin", function() { return TweenPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDispatcher", function() { return EventDispatcher; });
/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

/* ES6 changes:
	- declare and export _gsScope at top.
	- set var TweenLite = the result of the main function
	- export default TweenLite at the bottom
	- return TweenLite at the bottom of the main function
	- pass in _gsScope as the first parameter of the main function (which is actually at the bottom)
	- remove the "export to multiple environments" in Definition().
 */
var _gsScope = (typeof(window) !== "undefined") ? window : ( true && module.exports && typeof(global) !== "undefined") ? global : undefined || {};

var TweenLite = (function(window, moduleName) {

		"use strict";
		var _exports = {},
			_doc = window.document,
			_globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
		if (_globals.TweenLite) {
			return _globals.TweenLite; //in case the core set of classes is already loaded, don't instantiate twice.
		}
		var _namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_tinyNum = 0.0000000001,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++])) {}
				return b;
			},
			_emptyFunc = function() {},
			_isArray = (function() { //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,
					array = toString.call([]);
				return function(obj) {
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};
			}()),
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/TweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/TweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							/*
							if (typeof(module) !== "undefined" && module.exports) { //node
								if (ns === moduleName) {
									module.exports = _exports[moduleName] = cl;
									for (i in _exports) {
										cl[i] = _exports[i];
									}
								} else if (_exports[moduleName]) {
									_exports[moduleName][n] = cl;
								}
							} else if (typeof(define) === "function" && define.amd){ //AMD
								define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
							}
							*/
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				if (i > 1) {
					list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
				}
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener) {
						if (listener.up) {
							listener.c.call(listener.s || t, {type:type, target:t});
						} else {
							listener.c.call(listener.s || t);
						}
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();},
			_lastUpdate = _getTime();

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame) ? "auto" : false,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_tickWord = "tick", //helps reduce gc burden
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					var elapsed = _getTime() - _lastUpdate,
						overlap, dispatch;
					if (elapsed > _lagThreshold) {
						_startTime += elapsed - _adjustedLag;
					}
					_lastUpdate += elapsed;
					_self.time = (_lastUpdate - _startTime) / 1000;
					overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						dispatch = true;
					}
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);
					}
					if (dispatch) {
						_self.dispatchEvent(_tickWord);
					}
				};

			EventDispatcher.call(_self);
			_self.time = _self.frame = 0;
			_self.tick = function() {
				_tick(true);
			};

			_self.lagSmoothing = function(threshold, adjustedLag) {
				if (!arguments.length) { //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
					return (_lagThreshold < 1 / _tinyNum);
				}
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			};

			_self.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			_self.wake = function(seamless) {
				if (_id !== null) {
					_self.sleep();
				} else if (seamless) {
					_startTime += -_lastUpdate + (_lastUpdate = _getTime());
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			_self.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			_self.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(vars.delay) || 0;
				this._timeScale = 1;
				this._active = (vars.immediateRender === true);
				this.data = vars.data;
				this._reversed = (vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;


		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {
				if (_tickerActive && _getTime() - _lastUpdate > 2000 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) { //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
					_ticker.wake();
				}
				var t = setTimeout(_checkTimeout, 2000);
				if (t.unref) {
					// allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
					t.unref();
				}
			};
		_checkTimeout();


		p.play = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (atTime != null) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (from != null) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function(time, suppressEvents, force) {
			//stub - we override this method in subclasses.
		};

		p.invalidate = function() {
			this._time = this._totalTime = 0;
			this._initted = this._gc = false;
			this._rawPrevTime = -1;
			if (this._gc || !this.timeline) {
				this._enabled(true);
			}
			return this;
		};

		p.isActive = function() {
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
				startTime = this._startTime,
				rawTime;
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - 0.0000001));
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = this.isActive();
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

		p._swapSelfInParams = function(params) {
			var i = params.length,
				copy = params.concat();
			while (--i > -1) {
				if (params[i] === "{self}") {
					copy[i] = this;
				}
			}
			return copy;
		};

		p._callback = function(type) {
			var v = this.vars,
				callback = v[type],
				params = v[type + "Params"],
				scope = v[type + "Scope"] || v.callbackScope || this,
				l = params ? params.length : 0;
			switch (l) { //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
				case 0: callback.call(scope); break;
				case 1: callback.call(scope, params[0]); break;
				case 2: callback.call(scope, params[0], params[1]); break;
				default: callback.apply(scope, params);
			}
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if ((type || "").substr(0,2) === "on") {
				var v = this.vars;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {
						while (tl._timeline) {
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
								tl.totalTime(tl._totalTime, true);
							}
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time || this._duration === 0) {
					if (_lazyTweens.length) {
						_lazyRender();
					}
					this.render(time, suppressEvents, false);
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();
					}
				}
			}
			return this;
		};

		p.progress = p.totalProgress = function(value, suppressEvents) {
			var duration = this.duration();
			return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.endTime = function(includeRepeats) {
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			var pauseTime, t;
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				pauseTime = this._pauseTime;
				t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			t = this.timeline;
			while (t && t.timeline) { //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
				t._dirty = true;
				t.totalDuration();
				t = t.timeline;
			}
			return this;
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			var tl = this._timeline,
				raw, elapsed;
			if (value != this._paused) if (tl) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				raw = tl.rawTime();
				elapsed = raw - this._pauseTime;
				if (!value && tl.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = this.isActive();
				if (!value && elapsed !== 0 && this._initted && this.duration()) {
					raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
					this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = p._recent = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = this.rawTime() - (child._timeline.rawTime() - child._pauseTime);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			this._recent = child;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				tween._next = tween._prev = tween.timeline = null;
				if (tween === this._recent) {
					this._recent = this._last;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused && !tween._gc)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};

/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(Math.min(0, -this._delay)); //in case delay is negative
				}
			}, true),
			_isSelector = function(v) {
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = p._lazy = false;

		TweenLite.version = "2.0.2";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = 120;
		TweenLite.lagSmoothing = function(threshold, adjustedLag) {
			_ticker.lagSmoothing(threshold, adjustedLag);
		};

		TweenLite.selector = window.$ || window.jQuery || function(e) {
			var selector = window.$ || window.jQuery;
			if (selector) {
				TweenLite.selector = selector;
				return selector(e);
			}
			if (!_doc) { //in some dev environments (like Angular 6), GSAP gets loaded before the document is defined! So re-query it here if/when necessary.
				_doc = window.document;
			}
			return (!_doc) ? e : (_doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};

		var _lazyTweens = [],
			_lazyLookup = {},
			_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_relExp = /[\+-]=-?[\.\d]/,
			//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
			_setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val;
				while (pt) {
					val = !pt.blob ? pt.c * v + pt.s : (v === 1 && this.end != null) ? this.end : v ? this.join("") : this.start;
					if (pt.m) {
						val = pt.m.call(this._tween, val, this._target || pt.t, this._tween);
					} else if (val < min) if (val > -min && !pt.blob) { //prevents issues with converting very small numbers to strings in the browser
						val = 0;
					}
					if (!pt.f) {
						pt.t[pt.p] = val;
					} else if (pt.fp) {
						pt.t[pt.p](pt.fp, val);
					} else {
						pt.t[pt.p](val);
					}
					pt = pt._next;
				}
			},
			//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
			_blobDif = function(start, end, filter, pt) {
				var a = [],
					charIndex = 0,
					s = "",
					color = 0,
					startNums, endNums, num, i, l, nonNumbers, currentNum;
				a.start = start;
				a.end = end;
				start = a[0] = start + ""; //ensure values are strings
				end = a[1] = end + "";
				if (filter) {
					filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
					start = a[0];
					end = a[1];
				}
				a.length = 0;
				startNums = start.match(_numbersExp) || [];
				endNums = end.match(_numbersExp) || [];
				if (pt) {
					pt._next = null;
					pt.blob = 1;
					a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
				}
				l = endNums.length;
				for (i = 0; i < l; i++) {
					currentNum = endNums[i];
					nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
					s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
					charIndex += nonNumbers.length;
					if (color) { //sense rgba() values and round them.
						color = (color + 1) % 5;
					} else if (nonNumbers.substr(-5) === "rgba(") {
						color = 1;
					}
					if (currentNum === startNums[i] || startNums.length <= i) {
						s += currentNum;
					} else {
						if (s) {
							a.push(s);
							s = "";
						}
						num = parseFloat(startNums[i]);
						a.push(num);
						a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, m:(color && color < 4) ? Math.round : 0};
						//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
					}
					charIndex += currentNum.length;
				}
				s += end.substr(charIndex);
				if (s) {
					a.push(s);
				}
				a.setRatio = _setRatio;
				if (_relExp.test(end)) { //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
					a.end = null;
				}
				return a;
			},
			//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
			_addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
				if (typeof(end) === "function") {
					end = end(index || 0, target);
				}
				var type = typeof(target[prop]),
					getterName = (type !== "function") ? "" : ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3)),
					s = (start !== "get") ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
					isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
					pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, m:(!mod ? 0 : (typeof(mod) === "function") ? mod : Math.round), pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
					blob;

				if (typeof(s) !== "number" || (typeof(end) !== "number" && !isRelative)) {
					if (funcParam || isNaN(s) || (!isRelative && isNaN(end)) || typeof(s) === "boolean" || typeof(end) === "boolean") {
						//a blob (string that has multiple numbers in it)
						pt.fp = funcParam;
						blob = _blobDif(s, (isRelative ? (parseFloat(pt.s) + pt.c) + (pt.s + "").replace(/[0-9\-\.]/g, "") : end), stringFilter || TweenLite.defaultStringFilter, pt);
						pt = {t: blob, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: overwriteProp || prop, pr: 0, m: 0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
					} else {
						pt.s = parseFloat(s);
						if (!isRelative) {
							pt.c = (parseFloat(end) - pt.s) || 0;
						}
					}
				}
				if (pt.c) { //only add it to the linked list if there's a change.
					if ((pt._next = this._firstPT)) {
						pt._next._prev = pt;
					}
					this._firstPT = pt;
					return pt;
				}
			},
			_internals = TweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = _internals.tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1, id:1, yoyoEase:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
			_nextGCFrame = 30,
			_lazyRender = _internals.lazyRender = function() {
				var i = _lazyTweens.length,
					tween;
				_lazyLookup = {};
				while (--i > -1) {
					tween = _lazyTweens[i];
					if (tween && tween._lazy !== false) {
						tween.render(tween._lazy[0], tween._lazy[1], true);
						tween._lazy = false;
					}
				}
				_lazyTweens.length = 0;
			};

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

		Animation._updateRoot = TweenLite.render = function() {
				var i, a, p;
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();
				}
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {
					_lazyRender();
				}
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
				var func = overwrittenTween.vars.onOverwrite, r1, r2;
				if (func) {
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				func = TweenLite.onOverwrite;
				if (func) {
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				return (r1 !== false && r2 !== false);
			},
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) {
								if (curTween._kill(null, target, tween)) {
									changed = true;
								}
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _tinyNum,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					l = curTween._firstPT; //we need to discern if there were property tweens originally; if they all get removed in the next line's _kill() call, the tween should be killed. See https://github.com/greensock/GreenSock-JS/issues/278
					if (mode === 2) if (curTween._kill(props, target, tween)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted && l)) {
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {
							continue;
						}
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				immediate = !!v.immediateRender,
				ease = v.ease,
				i, initPlugins, pt, p, startVars, l;
			if (v.startAt) {
				if (this._startAt) {
					this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					this._startAt.kill();
				}
				startVars = {};
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];
				}
				startVars.data = "isStart";
				startVars.overwrite = false;
				startVars.immediateRender = true;
				startVars.lazy = (immediate && v.lazy !== false);
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				startVars.onUpdate = v.onUpdate;
				startVars.onUpdateParams = v.onUpdateParams;
				startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
				this._startAt = TweenLite.to(this.target || {}, 0, startVars);
				if (immediate) {
					if (this._time > 0) {
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt.kill();
					this._startAt = null;
				} else {
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;
					}
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = TweenLite.to(this.target, 0, pt);
					if (!immediate) {
						this._startAt._init(); //ensures that the initial values are recorded
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {
							this._startAt = null;
						}
					} else if (this._time === 0) {
						return;
					}
				}
			}
			this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {
				this._ease = ease.config.apply(ease, v.easeParams);
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				l = this._targets.length;
				for (i = 0; i < l; i++) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null), i) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
			var p, i, initPlugins, plugin, pt, v;
			if (target == null) {
				return false;
			}

			if (_lazyLookup[target._gsTweenID]) {
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
			}

			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				v = this.vars[p];
				if (_reservedProps[p]) {
					if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {
						this.vars[p] = v = this._swapSelfInParams(v, this);
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					//m - mod           [function | 0]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority, m:0};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else {
					propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, rawPrevTime;
			if (time >= duration - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed ) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted || (this._startAt && this._startAt.progress())) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / duration);
				}
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
					this._time = this._totalTime = prevTime;
					this._rawPrevTime = prevRawPrevTime;
					_lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				this._lazy = false;
			}
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, true, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
					this._callback("onUpdate");
				}
			}
			if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					this._startAt.render(time, true, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};

		p._kill = function(vars, target, overwritingTween) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				this._lazy = false;
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
				firstPT = this._firstPT,
				i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i], overwritingTween)) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
						for (p in killProps) {
							if (propLookup[p]) {
								if (!killed) {
									killed = [];
								}
								killed.push(p);
							}
						}
						if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;
						}
					}

					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
								if (pt.f) {
									pt.t[pt.p](pt.s);
								} else {
									pt.t[pt.p] = pt.s;
								}
								changed = true;
							}
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted && firstPT) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;
			this._propLookup = (this._targets) ? {} : [];
			Animation.prototype.invalidate.call(this);
			if (this.vars.immediateRender) {
				this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(Math.min(0, -this._delay)); //in case delay is negative.
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.getTweensOf = function(target, onlyActive) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else if (target._gsTweenID) {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {
						a.splice(i, 1);
					}
				}
			}
			return a || [];
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
			if (typeof(onlyActive) === "object") {
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
				onlyActive = false;
			}
			var a = TweenLite.getTweensOf(target, onlyActive),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.19.0";
		TweenPlugin.API = 2;
		p._firstPT = null;
		p._addTween = _addPropTween;
		p.setRatio = _setRatio;

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._mod = p._roundProps = function(lookup) {
			var pt = this._firstPT,
				val;
			while (pt) {
				val = lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ]);
				if (val && typeof(val) === "function") { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					if (pt.f === 2) {
						pt.t._applyPT.m = val;
					} else {
						pt.m = val;
					}
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_mod", mod:"_mod", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: " + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

		return TweenLite;

})(_gsScope, "TweenLite");

var globals = _gsScope.GreenSockGlobals;
var nonGlobals = globals.com.greensock;

var SimpleTimeline = nonGlobals.core.SimpleTimeline;
var Animation = nonGlobals.core.Animation;
var Ease = globals.Ease;
var Linear = globals.Linear;
var Power0 = Linear;
var Power1 = globals.Power1;
var Power2 = globals.Power2;
var Power3 = globals.Power3;
var Power4 = globals.Power4;
var TweenPlugin = globals.TweenPlugin;
var EventDispatcher = nonGlobals.events.EventDispatcher;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/gsap/TweenMax.js":
/*!***************************************!*\
  !*** ./node_modules/gsap/TweenMax.js ***!
  \***************************************/
/*! exports provided: TweenMax, default, TweenLite, TimelineLite, TimelineMax, CSSPlugin, AttrPlugin, BezierPlugin, DirectionalRotationPlugin, RoundPropsPlugin, TweenPlugin, Ease, Power0, Power1, Power2, Power3, Power4, Linear, Back, Elastic, Bounce, RoughEase, SlowMo, SteppedEase, Circ, Expo, Sine, ExpoScaleEase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenMax", function() { return TweenMax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TweenMax; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenLite", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenPlugin", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["TweenPlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ease", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power0", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power0"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power1", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power2", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power3", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power4", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Linear", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Linear"]; });

/* harmony import */ var _TweenMaxBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TweenMaxBase.js */ "./node_modules/gsap/TweenMaxBase.js");
/* harmony import */ var _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CSSPlugin.js */ "./node_modules/gsap/CSSPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSSPlugin", function() { return _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _AttrPlugin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AttrPlugin.js */ "./node_modules/gsap/AttrPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttrPlugin", function() { return _AttrPlugin_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _RoundPropsPlugin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RoundPropsPlugin.js */ "./node_modules/gsap/RoundPropsPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RoundPropsPlugin", function() { return _RoundPropsPlugin_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _DirectionalRotationPlugin_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DirectionalRotationPlugin.js */ "./node_modules/gsap/DirectionalRotationPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectionalRotationPlugin", function() { return _DirectionalRotationPlugin_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _TimelineLite_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TimelineLite.js */ "./node_modules/gsap/TimelineLite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineLite", function() { return _TimelineLite_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _TimelineMax_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TimelineMax.js */ "./node_modules/gsap/TimelineMax.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineMax", function() { return _TimelineMax_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _BezierPlugin_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BezierPlugin.js */ "./node_modules/gsap/BezierPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BezierPlugin", function() { return _BezierPlugin_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _EasePack_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EasePack.js */ "./node_modules/gsap/EasePack.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Back", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Back"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Elastic", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Elastic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bounce", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Bounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RoughEase", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["RoughEase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlowMo", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["SlowMo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SteppedEase", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["SteppedEase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Circ", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Circ"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Expo", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Expo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sine", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Sine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpoScaleEase", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["ExpoScaleEase"]; });

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/












//the following two lines are designed to prevent tree shaking of the classes that were historically included with TweenMax (otherwise, folks would have to reference CSSPlugin, for example, to ensure their CSS-related animations worked)
var TweenMax = _TweenMaxBase_js__WEBPACK_IMPORTED_MODULE_1__["default"];
TweenMax._autoActivated = [_TimelineLite_js__WEBPACK_IMPORTED_MODULE_6__["default"], _TimelineMax_js__WEBPACK_IMPORTED_MODULE_7__["default"], _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_2__["default"], _AttrPlugin_js__WEBPACK_IMPORTED_MODULE_3__["default"], _BezierPlugin_js__WEBPACK_IMPORTED_MODULE_8__["default"], _RoundPropsPlugin_js__WEBPACK_IMPORTED_MODULE_4__["default"], _DirectionalRotationPlugin_js__WEBPACK_IMPORTED_MODULE_5__["default"], _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Back"], _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Elastic"], _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Bounce"], _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["RoughEase"], _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["SlowMo"], _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["SteppedEase"], _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Circ"], _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Expo"], _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Sine"], _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["ExpoScaleEase"]];





/***/ }),

/***/ "./node_modules/gsap/TweenMaxBase.js":
/*!*******************************************!*\
  !*** ./node_modules/gsap/TweenMaxBase.js ***!
  \*******************************************/
/*! exports provided: TweenMax, TweenMaxBase, default, TweenLite, Ease, Power0, Power1, Power2, Power3, Power4, Linear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenMax", function() { return TweenMax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenMaxBase", function() { return TweenMaxBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TweenMax; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenLite", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ease", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power0", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power0"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power1", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power2", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power3", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power4", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Linear", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Linear"]; });

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/




_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine("TweenMax", ["core.Animation","core.SimpleTimeline","TweenLite"], function() {

		var _slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i]) : val[i % val.length];
				}
				delete vars.cycle;
			},
			TweenMax = function(target, duration, vars) {
				_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, target, duration, vars);
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true || !!this.vars.yoyoEase);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				if (this._repeat) {
					this._uncache(true); //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.
				}
				this.render = TweenMax.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]._internals,
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			p = TweenMax.prototype = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].to({}, 0.1, {}),
			_blankArray = [];

		TweenMax.version = "2.0.2";
		p.constructor = TweenMax;
		p.kill()._gc = false;
		TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].killTweensOf;
		TweenMax.getTweensOf = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].getTweensOf;
		TweenMax.lagSmoothing = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].lagSmoothing;
		TweenMax.ticker = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].ticker;
		TweenMax.render = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].render;

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true || !!this.vars.yoyoEase);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._yoyoEase = null;
			this._uncache(true);
			return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.invalidate.call(this);
		};

		p.updateTo = function(vars, resetDuration) {
			var curRatio = this.ratio,
				immediate = this.vars.immediateRender || vars.immediateRender,
				p;
			if (resetDuration && this._startTime < this._timeline._time) {
				this._startTime = this._timeline._time;
				this._uncache(false);
				if (this._gc) {
					this._enabled(true, false);
				} else {
					this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			for (p in vars) {
				this.vars[p] = vars[p];
			}
			if (this._initted || immediate) {
				if (resetDuration) {
					this._initted = false;
					if (immediate) {
						this.render(0, true, true);
					}
				} else {
					if (this._gc) {
						this._enabled(true, false);
					}
					if (this._notifyPluginsOfEnabled && this._firstPT) {
						_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks
					}
					if (this._time / this._duration > 0.998) { //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards.
						var prevTime = this._totalTime;
						this.render(0, true, false);
						this._initted = false;
						this.render(prevTime, true, false);
					} else {
						this._initted = false;
						this._init();
						if (this._time > 0 || immediate) {
							var inv = 1 / (1 - curRatio),
								pt = this._firstPT, endValue;
							while (pt) {
								endValue = pt.s + pt.c;
								pt.c *= inv;
								pt.s = endValue - pt.c;
								pt = pt._next;
							}
						}
					}
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			if (!this._initted) if (this._duration === 0 && this.vars.repeat) { //zero duration tweens that render immediately have render() called from TweenLite's constructor, before TweenMax's constructor has finished setting _repeat, _repeatDelay, and _yoyo which are critical in determining totalDuration() so we need to call invalidate() which is a low-kb way to get those set properly.
				this.invalidate();
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevTotalTime = this._totalTime,
				prevCycle = this._cycle,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, cycleDuration, r, type, pow, rawPrevTime, yoyoEase;
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = totalDur;
				this._cycle = this._repeat;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				} else {
					this._time = duration;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				}
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = this._cycle = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTotalTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;
				if (this._repeat !== 0) {
					cycleDuration = duration + this._repeatDelay;
					this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)
					if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
						this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
					}
					this._time = this._totalTime - (this._cycle * cycleDuration);
					if (this._yoyo) if ((this._cycle & 1) !== 0) {
						this._time = duration - this._time;
						yoyoEase = this._yoyoEase || this.vars.yoyoEase; //note: we don't set this._yoyoEase in _init() like we do other properties because it's TweenMax-specific and doing it here allows us to optimize performance (most tweens don't have a yoyoEase). Note that we also must skip the this.ratio calculation further down right after we _init() in this function, because we're doing it here.
						if (yoyoEase) {
							if (!this._yoyoEase) {
								if (yoyoEase === true && !this._initted) { //if it's not initted and yoyoEase is true, this._ease won't have been populated yet so we must discern it here.
									yoyoEase = this.vars.ease;
									this._yoyoEase = yoyoEase = !yoyoEase ? _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].defaultEase : (yoyoEase instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]) ? yoyoEase : (typeof(yoyoEase) === "function") ? new _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"](yoyoEase, this.vars.easeParams) : _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"].map[yoyoEase] || _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].defaultEase;
								} else {
									this._yoyoEase = yoyoEase = (yoyoEase === true) ? this._ease : (yoyoEase instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]) ? yoyoEase : _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"].map[yoyoEase];
								}
							}
							this.ratio = yoyoEase ? 1 - yoyoEase.getRatio((duration - this._time) / duration) : 0;
						}
					}
					if (this._time > duration) {
						this._time = duration;
					} else if (this._time < 0) {
						this._time = 0;
					}
				}
				if (this._easeType && !yoyoEase) {
					r = this._time / duration;
					type = this._easeType;
					pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (this._time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else if (!yoyoEase) {
					this.ratio = this._ease.getRatio(this._time / duration);
				}

			}

			if (prevTime === this._time && !force && prevCycle === this._cycle) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) { //we stick it in the queue for rendering at the very end of the tick - this is a performance optimization because browsers invalidate styles and force a recalculation if you read, write, and then read style data (so it's better to read/read/read/write/write/write than read/write/read/write/read/write). The down side, of course, is that usually you WANT things to render immediately because you may have code running right after that which depends on the change. Like imagine running TweenLite.set(...) and then immediately after that, creating a nother tween that animates the same property to another value; the starting values of that 2nd tween wouldn't be accurate if lazy is true.
					this._time = prevTime;
					this._totalTime = prevTotalTime;
					this._rawPrevTime = prevRawPrevTime;
					this._cycle = prevCycle;
					TweenLiteInternals.lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete && !yoyoEase) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd && !yoyoEase) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) {
				this._lazy = false;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTotalTime === 0) {
				if (this._initted === 2 && time > 0) {
					//this.invalidate();
					this._init(); //will just apply overwriting since _initted of (2) means it was a from() tween that had immediateRender:true
				}
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, true, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._totalTime !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}

			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._totalTime !== prevTotalTime || callback) {
					this._callback("onUpdate");
				}
			}
			if (this._cycle !== prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {
				this._callback("onRepeat");
			}
			if (callback) if (!this._gc || force) { //check gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};

//---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------

		TweenMax.to = function(target, duration, vars) {
			return new TweenMax(target, duration, vars);
		};

		TweenMax.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenMax(target, duration, vars);
		};

		TweenMax.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenMax(target, duration, toVars);
		};

		TweenMax.staggerTo = TweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			stagger = stagger || 0;
			var delay = 0,
				a = [],
				finalComplete = function() {
					if (vars.onComplete) {
						vars.onComplete.apply(vars.onCompleteScope || this, arguments);
					}
					onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
				},
				cycle = vars.cycle,
				fromCycle = (vars.startAt && vars.startAt.cycle),
				l, copy, i, p;
			if (!_isArray(targets)) {
				if (typeof(targets) === "string") {
					targets = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].selector(targets) || targets;
				}
				if (_isSelector(targets)) {
					targets = _slice(targets);
				}
			}
			targets = targets || [];
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			l = targets.length - 1;
			for (i = 0; i <= l; i++) {
				copy = {};
				for (p in vars) {
					copy[p] = vars[p];
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				if (fromCycle) {
					fromCycle = copy.startAt = {};
					for (p in vars.startAt) {
						fromCycle[p] = vars.startAt[p];
					}
					_applyCycle(copy.startAt, targets, i);
				}
				copy.delay = delay + (copy.delay || 0);
				if (i === l && onCompleteAll) {
					copy.onComplete = finalComplete;
				}
				a[i] = new TweenMax(targets[i], duration, copy);
				delay += stagger;
			}
			return a;
		};

		TweenMax.staggerFrom = TweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		TweenMax.staggerFromTo = TweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		TweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenMax(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, useFrames:useFrames, overwrite:0});
		};

		TweenMax.set = function(target, vars) {
			return new TweenMax(target, 0, vars);
		};

		TweenMax.isTweening = function(target) {
			return (_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].getTweensOf(target, true).length > 0);
		};

		var _getChildrenOf = function(timeline, includeTimelines) {
				var a = [],
					cnt = 0,
					tween = timeline._first;
				while (tween) {
					if (tween instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
						a[cnt++] = tween;
					} else {
						if (includeTimelines) {
							a[cnt++] = tween;
						}
						a = a.concat(_getChildrenOf(tween, includeTimelines));
						cnt = a.length;
					}
					tween = tween._next;
				}
				return a;
			},
			getAllTweens = TweenMax.getAllTweens = function(includeTimelines) {
				return _getChildrenOf(_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"]._rootTimeline, includeTimelines).concat( _getChildrenOf(_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"]._rootFramesTimeline, includeTimelines) );
			};

		TweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
			if (tweens == null) {
				tweens = true;
			}
			if (delayedCalls == null) {
				delayedCalls = true;
			}
			var a = getAllTweens((timelines != false)),
				l = a.length,
				allTrue = (tweens && delayedCalls && timelines),
				isDC, tween, i;
			for (i = 0; i < l; i++) {
				tween = a[i];
				if (allTrue || (tween instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["SimpleTimeline"]) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					if (complete) {
						tween.totalTime(tween._reversed ? 0 : tween.totalDuration());
					} else {
						tween._enabled(false, false);
					}
				}
			}
		};

		TweenMax.killChildTweensOf = function(parent, complete) {
			if (parent == null) {
				return;
			}
			var tl = TweenLiteInternals.tweenLookup,
				a, curParent, p, i, l;
			if (typeof(parent) === "string") {
				parent = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].selector(parent) || parent;
			}
			if (_isSelector(parent)) {
				parent = _slice(parent);
			}
			if (_isArray(parent)) {
				i = parent.length;
				while (--i > -1) {
					TweenMax.killChildTweensOf(parent[i], complete);
				}
				return;
			}
			a = [];
			for (p in tl) {
				curParent = tl[p].target.parentNode;
				while (curParent) {
					if (curParent === parent) {
						a = a.concat(tl[p].tweens);
					}
					curParent = curParent.parentNode;
				}
			}
			l = a.length;
			for (i = 0; i < l; i++) {
				if (complete) {
					a[i].totalTime(a[i].totalDuration());
				}
				a[i]._enabled(false, false);
			}
		};

		var _changePause = function(pause, tweens, delayedCalls, timelines) {
			tweens = (tweens !== false);
			delayedCalls = (delayedCalls !== false);
			timelines = (timelines !== false);
			var a = getAllTweens(timelines),
				allTrue = (tweens && delayedCalls && timelines),
				i = a.length,
				isDC, tween;
			while (--i > -1) {
				tween = a[i];
				if (allTrue || (tween instanceof _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["SimpleTimeline"]) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					tween.paused(pause);
				}
			}
		};

		TweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
			_changePause(true, tweens, delayedCalls, timelines);
		};

		TweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
			_changePause(false, tweens, delayedCalls, timelines);
		};

		TweenMax.globalTimeScale = function(value) {
			var tl = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"]._rootTimeline,
				t = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].ticker.time;
			if (!arguments.length) {
				return tl._timeScale;
			}
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
			tl = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"]._rootFramesTimeline;
			t = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"].ticker.frame;
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
			tl._timeScale = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"]._rootTimeline._timeScale = value;
			return value;
		};


//---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------

		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};

		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, suppressEvents);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated TweenMax and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
			}
			return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Animation"].prototype.duration.call(this, value);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					//instead of Infinity, we use 999999999999 so that we can accommodate reverses
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};

		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};

		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};

		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};


		return TweenMax;

	}, true);

var TweenMax = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].TweenMax;
var TweenMaxBase = TweenMax;




/***/ }),

/***/ "./node_modules/gsap/index.js":
/*!************************************!*\
  !*** ./node_modules/gsap/index.js ***!
  \************************************/
/*! exports provided: default, TweenLite, TweenMax, TimelineLite, TimelineMax, CSSPlugin, AttrPlugin, BezierPlugin, RoundPropsPlugin, DirectionalRotationPlugin, TweenPlugin, Ease, Power0, Power1, Power2, Power3, Power4, Linear, Back, Elastic, Bounce, RoughEase, SlowMo, SteppedEase, Circ, Expo, Sine, ExpoScaleEase, _gsScope */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenLite", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenPlugin", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["TweenPlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ease", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power0", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power0"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power1", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power2", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power3", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power4", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Power4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Linear", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Linear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_gsScope", function() { return _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]; });

/* harmony import */ var _TimelineLite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimelineLite.js */ "./node_modules/gsap/TimelineLite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineLite", function() { return _TimelineLite_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _TimelineMax_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TimelineMax.js */ "./node_modules/gsap/TimelineMax.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineMax", function() { return _TimelineMax_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _TweenMax_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TweenMax.js */ "./node_modules/gsap/TweenMax.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _TweenMax_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenMax", function() { return _TweenMax_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CSSPlugin.js */ "./node_modules/gsap/CSSPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSSPlugin", function() { return _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _AttrPlugin_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AttrPlugin.js */ "./node_modules/gsap/AttrPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttrPlugin", function() { return _AttrPlugin_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _RoundPropsPlugin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RoundPropsPlugin.js */ "./node_modules/gsap/RoundPropsPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RoundPropsPlugin", function() { return _RoundPropsPlugin_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _DirectionalRotationPlugin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DirectionalRotationPlugin.js */ "./node_modules/gsap/DirectionalRotationPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectionalRotationPlugin", function() { return _DirectionalRotationPlugin_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _BezierPlugin_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BezierPlugin.js */ "./node_modules/gsap/BezierPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BezierPlugin", function() { return _BezierPlugin_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _EasePack_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EasePack.js */ "./node_modules/gsap/EasePack.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Back", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Back"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Elastic", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Elastic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bounce", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Bounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RoughEase", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["RoughEase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlowMo", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["SlowMo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SteppedEase", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["SteppedEase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Circ", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Circ"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Expo", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Expo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sine", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["Sine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpoScaleEase", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_9__["ExpoScaleEase"]; });

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
















/***/ }),

/***/ "./node_modules/immediate/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/immediate/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var types = [
  __webpack_require__(/*! ./nextTick */ "./node_modules/immediate/lib/nextTick.js"),
  __webpack_require__(/*! ./mutation.js */ "./node_modules/immediate/lib/mutation.js"),
  __webpack_require__(/*! ./messageChannel */ "./node_modules/immediate/lib/messageChannel.js"),
  __webpack_require__(/*! ./stateChange */ "./node_modules/immediate/lib/stateChange.js"),
  __webpack_require__(/*! ./timeout */ "./node_modules/immediate/lib/timeout.js")
];
var draining;
var currentQueue;
var queueIndex = -1;
var queue = [];
var scheduled = false;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    nextTick();
  }
}

//named nextTick for less confusing stack traces
function nextTick() {
  if (draining) {
    return;
  }
  scheduled = false;
  draining = true;
  var len = queue.length;
  var timeout = setTimeout(cleanUpNextTick);
  while (len) {
    currentQueue = queue;
    queue = [];
    while (currentQueue && ++queueIndex < len) {
      currentQueue[queueIndex].run();
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  queueIndex = -1;
  draining = false;
  clearTimeout(timeout);
}
var scheduleDrain;
var i = -1;
var len = types.length;
while (++i < len) {
  if (types[i] && types[i].test && types[i].test()) {
    scheduleDrain = types[i].install(nextTick);
    break;
  }
}
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  var fun = this.fun;
  var array = this.array;
  switch (array.length) {
  case 0:
    return fun();
  case 1:
    return fun(array[0]);
  case 2:
    return fun(array[0], array[1]);
  case 3:
    return fun(array[0], array[1], array[2]);
  default:
    return fun.apply(null, array);
  }

};
module.exports = immediate;
function immediate(task) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(task, args));
  if (!scheduled && !draining) {
    scheduled = true;
    scheduleDrain();
  }
}


/***/ }),

/***/ "./node_modules/immediate/lib/messageChannel.js":
/*!******************************************************!*\
  !*** ./node_modules/immediate/lib/messageChannel.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.test = function () {
  if (global.setImmediate) {
    // we can only get here in IE10
    // which doesn't handel postMessage well
    return false;
  }
  return typeof global.MessageChannel !== 'undefined';
};

exports.install = function (func) {
  var channel = new global.MessageChannel();
  channel.port1.onmessage = func;
  return function () {
    channel.port2.postMessage(0);
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/mutation.js":
/*!************************************************!*\
  !*** ./node_modules/immediate/lib/mutation.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
//based off rsvp https://github.com/tildeio/rsvp.js
//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

var Mutation = global.MutationObserver || global.WebKitMutationObserver;

exports.test = function () {
  return Mutation;
};

exports.install = function (handle) {
  var called = 0;
  var observer = new Mutation(handle);
  var element = global.document.createTextNode('');
  observer.observe(element, {
    characterData: true
  });
  return function () {
    element.data = (called = ++called % 2);
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/nextTick.js":
/*!************************************************!*\
  !*** ./node_modules/immediate/lib/nextTick.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
exports.test = function () {
  // Don't get fooled by e.g. browserify environments.
  return (typeof process !== 'undefined') && !process.browser;
};

exports.install = function (func) {
  return function () {
    process.nextTick(func);
  };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/stateChange.js":
/*!***************************************************!*\
  !*** ./node_modules/immediate/lib/stateChange.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.test = function () {
  return 'document' in global && 'onreadystatechange' in global.document.createElement('script');
};

exports.install = function (handle) {
  return function () {

    // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
    // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
    var scriptEl = global.document.createElement('script');
    scriptEl.onreadystatechange = function () {
      handle();

      scriptEl.onreadystatechange = null;
      scriptEl.parentNode.removeChild(scriptEl);
      scriptEl = null;
    };
    global.document.documentElement.appendChild(scriptEl);

    return handle;
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/timeout.js":
/*!***********************************************!*\
  !*** ./node_modules/immediate/lib/timeout.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.test = function () {
  return true;
};

exports.install = function (t) {
  return function () {
    setTimeout(t, 0);
  };
};

/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/insert-css/index.js":
/*!******************************************!*\
  !*** ./node_modules/insert-css/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function insertCss(css, options) {
    options = options || {};

    if (css === undefined) {
        throw new Error(usage);
    }

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

module.exports = insertCss;
module.exports.insertCss = insertCss;


/***/ }),

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

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/places.js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/places.js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// we need to export using commonjs for ease of usage in all
// JavaScript environments
// We therefore need to import in commonjs too. see:
// https://github.com/webpack/webpack/issues/4039

/* eslint-disable import/no-commonjs */
var places = __webpack_require__(/*! ./src/places */ "./node_modules/places.js/src/places.js");

var version = __webpack_require__(/*! ./src/version */ "./node_modules/places.js/src/version.js"); // must use module.exports to be commonJS compatible


module.exports = places.default;
module.exports.version = version.default;


/***/ }),

/***/ "./node_modules/places.js/src/configure/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/places.js/src/configure/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var extractParams = function extractParams(_ref) {
  var hitsPerPage = _ref.hitsPerPage,
      aroundLatLng = _ref.aroundLatLng,
      aroundRadius = _ref.aroundRadius,
      aroundLatLngViaIP = _ref.aroundLatLngViaIP,
      insideBoundingBox = _ref.insideBoundingBox,
      insidePolygon = _ref.insidePolygon,
      getRankingInfo = _ref.getRankingInfo,
      countries = _ref.countries,
      language = _ref.language,
      type = _ref.type;
  var extracted = {
    countries: countries,
    hitsPerPage: hitsPerPage || 5,
    language: language || navigator.language.split('-')[0],
    type: type
  };

  if (Array.isArray(countries)) {
    extracted.countries = extracted.countries.map(function (country) {
      return country.toLowerCase();
    });
  }

  if (typeof extracted.language === 'string') {
    extracted.language = extracted.language.toLowerCase();
  }

  if (aroundLatLng) {
    extracted.aroundLatLng = aroundLatLng;
  } else if (aroundLatLngViaIP !== undefined) {
    extracted.aroundLatLngViaIP = aroundLatLngViaIP;
  }

  return _objectSpread({}, extracted, {
    aroundRadius: aroundRadius,
    insideBoundingBox: insideBoundingBox,
    insidePolygon: insidePolygon,
    getRankingInfo: getRankingInfo
  });
};

var extractControls = function extractControls(_ref2) {
  var _ref2$useDeviceLocati = _ref2.useDeviceLocation,
      useDeviceLocation = _ref2$useDeviceLocati === void 0 ? false : _ref2$useDeviceLocati,
      _ref2$computeQueryPar = _ref2.computeQueryParams,
      computeQueryParams = _ref2$computeQueryPar === void 0 ? function (params) {
    return params;
  } : _ref2$computeQueryPar,
      formatInputValue = _ref2.formatInputValue,
      _ref2$onHits = _ref2.onHits,
      onHits = _ref2$onHits === void 0 ? function () {} : _ref2$onHits,
      _ref2$onError = _ref2.onError,
      onError = _ref2$onError === void 0 ? function (e) {
    throw e;
  } : _ref2$onError,
      onRateLimitReached = _ref2.onRateLimitReached;
  return {
    useDeviceLocation: useDeviceLocation,
    computeQueryParams: computeQueryParams,
    formatInputValue: formatInputValue,
    onHits: onHits,
    onError: onError,
    onRateLimitReached: onRateLimitReached
  };
};

var params = {};
var controls = {};

var configure = function configure(configuration) {
  params = extractParams(_objectSpread({}, params, configuration));
  controls = extractControls(_objectSpread({}, controls, configuration));
  return {
    params: params,
    controls: controls
  };
};

var _default = configure;
exports.default = _default;

/***/ }),

/***/ "./node_modules/places.js/src/createAutocompleteDataset.js":
/*!*****************************************************************!*\
  !*** ./node_modules/places.js/src/createAutocompleteDataset.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAutocompleteDataset;

var _createAutocompleteSource = _interopRequireDefault(__webpack_require__(/*! ./createAutocompleteSource */ "./node_modules/places.js/src/createAutocompleteSource.js"));

var _defaultTemplates = _interopRequireDefault(__webpack_require__(/*! ./defaultTemplates */ "./node_modules/places.js/src/defaultTemplates.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAutocompleteDataset(options) {
  var templates = _objectSpread({}, _defaultTemplates.default, options.templates);

  var source = (0, _createAutocompleteSource.default)(_objectSpread({}, options, {
    formatInputValue: templates.value,
    templates: undefined
  }));
  return {
    source: source,
    templates: templates,
    displayKey: 'value',
    name: 'places',
    cache: false
  };
}

/***/ }),

/***/ "./node_modules/places.js/src/createAutocompleteSource.js":
/*!****************************************************************!*\
  !*** ./node_modules/places.js/src/createAutocompleteSource.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAutocompleteSource;

var _configure = _interopRequireDefault(__webpack_require__(/*! ./configure */ "./node_modules/places.js/src/configure/index.js"));

var _formatHit = _interopRequireDefault(__webpack_require__(/*! ./formatHit */ "./node_modules/places.js/src/formatHit.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version */ "./node_modules/places.js/src/version.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAutocompleteSource(_ref) {
  var algoliasearch = _ref.algoliasearch,
      clientOptions = _ref.clientOptions,
      apiKey = _ref.apiKey,
      appId = _ref.appId,
      hitsPerPage = _ref.hitsPerPage,
      aroundLatLng = _ref.aroundLatLng,
      aroundRadius = _ref.aroundRadius,
      aroundLatLngViaIP = _ref.aroundLatLngViaIP,
      insideBoundingBox = _ref.insideBoundingBox,
      insidePolygon = _ref.insidePolygon,
      getRankingInfo = _ref.getRankingInfo,
      countries = _ref.countries,
      formatInputValue = _ref.formatInputValue,
      _ref$computeQueryPara = _ref.computeQueryParams,
      computeQueryParams = _ref$computeQueryPara === void 0 ? function (params) {
    return params;
  } : _ref$computeQueryPara,
      _ref$useDeviceLocatio = _ref.useDeviceLocation,
      useDeviceLocation = _ref$useDeviceLocatio === void 0 ? false : _ref$useDeviceLocatio,
      _ref$language = _ref.language,
      language = _ref$language === void 0 ? navigator.language.split('-')[0] : _ref$language,
      _ref$onHits = _ref.onHits,
      onHits = _ref$onHits === void 0 ? function () {} : _ref$onHits,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function (e) {
    throw e;
  } : _ref$onError,
      onRateLimitReached = _ref.onRateLimitReached,
      type = _ref.type;
  var placesClient = algoliasearch.initPlaces(appId, apiKey, clientOptions);
  placesClient.as.addAlgoliaAgent("Algolia Places ".concat(_version.default));
  var configuration = (0, _configure.default)({
    hitsPerPage: hitsPerPage,
    type: type,
    countries: countries,
    language: language,
    aroundLatLng: aroundLatLng,
    aroundRadius: aroundRadius,
    aroundLatLngViaIP: aroundLatLngViaIP,
    insideBoundingBox: insideBoundingBox,
    insidePolygon: insidePolygon,
    getRankingInfo: getRankingInfo,
    formatInputValue: formatInputValue,
    computeQueryParams: computeQueryParams,
    useDeviceLocation: useDeviceLocation,
    onHits: onHits,
    onError: onError,
    onRateLimitReached: onRateLimitReached
  });
  var params = configuration.params;
  var controls = configuration.controls;
  var userCoords;
  var tracker = null;

  if (controls.useDeviceLocation) {
    tracker = navigator.geolocation.watchPosition(function (_ref2) {
      var coords = _ref2.coords;
      userCoords = "".concat(coords.latitude, ",").concat(coords.longitude);
    });
  }

  function searcher(query, cb) {
    var searchParams = _objectSpread({}, params, {
      query: query
    });

    if (userCoords) {
      searchParams.aroundLatLng = userCoords;
    }

    return placesClient.search(controls.computeQueryParams(searchParams)).then(function (content) {
      var hits = content.hits.map(function (hit, hitIndex) {
        return (0, _formatHit.default)({
          formatInputValue: controls.formatInputValue,
          hit: hit,
          hitIndex: hitIndex,
          query: query,
          rawAnswer: content
        });
      });
      controls.onHits({
        hits: hits,
        query: query,
        rawAnswer: content
      });
      return hits;
    }).then(cb).catch(function (e) {
      if (e.statusCode === 429) {
        controls.onRateLimitReached();
        return;
      }

      controls.onError(e);
    });
  }

  searcher.configure = function (partial) {
    var updated = (0, _configure.default)(_objectSpread({}, params, controls, partial));
    params = updated.params;
    controls = updated.controls;

    if (controls.useDeviceLocation && tracker === null) {
      tracker = navigator.geolocation.watchPosition(function (_ref3) {
        var coords = _ref3.coords;
        userCoords = "".concat(coords.latitude, ",").concat(coords.longitude);
      });
    } else if (!controls.useDeviceLocation && tracker !== null) {
      navigator.geolocation.clearWatch(tracker);
      tracker = null;
      userCoords = null;
    }
  };

  return searcher;
}

/***/ }),

/***/ "./node_modules/places.js/src/createReverseGeocodingSource.js":
/*!********************************************************************!*\
  !*** ./node_modules/places.js/src/createReverseGeocodingSource.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _configure = _interopRequireDefault(__webpack_require__(/*! ./configure */ "./node_modules/places.js/src/configure/index.js"));

var _formatHit = _interopRequireDefault(__webpack_require__(/*! ./formatHit */ "./node_modules/places.js/src/formatHit.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version */ "./node_modules/places.js/src/version.js"));

var _defaultTemplates = _interopRequireDefault(__webpack_require__(/*! ./defaultTemplates */ "./node_modules/places.js/src/defaultTemplates.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filterApplicableParams = function filterApplicableParams(params) {
  var hitsPerPage = params.hitsPerPage,
      aroundLatLng = params.aroundLatLng,
      getRankingInfo = params.getRankingInfo,
      language = params.language;
  var filtered = {};

  if (typeof hitsPerPage === 'number') {
    filtered.hitsPerPage = hitsPerPage;
  }

  if (typeof language === 'string') {
    filtered.language = language;
  }

  if (typeof getRankingInfo === 'boolean') {
    filtered.getRankingInfo = getRankingInfo;
  }

  if (typeof aroundLatLng === 'string') {
    filtered.aroundLatLng = aroundLatLng;
  }

  return filtered;
};

var createReverseGeocodingSource = function createReverseGeocodingSource(_ref) {
  var algoliasearch = _ref.algoliasearch,
      clientOptions = _ref.clientOptions,
      apiKey = _ref.apiKey,
      appId = _ref.appId,
      hitsPerPage = _ref.hitsPerPage,
      aroundLatLng = _ref.aroundLatLng,
      getRankingInfo = _ref.getRankingInfo,
      _ref$formatInputValue = _ref.formatInputValue,
      formatInputValue = _ref$formatInputValue === void 0 ? _defaultTemplates.default.value : _ref$formatInputValue,
      _ref$language = _ref.language,
      language = _ref$language === void 0 ? navigator.language.split('-')[0] : _ref$language,
      _ref$onHits = _ref.onHits,
      onHits = _ref$onHits === void 0 ? function () {} : _ref$onHits,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function (e) {
    throw e;
  } : _ref$onError,
      onRateLimitReached = _ref.onRateLimitReached;
  var placesClient = algoliasearch.initPlaces(appId, apiKey, clientOptions);
  placesClient.as.addAlgoliaAgent("Algolia Places ".concat(_version.default));
  var configuration = (0, _configure.default)({
    apiKey: apiKey,
    appId: appId,
    hitsPerPage: hitsPerPage,
    aroundLatLng: aroundLatLng,
    getRankingInfo: getRankingInfo,
    language: language,
    formatInputValue: formatInputValue,
    onHits: onHits,
    onError: onError,
    onRateLimitReached: onRateLimitReached
  });
  var params = filterApplicableParams(configuration.params);
  var controls = configuration.controls;

  var searcher = function searcher(queryAroundLatLng, cb) {
    var finalAroundLatLng = queryAroundLatLng || params.aroundLatLng;

    if (!finalAroundLatLng) {
      var error = new Error('A location must be provided for reverse geocoding');
      return Promise.reject(error);
    }

    return placesClient.reverse(_objectSpread({}, params, {
      aroundLatLng: finalAroundLatLng
    })).then(function (content) {
      var hits = content.hits.map(function (hit, hitIndex) {
        return (0, _formatHit.default)({
          formatInputValue: controls.formatInputValue,
          hit: hit,
          hitIndex: hitIndex,
          query: finalAroundLatLng,
          rawAnswer: content
        });
      });
      controls.onHits({
        hits: hits,
        query: finalAroundLatLng,
        rawAnswer: content
      });
      return hits;
    }).then(cb).catch(function (e) {
      if (e.statusCode === 429) {
        controls.onRateLimitReached();
        return;
      }

      controls.onError(e);
    });
  };

  searcher.configure = function (partial) {
    var updated = (0, _configure.default)(_objectSpread({}, params, controls, partial));
    params = filterApplicableParams(updated.params);
    controls = updated.controls;
    return searcher;
  };

  return searcher;
};

var _default = createReverseGeocodingSource;
exports.default = _default;

/***/ }),

/***/ "./node_modules/places.js/src/defaultTemplates.js":
/*!********************************************************!*\
  !*** ./node_modules/places.js/src/defaultTemplates.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formatInputValue = _interopRequireDefault(__webpack_require__(/*! ./formatInputValue */ "./node_modules/places.js/src/formatInputValue.js"));

var _formatDropdownValue = _interopRequireDefault(__webpack_require__(/*! ./formatDropdownValue */ "./node_modules/places.js/src/formatDropdownValue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* babel-plugin-inline-import './icons/algolia.svg' */
var algoliaLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"117\" height=\"17\" viewBox=\"0 0 130 19\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill-rule=\"nonzero\"><path fill=\"#5468FF\" d=\"M59.399.044h13.299a2.372 2.372 0 0 1 2.377 2.364v13.234a2.372 2.372 0 0 1-2.377 2.364H59.399a2.372 2.372 0 0 1-2.377-2.364V2.403A2.368 2.368 0 0 1 59.399.044z\"/><path fill=\"#FFF\" d=\"M66.257 4.582c-2.815 0-5.1 2.272-5.1 5.078 0 2.806 2.284 5.072 5.1 5.072 2.815 0 5.1-2.272 5.1-5.078 0-2.806-2.279-5.072-5.1-5.072zm0 8.652c-1.983 0-3.593-1.602-3.593-3.574 0-1.972 1.61-3.574 3.593-3.574 1.983 0 3.593 1.602 3.593 3.574a3.582 3.582 0 0 1-3.593 3.574zm0-6.418V9.48c0 .076.082.131.153.093l2.377-1.226c.055-.027.071-.093.044-.147a2.96 2.96 0 0 0-2.465-1.487c-.055 0-.11.044-.11.104h.001zm-3.33-1.956l-.312-.31a.783.783 0 0 0-1.106 0l-.372.37a.773.773 0 0 0 0 1.1l.307.305c.049.05.121.038.164-.01.181-.246.378-.48.597-.698.225-.223.455-.42.707-.599.055-.033.06-.109.016-.158h-.001zm5.001-.806v-.616a.781.781 0 0 0-.783-.779h-1.824a.78.78 0 0 0-.783.78v.631c0 .071.066.12.137.104a5.736 5.736 0 0 1 1.588-.223c.52 0 1.035.071 1.534.207a.106.106 0 0 0 .131-.104z\"/><path fill=\"#252C61\" d=\"M5.027 10.246c0 .698-.252 1.246-.757 1.644-.505.397-1.201.596-2.089.596-.888 0-1.615-.138-2.181-.414v-1.214c.358.168.739.301 1.141.397.403.097.778.145 1.125.145.508 0 .884-.097 1.125-.29a.945.945 0 0 0 .363-.779.978.978 0 0 0-.333-.747c-.222-.204-.68-.446-1.375-.725C1.33 8.57.825 8.24.531 7.865c-.294-.372-.44-.82-.44-1.343 0-.655.233-1.17.698-1.547.465-.376 1.09-.564 1.875-.564.752 0 1.5.165 2.245.494l-.408 1.047c-.698-.294-1.321-.44-1.869-.44-.415 0-.73.09-.945.271a.89.89 0 0 0-.322.717c0 .204.043.38.129.524.086.145.227.282.424.411.197.13.551.3 1.063.51.577.24.999.464 1.268.671.269.208.465.442.591.704.125.261.188.57.188.924l-.001.002zm3.98 2.24c-.924 0-1.646-.269-2.167-.808-.521-.539-.781-1.28-.781-2.226 0-.97.242-1.733.725-2.288.483-.555 1.148-.833 1.993-.833.784 0 1.404.238 1.858.714.455.476.682 1.132.682 1.966v.682H7.359c.018.577.174 1.02.467 1.33.294.31.707.464 1.241.464.351 0 .678-.033.98-.099a5.1 5.1 0 0 0 .975-.33v1.026a3.865 3.865 0 0 1-.935.312 5.723 5.723 0 0 1-1.08.091zm7.46-.107l-.252-.827h-.043c-.286.362-.575.608-.865.74-.29.13-.662.195-1.117.195-.584 0-1.039-.158-1.367-.473-.328-.315-.491-.76-.491-1.337 0-.612.227-1.074.682-1.386.455-.312 1.148-.482 2.079-.51l1.026-.032v-.317c0-.38-.089-.663-.266-.85-.177-.189-.452-.283-.824-.283-.304 0-.596.045-.875.134a6.68 6.68 0 0 0-.806.317l-.408-.902a4.414 4.414 0 0 1 1.058-.384 4.856 4.856 0 0 1 1.085-.132c.756 0 1.326.165 1.711.494.385.33.577.847.577 1.552v4.001h-.904zm5.677-6.048c.254 0 .464.018.628.054l-.124 1.176a2.383 2.383 0 0 0-.559-.064c-.505 0-.914.165-1.227.494-.313.33-.47.757-.47 1.284v3.104H19.13V6.44h.988l.167 1.047h.064c.197-.354.454-.636.771-.843a1.83 1.83 0 0 1 1.023-.312h.001zm4.125 6.155c-.899 0-1.582-.262-2.049-.787-.467-.525-.701-1.277-.701-2.259 0-.999.244-1.767.733-2.304.489-.537 1.195-.806 2.119-.806.627 0 1.191.116 1.692.35l-.381 1.014c-.534-.208-.974-.312-1.321-.312-1.028 0-1.542.682-1.542 2.046 0 .666.128 1.166.384 1.501.256.335.631.502 1.125.502a3.23 3.23 0 0 0 1.595-.419v1.101a2.53 2.53 0 0 1-.722.285 4.356 4.356 0 0 1-.932.086v.002zm8.277-.107h-1.268V8.727c0-.458-.092-.8-.277-1.026-.184-.226-.477-.338-.878-.338-.53 0-.919.158-1.168.475-.249.317-.373.848-.373 1.593v2.95H29.32V4.022h1.262v2.122c0 .34-.021.704-.064 1.09h.081a1.76 1.76 0 0 1 .717-.666c.306-.158.663-.236 1.072-.236 1.439 0 2.159.725 2.159 2.175v3.873l-.001-.002zm7.648-6.048c.741 0 1.319.27 1.732.806.414.537.62 1.291.62 2.261 0 .974-.209 1.732-.628 2.275-.419.542-1.001.814-1.746.814-.752 0-1.336-.27-1.751-.81h-.086l-.231.703h-.945V4.023h1.262V6.01l-.021.655-.032.553h.054c.401-.59.992-.886 1.772-.886zm2.917.107h1.375l1.208 3.368c.183.48.304.931.365 1.354h.043c.032-.197.091-.436.177-.717.086-.28.541-1.616 1.364-4.004h1.364l-2.541 6.73c-.462 1.235-1.232 1.853-2.31 1.853-.279 0-.551-.03-.816-.09v-1c.19.043.406.064.65.064.609 0 1.037-.353 1.284-1.058l.22-.559-2.385-5.94h.002zm-3.244.924c-.508 0-.875.15-1.098.448-.224.3-.339.8-.346 1.501v.086c0 .723.115 1.247.344 1.571.229.324.603.486 1.123.486.448 0 .787-.177 1.018-.532.231-.354.346-.867.346-1.536 0-1.35-.462-2.025-1.386-2.025l-.001.001zm-27.28 4.157c.458 0 .826-.128 1.104-.384.278-.256.416-.615.416-1.077v-.516l-.763.032c-.594.021-1.027.121-1.297.298s-.406.448-.406.814c0 .265.079.47.236.615.158.145.394.218.709.218h.001zM8.775 7.287c-.401 0-.722.127-.964.381s-.386.625-.432 1.112h2.696c-.007-.49-.125-.862-.354-1.115-.229-.252-.544-.379-.945-.379l-.001.001z\"/></g><path fill=\"#5468FF\" d=\"M102.162 13.784c0 1.455-.372 2.517-1.123 3.193-.75.676-1.895 1.013-3.44 1.013-.564 0-1.736-.109-2.673-.316l.345-1.689c.783.163 1.819.207 2.361.207.86 0 1.473-.174 1.84-.523.367-.349.548-.866.548-1.553v-.349a6.374 6.374 0 0 1-.838.316 4.151 4.151 0 0 1-1.194.158 4.515 4.515 0 0 1-1.616-.278 3.385 3.385 0 0 1-1.254-.817 3.744 3.744 0 0 1-.811-1.35c-.192-.54-.29-1.505-.29-2.213 0-.665.104-1.498.307-2.054a3.925 3.925 0 0 1 .904-1.433 4.124 4.124 0 0 1 1.441-.926 5.31 5.31 0 0 1 1.945-.365c.696 0 1.337.087 1.961.191a15.86 15.86 0 0 1 1.588.332v8.456h-.001zm-5.955-4.206c0 .893.197 1.885.592 2.3.394.413.904.62 1.528.62.34 0 .663-.049.964-.142a2.75 2.75 0 0 0 .734-.332v-5.29a8.531 8.531 0 0 0-1.413-.18c-.778-.022-1.369.294-1.786.801-.411.507-.619 1.395-.619 2.223zm16.121 0c0 .72-.104 1.264-.318 1.858a4.389 4.389 0 0 1-.904 1.52c-.389.42-.854.746-1.402.975-.548.23-1.391.36-1.813.36-.422-.005-1.26-.125-1.802-.36a4.088 4.088 0 0 1-1.397-.975 4.486 4.486 0 0 1-.909-1.52 5.037 5.037 0 0 1-.329-1.858c0-.719.099-1.41.318-1.999.219-.588.526-1.09.92-1.509.394-.42.865-.74 1.402-.97a4.547 4.547 0 0 1 1.786-.338 4.69 4.69 0 0 1 1.791.338c.548.23 1.019.55 1.402.97.389.42.69.921.909 1.51.23.587.345 1.28.345 1.998h.001zm-2.192.005c0-.92-.203-1.689-.597-2.223-.394-.539-.948-.806-1.654-.806-.707 0-1.26.267-1.654.806-.394.54-.586 1.302-.586 2.223 0 .932.197 1.558.592 2.098.394.545.948.812 1.654.812.707 0 1.26-.272 1.654-.812.394-.545.592-1.166.592-2.098h-.001zm6.963 4.708c-3.511.016-3.511-2.822-3.511-3.274L113.583.95l2.142-.338v10.003c0 .256 0 1.88 1.375 1.885v1.793h-.001zM120.873 14.291h-2.153V5.095l2.153-.338zM119.794 3.75c.718 0 1.304-.579 1.304-1.292 0-.714-.581-1.29-1.304-1.29-.723 0-1.304.577-1.304 1.29 0 .714.586 1.291 1.304 1.291zm6.431 1.012c.707 0 1.304.087 1.786.262.482.174.871.42 1.156.73.285.311.488.735.608 1.182.126.447.186.937.186 1.476v5.481a25.24 25.24 0 0 1-1.495.251c-.668.098-1.419.147-2.251.147a6.829 6.829 0 0 1-1.517-.158 3.213 3.213 0 0 1-1.178-.507 2.455 2.455 0 0 1-.761-.904c-.181-.37-.274-.893-.274-1.438 0-.523.104-.855.307-1.215.208-.36.487-.654.838-.883a3.609 3.609 0 0 1 1.227-.49 7.073 7.073 0 0 1 2.202-.103c.263.027.537.076.833.147v-.349c0-.245-.027-.479-.088-.697a1.486 1.486 0 0 0-.307-.583c-.148-.169-.34-.3-.581-.392a2.536 2.536 0 0 0-.915-.163c-.493 0-.942.06-1.353.131-.411.071-.75.153-1.008.245l-.257-1.749c.268-.093.668-.185 1.183-.278a9.335 9.335 0 0 1 1.66-.142h-.001zm.179 7.73c.657 0 1.145-.038 1.484-.104V10.22a5.097 5.097 0 0 0-1.978-.104c-.241.033-.46.098-.652.191a1.167 1.167 0 0 0-.466.392c-.121.17-.175.267-.175.523 0 .501.175.79.493.981.323.196.75.29 1.293.29h.001zM84.108 4.816c.707 0 1.304.087 1.786.262.482.174.871.42 1.156.73.29.316.487.735.608 1.182.126.447.186.937.186 1.476v5.481a25.24 25.24 0 0 1-1.495.251c-.668.098-1.419.147-2.251.147a6.829 6.829 0 0 1-1.517-.158 3.213 3.213 0 0 1-1.178-.507 2.455 2.455 0 0 1-.761-.904c-.181-.37-.274-.893-.274-1.438 0-.523.104-.855.307-1.215.208-.36.487-.654.838-.883a3.609 3.609 0 0 1 1.227-.49 7.073 7.073 0 0 1 2.202-.103c.257.027.537.076.833.147v-.349c0-.245-.027-.479-.088-.697a1.486 1.486 0 0 0-.307-.583c-.148-.169-.34-.3-.581-.392a2.536 2.536 0 0 0-.915-.163c-.493 0-.942.06-1.353.131-.411.071-.75.153-1.008.245l-.257-1.749c.268-.093.668-.185 1.183-.278a8.89 8.89 0 0 1 1.66-.142h-.001zm.185 7.736c.657 0 1.145-.038 1.484-.104V10.28a5.097 5.097 0 0 0-1.978-.104c-.241.033-.46.098-.652.191a1.167 1.167 0 0 0-.466.392c-.121.17-.175.267-.175.523 0 .501.175.79.493.981.318.191.75.29 1.293.29h.001zm8.683 1.738c-3.511.016-3.511-2.822-3.511-3.274L89.46.948 91.602.61v10.003c0 .256 0 1.88 1.375 1.885v1.793h-.001z\"/></g></svg>";

/* babel-plugin-inline-import './icons/osm.svg' */
var osmLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\">\n  <path fill=\"#797979\" fill-rule=\"evenodd\" d=\"M6.577.5L5.304.005 2.627 1.02 0 0l.992 2.767-.986 2.685.998 2.76-1 2.717.613.22 3.39-3.45.563.06.726-.69s-.717-.92-.91-1.86c.193-.146.184-.14.355-.285C4.1 1.93 6.58.5 6.58.5zm-4.17 11.354l.22.12 2.68-1.05 2.62 1.04 2.644-1.03 1.02-2.717-.33-.944s-1.13 1.26-3.44.878c-.174.29-.25.37-.25.37s-1.11-.31-1.683-.89c-.573.58-.795.71-.795.71l.08.634-2.76 2.89zm6.26-4.395c1.817 0 3.29-1.53 3.29-3.4 0-1.88-1.473-3.4-3.29-3.4s-3.29 1.52-3.29 3.4c0 1.87 1.473 3.4 3.29 3.4z\"/>\n</svg>\n";
var _default = {
  footer: "<div class=\"ap-footer\">\n  <a href=\"https://www.algolia.com/places\" title=\"Search by Algolia\" class=\"ap-footer-algolia\">".concat(algoliaLogo.trim(), "</a>\n  using <a href=\"https://community.algolia.com/places/documentation.html#license\" class=\"ap-footer-osm\" title=\"Algolia Places data \xA9 OpenStreetMap contributors\">").concat(osmLogo.trim(), " <span>data</span></a>\n  </div>"),
  value: _formatInputValue.default,
  suggestion: _formatDropdownValue.default
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/places.js/src/errors.js":
/*!**********************************************!*\
  !*** ./node_modules/places.js/src/errors.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  multiContainers: "Algolia Places: 'container' must point to a single <input> element.\nExample: instantiate the library twice if you want to bind two <inputs>.\n\nSee https://community.algolia.com/places/documentation.html#api-options-container",
  badContainer: "Algolia Places: 'container' must point to an <input> element.\n\nSee https://community.algolia.com/places/documentation.html#api-options-container",
  rateLimitReached: "Algolia Places: Current rate limit reached.\n\nSign up for a free 100,000 queries/month account at\nhttps://www.algolia.com/users/sign_up/places.\n\nOr upgrade your 100,000 queries/month plan by contacting us at\nhttps://community.algolia.com/places/contact.html."
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/places.js/src/findCountryCode.js":
/*!*******************************************************!*\
  !*** ./node_modules/places.js/src/findCountryCode.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findCountryCode;

function findCountryCode(tags) {
  for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
    var tag = tags[tagIndex];
    var find = tag.match(/country\/(.*)?/);

    if (find) {
      return find[1];
    }
  }

  return undefined;
}

/***/ }),

/***/ "./node_modules/places.js/src/findType.js":
/*!************************************************!*\
  !*** ./node_modules/places.js/src/findType.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findType;

function findType(tags) {
  var types = {
    country: 'country',
    city: 'city',
    'amenity/bus_station': 'busStop',
    'amenity/townhall': 'townhall',
    'railway/station': 'trainStation',
    'aeroway/aerodrome': 'airport',
    'aeroway/terminal': 'airport',
    'aeroway/gate': 'airport'
  };

  for (var t in types) {
    if (tags.indexOf(t) !== -1) {
      return types[t];
    }
  }

  return 'address';
}

/***/ }),

/***/ "./node_modules/places.js/src/formatDropdownValue.js":
/*!***********************************************************!*\
  !*** ./node_modules/places.js/src/formatDropdownValue.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDropdownValue;

/* babel-plugin-inline-import './icons/address.svg' */
var addressIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n";

/* babel-plugin-inline-import './icons/city.svg' */
var cityIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 18 19\"><path d=\"M12 9V3L9 0 6 3v2H0v14h18V9h-6zm-8 8H2v-2h2v2zm0-4H2v-2h2v2zm0-4H2V7h2v2zm6 8H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V7h2v2zm0-4H8V3h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z\"/></svg>\n";

/* babel-plugin-inline-import './icons/country.svg' */
var countryIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n  <path d=\"M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L7 13v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H6V8h2c.55 0 1-.45 1-1V5h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\"/>\n</svg>\n";

/* babel-plugin-inline-import './icons/bus.svg' */
var busIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 54.9 50.5\"><path d=\"M9.6 12.7H8.5c-2.3 0-4.1 1.9-4.1 4.1v1.1c0 2.2 1.8 4 4 4.1v21.7h-.7c-1.3 0-2.3 1-2.3 2.3h7.1c0-1.3-1-2.3-2.3-2.3h-.5V22.1c2.2-.1 4-1.9 4-4.1v-1.1c0-2.3-1.8-4.2-4.1-4.2zM46 7.6h-7.5c0-1.8-1.5-3.3-3.3-3.3h-3.6c-1.8 0-3.3 1.5-3.3 3.3H21c-2.5 0-4.6 2-4.6 4.6v26.3c0 1.7 1.3 3.1 3 3.1h.8v1.6c0 1.7 1.4 3.1 3.1 3.1 1.7 0 3-1.4 3-3.1v-1.6h14.3v1.6c0 1.7 1.4 3.1 3.1 3.1 1.7 0 3.1-1.4 3.1-3.1v-1.6h.8c1.7 0 3.1-1.4 3.1-3.1V12.2c-.2-2.5-2.2-4.6-4.7-4.6zm-27.4 4.6c0-1.3 1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4v.3c0 1.3-1.1 2.4-2.4 2.4H21c-1.3 0-2.4-1.1-2.4-2.4v-.3zM21 38c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7zm0-10.1c-1.3 0-2.4-1.1-2.4-2.4v-6.6c0-1.3 1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4v6.6c0 1.3-1.1 2.4-2.4 2.4H21zm24.8 10c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7z\"/></svg>\n";

/* babel-plugin-inline-import './icons/train.svg' */
var trainIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 15 20\">\n  <path d=\"M13.105 20l-2.366-3.354H4.26L1.907 20H0l3.297-4.787c-1.1-.177-2.196-1.287-2.194-2.642V2.68C1.1 1.28 2.317-.002 3.973 0h7.065c1.647-.002 2.863 1.28 2.86 2.676v9.895c.003 1.36-1.094 2.47-2.194 2.647L15 20h-1.895zM6.11 2h2.78c.264 0 .472-.123.472-.27v-.46c0-.147-.22-.268-.472-.27H6.11c-.252.002-.47.123-.47.27v.46c0 .146.206.27.47.27zm6.26 3.952V4.175c-.004-.74-.5-1.387-1.436-1.388H4.066c-.936 0-1.43.648-1.436 1.388v1.777c-.002.86.644 1.384 1.436 1.388h6.868c.793-.004 1.44-.528 1.436-1.388zm-8.465 5.386c-.69-.003-1.254.54-1.252 1.21-.002.673.56 1.217 1.252 1.222.697-.006 1.26-.55 1.262-1.22-.002-.672-.565-1.215-1.262-1.212zm8.42 1.21c-.005-.67-.567-1.213-1.265-1.21-.69-.003-1.253.54-1.25 1.21-.003.673.56 1.217 1.25 1.222.698-.006 1.26-.55 1.264-1.22z\"/>\n</svg>\n";

/* babel-plugin-inline-import './icons/townhall.svg' */
var townhallIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\"><path d=\"M12 .6L2.5 6.9h18.9L12 .6zM3.8 8.2c-.7 0-1.3.6-1.3 1.3v8.8L.3 22.1c-.2.3-.3.5-.3.6 0 .6.8.6 1.3.6h21.5c.4 0 1.3 0 1.3-.6 0-.2-.1-.3-.3-.6l-2.2-3.8V9.5c0-.7-.6-1.3-1.3-1.3H3.8zm2.5 2.5c.7 0 1.1.6 1.3 1.3v7.6H5.1V12c0-.7.5-1.3 1.2-1.3zm5.7 0c.7 0 1.3.6 1.3 1.3v7.6h-2.5V12c-.1-.7.5-1.3 1.2-1.3zm5.7 0c.7 0 1.3.6 1.3 1.3v7.6h-2.5V12c-.1-.7.5-1.3 1.2-1.3z\"/></svg>\n";

/* babel-plugin-inline-import './icons/plane.svg' */
var planeIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\"><path d=\"M22.9 1.1s1.3.3-4.3 6.5l.7 3.8.2-.2c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-1.2 1.2.3 1.7.1-.1c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-1.1 1.1c.2 1.9.3 3.6.1 4.5 0 0-1.2 1.2-1.8.5 0 0-2.3-7.7-3.8-11.1-5.9 6-6.4 5.6-6.4 5.6s1.2 3.8-.2 5.2l-2.3-4.3h.1l-4.3-2.3c1.3-1.3 5.2-.2 5.2-.2s-.5-.4 5.6-6.3C8.9 7.7 1.2 5.5 1.2 5.5c-.7-.7.5-1.8.5-1.8.9-.2 2.6-.1 4.5.1l1.1-1.1c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l1.7.3 1.2-1.2c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-.2.2 3.8.7c6.2-5.5 6.5-4.2 6.5-4.2z\"/></svg>\n";
var icons = {
  address: addressIcon,
  city: cityIcon,
  country: countryIcon,
  busStop: busIcon,
  trainStation: trainIcon,
  townhall: townhallIcon,
  airport: planeIcon
};

function formatDropdownValue(_ref) {
  var type = _ref.type,
      highlight = _ref.highlight;
  var name = highlight.name,
      administrative = highlight.administrative,
      city = highlight.city,
      country = highlight.country;
  var out = "<span class=\"ap-suggestion-icon\">".concat(icons[type].trim(), "</span>\n<span class=\"ap-name\">").concat(name, "</span>\n<span class=\"ap-address\">\n  ").concat([city, administrative, country].filter(function (token) {
    return token !== undefined;
  }).join(', '), "</span>").replace(/\s*\n\s*/g, ' ');
  return out;
}

/***/ }),

/***/ "./node_modules/places.js/src/formatHit.js":
/*!*************************************************!*\
  !*** ./node_modules/places.js/src/formatHit.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatHit;

var _findCountryCode = _interopRequireDefault(__webpack_require__(/*! ./findCountryCode */ "./node_modules/places.js/src/findCountryCode.js"));

var _findType = _interopRequireDefault(__webpack_require__(/*! ./findType */ "./node_modules/places.js/src/findType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getBestHighlightedForm(highlightedValues) {
  var defaultValue = highlightedValues[0].value; // collect all other matches

  var bestAttributes = [];

  for (var i = 1; i < highlightedValues.length; ++i) {
    if (highlightedValues[i].matchLevel !== 'none') {
      bestAttributes.push({
        index: i,
        words: highlightedValues[i].matchedWords
      });
    }
  } // no matches in this attribute, retrieve first value


  if (bestAttributes.length === 0) {
    return defaultValue;
  } // sort the matches by `desc(words), asc(index)`


  bestAttributes.sort(function (a, b) {
    if (a.words > b.words) {
      return -1;
    } else if (a.words < b.words) {
      return 1;
    }

    return a.index - b.index;
  }); // and append the best match to the first value

  return bestAttributes[0].index === 0 ? "".concat(defaultValue, " (").concat(highlightedValues[bestAttributes[1].index].value, ")") : "".concat(highlightedValues[bestAttributes[0].index].value, " (").concat(defaultValue, ")");
}

function getBestPostcode(postcodes, highlightedPostcodes) {
  var defaultValue = highlightedPostcodes[0].value; // collect all other matches

  var bestAttributes = [];

  for (var i = 1; i < highlightedPostcodes.length; ++i) {
    if (highlightedPostcodes[i].matchLevel !== 'none') {
      bestAttributes.push({
        index: i,
        words: highlightedPostcodes[i].matchedWords
      });
    }
  } // no matches in this attribute, retrieve first value


  if (bestAttributes.length === 0) {
    return {
      postcode: postcodes[0],
      highlightedPostcode: defaultValue
    };
  } // sort the matches by `desc(words)`


  bestAttributes.sort(function (a, b) {
    if (a.words > b.words) {
      return -1;
    } else if (a.words < b.words) {
      return 1;
    }

    return a.index - b.index;
  });
  var postcode = postcodes[bestAttributes[0].index];
  return {
    postcode: postcode,
    highlightedPostcode: highlightedPostcodes[bestAttributes[0].index].value
  };
}

function formatHit(_ref) {
  var formatInputValue = _ref.formatInputValue,
      hit = _ref.hit,
      hitIndex = _ref.hitIndex,
      query = _ref.query,
      rawAnswer = _ref.rawAnswer;

  try {
    var name = hit.locale_names[0];
    var country = hit.country;
    var administrative = hit.administrative && hit.administrative[0] !== name ? hit.administrative[0] : undefined;
    var city = hit.city && hit.city[0] !== name ? hit.city[0] : undefined;
    var suburb = hit.suburb && hit.suburb[0] !== name ? hit.suburb[0] : undefined;
    var county = hit.county && hit.county[0] !== name ? hit.county[0] : undefined;

    var _ref2 = hit.postcode ? getBestPostcode(hit.postcode, hit._highlightResult.postcode) : {
      postcode: undefined,
      highlightedPostcode: undefined
    },
        postcode = _ref2.postcode,
        highlightedPostcode = _ref2.highlightedPostcode;

    var highlight = {
      name: getBestHighlightedForm(hit._highlightResult.locale_names),
      city: city ? getBestHighlightedForm(hit._highlightResult.city) : undefined,
      administrative: administrative ? getBestHighlightedForm(hit._highlightResult.administrative) : undefined,
      country: country ? hit._highlightResult.country.value : undefined,
      suburb: suburb ? getBestHighlightedForm(hit._highlightResult.suburb) : undefined,
      county: county ? getBestHighlightedForm(hit._highlightResult.county) : undefined,
      postcode: highlightedPostcode
    };
    var suggestion = {
      name: name,
      administrative: administrative,
      county: county,
      city: city,
      suburb: suburb,
      country: country,
      countryCode: (0, _findCountryCode.default)(hit._tags),
      type: (0, _findType.default)(hit._tags),
      latlng: {
        lat: hit._geoloc.lat,
        lng: hit._geoloc.lng
      },
      postcode: postcode,
      postcodes: hit.postcode ? hit.postcode : undefined
    }; // this is the value to put inside the <input value=

    var value = formatInputValue(suggestion);
    return _objectSpread({}, suggestion, {
      highlight: highlight,
      hit: hit,
      hitIndex: hitIndex,
      query: query,
      rawAnswer: rawAnswer,
      value: value
    });
  } catch (e) {
    /* eslint-disable no-console */
    console.error('Could not parse object', hit);
    console.error(e);
    /* eslint-enable no-console */

    return {
      value: 'Could not parse object'
    };
  }
}

/***/ }),

/***/ "./node_modules/places.js/src/formatInputValue.js":
/*!********************************************************!*\
  !*** ./node_modules/places.js/src/formatInputValue.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatInputValue;

function formatInputValue(_ref) {
  var administrative = _ref.administrative,
      city = _ref.city,
      country = _ref.country,
      name = _ref.name,
      type = _ref.type;
  var out = "".concat(name).concat(type !== 'country' && country !== undefined ? ',' : '', "\n ").concat(city ? "".concat(city, ",") : '', "\n ").concat(administrative ? "".concat(administrative, ",") : '', "\n ").concat(country ? country : '').replace(/\s*\n\s*/g, ' ').trim();
  return out;
}

/***/ }),

/***/ "./node_modules/places.js/src/navigatorLanguage.js":
/*!*********************************************************!*\
  !*** ./node_modules/places.js/src/navigatorLanguage.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// polyfill for navigator.language (IE <= 10)
// not polyfilled by https://cdn.polyfill.io/v2/docs/
// Defined: http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#navigatorlanguage
//   with allowable values at http://www.ietf.org/rfc/bcp/bcp47.txt
// Note that the HTML spec suggests that anonymizing services return "en-US" by default for
//   user privacy (so your app may wish to provide a means of changing the locale)
if (!('language' in navigator)) {
  navigator.language = // IE 10 in IE8 mode on Windows 7 uses upper-case in
  // navigator.userLanguage country codes but per
  // http://msdn.microsoft.com/en-us/library/ie/ms533052.aspx (via
  // http://msdn.microsoft.com/en-us/library/ie/ms534713.aspx), they
  // appear to be in lower case, so we bring them into harmony with navigator.language.
  navigator.userLanguage && navigator.userLanguage.replace(/-[a-z]{2}$/, String.prototype.toUpperCase) || 'en-US'; // Default for anonymizing services: http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#navigatorlanguage
}

/***/ }),

/***/ "./node_modules/places.js/src/places.js":
/*!**********************************************!*\
  !*** ./node_modules/places.js/src/places.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = places;

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "./node_modules/events/events.js"));

var _algoliasearchLite = _interopRequireDefault(__webpack_require__(/*! algoliasearch/src/browser/builds/algoliasearchLite */ "./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js"));

var _autocomplete = _interopRequireDefault(__webpack_require__(/*! autocomplete.js */ "./node_modules/autocomplete.js/index.js"));

__webpack_require__(/*! ./navigatorLanguage */ "./node_modules/places.js/src/navigatorLanguage.js");

var _createAutocompleteDataset = _interopRequireDefault(__webpack_require__(/*! ./createAutocompleteDataset */ "./node_modules/places.js/src/createAutocompleteDataset.js"));

var _insertCss = _interopRequireDefault(__webpack_require__(/*! insert-css */ "./node_modules/insert-css/index.js"));

var _errors = _interopRequireDefault(__webpack_require__(/*! ./errors */ "./node_modules/places.js/src/errors.js"));

var _createReverseGeocodingSource = _interopRequireDefault(__webpack_require__(/*! ./createReverseGeocodingSource */ "./node_modules/places.js/src/createReverseGeocodingSource.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* babel-plugin-inline-import './icons/clear.svg' */
var clearIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M.566 1.698L0 1.13 1.132 0l.565.566L6 4.868 10.302.566 10.868 0 12 1.132l-.566.565L7.132 6l4.302 4.3.566.568L10.868 12l-.565-.566L6 7.132l-4.3 4.302L1.13 12 0 10.868l.566-.565L4.868 6 .566 1.698z\"/></svg>\n";

/* babel-plugin-inline-import './icons/address.svg' */
var pinIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n";

/* babel-plugin-inline-import './places.css' */
var css = ".algolia-places {\n  width: 100%;\n}\n\n.ap-input, .ap-hint {\n  width: 100%;\n  padding-right: 35px;\n  padding-left: 16px;\n  line-height: 40px;\n  height: 40px;\n  border: 1px solid #CCC;\n  border-radius: 3px;\n  outline: none;\n  font: inherit;\n  appearance: none;\n  -webkit-appearance: none;\n  box-sizing: border-box;\n}\n\n.ap-input::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n.ap-input::-ms-clear {\n  display: none;\n}\n\n.ap-input:hover ~ .ap-input-icon svg,\n.ap-input:focus ~ .ap-input-icon svg,\n.ap-input-icon:hover svg {\n  fill: #aaaaaa;\n}\n\n.ap-dropdown-menu {\n  width: 100%;\n  background: #ffffff;\n  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  margin-top: 3px;\n  overflow: hidden;\n}\n\n.ap-suggestion {\n  cursor: pointer;\n  height: 46px;\n  line-height: 46px;\n  padding-left: 18px;\n  overflow: hidden;\n}\n\n.ap-suggestion em {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.ap-address {\n  font-size: smaller;\n  margin-left: 12px;\n  color: #aaaaaa;\n}\n\n.ap-suggestion-icon {\n  margin-right: 10px;\n  width: 14px;\n  height: 20px;\n  vertical-align: middle;\n}\n\n.ap-suggestion-icon svg {\n  -webkit-transform: scale(0.9) translateY(2px);\n          transform: scale(0.9) translateY(2px);\n  fill: #cfcfcf;\n}\n\n.ap-input-icon {\n  border: 0;\n  background: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 16px;\n  outline: none;\n}\n\n.ap-input-icon.ap-icon-pin {\n  cursor: initial;\n}\n\n.ap-input-icon svg {\n  fill: #cfcfcf;\n  position: absolute;\n  top: 50%;\n  right: 0;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.ap-cursor {\n  background: #efefef;\n}\n\n.ap-cursor .ap-suggestion-icon svg {\n  -webkit-transform: scale(1) translateY(2px);\n          transform: scale(1) translateY(2px);\n  fill: #aaaaaa;\n}\n\n.ap-footer {\n  opacity: .8;\n  text-align: right;\n  padding: .5em 1em .5em 0;\n  font-size: 12px;\n  line-height: 12px;\n}\n\n.ap-footer a {\n  color: inherit;\n  text-decoration: none;\n}\n\n.ap-footer a svg {\n  vertical-align: middle;\n}\n\n.ap-footer:hover {\n  opacity: 1;\n}\n";
(0, _insertCss.default)(css, {
  prepend: true
});

function places(options) {
  var container = options.container,
      style = options.style,
      _options$autocomplete = options.autocompleteOptions,
      userAutocompleteOptions = _options$autocomplete === void 0 ? {} : _options$autocomplete; // multiple DOM elements targeted

  if (container instanceof NodeList) {
    if (container.length > 1) {
      throw new Error(_errors.default.multiContainers);
    } // if single node NodeList received, resolve to the first one


    return places(_objectSpread({}, options, {
      container: container[0]
    }));
  } // container sent as a string, resolve it for multiple DOM elements issue


  if (typeof container === 'string') {
    var resolvedContainer = document.querySelectorAll(container);
    return places(_objectSpread({}, options, {
      container: resolvedContainer
    }));
  } // if not an <input>, error


  if (!(container instanceof HTMLInputElement)) {
    throw new Error(_errors.default.badContainer);
  }

  var placesInstance = new _events.default();
  var prefix = "ap".concat(style === false ? '-nostyle' : '');

  var autocompleteOptions = _objectSpread({
    autoselect: true,
    hint: false,
    cssClasses: {
      root: "algolia-places".concat(style === false ? '-nostyle' : ''),
      prefix: prefix
    },
    debug: "development" === 'development'
  }, userAutocompleteOptions);

  var autocompleteDataset = (0, _createAutocompleteDataset.default)(_objectSpread({}, options, {
    algoliasearch: _algoliasearchLite.default,
    onHits: function onHits(_ref) {
      var hits = _ref.hits,
          rawAnswer = _ref.rawAnswer,
          query = _ref.query;
      return placesInstance.emit('suggestions', {
        rawAnswer: rawAnswer,
        query: query,
        suggestions: hits
      });
    },
    onError: function onError(e) {
      return placesInstance.emit('error', e);
    },
    onRateLimitReached: function onRateLimitReached() {
      var listeners = placesInstance.listenerCount('limit');

      if (listeners === 0) {
        console.log(_errors.default.rateLimitReached); // eslint-disable-line

        return;
      }

      placesInstance.emit('limit', {
        message: _errors.default.rateLimitReached
      });
    },
    container: undefined
  }));
  var autocompleteInstance = (0, _autocomplete.default)(container, autocompleteOptions, autocompleteDataset);
  var autocompleteContainer = container.parentNode;
  var autocompleteChangeEvents = ['selected', 'autocompleted'];
  autocompleteChangeEvents.forEach(function (eventName) {
    autocompleteInstance.on("autocomplete:".concat(eventName), function (_, suggestion) {
      placesInstance.emit('change', {
        rawAnswer: suggestion.rawAnswer,
        query: suggestion.query,
        suggestion: suggestion,
        suggestionIndex: suggestion.hitIndex
      });
    });
  });
  autocompleteInstance.on('autocomplete:cursorchanged', function (_, suggestion) {
    placesInstance.emit('cursorchanged', {
      rawAnswer: suggestion.rawAnswer,
      query: suggestion.query,
      suggestion: suggestion,
      suggestionIndex: suggestion.hitIndex
    });
  });
  var clear = document.createElement('button');
  clear.setAttribute('type', 'button');
  clear.setAttribute('aria-label', 'clear');
  clear.classList.add("".concat(prefix, "-input-icon"));
  clear.classList.add("".concat(prefix, "-icon-clear"));
  clear.innerHTML = clearIcon;
  autocompleteContainer.appendChild(clear);
  clear.style.display = 'none';
  var pin = document.createElement('button');
  pin.setAttribute('type', 'button');
  pin.setAttribute('aria-label', 'focus');
  pin.classList.add("".concat(prefix, "-input-icon"));
  pin.classList.add("".concat(prefix, "-icon-pin"));
  pin.innerHTML = pinIcon;
  autocompleteContainer.appendChild(pin);
  pin.addEventListener('click', function () {
    autocompleteDataset.source.configure({
      useDeviceLocation: true
    });
    autocompleteInstance.focus();
  });
  clear.addEventListener('click', function () {
    autocompleteInstance.autocomplete.setVal('');
    autocompleteInstance.focus();
    clear.style.display = 'none';
    pin.style.display = '';
    placesInstance.emit('clear');
  });
  var previousQuery = '';

  var inputListener = function inputListener() {
    var query = autocompleteInstance.val();

    if (query === '') {
      pin.style.display = '';
      clear.style.display = 'none';

      if (previousQuery !== query) {
        placesInstance.emit('clear');
      }
    } else {
      clear.style.display = '';
      pin.style.display = 'none';
    }

    previousQuery = query;
  };

  autocompleteContainer.querySelector(".".concat(prefix, "-input")).addEventListener('input', inputListener);
  var autocompleteIsomorphicMethods = ['open', 'close', 'getVal'];
  autocompleteIsomorphicMethods.forEach(function (methodName) {
    placesInstance[methodName] = function () {
      var _autocompleteInstance;

      (_autocompleteInstance = autocompleteInstance.autocomplete)[methodName].apply(_autocompleteInstance, arguments);
    };
  });

  placesInstance.destroy = function () {
    var _autocompleteInstance2;

    autocompleteContainer.querySelector(".".concat(prefix, "-input")).removeEventListener('input', inputListener);

    (_autocompleteInstance2 = autocompleteInstance.autocomplete).destroy.apply(_autocompleteInstance2, arguments);
  };

  placesInstance.setVal = function () {
    var _autocompleteInstance3;

    previousQuery = arguments.length <= 0 ? undefined : arguments[0];

    (_autocompleteInstance3 = autocompleteInstance.autocomplete).setVal.apply(_autocompleteInstance3, arguments);
  };

  placesInstance.autocomplete = autocompleteInstance;

  placesInstance.search = function () {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return new Promise(function (resolve) {
      autocompleteDataset.source(query, resolve);
    });
  };

  placesInstance.configure = function (configuration) {
    var safeConfig = _objectSpread({}, configuration);

    delete safeConfig.onHits;
    delete safeConfig.onError;
    delete safeConfig.onRateLimitReached;
    delete safeConfig.templates;
    autocompleteDataset.source.configure(safeConfig);
    return placesInstance;
  };

  placesInstance.reverse = (0, _createReverseGeocodingSource.default)(_objectSpread({}, options, {
    algoliasearch: _algoliasearchLite.default,
    formatInputValue: (options.templates || {}).value,
    onHits: function onHits(_ref2) {
      var hits = _ref2.hits,
          rawAnswer = _ref2.rawAnswer,
          query = _ref2.query;
      return placesInstance.emit('reverse', {
        rawAnswer: rawAnswer,
        query: query,
        suggestions: hits
      });
    },
    onError: function onError(e) {
      return placesInstance.emit('error', e);
    },
    onRateLimitReached: function onRateLimitReached() {
      var listeners = placesInstance.listenerCount('limit');

      if (listeners === 0) {
        console.log(_errors.default.rateLimitReached); // eslint-disable-line

        return;
      }

      placesInstance.emit('limit', {
        message: _errors.default.rateLimitReached
      });
    }
  }));
  return placesInstance;
}

/***/ }),

/***/ "./node_modules/places.js/src/version.js":
/*!***********************************************!*\
  !*** ./node_modules/places.js/src/version.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = '1.16.1';
exports.default = _default;

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob:
    'FileReader' in self &&
    'Blob' in self &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : 'OK'
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = self.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      resolve(new Response(body, options))
    }

    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.onabort = function() {
      reject(new DOMException('Aborted', 'AbortError'))
    }

    xhr.open(request.method, request.url, true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob'
    }

    request.headers.forEach(function(value, name) {
      xhr.setRequestHeader(name, value)
    })

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!self.fetch) {
  self.fetch = fetch
  self.Headers = Headers
  self.Request = Request
  self.Response = Response
}


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
  this.scrollFunctions = [];
  this.endFunctions = [];
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
  this.scrollFunctions.forEach(function (f) {
    f();
  });
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
  this.endFunctions.forEach(function (f) {
    f();
  });
};

Scroll.prototype.addScrollFunction = function addScrollFunction(f) {
  var onEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  this.scrollFunctions.push(f);
  if (onEnd) this.endFunctions.push(f);
};

Scroll.prototype.addEndFunction = function addEndFunction(f) {
  this.endFunctions.push(f);
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

/***/ "./wp-content/themes/belend/src/js/Sprite.js":
/*!***************************************************!*\
  !*** ./wp-content/themes/belend/src/js/Sprite.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");


function Sprite(_ref) {
  var image = _ref.image,
      columns = _ref.columns,
      rows = _ref.rows,
      interval = _ref.interval,
      parent = _ref.parent,
      _ref$loop = _ref.loop,
      loop = _ref$loop === void 0 ? false : _ref$loop,
      _ref$numberEmpty = _ref.numberEmpty,
      numberEmpty = _ref$numberEmpty === void 0 ? 0 : _ref$numberEmpty;
  this.parent = parent;
  this.image = image;
  this.looped = loop;
  this.cols = columns;
  this.rows = rows;
  this.gridWidth = 100 / (this.cols - 1);
  this.gridHeight = 100 / (this.rows - 1);
  this.interval = interval;
  this.numberEmpty = numberEmpty;
  this.shouldStop = false;
  this.tl = new gsap__WEBPACK_IMPORTED_MODULE_0__["TimelineMax"]({
    paused: true,
    repeat: this.looped ? -1 : 0,
    onRepeat: this.checkShouldStop,
    onRepeatScope: this
  });
  var count = 0;
  var xpos;
  var ypos;

  for (var r = 0; r < this.rows; r += 1) {
    var _columns = r === this.rows - 1 ? this.cols - this.numberEmpty : this.cols;

    for (var c = 0; c < _columns; c += 1) {
      xpos = c * this.gridWidth;
      ypos = r * this.gridHeight;
      this.tl.set(this.image, {
        backgroundPosition: "".concat(xpos, "% ").concat(ypos, "%")
      }, count * this.interval);
      count += 1;
    }
  }
}

Sprite.prototype.reInit = function reInit() {
  this.tl.pause(0);
};

Sprite.prototype.play = function play() {
  this.tl.play();
};

Sprite.prototype.pause = function pause() {
  this.tl.pause();
};

Sprite.prototype.stopAtEnd = function stopAtEnd() {
  this.shouldStop = true;
};

Sprite.prototype.checkShouldStop = function checkShouldStop() {
  if (this.shouldStop) {
    this.pause();
    this.parent.startVideoMiddle();
  } else {
    this.tl.resume();
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Sprite);

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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  this.breakpoints = {
    xs: 0,
    s: 400,
    m: 580,
    l: 780,
    xl: 960,
    xxl: 1260
  };
  this.currentBreakpoint = '';
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

Window.prototype.setBreakpoints = function setBreakpoints() {
  var _this3 = this;

  var currentBreakpoint = '';
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["forEach"])(Object.entries(this.breakpoints), function (breakpoint) {
    var _breakpoint = _slicedToArray(breakpoint, 2),
        name = _breakpoint[0],
        value = _breakpoint[1];

    if (_this3.w > value) {
      currentBreakpoint = name;
    }
  });

  if (this.currentBreakpoint !== currentBreakpoint) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["forEach"])(Object.entries(this.breakpoints), function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          name = _ref2[0];

      document.documentElement.classList.remove("breakpoint-".concat(name));
    });
    this.currentBreakpoint = currentBreakpoint;
    document.documentElement.classList.add("breakpoint-".concat(this.currentBreakpoint));
  }
};

Window.prototype.resizeHandler = function resizeHandler() {
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["forEach"])(this.resizeFunctions, function (f) {
    f();
  });
  this.setBreakpoints();
  this.noTransition();
};

Window.prototype.addResizeFunction = function addResizeFunction(f) {
  this.resizeFunctions.push(f);
};

Window.prototype.toggleNoScroll = function toggleNoScroll(_ref3) {
  var transitionElement = _ref3.transitionElement,
      noScroll = _ref3.noScroll;

  var removeScroll = function removeScroll() {
    document.documentElement.style.top = "".concat(-window.scrollY, "px");
    document.documentElement.classList.add('no-scroll');
    transitionElement.removeEventListener('transitionend', removeScroll, false);
  };

  if (noScroll) {
    transitionElement.addEventListener('transitionend', removeScroll, false);
  } else {
    var scrollY = Math.abs(parseInt(document.documentElement.style.top.replace('px', ''), 10));
    document.documentElement.style.top = '';
    document.documentElement.classList.remove('no-scroll');
    setTimeout(function () {
      window.scrollTo(0, scrollY);
    }, 0);
  }
};

Window.prototype.launchWindow = function launchWindow() {
  var _this4 = this;

  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["requestAnimFrame"])(function () {
    _this4.resizeHandler();
  });
};

Window.prototype.init = function initWindow() {
  var _this5 = this;

  this.resizeHandler();
  window.addEventListener('resize', function () {
    _this5.launchWindow();
  }, false);
};

Window.prototype.destroyWindow = function destroyWindow() {
  var _this6 = this;

  window.removeEventListener('resize', function () {
    _this6.launchWindow();
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

var burgerHandler = function burgerHandler(win) {
  var state = {
    burgerActivated: false
  };

  var _document$getElements = document.getElementsByClassName('js-burger'),
      _document$getElements2 = _slicedToArray(_document$getElements, 1),
      burger = _document$getElements2[0];

  var _document$getElements3 = document.getElementsByClassName('js-main-navigation'),
      _document$getElements4 = _slicedToArray(_document$getElements3, 1),
      mainNav = _document$getElements4[0];

  if (!burger) return;

  var navigationToggle = function navigationToggle() {
    state.burgerActivated = !state.burgerActivated;
    burger.classList.toggle('activated');
    mainNav.classList.toggle('activated');
    mainNav.setAttribute('aria-expanded', state.burgerActivated);
    win.toggleNoScroll({
      transitionElement: mainNav,
      noScroll: state.burgerActivated
    });
  };

  burger.addEventListener('click', navigationToggle, false);

  var resizeHandler = function resizeHandler() {
    if (win.currentBreakpoint === 'xl' && state.burgerActivated) {
      navigationToggle();
    }
  };

  win.addResizeFunction(resizeHandler);
};

/* harmony default export */ __webpack_exports__["default"] = (burgerHandler);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/counter.js":
/*!****************************************************!*\
  !*** ./wp-content/themes/belend/src/js/counter.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetchData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchData */ "./wp-content/themes/belend/src/js/fetchData.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var counterAnimation = function counterAnimation() {
  var _document$getElements = document.getElementsByClassName('js-counter'),
      _document$getElements2 = _slicedToArray(_document$getElements, 1),
      counter = _document$getElements2[0];

  if (!counter) return;
  var animationDuration = 0.3;
  var number = '0';
  var maxNumber = '0';
  var randomFactor = 0;
  var divs = [];
  counter.innerText = '';

  var initCounterElements = function initCounterElements() {
    var digitsNumber = number.length;

    for (var index = 0; index < digitsNumber; index += 1) {
      var div = document.createElement('div');
      var span = document.createElement('span');
      span.innerText = number[index];
      div.appendChild(span);
      counter.appendChild(div);
    }
  };

  var animateDigit = function animateDigit(_ref) {
    var container = _ref.container,
        digit = _ref.digit;
    var isNewSpan = false;
    var span = document.createElement('span');

    var _container$getBoundin = container.getBoundingClientRect(),
        height = _container$getBoundin.height;

    span.style.position = 'absolute';
    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(span, {
      y: height
    });
    span.innerText = "".concat(digit);
    container.appendChild(span);

    var _container$getElement = container.getElementsByTagName('span'),
        _container$getElement2 = _slicedToArray(_container$getElement, 2),
        span1 = _container$getElement2[0],
        span2 = _container$getElement2[1];

    if (!span2) {
      span2 = span1;
      isNewSpan = true;
    } else {
      gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(span1, animationDuration, {
        y: -height,
        ease: gsap__WEBPACK_IMPORTED_MODULE_1__["Power3"].easeInOut
      });
    }

    span2.classList.add('colored');
    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(span2, animationDuration, {
      y: 0,
      ease: gsap__WEBPACK_IMPORTED_MODULE_1__["Power3"].easeInOut,
      onComplete: function onComplete() {
        span2.style.position = 'relative';
        span2.style.top = 0;

        if (!isNewSpan) {
          span1.remove();
        }

        span2.classList.remove('colored');
      }
    });
  }; // const insertDiv = divNumber => {
  //     const [firstDiv] = divs;
  //     for (let index = 0; index < divNumber; index += 1) {
  //         const div = document.createElement('div');
  //         counter.insertBefore(div, firstDiv);
  //     }
  //     divs = [].slice.call(counter.getElementsByTagName('div'));
  // };


  var computeNumber = function computeNumber(_ref2) {
    var newNumber = _ref2.newNumber,
        oldNumber = _ref2.oldNumber;
    var startedMoving = false;

    var timeoutAnimation = function timeoutAnimation(_ref3) {
      var index = _ref3.index,
          newDigit = _ref3.newDigit;
      var timeoutDuration = animationDuration * (index / newNumber.length) * 1000;
      setTimeout(function () {
        animateDigit({
          container: divs[index],
          digit: newDigit
        });
      }, timeoutDuration);
    };

    for (var index = 0; index < newNumber.length; index += 1) {
      var oldDigit = parseInt(oldNumber[index], 10);
      var newDigit = parseInt(newNumber[index], 10);

      if (startedMoving || oldDigit !== newDigit) {
        timeoutAnimation({
          index: index,
          newDigit: newDigit
        });
        startedMoving = true;
      }
    }
  };

  var simulateNewNumber = function simulateNewNumber() {
    var newNumber = Math.min(number + Math.ceil(Math.random() * randomFactor), maxNumber);
    computeNumber({
      newNumber: newNumber.toString(),
      oldNumber: number.toString()
    });
    number = newNumber;
  };

  var animate = function animate() {
    setTimeout(function () {
      simulateNewNumber();

      if (number < maxNumber) {
        animate();
      }
    }, 1000);
  };

  var launchCounter = function launchCounter(response) {
    animate();
  };

  document.addEventListener('revealCounter', function () {
    // maxNumber is the number collected after the api call
    maxNumber = '5345';
    number = maxNumber.replace(/[0-9]/g, '0');
    randomFactor = Math.floor(parseInt(maxNumber, 10) * 0.5);
    initCounterElements();
    divs = [].slice.call(counter.getElementsByTagName('div'));
    launchCounter();
  }, false); // fetchData.fetch({
  //     url:
  //         'https://www.pretpro.fr/wp-admin/admin-ajax.php?iobs=false&geocode=false&action=getInfos',
  //     method: 'GET',
  //     fetchParams: {
  //         mode: 'no-cors',
  //     },
  //     headersContent: {
  //         'Access-Control-Allow-Origin': '*',
  //         // 'Content-Type': 'application/json',
  //         // 'Content-Type': 'text/html',
  //         'Content-Type': 'text/plain',
  //     },
  //     cb: launchCounter,
  // });
};

/* harmony default export */ __webpack_exports__["default"] = (counterAnimation);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/fetchData.js":
/*!******************************************************!*\
  !*** ./wp-content/themes/belend/src/js/fetchData.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var fetchDataFactory = function fetchDataFactory() {
  var fetchSomeData = function fetchSomeData(_ref) {
    var url = _ref.url,
        method = _ref.method,
        _ref$fetchParams = _ref.fetchParams,
        fetchParams = _ref$fetchParams === void 0 ? {} : _ref$fetchParams,
        _ref$headersContent = _ref.headersContent,
        headersContent = _ref$headersContent === void 0 ? {} : _ref$headersContent,
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data,
        cb = _ref.cb;
    var headers = new Headers(_objectSpread({}, headersContent));

    var params = _objectSpread({
      method: method
    }, fetchParams, {
      headers: headers
    });

    if (method === 'POST' || method === 'PUT') {
      params.body = JSON.stringify(data);
    }

    fetch(url, params).then(function (response) {// console.log('TCL: fetchDataFactory -> response', response);
      // response.json()
    }).then(function (response) {
      if (cb) {
        cb(response);
      }
    });
  };

  return Object.freeze({
    fetch: fetchSomeData
  });
};

var fetchData = fetchDataFactory();
/* harmony default export */ __webpack_exports__["default"] = (fetchData);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/form.js":
/*!*************************************************!*\
  !*** ./wp-content/themes/belend/src/js/form.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scroll */ "./wp-content/themes/belend/src/js/Scroll.js");
/* harmony import */ var _placesInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./placesInput */ "./wp-content/themes/belend/src/js/placesInput.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var progress = function progress() {
  var progressbar = jQuery('#progressbar');
  var pages = jQuery('.gform_page');
  if (!progressbar.length || !pages.length) return;
  var pagesLength = jQuery('.gform_page').length;
  var currentPage = jQuery('.gform_page:visible').index('.gform_page') + 1;
  var percent = Math.round(currentPage * 100 / pagesLength);
  var width = progressbar.width() / 100 * percent > 35 ? "".concat(percent, "%") : 35;
  progressbar.html("<span style=\"width: ".concat(width, "\">").concat(percent, " %</span>"));
};

var fixedPositionOnScroll = function fixedPositionOnScroll(win) {
  var progressBar = document.getElementById('progressbar');
  var helpButton = document.getElementById('help');
  var sidebar = document.getElementById('sidebar');

  if (progressBar && sidebar && helpButton) {
    var progressBarBoundings = progressBar.getBoundingClientRect();
    var progressBarOffsetTop = progressBarBoundings.top + _Scroll__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTop;

    var fixOnScroll = function fixOnScroll() {
      if (!helpButton.classList.contains('on')) {
        // Progress bar
        if (_Scroll__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTop > progressBarOffsetTop && win.breakpoints[win.currentBreakpoint] < win.breakpoints.xl && !progressBar.classList.contains('fixed-position')) {
          sidebar.style.marginTop = "".concat(progressBarBoundings.height, "px");
          progressBar.classList.add('fixed-position');
          helpButton.classList.add('fixed-position');
        } else if (_Scroll__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTop <= progressBarOffsetTop && progressBar.classList.contains('fixed-position')) {
          sidebar.style.marginTop = '';
          progressBar.classList.remove('fixed-position');
          helpButton.classList.remove('fixed-position');
        }
      }
    };

    fixOnScroll();
    _Scroll__WEBPACK_IMPORTED_MODULE_0__["default"].addScrollFunction(fixOnScroll);
    win.addResizeFunction(function () {
      progressBarBoundings = progressBar.getBoundingClientRect();
      progressBarOffsetTop = progressBarBoundings.top + _Scroll__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTop;

      if (win.breakpoints[win.currentBreakpoint] >= win.breakpoints.xl) {
        sidebar.style.marginTop = '';
        progressBar.classList.remove('fixed-position');
      }
    });
  }
};

var layout = function layout(win) {
  jQuery('.gform_page').each(function pageLogic() {
    var pageVanilla = this;
    var page = jQuery(this);
    var emptyInputs;
    if (page.find('.gform_page_fields > ul').length <= 1) return; // sidebar

    page.prepend('<div id="sidebar" class="sidebar"></div>').find('.gform_page_fields > ul:first-child').appendTo(page.find('.sidebar')); // help

    if (page.find('.field-help').length) {
      page.find('.field-help').before('<li class="page-nav"></li>');
      page.find('.sidebar').append('<button type="button" class="btn-help" id="help"></button>');
      page.find('.sidebar').find('.btn-help').on('click', function sidebarHandleClick() {
        var _pageVanilla$getEleme = pageVanilla.getElementsByClassName('field-help'),
            _pageVanilla$getEleme2 = _slicedToArray(_pageVanilla$getEleme, 1),
            helpField = _pageVanilla$getEleme2[0];

        helpField.classList.toggle('on');
        jQuery(this).toggleClass('on');
        jQuery('#main-header').toggleClass('off');
        var noScroll = helpField.classList.contains('on'); // mainNav.setAttribute('aria-expanded', state.burgerActivated);

        win.toggleNoScroll({
          transitionElement: helpField,
          noScroll: noScroll
        });
      });
      fixedPositionOnScroll(win);
    } else {
      page.find('.main-fields').append('<li class="page-nav"></li>');
    } // nav


    page.find('.gform_page_footer').appendTo(page.find('.page-nav')); // button next step disabled

    if (page.find('.gfield_contains_required').length) {
      page.find('.gform_next_button').attr('disabled', true);
      page.find('.gfield_contains_required input').on('change input', function () {
        emptyInputs = page.find('.gfield_contains_required input').filter(function filterRequired() {
          return jQuery(this).val() == '';
        });

        if (!emptyInputs.length) {
          page.find('.gform_next_button').attr('disabled', false);
        }
      });
    }
  });
};

var formHandler = function formHandler(win) {
  jQuery(document).ready(function () {
    progress();
    layout(win);
    fixedPositionOnScroll(win);
    Object(_placesInput__WEBPACK_IMPORTED_MODULE_1__["default"])();
    jQuery(document).on('gform_post_render', function () {
      progress();
      layout(win);
      Object(_placesInput__WEBPACK_IMPORTED_MODULE_1__["default"])();
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (formHandler);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/headerScroll.js":
/*!*********************************************************!*\
  !*** ./wp-content/themes/belend/src/js/headerScroll.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scroll */ "./wp-content/themes/belend/src/js/Scroll.js");


var addClassOnScroll = function addClassOnScroll() {
  var header = document.getElementById('main-header');
  if (!header) return;
  _Scroll__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTop > 10 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
};

var headerScrollHandler = function headerScrollHandler() {
  _Scroll__WEBPACK_IMPORTED_MODULE_0__["default"].addScrollFunction(addClassOnScroll);
};

/* harmony default export */ __webpack_exports__["default"] = (headerScrollHandler);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/homeSprite.js":
/*!*******************************************************!*\
  !*** ./wp-content/themes/belend/src/js/homeSprite.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ "./wp-content/themes/belend/src/js/Sprite.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var homeSprite = function homeSprite() {
  var _document = document,
      body = _document.body;

  var _document$getElements = document.getElementsByClassName('js-banner-img'),
      _document$getElements2 = _slicedToArray(_document$getElements, 1),
      bannerImage = _document$getElements2[0];

  if (body.classList.contains('home') && bannerImage) {
    var _bannerImage$getEleme = bannerImage.getElementsByClassName('js-water'),
        _bannerImage$getEleme2 = _slicedToArray(_bannerImage$getEleme, 1),
        waterElement = _bannerImage$getEleme2[0];

    var columns = 9;
    var rows = 11; // const spriteHandler = new Sprite();

    var spUrl = bannerImage.getAttribute('data-src');
    var spImage = new Image();
    spImage.src = spUrl;

    var noDecodeApi = function noDecodeApi() {
      waterElement.style.backgroundImage = "url(".concat(spImage.src, ")");
    };

    if (waterElement) {
      if (Image.prototype.decode) {
        spImage.decode().then(function () {
          waterElement.style.backgroundImage = "url(".concat(spImage.src, ")");
        }).catch(function () {
          noDecodeApi();
        });
      } else {
        noDecodeApi();
      }

      var spriteAnimation = new _Sprite__WEBPACK_IMPORTED_MODULE_0__["default"]({
        image: waterElement,
        columns: columns,
        rows: rows,
        interval: 0.05,
        parent: bannerImage,
        loop: true,
        numberEmpty: 0
      });
      spriteAnimation.play();
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (homeSprite);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/hoverTarget.js":
/*!********************************************************!*\
  !*** ./wp-content/themes/belend/src/js/hoverTarget.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./wp-content/themes/belend/src/js/utils.js");


var hoverTarget = function hoverTarget() {
  var targets = document.getElementsByClassName('js-target');
  if (!targets.length) return;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["forEach"])(targets, function (target, index) {
    target.addEventListener('mouseenter', function () {
      Object(_utils__WEBPACK_IMPORTED_MODULE_0__["forEach"])(targets, function (t, i) {
        if (index !== i) {
          t.classList.add('hide');
        } else {
          t.classList.add('show');
        }
      });
    }, false);
    target.addEventListener('mouseleave', function () {
      Object(_utils__WEBPACK_IMPORTED_MODULE_0__["forEach"])(targets, function (t) {
        t.classList.remove('hide', 'show');
      });
    }, false);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (hoverTarget);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/io.js":
/*!***********************************************!*\
  !*** ./wp-content/themes/belend/src/js/io.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! intersection-observer */ "./node_modules/intersection-observer/intersection-observer.js");
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(intersection_observer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./wp-content/themes/belend/src/js/utils.js");



function Io() {
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
  }; // Reveal comme dans du beurre


  this.revealCDDBIn = function (entry) {
    entry.classList.add('reveal-cddb');
  };

  this.revealCDDBOut = function (entry) {
    entry.classList.remove('reveal-cddb');
  }; // Reveal plop


  this.revealPlopIn = function (entry) {
    entry.classList.add('reveal-plop');
  };

  this.revealPlopOut = function (entry) {
    entry.classList.remove('reveal-plop');
  }; // Reveal counter


  this.revealCounterIn = function () {
    var counterEvent = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["createNewEvent"])('revealCounter');
    document.dispatchEvent(counterEvent);
  };

  this.revealCounterOut = function () {};
}

/* harmony default export */ __webpack_exports__["default"] = (new Io());

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
/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./io */ "./wp-content/themes/belend/src/js/io.js");
/* harmony import */ var _Scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Scroll */ "./wp-content/themes/belend/src/js/Scroll.js");
/* harmony import */ var _Fallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Fallback */ "./wp-content/themes/belend/src/js/Fallback.js");
/* harmony import */ var _burger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./burger */ "./wp-content/themes/belend/src/js/burger.js");
/* harmony import */ var _headerScroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./headerScroll */ "./wp-content/themes/belend/src/js/headerScroll.js");
/* harmony import */ var _homeSprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./homeSprite */ "./wp-content/themes/belend/src/js/homeSprite.js");
/* harmony import */ var _mapParallax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mapParallax */ "./wp-content/themes/belend/src/js/mapParallax.js");
/* harmony import */ var _hoverTarget__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./hoverTarget */ "./wp-content/themes/belend/src/js/hoverTarget.js");
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./counter */ "./wp-content/themes/belend/src/js/counter.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./form */ "./wp-content/themes/belend/src/js/form.js");













var loadHandler = function loadHandler() {
  var noTransElem = [].slice.call(document.getElementsByClassName('element-without-transition-on-resize'));
  _Scroll__WEBPACK_IMPORTED_MODULE_3__["default"].init();
  _Window__WEBPACK_IMPORTED_MODULE_1__["default"].setNoTransitionElts(noTransElem);
  _Window__WEBPACK_IMPORTED_MODULE_1__["default"].init();
  _io__WEBPACK_IMPORTED_MODULE_2__["default"].init();
  _Fallback__WEBPACK_IMPORTED_MODULE_4__["default"].init();
  Object(_burger__WEBPACK_IMPORTED_MODULE_5__["default"])(_Window__WEBPACK_IMPORTED_MODULE_1__["default"]);
  Object(_homeSprite__WEBPACK_IMPORTED_MODULE_7__["default"])();
  Object(_mapParallax__WEBPACK_IMPORTED_MODULE_8__["default"])();
  Object(_form__WEBPACK_IMPORTED_MODULE_11__["default"])(_Window__WEBPACK_IMPORTED_MODULE_1__["default"]);
  Object(_headerScroll__WEBPACK_IMPORTED_MODULE_6__["default"])();
  Object(_hoverTarget__WEBPACK_IMPORTED_MODULE_9__["default"])();
  Object(_counter__WEBPACK_IMPORTED_MODULE_10__["default"])();
};

document.addEventListener('readystatechange', function () {
  if (document.readyState === 'complete') {
    loadHandler();
  }
}, false);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/mapParallax.js":
/*!********************************************************!*\
  !*** ./wp-content/themes/belend/src/js/mapParallax.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scroll */ "./wp-content/themes/belend/src/js/Scroll.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var MULT = 4;

var simpleParallax = function simpleParallax(_ref) {
  var intensity = _ref.intensity,
      element = _ref.element,
      boundings = _ref.boundings;
  var scrollTop = _Scroll__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTop;
  var velocity = intensity * MULT;
  var imgPos = "".concat((scrollTop - boundings.top) / velocity, "px");
  gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(element, 0.2, {
    y: imgPos,
    force3D: true
  });
};

var mapParallax = function mapParallax() {
  var _document$getElements = document.getElementsByClassName('js-map'),
      _document$getElements2 = _slicedToArray(_document$getElements, 1),
      map = _document$getElements2[0];

  if (!map) return;
  var boundings = map.getBoundingClientRect();

  var launchParallax = function launchParallax() {
    simpleParallax({
      intensity: -2,
      element: map,
      boundings: boundings
    });
  };

  launchParallax();
  _Scroll__WEBPACK_IMPORTED_MODULE_0__["default"].addScrollFunction(function () {
    launchParallax();
  });
};

/* harmony default export */ __webpack_exports__["default"] = (mapParallax);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/placesInput.js":
/*!********************************************************!*\
  !*** ./wp-content/themes/belend/src/js/placesInput.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var places_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! places.js */ "./node_modules/places.js/index.js");
/* harmony import */ var places_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(places_js__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var placesInput = function placesInput() {
  var _document$getElements = document.getElementsByClassName('field-city'),
      _document$getElements2 = _slicedToArray(_document$getElements, 1),
      cityField = _document$getElements2[0];

  if (cityField) {
    var _cityField$getElement = cityField.getElementsByTagName('input'),
        _cityField$getElement2 = _slicedToArray(_cityField$getElement, 1),
        cityInput = _cityField$getElement2[0];

    if (cityInput) {
      var placesAutocomplete = places_js__WEBPACK_IMPORTED_MODULE_0___default()({
        appId: 'VRMOTBXNFK',
        apiKey: '9c921661047800fcc960531fdf359692',
        container: cityInput
      });
      placesAutocomplete.on('change', function (e) {
        console.log(e.suggestion.value);
      });
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (placesInput);

/***/ }),

/***/ "./wp-content/themes/belend/src/js/utils.js":
/*!**************************************************!*\
  !*** ./wp-content/themes/belend/src/js/utils.js ***!
  \**************************************************/
/*! exports provided: forEach, createNewEvent, requestAnimFrame, throttle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNewEvent", function() { return createNewEvent; });
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
var createNewEvent = function createNewEvent(eventName) {
  var e = new Event(eventName);

  if (typeof Event !== 'function') {
    e = document.createEvent('Event');
    e.initEvent(eventName, true, true);
  }

  return e;
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
  createNewEvent: createNewEvent,
  requestAnimFrame: requestAnimFrame,
  throttle: throttle
});

/***/ }),

/***/ "./wp-content/themes/belend/src/scss/main.scss":
/*!*****************************************************!*\
  !*** ./wp-content/themes/belend/src/scss/main.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=main.js.map