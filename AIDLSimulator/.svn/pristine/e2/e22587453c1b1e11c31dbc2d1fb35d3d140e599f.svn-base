window.onload = function () {

		// dataPoints
		var dataPoints1 = [];
		var dataPoints2 = [];
      	var dataPoints3 = [];

		var chart = new CanvasJS.Chart("chartContainer",{
			zoomEnabled: true,
			title: {
				text: "Stock Price Chart"		
			},
			toolTip: {
				shared: false	
				
			},
			/*legend: {
				verticalAlign: "top",
				horizontalAlign: "center",
                                fontSize: 14,
				fontWeight: "bold",
				fontFamily: "calibri",
				fontColor: "dimGrey"
			},*/
			axisX: {
				title: "Time"
			},
			axisY:{
              	title:'Price',
				prefix: '$',
				includeZero: false
			}, 
			data: [{ 
				// dataSeries1
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "MSFT",
				dataPoints: dataPoints1
			},
			{				
				// dataSeries2
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "RY" ,
				dataPoints: dataPoints2
			},
            {
              //dataSeries3
              type:"line",
              xValueType:"dateTime",
              showInLegend:true,
              name:"GM",
              dataPoints:dataPoints3
            }],
          legend:{
            cursor:"pointer",
            itemclick : function(e) {
            console.log("legend click: " + e.dataPointIndex); 
            console.log(e);
            if (typeof(e.dataSeries.visible) == "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
              chart.render();
            }
          }
		});

		var updateInterval = 7000;
		// initial value
		var yValue1 = 25; 
		var yValue2 = 35;
		var yValue3 = 20;
      
		var time = new Date;
		time.setHours(10);
		time.setMinutes(00);
		time.setSeconds(00);
		time.setMilliseconds(00);
      // starting at 10:00 am

		var updateChart = function (count) {
			count = count || 1;

			// count is number of times loop runs to generate random dataPoints. 

			for (var i = 0; i < count; i++) {
				
				// add interval duration to time				
				time.setTime(time.getTime()+ updateInterval);


				// generating random values
				var deltaY1 = .5 + Math.random() *(-.5-.5);
				var deltaY2 = .5 + Math.random() *(-.5-.5);
              	var deltaY3 = .5 + Math.random()*(-.5-.5);

				// adding random value and rounding it to two digits. 
				yValue1 = Math.round((yValue1 + deltaY1)*100)/100;
				yValue2 = Math.round((yValue2 + deltaY2)*100)/100;
              	yValue3 = Math.round((yValue3 + deltaY3)*100)/100;
              
				// pushing the new values
				dataPoints1.push({
					x: time.getTime(),
					y: yValue1
				});
				dataPoints2.push({
					x: time.getTime(),
					y: yValue2
				});
              dataPoints3.push({
                x:time.getTime(),
                y:yValue3
              });


			};

			// updating legend text with  updated with y Value 
			chart.options.data[0].legendText = " MSFT  $" + yValue1;
			chart.options.data[1].legendText = " RY  $" + yValue2; 
          	chart.options.data[2].legendText = " GM  $" + yValue3;

			chart.render();

		};

		// generates first set of dataPoints 
		updateChart(3000);	
		 
		// update chart after specified interval 
		setInterval(function(){updateChart()}, updateInterval);
	}