	
//GLOBAL VARIABLES


	var scenario_obj, portfolio_obj, event_list_obj, max_account_balance_reached, product_list =[], asset_val_list= [];

	var curr_prod_data= [], asset_list = [], manual_quantity_list = [], manual_asset_val_list = [], manual_product_list = [];
	var auto_quantity_list = [], auto_asset_val_list = [], auto_product_list = [];

/*var chartData = [ [	{date: new Date(2014, 4, 28, 12, 2, 0, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 2, 4, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 2, 8, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 2, 12, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 2, 16, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 2, 20, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 2, 24, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 2, 28, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 0, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 4, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 8, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 12, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 16, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 20, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 24, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 28, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 32, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 35, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 37, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 40, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 44, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 48, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 52, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 3, 56, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 4, 0, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 4, 4, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 4, 8, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 4, 12, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 4, 16, 0).getTime(), open: 0, close: 0, high: 0, low: 0},
              	{date: new Date(2014, 4, 28, 12, 4, 20, 0).getTime(), open: 0, close: 0, high: 0, low: 0}]];*/
	
	
	function Scenario(num_pro, num_automatedpro, scenario_dur, num_events, timewindow_for_quotes){
	
		if ( arguments.callee._singletonInstance ){
			return arguments.callee._singletonInstance;
		}
		arguments.callee._singletonInstance = this;
	  
		this.numberOfProducts = num_pro;
		this.numberOfProductsAutomated = num_automatedpro;
		this.scenarioDuration = scenario_dur;
		this.numberOfEvents = num_events;
		this.timeWindowForQuotes = timewindow_for_quotes;
	
		this.getNumOfProducts = function(){
			return this.numberOfProducts;		
		};
	
		this.getNumOfAutomatedProducts = function(){
			return this.numberOfProductsAutomated;
		};
	
		this.getTimeWindowForQuotes = function(){
			return this.timeWindowForQuotes;
		};
	}

	function Portfolio(){
	
		if ( arguments.callee._singletonInstance ){
			return arguments.callee._singletonInstance;
		}
		arguments.callee._singletonInstance = this;

	  
		this.accountBalance;
		this.assetList = [];
	
		this.setAssetList = function(_assetList){
			this.assetList = _assetList;
		};
	
		this.addAsset = function(_asset){
			this.assetList.push(_asset);
		};
		
		this.setAccountBalance = function(_account_balance){

			this.accountBalance = _account_balance;
		//	createAccountBalanceChart(this.accountBalance);
		};
	
		this.updateAccountBalance = function(_account_balance){
			this.accountBalance = _account_balance;
			if(this.accountBalance > max_account_balance_reached){
				max_account_balance_reached = this.accountBalance;
			}

		
			if(account_plot){
				var current_time = new Date();	
				//account_data.push({"date": current_time, "account_bal": account_balance});
				console.log("Acc Bal: " + this.accountBalance);
				account_plot.dataSets[0].dataProvider.push({"date": current_time, "account_bal": this.accountBalance});
				account_plot.validateData();
				account_plot.panels[0].zoomOut();
			}
			console.log(account_plot.dataSets[0].dataProvider);
			/*var nw = (this.accountBalance/ $( "#prog_bar" ).progressbar( "option", "max" ))*102 + "%";
			$("#prog_bar .ui-progressbar-value").animate({
												width: nw }, 'slow');
			$( "#prog_bar + caption" ).replaceWith("<div class=\"caption\"> $"+ this.accountBalance +" available</div>");*/
		};
	
		this.getAccountBalance = function(){
			return this.accountBalance;
		};
	
		this.updatePortfolio = function(){
		
		};
	
		this.getAssetsCurrentValue = function(){
		
		};
	
		this.getAssetsQty = function(){
		
		};
	
		this.updateAssetsValue = function(){
		
		};
	
		this.updateAssetsQty = function(){
		
		};
	}

	function MarketData(data_by_product){
	
		this.DataByProduct = data_by_product;
	
		this.getCurrentProductQuote = function(){
		
		};
	
		this.updateQuoteForProduct = function(){
		
		};
	}


	function ProductMarketData(p_id, ticker_symbol, series, is_automated, vol, volatility){

		this.productID = p_id;
		this.tickerSymbol = ticker_symbol;
		this.priceQuote =[];
		this.isAutomated = is_automated;
		this.volume = vol;
		this.volatility = volatility;
		this.series = series;

		this.getID = function(){
			return this.productID;
		};

		this.getTickerSymbol = function(){
			return this.tickerSymbol;
		};

		this.getCurrentQuote = function(){
			var size = this.priceQuote.length;
			return this.priceQuote[size-1];
	
		};

	/*	this.getPrice = function(){
			return this.priceQuote;
		};*/

		this.updateCurrentQuote = function (openval, closeval, highval, lowval){
	
			this.priceQuote.push({ 
				open: openval,
				close: closeval ,
				high: highval,
				low: lowval
							
			});
		
			var dataset = chart.dataSets[this.series];

			if(isEmpty(dataset)){

				var current_time = new Date().getTime();
	
				var dataObject = {
						date: current_time,
						open: openval ,
						close: closeval,
						high: highval,
						low: lowval
				};
		
				candlestickChartData[this.series]= [];
				candlestickChartData[this.series].push(dataObject);
				var dataset =	{
						//color: "#000000",
						title: this.tickerSymbol,
						fieldMappings: [{
							fromField: "open",
							toField: "open"
						}, {
							fromField: "close",
							toField: "close"
						}, {
							fromField: "high",
							toField: "high"
						}, {
							fromField: "low",
							toField: "low"
						}/*, {
							fromField: "volume",
							toField: "volume"
						}, {
							fromField: "value",
							toField: "value"
		        		}*/	],

		        		color: "#7f8da9",
		        		dataProvider: candlestickChartData[this.series],
		        		categoryField: "date"
				};

				chart.dataSets.push(dataset);

				if(candlestickChartData[this.series].length > scenario_obj.getTimeWindowForQuotes()){
					candlestickChartData[this.series].shift();
				} 
				chart.validateNow();


			} else {
				
				if( chart.dataSets[this.series].title == "null"){
					chart.dataSets[this.series].title = this.tickerSymbol;
				}
			
				var current_time = new Date().getTime();
			
				var dataProvider = chart.dataSets[this.series].dataProvider; 
				var dataObject = {
			            date: current_time,
			            open: openval ,
			            close: closeval,
			            high: highval,
			            low: lowval
				};
				
				console.log("data"+dataProvider[0].open);
				if(dataProvider[0].open == 0){
					while(dataProvider.length > 0){
						dataProvider.pop();
					}
				}
				dataProvider.push(dataObject);
			
				for(var i = 0; i < dataProvider.length; ++i){
				/*	console.log("open "+dataProvider[i].open);
					console.log("close "+dataProvider[i].close);
					console.log("high "+dataProvider[i].high);
					console.log("low "+dataProvider[i].low);
					*/
					
				}
				
				if(dataProvider.length > scenario_obj.getTimeWindowForQuotes()){
					dataProvider.shift();
				}
			
				chart.validateData();
				//chart.panels[0].zoomToDates(chartData[this.series][(dataProvider.length+1- scenario_obj.getTimeWindowForQuotes())].date , chartData[this.series][dataProvider.length-1].date);
			}

		};

		this.toString = function(){
			return ' Product ID: '+ this.productID + ' Ticker Symbol: ' + this.tickerSymbol + ' pricearray: ' + this.priceQuote;
		};
	}

	function ProductEventData(event_timestamp, event_name, prod_name, event_desc){
		this.eventTimestamp = event_timestamp;
		this.eventName = event_name;
		this.productName = prod_name;
		this.eventDescription = event_desc;
		
	}
	
	function EventData(){
		
		if ( arguments.callee._singletonInstance ){
			return arguments.callee._singletonInstance;
		}
		arguments.callee._singletonInstance = this;
		
		this.EventsByProduct =[]; 
	
		this.addEvent = function(new_event){
			this.EventsByProduct.push(new_event);
		};
		
		this.getCurrentEvent = function(){
			return new ProductEventData();
		};
	}

	function AlgorithmStateDisplay(automation_state_list){
	
		this.listOfAutomationStates = automation_state_list;
	}

	function DisplayController(assets_list, data_by_products, automation_state_list){
	
		this.participantPortflio =  Portfolio(assets_list);
		this.marketData = MarketData(data_by_products);
		this.algoCurrentStateDisplay = AlgorithmStateDisplay(automation_state_list);

	}

	function Asset(p_id, ticker_symbol, is_automated){
	
		this.ProductID = p_id;
		this.tickerSymbol = ticker_symbol;
		this.isAutomated = is_automated;
		this.quantityHeld; 
		this.currentAssetValue;
	
	
		this.updateQuantityHeld = function(qty_held){
			this.quantityHeld = qty_held;
		};
	
		this.updateAssetCurrentValue = function(current_asset_val){
			this.currentAssetValue = current_asset_val;
		};
	
		this.is_Automated = function(){
			return this.isAutomated;
		};
	
		this.getTickerSymbol = function(){
			return this.tickerSymbol;
		};
	
		this.getQuantityHeld = function(){
			return this.quantityHeld;
		};
	
	}
	
	function AlgorithmState(state_id, desc){
	
		this.stateID = state_id;
		this.description = desc;
	}

	function AlgorithmControlRequest(p_id, state_id, desc, request_timestamp, sent_to_server, req_quantity){
	
		this.productID = p_id;
		this.requestedState = AlgorithmState(state_id, desc);
		this.requestTimeStamp = request_timestamp;
		this.sentToServer = sent_to_server;
		this.reqQuantity = req_quantity;
	
		this.setDestinationState = function(){
		
		};
		
	}

	function TradeOrder(p_id, is_buy, requested_price, requested_qty, request_timestamp,  sent_to_server){
	
		this.productID = p_id;
		this.isBuy = is_buy;
		this.requestedPrice = requested_price;
		this.requestedQuantity = requested_qty;
		this.requestTimeStamp = request_timestamp;
		this.sentToServer = sent_to_server;

	}

	function ActionController(algo_req_list, trader_order_req_list){
	
		if ( arguments.callee._singletonInstance ){
			return arguments.callee._singletonInstance;
		}
		
		arguments.callee._singletonInstance = this;
		
		this.algoRequestList = algo_req_list;
		this.traderOrderRequestlist = trader_order_req_list;
	
		this.sendAlgoRequestsToServer = function(){
		
		};
	
		this.sendTradeOrdersToServer = function(){
		
		};

	}
	
	