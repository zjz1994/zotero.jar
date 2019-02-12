'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });


var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _spinner = require('../app/spinner');

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}

function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

function testRecursive(collections, test) {
	if (collections.some(test)) {
		return true;
	} else {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = collections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var collection = _step.value;

				if ('children' in collection) {
					if (testRecursive(collection.children, test)) {
						return true;
					}
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}
	return false;
}

var CollectionTree = function (_React$Component) {
	_inherits(CollectionTree, _React$Component);

	function CollectionTree(props) {
		_classCallCheck(this, CollectionTree);

		//@TODO: deduplicate and use single loop
		var _this = _possibleConstructorReturn(this, (CollectionTree.__proto__ || Object.getPrototypeOf(CollectionTree)).call(this, props));

		_this.state = {
			collections: _this.props.collections.filter(function (c) {
				return c.nestingDepth === 1;
			}),
			openKeys: _this.props.collections.filter(function (c) {
				return !!c.isSelected;
			}).map(function (col) {
				return col.key;
			}) };

		return _this;
	}

	_createClass(CollectionTree, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				collections: nextProps.collections.filter(function (c) {
					return c.nestingDepth === 1;
				}),
				openKeys: nextProps.collections.filter(function (c) {
					return !!c.isSelected;
				}).map(function (col) {
					return col.key;
				}) });

		} },
	{
		key: 'renderCollections',
		value: function renderCollections(collections, level) {
			var _this2 = this;

			var hasOpen = testRecursive(collections, function (col) {
				return _this2.state.openKeys.includes(col.key);
			});

			return _react2.default.createElement(
			'div',
			{ className: 'level level-' + level + ' ' + (hasOpen ? 'has-open' : '') },
			_react2.default.createElement(
			'ul',
			{ className: 'nav' },
			collections.map(function (collection) {
				var twistyButton = _react2.default.createElement('button', {
					type: 'button',
					className: 'twisty',
					onClick: function onClick() {
						return _this2.props.onCollectionOpened(collection.key);
					} });

				return _react2.default.createElement(
				'li',
				{
					key: collection.key,
					className: (collection.isOpen ? 'open' : '') + ' ' + (collection.isSelected ? 'selected' : '') },

				_react2.default.createElement(
				'div',
				{ className: 'item-container' },
				_react2.default.createElement(
				'div',
				{ className: 'twisty-container' },
				collection.hasChildren ? twistyButton : ''),

				_react2.default.createElement(
				'a',
				{ onClick: function onClick() {
						return _this2.props.onCollectionSelected(collection.key);
					} },
				collection.apiObj.data.name)),


				collection.children.length ? _this2.renderCollections(collection.children, level + 1) : null);

			})));


		} },
	{
		key: 'render',
		value: function render() {
			if (this.props.isFetching) {
				return _react2.default.createElement(_spinner2.default, null);
			} else {

				return _react2.default.createElement(
				'nav',
				{ className: 'collection-tree' },
				_react2.default.createElement(
				'header',
				{ className: 'touch-header hidden-mouse-md-up hidden-xs-down' },
				_react2.default.createElement(
				'h3',
				null,
				'Library')),


				_react2.default.createElement(
				'div',
				{ className: 'scroll-container' },
				_react2.default.createElement(
				'section',
				null,
				_react2.default.createElement(
				'h4',
				null,
				'My Library'),

				this.renderCollections(this.state.collections, 1)),

				_react2.default.createElement(
				'section',
				null,
				_react2.default.createElement(
				'h4',
				null,
				'Group Libraries'))));




			}
		} }]);


	return CollectionTree;
}(_react2.default.Component);

exports.default = CollectionTree;


CollectionTree.propTypes = {
	isFetching: _react2.default.PropTypes.bool,
	onCollectionOpened: _react2.default.PropTypes.func,
	onCollectionSelected: _react2.default.PropTypes.func,
	collections: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
		key: _react2.default.PropTypes.string.isRequired,
		nestingDepth: _react2.default.PropTypes.integer,
		hasChildren: _react2.default.PropTypes.bool,
		children: _react2.default.PropTypes.array,
		apiObj: _react2.default.PropTypes.shape({
			data: _react2.default.PropTypes.shape({
				name: _react2.default.PropTypes.string }) }),


		isOpen: _react2.default.PropTypes.bool,
		isSelected: _react2.default.PropTypes.selected })).
	isRequired };


CollectionTree.defaultProps = {
	isFetching: false,
	onCollectionOpened: function onCollectionOpened() {
		return null;
	},
	onCollectionSelected: function onCollectionSelected() {
		return null;
	} };

module.exports = exports['default'];