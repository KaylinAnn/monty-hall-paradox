import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prizeDoor: 0,
      doorOne: null,
      doorTwo: null,
      doorThree: null,
      switched: false,
      userPicked: false,
      openedDoor: 0,
      nullArr: [],
      doors: [],
      usersFinalDoor: 0,
      winner: null,
      switchedCount: 0,
      stayCount: 0
    };
  }

  componentDidMount() {
    this.randomizedPrizeDoor();
  }

  randomizedPrizeDoor() {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    if (randomNum === 1) {
      this.setState({
        doorOne: "Prize",
        prizeDoor: 1
      });
    } else if (randomNum === 2) {
      this.setState({
        doorTwo: "Prize",
        prizeDoor: 2
      });
    } else {
      this.setState({
        doorThree: "Prize",
        prizeDoor: 3
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

      return this.setState({ nullArr: nullArr }, () => this.setOpenedDoor());
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
          return this.setState(
            { usersFinalDoor: i + 1, switched: true },
            () => {
              this.endGame();
            }
          );
        }
        return e;
      });
    } else {
      this.state.nullArr.map(e => {
        if (e !== this.state.openedDoor - 1) {
          return this.setState(
            { usersFinalDoor: e + 1, switched: true },
            () => {
              this.endGame();
            }
          );
        }
        return e;
      });
    }
  }

  setFinalPickwithoutSwitch() {
    if (this.state.switched === false) {
      this.state.doors.map((e, i) => {
        if (e === "user pick") {
          this.setState({ usersFinalDoor: i + 1 }, () => this.endGame());
        }
        return e;
      });
    }
  }

  tallyCount() {
    if (this.state.winner === true && this.state.switched === true) {
      this.setState({ switchedCount: this.state.switchedCount + 1 });
    } else if (this.state.winner === true && this.state.switched === false) {
      this.setState({ stayCount: this.state.stayCount + 1 });
    }
  }

  endGame() {
    if (this.state.usersFinalDoor === this.state.prizeDoor) {
      this.setState({ winner: true }, () => this.tallyCount());
    } else if (this.state.usersFinalDoor !== this.state.prizeDoor) {
      this.setState({ winner: false }, () => this.tallyCount());
    }
  }

  resetDoors() {
    this.setState({
      prizeDoor: 0,
      doorOne: null,
      doorTwo: null,
      doorThree: null,
      switched: false,
      userPicked: false,
      doors: [],
      openedDoor: 0,
      usersFinalDoor: 0,
      winner: null
    });
    this.randomizedPrizeDoor();
  }

  resetCounts() {
    this.setState(
      {
        switchedCount: 0,
        stayCount: 0
      },
      () => this.resetDoors()
    );
  }

  render() {
    const userHasPicked =
      this.state.userPicked === true &&
      this.state.openedDoor !== 0 &&
      this.state.winner === null ? (
        <div className="switch-container">
          <button onClick={e => this.switchUsersPick()}>SWITCH</button>
          <button onClick={e => this.setFinalPickwithoutSwitch()}>
            CONTINUE
          </button>
        </div>
      ) : (
        ""
      );

    const doorTitles =
      this.state.userPicked === true &&
      this.state.switched === false &&
      this.state.winner === null ? (
        <div className="title-container">
          <div className="titles">
            <h2
              className={
                this.state.doors[0] === "user pick" ? "users-door" : "no-title"
              }
            >
              Your Pick
            </h2>
          </div>
          <div className="titles">
            <h2
              className={
                this.state.doors[1] === "user pick" ? "users-door" : "no-title"
              }
            >
              Your Pick
            </h2>
          </div>
          <div className="titles">
            <h2
              className={
                this.state.doors[2] === "user pick" ? "users-door" : "no-title"
              }
            >
              Your Pick
            </h2>
          </div>
        </div>
      ) : this.state.winner !== null ? (
        <div>
          <div>
            <div className={this.state.winner === true ? "status" : "empty"}>
              Congrats!! Door {this.state.prizeDoor} is correct.
            </div>
            <div className={this.state.winner === false ? "status" : "empty"}>
              Door {this.state.prizeDoor} had the prize. Better luck next
              time...
            </div>
          </div>
          <div>
            <p />
          </div>
        </div>
      ) : (
        ""
      );

    return (
      <div className="App">
        <h1 className="title">Monty Hall's Paradox</h1>
        <h2
          className={this.state.userPicked === true ? "empty" : "instructions"}
        >
          There is a prize behind one of these door. Please choose the door you
          think it's in.
        </h2>

        <h2
          className={
            this.state.userPicked === true && this.state.winner === null
              ? "instructions"
              : "empty"
          }
        >
          I Great! I have now revealed an empty door for you. To stay with you
          initial pick select continue or you can switch to the other unopened
          door.
        </h2>
        <div>{doorTitles}</div>
        <div className="doors-container">
          <div
            className={
              this.state.openedDoor !== 0 && this.state.openedDoor === 1
                ? "remove-door"
                : "door-one doors"
            }
          >
            1
          </div>
          <div
            className={
              this.state.openedDoor !== 0 && this.state.openedDoor === 2
                ? "remove-door"
                : "door-two doors"
            }
          >
            2
          </div>
          <div
            className={
              this.state.openedDoor !== 0 && this.state.openedDoor === 3
                ? "remove-door"
                : "door-three doors"
            }
          >
            3
          </div>
        </div>

        <div
          className={
            this.state.userPicked === false
              ? "button-container"
              : "hide-buttons"
          }
        >
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
            className="button-door-three door-buttons"
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

        <div>
          <h1> Switched wins = {this.state.switchedCount}</h1>
          <h1> Stay wins = {this.state.stayCount}</h1>
        </div>

        <button className="reset-button" onClick={e => this.resetDoors()}>
          RESET DOORS
        </button>
        <button onClick={e => this.resetCounts()}>RESET WIN COUNTS</button>
        {userHasPicked}
      </div>
    );
  }
}

export default App;
