'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });


var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}

function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var Item = function (_React$Component) {
	_inherits(Item, _React$Component);

	function Item() {
		_classCallCheck(this, Item);

		return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
	}

	_createClass(Item, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
			'li',
			{ className: 'item ' + (this.props.active ? 'active' : ''), onClick: this.props.onClick },
			_react2.default.createElement(
			'div',
			{ className: 'metadata' },
			this.props.item.data.title),

			_react2.default.createElement(
			'div',
			{ className: 'metadata author' },
			this.props.item.data.author),

			_react2.default.createElement(
			'div',
			{ className: 'metadata year' },
			this.props.item.data.year),

			_react2.default.createElement(
			'div',
			{ className: 'metadata hidden-touch hidden-sm-down' },
			this.props.item.data.date),

			_react2.default.createElement('div', { className: 'metadata hidden-touch hidden-sm-down' }),
			_react2.default.createElement('div', { className: 'metadata hidden-touch hidden-sm-down' }));

		} }]);


	return Item;
}(_react2.default.Component);

exports.default = Item;


Item.propTypes = {
	item: _react2.default.PropTypes.shape({
		data: _react2.default.PropTypes.shape({
			title: _react2.default.PropTypes.string,
			author: _react2.default.PropTypes.string,
			year: _react2.default.PropTypes.number,
			date: _react2.default.PropTypes.string }) }),


	active: _react2.default.PropTypes.bool,
	onClick: _react2.default.PropTypes.func };


Item.defaultProps = {
	item: {
		data: {} },

	active: false,
	onClick: function onClick() {} };

module.exports = exports['default'];