var products = [
	{
		manufacturer: 'KitchenAid',
		logo: 'http://centennialvacuum.com/wp-content/uploads/2014/05/KitchenAid-Repair.jpg',
		price: 99,
		img: 'http://iweb.cooking.com/images/products/enlarge/218070e.jpg',
		party_contributions: [
			{
				label: 'Democrat',
				value: 20050
			}, {
				label: 'Republican',
				value: 30209
			}, {
				label: 'Other',
				value: 6020
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


var data = [
	{ "label": "one", "value": 20 },
	{ "label": "two", "value": 50 }, 
	{ "label": "three", "value": 30 }
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



var main_product = products[0];


var $logo = $("<img>", { 
	src: main_product.logo,
	width: '100%'
});

$('#logo').html($logo);


var party_contributions = main_product.party_contributions;

pie_chart('#graph', party_contributions, {
	w: 300, h: 300, r: 100
}, d3.scale.ordinal().range(["#93b6e9", "#f94D3E" , "yellow"]));


