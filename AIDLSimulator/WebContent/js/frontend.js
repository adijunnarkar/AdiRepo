
$(document).ready(function(){


	//opens websocket connection
	var connection = new WebSocket("ws://localhost:8080/AIDLSimulator/server_endpoint");
	

	//method invoked when websocket connection is open
	connection.onopen = function(){
		console.log("Websocket connection has been established (participant interface).");
		connection.send("Participant interface loaded.");
		
	};
	
	//method invoked when message is received from server
	connection.onmessage = function(message){
		var message = message.data;
		
		console.log("Message before stringify: "+ message);
		JSON.stringify(message);
		
		console.log("Message after stringify: " + message);
		
		var js_object = parseJson(message);
		
		if(!$.isArray(js_object)){
			if(js_object.hasOwnProperty('initialAccountBalance')) {              //filters initial scenario variables
				
				portfolio_obj = new Portfolio();
				portfolio_obj.setAccountBalance(js_object.initialAccountBalance);
				scenario_obj = new Scenario(js_object.numOfProducts, js_object.numOfAutomatedProducts, js_object.scenarioDuration, false, js_object.timeWindowForQuotes);
				createCandlestickChart(scenario_obj);
				event_list_obj = new EventData();
				var net_investment = 0;
				for(var j = 0; j < js_object.numOfProducts; ++j){
					if(!js_object.initialProductList[j].isAutomated){
						//$("#product_select_manual").append("<li id ="+j+"><a>" + js_object.initialProductList[j].tickerSymbol + "</a></li>");
						$("#product_select_manual").append("<option id ="+ j +" value = "+ js_object.initialProductList[j].tickerSymbol + ">" + js_object.initialProductList[j].tickerSymbol +"</option");
						///$("#man_select").append("<li id ="+ js_object.initialProductList[j].ProductID +"><a>" +  js_object.initialProductList[j].tickerSymbol + "</a></li>");
						$("#man_select").append("<option id ="+ js_object.initialProductList[j].ProductID +" value="+js_object.initialProductList[j].tickerSymbol+">" +  js_object.initialProductList[j].tickerSymbol + "</option>");
					//	manual_product_list.push(js_object.initialAssetList[j].tickerSymbol);
					//	manual_quantity_list.push(js_object.initialAssetList[j].quantityHeld);
					//	manual_asset_val_list.push(js_object.initialAssetList[j].assetCurrentValue);
						
					} else {
							//$("#product_select_auto").append("<li id ="+j+"><a>" + js_object.initialProductList[j].tickerSymbol + "</a></li>");
							$("#product_select_auto").append("<option id ="+ j +" value = "+ js_object.initialProductList[j].tickerSymbol + ">" + js_object.initialProductList[j].tickerSymbol +"</option");
							//$("#auto_select").append("<li id ="+ js_object.initialProductList[j].ProductID +"><a>" +  js_object.initialProductList[j].tickerSymbol + "</a></li>");
							$("#auto_select").append("<option id ="+ js_object.initialProductList[j].ProductID +" value="+js_object.initialProductList[j].tickerSymbol+">" +  js_object.initialProductList[j].tickerSymbol + "</option>");
							auto_product_list.push(js_object.initialAssetList[j].tickerSymbol);
							auto_quantity_list.push(js_object.initialAssetList[j].quantityHeld);
							auto_asset_val_list.push(js_object.initialAssetList[j].assetCurrentValue);
					}
					$("#product_list").append("<li>"+js_object.initialAssetList[j].tickerSymbol + "</li>");
					$("#quantity_list").append("<li>"+js_object.initialAssetList[j].quantityHeld + "</li>");
					$("#curr_closeprice_list").append("<li></li>");
					$("#test1").append("<li></li>");
					$("#test2").append("<li></li>");
					net_investment += js_object.initialAssetList[j].assetCurrentValue;
					product_list.push(js_object.initialAssetList[j].tickerSymbol);
					asset_val_list.push(js_object.initialAssetList[j].assetCurrentValue);
					if(!portfolio_obj.assetList[j]){
						portfolio_obj.addAsset(new Asset(js_object.initialAssetList[j].ProductID, js_object.initialAssetList[j].tickerSymbol, js_object.initialProductList[j].isAutomated));
						portfolio_obj.assetList[j].updateAssetCurrentValue(js_object.initialAssetList[j].assetCurrentValue);
						portfolio_obj.assetList[j].updateQuantityHeld(js_object.initialAssetList[j].quantityHeld);
					} 

				}
				
				if(!js_object.initialProductList[0].isAutomated){
					$("#man").attr("checked", true);
					$("#product_select_manual").show();
					$("#product_select_manual").find("option:nth-child(1)").attr("selected", true);

				
				} else{
						$("#auto").attr("checked", true);
						$("#product_select_auto").show();	
						$("#product_select_auto").find("option:nth-child(1)").attr("selected", true);
						
				}
				
				for(var j = 0; j < js_object.numOfAutomatedProducts; ++j){
				//	$("#algo_monitor tbody").append("<tr><td>"+ auto_product_list[j]+"</td><td></td><td></td><td></td><td></td><td></td></tr>");
					$("#automated_product_list").append("<li>"+auto_product_list[j]+"</li>");
					$("#algorithm_list").append("<li></li>");
					$("#iteration_list").append("<li></li>");
					$("#current_state_list").append("<li></li>");
					$("#orders_completed_list").append("<li></li>");
					$("#total_profit_loss_list").append("<li></li>");
				}
				
		/*		if ( $("#product_select_manual li").length){
					$("#product_select_manual li:eq(0) a").addClass("selected");
				}
				
				if( $("#product_select_auto li").length > 0){
					$("#product_select_auto li:eq(0) a").addClass("selected");
				}*/
				var cash = portfolio_obj.getAccountBalance();
				createCashInvestmentChart(cash, net_investment.toFixed(2));
				createAssetAllocationChart(product_list, asset_val_list);
			//	createQuantityChart(manual_product_list, manual_quantity_list, auto_product_list, auto_quantity_list);
			//	createInvestmentChart(manual_product_list, manual_asset_val_list, auto_product_list, auto_asset_val_list);
				
			}	else if(js_object.hasOwnProperty('name') && js_object.hasOwnProperty('description')){     //filters events
						var timestamp = new Date().toString("hh:mm tt");
						event_list_obj.addEvent(new ProductEventData(timestamp, js_object.name, js_object.tickerSymbol, js_object.description ));
					/*	$("#eventtimestamp_list").append("<li><b>" + timestamp + "</b></li>");
						$("#eventname_list").append("<li>" + js_object.name + "</li>");
						$("#eventproduct_list").append("<li>" + js_object.tickerSymbol + "</li>");
						$("#eventdescription_list").append("<li>" + js_object.description + "</li>");*/
						$("#eventtimestampcontent_list").append("<li><b>" + timestamp + "</b></li>");
						$("#eventlabelcontent_list").append("<li>" + js_object.name + "</li>");
						$("#eventproductcontent_list").append("<li>" + js_object.tickerSymbol + "</li>");
						$("#eventdescriptioncontent_list").append("<li>" + js_object.description + "</li>");
								
				
			} else if(js_object.hasOwnProperty('quantityHeld')){      //filters manual and automatic assets ordered
				
				//	var length_manual = manual_product_list.length;
				//	var length_auto =  auto_product_list.length;
				//	var length_assetlist = portfolio_obj.assetList.length;
					
				/*	for(var j = 0; j < length_manual ; ++j){
						if(manual_product_list[j] == js_object.tickerSymbol){
							manual_quantity_list[j] = js_object.quantityHeld;
							manual_asset_val_list[j] = js_object.assetCurrentValue;				
						}
					}
					
					for(var j = 0; j < length_auto ; ++j){
						if(auto_product_list[j] == js_object.tickerSymbol){
							auto_quantity_list[j] = js_object.quantityHeld;
							auto_asset_val_list[j] = js_object.assetCurrentValue;				
						}
					}*/
					var net_investment = 0;
					for(var i = 0; i < scenario_obj.getNumOfProducts(); ++i){
						if(product_list[i] == js_object.tickerSymbol){
							
							asset_val_list[i] = js_object.assetCurrentValue;
							portfolio_obj.assetList[i].updateAssetCurrentValue(js_object.assetCurrentValue);
							portfolio_obj.assetList[i].updateQuantityHeld(js_object.quantityHeld);
							$("#quantity_list li").eq(i+1).text(js_object.quantityHeld);
						}
						net_investment += asset_val_list[i];
					}
					
				//	for(var j = 0; j < length_assetlist; ++j){
					//	if(portfolio_obj.assetList[j].getTickerSymbol() == js_object.tickerSymbol){	
					//		portfolio_obj.assetList[j].updateAssetCurrentValue(js_object.assetCurrentValue);
					//		portfolio_obj.assetList[j].updateQuantityHeld(js_object.quantityHeld);
					//	}
				//	}	
					
					updateCashInvestmentChart(portfolio_obj.getAccountBalance(), net_investment.toFixed(2));
					updateAssetAllocationChart(product_list, asset_val_list);
				//	update_QtyChart(manual_quantity_list, auto_quantity_list);
				//	update_InvChart(manual_asset_val_list, auto_asset_val_list);
					
			} else if (js_object.hasOwnProperty('accountBalance')){           //filters new account balance
			//	portfolio_obj.updateAccountBalance(js_object.accountBalance);
				portfolio_obj.setAccountBalance(js_object.accountBalance);
			
			} else if(js_object.hasOwnProperty('algoType')){      //filters algorithm state display data   
				
			/*	$('#algo_monitor td:nth-child(1)').each(function() {
				    if($(this).html() == js_object.tickerSymbol){
				    	$(this).next().text(js_object.algoType);
				    	$(this).next().next().text(js_object.currentState);
				    	$(this).next().next().next().text(js_object.ordersCompleted);
				    	$(this).next().next().next().next().text(js_object.totalAmountPurchased);
				    	$(this).next().next().next().next().next().text(js_object.totalAmountSold);
					}
				});*/
				for(var i = 0; i < scenario_obj.getNumOfAutomatedProducts(); ++i){
					if(auto_product_list[i] == js_object.tickerSymbol){
						$("#algorithm_list li").eq(i+1).text(js_object.algoType);
						$("#iteration_list li").eq(i+1).text(js_object.currentIteration);
						$("#current_state_list li").eq(i+1).text(js_object.currentState);
						$("#orders_completed_list li").eq(i+1).text(js_object.ordersCompleted);
						if(js_object.profitOrLossValue != -1){
							if(js_object.profitOrLossValue > 0){
								$("#total_profit_loss_list li").eq(i+1).text("+ " + js_object.profitOrLossValue);
								$("#total_profit_loss_list li").eq(i+1).css("color", "#66FF33");
							} else {
									$("#total_profit_loss_list li").eq(i+1).text(js_object.profitOrLossValue);
							}
						}
					}
				}
				
			} else if(js_object.hasOwnProperty('feedback')){  //filters custom feedback after requesting order
				
					if(!js_object.isAlgorithmPanel){
						$("#feedback_panel_manual .content").append("<p>"+js_object.feedback+"</p>");
					} else {
						$("#feedback_panel_algocontrol .content").append("<p>"+js_object.feedback+"</p>");
					}
					
			} else if(js_object.hasOwnProperty('message') && js_object.hasOwnProperty('feedbackID')){  //filters standard feedback after requesting order
				
				if(js_object.forManualRequest){
					$("#feedback_panel_manual .content").append("<p>"+js_object.message+"</p>");
				} else {
					$("#feedback_panel_algocontrol .content").append("<p>"+js_object.message+"</p>");
				}
				
		}else if(js_object.hasOwnProperty('intervalID')){  //filters pause objects 
			
			/*	switch(js_object.intervalID){
					case 0: 
						var newPopup = window.open('Pause_popup1.html', '_blank', 'toolbar=0,location=0,menubar=0');
						setTimeout(function(){
								newPopup.close();	
						}, js_object.duration*4000);
						break;	
					case 1: 
						var newPopup = window.open('Pause_popup2.html', '_blank', 'toolbar=0,location=0,menubar=0');
						setTimeout(function(){
								newPopup.close();	
						}, js_object.duration*4000);
						break;	
					case 2: 
						var newPopup = window.open('Pause_popup3.html', '_blank', 'toolbar=0,location=0,menubar=0');
						setTimeout(function(){
								newPopup.close();	
						}, js_object.duration*4000);
						break;	
					case 3: 
						var newPopup = window.open('http://www.bing.com', '_blank', 'toolbar=0,location=0,menubar=0');
						setTimeout(function(){
								newPopup.close();	
						}, js_object.duration*4000);
						break;	
					default: console.log("No match");
							
				}*/
			} else if(js_object.hasOwnProperty('interruptID')){  //filters interrupt objects 
				
					switch(js_object.interruptID){
						case 0: 
							var newPopup = window.open('Interrupt_popup1.html', '_blank', 'toolbar=0,location=0,menubar=0');
							setTimeout(function(){
									newPopup.close();	
							}, js_object.duration*4000);
							break;	
						case 1: 
							var newPopup = window.open('Interrupt_popup2.html', '_blank', 'toolbar=0,location=0,menubar=0');
							setTimeout(function(){
									newPopup.close();	
							}, js_object.duration*4000);
							break;	
						case 2: 
							var newPopup = window.open('Interrupt_popup3.html', '_blank', 'toolbar=0,location=0,menubar=0');
							setTimeout(function(){
									newPopup.close();	
							}, js_object.duration*4000);
							break;	
						case 3: 
							var newPopup = window.open('http://www.bing.com', '_blank', 'toolbar=0,location=0,menubar=0');
							setTimeout(function(){
									newPopup.close();	
							}, js_object.duration*4000);
							break;	
						default: console.log("No match");
								
					}
			}else if (js_object.indexOf("Stop simulator") >-1){
				console.log("Stop");
				connection.close();
			} 
		
		} else if(js_object[0].hasOwnProperty('curr_close_price')){       //filters market data   
		
					for(var j = 0; j < scenario_obj.getNumOfProducts() ; ++j){
						if(!curr_prod_data[j]){
							curr_prod_data.push(new ProductMarketData(js_object[j].productID,  js_object[j].tickerSymbol, j, null, null, null));
						} 
						$("#curr_closeprice_list li").eq(j+1).text(js_object[j].curr_close_price);
						curr_prod_data[j].updateCurrentQuote(js_object[j].curr_open_price, js_object[j].curr_close_price, js_object[j].curr_high_price, js_object[j].curr_low_price);			
					}
					
		}  else if(js_object[0].hasOwnProperty('quantityHeld')){
				
			var length_manual = manual_product_list.length;
			var length_auto =  auto_product_list.length;
			var length_assetlist = portfolio_obj.assetList.length;
			var net_investment = 0;
			while(asset_val_list.length > 0){
				asset_val_list.pop();
			}
				for(var j = 0; j < scenario_obj.getNumOfProducts() ; ++j){
					net_investment += js_object[j].assetCurrentValue;
					asset_val_list.push(js_object[j].assetCurrentValue);
				/*	for(var k = 0; k < length_manual ; ++k){
						if(manual_product_list[k] == js_object[j].tickerSymbol){
							manual_asset_val_list[k] = js_object[j].assetCurrentValue;				
						}
					}
					
					for(var l = 0; l < length_auto ; ++l){
						if(auto_product_list[l] == js_object[j].tickerSymbol){
							auto_asset_val_list[l] = js_object[j].assetCurrentValue;				
						}
					}*/
					
					for(var m = 0; m < length_assetlist; ++m){
						if(portfolio_obj.assetList[m].getTickerSymbol() == js_object[j].tickerSymbol){	
							portfolio_obj.assetList[m].updateAssetCurrentValue(js_object[j].assetCurrentValue);
							
						}
					}	
					updateCashInvestmentChart(portfolio_obj.getAccountBalance(), net_investment.toFixed(2));
					updateAssetAllocationChart(product_list, asset_val_list);
				//	update_QtyChart(manual_quantity_list, auto_quantity_list);
				//	update_InvChart(manual_asset_val_list, auto_asset_val_list);
				}
			
		}   
			
		
		
/*		$("#product_select_manual li a").click(function(){     //show chart when manual product is selected
			
			$("#product_select_manual li a.selected").removeClass("selected");
			$(this).addClass("selected");
			var ID = $(this).parent().attr("id");
			console.log("ID "+ ID);
			chart.mainDataSet = chart.dataSets[ID];
		 

		});
		
		$("#product_select_auto li a").click(function(){     // show chart when automatic product is selected
			
			$("#product_select_auto li a.selected").removeClass("selected");
			$(this).addClass("selected");
			var ID = $(this).parent().attr("id");
			console.log("ID "+ ID);
			chart.mainDataSet = chart.dataSets[ID];
		

		});*/
		
		
			
	/*	$("#man_select li a").click(function(){
				
			$("#man_select li").each(function(){ 
					$(this).find('a').css({"background-color": "lightgray", "border-color" : "gray" });
					
			}); 
			
			$("#get_product").val($(this).html());
			$("#get_id").val( $(this).parent().attr("id") );
			$("#is_update_present").val("1");
			$(this).css({"background-color": "lightblue", "border-color" : "blue" });
			
		});	*/
		
	/*	$("#man_tif_select li a").click(function(){
			
			$("#man_tif_select li").each(function(){ 
					$(this).find('a').css({"background-color": "lightgray", "border-color" : "gray" });
					
			}); 
			
			$("#get_tif").val($(this).html());
			$(this).css({"background-color": "lightblue", "border-color" : "blue" });
			
		});	*/	
	};
	
	
	
	//method invoked on websocket connection error
	connection.onerror = function(error){
		console.log('WebSocket Error: ' + error);
	};
	
	//method invoked when websocket connection is closing
	connection.onclose = function(){
		console.log("Websocket connection closed.");
	};
	
	$("input[name='trade_categ']").click(function(){   //When any of the trade categories is selected (manual/ automatic), show chart for first product of the respective list
		
		$("#product_select_manual").hide();
		$("#product_select_auto").hide();
		
		if ($("input[value='manual']").is(':checked')){
			$("#product_select_manual").show();
		/*	$("#product_select_manual li a.selected").removeClass("selected");
			$("#product_select_manual li").first().find('a').addClass("selected");*/
			
		//	chart.mainDataSet = chart.dataSets[$("#product_select_manual li").first().attr("id")];
			$("#product_select_manual").val($("#product_select_manual option:nth-child(1)").html());
			chart.mainDataSet = chart.dataSets[$("#product_select_manual").find("option:nth-child(1)").attr("id")];
			var _timestamp = new Date().toString("HH:mm:ss");
			var manual_product_view = {
					timestamp: _timestamp,
					product: $("#product_select_manual").val(),
					type: "manual"
			};
			
			var json_view_data = JSON.stringify(manual_product_view);
			connection.send(json_view_data);
			
		} else if ($("input[value='auto']").is(':checked')){
			$("#product_select_auto").show();
		/*	$("#product_select_auto li a.selected").removeClass("selected");
			$("#product_select_auto li").first().find('a').addClass("selected");*/
		//	chart.mainDataSet = chart.dataSets[$("#product_select_auto li").first().attr("id")];
			$("#product_select_auto").val($("#product_select_auto option:nth-child(1)").html());
			chart.mainDataSet = chart.dataSets[$("#product_select_auto").find("option:nth-child(1)").attr("id")];
			var _timestamp = new Date().toString("HH:mm:ss");
			var auto_product_view = {
					timestamp: _timestamp,
					product: $("#product_select_auto").val(),
					type: "automatic"
			};
			
			var json_view_data = JSON.stringify(auto_product_view);
			connection.send(json_view_data);
		}
	});

	$("#product_select_manual").change(function(){     //show chart when manual product is selected
		var ID = $(this).find("option[value="+$(this).val()+"]").attr("id");
		chart.mainDataSet = chart.dataSets[ID];
		var _timestamp = new Date().toString("HH:mm:ss");
		var manual_product_view = {
				timestamp: _timestamp,
				product: $(this).val(),
				type: "manual"
		};
		
		var json_view_data = JSON.stringify(manual_product_view);
		connection.send(json_view_data);
 
	});
	
	$("#product_select_auto").change(function(){     // show chart when automatic product is selected
		
		var ID = $(this).find("option[value="+$(this).val()+"]").attr("id");
		chart.mainDataSet = chart.dataSets[ID];
		var _timestamp = new Date().toString("HH:mm:ss");
		var auto_product_view = {
				timestamp: _timestamp,
				product: $(this).val(),
				type: "automatic"
		};
		
		var json_view_data = JSON.stringify(auto_product_view);
		connection.send(json_view_data);
	
	});
	
	
	$("#man_select").change(function(){     //add product ID of the product selected to the form before submitting an manual order      
		$("#get_id_manual").val( $(this).find("option[value="+$(this).val()+"]").attr("id") );
		//$("#is_update_present_manual").val("1");
	});
	
	$("#auto_select").change(function(){     //add product ID of the product selected to the form before launching algorithm  
		$("#get_id_auto").val( $(this).find("option[value="+$(this).val()+"]").attr("id") );
		//$("#is_update_present_auto").val("1");
	});
	
	$("#manual_order").submit(function(e){   //serialize form after submitting manual order and send to server
		e.preventDefault();
		if(manualOrderValidate()){
			var _timestamp = new Date().toString("HH:mm:ss");
			$("#get_timestamp_manual").val(_timestamp);
			console.log($(this).serializeObject());
			var json_string = JSON.stringify($(this).serializeObject());
			console.log(json_string);
			connection.send(json_string);
		} 
	
	});	
	
	$("#algorithm_control").submit(function(e){   //serialize form after submitting state change request and send to server
		e.preventDefault();
		if(algoRequestValidate()){
			var _timestamp = new Date().toString("HH:mm:ss");
			$("#get_timestamp_auto").val(_timestamp);
			console.log($(this).serializeObject());
			var json_string = JSON.stringify($(this).serializeObject());
			console.log(json_string);
			connection.send(json_string);
		}
	});	
	
	
	//Initialize the spinners for requesting the quantity and the entry/exit thresholds
	
	$("#quantitym_spinner, #quantitya_spinner, #entry_spinner, #exit_spinner").spinner({
		min: 0,	
		change: function(event, ui){
					if((isNaN($(this).val())) || ($(this).val() < 0) ){
						$( "#quantitym_spinner, #quantitya_spinner, #entry_spinner, #exit_spinner" ).spinner( "value", 0 );
					}
				}
		});

	$( "#quantitym_spinner, #quantitya_spinner, #entry_spinner, #exit_spinner" ).spinner( "value", 0 );
	$( "#quantitym_spinner, #quantitya_spinner" ).width(30);
	$("#entry_spinner, #exit_spinner").spinner({step: 0.001}).height(13).width(65)	;									

	//Keep submit button disabled until all fields filled
	
	$('#manual_order select').change(function() {
	//	console.log($('#manual_order input:visible').length);
		var empty = false;
		
		$('#manual_order select').each(function() {
			if ($(this).val() == 'Select') {
				empty = true;
			} 
		});
  
		$('#manual_order input:visible').each(function() {
			if ($(this).val() == '') {
				empty = true;
			} 
		});
		
		if (empty) {
			$('#submit_order').attr('disabled', 'disabled');
		} else {
			$('#submit_order').attr('disabled', false);
		}
	});
	
	$('#manual_order input').keyup(function() {
		//console.log($('#manual_order input:visible').length);
		var empty = false;
		
		$('#manual_order input:visible').each(function() {
			if ($(this).val() == '') {
				empty = true;
			} 
		});
		
		$('#manual_order select').each(function() {
			if ($(this).val() == 'Select') {
				empty = true;
			} 
		});
		
		
		if (empty) {
			$('#submit_order').attr('disabled', 'disabled');
		} else {
			$('#submit_order').attr('disabled', false);
		}
	});
	
	
	$('#algorithm_control select').change(function() {
		console.log($('#algorithm_control input:visible').length);
		var empty = false;
		$('#algorithm_control input:visible').each(function() {
			if ($(this).val() == '') {
				empty = true;
			} 
		});

		$('#algorithm_control select').each(function() {
			if ($(this).val() == 'Select') {
				empty = true;
			} 
		});
  
		if (empty) {
			$('#submit_state_change').attr('disabled', 'disabled');
		} else {
			$('#submit_state_change').attr('disabled', false);
		}
	});
	
	$('#algorithm_control input').keyup(function() {
		
		console.log($('#algorithm_control input:visible').length);
		var empty = false;
		$('#algorithm_control input:visible').each(function() {
			if ($(this).val() == '') {
				empty = true;
			}  
		});

		$('#algorithm_control select').each(function() {
			if ($(this).val() == 'Select') {
				empty = true;
			} 
		});
  
		if (empty) {
			$('#submit_state_change').attr('disabled', 'disabled');
		} else {
			$('#submit_state_change').attr('disabled', false);
		}
	});
	
	/*var bal = $( "#prog_bar" ).progressbar( "option", "max" ) - $( "#prog_bar" ).progressbar( "option", "value" ) ;
	$( "#prog_bar" ).after("<div class=\"caption\"> $"+ bal +" available</div>");*/

/*	var nw = (50/ $( "#prog_bar" ).progressbar( "option", "max" ))*102 + "%";
	$("#prog_bar .ui-progressbar-value").animate({width: nw}, 'slow');
	bal = $( "#prog_bar" ).progressbar( "option", "max" ) - $( "#prog_bar" ).progressbar( "option", "value" ) ;
	$( "#prog_bar + caption" ).replaceWith("<div class=\"caption\"> $"+ bal +" available</div>");*/

	
	
	
	$(":radio").click(function(){
	/*	if($('#auto').is(':checked')) { 
			//console.log($("#product_select").html());
			$("#product_select li").wrapAll("<div></div>");
			$("#product_select div").replaceWith(
				"<li><a>AXP</a></li><li><a>CAT</a></li><li><a>MSFT</a></li><li><a>MRK</a></li>"); 
		
		} else if($('#man').is(':checked')) {
			$("#product_select li").wrapAll("<div></div>");
			$("#product_select div").replaceWith(
			"<li><a>NOK</a></li><li><a>BBRY</a></li><li><a>YHOO</a></li><li><a>TRLA</a></li>"); 
		}*/
	});

	
	
	
/*	    $("#line_chart").highcharts("StockChart", {
	    	
	    	title : {
				//text : 'Real- Time Quotes'
			},
	    	chart: {
	    		alignTicks: true,
	    		animation: true,
	    		//renderTo: line_chart,	
	    	},
	    	
	    	rangeSelector : {
				selected : 1,
				inputEnabled: $('#line_chart').width() > 480        //enable date input boxes if width > 480
			},

			scrollbar: {
			    	enabled: false
		    },
			   
		    navigator: {
		    	
		    	//enabled: false,
		    	series: {
		    		name: 'Navigator'
		    	}                             
		    },                    
			series : [{
				name : null,
				data : [0,0,0,0,0,0],
				id: '3',
				tooltip: {
					valueDecimals: 2
				},
				marker : {
					enabled : true,
					radius : 3
				},
				shadow : true,
			}],  
			
			xAxis: {
				reversed: false,
				type: 'datetime'
			},
			
			yAxis : {
				opposite: true,
				title : {
					text : 'CAD'
				}
			},
	    }); */

	   
});


