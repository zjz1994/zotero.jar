'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });


var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tab = require('./tab.jsx');

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}

function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var Tabset = function (_React$Component) {
	_inherits(Tabset, _React$Component);

	function Tabset(props) {
		_classCallCheck(this, Tabset);

		var _this = _possibleConstructorReturn(this, (Tabset.__proto__ || Object.getPrototypeOf(Tabset)).call(this, props));

		_this.state = {
			active: props.active };

		return _this;
	}

	_createClass(Tabset, [{
		key: 'setActiveTab',
		value: function setActiveTab(active, ev) {
			ev.preventDefault();
			this.setState({
				active: active });

		} },
	{
		key: 'renderTabHeaders',
		value: function renderTabHeaders() {
			var _this2 = this;

			var tabHeaders = [];
			var counter = 0;
			if (Array.isArray(this.props.children)) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.props.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var child = _step.value;

						if (child.type === _tab2.default) {
							(function () {
								var tabIndex = counter;
								tabHeaders.push(_react2.default.createElement(
								'li',
								{ key: tabIndex, className: _this2.state.active === tabIndex ? 'active' : '' },
								_react2.default.createElement(
								'a',
								{ href: '#', onClick: function onClick(ev) {
										return _this2.setActiveTab(tabIndex, ev);
									} },
								child.props.title)));


								counter++;
							})();
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

			return tabHeaders;
		} },
	{
		key: 'renderTabContents',
		value: function renderTabContents() {
			var tabContents = [];
			var counter = 0;
			if (Array.isArray(this.props.children)) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.props.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var child = _step2.value;

						if (child.type === _tab2.default) {
							tabContents.push(_react2.default.createElement(
							'div',
							{ key: counter, className: 'tab-content' },
							_react2.default.createElement(
							'div',
							{ className: 'tab-pane ' + (this.state.active === counter ? 'active' : '') },
							child)));


							counter++;
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}

			return tabContents;
		} },
	{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
			'div',
			{ className: 'panel' },
			_react2.default.createElement(
			'header',
			{ className: 'panel-header' },
			_react2.default.createElement(
			'h4',
			{ className: 'offscreen' },
			this.props.title),

			_react2.default.createElement(
			'nav',
			null,
			_react2.default.createElement(
			'ul',
			{ className: 'tabs compact' },
			this.renderTabHeaders()))),



			_react2.default.createElement(
			'div',
			{ className: 'panel-body' },
			this.renderTabContents()));


		} }]);


	return Tabset;
}(_react2.default.Component);

exports.default = Tabset;


Tabset.propTypes = {
	title: _react2.default.PropTypes.string,
	children: _react2.default.PropTypes.node,
	active: _react2.default.PropTypes.number };


Tabset.defaultProps = {
	children: null,
	active: 0 };

module.exports = exports['default'];