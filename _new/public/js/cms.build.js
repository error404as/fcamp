webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AppModule = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _angularRoute = __webpack_require__(3);

	var _angularRoute2 = _interopRequireDefault(_angularRoute);

	var _app = __webpack_require__(5);

	var _app2 = _interopRequireDefault(_app);

	var _app3 = __webpack_require__(6);

	var _components = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AppModule = exports.AppModule = _angular2.default.module('app', [_components.ComponentsModule, _angularRoute2.default]).config(_app2.default).component('app', _app3.AppComponent).name;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = ["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
		'ngInject';

		$routeProvider.when('/', {
			template: '<post-list></post-list>'
		}).when('/add', {
			template: '<post-add></post-add>'
		}).when('/add-news', {
			template: '<add-news-from-api></add-news-from-api>'
		}).when('/edit/:id', {
			template: '<post-add></post-add>'
		}).otherwise({ redirectTo: '/' });

		$locationProvider.hashPrefix('');
	}];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var AppComponent = exports.AppComponent = {
	  template: "\n  \t<div class=\"cms-content\">\n\t\t<btn url=\"\" text=\"Posts list\"></btn>\n\t\t<btn url=\"add\" text=\"Write post\"></btn>\n\t\t<btn url=\"add-news\" text=\"Add news\"></btn>\n\t    <ng-view></ng-view>\n    </div>\n  "
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ComponentsModule = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _postadd = __webpack_require__(8);

	var _postlist = __webpack_require__(13);

	var _addnews = __webpack_require__(28);

	var _btn = __webpack_require__(31);

	var _confirm = __webpack_require__(25);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ComponentsModule = exports.ComponentsModule = _angular2.default.module('app.components', [_postadd.PostAdd, _postlist.PostList, _addnews.AddNewsApi, _btn.CmsBtn, _confirm.ConfirmAction]).name;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PostAdd = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _postadd = __webpack_require__(9);

	var _input = __webpack_require__(11);

	var _input2 = _interopRequireDefault(_input);

	var _app = __webpack_require__(12);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PostAdd = exports.PostAdd = _angular2.default.module('postadd', [_app2.default]).directive('postAdd', _postadd.PostAddDirective).directive('checkMinlen', _input2.default).name;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function formatURL(id) {
		var result = window.location.host || '';
		if (result) {
			result = window.location.protocol + '//' + result;
		}
		result += '/article/' + id;
		return result;
	}
	function setViewDate(d) {
		var date = new Date(d);
		var offset = date.getTimezoneOffset() * 60 * 1000;
		var string = new Date(date - offset).toISOString();
		var stringDate = string.substring(0, string.lastIndexOf(':')).replace('T', ' ');
		return stringDate;
	}
	function setDate(val) {
		val = val.trim();
		if (val.indexOf(':') === -1) {
			val += ' 00:00';
		}

		val = val.replace(' ', 'T');

		return new Date(val).toISOString();
	}

	var PostAddDirective = exports.PostAddDirective = function PostAddDirective() {
		return {
			restrict: 'E',
			template: __webpack_require__(10),
			controller: ["fetcher", "router", function controller(fetcher, router) {
				'ngInject';

				var model = this;
				var date = new Date();
				var editingId = router.getId();

				model.editing = editingId || '';
				model.post = {
					headline: '',
					body: '',
					tags: '',
					permalink: '',
					created: date.toISOString(),
					image: ''
				};
				model.permalinkView = '';

				model.formatUrl = function () {
					model.permalinkView = formatURL(model.post.permalink);
				};
				model.formatDate = function () {
					model.post.created = setDate(model.createdView);
				};

				model.createdView = setViewDate(date);
				model.formatDate();

				if (editingId) {

					fetcher.getPost(editingId).then(function (data) {
						model.post = data;
						model.formatUrl();
						model.createdView = setViewDate(model.post.created);
					});
				}

				model.formCheck = function (e, f) {
					model.post.created = setDate(model.createdView);
					if (model.editing && f.$valid) {
						e.preventDefault();
						fetcher.updPost(model.post).then(function (data) {
							if (data === 'OK') {
								alert('Success edit');
							} else {
								alert('Error on saving updates');
							}
						});
					}
					if (!f.$valid) {
						e.preventDefault();
						for (var er in f.$error) {
							f.$error[er].forEach(function (itm) {
								return itm.$setDirty();
							});
						}
					}
				};
			}],
			controllerAs: 'model'
		};
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<form action=\"/add\" method=\"post\" id=\"add_post\" name=\"add_post\" ng-submit=\"model.formCheck($event, add_post)\" novalidate>\r\n\t<div class=\"main\">\r\n\t\t<div class=\"content\">\r\n\t\t\t<h2>{{model.editing ? 'Edit post' : 'Add new post'}}</h2>\r\n\t\t\t<div class=\"form-item\">\r\n\t\t\t\t<label for=\"post_headline\">Title</label>\r\n\t\t\t\t<input type=\"text\" class=\"form-text\" name=\"headline\" id=\"post_headline\" autocomplete=\"off\"\r\n\t\t\t\t\tng-model=\"model.post.headline\"\r\n\t\t\t\t\tng-required=\"true\"\r\n\t\t\t\t\tng-class=\"{error: add_post.headline.$dirty && !add_post.headline.$valid}\"\r\n\t\t\t\t\t/>\r\n\t\t\t\t<div class=\"error-msg\" ng-show=\"add_post.headline.$dirty && add_post.headline.$error.required\">This field can't be empty</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-item\">\r\n\t\t\t\t<label for=\"post_body\">Content</label>\r\n\t\t\t\t<textarea name=\"body\" id=\"post_body\" cols=\"30\" rows=\"10\"\r\n\t\t\t\t\tng-model=\"model.post.body\"\r\n\t\t\t\t\tcheck-minlen\r\n\t\t\t\t\tng-required=\"true\"\r\n\t\t\t\t\tng-class=\"{error: add_post.body.$dirty && !add_post.body.$valid}\"\r\n\t\t\t\t\t></textarea>\r\n\t\t\t\t<div class=\"error-msg\" ng-show=\"add_post.body.$dirty && add_post.body.$error.required\">This field can't be empty</div>\r\n\t\t\t\t<div class=\"error-msg\" ng-show=\"add_post.body.$dirty && !add_post.body.$error.required && add_post.body.$error.milen\">Article requires some more text...</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-item\">\r\n\t\t\t\t<label for=\"post_tags\">Tags</label>\r\n\t\t\t\t<input type=\"text\" class=\"form-text\" name=\"tags\" id=\"post_tags\" ng-model=\"model.post.tags\">\r\n\t\t\t\t<div class=\"sub\">Comma separated tags. Eg: sport, dev, my trip, web</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<aside class=\"sidebar\">\r\n\t\t\t<div class=\"form-item\">\r\n\t\t\t\t<label for=\"post_permalink\">URL</label>\r\n\t\t\t\t<input type=\"text\" class=\"form-text\" name=\"permalink\" id=\"post_permalink\" ng-model=\"model.post.permalink\" ng-change=\"model.formatUrl()\" autocomplete=\"off\" ng-disabled=\"model.editing\">\r\n\t\t\t\t<div class=\"sub\" id=\"post_permalink_preview\">{{model.permalinkView}}</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-item\">\r\n\t\t\t\t<label for=\"post_date\">Date</label>\r\n\t\t\t\t<input type=\"text\" class=\"form-text\" id=\"post_date\" placeholder=\"YYYY-MM-DD HH:MM\" ng-model=\"model.createdView\" ng-change=\"model.formatDate()\" autocomplete=\"off\">\r\n\t\t\t\t<input type=\"hidden\" name=\"created\" id=\"post_date_utc\" ng-model=\"model.post.created\">\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-item\">\r\n\t\t\t\t<label for=\"post_image\">Cover image URL</label>\r\n\t\t\t\t<input type=\"text\" name=\"image\" id=\"post_image\" class=\"form-text\" ng-model=\"model.post.image\">\r\n\t\t\t</div>\r\n\t\t</aside>\r\n\t</div>\r\n\t<div class=\"foot-content\">\r\n\t\t<div class=\"form-action\">\r\n\t\t\t<button type=\"submit\" class=\"button\">{{model.editing ? 'Save updates' : 'Publish'}}</button>\r\n\t\t</div>\r\n\t</div>\r\n</form>\r\n"

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  return {
	    require: 'ngModel',
	    link: function link(scope, element, attr, mCtrl) {
	      function mycheckLength(value) {
	        if (value.length > 20) {
	          mCtrl.$setValidity('milen', true);
	        } else {
	          mCtrl.$setValidity('milen', false);
	        }
	        return value;
	      }
	      mCtrl.$parsers.push(mycheckLength);
	    }
	  };
	};

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	fetcher.$inject = ["$http"];
	router.$inject = ["$routeParams"];
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _angularRoute = __webpack_require__(3);

	var _angularRoute2 = _interopRequireDefault(_angularRoute);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _angular2.default.module('services', [_angularRoute2.default]).service('fetcher', fetcher).service('router', router).name;


	function fetcher($http) {
		'ngInject';

		return {
			getPosts: getPosts,
			getPost: getPost,
			updPost: updatePost,
			delPost: deletePost,
			getNews: getNews,
			addNewsItem: addNewsItem,
			checkExists: checkExists
		};

		function getPosts(page) {
			return $http.get('/api/posts/' + page).then(function (resp) {
				return resp.data;
			});
		}
		function getPost(id) {
			return $http.get('/api/post/' + id).then(function (resp) {
				return resp.data;
			});
		}
		function updatePost(post) {
			return $http.post('/edit/', post).then(function (resp) {
				return resp.data;
			});
		}
		function deletePost(id) {
			return $http.get('/article/' + id + '?action=delete');
		}
		function getNews(source) {
			return $http.get('https://newsapi.org/v1/articles?source=' + source + '&apiKey=d3a3b4d86b5d48dd98a34ed0bcebfa07').then(function (resp) {
				return resp.data;
			});
		}
		function addNewsItem(post) {
			return $http.post('/add-news', post).then(function (resp) {
				return resp.data;
			});
		}
		function checkExists(urls) {
			return $http.post('/check-exists', urls).then(function (resp) {
				return resp.data;
			});
		}
	}

	function router($routeParams) {
		'ngInject';

		return {
			getId: getId
		};
		function getId() {
			return $routeParams.id;
		}
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PostList = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _postlist = __webpack_require__(14);

	var _postlist2 = _interopRequireDefault(_postlist);

	var _app = __webpack_require__(12);

	var _app2 = _interopRequireDefault(_app);

	var _app3 = __webpack_require__(16);

	var _pager = __webpack_require__(17);

	var _total = __webpack_require__(22);

	var _confirm = __webpack_require__(25);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PostList = exports.PostList = _angular2.default.module('postsList', [_app2.default, _pager.appPager, _total.postTotal, _confirm.ConfirmAction]).component('postList', _postlist2.default).name;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	mController.$inject = ["fetcher"];
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mController(fetcher) {
		'ngInject';

		var model = this;

		model.posts = [];
		model.loading = false;
		model.limit = 1;
		model.active = 1;
		model.total = 1;

		model.confirmArgs = null;
		model.confirmText = '';

		model.$onInit = function () {
			model.setPage(1);
		};

		model.setPage = function (n) {
			model.loading = true;
			fetcher.getPosts(n).then(function (data) {
				console.log(data.items);
				model.posts = data.items;
				model.loading = false;
				model.limit = data.perpage;
				model.active = data.page;
				model.total = data.total;
			});
		};

		model.deletePost = function (e, id, imsure) {
			e.preventDefault();
			if (imsure) {
				model.confirmArgs = null;
				model.loading = true; // not really, but :)
				fetcher.delPost(id).then(function () {
					model.setPage(model.active);
				});
			} else {
				var post = model.posts.filter(function (itm) {
					return itm.permalink === id;
				})[0];
				model.confirmText = 'Do you want to delete the article? <h4>"' + post.headline + '"</h4><img src="' + post.image + '">';
				model.confirmArgs = [id];
			}
		};
	}

	exports.default = {
		template: __webpack_require__(15),
		controller: mController,
		controllerAs: 'model'
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<h1>Blog Posts</h1>\r\n<div class=\"loader-wrap\" ng-show=\"model.loading\">\r\n\t<div class=\"loader\"></div>\r\n</div>\r\n<div ng-hide=\"model.loading\">\r\n\t<table class=\"table\">\r\n\t\t<tr ng-repeat=\"post in model.posts\">\r\n\t\t\t<td class=\"img\"><img ng-src=\"{{post.image}}\" ng-show=\"post.image\" /></td>\r\n\t\t\t<td class=\"wide\"><a href=\"/article/{{post.permalink}}\">{{post.headline}}</a></td>\r\n\t\t\t<td><a href=\"#/edit/{{post.permalink}}\">edit</a></td>\r\n\t\t\t<td><a href=\"#\" ng-click=\"model.deletePost($event, post.permalink)\">delete</a></td>\r\n\t\t</tr>\r\n\t</table>\r\n\r\n\t<confirm-this ng-show=\"model.confirmArgs\" text=\"model.confirmText\" action=\"model.deletePost\" actionargs=\"model.confirmArgs\"></confirm-this>\r\n\r\n\t<post-pager limit=\"model.limit\" active=\"model.active\" total=\"model.total\" action=\"model.setPage\"></post-pager>\r\n\r\n\t<posts-total limit=\"model.limit\" active=\"model.active\" total=\"model.total\"></posts-total>\r\n</div>\r\n\r\n"

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var pager = exports.pager = function pager() {

		return function (input, active) {
			return active ? "<b>" + input + "</b>" : input;
		};
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.appPager = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _pager = __webpack_require__(18);

	var _pager2 = _interopRequireDefault(_pager);

	var _app = __webpack_require__(16);

	var _angularSanitize = __webpack_require__(20);

	var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var appPager = exports.appPager = _angular2.default.module('apppager', [_angularSanitize2.default]).component('postPager', _pager2.default).filter('pager', _app.pager).name;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mController() {
		var model = this;

		model.pager = [];
		model.active = 1;
		model.total = 1;
		model.limit = 1;

		model.$onInit = function () {
			model.pager = pageBuilder(model.active, Math.ceil(model.total / model.limit));
		};
		model.$onChanges = function () {
			model.pager = pageBuilder(model.active, Math.ceil(model.total / model.limit));
		};
	}

	function pageBuilder(active, total) {
		var result = [];
		for (var i = 1; i <= total; i++) {
			result.push({
				page: i,
				isActive: i === active
			});
		}
		return result;
	}

	exports.default = {
		template: __webpack_require__(19),
		controller: mController,
		controllerAs: 'model',
		bindings: {
			limit: '<',
			active: '<',
			total: '<',
			action: '<'
		}
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"pager\">\r\n\tPager:\r\n\t<span class=\"page\"\r\n\t\tng-repeat=\"page in model.pager\"\r\n\t\tng-class=\"{active: page.isActive}\"\r\n\t\tng-click=\"model.action(page.page)\"\r\n\t\tng-bind-html=\"page.page | pager : page.isActive\"\r\n\t\t></span>\r\n</div>\r\n\r\n"

/***/ },
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.postTotal = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _total = __webpack_require__(23);

	var _total2 = _interopRequireDefault(_total);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var postTotal = exports.postTotal = _angular2.default.module('postTotal', []).component('postsTotal', _total2.default).name;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mController() {
		var model = this;

		model.$onInit = function () {
			model.actual = actual();
		};
		model.$onChanges = function () {
			model.actual = actual();
		};

		function actual() {
			var max = model.limit * model.active;
			return max - model.limit + 1 + '-' + (max > model.total ? model.total : max);
		}
	}

	exports.default = {
		template: __webpack_require__(24),
		controller: mController,
		controllerAs: 'model',
		bindings: {
			limit: '<',
			active: '<',
			total: '<'
		}
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"total\">\r\n\tItems {{model.actual}} of {{model.total}}\r\n</div>\r\n\r\n"

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ConfirmAction = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _confirm = __webpack_require__(26);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _angularSanitize = __webpack_require__(20);

	var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ConfirmAction = exports.ConfirmAction = _angular2.default.module('confirmAction', [_angularSanitize2.default]).component('confirmThis', _confirm2.default).name;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function mController() {
		var model = this;

		model.visible = false;

		model.$onChanges = function () {
			model.visible = true;
		};

		model.confirmAction = function (e) {
			e.preventDefault();
			model.action.apply(model, [e].concat(_toConsumableArray(model.actionargs), [true]));
		};

		model.cancelAction = function (e) {
			e.preventDefault();
			model.visible = false;
		};
	}

	exports.default = {
		template: __webpack_require__(27),
		controller: mController,
		controllerAs: 'model',
		bindings: {
			action: '<',
			actionargs: '<',
			text: '<'
		}
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ng-confirm\" ng-show=\"model.visible\">\r\n\t<div class=\"inner\">\r\n\t\t<div class=\"text\" ng-bind-html=\"model.text\"></div>\r\n\t\t<a href=\"#\" class=\"button\" ng-click=\"model.confirmAction($event)\">Confirm</a>\r\n\t\t<a href=\"#\" ng-click=\"model.cancelAction($event)\">Cancel</a>\r\n\t</div>\r\n</div>\r\n\r\n"

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AddNewsApi = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _addnews = __webpack_require__(29);

	var _addnews2 = _interopRequireDefault(_addnews);

	var _app = __webpack_require__(12);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AddNewsApi = exports.AddNewsApi = _angular2.default.module('addNews', [_app2.default]).component('addNewsFromApi', _addnews2.default).name;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	mController.$inject = ["fetcher"];
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mController(fetcher) {
		'ngInject';

		var model = this;

		model.posts = [];
		model.loading = false;
		model.current = '';
		model.sources = ["bbc-news", "bloomberg", "cnn", "google-news", "hacker-news", "mtv-news", "national-geographic", "polygon", "reddit-r-all", "reuters", "techradar", "the-guardian-uk", "the-new-york-times", "the-telegraph", "the-washington-post", "time", "usa-today"];

		model.$onInit = function () {
			window.document.body.classList.remove('has_data');
		};

		model.fetchFrom = function (e, source) {
			e.preventDefault();
			window.document.body.classList.add('has_data');
			model.loading = true;
			model.current = source;
			fetcher.getNews(source).then(function (data) {
				model.loading = false;
				model.current = data.source;
				model.posts = data.articles;

				var urls = data.articles.map(function (itm) {
					return itm.url;
				});
				fetcher.checkExists(urls).then(function (result) {
					if (result.length) {
						var matches = result.map(function (itm) {
							return itm.source;
						});
						model.posts.forEach(function (itm) {
							if (matches.indexOf(itm.url) !== -1) {
								itm.status = 'added';
							}
						});
					}
				});
			});
		};
		model.addItem = function (event, url) {
			event.preventDefault();
			var item = model.posts.filter(function (itm) {
				return itm.url === url;
			})[0];
			if (item && !item.status) {
				item.status = 'adding';
				var sendingData = {
					author: item.author || model.current,
					permalink: new Date().getTime(),
					headline: item.title,
					body: item.description || ' ', // some articles has no description
					image: item.urlToImage,
					created: item.publishedAt,
					tags: this.currentSource,
					source: item.url
				};
				fetcher.addNewsItem(sendingData).then(function (data) {
					item.status = data === 'OK' ? 'added' : 'error';
				});
			}
		};
	}

	exports.default = {
		template: __webpack_require__(30),
		controller: mController,
		controllerAs: 'model'
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<div class=\"news-all\">\r\n\t<div class=\"news-header\">\r\n\t\t<h1><a href=\"#\">News From NewsAPI.org</a></h1>\r\n\t</div>\r\n\r\n\t<div class=\"news-nav\">\r\n\t\t<ul>\r\n\t\t\t<li ng-repeat=\"src in model.sources\" ng-class=\"{active: src === model.current}\">\r\n\t\t\t\t<span class=\"link\" ng-click=\"model.fetchFrom($event, src)\">\r\n\t\t\t\t\t<span class=\"img\"><img ng-src=\"http://i.newsapi.org/{{src}}-m.png\" alt=\"{{src}}\"></span>\r\n\t\t\t\t\t<span class=\"name\">{{src}}</span>\r\n\t\t\t\t</span>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n\r\n\t<div class=\"loader-wrap\" ng-show=\"model.loading\">\r\n\t\t<div class=\"loader\"></div>\r\n\t</div>\r\n\t<div class=\"news-view\" ng-hide=\"model.loading\">\r\n\t\t<div class=\"item\" ng-repeat=\"post in model.posts\">\r\n\t\t\t<a href=\"{{post.url}}\" class=\"{{post.status}}\" ng-click=\"model.addItem($event, post.url)\">\r\n\t\t\t\t<div class=\"vis\"><div class=\"img\"><img ng-src=\"{{post.urlToImage}}\"></div></div>\r\n\t\t\t\t<h2>{{post.title}}</h2>\r\n\r\n\t\t\t\t<div class=\"pubdate\">{{post.publishedAt | date:'yyyy-MM-dd HH:mm'}}</div>\r\n\t\t\t\t<p>{{post.description}}</p>\r\n\t\t\t</a>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n"

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.CmsBtn = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _btn = __webpack_require__(32);

	var _btn2 = _interopRequireDefault(_btn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CmsBtn = exports.CmsBtn = _angular2.default.module('btn', []).component('btn', _btn2.default).name;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mController() {
		var model = this;
	}

	exports.default = {
		template: __webpack_require__(33),
		controller: mController,
		controllerAs: 'model',
		bindings: {
			url: '@',
			text: '@'
		}
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "<a href=\"#/{{model.url}}\" class=\"button\">{{model.text}}</a>\r\n\r\n"

/***/ }
]);