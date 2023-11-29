import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';

import useFlightData from './hooks/useFlightData';
import Toast from './components/toast/Toast';
function App() {

 const {flights, loading} = useFlightData({scheduleDate:"2023-12-09"});
 useEffect(() => {
  console.log("lşaksdq",flights)
}, [flights])

  return (
    <div className="App">
     {loading ? <div> loading....</div> : null}
     <Toast/>
    </div>
  );
}

export default App;
