var React = require('react');
var DrivePanel = require('./drive.js');
var ScriptManager = require('./user_scripts.js');
var Tabs = require('./lib/tabs.react');

var App = React.createClass({
	render: function(){
		return (
		  <div>
		  	Hello, world!
		  	<Tabs useState={true}>
		  		<DrivePanel tabName='Drive' />
		  		<ScriptManager tabName='Scripts' />
		  		<div tabName='Sensors'>Nothing here yet either.</div>
		  	</Tabs>
		  </div>
	  )
	}
});

React.render(
  <App />,
  document.getElementById('robot-index')
);

module.exports = App;