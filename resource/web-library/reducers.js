'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });


var _actions = require('./actions.js');

function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function library() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _actions.SELECT_LIBRARY:
			return action.library;
		default:
			return state;}

}

function collectionsByLibrary() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		isFetching: false,
		collections: [] };

	var action = arguments[1];

	switch (action.type) {
		case _actions.REQUEST_COLLECTIONS:
			return Object.assign({}, state, {
				isFetching: true });

		case _actions.RECEIVE_COLLECTIONS:
			return Object.assign({}, state, {
				isFetching: false,
				collections: action.collections });

		case _actions.ERROR_FETCHING_COLLECTIONS:
			return Object.assign({}, state, {
				isFetching: false });

		default:
			return state;}

}

function collections() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		selected: '' };

	var action = arguments[1];

	switch (action.type) {
		case _actions.REQUEST_COLLECTIONS:
		case _actions.RECEIVE_COLLECTIONS:
		case _actions.ERROR_FETCHING_COLLECTIONS:
			return Object.assign({}, state, _defineProperty({}, action.libraryString, collectionsByLibrary(state[action.libraryString], action)));
		default:
			return state;}

}

function itemsByCollection() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		isFetching: false,
		items: [] };

	var action = arguments[1];

	switch (action.type) {
		case _actions.REQUEST_ITEMS:
			return Object.assign({}, state, {
				isFetching: true });


		case _actions.RECEIVE_ITEMS:
			return Object.assign({}, state, {
				isFetching: false,
				items: action.items });


		case _actions.ERROR_FETCHING_ITEMS:
			return Object.assign({}, state, {
				isFetching: false });


		default:
			return state;}

}

function items() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		selected: '' };

	var action = arguments[1];

	switch (action.type) {
		case _actions.REQUEST_ITEMS:
		case _actions.RECEIVE_ITEMS:
		case _actions.ERROR_FETCHING_ITEMS:
			return Object.assign({}, state, _defineProperty({}, action.collectionKey, itemsByCollection(state[action.collectionKey], action)));
		case _actions.SELECT_ITEM:
			return Object.assign({}, state, {
				selected: action.index });

		default:
			return state;}

}

function config() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	return state;
}

exports.default = {
	library: library,
	collections: collections,
	items: items,
	config: config };

module.exports = exports['default'];