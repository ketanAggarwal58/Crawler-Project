import React, { useState, useEffect } from 'react';
import './App.css';
import { Component2 } from './component';
import axios from 'axios';


function App() {

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
    // Authorization: apiKey,
  };

  const getUrl = "http://localhost:8000/data/insertData";

    useEffect(() => {
        try{
          axios.get(getUrl, headers)
            .then(response => {
              console.log(response.status)
            })
        }catch(err){
            console.log("Error: "+err);
          }
        },
        [getUrl]
      );


  return (
    <div className="App">
      <Component2 />
    </div>
  );
}

export default App;
