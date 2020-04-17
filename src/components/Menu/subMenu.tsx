import React, { useContext, FunctionComponentElement, useState } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import { clearTimeout } from 'timers';

export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string
}
const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
    const context = useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubmenu as Array<string>;
    const isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpen);
    const classNames = classnames('menu-item submebu-item', {
        'is-active': context.index === index,
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearInterval(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300)
    }
    const clickEvent = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}
    const renderChildren = () => {
        const subMenuClasses = classnames('ironman-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classNames} {...hoverEvents}>
            <div className="submenu-title" {...clickEvent}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'


export default SubMenu;