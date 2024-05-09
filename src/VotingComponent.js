import React, { useState, useEffect } from 'react';
import './VotingComponent.css';
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { CONTRACT_ADDRESS3 } from './const/addresses.ts';

const VotingComponent = () => {
  const contractAddress = CONTRACT_ADDRESS3;
  const userAddress = useAddress();
  const { contract } = useContract(contractAddress);
  const [purpose, setPurpose] = useState('');   
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [optionNumber, setOptionNumber] = useState(0);
  const [votingOptions, setVotingOptions] = useState(Array.from({ length: optionNumber }, () => ''));
  const [voterNumber, setVoterNumber] = useState(0);
  const [voterOptions, setVoterOptions] = useState(Array.from({ length: voterNumber }, () => ''));
  const [votingData, setVotingData] = useState([]);
  const [isvotingData, setIsVotingData] = useState(false);

  const fetchDataFromContract = async (noOfPolls) => {
    const results = [];
    for (let i = 0; i < noOfPolls; i++) {
      try {
        // Call your async function here
        const result2 = await contract.call(
          "infoAboutVoting",
          [i],
          {from: userAddress},
        );
        const result = await contract.call(
            "infoAboutVoting",
            [i],
            {from: userAddress},
        );
        results.push(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    // results.reverse();
    setVotingData(results);
    setIsVotingData(true);

    console.log(results);
  };

  const getData = async () => {
    setIsVotingData(false);
    // setVotingData(Array.from({ length: 0 }, () => ''));
    const result = await contract.call(
      "getNoOfPolls",
      [],
      {from: userAddress},
    );
    await fetchDataFromContract(result);
    console.log(result);
  }
// Define the convertUnixTimestamp function
    const convertUnixTimestamp = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
        return date.toLocaleString(); // Convert to local date and time format
    };
    
  useEffect(() => {
    if(contract){
      getData();
      return;
    }
}, [contract , userAddress, ]);
  const handlegetData = () => {
    getData();
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data
    console.log({
      purpose,
      durationHours,
      durationMinutes,
      votingOptions,
      voterOptions,
    });
  };

  // Handle option number change
  const handleOptionNumberChange = (e) => {
    if(e.target.value.length > 3){
        setOptionNumber(999);
        setVotingOptions(Array.from({ length: 999 }, () => ''));
        return;
    }
    if(e.target.value == ""){
        setOptionNumber();
        setVotingOptions(Array.from({ length: 0 }, () => ''));
        return;
    }
    const newOptionNumber = parseInt(e.target.value, 10);
    setOptionNumber(newOptionNumber);
    setVotingOptions(Array.from({ length: newOptionNumber }, () => ''));
  };

  const handleVoterNumberChange = (e) => {
    if(e.target.value.length > 3){
        setVoterNumber(999);
        setVoterOptions(Array.from({ length: 999 }, () => ''));
        return;
    }
    if(e.target.value == ""){
        setVoterNumber();
        setVoterOptions(Array.from({ length: 0 }, () => ''));
        return;
    }
    const newOptionNumber = parseInt(e.target.value, 10);
    setVoterNumber(newOptionNumber);
    setVoterOptions(Array.from({ length: newOptionNumber }, () => ''));
  };

  // Handle voting option change
  const handleVotingOptionChange = (index, value) => {
    const newVotingOptions = [...votingOptions];
    newVotingOptions[index] = value;
    setVotingOptions(newVotingOptions);
  };

  const handleVoterOptionChange = (index, value) => {
    const newVoterOptions = [...voterOptions];
    newVoterOptions[index] = value;
    setVoterOptions(newVoterOptions);
  };

    return (
        <div className="votingPg">  
            <header>
                <div className="header-left">
                <a className="logo" href='/'>
                    <span>Doc</span>
                    <span className="chain">Chain</span>
                </a>
                </div>
                <div className="header-right">
                <Link className="nav_component" to = "/about">About Us</Link>
                </div>
            </header>
            <hr className="line" /><br/>
            <div className="master">
                <div className="voting">
                    <div className='voting_header'>Voting</div>
                    <div className="box-voting">
                        <div className='name_input'>Purpose</div>
                        <input className="purposebox" type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                        <div className='name_input'>Voting Duration</div>
                        <div className="superscript">
                            <div className='box'>
                                <input className="durationbox" type="text" value={durationHours} onChange={(e) => {
                                    if(e.target.value === "") setDurationHours();
                                    else setDurationHours(parseInt(e.target.value, 10));
                                    }} 
                                />
                                <div className="subscript">Hours</div>
                            </div>
                            <div className='box'>
                                <input className="durationbox" type="text" value={durationMinutes} onChange={(e) => {
                                    if(e.target.value === "") setDurationMinutes();
                                    else setDurationMinutes(parseInt(e.target.value, 10));
                                    }} 
                                />
                                <div className="subscript">Minutes</div>
                            </div>
                        </div>
                        <div className='name_input'>No of Candidates </div>
                        <div className='superscript2'>
                            <div className='box'>
                                <input className="durationbox" type="text" value={optionNumber} onChange={handleOptionNumberChange} />
                                <div className="subscript">  Options</div>
                             </div>
                        </div>
                        {optionNumber !==0 && optionNumber === "" &&<div>Voting Options</div>}
                        {Array.from({ length: optionNumber }).map((_, index) => (
                            <div>
                            {index + 1}. <input
                                className="optionsbox"
                                type="text"
                                value={votingOptions[index]}
                                onChange={(e) => handleVotingOptionChange(index, e.target.value)}
                            />
                            </div>
                        ))}
                        <div className='name_input'>Voters</div>
                        <div className="superscript2">
                            <div className='box'>
                                <input className="durationbox" type="text" value={voterNumber} onChange={handleVoterNumberChange} />
                                <div className="subscript">  Addresses</div>
                            </div>
                        </div>
                        {voterNumber !=0 && <div>Eligible Voters</div>}
                        {Array.from({ length: voterNumber }).map((_, index) => (
                            <div>
                            {index + 1}. <input
                                className="optionsbox"
                                type="text"
                                value={voterOptions[index]}
                                onChange={(e) => handleVoterOptionChange(index, e.target.value)}
                            />
                            </div>
                        ))}
                        <Web3Button 
                            className='create_poll'
                            contractAddress={contractAddress}
                            action={(contract) => contract.call(
                                "createNewVoting",
                                [purpose,
                                Math.floor(Date.now() / 1000) + durationHours * 3600 + durationMinutes * 60,
                                optionNumber,
                                voterOptions,
                                votingOptions,
                            ],{from: userAddress}
                            )}
                            onSuccess={(results)=>{
                                toast.success('Created new Poll', {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "dark"}); 	
                            }}
                            onError={(error)=>{
                                toast.error(`Creation failed ${error}`, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "dark"}); 
                            }}
                            style={{backgroundColor: '#FFFFEC', color: 'black',fontSize: '25px', padding: '12px', margin: '10px'}}            
                        > Create New Poll </Web3Button>
                    </div>
                </div>
                <div className="Openvoting">
                    <div className='Title'>
                        <div className='voting_header' style={{marginLeft:'19vw'}}>Polls</div>
                        <button className="buttons refresh-button" onClick={handlegetData}>Refresh Polls</button>
                    </div>
                    <div className="box-open">
                        <div>
                            {isvotingData && votingData.map((poll, index) => (
                                <div key={index}>
                                    <div className="voting-header">
                                        <div className="purpose-title">{poll[1]}</div>
                                        <div className="end-time">End Time: {convertUnixTimestamp(poll[2])}</div>
                                    </div>
                                        {poll[4].map((option, optionIndex) => (
                                        <div>   
                                            <div key={optionIndex} className='title_percentage'>
                                                <div className="option">{optionIndex + 1}. {option}</div>
                                                <div className="side-option">{poll[3].reduce((a, b) => a + b.toNumber(), 0)!=0 ? ((poll[3][optionIndex].toNumber() / poll[3].reduce((a, b) => a + b.toNumber(), 0)) * 100) : 0}%</div>
                                            </div>
                                            <div key={optionIndex} className="sub">
                                                <progress max="100" value={poll[3].reduce((a, b) => a + b.toNumber(), 0)!=0 ? ((poll[3][optionIndex].toNumber() / poll[3].reduce((a, b) => a + b.toNumber(), 0)) * 100) : 0}></progress>
                                                <div className="loader">{poll[3][optionIndex].toNumber()} Votes</div>
                                                <Web3Button 
                                                    contractAddress={contractAddress}
                                                    action={(contract) => contract.call(
                                                        "castVote",
                                                        [index, optionIndex],
                                                        {from: userAddress}
                                                    )}
                                                    onSuccess={(results)=>{
                                                        toast.success('Vote Casted succesfully', {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "dark"}); 	
                                                    }}
                                                    onError={(error)=>{
                                                        toast.error(`Voting failed`, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "dark"}); 
                                                    }}
                                                    style={{backgroundColor: '#FFFFEC', color: 'black',fontSize: '25px', padding: '10px', margin: '10px'}}            
                                                > Vote </Web3Button>
                                            </div>
                                        </div>
                                        ))}
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VotingComponent;
