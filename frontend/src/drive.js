'use strict'
var React = require('react');

var DrivePanel = React.createClass({
	render: function(){
		return(
			<table>
				<tr>
					<td></td>
					<td><img src='/static/images/forward.png' onClick={this.sendMoveCommand.bind(null, 'forward')}/></td>
					<td></td>
				</tr>
				<tr>
					<td><img src='/static/images/left.png' onClick={this.sendMoveCommand.bind(null, 'left')} /></td>
					<td align="center"></td>
					<td><img src='/static/images/right.png' onClick={this.sendMoveCommand.bind(null, 'right')} /></td>
				</tr>
				<tr>
					<td></td>
					<td><img src='/static/images/reverse.png' onClick={this.sendMoveCommand.bind(null, 'reverse')}/></td>
					<td></td>
				</tr>
				<tr><td colSpan='3'><a onClick={this.sendMoveCommand.bind(null, 'stop')}>Stop</a></td></tr>
			</table>
		);
	},

	sendMoveCommand: function(direction, e){
		e.preventDefault()
		var request = new XMLHttpRequest();
		request.open('POST', '/drive');
		request.setRequestHeader('Content-Type', 'text');

		request.onload = function(){
			
			if(this.status >= 200 && this.status < 400){
				var resp = this.response;
				console.log("Sent POST request, got back  ", resp);
			} else {

				console.log("Error sending POST request: ", this.response);
			}

		}

		request.send(direction)
	}
})

module.exports = DrivePanel;