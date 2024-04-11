import React from 'react';
import '../css/nextpagebtn.css'; 


//image import
import nextPageImg from '../img/nextpage.png'


function NextPageButton({ isComponentOne, onSwap }) {
  return (
    <div className='nextpagecomponent'>
        <h3>{isComponentOne ? "Learning Pass Page" : "AAI Tracker NFT Page"}</h3>
        <img className='nextpagebtn' src={nextPageImg} alt="Swap" onClick={() => {
            console.log("Button clicked");
            onSwap();  // Correct way to access onSwap
          }}  style={{cursor: 'pointer'}} />
    </div>
  );
}   


export default NextPageButton;