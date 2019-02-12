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

var EditableField = function (_React$Component) {
	_inherits(EditableField, _React$Component);

	function EditableField(props) {
		_classCallCheck(this, EditableField);

		var _this = _possibleConstructorReturn(this, (EditableField.__proto__ || Object.getPrototypeOf(EditableField)).call(this, props));

		_this.state = {
			processing: false,
			editing: false,
			value: props.value };

		return _this;
	}

	_createClass(EditableField, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				value: nextProps.value });

		} },
	{
		key: 'save',
		value: function save(newValue) {
			var _this2 = this;

			this.cancelPending();
			this.setState({
				processing: true },
			function () {
				var promise = _this2.props.onSave(newValue);
				promise.then(function (processedValue) {
					_this2.setState({
						value: processedValue,
						editing: false,
						processing: false });

				});
				promise.catch(function () {
					_this2.setState({
						value: _this2.props.value,
						editing: true,
						processing: false });

				});
			});
		} },
	{
		key: 'edit',
		value: function edit() {
			var _this3 = this;

			this.setState({
				editing: true },
			function () {
				_this3.input.focus();
			});
		} },
	{
		key: 'cancel',
		value: function cancel() {
			this.cancelPending();
			this.setState({
				editing: false });

		} },
	{
		key: 'cancelPending',
		value: function cancelPending() {
			clearTimeout(this.pending);
		} },
	{
		key: 'editHandler',
		value: function editHandler(ev) {
			ev && ev.preventDefault();
			if (this.props.editOnClick) {
				this.edit();
			}
		} },
	{
		key: 'cancelHandler',
		value: function cancelHandler(ev) {
			ev && ev.preventDefault();
			return this.cancel();
		} },
	{
		key: 'submitHandler',
		value: function submitHandler(ev) {
			ev && ev.preventDefault();
			return this.save(this.input.value);
		} },
	{
		key: 'keyboardHandler',
		value: function keyboardHandler(ev) {
			if (ev.keyCode == 27) {
				this.cancelPending();
				ev.preventDefault();
				this.cancel();
			}
		} },
	{
		key: 'changeHandler',
		value: function changeHandler(ev) {
			ev && ev.preventDefault();
			this.setState({
				value: this.input.value },
			this.props.onChange);
		} },
	{
		key: 'blurHandler',
		value: function blurHandler() {
			var _this4 = this;

			this.pending = setTimeout(function () {
				_this4.save(_this4.input.value);
			}, 100);
		} },
	{
		key: 'render',
		value: function render() {
			var _this5 = this;

			if (this.state.processing) {
				return _react2.default.createElement(_spinner2.default, null);
			} else if (this.state.editing) {
				return _react2.default.createElement(
				'form',
				{ className: 'editable editable-field editable-editing',
					onSubmit: function onSubmit(ev) {
						_this5.submitHandler(ev);
					} },
				_react2.default.createElement('input', {
					ref: function ref(_ref) {
						return _this5.input = _ref;
					},
					disabled: this.state.processing ? 'disabled' : null,
					value: this.state.value,
					placeholder: this.props.placeholder,
					onChange: function onChange(ev) {
						return _this5.changeHandler(ev);
					},
					onKeyUp: function onKeyUp(ev) {
						return _this5.keyboardHandler(ev);
					},
					onBlur: function onBlur(ev) {
						return _this5.blurHandler(ev);
					} }));

			} else {
				return _react2.default.createElement(
				'span',
				{
					className: 'editable editable-field',
					onClick: function onClick(ev) {
						return _this5.editHandler(ev);
					} },
				this.state.value || this.props.emptytext);

			}
		} }]);


	return EditableField;
}(_react2.default.Component);

exports.default = EditableField;


EditableField.propTypes = {
	value: _react2.default.PropTypes.string,
	placeholder: _react2.default.PropTypes.string,
	emptytext: _react2.default.PropTypes.string,
	onSave: _react2.default.PropTypes.func,
	onChange: _react2.default.PropTypes.func,
	editOnClick: _react2.default.PropTypes.bool };


EditableField.defaultProps = {
	value: '',
	placeholder: '',
	emptytext: '',
	onSave: function onSave(v) {
		return Promise.resolve(v);
	},
	onChange: function onChange() {},
	editOnClick: true };

module.exports = exports['default'];