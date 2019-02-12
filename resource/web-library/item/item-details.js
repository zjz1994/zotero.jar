'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });


var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _item = require('./item.jsx');

var _item2 = _interopRequireDefault(_item);

var _tabset = require('../ui/tabset.jsx');

var _tabset2 = _interopRequireDefault(_tabset);

var _tab = require('../ui/tab.jsx');

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}

function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var ItemDetails = function (_React$Component) {
	_inherits(ItemDetails, _React$Component);

	function ItemDetails(props) {
		_classCallCheck(this, ItemDetails);

		var _this = _possibleConstructorReturn(this, (ItemDetails.__proto__ || Object.getPrototypeOf(ItemDetails)).call(this, props));

		_this.state = {
			active: 'info' };

		return _this;
	}

	_createClass(ItemDetails, [{
		key: 'setActiveTab',
		value: function setActiveTab(active, ev) {
			ev.preventDefault();
			this.setState({
				active: active });

		} },
	{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var fieldsToSkip = ['abstractNote'];
			return _react2.default.createElement(
			'section',
			{ className: 'panel' },
			_react2.default.createElement(
			'header',
			{ className: 'panel-header' },
			_react2.default.createElement(
			'h4',
			{ className: 'offscreen' },
			this.props.item.data.title)),


			_react2.default.createElement(
			_tabset2.default,
			null,
			_react2.default.createElement(
			_tab2.default,
			{ title: 'Info' },
			_react2.default.createElement(
			'div',
			{ className: 'toolbar hidden-sm-down hidden-lg-up' },
			_react2.default.createElement(
			'div',
			{ className: 'toolbar-right' },
			_react2.default.createElement(
			'button',
			{ className: 'btn' },
			'Edit'))),



			_react2.default.createElement(
			'div',
			{ className: 'row' },
			_react2.default.createElement(
			'div',
			{ className: 'col' },
			_react2.default.createElement(
			'dl',
			{ className: 'dl-horizontal' },
			this.props.fields.map(function (field) {
				var className;
				if (!field.visible || fieldsToSkip.includes(field.key)) {
					return null;
				}

				if (!field.value || !field.value.length) {
					className = 'empty';
				}

				switch (field.type) {
					case _this2.constructor.fieldTypes.EDITABLE:
					case _this2.constructor.fieldTypes.READONLY:
						return [_react2.default.createElement(
						'dt',
						{ className: className },
						field.label),
						_react2.default.createElement(
						'dd',
						{ className: className },
						function () {
							if (field.key === 'DOI') {
								return _react2.default.createElement(
								'a',
								{ rel: 'nofollow', href: 'http://dx.doi.org/' + field.value },
								field.value);

							} else if (field.key === 'url') {
								return _react2.default.createElement(
								'a',
								{ rel: 'nofollow', href: field.value },
								field.value);

							} else {
								return field.value;
							}
						}())];

					case _this2.constructor.fieldTypes.CREATORS:
						return null;}

			}))),


			_react2.default.createElement(
			'div',
			{ className: 'col' },
			_react2.default.createElement(
			'section',
			{ className: 'abstract' },
			_react2.default.createElement('div', { className: 'separator hidden-md-down', role: 'separator' }),
			_react2.default.createElement(
			'h5',
			null,
			'Abstract'),

			_react2.default.createElement(
			'div',
			null,
			this.props.item.data.abstractNote))))),





			_react2.default.createElement(
			_tab2.default,
			{ title: 'Notes' },
			'Notes tab content goes here'),

			_react2.default.createElement(
			_tab2.default,
			{ title: 'Tag' },
			'Tag tab content goes here'),

			_react2.default.createElement(
			_tab2.default,
			{ title: 'Attachments' },
			'Attachments tab content goes here'),

			_react2.default.createElement(
			_tab2.default,
			{ title: 'Related' },
			'Related tab content goes here')));



		} }],
	[{
		key: 'fieldTypes',
		get: function get() {
			return {
				EDITABLE: 'EDITABLE',
				READONLY: 'READONLY',
				CREATORS: 'CREATORS' };

		} }]);


	return ItemDetails;
}(_react2.default.Component);

exports.default = ItemDetails;


ItemDetails.propTypes = {};

ItemDetails.defaultProps = {
	item: {
		title: '',
		data: {} },

	fields: [] };


ItemDetails.propTypes.item = _item2.default.propTypes.item;
module.exports = exports['default'];