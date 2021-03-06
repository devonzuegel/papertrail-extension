var party_colors = ['#93b6e9', '#f94D3E' , 'yellow'];

var products = [
	{
		manufacturer: 'KitchenAid',
		logo: 'http://centennialvacuum.com/wp-content/uploads/2014/05/KitchenAid-Repair.jpg',
		price: 99,
		img: 'http://iweb.cooking.com/images/products/enlarge/218070e.jpg',
		party_contributions: [
			{
				// label: 'Democrat',
				party: 'Democrat',
				value: 20050
			}, {
				// label: 'Republican',
				party: 'Republican',
				value: 30209
			}, {
				// label: 'Other',
				party: 'Other',
				value: 6020
			}
		],
		pac_contributions: [
			{
				name: 'Oregon Against Job-Killing Taxes',
				amount: 150000
			}, {
				name: 'Republican Senate Cmte',
				amount: 138440
			}, {
				name: 'Yes on 49',
				amount: 109100
			}, {
				name: 'Yes on the Health Kids Plan',
				amount: 100200
			}
		],
		top_lobbying_issues: [
			{
				name: 'Copyright, Patent, & Trademark',
				amount: 150000
			}, {
				name: 'Labor, Antritrust, & Workplace',
				amount: 138440
			}, {
				name: 'Computers & Information Tech',
				amount: 109100
			}, {
				name: 'Consumer Product Safety',
				amount: 100200
			}
		]
	}, {
		manufacturer: 'Yonanas',
		logo: 'http://www.yonanas.com/wp-content/uploads/files/2012/07/YonanasTM_Logo_RGB-1024x236.jpg',
		price: 73.99,
		img: 'http://static.citrusstv.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/3/5/3557_453100_extralarge.jpg',
		party: 'Republican'
	}, {
		manufacturer: 'Cuisinart',
		logo: 'http://blog.mailvu.com/wp-content/uploads/2012/01/Cuisinart-Logo.jpg',
		price: 52.99,
		img: 'http://ecx.images-amazon.com/images/I/41FRS3FBY4L._SX300_.jpg',
		party: 'Democrat'
	}, {
		manufacturer: 'Yonanas',
		logo: 'http://www.yonanas.com/wp-content/uploads/files/2012/07/YonanasTM_Logo_RGB-1024x236.jpg',
		price: 52.99,
		img: 'http://ecx.images-amazon.com/images/I/41MQTSBXpLL._SY300_.jpg',
		party: 'Republican'
	}
];

function pie_chart(div, data, dimensions, colors) {

	var w = dimensions.w,
			h = dimensions.h,
			r = dimensions.r;

	var vis = d3.select(div)
	    .append("svg:svg")              //create the SVG element inside the <body>
	    .data([data])                   //associate our data with the document
	        .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
	        .attr("height", h)
	    .append("svg:g")                //make a group to hold our pie chart
	        .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

	var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
	    .outerRadius(r);

	var pie = d3.layout.pie()           //this will create arc data for us given a list of values
	    .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

	var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
	    .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
	    .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
	        .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
	            .attr("class", "slice");    //allow us to style things in the slices (like text)

	    arcs.append("svg:path")
	            .attr("fill", function(d, i) { return colors(i); } ) //set the color for each slice to be chosen from the color function defined above
	            .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

	    arcs.append("svg:text")                                     //add a label to each slice
	            .attr("transform", function(d) {                    //set the label's origin to the center of the arc
	            //we have to make sure to set these before calling arc.centroid
	            d.innerRadius = 0;
	            d.outerRadius = r;
	            return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
	        })
	        .attr("text-anchor", "middle")                          //center the text on it's origin
	        .text(function(d, i) { return data[i].label; });        //get the label from our original data array
};


function logo(product) {
	var $header = $('<div>');
	var $manufacturer = $('h3', { text: 'Manufacturer: ' + product.manufacturer})
	var $logo = $('<img>', { 
		src: product.logo,
		width: '100%'
	});

	$('#logo-papertrail').html($logo);
}

function piechart_with_legend(product, title) {
	var party_contributions = product.party_contributions;

	/**** Add title ****/
	$('.mainMenu').append($('<h1>', { 'text': title }));

	/**** Add legend ****/
	
	var $legend = $('<div>', {
		'id': 'legend',
		'width': '50%'
	});

	$('.mainMenu').append($legend);

	for (var i = 0; i < party_contributions.length; i++) {
		var contribution = party_contributions[i];

		var color = 'yellow';
		if (contribution.party === 'Democrat')		color = party_colors[0];
		if (contribution.party === 'Republican')	color = party_colors[1];

		var $block = $('<div>', {
			class: 'legend_block'
		});

		var $square = $('<div>', { class: 'square' }).css('background-color', color);

		$block.append($square);
		$block.append('<p>'+contribution.party+'</p>');

		$legend.append($block);
	};


	/**** Add pie chart ****/

	var $graph_div = $('<div>', {
		'id': 'graph',
		'width': '50%'
	}).css('float', 'right');

	$('.mainMenu').append($graph_div);

	pie_chart('#graph', party_contributions, {
		w: 110, h: 110, r: 55
	}, d3.scale.ordinal().range(party_colors));
}

function list(main_product, title, key, div_id) {
	$(div_id).before('<h1>'+title+'</h1>');
	var contributions = main_product[key];
	for (var i = 0; i < contributions.length; i++) {
		var contribution = contributions[i];
		$(div_id+' > tbody:last').append('<tr><td>' + (i+1) + '</td><td>' + contribution.name + '</td><td>$' + contribution.amount + '</td></tr>');
	};
}

var main_product = products[0];

list(main_product, 'Top PAC Contributions', 'pac_contributions', '#pac_contributions');

logo(main_product);
piechart_with_legend(main_product, 'Party Breakdown');

list(main_product, 'Top Lobbying Issues', 'top_lobbying_issues', '#top_lobbying_issues');


var source = document.getElementById('test-template').innerHTML;
var template = Handlebars.compile(source);
var context = { testvar: 'xxx' };
var output = template(context);
document.getElementById('testoutput').innerHTML = output;

alert('salkdfj');