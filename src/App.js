import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    doorOne: null,
    doorTwo: null,
    doorThree: null,
    switched: false,
    userPicked: false,
    doors: []
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

  setDoorsArray() {
    this.setState({
      doors: [this.state.doorOne, this.state.doorTwo, this.state.doorThree]
    });
  }

  addUserInput() {
    // const { doorOne, doorTwo, doorThree } = this.state;
    // if (
    //   doorOne == "user pick" ||
    //   doorTwo == "user pick" ||
    //   doorThree == "user pick"
    // ) {
    this.setState({
      userPicked: true
    });
    // }
  }

  resetDoors() {
    this.setState({
      doorOne: null,
      doorTwo: null,
      doorThree: null,
      switched: false,
      userPicked: false,
      doors: []
    });
    this.randomizedPrizeDoor();
  }

  render() {
    console.log("door one ", this.state.doorOne);
    console.log("door two ", this.state.doorTwo);
    console.log("door three ", this.state.doorThree);
    console.log("array ", this.state.doors);
    console.log("user picked", this.state.userPicked);

    let nullArr = [];
    this.state.doors.map((e, i) => {
      if (e === null) {
        nullArr.push(i);
      }
    });

    console.log(nullArr);

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
            onClick={e => {
              this.addUserInput();
              if (this.state.userPicked === false) {
                this.setState({
                  doorOne: "user pick",
                  doors: ["user pick", this.state.doorTwo, this.state.doorThree]
                });
              } else {
                alert("Oops! You already picked a door.");
              }
            }}
          >
            DOOR ONE
          </button>
          <button
            className="button-door-two door-buttons"
            onClick={e => {
              this.addUserInput();
              if (this.state.userPicked === false) {
                this.setState({
                  doorTwo: "user pick",
                  doors: [this.state.doorOne, "user pick", this.state.doorThree]
                });
              } else {
                alert("Oops! You already picked a door.");
              }
            }}
          >
            DOOR TWO
          </button>
          <button
            className="button-door-three door-buttons"
            onClick={e => {
              this.addUserInput();
              if (this.state.userPicked === false) {
                this.setState({
                  doorThree: "user pick",
                  doors: [this.state.doorOne, this.state.doorTwo, "user pick"]
                });
              } else {
                alert("Oops! You already picked a door.");
              }
            }}
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
