$(document).ready(function(){
	  
	var connection = new WebSocket("ws://localhost:8080/AIDLSimulator/server_endpoint");
//	var connection2 = new WebSocket("ws://localhost:8080/AIDLSimulator/serverend");
	//var connected = true;
	
	//method invoked when websocket connection is open
	connection.onopen = function(){
		
		//print message to console that connection is open 
	 	console.log(" Websocket connection is now open.");
	 	
	 	$("#stockdisplay").click(function(){ //Upon clicking the "Submit Order Specifications" button..
	    
	 		//Add text to stockspecifications div to display recent product order
	 		$("#stockspecifications").text("Product: " + $("#stocklist").val() 
	 				+ ", Quantity: " + $("#quantity").val() 
	 				+", Price: " + $("#price").val() 
	 				+ ", Type: " + $("#ordertype").val());
	    
	 		//Append recent product order to basket 
	 		$("#basket").append("<li> " 
	 				+ "Product: " + $("#stocklist").val() 
	 				+ ", Quantity: " + $("#quantity").val() 
	 				+ ", Price: "+ $("#price").val() + ", Type: " + $("#ordertype").val()
	 				+ "</li>");
	    
	 		var order = new Object();
	 		order.prod_name= $("#stocklist").val();
	 		order.quantity= $("#quantity").val();
	 		order.price = $("#price").val();
	 		order.type = $("#ordertype").val();

	 		//print js object to console 
	 		console.log("Non-converted js object: " + order);
	    	
 			//define and initialize var; convert js object to json 
	 		var message = JSON.stringify(order);
	    	
	 		//print converted js object to console 
	 		console.log("Converted JS object: " + message);
	    	
	 		//send message from client to server over websocket 
	 		connection1.send(message);
    	    connection1.send("hi");
	 	});
 	};

    //method invoked when websocket connection is closed 
    connection.onclose = function(){
    	//print message to console that connection is closed 
    	console.log("Websocket connection is now closed.");
    };

    //method invoked when error occurs 
    connection.onerror = function(){
    	//print message to console that error has occured 
    	console.log("Error has occured.");
	    	
    };

    //method invoked when server receives message from client 
    connection.onmessage = function(reply){
	    	//create variable reference to JSON string received 
	    	var data = reply.data; 
	    	
	    	//convert JSON document received to JSON string 
	    	JSON.stringify(data);
	    	
	    	//print JSON string to console 
	    	console.log("JSON document from server: " + data);
	    	
	    	//create new js object and parse json string 
	    	var obj = JSON.parse(data);
	    	
	    	if(obj.hasOwnProperty('description')){
	    		
	    			//print event object properties to console
	    			console.log("JSON string converted to javascript event_obj. The properties are: \nevent Name: " + obj.name + "\nDescription: " + obj.description);   		
	    			$("#eventlist").append("<li>" 
	    					+  obj.name
	    					+ "\n"+obj.description  				
	    					+ "</li>");
	    		
	    	
    		} else {
    				console.log("JSON string converted to javascript Object. The properties are: \nName: " + obj.prod_name + "\nQuantity: "+ obj.quantity + "\nPrice: " + obj.price +
    			    			"\nType: " + obj.type);
    		}
	    		
	  
	    	//print object properties to console
	    //	console.log("JSON string converted to javascript Object. The properties are: \nName: " + obj.prod_name + "\nQuantity: "+ obj.quantity + "\nPrice: " + obj.price +
	    	//		"\nType: " + obj.type);
    };

    //method invoked when websocket connection2 is opened
  /*  connection2.onopen = function(){
    	console.log("Websocket connection deployed at endpoint2");
    };
    
    //method
    connection2.onmessage = function(reply){
    	
    	var event_data= reply.data;
    	//convert JSON document received to JSON string 
    	JSON.stringify(event_data);
    	
    	//print JSON string to console 
    	console.log("JSON document from server: " + event_data);
    	
    	//create new js object and parse json string 
    	var event_obj = JSON.parse(event_data);
    	
    	for(var i=0; i< event_obj.length; ++i){
    		//print event object properties to console
        	console.log("JSON string converted to javascript event_obj. The properties are: \nevent Name: " + event_obj[i].name + "\nDescription: " + event_obj[i].description);   		
    	}
    	
    	for(var i =0; i< event_obj.length; ++i){
    		$("#eventlist").append("<li>" 
     				+  event_obj[i].name
     				+ "\n"+event_obj[i].description  				
     				+ "</li>");
    	}
    	
    		
    };
    
    //method invoked when error occurs 
    connection2.onerror = function(){
    	//print message to console that error has occured 
    	console.log("Error has occured.");
	    	
    };*/


	  $("#showbasket").click(function(){
	  	$("#basket").toggle(); //Toggle displaying the product basket
	  	$("#showbasket").text(function(i,v){
	  		return v === 'Show Basket' ? 'Hide Basket' : 'Show Basket'; //Change text from Hide Basket to Show Basket
	  	});
	  });

	  //Activate tooltip event on "Submit Order Specifications" button
	  $("#stockdisplay").tooltip();

	  //Activate tooltip event on "Hide/Show Basket" button
	  $("#showbasket").tooltip(); 

	  //Activate tooltip event on Start button
	  $("#startAlgo").tooltip();

	  //Activate tooltip event on Stop button
	  $("#stopAlgo").tooltip();

	  //Enable bootstrap-select.js specific functionality
	  $("select").selectpicker();


	  //Submit algorithm specification and then alert user of submission
	  $("#submitAlgo").click(function(){

	  	//Error checking to see whether correct algorithm value has been submitted 
	  	if ($("#algorithmlist").val() =="null"){
	  		alert("You have chosen an incorrect value.");
	  	}
	  	else {
	  		alert("You have chosen " + $("#algorithmlist").val() + " as  your algorithm.");
	  	}
	  });
	  
	});