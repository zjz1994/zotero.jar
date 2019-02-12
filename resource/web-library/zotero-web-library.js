'use strict';

var _libzotero = require('libzotero');

var _libzotero2 = _interopRequireDefault(_libzotero);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _collectionTree = require('./collection/collection-tree');

var _collectionTree2 = _interopRequireDefault(_collectionTree);

var _collectionTreeContainer = require('./collection/collection-tree-container');

var _collectionTreeContainer2 = _interopRequireDefault(_collectionTreeContainer);

var _item = require('./item/item');

var _item2 = _interopRequireDefault(_item);

var _itemDetails = require('./item/item-details');

var _itemDetails2 = _interopRequireDefault(_itemDetails);

var _itemsList = require('./item/items-list');

var _itemsList2 = _interopRequireDefault(_itemsList);

var _itemsListContainer = require('./item/items-list-container');

var _itemsListContainer2 = _interopRequireDefault(_itemsListContainer);

var _library = require('./library/library');

var _library2 = _interopRequireDefault(_library);

var _libraryContainer = require('./library/library-container');

var _libraryContainer2 = _interopRequireDefault(_libraryContainer);

var _navbar = require('./app/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _spinner = require('./app/spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _tagSelector = require('./tag/tag-selector');

var _tagSelector2 = _interopRequireDefault(_tagSelector);

var _editable = require('./editable/editable');

var _editable2 = _interopRequireDefault(_editable);

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

if (!_libzotero2.default.ui) {
	_libzotero2.default.ui = {};
}

//expose components & react
Object.assign(_libzotero2.default.ui, {
	CollectionTree: _collectionTree2.default,
	CollectionTreeContainer: _collectionTreeContainer2.default,
	Item: _item2.default,
	ItemDetails: _itemDetails2.default,
	ItemsList: _itemsList2.default,
	ItemsListContainer: _itemsListContainer2.default,
	Library: _library2.default,
	LibraryContainer: _libraryContainer2.default,
	Navbar: _navbar2.default,
	Spinner: _spinner2.default,
	TagSelector: _tagSelector2.default,
	Editable: _editable2.default,
	React: _react2.default,
	ReactDOM: _reactDom2.default });