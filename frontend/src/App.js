import React, { useState } from 'react';
import './App.css';
import { Component2 } from './component';


function App() {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [visible, setVisible] = useState(false);
  const onSelect = name => {
    setSelectedPlayer(name);
    setVisible(true);
  }
  // const ViewProfileButton = ({name}) => {
  //   return <Button type='dashed' style={{float:'right'}} onClick={()=>onSelect(name)}> View Full Profile </Button>
  // }

  const onClose = () => setVisible(false);
  return (
    <div className="App">
      <Component2 />
    </div>
  );
}

export default App;
