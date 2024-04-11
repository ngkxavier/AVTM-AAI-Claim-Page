import './App.css';
import './components/css/background1.css';

//React Stuff
import React, { Component } from 'react';

//My Components
import PromptBg from './components/scripts/promptbg.js';
import Background1 from './components/scripts/background1.js';
import NavbarComponent from './components/scripts/NavBar.js';
import Title from './components/scripts/title.js';

//External Libraries
import Web3 from 'web3';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3 : null,
      UserWalletAddress : ""
    }
  }

  async componentDidMount() {
    await this.initWeb3();
    await this.loadblockchainData();
  }

  initWeb3 = async() => {
    try {
      if(window.ethereum){
        const web3Instance = new Web3(window.etheruem);
        this.setState({web3 : web3Instance});
      } else {
        window.alert("Metamask not Detected, Install Metamask");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      window.alert("Error has Occured");
      window.location.reload();
    }
  }

  loadblockchainData = async() => {
  
    while (!this.state.web3) {
      // Wait for a short duration before checking again
      await new Promise(resolve => setTimeout(resolve, 100));
    }



    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.setState({UserWalletAddress : accounts[0]});
  }

  render () {

    console.log(this.state);

    return(
      <div>
        <Background1/>
        <NavbarComponent props={this.state} />
        <Title/>
        <PromptBg _props={this.state}/>
      </div>

    )
  }
}

export default App;
