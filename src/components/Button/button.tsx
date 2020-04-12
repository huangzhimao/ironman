import React from 'react';
import classnames from 'classnames';

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}


export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}


interface BaseButtonProps {
    className?: string,
    disable?: boolean,
    size?: ButtonSize,
    btnType?: ButtonType,
    children: React.ReactNode,
    href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType,
        disable,
        size,
        children,
        className,
        href,
        ...restProps
    } = props;
    const classes = classnames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disable,
    })
    if (btnType === ButtonType.Link && href) {
        return (
            <a
                {...restProps}
                className={classes}
                href={href}>
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disable}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disable: false,
    btnType: ButtonType.Default,

}
export default Button;
