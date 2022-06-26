import './App.css';
import toronto from './toronto.png';
import vancouver from './vancouver.png';
import React from 'react';
import Map from './Map';
import * as Locations from './locations';

function App() {

  const [viewState, setViewState] = React.useState(Locations.toronto);
  const handleViewStateChange = ({viewState}) => setViewState(viewState);
  const handleFlyTo = destination => {
    setViewState({
      ...viewState,
      ...destination,
      transitionDuration: 8000,
    });
  }
  
  return (  
    <>
      <div>
        <Map 
          width="100vw" 
          height="100vh"
          onViewStateChange={handleViewStateChange}
          viewState={viewState}
          />
      </div>
      <div className='buttons'>
        <h1>Select a City</h1>
        <button key="toronto" onClick={() => handleFlyTo(Locations['toronto'])}>
          <img alt='toronto' src={toronto}/>
          Toronto
        </button>
        <button key="vancouver" onClick={() => handleFlyTo(Locations['vancouver'])}>
          <img alt='vancouver' src={vancouver}/>
          Vancouver
        </button>
      </div>
    </>
  );
}

export default App;