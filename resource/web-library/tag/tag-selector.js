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

var TagSelector = function (_React$Component) {
	_inherits(TagSelector, _React$Component);

	function TagSelector() {
		_classCallCheck(this, TagSelector);

		return _possibleConstructorReturn(this, (TagSelector.__proto__ || Object.getPrototypeOf(TagSelector)).apply(this, arguments));
	}

	_createClass(TagSelector, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
			'div',
			{ className: 'tag-selector' },
			_react2.default.createElement(
			'div',
			{ className: 'tag-selector-container' },
			_react2.default.createElement(
			'ul',
			{ className: 'tag-selector-list' },
			this.props.tags.map(function (tag) {
				var className = 'tag-selector-item';
				if (tag.disabled) {
					className += ' disabled';
				} else if (tag.selected) {
					className += ' selected';
				}
				if (tag.color) {
					className += ' colored';
				}
				return _react2.default.createElement(
				'li',
				{
					className: className,
					key: tag.name,
					onClick: function onClick(ev) {
						return _this2.props.onSelection(tag, ev);
					},
					onContextMenu: function onContextMenu(ev) {
						return _this2.props.onTagContext(tag, ev);
					},
					style: tag.color ? { color: tag.color } : {} },

				tag.name);

			}))),


			_react2.default.createElement(
			'div',
			{ className: 'tag-selector-filter-container' },
			_react2.default.createElement('input', {
				type: 'search',
				value: this.props.searchString,
				onChange: function onChange(ev) {
					return _this2.props.onSearch(ev.target.value);
				},
				className: 'tag-selector-filter' }),
			_react2.default.createElement('button', { className: 'tag-selector-actions', onClick: function onClick(ev) {
					return _this2.props.onSettings(ev);
				} })));


		} }]);


	return TagSelector;
}(_react2.default.Component);

exports.default = TagSelector;


TagSelector.propTypes = {
	tags: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
		name: _react2.default.PropTypes.string,
		selected: _react2.default.PropTypes.bool,
		color: _react2.default.PropTypes.string,
		disabled: _react2.default.PropTypes.bool })),

	searchString: _react2.default.PropTypes.string,
	shouldFocus: _react2.default.PropTypes.bool,
	onSelection: _react2.default.PropTypes.func,
	onTagContext: _react2.default.PropTypes.func,
	onSearch: _react2.default.PropTypes.func,
	onSettings: _react2.default.PropTypes.func };


TagSelector.defaultProps = {
	tags: [],
	searchString: '',
	shouldFocus: false,
	onSelection: function onSelection() {
		return Promise.resolve();
	},
	onTagContext: function onTagContext() {
		return Promise.resolve();
	},
	onSearch: function onSearch() {
		return Promise.resolve();
	},
	onSettings: function onSettings() {
		return Promise.resolve();
	} };

module.exports = exports['default'];