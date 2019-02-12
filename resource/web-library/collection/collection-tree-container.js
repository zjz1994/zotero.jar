'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true });


var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _collectionTree = require('./collection-tree');

var _collectionTree2 = _interopRequireDefault(_collectionTree);

var _actions = require('../actions');

var _reduxRouter = require('redux-router');

function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}

function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var mapTreePath = function mapTreePath(selectedKey, collections, curPath) {
	if (!curPath) {
		curPath = [];
	}

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = collections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var col = _step.value;

			if (col.key === selectedKey) {
				return curPath.concat(col.key);
			} else if (col.children.length) {
				var maybePath = mapTreePath(selectedKey, col.children, curPath.concat(col.key));
				if (maybePath.includes(selectedKey)) {
					return maybePath;
				}
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

	return curPath;
};

var applyTreePath = function applyTreePath(collections, path, reopen) {
	return collections.map(function (c) {
		var index = path.indexOf(c.key);
		c.isSelected = index >= 0 && index === path.length - 1;
		if (reopen) {
			c.isOpen = index >= 0 && index < path.length - 1;
		} else if (index >= 0 && index < path.length - 1) {
			c.isOpen = true;
		}
		return c;
	});
};

var CollectionTreeContainer = function (_React$Component) {
	_inherits(CollectionTreeContainer, _React$Component);

	function CollectionTreeContainer(props) {
		_classCallCheck(this, CollectionTreeContainer);

		var _this = _possibleConstructorReturn(this, (CollectionTreeContainer.__proto__ || Object.getPrototypeOf(CollectionTreeContainer)).call(this));

		var path = mapTreePath(props.selected, props.collections.filter(function (c) {
			return c.nestingDepth === 1;
		}));
		_this.state = {
			collections: applyTreePath(props.collections, path, props.reopen) };

		return _this;
	}

	_createClass(CollectionTreeContainer, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.library && nextProps.library != this.props.library) {
				this.props.dispatch((0, _actions.fetchCollectionsIfNeeded)(nextProps.library));
			}

			if ('selected' in nextProps && nextProps.selected != this.props.selected || 'collections' in nextProps && nextProps.collections != this.props.collections) {
				var path = mapTreePath(nextProps.selected, nextProps.collections.filter(function (c) {
					return c.nestingDepth === 1;
				}));
				this.setState({
					collections: applyTreePath(nextProps.collections, path, nextProps.reopen) });

			}
		} },
	{
		key: 'toggleOpenCollection',
		value: function toggleOpenCollection(collectionKey) {
			this.setState({
				collections: this.state.collections.map(function (c) {
					if (c.key === collectionKey) {
						c.isOpen = !c.isOpen;
					}
					return c;
				}) });

		} },
	{
		key: 'onCollectionSelected',
		value: function onCollectionSelected(collectionKey) {
			this.props.dispatch((0, _reduxRouter.push)('/collection/' + collectionKey));
		} },
	{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_collectionTree2.default, {
				collections: this.state.collections,
				path: this.state.path,
				isFetching: this.props.isFetching,
				onCollectionOpened: this.toggleOpenCollection.bind(this),
				onCollectionSelected: this.onCollectionSelected.bind(this) });

		} }]);


	return CollectionTreeContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		library: state.library,
		collections: state.library && state.collections[state.library.libraryString] ? state.collections[state.library.libraryString].collections : [],
		isFetching: state.library && state.collections[state.library.libraryString] ? state.collections[state.library.libraryString].isFetching : false,
		selected: 'collection' in state.router.params ? state.router.params.collection : null,
		reopen: state.router && state.router.location.action != 'PUSH' };

};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		dispatch: dispatch };

};

CollectionTreeContainer.propTypes = {
	library: _react2.default.PropTypes.object,
	collections: _react2.default.PropTypes.array,
	isFetching: _react2.default.PropTypes.bool.isRequired,
	dispatch: _react2.default.PropTypes.func.isRequired,
	selected: _react2.default.PropTypes.string,
	reopen: _react2.default.PropTypes.bool };


_collectionTree2.default.defaultProps = {
	collections: [],
	selected: '' };


exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CollectionTreeContainer);
module.exports = exports['default'];