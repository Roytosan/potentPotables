import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendButtonClick, penalizeUser } from '../../sockets_client';
import Avatar from 'material-ui/Avatar';


import { Link } from 'react-router';

class UserGameplay extends Component {
  constructor(props){
    super(props);
    this.state = {score: 0, penaltyQueue: [], penalty: true};
    this.getUserPhoto= this.getUserPhoto.bind(this);
  }
  componentDidUpdate() {
    if(this.state.score != this.props.users[this.props.username].score){
      this.setState({score: this.props.users[this.props.username].score});
    }
  }
  componentWillReceiveProps() {
    if(this.props.activeUser){
      this.setState({penalty: false});
      setTimeout(() => {
        this.setState({penalty: true});
      }, 2200);
    }
  }
  componentWillMount() {
    if(this.props.users[this.props.username]){
      this.setState({score: this.props.users[this.props.username].score});
    }
  }

  handleBuzz(){
    const buzz = new Audio('http://50.112.42.29/game_buzz.wav');
    buzz.play();
    sendButtonClick(this.props.username, this.props.linkCode, this.props.activeClue);
  }
  handleSpam(){
    penalizeUser(this.props.username, this.props.linkCode);
    var currentDeduction = this.state.penaltyQueue.slice();
    currentDeduction.push(this.props.users[this.props.username].penalty);
    this.setState({penaltyQueue: currentDeduction});
  }
  getUserPhoto(user){
    for (var key in this.props.users){
      if (this.props.users[key] === user){
        return this.props.users[key];
      }
    }
  }
  render(){
    const buttonConfig= "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
    const penalty = this.state.penaltyQueue.map(alert => {
      return <div className="penalty animated fadeOutUp">wait for host -${alert}</div>
    });
    return (
      <div className= 'gameplay-view'>
        <div className= 'score' >SCORE: <span style={{fontFamily: "Swiss-911-Extra-Compressed", color: "yellow"}}>${this.state.score}</span></div>
        { 
          penalty
        }
        <div className= 'buzz-alert'>
          {this.props.activeUser && this.props.activeUser !== this.props.username ?
            this.props.users[this.props.activeUser].photo !== '' ?
                <div>
                  <Avatar src= {this.props.users[this.props.activeUser].photo} size= {80}/>
                  <div>{this.props.activeUser} buzzed in!</div>
                </div>
                :
                <div className="buzzed">{this.props.activeUser} buzzed in!</div>
            : this.props.activeUser && this.props.activeUser === this.props.username ?
              <div> You're live !</div> :
              <div></div>
          }
        </div>
        <div className= 'btn-container'>
        {this.props.isGameActive === false ?
          <div className="animated infinite flash">
            Waiting for game to Begin...
          </div> :
          this.props.isButtonDisabled ?
            this.props.username === this.props.activeUser || Object.keys(this.props.activeClue).length < 1 || !this.state.penalty ?
              <a id="gamebuttonDisabled" className="game-button">
                <span className="buttonSize">{buttonConfig}<span id="disabledText">disabled</span></span>
              </a> :
              <a id="gamebuttonDisabled" className="game-button">
                <span className="buttonSize" onClick={this.handleSpam.bind(this)}>{buttonConfig}<span id="disabledText">disabled</span></span>
              </a> :
              this.props.hasAnsweredUsers.indexOf(this.props.username) !== -1 ?
                <a id="gamebuttonDisabled" className="game-button">
                    <span className="buttonSize">{buttonConfig}<span id="disabledText">disabled</span></span>
                </a> :
                <a id="gamebutton">
                    <span className="buttonSize" onClick= {this.handleBuzz.bind(this)}>{buttonConfig}<span id="enabledText">BUZZ IN</span></span>
                </a>
        }
        </div>
        <div className= 'avatar'>
          {this.props.userPhoto !== '' ?
            <Avatar src= {this.props.userPhoto} size= {120}/> :
            <div></div>
          }
          <div>{this.props.username}</div>
        </div>
        <div className="buttons">
          <Link to="scoreboard">
            <a className="button1 a" id="scoreButton" >Go to Scoreboard </a>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    isButtonDisabled: state.gameplay.isButtonDisabled,
    username: state.user.username,
    users: state.gameplay.users,
    linkCode: state.linkAuth.linkCode,
    activeUser: state.gameplay.activeUser,
    isGameActive: state.gameplay.isGameActive,
    activeClue: state.gameplay.activeClue,
    hasAnsweredUsers: state.gameplay.hasAnsweredUsers,
    userPhoto: state.user.photo,

  };
}

export default connect(mapStateToProps)(UserGameplay);


