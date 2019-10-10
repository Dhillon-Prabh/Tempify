/// <reference types="react" />
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Cookies } from 'react-cookie';
import { Props as BannerContentProps } from './BannerContent';
export declare type CookieBannerRequiredProps = {
    /** custom component rendered if user has not accepted cookies */
    children?: any;
    /** called when user accepts cookies */
    onAccept?: (o: {
        cookie: string;
    }) => void;
    /** instance of Cookies class to be used in server-side-rendering */
    cookies?: Cookies;
    /** cookie-key used to save user's decision about you cookie-policy */
    cookie?: string;
    /** used to set the cookie expiration */
    cookieExpiration?: number | {
        years?: number;
        days?: number;
        hours?: number;
    };
    /** used to set the cookie path */
    cookiePath?: string;
    /** whether the cookie banner should be dismissed on scroll or not */
    dismissOnScroll?: boolean;
    /** amount of pixel the user need to scroll to dismiss the cookie banner */
    dismissOnScrollThreshold?: number;
};
export declare type CookieBannerDefaultProps = {
    onAccept: () => void;
    dismissOnScroll: boolean;
    cookies: Cookies;
    cookie: string;
    cookieExpiration: {
        years: number;
    };
    buttonMessage: string;
    dismissOnScrollThreshold: number;
    styles: object;
};
export declare type CookieBannerProps = BannerContentProps & CookieBannerRequiredProps & Partial<CookieBannerDefaultProps>;
export declare namespace CookieBanner {
    type Props = CookieBannerProps;
}
export declare type State = {
    listeningScroll: boolean;
};
/**
 * React Cookie banner dismissable with just a scroll!
 */
export default class CookieBanner extends React.Component<CookieBanner.Props, State> {
    static propTypes: {
        children: PropTypes.Requireable<any>;
        onAccept: PropTypes.Requireable<any>;
        cookies: PropTypes.Requireable<any>;
        cookie: PropTypes.Requireable<any>;
        cookieExpiration: PropTypes.Requireable<any>;
        cookiePath: PropTypes.Requireable<any>;
        dismissOnScroll: PropTypes.Requireable<any>;
        dismissOnScrollThreshold: PropTypes.Requireable<any>;
        message: PropTypes.Requireable<any>;
        link: PropTypes.Requireable<any>;
        buttonMessage: PropTypes.Requireable<any>;
        closeIcon: PropTypes.Requireable<any>;
        disableStyle: PropTypes.Requireable<any>;
        styles: PropTypes.Requireable<any>;
        className: PropTypes.Requireable<any>;
        dismissOnClick: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        onAccept: () => void;
        dismissOnScroll: boolean;
        cookies: Cookies;
        cookie: string;
        cookieExpiration: {
            years: number;
        };
        buttonMessage: string;
        dismissOnScrollThreshold: number;
        styles: {};
    };
    state: {
        listeningScroll: boolean;
    };
    componentDidMount(): void;
    addOnScrollListener: (props?: CookieBannerProps | undefined) => void;
    removeOnScrollListener: () => void;
    onScroll: () => void;
    getSecondsSinceExpiration: (cookieExpiration: number | {
        years?: number | undefined;
        days?: number | undefined;
        hours?: number | undefined;
    } | undefined) => number;
    onAccept: () => void;
    hasAcceptedCookies(): string | undefined;
    templateChildren(children: CookieBanner.Props['children'], onAccept: CookieBannerDefaultProps['onAccept']): any;
    render(): any;
    componentWillReceiveProps(nextProps: CookieBanner.Props): void;
    componentWillUnmount(): void;
}
