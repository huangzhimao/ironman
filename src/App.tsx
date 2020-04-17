import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'



function App() {
  return (
    <div className="App">
      <Menu onSelect={(index) => { console.log(index) }} mode="vertical" defaultOpenSubmenu={['3']}>
        <MenuItem >
          active0
        </MenuItem>
        <MenuItem disabled>
          active1
        </MenuItem>
        <MenuItem >
          active2
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem >
            active0
        </MenuItem>
          <MenuItem disabled>
            active1
        </MenuItem>
          <MenuItem >
            active2
        </MenuItem>
        </SubMenu>
      </Menu>
      <Button disable>disable</Button>
      <Button onClick={() => { console.log(134) }} btnType={ButtonType.Primary} size={ButtonSize.Large}>hello button</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>hello button</Button>
      <Button disable btnType={ButtonType.Link} href="http://www.baidu.com">Baidu Link dis</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">Baidu Link</Button>
    </div>
  );
}

export default App;
