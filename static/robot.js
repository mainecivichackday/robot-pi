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
			return false //Cancels dom event
		},

		postScript: function(filename, script){
			console.log('postScript('+filename+', '+script+') called')
			var request = new XMLHttpRequest();
			request.open('POST', '/scripts/'+filename)
			request.setRequestHeader('Content-Type', 'text')

			request.onload = function(){
				if(this.status >= 200 && this.status < 400){
					resp = this.response;
					console.log("Sent POST request, got back  ", resp);
				} else {
					console.log("Error sending POST request: ", this.response);
				}
			}

			request.send(script)
			return false; //Cancels dom event
		},

		executeScript: function(filename){
			console.log("executeScript("+filename+")")
			var request = new XMLHttpRequest();
			request.open('POST', '/scripts/run');
			request.setRequestHeader('Content-Type', 'text');

			request.onload = function(){
				if(this.status >= 200 && this.status < 400){
					resp = this.response;
					console.log("Sent POST request, got back  ", resp);
				} else {
					console.log("Error sending POST request: ", this.response);
				}				
			}

			request.send(filename);
			return false;
		}
	}
}());