'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });


var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _itemsList = require('./items-list');

var _itemsList2 = _interopRequireDefault(_itemsList);

var _actions = require('../actions');

var _reduxRouter = require('redux-router');

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}

function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var ItemsListContainer = function (_React$Component) {
	_inherits(ItemsListContainer, _React$Component);

	function ItemsListContainer() {
		_classCallCheck(this, ItemsListContainer);

		return _possibleConstructorReturn(this, (ItemsListContainer.__proto__ || Object.getPrototypeOf(ItemsListContainer)).apply(this, arguments));
	}

	_createClass(ItemsListContainer, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.collection && nextProps.collection.key && nextProps.collection.key != this.props.collection.key) {
				this.props.dispatch((0, _actions.fetchItemsIfNeeded)(nextProps.collection));
			}
		} },
	{
		key: 'onItemSelected',
		value: function onItemSelected(itemKey) {
			this.props.dispatch((0, _reduxRouter.push)('/collection/' + this.props.collection.key + '/item/' + itemKey));
		} },
	{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_itemsList2.default, {
				isFetching: this.props.isFetching,
				items: this.props.items,
				selectedItemKey: this.props.selectedItemKey,
				onItemSelected: this.onItemSelected.bind(this) });

		} }]);


	return ItemsListContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
	var collections, collection;

	// selected = state.router.location.pathname.match(/^\/collection\//) ? state.router.params.key : null;
	var selectedCollectionKey = 'collection' in state.router.params ? state.router.params.collection : null;
	var selectedItemKey = 'item' in state.router.params ? state.router.params.item : null;

	if (state.library && state.library.libraryString && state.collections[state.library.libraryString]) {
		collections = state.collections[state.library.libraryString].collections;
	}

	if (collections && selectedCollectionKey) {
		collection = collections.find(function (c) {
			return c.key === selectedCollectionKey;
		});
	}

	var getTopLevelItems = function getTopLevelItems() {
		if (collection && state.items[collection.key]) {
			var items = state.items[collection.key].items;
			return items.filter(function (i) {
				return !('parentItem' in i.data);
			});
		}
		return [];
	};

	return {
		collection: collection || {},
		items: getTopLevelItems(),
		isFetching: collection && state.items[collection.key] ? state.items[collection.key].isFetching : false,
		selectedItemKey: selectedItemKey };

};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		dispatch: dispatch };

};

ItemsListContainer.propTypes = {
	collection: _react2.default.PropTypes.object.isRequired,
	items: _react2.default.PropTypes.array.isRequired,
	selectedItemKey: _react2.default.PropTypes.string,
	isFetching: _react2.default.PropTypes.bool.isRequired,
	dispatch: _react2.default.PropTypes.func.isRequired };


exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ItemsListContainer);
module.exports = exports['default'];