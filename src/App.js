import React, { useState } from 'react';

import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

import axios from 'axios';

// The API key provided has been made on a website called omdbapi.com
// This website offers a FREE API that I provided in the code, but it allows a limit of 1,000 daily searches
function App() {

  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  // To solve the error {Response: "False", Error: "Incorrect IMDb ID."}:
  // ALL I had to do was delete "i=tt3896198&" from the API key
  const apiurl = "http://www.omdbapi.com/?apikey=4a8583e0";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App
