import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">Monty Hall's Paradox</h1>
        <div className="doors-container">
          <div className="door-one doors" />
          <div className="door-two doors" />
          <div className="door-three doors"> </div>
        </div>
        <div className="button-container">
          <button className="button-door-one door-buttons">DOOR ONE</button>
          <button className="button-door-two door-buttons">DOOR TWO</button>
          <button className="button-door-three door-buttons">DOOR THREE</button>
        </div>
      </div>
    );
  }
}

export default App;
