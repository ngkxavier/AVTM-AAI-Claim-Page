import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Web3 from 'web3';
import '../css/avtm3k.css'; 

import { TokenDistributor } from '../../abi/TokenDistributor';
import {LearningPassDistributorABI} from '../../abi/LearningPassDistributor';

//js import
import NextPageButton from './nextpagebtn';


//image imports
import tokenimage from '../img/avtmlogo.jpeg'
import aai_token from '../img/AAIToken.png'
import lp_video from '../img/LearningPassNFT.mp4'


function CenteredButton({ _props, onSwap, isComponentOne }) {
    console.log("Avtm3k: Received onSwap:", onSwap);  // Debug: Verify onSwap is received
    console.log("Avtm3k: Received isComponentOne:", isComponentOne);  // Debug: Verify onSwap is received
    console.log("Avtm3k: Received _props:", _props);  // Debug: Verify onSwap is received


    const userAddress = _props.UserWalletAddress; //

    console.log(userAddress);   

    // Learning Pass Contract
    const lp_contract = useMemo(()=>{
        let web3 = new Web3(window.ethereum);
        return new web3.eth.Contract(
            LearningPassDistributorABI[0].abi,
            LearningPassDistributorABI[0].networks["137"].address
        )
    },[]);

    const lp_contractLogged = () => {
        console.log("function LP called")
        lp_contract.methods.distributeTokens()
        .send({from : userAddress})
        .on("transactionHash", (hash)=>{
            console.log("Success")
        }).catch((e)=>{
            console.log(e);
            window.alert("Error Occured, Refreshing...");
            window.location.reload();
        });
    }   

    // AAI Tracker 

    const contract = useMemo(()=>{
        let web3 = new Web3(window.ethereum);
        return new web3.eth.Contract(
            TokenDistributor[0].abi,
            TokenDistributor[0].networks["137"].address
        )
    },[]);

    console.log(contract.methods);

    const contractLogged = () => {
        console.log("function AAI called")
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
            <div className="prompt-container">
                <h1>{isComponentOne ? "Claim AAI Tracker NFT with AVTM Tokens" : "Claim Learning Pass Tracker NFT with AVTM Tokens"}</h1>
                <p>
                <b>{isComponentOne ? 
                "Claim your AAI Tracker NFT with your AVTM Tokens! For every 3000 AVTM tokens you hold, a AAI tracker NFT will be issued to you. The NFT is stackable and every NFT is worth 1 AAI token." : 
                "Claim your Learning Pass Tracker NFT with your AVTM Tokens! For every 30,000 AVTM tokens you hold, a Learning Pass Tracker NFT will be issued to you. The NFT is stackable and every NFT is worth 1 Learning Pass NFT, to be used for our upcoming L2E DApp (Phase 1)."}</b>
                </p>
                    <div className='image-container first'>
                        <img src={tokenimage} className='images'/>
                        <h2>{isComponentOne ? "3000 AVTM Tokens" : "30,000 AVTM Tokens"}</h2>
                    </div>
                    <div class="arrow-container">
                        <div class="arrow"></div>
                    </div>
                    <div className='image-container second'>
                        <div>{isComponentOne ? <img src={aai_token} className='images'/> : <video loop muted autoPlay className="images"> <source src={lp_video} type="video/mp4" /> </video>}
                        </div>
                        <h2>{isComponentOne ? "AAI Tracker NFT" : "Learning Pass Tracker NFT"}</h2>
                    </div>
                {isComponentOne ? <button className="centered-button" onClick={(e)=>{console.log("AAI");contractLogged()}}>Claim</button> : <button className="centered-button" onClick={(e)=>{console.log("LP");lp_contractLogged()}}>Claim</button>}
                <div className='nextpagebtn-container'>
                    <NextPageButton onSwap={onSwap} isComponentOne={isComponentOne} />
                </div>
            </div>
    );
}

export default CenteredButton;
