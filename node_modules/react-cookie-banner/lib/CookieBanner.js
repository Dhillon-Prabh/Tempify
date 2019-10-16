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
var react_cookie_1 = require("react-cookie");
var BannerContent_1 = require("./BannerContent");
/**
 * React Cookie banner dismissable with just a scroll!
 */
var CookieBanner = /** @class */ (function (_super) {
    __extends(CookieBanner, _super);
    function CookieBanner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { listeningScroll: false };
        _this.addOnScrollListener = function (props) {
            var _props = props || _this.props;
            if (!_this.state.listeningScroll && !_this.hasAcceptedCookies() && _props.dismissOnScroll) {
                if (window.attachEvent) {
                    // Internet Explorer
                    window.attachEvent('onscroll', _this.onScroll);
                }
                else if (window.addEventListener) {
                    window.addEventListener('scroll', _this.onScroll, false);
                }
                _this.setState({ listeningScroll: true });
            }
        };
        _this.removeOnScrollListener = function () {
            if (_this.state.listeningScroll) {
                if (window.detachEvent) {
                    // Internet Explorer
                    window.detachEvent('onscroll', _this.onScroll);
                }
                else if (window.removeEventListener) {
                    window.removeEventListener('scroll', _this.onScroll, false);
                }
                _this.setState({ listeningScroll: false });
            }
        };
        _this.onScroll = function () {
            // tacit agreement buahaha! (evil laugh)
            var dismissOnScrollThreshold = _this.props.dismissOnScrollThreshold;
            if (window.pageYOffset > dismissOnScrollThreshold) {
                _this.onAccept();
            }
        };
        _this.getSecondsSinceExpiration = function (cookieExpiration) {
            if (typeof cookieExpiration === 'number') {
                return cookieExpiration;
            }
            var SECONDS_IN_YEAR = 31536000;
            var SECONDS_IN_DAY = 86400;
            var SECONDS_IN_HOUR = 3600;
            var _cookieExpiration = __assign({ years: 0, days: 0, hours: 0 }, cookieExpiration);
            var years = _cookieExpiration.years, days = _cookieExpiration.days, hours = _cookieExpiration.hours;
            return (years * SECONDS_IN_YEAR) + (days * SECONDS_IN_DAY) + (hours * SECONDS_IN_HOUR);
        };
        _this.onAccept = function () {
            var _a = _this.props, cookies = _a.cookies, cookie = _a.cookie, cookieExpiration = _a.cookieExpiration, path = _a.cookiePath, onAccept = _a.onAccept;
            cookies.set(cookie, true, {
                path: path,
                expires: new Date(Date.now() + (_this.getSecondsSinceExpiration(cookieExpiration) * 1000))
            });
            onAccept({ cookie: cookie });
            if (_this.state.listeningScroll) {
                _this.removeOnScrollListener();
            }
            else {
                _this.forceUpdate();
            }
        };
        return _this;
    }
    CookieBanner.prototype.componentDidMount = function () {
        this.addOnScrollListener();
    };
    CookieBanner.prototype.hasAcceptedCookies = function () {
        var _a = this.props, cookies = _a.cookies, cookie = _a.cookie;
        return cookies.get(cookie);
    };
    CookieBanner.prototype.templateChildren = function (children, onAccept) {
        if (typeof children === 'function') {
            return children(onAccept);
        }
        return children;
    };
    CookieBanner.prototype.render = function () {
        var _a = this, onAccept = _a.onAccept, _b = _a.props, message = _b.message, link = _b.link, buttonMessage = _b.buttonMessage, closeIcon = _b.closeIcon, disableStyle = _b.disableStyle, styles = _b.styles, className = _b.className, children = _b.children, dismissOnClick = _b.dismissOnClick, props = __rest(_b, ["message", "link", "buttonMessage", "closeIcon", "disableStyle", "styles", "className", "children", "dismissOnClick"]);
        var hasAcceptedCookies = this.hasAcceptedCookies();
        var bannerContentProps = __assign({}, omit(props, Object.keys(CookieBanner.propTypes)), { message: message, onAccept: onAccept, link: link, buttonMessage: buttonMessage,
            closeIcon: closeIcon, disableStyle: disableStyle, styles: styles, className: className, dismissOnClick: dismissOnClick });
        if (hasAcceptedCookies) {
            return null;
        }
        return children ?
            this.templateChildren(children, onAccept) :
            React.createElement(BannerContent_1["default"], __assign({}, bannerContentProps));
    };
    CookieBanner.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.dismissOnScroll) {
            this.addOnScrollListener(nextProps);
        }
        else {
            this.removeOnScrollListener();
        }
    };
    CookieBanner.prototype.componentWillUnmount = function () {
        this.removeOnScrollListener();
    };
    CookieBanner.propTypes = __assign({}, BannerContent_1.propTypes, { children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func
        ]), onAccept: PropTypes.func, cookies: PropTypes.instanceOf(react_cookie_1.Cookies), cookie: PropTypes.string, cookieExpiration: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape({
                years: PropTypes.number,
                days: PropTypes.number,
                hours: PropTypes.number
            })
        ]), cookiePath: PropTypes.string, dismissOnScroll: PropTypes.bool, dismissOnScrollThreshold: PropTypes.number });
    CookieBanner.defaultProps = {
        onAccept: function () { },
        dismissOnScroll: true,
        cookies: new react_cookie_1.Cookies(),
        cookie: 'accepts-cookies',
        cookieExpiration: { years: 1 },
        buttonMessage: 'Got it',
        dismissOnScrollThreshold: 0,
        styles: {}
    };
    return CookieBanner;
}(React.Component));
exports["default"] = CookieBanner;
