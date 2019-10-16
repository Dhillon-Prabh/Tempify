/// <reference types="react" />
import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type Props = {
    /** message written inside default cookie banner */
    message?: string;
    /** called when user accepts cookies */
    onAccept: () => void;
    /** JSX element to link to your cookie-policy page */
    link?: JSX.Element;
    /** message written inside the button of the default cookie banner */
    buttonMessage?: string;
    /** className passed to close-icon */
    closeIcon?: string;
    /** pass `true` if you want to disable default style */
    disableStyle?: boolean;
    /** object with custom styles used to overwrite default ones */
    styles?: object;
    className?: string;
    /** pass `true` if you want to dismiss by clicking anywhere on the banner */
    dismissOnClick?: boolean;
};
export declare const propTypes: {
    message: PropTypes.Requireable<any>;
    onAccept: PropTypes.Validator<any>;
    link: PropTypes.Requireable<any>;
    buttonMessage: PropTypes.Requireable<any>;
    closeIcon: PropTypes.Requireable<any>;
    disableStyle: PropTypes.Requireable<any>;
    styles: PropTypes.Requireable<any>;
    className: PropTypes.Requireable<any>;
    dismissOnClick: PropTypes.Requireable<any>;
};
/**
 * React Cookie banner template
 */
export default class BannerContent extends React.Component<Props> {
    static propTypes: {
        message: PropTypes.Requireable<any>;
        onAccept: PropTypes.Validator<any>;
        link: PropTypes.Requireable<any>;
        buttonMessage: PropTypes.Requireable<any>;
        closeIcon: PropTypes.Requireable<any>;
        disableStyle: PropTypes.Requireable<any>;
        styles: PropTypes.Requireable<any>;
        className: PropTypes.Requireable<any>;
        dismissOnClick: PropTypes.Requireable<any>;
    };
    getStyle: (style: "message" | "button" | "link" | "icon" | "banner") => any;
    templateCloseIcon: (className: string, onClick: () => void, style: React.CSSProperties) => JSX.Element;
    templateCloseButton: (buttonMessage: string, onClick: () => void, style: React.CSSProperties) => JSX.Element;
    templateLink: (link: JSX.Element, style: React.CSSProperties) => React.ReactElement<any>;
    render(): JSX.Element;
    bannerClicked: () => void;
}
