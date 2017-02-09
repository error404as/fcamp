webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _App = __webpack_require__(28);

	var _App2 = _interopRequireDefault(_App);

	var _Article = __webpack_require__(53);

	var _Article2 = _interopRequireDefault(_Article);

	var _routerActions = __webpack_require__(222);

	var _routerActions2 = _interopRequireDefault(_routerActions);

	var _reactDom = __webpack_require__(223);

	var _reactRouter = __webpack_require__(164);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// custom handler :)

	if (document.getElementById('app')) {
		document.querySelector('.logo a').addEventListener('click', function (e) {
			e.preventDefault();
			_reactRouter.browserHistory.push('/');
		}, true);

		(0, _reactDom.render)(_react2.default.createElement(
			_reactRouter.Router,
			{ history: _reactRouter.browserHistory },
			_react2.default.createElement(
				_reactRouter.Route,
				{ path: '/', component: _App2.default },
				_react2.default.createElement(_reactRouter.IndexRoute, { component: _App2.default, onEnter: _routerActions2.default.onIndex }),
				_react2.default.createElement(_reactRouter.Route, { path: 'article/:postId', component: _Article2.default, onEnter: _routerActions2.default.onArticle }),
				_react2.default.createElement(_reactRouter.Route, { path: 'tag/:tagId', component: _App2.default, onEnter: _routerActions2.default.onTag })
			)
		), document.getElementById('app'));
	}

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(29);

	var _redux2 = _interopRequireDefault(_redux);

	var _Article = __webpack_require__(53);

	var _Article2 = _interopRequireDefault(_Article);

	var _PostItem = __webpack_require__(219);

	var _PostItem2 = _interopRequireDefault(_PostItem);

	var _TagsList = __webpack_require__(220);

	var _TagsList2 = _interopRequireDefault(_TagsList);

	var _Loader = __webpack_require__(221);

	var _Loader2 = _interopRequireDefault(_Loader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = _react2.default.createClass({
	  displayName: 'App',
	  getInitialState: function getInitialState() {
	    return _redux2.default.getState();
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    _redux2.default.subscribe(function () {
	      return _this.setState(_redux2.default.getState());
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'main' },
	      _react2.default.createElement(
	        'div',
	        { className: 'content' },
	        this.state.type === 'all' && _react2.default.createElement(
	          'div',
	          { className: 'posts-list' },
	          this.state.posts.map(function (itm) {
	            return _react2.default.createElement(_PostItem2.default, { key: itm.permalink, post: itm });
	          }),
	          !this.state.posts.length && _react2.default.createElement(_Loader2.default, null)
	        ),
	        this.state.type === 'tag' && _react2.default.createElement(
	          'div',
	          { className: 'posts-list' },
	          _react2.default.createElement(
	            'h1',
	            null,
	            this.state.pageId
	          ),
	          this.state.posts.map(function (itm) {
	            return _react2.default.createElement(_PostItem2.default, { key: itm.permalink, post: itm });
	          }),
	          !this.state.posts.length && _react2.default.createElement(_Loader2.default, null)
	        ),
	        this.state.type === 'single' && _react2.default.createElement(_Article2.default, { post: this.state.singlePost })
	      ),
	      _react2.default.createElement(
	        'aside',
	        { className: 'sidebar' },
	        _react2.default.createElement(_TagsList2.default, { tags: this.state.tags })
	      )
	    );
	  }
	});

	exports.default = App;

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(30);

	var _reducers = __webpack_require__(51);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initState = {
	  type: 'all',
	  posts: [],
	  tags: [],
	  pageId: '',
	  singlePost: {}
	};

	var store = (0, _redux.createStore)(_reducers2.default, initState);

	exports.default = store;

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(30);

	var _actions = __webpack_require__(52);

	var _actions2 = _interopRequireDefault(_actions);

	var _index = __webpack_require__(29);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*

	  type: 'all',
	  posts: [],
	  tags: [],
	  pageId: '',
	  singlePost: {}

	*/

	var type = function type() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var action = arguments[1];

	  switch (action.type) {
	    case 'GET_POST':
	      _actions2.default.getPost(action.value, function (data) {
	        _index2.default.dispatch({ type: 'GET_POST_Result', value: data });
	      });
	      return 'single';
	    case 'GET_POSTS':
	      _actions2.default.getPosts(function (data) {
	        _index2.default.dispatch({ type: 'GET_POSTS_Result', value: data });
	      });
	      return 'all';
	    case 'GET_TAG':
	      _actions2.default.getTag(action.value, function (data) {
	        _index2.default.dispatch({ type: 'GET_TAG_Result', value: data });
	      });
	      return 'tag';
	    default:
	      return state;
	  }
	};

	var posts = function posts() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'GET_POSTS':
	    case 'GET_TAG':
	      return [];
	    case 'GET_POSTS_Result':
	    case 'GET_TAG_Result':
	      return action.value;
	    default:
	      return state;
	  }
	};

	var tags = function tags() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'GET_TAGS':
	      _actions2.default.getTags(function (data) {
	        _index2.default.dispatch({ type: 'GET_TAGS_Result', value: data });
	      });
	      return [];
	    case 'GET_TAGS_Result':
	      return action.value;
	    default:
	      return state;
	  }
	};

	var pageId = function pageId() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var action = arguments[1];

	  switch (action.type) {
	    case 'GET_POST':
	    case 'GET_TAG':
	      return action.value;
	    default:
	      return state;
	  }
	};

	var singlePost = function singlePost() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];

	  switch (action.type) {
	    case 'GET_POST':
	      return {};
	    case 'GET_POST_Result':
	      return action.value;
	    default:
	      return state;
	  }
	};

	exports.default = (0, _redux.combineReducers)({
	  type: type,
	  posts: posts,
	  tags: tags,
	  pageId: pageId,
	  singlePost: singlePost
	});

/***/ },

/***/ 52:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var req = function req(url, cb) {
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    cb(data);
	  });
	};

	exports.default = {
	  getPost: function getPost(id, cb) {
	    req('/api/post/' + id, cb);
	  },
	  getTag: function getTag(id, cb) {
	    req('/api/tag/' + id, cb);
	  },
	  getTags: function getTags(cb) {
	    req('/api/tags/', cb);
	  },
	  getPosts: function getPosts(cb) {
	    req('/api/posts/', cb);
	  }
	};

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _moment = __webpack_require__(54);

	var _moment2 = _interopRequireDefault(_moment);

	var _reactRouter = __webpack_require__(164);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Article = _react2.default.createClass({
	  displayName: 'Article',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/' },
	        '< Back Home'
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'meta' },
	        _react2.default.createElement(
	          'div',
	          { className: 'author' },
	          'Author: ',
	          this.props.post.author
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'date' },
	          'Published: ',
	          (0, _moment2.default)(this.props.post.created).format('YYYY-MM-DD HH:mm')
	        )
	      ),
	      _react2.default.createElement(
	        'h1',
	        null,
	        this.props.post.headline
	      ),
	      this.props.post.image && _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('img', { src: this.props.post.image, alt: this.props.post.headline }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement('br', null)
	      ),
	      this.props.post.source && _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'a',
	          { href: this.props.post.source },
	          'Open source link'
	        ),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement('br', null)
	      ),
	      this.props.post.body
	    );
	  }
	});

	exports.default = Article;

/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _moment = __webpack_require__(54);

	var _moment2 = _interopRequireDefault(_moment);

	var _reactRouter = __webpack_require__(164);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PostItem = _react2.default.createClass({
	  displayName: 'PostItem',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'post-item' + (this.props.post.image ? '' : ' no-image') },
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/article/' + this.props.post.permalink },
	        this.props.post.image && _react2.default.createElement(
	          'div',
	          { className: 'vis' },
	          _react2.default.createElement('img', { src: this.props.post.image, alt: this.props.post.headline })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'info' },
	          _react2.default.createElement(
	            'div',
	            { className: 'headline' },
	            this.props.post.headline
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'meta' },
	            (0, _moment2.default)(this.props.post.created).format('YYYY-MM-DD')
	          )
	        )
	      )
	    );
	  }
	});

	exports.default = PostItem;

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(164);

	var _redux = __webpack_require__(29);

	var _redux2 = _interopRequireDefault(_redux);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TagsList = _react2.default.createClass({
	  displayName: 'TagsList',
	  componentDidMount: function componentDidMount() {
	    _redux2.default.dispatch({ type: 'GET_TAGS' });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'tags', style: { display: this.props.tags.length ? 'block' : 'none' } },
	      _react2.default.createElement(
	        'h3',
	        null,
	        'Tags'
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        this.props.tags.map(function (tag) {
	          return _react2.default.createElement(
	            'li',
	            { key: tag._id },
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/tag/' + tag._id, activeClassName: 'selected' },
	              tag._id
	            )
	          );
	        })
	      )
	    );
	  }
	});

	exports.default = TagsList;

/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Loader = _react2.default.createClass({
	  displayName: "Loader",
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "loader-wrap" },
	      _react2.default.createElement("div", { className: "loader" })
	    );
	  }
	});

	exports.default = Loader;

/***/ },

/***/ 222:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(29);

	var _redux2 = _interopRequireDefault(_redux);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  onIndex: function onIndex() {
	    _redux2.default.dispatch({
	      type: 'GET_POSTS'
	    });
	  },
	  onArticle: function onArticle(next) {
	    _redux2.default.dispatch({
	      type: 'GET_POST',
	      value: next.params.postId
	    });
	  },
	  onTag: function onTag(next) {
	    _redux2.default.dispatch({
	      type: 'GET_TAG',
	      value: next.params.tagId
	    });
	  }
	};

/***/ }

});