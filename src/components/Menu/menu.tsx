import React, { createContext, useState } from 'react';
import classnames from 'classnames';
import MenuItem, { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical';

type SelectCallback = (selectIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string,
    className?: string,
    mode?: MenuMode,
    style?: React.CSSProperties,
    onSelect?: SelectCallback,
    defaultOpenSubmenu?: string[],
}
interface IMenuContext {
    index: string,
    onSelect?: SelectCallback,
    mode?: MenuMode,
    defaultOpenSubmenu?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex, defaultOpenSubmenu, className, mode, style, children, onSelect } = props;
    const [currentActive, setActive] = useState(defaultIndex)
    const classNames = classnames('ironman-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',

    })
    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubmenu,
    }
    const renderChidren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: `${index}`,
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }
    return (
        <ul className={classNames} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChidren()}
            </MenuContext.Provider>

        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubmenu: []
}

export default Menu;
