import './App.css';
import React, { useState } from 'react';
import { Train } from './components/Train'
import { Questions } from './components/Questions'

function App() {
  const[train, setTrain] = useState(false)
  return (
    <div className="App" style={{overflowY:'scroll'}}>
      {
        train === false? <Train setTrain={setTrain} />: <Questions setTrain={setTrain}/>
      }
    </div>
  );
}

export default App;
