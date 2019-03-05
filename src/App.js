import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doorOne: null,
      doorTwo: null,
      doorThree: null,
      switched: false,
      userPicked: false,
      openedDoor: 0,
      nullArr: [],
      doors: [],
      usersFinalDoor: 0
    };
  }

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

  setDoorValues(props) {
    if (Number(props) === 2) {
      this.setState(
        {
          doorTwo: "user pick",
          doors: [this.state.doorOne, "user pick", this.state.doorThree]
        },
        () => {
          this.setNullArr();
        }
      );
    } else if (Number(props) === 1) {
      this.setState(
        {
          doorOne: "user pick",
          doors: ["user pick", this.state.doorTwo, this.state.doorThree]
        },
        () => {
          this.setNullArr();
        }
      );
    } else if (Number(props) === 3) {
      this.setState(
        {
          doorThree: "user pick",
          doors: [this.state.doorOne, this.state.doorTwo, "user pick"]
        },
        () => {
          this.setNullArr();
        }
      );
    }
  }

  setDoorsArray() {
    this.setState({
      doors: [this.state.doorOne, this.state.doorTwo, this.state.doorThree]
    });
  }

  addUserInput() {
    this.setState({
      userPicked: true
    });
  }

  setNullArr() {
    let nullArr = [];
    this.state.doors.map((e, i) => {
      if (e === null) {
        nullArr.push(i);
      }

      this.setState({ nullArr: nullArr }, () => this.setOpenedDoor());
    });
  }

  setOpenedDoor() {
    let doorToOpenIndex = Math.floor(Math.random() * this.state.nullArr.length);
    let doorToOpen = this.state.nullArr[doorToOpenIndex] + 1;
    this.setState({ openedDoor: doorToOpen });
  }

  switchUsersPick() {
    if (this.state.nullArr.length === 1) {
      this.state.doors.map((e, i) => {
        if (e === "Prize") {
          this.setState({ usersFinalDoor: i + 1 });
        }
      });
    }
  }

  resetDoors() {
    this.setState({
      doorOne: null,
      doorTwo: null,
      doorThree: null,
      switched: false,
      userPicked: false,
      doors: [],
      openedDoor: 0,
      usersFinalDoor: 0
    });
    this.randomizedPrizeDoor();
  }

  render() {
    console.log("door one ", this.state.doorOne);
    console.log("door two ", this.state.doorTwo);
    console.log("door three ", this.state.doorThree);
    console.log("doors ", this.state.doors);
    console.log("user picked", this.state.userPicked);
    console.log("nullArr", this.state.nullArr);
    console.log("openedDoor ", this.state.openedDoor);
    console.log("final pick ", this.state.usersFinalDoor);

    const userHasPicked =
      this.state.userPicked === true && this.state.openedDoor !== 0 ? (
        <div className="switch-container">
          <button onClick={e => this.switchUsersPick()}>SWITCH</button>
          <button>CONTINUE</button>
        </div>
      ) : (
        ""
      );

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
            value={1}
            onClick={e => {
              this.addUserInput();
              if (this.state.userPicked === false) {
                this.setDoorValues(e.target.value);
              } else {
                alert("Oops! You already picked a door.");
              }
            }}
          >
            DOOR ONE
          </button>
          <button
            className="button-door-two door-buttons"
            value={2}
            onClick={e => {
              this.addUserInput();
              if (this.state.userPicked === false) {
                return this.setDoorValues(e.target.value);
              } else {
                alert("Oops! You already picked a door.");
              }
            }}
          >
            DOOR TWO
          </button>
          <button
            className="button-door-three door-buttons "
            value={3}
            onClick={e => {
              this.addUserInput();
              if (this.state.userPicked === false) {
                this.setDoorValues(e.target.value);
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
        {userHasPicked}
      </div>
    );
  }
}

export default App;
