	
	var candlestickChartData=[[]], chart;

	
	function createCashInvestmentChart(cash, investment){
		cash_inv_chart = AmCharts.makeChart("cash_investment_piechart", {
		    type: "pie",	
		    pathToImages: "css/amchart_images/",
			theme: "none",
		    legend: {
		        markerType: "circle",
		        position: "right",
				marginRight: 80,		
				autoMargins: false,
				spacing: 20,
				valueWidth: 70
		    },
		    dataProvider: [{
		        type: "Cash",
		        value: cash
		    }, {
		        type: "Investment",
		        value: investment
		    }],
		    valueField: "value",
		    titleField: "type",
		    balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
	    	labelsEnabled: true,
	    	//pullOutRadius: 0,
	    	autoMargins: false,
	    	marginTop: 0,
	    	marginBottom: 0,
	    	marginLeft: 0,
	    	marginRight: 0
		});
	}
	
	function updateCashInvestmentChart(cash, investment){
		var cashinv_data = cash_inv_chart.dataProvider;
		while(cashinv_data.length >0){
			cashinv_data.pop();
		}
		
		cashinv_data.push({
	        type: "Cash",
	        value: cash
	    });
		cashinv_data.push({
	        type: "Investment",
	        value: investment
	    });
		
		
		cash_inv_chart.validateData();
	}
	
	function createAssetAllocationChart(product_list, investment_list){
		
		var assetchart_data =[];
		for(var i=0; i< product_list.length; ++i){
			assetchart_data.push({
				product: product_list[i],
				value: investment_list[i]
			});
		}
		asset_allocation_chart = AmCharts.makeChart("asset_allocation_piechart", {
		    type: "pie",	
		    pathToImages: "css/amchart_images/",
			theme: "none",
		    legend: {
		        markerType: "circle",
		        position: "right",
				marginRight: 80,		
				autoMargins: true,
				spacing: 20,
				switchable: false,
				valueWidth: 58
				
		    },
		    dataProvider: assetchart_data,
		    valueField: "value",
		    titleField: "product",
		    balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",	    
	    	labelsEnabled: true,
	    	labelRadius: 5,
	    	pullOutRadius: 0,
	    	autoMargins: false,
	    	marginTop: 0,
	    	marginBottom: 0,
	    	marginLeft: 0,
	    	marginRight: 0
		});
	}
	
	function updateAssetAllocationChart(product_list, investment_list){
		var assetdata = asset_allocation_chart.dataProvider;
		while(assetdata.length >0){
			assetdata.pop();
		}
		for(var i=0; i< product_list.length; ++i){
			assetdata.push({
				product: product_list[i],
				value: investment_list[i]
			});
		}
		
		asset_allocation_chart.validateData();
	}
	
	function browserCheck(){  //not used
		var isChromium = window.chrome,                  //Using feature detection to detect browser
	    vendorName = window.navigator.vendor;
	    var isFirefox = typeof InstallTrigger !== 'undefined'; 
	    
		if(isChromium !== null && vendorName === "Google Inc.") {
			$("#algo_monitor").css({"margin": "12px 10px 12px 10px", "font-size":"15px"});
		} else if(isFirefox){
		//	$("#algo_monitor").css({"margin": "10px 10px 10px 7px","position": "relative", "left": "4px"});
			$("#algo_monitor").css({"margin-left": "auto", "margin-right":"auto", "margin-top": "5px", "border-collapse":"separate", "width": "95%","font-size":"15px", "text-align":"center"});
		}
	}
	
	function generateInitialMarketData(scenario_object) {
		var firstDate = new Date();
		firstDate.setHours(0, 0, 0, 0);
		firstDate.setDate(firstDate.getDate() - 35);
		console.log("day "+ firstDate.getDate());
		console.log("month "+ firstDate.getMonth());
		console.log("year "+ firstDate.getFullYear());
		for (var i = 0; i < scenario_object.getTimeWindowForQuotes(); i++) {
			var newDate = new Date(firstDate);
			newDate.setSeconds(newDate.getSeconds() + 4*i);

			candlestickChartData[0].push({
				date: newDate.getTime(),
				open: 0,
				close: 0,
				high: 0,
				low: 0,
			});
			//	var volume = Math.round(Math.random() * (1000 + i)) + 100 + i;

			//var value = Math.round(Math.random() * (30) + 100);

			/*chartData[i] = ({
				date: newDate,
				open: open,
				close: close,
				high: high,
				low: low,
				/*volume: volume,
				value: value*/
			//});
		
		}
	}
	
	function isEmpty(obj) {
		for(var prop in obj) {
           if(obj.hasOwnProperty(prop))
               return false;
		}

       return true;
	}
	
	function parseJson(code) {
        try {
            return JSON.parse(code);
        } catch (e) {
            return code;
        }
    }
	 
	//Create account Balance Chart
	function createAccountBalanceChart(account_balance){
		max_account_balance_reached = account_balance; 
		var current_time = new Date();
		account_data = [];
		account_data.push({"date": current_time, "account_bal": account_balance});

		account_plot = AmCharts.makeChart("account_balance_chart", {
			type: "stock",
			theme: "none",
			glueToTheEnd: false,
			pathToImages: "css/amchart_images/",
			dataSets: [{
				dataProvider: account_data,
				fieldMappings: [{
					fromField: "account_bal",
					toField: "account_bal"
				}],
				title: "Account balance",
				categoryField: "date"
	    	
			}],

			panels: [{
				title: "Value",
				showCategoryAxis: true,
				percentHeight: 70,
				valueAxes: [{
					dashLength: 5,
					gridColor:"#FFFFFF",
					gridAlpha: 0,
					minimum: 0,
					axisAlpha: 1,
					tickLength: 2
				}],

				categoryAxis: {
					dashLength: 5,
					gridPosition: "start",
					gridAlpha: 0,
					labelsEnabled: false,
		       
				},

				stockGraphs: [{
					type: "column",
					id: "g2",
					color: "#7F2BA1",
					valueField: "account_bal",
					fillColors: ["#7F2BA1"],
					fillAlphas: 0.8,
					lineAlpha: 0.2,
					useDataSetColors: false,
					showBalloon: true,
					balloonText: "<b>$[[account_bal]]</b>",
					columnWidth : 0.2,
					gridAboveGraphs: false,
					pointPosition: "start",
					startOnAxis: false,
					legendColor: "#7F2BA1",
					stackable: false,
					lineColor:"#7F2BA1"
				}],
			
				stockLegend: [{
					position:"right",
					textClickEnabled: false
				}],
			
				chartCursor: {
					enabled: false,
					//	categoryBalloonEnabled: false,
					cursorAlpha: 0,
					//	zoomable: false,*/
				
				},
			}],
	
			PanelsSettings: [{
				startDuration: 3,
				columnSpacing: 0
			}],
 
			chartCursorSettings: {
				valueBalloonEnabled: false
			}, 
		
			chartScrollbarSettings: {
				position : "bottom",
				graph: "g2",
				graphType: "line",
				height: 20
			},	
	    
			valueAxesSettings: {
				axisAlpha: 1,
				tickLength: 2,
				/*axisThickness: 5*/
			},
	    
			categoryAxesSettings:{
				axisAlpha: 1,
				/*axisThickness: 5,*/
				tickLength: 2,
				minPeriod: "ss",
				equalSpacing: true
			}
		});
	
		account_plot.panels[0].removeChartCursor();

	}
	
	//create candlestick chart for market data
	function createCandlestickChart(scenario_object){
		
		//AmCharts.ready(function(){
			generateInitialMarketData(scenario_object);
	   		chart = AmCharts.makeChart("candlestick_chart", {
				type: "stock",
			    theme: "none",
			    pathToImages: "css/amchart_images/",
			    glueToTheEnd: true, 
			    
			    categoryAxesSettings: {
					minPeriod: "ss",
					equalSpacing: true,			
				},
				
				dataSets: [{
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
					}*/],

					color: "#7f8da9",
					dataProvider: candlestickChartData[0],
					title: "null",
					categoryField: "date"
				}/*, {
					fieldMappings: [{
						fromField: "value",
						toField: "value"
					}],
					color: "#fac314",
					dataProvider: chartData,
					compared: true,
					title: "East Stock",
					categoryField: "date"
				}*/],


				panels: [{
						title: "Value",
						showCategoryAxis: true,
						percentHeight: 70,
						valueAxes: [{
							dashLength: 5
						}],

						categoryAxis: {
							dashLength: 5
						},

						stockGraphs: [{
							type: "candlestick",
							id: "g1",
							openField: "open",
							closeField: "close",
							highField: "high",
							lowField: "low",
							valueField: "close",
							lineColor: "#7f8da9",
							fillColors: "#7f8da9",
							negativeLineColor: "#db4c3c",
							negativeFillColors: "#db4c3c",
							fillAlphas: 1,
							useDataSetColors: false,
							//comparable: true,
							compareField: "value",
							showBalloon: true,
							balloonText: "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
						}],

						stockLegend: {
							valueTextRegular: "Close: [[close]]",
						//	periodValueTextComparing: "[[percents.value.close]]%"
						}
					}/*,

					{
						title: "Volume",
						percentHeight: 30,
						marginTop: 1,
						showCategoryAxis: true,
						valueAxes: [{

							dashLength: 5
						}],

						categoryAxis: {
							dashLength: 5
						},

						stockGraphs: [{
							valueField: "volume",
							type: "column",
							showBalloon: false,
							fillAlphas: 1
						}],

						stockLegend: {
							markerType: "none",
							markerSize: 0,
							labelText: "",
							periodValueTextRegular: "[[value.close]]"
						}
					}*/
				],

				chartScrollbarSettings: {

					graph: "g1",
					graphType: "line",
					usePeriod: "mm"/*"10mm"*/
				},

				periodSelector: {
					position: "bottom",
					periods: [{
						period: "DD",
						count: 10,
						label: "10 days"
					}, {
						period: "MM",
						//selected: true,
						count: 1,
						label: "1 month"
					}, {
						period: "YYYY",
						count: 1,
						label: "1 year"
					}, {
						period: "YTD",
						label: "YTD"
					}, {
						period: "MAX",
						label: "MAX"
					}]
				}
			});

		//});        
	   
	}
		
	

	//create Quantity chart based on initial scenario variables
	function createQuantityChart(manual_prod_list, manual_qty_list, auto_prod_list, auto_qty_list){

		console.log("create1");
		var num_automated = scenario_obj.getNumOfAutomatedProducts();
		var num_manual = scenario_obj.getNumOfProducts() - num_automated;
		var data_manual = [], data_auto = [];
		for ( var i = 0; i < num_manual; ++i){
			data_manual.push([manual_qty_list[i], manual_prod_list[i]]);  //[[[56,'NOK'], [546,'BBRY'], [565,'YHOO'], [565, 'TRLA']],[[45,'AXP'],[ 534, 'MRK'],[ 54, 'CAT'], [45, 'MSFT']]];
		}
		
		for ( var i = 0; i < num_automated; ++i){
			data_auto.push([auto_qty_list[i], auto_prod_list[i]]);  //[[[56,'NOK'], [546,'BBRY'], [565,'YHOO'], [565, 'TRLA']],[[45,'AXP'],[ 534, 'MRK'],[ 54, 'CAT'], [45, 'MSFT']]];
		}
		
		plot1 = $.jqplot('qty_chart', [data_auto, data_manual], {
	        
				title: 'Quantity Held',
				animate: true,
				// The "seriesDefaults" option is an options object that will
				// be applied to all series in the chart.
				seriesDefaults:{
					renderer:$.jqplot.BarRenderer,
					rendererOptions: {
	            	fillToZero: true,
	            	barDirection: 'horizontal',
	            	barWidth: 7,
	            	//varyBarColor: true,
	                 },
	                seriesColors:['#66FFFF','#0000FF'],
	            
	                pointLabels: { show: true, location: 'e', edgeTolerance: -20, formatString: '%d'},
	            },
	            
	            axesDefaults: {
	                tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
	                tickOptions: {
	                  angle: -90,
	                  fontSize: '10pt'
	                }
	            },
	            // Custom labels for the series are specified with the "label"
	            // option on the series option.  Here a series option object
	            // is specified for each series.
	            series:[
	              
            	   {label: 'Automatic Setting', color: '#0000FF'},
            	   {label:'Manual Setting', color: '#66FFFF'}, 

	             ],
	             
	             grid: {
	            	 drawGridlines: false
	             },
	           // Show the legend and put it outside the grid, but inside the
	           // plot container, shrinking the grid to accomodate the legend.
	           // A value of "outside" would not shrink the grid and allow
	           // the legend to overflow the container.
	          /*  legend: {
	                show: true,
	                placement: 'outsideGrid'
	          
	            },*/
	            axes: {
	               // Use a category axis on the y axis and use our custom ticks.
	            	yaxis: {
	            		renderer: $.jqplot.CategoryAxisRenderer,
	            		rendererOptions: {/* forceTickAt0: true*/}
	               // ticks: ticks
	            	},
	            	// Pad the x axis just a little so bars can get close to, but
	            	// not touch, the grid boundaries.  1.2 is the default padding.
	            	xaxis: {
	            		pad: 1.05,
	            		tickOptions: {
	            			formatString: '%d',
            			},
	            		
            			label: 'Quantity',
            			min: 0
	            	}
	            }
			});
	 
	}
		
	//create Investment chart based on initial scenario variables
	function createInvestmentChart(manual_prod_list, manual_asset_val_list, auto_prod_list, auto_asset_val_list){
	
		var num_automated = scenario_obj.getNumOfAutomatedProducts();
		var num_manual = scenario_obj.getNumOfProducts() - num_automated;
		var data_manual = [], data_auto = [];
		for ( var i = 0; i < num_manual; ++i){
			data_manual.push([manual_asset_val_list[i], manual_prod_list[i]]);  //[[[56,'NOK'], [546,'BBRY'], [565,'YHOO'], [565, 'TRLA']],[[45,'AXP'],[ 534, 'MRK'],[ 54, 'CAT'], [45, 'MSFT']]];
		}
		
		for ( var i = 0; i < num_automated; ++i){
			data_auto.push([auto_asset_val_list[i], auto_prod_list[i]]);  //[[[56,'NOK'], [546,'BBRY'], [565,'YHOO'], [565, 'TRLA']],[[45,'AXP'],[ 534, 'MRK'],[ 54, 'CAT'], [45, 'MSFT']]];
		}
		
		console.log("create2");
		plot2 = $.jqplot('inv_chart', [data_auto, data_manual], {
										
				title: 'Investment  Value By Product',
				// The "seriesDefaults" option is an options object that will
				// be applied to all series in the chart.
				animate: true,
				seriesDefaults:{
					renderer:$.jqplot.BarRenderer,
					rendererOptions: {
						fillToZero: true,
						barDirection: 'horizontal',
						barWidth: 7,
						//varyBarColor: true,
					},
					seriesColors:['#66FFFF', '#0000FF'],//, '#66FFFF','#66FFFF','0000FF', '0000FF','0000FF', '0000FF'],
	            
					pointLabels: { show: true, location: 'e', edgeTolerance: -25, formatString: '%.2f'},
				},
				
				axesDefaults: {
			        tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
			        tickOptions: {
			        	angle: -90,
			        	fontSize: '10pt'
			        }
			    },
				// Custom labels for the series are specified with the "label"
				// option on the series option.  Here a series option object
				// is specified for each series.
				series:[     
				        {label: 'Automatic Setting', color: '#0000FF'},
				        {label:'Manual Setting',color: '#66FFFF'},
		        ],
		        
	        	grid: {
	            	 drawGridlines: false
	        	},
		        // Show the legend and put it outside the grid, but inside the
		        // plot container, shrinking the grid to accomodate the legend.
		        // A value of "outside" would not shrink the grid and allow
		        // the legend to overflow the container.
		        legend: {
		        	show: true,
		        	placement: 'outsideGrid'
	          
		        },
		        axes: {
		        	// Use a category axis on the y axis and use our custom ticks.
		        	yaxis: {
		        		renderer: $.jqplot.CategoryAxisRenderer,
		        		// ticks: ticks
		        	},
		        	// Pad the x axis just a little so bars can get close to, but
		        	// not touch, the grid boundaries.  1.2 is the default padding.
		        	xaxis: {
		        		pad: 1.05,
		        		tickOptions: {
	        				formatString: '%d',
           				},
           				label: 'CAD',
           				min: 0
		        	}
		        }
			});
			
			var legend = $("#inv_chart table.jqplot-table-legend").find("tbody");
			legend.children().each(function(i, tr){
									legend.prepend(tr);
												});
	}
	 
	//update Quantity chart with new quantity data
	function update_QtyChart(_manual_quantity_list, _auto_quantity_list){
	
		if(plot1){
			plot1.destroy();
		
		}
	
		while(plot1.data[0].length > 0) {
			plot1.data[0].pop();
		}
		
		while(plot1.data[1].length > 0) {
			plot1.data[1].pop();
		}
	
		var num_automated = scenario_obj.getNumOfAutomatedProducts();
		var num_manual = scenario_obj.getNumOfProducts() - num_automated;
		
		for ( var i = 0; i < num_automated; ++i){
			plot1.data[0].push([_auto_quantity_list[i], auto_product_list[i]]);  //[[[56,'NOK'], [546,'BBRY'], [565,'YHOO'], [565, 'TRLA']],[[45,'AXP'],[ 534, 'MRK'],[ 54, 'CAT'], [45, 'MSFT']]];
		}
		
		for ( var i = 0; i < num_manual; ++i){
			plot1.data[1].push([_manual_quantity_list[i], manual_product_list[i]]);  //[[[56,'NOK'], [546,'BBRY'], [565,'YHOO'], [565, 'TRLA']],[[45,'AXP'],[ 534, 'MRK'],[ 54, 'CAT'], [45, 'MSFT']]];
		}
		
		var optionsobj = {
				title: 'Quantity Held',

				seriesDefaults:{
					renderer:$.jqplot.BarRenderer,
					rendererOptions: {
						fillToZero: true,
						barDirection: 'horizontal',
						barWidth: 7,
	                 },
	                seriesColors:['#66FFFF','#0000FF'],
	            
	                pointLabels: { show: true, location: 'e', edgeTolerance: -20, formatString: '%d'},
	            },
	            
	            axesDefaults: {
	                tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
	                tickOptions: {
	                  angle: -90,
	                  fontSize: '10pt'
	                }
	            },
	            // Custom labels for the series are specified with the "label"
	            // option on the series option.  Here a series option object
	            // is specified for each series.
	            series:[          
                    {label: 'Automatic Setting', color: '#0000FF'},
                    {label:'Manual Setting', color: '#66FFFF'}, 
	             ],
	             
	             grid: {
	            	 drawGridlines: false
	             },

	            axes: {
	               // Use a category axis on the y axis and use our custom ticks.
	            	yaxis: {
	            		renderer: $.jqplot.CategoryAxisRenderer,
	            		rendererOptions: {/* forceTickAt0: true*/}
	
	            	},
	            	// Pad the x axis just a little so bars can get close to, but
	            	// not touch, the grid boundaries.  1.2 is the default padding.
	            	xaxis: {
	            		pad: 1.05,
	            		tickOptions: {
	            			formatString: '%d',
            			},
	            		
            			label: 'Quantity',
            			min: 0
	            	}
	            }
		};
		
		plot1.replot(optionsobj);
	}
	
	//update Investment chart with new investment data
	function update_InvChart(_manual_asset_val_list, _auto_asset_val_list){
		
		if(plot2){
			plot2.destroy();
			
		}
		
		while(plot2.data[0].length > 0) {
			plot2.data[0].pop();
		}
		
		while(plot2.data[1].length > 0) {
			plot2.data[1].pop();
		}
		
		var num_automated = scenario_obj.getNumOfAutomatedProducts();
		var num_manual = scenario_obj.getNumOfProducts() - num_automated;
		
		for ( var i = 0; i < num_automated; ++i){
			plot2.data[0].push([_auto_asset_val_list[i], auto_product_list[i]]);  
		}
		
		for ( var i = 0; i < num_manual; ++i){
			plot2.data[1].push([_manual_asset_val_list[i], manual_product_list[i]]);  
		}
		
		
		var options_object = {
					
				title: 'Investment  Value By Product',
				// The "seriesDefaults" option is an options object that will
				// be applied to all series in the chart.
				seriesDefaults:{
					renderer:$.jqplot.BarRenderer,
					rendererOptions: {
						fillToZero: true,
						barDirection: 'horizontal',
						barWidth: 7,
						//varyBarColor: true,
					},
					seriesColors:['#66FFFF', '#0000FF'],
	            
					pointLabels: { 
						show: true, 
						location: 'e', 
						edgeTolerance: -25, 
						formatString: '%.2f'
					},
				},
				
				axesDefaults: {
			        tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
			        tickOptions: {
			          angle: -90,
			          fontSize: '10pt'
			        }
			    },
				// Custom labels for the series are specified with the "label"
				// option on the series option.  Here a series option object
				// is specified for each series.
				series:[		     
				        {label: 'Automatic Setting', color: '#0000FF'},
				        {label:'Manual Setting', color: '#66FFFF'},
		        ],
		        
	        	grid: {
	            	 drawGridlines: false
	        	},
		        // Show the legend and put it outside the grid, but inside the
		        // plot container, shrinking the grid to accomodate the legend.
		        // A value of "outside" would not shrink the grid and allow
		        // the legend to overflow the container.
		        legend: {
		        	show: true,
		        	placement: 'outsideGrid'
	          
		        },
		        axes: {
		        	// Use a category axis on the y axis and use our custom ticks.
		        	yaxis: {
		        		renderer: $.jqplot.CategoryAxisRenderer,
		        		// ticks: ticks
		        	},
		        	// Pad the x axis just a little so bars can get close to, but
		        	// not touch, the grid boundaries.  1.2 is the default padding.
		        	xaxis: {
		        		pad: 1.05,
		        		tickOptions: {
	        				formatString: '%d',
           				},
		        		
           				label: 'CAD',
           				min: 0
		        	}
		        }
		};
		plot2.replot(options_object);
			
		var legend = $("#inv_chart table.jqplot-table-legend").find("tbody");
		legend.children().each(function(i, tr){
									legend.prepend(tr);
								
		});
		
	}
	
	$(document).ready(function(){
	
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
	
	function manualOrderValidate(){
		
		//trim all whitespaces from input
		$("#price_input_manual").val($("#price_input_manual").val().replace(/\s+/g,''));
		$("#quantitym_spinner").val($("#quantitym_spinner").val().replace(/\s+/g, ''));
		
		var digit_patt = new RegExp("^\\d+$");
	//	console.log($("#man_select").val());
	//	console.log($("#quantitym_spinner").val());
	//	console.log(($("#price_input_manual").val() == "") || isNaN($("#price_input_manual").val()));
	//	console.log($("#price_input_manual").val() <= 0);
	//	console.log( !(  digit_patt.test($("#quantitym_spinner").val()) && $("#quantitym_spinner").val() != 0));
		if(isNaN($("#price_input_manual").val()) || ($("#price_input_manual").val() <= 0)
				|| !(  digit_patt.test($("#quantitym_spinner").val()) && $("#quantitym_spinner").val() != 0) ){
			$("#feedback_panel_manual .content").append("<p>Invalid input. Order could not be submitted.</p>");
			return false;
		} 
	
		return true;
	}

	function algoRequestValidate(){
	
		//trim all whitespaces from input
		$("#entry_spinner").val($("#entry_spinner").val().replace(/\s+/g,''));
		$("#exit_spinner").val($("#exit_spinner").val().replace(/\s+/g,''));
		$("#iterations").val($("#iterations").val().replace(/\s+/g,''));
		$("#quantitya_spinner").val($("#quantitya_spinner").val().replace(/\s+/g,''));
		
		var digit_patt = new RegExp("^\\d+$");
		if(isNaN($("#entry_spinner").val()) || ($("#entry_spinner").val() < 0) 
				|| isNaN($("#exit_spinner").val()) || ($("#exit_spinner").val() < 0) || !(digit_patt.test($("#iterations").val()) && $("#iterations").val() > 0) || !(digit_patt.test($("#quantitya_spinner").val()) && $("#quantitya_spinner").val() != 0)){
			$("#feedback_panel_algocontrol .content").append("<p>Invalid input. Request could not be submitted.</p>");
			return false;
		}
		
		return true;
	}
	


