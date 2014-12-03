// var CompanyProfile = {
// 	render: function() {
// 		alert('asdlfkj');
// 		$('#target').html(Mustache.render($('#company-template', {
// 			name: 'COMPANY NAME'
// 		});
// 	}
// };

// CompanyProfile.render();

// d3.selectAll("body").style("background-color", "red");

// var sampleSVG = d3.select("#viz")
//     .append("svg")
//     .attr("width", 100)
//     .attr("height", 100);   




// Get the context of the canvas element we want to select
var ctx = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(ctx).PolarArea(data);

new Chart(ctx).PolarArea(data, options);

var myDoughnutChart = new Chart(ctx[1]).Doughnut(data,options);