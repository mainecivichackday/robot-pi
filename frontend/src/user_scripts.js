
'use strict'
var React = require('react');

var ScriptManager = React.createClass({
	/* Stateful:
		list if filenames stored on server
		source code
	*/
	getInitialState: function(){
		return {filenames: [], filename: undefined, source: "" }
	},
	componentWillMount: function(){
		//Grab state from server (filenames, source code)
		getScriptList(this.setScriptList);
	},
	componentWillUpdate: function(){
		//Triggered when receiving new state
		//If selected file has changed, load new source
	},
	render: function(){
		console.log("this: ",this)
		console.log("this.props: ", this.props)
		console.log("this.state: ",this.state)
		return (
			<div>
				<ScriptListBox filenames={this.state.filenames} changecb={this.chooseFile} /> 
				<button>Save</button> <button>New</button>
				<ScriptViewer source={this.state.source} />
			</div>
		)
	},

	setScriptList: function(filenames){
		this.setState({'filenames':filenames})
	},

	chooseFile: function(source){
		this.setState({'source': source})
	}
})

var ScriptListBox = React.createClass({
	//Props: List of scripts already in system
	propTypes: {
		//filenames: React.PropTypes.ArrayOf(React.PropTypes.string),
		//changeCB
	},
	getDefaultProps: function(){
		return {filenames: [], selected: "List not loaded..."}
	},

	render: function(){
		return(
			<select onChange={this.props.changeCB}>
				{this.props.filenames.map(function(filename){
					return <option value={filename}>{{filename}}</option>
				})}
			</select>
		)
	}
})

var ScriptViewer = React.createClass({

	render: function(){
		return (
			<textarea rows="40" cols="80" id="source-input">
				{this.props.source}
			</textarea>
		)
	}
})





function getScriptList(cb){
	console.log("Getting list of scripts...")
	var request = new XMLHttpRequest();
	request.open('GET', '/scripts/')

	request.onload = function(){
		if(this.status >= 200 && this.status < 400){
			var resp = JSON.parse(this.response);
			cb(resp)	//Notify callback of data
			console.log("Requested list of source files  ", resp);
		} else {
			console.log("Error sending requesting list of source files: ", this.response);
		}
	}

	request.send()
}

function getScriptSource(filename, cb){
	console.log("Getting source for ", filename)
	var request = new XMLHttpRequest();
	request.open('GET', '/scripts/'+filename)

	request.onload = function(){
		if(this.status >= 200 && this.status < 400){
			resp = this.response;
			cb(resp)	//Notify callback of data
			console.log("Requested list of source files  ", resp);
		} else {
			console.log("Error sending requesting list of source files: ", this.response);
		}
	}

}

module.exports = ScriptManager;