/* 575 boilerplate main.js */
window.onload = function(){

	var w = 900, h = 500;

	//get the <body> element from the DOM
	//d3.method
	var container = d3.select("body")
		// put a new svg in the body
		//each method goes on its own line
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		//give class name the same name as variable name
		.attr("class", "container");

	var rectangle =container.append("rect")
		.datum(400)
		//giving an anonymous function to apply datum
		.attr("width", function(d){
			return d * 2;
		})
		.attr("height", 400)
		.attr("class", "rectangle");

	console.log(container)

}

//selectAll(".squares")
	//.data()
	//.enter()


//D3 only takes an array