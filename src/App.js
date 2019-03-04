import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    doorOne: null,
    doorTwo: null,
    doorThree: null
  };

  componentDidMount() {
    this.randomizedPrizeDoor();
  }

  randomizedPrizeDoor() {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    console.log("door with prize", randomNum);
    if (randomNum === 1) {
      this.setState({
        doorOne: "Prize"
      });
    } else if (randomNum === 2) {
      this.setState({
        doorTwo: "Prize"
      });
    } else {
      this.setState({
        doorThree: "Prize"
      });
    }
  }

  resetDoors() {
    this.setState({
      doorOne: null,
      doorTwo: null,
      doorThree: null
    });
    this.randomizedPrizeDoor();
  }

  render() {
    console.log("door one ", this.state.doorOne);
    console.log("door two ", this.state.doorTwo);
    console.log("door three ", this.state.doorThree);

    return (
      <div className="App">
        <h1 className="title">Monty Hall's Paradox</h1>
        <div className="doors-container">
          <div className="door-one doors" />
          <div className="door-two doors" />
          <div className="door-three doors"> </div>
        </div>
        <div className="button-container">
          <button
            className="button-door-one door-buttons"
            onClick={e =>
              this.setState({
                doorOne: "user pick"
              })
            }
          >
            DOOR ONE
          </button>
          <button
            className="button-door-two door-buttons"
            onClick={e =>
              this.setState({
                doorTwo: "user pick"
              })
            }
          >
            DOOR TWO
          </button>
          <button
            className="button-door-three door-buttons"
            onClick={e =>
              this.setState({
                doorThree: "user pick"
              })
            }
          >
            DOOR THREE
          </button>
        </div>
        <button className="reset-button" onClick={e => this.resetDoors()}>
          RESET
        </button>
      </div>
    );
  }
}

export default App;
