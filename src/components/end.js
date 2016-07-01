import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class End extends Component {

	componentDidMount() {
		const end = new Audio('http://www.orangefreesounds.com/wp-content/uploads/2014/10/Jeopardy-theme-song.mp3');
		end.play();
	}

	render(){

		const leaders = _.sortBy(this.props.users, function(user) {
		  return -user.score;
		});

		const scores = _.map(leaders, function(user) {
			var scoreColor;
			if(user.score === 0 ) {
			  scoreColor = "white";
			} else if (user.score < 0 ) {
			  scoreColor = "#FF0000";
			} else if (user.score > 0 ) {
			  scoreColor = "#00FF00";
			}

			var scoreStyle = {
			  color: scoreColor,
			  float: "right",
			  fontFamily: "Swiss-911-Extra-Compressed"
			}

			return (
				<div className="report" key={user.username}>
						<span className="finaluser">{user.username}:</span>
						<span className="finalscore" style={scoreStyle}>{user.score > 0 ? '$' + user.score : '-$' + String(user.score).slice(1)}</span>
				</div>
			);
		});

			return (
	      <div id="end">
	      	<h1 className="thankyou animated infinite flash">Thank you for playing!</h1>
	      	<div className="final header"><strong>Final scores:</strong></div>
	      	<div className="final scores">
	      		{ scores }
	      	</div>
	      </div>
	  );
	}
}

function mapStateToProps(state){
	return {
  	users: state.gameplay.users,
  };

}

export default connect(mapStateToProps)(End);