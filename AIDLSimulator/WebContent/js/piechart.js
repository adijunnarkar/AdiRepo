//pie chart data 
var portfolioData = [
	{
		value:150, 
		color:"#878BB6"
	}, 
	{
		value:350,
		color:"#4ACAB4"
	},
	{
		value:75,
		color:"#FF8153"
	},
	{
		value:425,
		color:"#FFEA88"
	}
];

//piechart options
var pieOptions = {
	segmentShowStroke:true, 
	animateScale:true
};
//get pie chart canvas 
var portfolioChartData = document.getElementById("portfolioChart").getContext("2d");
//draw pie chart
new Chart(portfolioChartData).Pie(portfolioData,pieOptions);