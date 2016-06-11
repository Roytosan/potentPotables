import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class HostGameplay extends Component {
  render(){
    return (
      <div>
      {this.props.isGameActive === false ?
        <div>
          Waiting for game to Begin...
        </div> :
        <Link to='/answer'>
          <button className="join btn btn-primary">{this.props.activeClue}</button>
        </Link>
      }
      </div>
    );
  }
}

function mapStateToProps(state){
  return {isGameActive: state.gameplay.isGameActive,
          activeClue: state.gameplay.activeClue
          };
}

export default connect(mapStateToProps, {} )(HostGamePlay)