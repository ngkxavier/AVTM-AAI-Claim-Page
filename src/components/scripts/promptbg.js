import React, { useState,useEffect  } from 'react';

//component imports
import Avtm3k from './avtm3k';

function PromptBackground( {_props} ) {
  const [isComponentOne, setIsComponentOne] = useState(true);

  const swapComponents = () => {
    setIsComponentOne(prevState => !prevState);  // Ensures the state definitely toggles
    console.log("Component swap triggered:", isComponentOne);
  };

  useEffect(() => {
    console.log("isComponentOne updated to:", isComponentOne);  // Confirms the state update in UI
  }, [isComponentOne]);  // This effect runs every time isComponentOne changes

  return (
    <div className='-container'>
      <Avtm3k isComponentOne={isComponentOne} onSwap={swapComponents} _props={_props}/>
    </div>
  );
}

export default PromptBackground;