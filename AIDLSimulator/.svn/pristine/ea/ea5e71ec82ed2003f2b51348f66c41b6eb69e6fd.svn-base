$(document).ready(function(){
			
		
	var connection = new WebSocket("ws://localhost:8080/AIDLSimulator/server_endpoint");
	
	connection.onopen= function(){
		
		console.log("Websocket connection has been established.");
	};
	
	// Handle any errors that occur.
	connection.onerror = function(error) {
	  console.log('WebSocket Error: ' + error);
	};
	
	
	connection.onmessage = function(message){
		
		var message= message.data;
		if(message=="make_active"){
			$("#participantID").prop('disabled', false);
					
			/*$("#login_form").submit(function(){
				connection.send("PID = " + $("#participantID").val());
				return false;
			});*/
			
			$("#submitid").click(function(e){
				e.preventDefault();
				connection.send("PID = " + $("#participantID").val());
			});
			
		} else if(message == "load URL"){
			window.location.href="preview.html";
		
		} else if(message == "Load main frontend"){
			window.location.href="participant_interface.html";
		}
	
	};
	
	connection.onclose = function(){
		console.log("Websocket connection closed. ");
	};
	
	
	$("#next").click(function(){
		console.log("Preview completed");
		connection.send("Preview completed");
		$(this).attr("disabled", true);
	});
	
});






