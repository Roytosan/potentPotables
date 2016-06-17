import React, { Component } from 'react';
import { connect } from 'react-redux';

class ClueView extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillReceiveProps(){
    console.log('calling will receive props');
      this.context.router.push('/gameboard');
  }

  render() {
    return(
        <div id="question">
          <div id="question-text">
            {this.props.activeClue.question}
          </div>
        </div>
    );
  }
}

function mapStateToProps(state){
  return {activeClue: state.gameplay.activeClue};
}

export default connect(mapStateToProps)(ClueView);