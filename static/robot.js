var Robot = (function(){

	return {
		postMoveDirection: function(dir){
			console.log('Derp')
			var request = new XMLHttpRequest();
			request.open('POST', '/drive');
			request.setRequestHeader('Content-Type', 'text');

			request.onload = function(){
				
				if(this.status >= 200 && this.status < 400){
					resp = this.response;
					console.log("Sent POST request, got back  ", resp);
				} else {

					console.log("Error sending POST request: ", this.response);
				}

			}

			request.send(dir)
			return false //Cancels event
		}
	}
}());