'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};

var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxRouter = require('redux-router');

var _reactRouter = require('react-router');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _history = require('history');

var _actions = require('../actions');

var _library = require('./library');

var _library2 = _interopRequireDefault(_library);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}

function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

//@TODO: ensure this doesn't affect prod build
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

var combinedReducers = (0, _redux.combineReducers)(Object.assign({}, _reducers2.default, {
	router: _reduxRouter.routerStateReducer }));


var LibraryContainer = function (_React$Component) {
	_inherits(LibraryContainer, _React$Component);

	function LibraryContainer() {
		_classCallCheck(this, LibraryContainer);

		return _possibleConstructorReturn(this, (LibraryContainer.__proto__ || Object.getPrototypeOf(LibraryContainer)).apply(this, arguments));
	}

	_createClass(LibraryContainer, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.dispatch((0, _actions.selectLibrary)('user', this.props.userId, this.props.apiKey));
		} },
	{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_library2.default, {
				view: this.props.view });

		} }],
	[{
		key: 'init',
		value: function init(element, userid, apiKey) {
			if (element) {
				var config = {
					apiKey: apiKey || element.getAttribute('data-apikey'),
					userId: userid || parseInt(element.getAttribute('data-userid'), 10) };


				var store = (0, _redux.createStore)(combinedReducers, { config: config }, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)()), (0, _reduxRouter.reduxReactRouter)({
					createHistory: _history.createHistory })));


				_reactDom2.default.render(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(
				_reduxRouter.ReduxRouter,
				null,
				_react2.default.createElement(
				_reactRouter.Route,
				{ path: '/', component: LibraryContainerWrapped },
				_react2.default.createElement(_reactRouter.Route, { path: '/collection/:collection' }),
				_react2.default.createElement(_reactRouter.Route, { path: '/collection/:collection/item/:item' })))),


				element);
			}
		} }]);


	return LibraryContainer;
}(_react2.default.Component);

LibraryContainer.propTypes = {
	userId: _react2.default.PropTypes.number,
	apiKey: _react2.default.PropTypes.string,
	dispatch: _react2.default.PropTypes.func.isRequired,
	view: _react2.default.PropTypes.string };


var getCurrentViewFromState = function getCurrentViewFromState(state) {
	if (state.library && state.collections[state.library.libraryString] && state.collections.selected) {
		var _ret = function () {
			var selectedCollectionKey = state.collections.selected;
			var collections = state.collections[state.library.libraryString].collections;
			var selectedCollection = collections.find(function (c) {
				return c.key === selectedCollectionKey;
			});
			var selectedItemKey = state.items.selected;
			if (state.items[selectedCollectionKey] && state.items[selectedCollectionKey].items) {
				var items = state.items[selectedCollectionKey].items;
				var selectedItem = items.find(function (i) {
					return i.key === selectedItemKey;
				});
				if (selectedItem) {
					return {
						v: 'item-details' };

				}
			}

			if (selectedCollection && !selectedCollection.hasChildren) {
				return {
					v: 'items' };

			}
		}();

		if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	}

	return 'library';
};

var mapStateToProps = function mapStateToProps(state) {
	return {
		userId: state.config.userId,
		apiKey: state.config.apiKey,
		view: getCurrentViewFromState(state) //@TODO: memoize
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		dispatch: dispatch,
		push: _reduxRouter.push };

};

var LibraryContainerWrapped = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LibraryContainer);

exports.default = LibraryContainerWrapped;
module.exports = exports['default'];