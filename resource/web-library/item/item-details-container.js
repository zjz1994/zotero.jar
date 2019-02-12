'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });


var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _libzotero = require('libzotero');

var _libzotero2 = _interopRequireDefault(_libzotero);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _itemDetails = require('./item-details');

var _itemDetails2 = _interopRequireDefault(_itemDetails);

var _reactRedux = require('react-redux');

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}

function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var ItemDetailsContainer = function (_React$Component) {
	_inherits(ItemDetailsContainer, _React$Component);

	function ItemDetailsContainer() {
		_classCallCheck(this, ItemDetailsContainer);

		return _possibleConstructorReturn(this, (ItemDetailsContainer.__proto__ || Object.getPrototypeOf(ItemDetailsContainer)).apply(this, arguments));
	}

	_createClass(ItemDetailsContainer, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_itemDetails2.default, {
				fields: this.props.fields,
				item: this.props.item });

		} }]);


	return ItemDetailsContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
	var items, item;
	var selectedCollectionKey = 'collection' in state.router.params ? state.router.params.collection : null;
	var selectedItemKey = 'item' in state.router.params ? state.router.params.item : null;
	var _Zotero$Item$prototyp = _libzotero2.default.Item.prototype,
	fieldMap = _Zotero$Item$prototyp.fieldMap,
	typeMap = _Zotero$Item$prototyp.typeMap,
	hideFields = _Zotero$Item$prototyp.hideFields,
	noEditFields = _Zotero$Item$prototyp.noEditFields;
	var _ItemDetails$fieldTyp = _itemDetails2.default.fieldTypes,
	CREATORS = _ItemDetails$fieldTyp.CREATORS,
	READONLY = _ItemDetails$fieldTyp.READONLY,
	EDITABLE = _ItemDetails$fieldTyp.EDITABLE;


	if (selectedCollectionKey && state.items[selectedCollectionKey]) {
		items = state.items[selectedCollectionKey].items;
	}

	if (items && selectedItemKey) {
		item = items.find(function (i) {
			return i.key === selectedItemKey;
		});
	}

	return {
		fields: Object.keys(fieldMap).map(function (f) {
			return {
				key: f,
				label: fieldMap[f],
				visible: !hideFields.includes(f),
				type: f === 'creators' ? CREATORS : noEditFields.includes(f) ? READONLY : EDITABLE,
				value: item ? f === 'itemType' ? typeMap[item.data[f]] : item.data[f] : null };

		}),
		item: item || undefined };

};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		dispatch: dispatch };

};

ItemDetailsContainer.propTypes = {
	fields: _react2.default.PropTypes.array };


ItemDetailsContainer.propTypes.item = _item2.default.propTypes.item;

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ItemDetailsContainer);
module.exports = exports['default'];