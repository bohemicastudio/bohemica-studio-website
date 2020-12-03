'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var history = require('history');
var regexparam = _interopDefault(require('regexparam'));
var qs = _interopDefault(require('querystringify'));

function getParams(path, pattern, keys) {
  var matches = pattern.exec(path);

  if (matches) {
    var i = 0;
    var out = {};
    var length = matches.length - 1;

    while (i < length) {
      var key = keys ? keys[i] : i;
      out[key] = matches[++i] || null;
    }

    return out;
  }

  return null;
}
function locationToPath(location) {
  if (typeof location === 'object') {
    return ("" + (location.pathname || '') + (typeof location.query === 'string' ? location.query : location.query ? qs.stringify(location.query, true) : '') + (location.hash || ''));
  }

  return location;
}
var PATH_REGEXP = /^([^\?#]*)(\?[^#]*)?(#.*)?$/;
function pathToLocation(path) {
  if (typeof path === 'object') {
    var query = path.query; if ( query === void 0 ) query = {};
    return {
      pathname: path.pathname || '/',

      get query() {
        return typeof query === 'string' ? qs.parse(query) : query;
      },

      get search() {
        return typeof query === 'string' ? query : qs.stringify(query);
      },

      hash: path.hash || ''
    };
  }

  var matches = PATH_REGEXP.exec(path);
  if (!matches) { throw new Error("Not a valid path"); }
  var search = matches[2] || '';
  return {
    pathname: matches[1] || '',

    get query() {
      return qs.parse(search);
    },

    search: search,
    hash: matches[3] || ''
  };
}

var Router = function Router(history) {
  var this$1 = this;

  this.history = history;
  this.currentLocation = history.location;
  this.routes = [];
  this.beforeEachHooks = [];
  this.errorHandlers = [];
  this.history.listen(function () {
    var from = this$1.resolveFromCurrentLocation();
    this$1.currentLocation = this$1.history.location;
    var to = this$1.resolveFromCurrentLocation();
    this$1.run(to, from);
  });
};

var prototypeAccessors = { currentRoute: { configurable: true } };

Router.prototype.go = function go (n) {
  this.history.go(n);
};

Router.prototype.forward = function forward () {
  this.history.goForward();
};

Router.prototype.back = function back () {
  this.history.goBack();
};

Router.prototype.push = function push (path) {
  this.history.push(locationToPath(path));
};

Router.prototype.replace = function replace (path) {
  this.history.replace(locationToPath(path));
};
/** Add a route handle */


Router.prototype.add = function add (path, handler) {
  var ref = regexparam(path);
    var pattern = ref.pattern;
    var keys = ref.keys;
  this.routes.push({
    path: path,
    handler: handler,
    pattern: pattern,
    keys: keys
  });
};
/** Remove a route handler */


Router.prototype.remove = function remove (path) {
  this.routes = this.routes.filter(function (route) { return route.path !== path; });
};
/**
 * Run matched route handler
 */


Router.prototype.run = function run (to, from) {
    var this$1 = this;

  to = to || this.currentRoute || undefined;

  if (to) {
    var beforeEachHooks = ( this.beforeEachHooks ).concat( [function (to) { return to.route.handler(to); }]);

    var runHook = function (hook) {
      hook && hook(to, from, next);
    };

    var next = function (path) {
      if (path === undefined || path === true) {
        runHook(beforeEachHooks.shift());
      } else if (path instanceof Error) {
        this$1.errorHandlers.forEach(function (handle) { return handle(path); });
      } else if (typeof path === 'string' || typeof path === 'object') {
        this$1.replace(path);
      } else {
        this$1.back();
      }
    };

    runHook(beforeEachHooks.shift());
  }
};
/** Find a route that matches give path */


Router.prototype.resolve = function resolve (path) {
  var location = pathToLocation(path);

  for (var i = 0, list = this.routes; i < list.length; i += 1) {
    var route = list[i];

      var params = getParams(location.pathname, route.pattern, route.keys);

    if (params) {
      return {
        params: params,
        path: location.pathname,
        pathname: location.pathname,
        search: location.search,
        query: location.query,
        hash: location.hash,
        route: route
      };
    }
  }

  return null;
};

Router.prototype.resolveFromCurrentLocation = function resolveFromCurrentLocation () {
  return this.resolve({
    pathname: this.currentLocation.pathname,
    query: this.currentLocation.search,
    hash: this.currentLocation.hash
  });
};
/** Get the route that matches current path */


prototypeAccessors.currentRoute.get = function () {
  return this.resolveFromCurrentLocation();
};

Router.prototype.beforeEach = function beforeEach (hook) {
  this.beforeEachHooks.push(hook);
};

Router.prototype.onError = function onError (errorHandler) {
  this.errorHandlers.push(errorHandler);
};

Object.defineProperties( Router.prototype, prototypeAccessors );

var createBrowserRouter = function (options) {
  if ( options === void 0 ) options = {};

  var history$1 = history.createBrowserHistory({
    basename: options.base
  });
  var router = new Router(history$1);
  return router;
};

var createHashRouter = function (options) {
  if ( options === void 0 ) options = {};

  var history$1 = history.createHashHistory({
    basename: options.base
  });
  var router = new Router(history$1);
  return router;
};

var createMemoryRouter = function () {
  var history$1 = history.createMemoryHistory();
  var router = new Router(history$1);
  return router;
};

exports.Router = Router;
exports.createBrowserRouter = createBrowserRouter;
exports.createHashRouter = createHashRouter;
exports.createMemoryRouter = createMemoryRouter;
