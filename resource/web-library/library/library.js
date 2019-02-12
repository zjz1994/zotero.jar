'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });


var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _navbar = require('../app/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _collectionTreeContainer = require('../collection/collection-tree-container');

var _collectionTreeContainer2 = _interopRequireDefault(_collectionTreeContainer);

var _tagSelector = require('../tag/tag-selector');

var _tagSelector2 = _interopRequireDefault(_tagSelector);

var _itemsListContainer = require('../item/items-list-container');

var _itemsListContainer2 = _interopRequireDefault(_itemsListContainer);

var _itemDetailsContainer = require('../item/item-details-container');

var _itemDetailsContainer2 = _interopRequireDefault(_itemDetailsContainer);

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}

function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var Library = function (_React$Component) {
	_inherits(Library, _React$Component);

	function Library() {
		_classCallCheck(this, Library);

		return _possibleConstructorReturn(this, (Library.__proto__ || Object.getPrototypeOf(Library)).apply(this, arguments));
	}

	_createClass(Library, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_navbar2.default, null),
			_react2.default.createElement(
			'main',
			null,
			_react2.default.createElement(
			'section',
			{ className: 'library ' + (this.props.view === 'library' ? 'active' : '') },
			_react2.default.createElement(
			'header',
			{ className: 'touch-header hidden-sm-up' },
			'Mobile Header'),

			_react2.default.createElement(
			'header',
			{ className: 'sidebar' },
			_react2.default.createElement(
			'h2',
			{ className: 'offscreen' },
			'Web library'),

			_react2.default.createElement(_collectionTreeContainer2.default, null),
			_react2.default.createElement(_tagSelector2.default, null)),

			_react2.default.createElement(
			'section',
			{ className: 'items ' + (this.props.view === 'items' ? 'active' : '') },
			_react2.default.createElement(
			'div',
			{ className: 'items-container' },
			_react2.default.createElement(
			'header',
			{ className: 'touch-header hidden-xs-down' },
			_react2.default.createElement(
			'h3',
			{ className: 'hidden-mouse-md-up' },
			'Collection title'),

			_react2.default.createElement(
			'div',
			{ className: 'toolbar hidden-touch hidden-sm-down' },
			'Toolbar')),


			_react2.default.createElement(_itemsListContainer2.default, null)),

			_react2.default.createElement(
			'section',
			{ className: 'item-details ' + (this.props.view === 'item-details' ? 'active' : '') },
			_react2.default.createElement(_itemDetailsContainer2.default, null))))));





		} }]);


	return Library;
}(_react2.default.Component);

exports.default = Library;


Library.propTypes = {
	view: _react2.default.PropTypes.string };

module.exports = exports['default'];