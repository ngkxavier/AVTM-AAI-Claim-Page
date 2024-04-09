import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Web3 from 'web3';
import '../css/button.css'; // Make sure the CSS file is in the same directory

import { TokenDistributor } from '../../abi/TokenDistributor';

//image imports
import tokenimage from '../img/avtmlogo.jpeg'
import nftimage from '../img/nftlogo.png'


function CenteredButton({ _props }) {

    const userAddress = _props.UserWalletAddress;

    const contract = useMemo(()=>{
        let web3 = new Web3(window.ethereum);
        return new web3.eth.Contract(
            TokenDistributor[0].abi,
            TokenDistributor[0].networks["80001"].address
        )
    },[]);

    console.log(contract.methods);

    const contractLogged = () => {
        contract.methods.distributeTokens()
        .send({from : userAddress})
        .on("transactionHash", (hash)=>{
            console.log("Success")
        }).catch((e)=>{
            console.log(e);
            window.alert("Error Occured, Refreshing...");
            window.location.reload();
        });
    }   

    return (
        <div className='convert-container'>
            <div className="prompt-container">
                <h1>Convert AVTM to NFT Tracker</h1>
                <p>
                <b>Convert your AVTM Tokens into AAI tokens.<br></br>
                For every 3000 AVTM tokens you hold, a tracker NFT will be issued to you. <br></br>
                The NFT is stackable and every NFT is worth 1 AAI token. <br></br>  
                Click the convert button below to continue.</b>
                </p>
                    <div className='image-container first'>
                        <img src={tokenimage} className='images'/>
                        <h2>3000 AVTM Tokens</h2>
                    </div>
                    <div class="arrow-container">
                        <div class="arrow"></div>
                    </div>
                    <div className='image-container second'>
                        <img src={nftimage} className='images'/>
                        <h2>1 Tracker NFT</h2>
                    </div>
                <button className="centered-button" onClick={(e)=>{contractLogged()}}>Convert</button>
            </div>
        </div>
    );
}

export default CenteredButton;
