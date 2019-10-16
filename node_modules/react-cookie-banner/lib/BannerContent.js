"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var React = require("react");
var PropTypes = require("prop-types");
var omit = require("lodash.omit");
var cx = require("classnames");
var styleUtils = require("./styleUtils");
exports.propTypes = {
    message: PropTypes.string,
    onAccept: PropTypes.func.isRequired,
    link: PropTypes.element,
    buttonMessage: PropTypes.string,
    closeIcon: PropTypes.string,
    disableStyle: PropTypes.bool,
    styles: PropTypes.object,
    className: PropTypes.string,
    dismissOnClick: PropTypes.bool
};
/**
 * React Cookie banner template
 */
var BannerContent = /** @class */ (function (_super) {
    __extends(BannerContent, _super);
    function BannerContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getStyle = function (style) {
            var _a = _this.props, disableStyle = _a.disableStyle, _b = _a.styles, styles = _b === void 0 ? {} : _b;
            if (!disableStyle) {
                // apply custom styles if available
                return __assign({}, styleUtils.getStyle(style), styles[style]);
            }
        };
        _this.templateCloseIcon = function (className, onClick, style) { return (React.createElement("button", __assign({}, { onClick: onClick, style: style }),
            React.createElement("i", __assign({}, { className: className })))); };
        _this.templateCloseButton = function (buttonMessage, onClick, style) { return (React.createElement("button", __assign({ className: 'button-close' }, { onClick: onClick, style: style }), buttonMessage)); };
        _this.templateLink = function (link, style) { return (React.cloneElement(link, link.props.style ? undefined : { style: style })); };
        _this.bannerClicked = function () {
            if (_this.props.dismissOnClick) {
                _this.props.onAccept();
            }
        };
        return _this;
    }
    BannerContent.prototype.render = function () {
        var _a = this, getStyle = _a.getStyle, _b = _a.props, onAccept = _b.onAccept, className = _b.className, message = _b.message, closeIcon = _b.closeIcon, link = _b.link, _c = _b.buttonMessage, buttonMessage = _c === void 0 ? 'Got it' : _c, _wrapperProps = __rest(_b, ["onAccept", "className", "message", "closeIcon", "link", "buttonMessage"]);
        var cookieMessageStyle = getStyle('message');
        var wrapperProps = __assign({}, omit(_wrapperProps, Object.keys(exports.propTypes)), { className: cx('react-cookie-banner', className), style: getStyle('banner') });
        return (React.createElement("div", __assign({}, wrapperProps, { onClick: this.bannerClicked }),
            React.createElement("span", { className: 'cookie-message', style: cookieMessageStyle },
                message,
                link && this.templateLink(link, getStyle('link'))),
            !closeIcon && this.templateCloseButton(buttonMessage, onAccept, getStyle('button')),
            !!closeIcon && this.templateCloseIcon(closeIcon, onAccept, getStyle('icon'))));
    };
    BannerContent.propTypes = exports.propTypes;
    return BannerContent;
}(React.Component));
exports["default"] = BannerContent;
