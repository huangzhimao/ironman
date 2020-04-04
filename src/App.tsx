import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';


function App() {
  return (
    <div className="App">
      <Button disable>disable</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello button</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>hello button</Button>
      <Button disable btnType={ButtonType.Link} href="http://www.baidu.com">Baidu Link dis</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">Baidu Link</Button>
    </div>
  );
}

export default App;
