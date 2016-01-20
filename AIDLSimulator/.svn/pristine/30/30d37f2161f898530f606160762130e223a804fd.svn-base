$(document).ready(function(){
	  
	var connection = new WebSocket("ws://localhost:8080/AIDLSimulator/server_endpoint");
	
	connection.onopen= function(){
		
		console.log("Websocket connection has been established");
		
		$("#begin_login").click(function(){
			
			$("#begin_login").attr("disabled", true);
			connection.send("Begin login.");
		});
	
	};
	
	connection.onmessage= function(reply){
		var P_ID;
		var reply= reply.data;

		if(reply.indexOf("P_ID") > -1){
			P_ID= reply.substring(8);
			$("#prog_logs").append("<li><b>"+new Date().toString("hh:mm tt")+"</b><br />"+P_ID+" has entered ID.</li>");
			
			$("#push_pre").click(function(){
				$("#push_pre").attr("disabled", true);
				connection.send("push preview");
			});
			
		} else if(reply.indexOf("Preview completed") > -1){
			console.log(reply);
			P_ID= reply.substring(25);
			$("#prog_logs").append("<li><b>"+new Date().toString("hh:mm tt")+"</b><br/>"+P_ID+" has completed preview.</li>");
			
			$("#start_sce").click(function(){
				$("#start_sce").attr("disabled", true);
				$("#prog_logs").append("<li><b>"+new Date().toString("hh:mm tt")+"</b><br />Simulator Started.</li>");
				connection.send("Load main frontend");
	
			});	
			
		} else if(reply.indexOf("Participant interface loaded.") > -1){
			console.log(reply.indexOf("Participant interface loaded. "));
			console.log(reply);
			$("#experimenter_form").submit(function(e){   //serialize form after submitting experimenter form and send to server
				e.preventDefault();
				if($("#experimenterID").val() != "" && $("#scenario_xml_select").val() != "" && $("#marketdata_csv_select").val() != "" && $("#database_select").val() != ""){
					console.log($(this).serializeObject());
					var json_string = JSON.stringify($(this).serializeObject());
					console.log(json_string);
					$("#load_sce").attr("disabled", true);
					$("#experimenterID").attr("disabled", true);
					$("#scenario_xml_select").attr("disabled", true);
					$("#marketdata_csv_select").attr("disabled", true);
					$("#database_select").attr("disabled", true);
					$("#file_db_exp_container").css("opacity", "0.65");
					$("#prog_logs").append("<li><b>"+new Date().toString("hh:mm tt")+"</b><br/>Scenario is loaded.</li>");
					connection.send(json_string);
				} 
		
			});	
			
		}  else if(reply.indexOf("TIMESTEP: ") > -1){
			$("#timestep_val").text(reply.substring(9));
		
		}else if(reply.indexOf("TEST STRING: ") > -1){
			$("#debug_logs").append("<li>"+ reply.substring(12) + "</li>");
		
		} else if(reply.indexOf("ERROR STRING: ") > -1){
			$("#error_logs").append("<li>"+ reply.substring(13) + "</li>");
			
		} else if(reply.indexOf("Simulator started") > -1){
			$("#timestep_val").text("0");
			$("#stop_sim").click(function(){
				$("#stop_sim").attr("disabled", true);
				$("#prog_logs").append("<li><b>"+new Date().toString("hh:mm tt")+"</b><br />Simulator Stopped.</li>");
				$("#debug_logs").append("<li>Simulator stopped.</li>");
				connection.send("Stopping simulator");
				connection.close();
			});	
			
		} 
	};
	
	
	// Handle any errors that occur.
	connection.onerror = function(error) {
	  console.log('WebSocket Error: ' + error);
	};
	
	// method invoked when connection is closed
	connection.onclose=function(){
		 console.log('WebSocket connection closed');
	};


		
	//user defined function to serialize the user trade requests to an object to send to server
	$.fn.serializeObject = function()	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
            o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	
	
});