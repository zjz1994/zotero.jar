'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });

exports.ERROR_FETCHING_ITEMS = exports.ERROR_FETCHING_COLLECTIONS = exports.RECEIVE_COLLECTIONS = exports.REQUEST_COLLECTIONS = exports.RECEIVE_ITEMS = exports.REQUEST_ITEMS = exports.SELECT_ITEM = exports.SELECT_LIBRARY = undefined;
exports.selectLibrary = selectLibrary;
exports.requestCollections = requestCollections;
exports.receiveCollections = receiveCollections;
exports.requestItems = requestItems;
exports.receiveItems = receiveItems;
exports.selectItem = selectItem;
exports.errorFetchingCollection = errorFetchingCollection;
exports.errorFetchingItems = errorFetchingItems;
exports.sellectItem = sellectItem;
exports.fetchCollectionsIfNeeded = fetchCollectionsIfNeeded;
exports.fetchItemsIfNeeded = fetchItemsIfNeeded;

var _libzotero = require('libzotero');

var _libzotero2 = _interopRequireDefault(_libzotero);

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var SELECT_LIBRARY = exports.SELECT_LIBRARY = 'SELECT_LIBRARY';
var SELECT_ITEM = exports.SELECT_ITEM = 'SELECT_ITEM';
var REQUEST_ITEMS = exports.REQUEST_ITEMS = 'REQUEST_ITEMS';
var RECEIVE_ITEMS = exports.RECEIVE_ITEMS = 'RECEIVE_ITEMS';
var REQUEST_COLLECTIONS = exports.REQUEST_COLLECTIONS = 'REQUEST_COLLECTIONS';
var RECEIVE_COLLECTIONS = exports.RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';
var ERROR_FETCHING_COLLECTIONS = exports.ERROR_FETCHING_COLLECTIONS = 'ERROR_FETCHING_COLLECTIONS';
var ERROR_FETCHING_ITEMS = exports.ERROR_FETCHING_ITEMS = 'ERROR_FETCHING_ITEMS';

function selectLibrary(type, id, key) {
	var library = new _libzotero2.default.Library(type, id, null, key);

	return {
		type: SELECT_LIBRARY,
		library: library };

}

function requestCollections(libraryString) {
	return {
		type: REQUEST_COLLECTIONS,
		libraryString: libraryString };

}

function receiveCollections(libraryString, collections) {
	collections.sort(function (a, b) {
		return a.apiObj.data.name.toUpperCase().localeCompare(b.apiObj.data.name.toUpperCase());
	});
	return {
		type: RECEIVE_COLLECTIONS,
		libraryString: libraryString,
		collections: collections,
		receivedAt: Date.now() };

}

function requestItems(collectionKey) {
	return {
		type: REQUEST_ITEMS,
		collectionKey: collectionKey };

}

function receiveItems(collectionKey, items) {
	items.sort(function (a, b) {
		if (!('title' in a.data)) {
			return -1;
		}
		if (!('title' in b.data)) {
			return 1;
		}
		return a.data.title.toUpperCase().localeCompare(b.data.title.toUpperCase());
	});

	return {
		type: RECEIVE_ITEMS,
		collectionKey: collectionKey,
		items: items,
		receivedAt: Date.now() };

}

function selectItem(index) {
	return {
		type: SELECT_ITEM,
		index: index };

}

function errorFetchingCollection(libraryString, error) {
	return {
		type: ERROR_FETCHING_COLLECTIONS,
		libraryString: libraryString,
		error: error };

}

function errorFetchingItems(error) {
	return {
		type: ERROR_FETCHING_ITEMS,
		error: error };

}

function sellectItem(index) {
	return {
		type: SELECT_ITEM,
		index: index };

}

function fetchCollections(library) {
	return function (dispatch) {
		dispatch(requestCollections(library.libraryString));
		library.loadUpdatedCollections().then(function () {
			dispatch(receiveCollections(library.libraryString, library.collections.objectArray));
		}).catch(function (error) {
			dispatch(errorFetchingCollection(library.libraryString, error));
		});
	};
}

function fetchCollectionsIfNeeded(library) {
	return function (dispatch, getState) {
		var state = getState();
		if (!state.collections[library]) {
			dispatch(fetchCollections(library));
		}
	};
}

function fetchItems(collection, library) {
	return function (dispatch) {
		dispatch(requestItems(collection.key));
		collection.getMemberItemKeys().then(function (keys) {
			library.loadFromKeys(keys).then(function (results) {
				if (Array.isArray(results) && results.length >= 1 && Array.isArray(results[0].data)) {
					var items = results[0].data;
					dispatch(receiveItems(collection.key, items));
				} else {
					dispatch(errorFetchingItems('Unexpected response from the API'));
				}
			}).catch(function (error) {
				dispatch(errorFetchingItems(error));
			});
		}).catch(function (error) {
			dispatch(errorFetchingItems(error));
		});
	};
}

function fetchItemsIfNeeded(collection) {
	return function (dispatch, getState) {
		var state = getState();
		if (!state.items[collection]) {
			return dispatch(fetchItems(collection, state.library));
		}
	};
}