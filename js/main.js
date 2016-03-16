/* 575 boilerplate main.js */
window.onload = function(){

	var w = 1000, h =550;

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
		.datum(450)
		//giving an anonymous function to apply datum
		.attr("width", function(d){
			return d * 2;
		})
		.attr("height", function(d){
			return d;
		})
		.attr("class", "rectangle")
		.attr("x", 50)
		.attr("y", 50);

	console.log(rectangle)

// 	var dataArray = [10, 20, 30, 40, 50];
// 	
// 	var circles = container.selectAll(".circles")
// 		.data(dataArray)
// 		.enter() 	//mysterious, think of it as a loop
// 		.append("circle")
// 		.attr("class", "circles")
// 		.attr("r", function(d, i) {
// 			console.log("d:", d, "i:", i);
// 			return d;
// 		})
// 		.attr("cx", function(d, i){
// 			return 70 + (i * 180);
// 		})
// 		.attr("cy", function(d){
// 			return 450 - (d * 5);
// 		});
		
	var cityPop = [
        {
            city: 'Portland',
            population: 609456
        },
        { 
            city: 'San Francisco',
            population: 837442
        },
        {
            city: 'Eugene',
            population: 159190
        },
        {
            city: 'Oakland',
            population: 406253
        },
    ];

	var minPop = d3.min(cityPop, function(d){
		return d.population;
	});
	
	var maxPop = d3.max(cityPop, function(d){
		return d.population;
	});
	
	var y = d3.scale.linear()
		.range([440, 95])
		.domain([0, 900000]);

	var x = d3.scale.linear() //a generator, a custom function that will place data along particular range
		.range([90,810])
		.domain([0, 3]);
		
	var color = d3.scale.linear()
		.range(["#FFF", "#542d44"])
		.domain([minPop, maxPop]);
		
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		
	var axis = container.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(50,0)")
		.call(yAxis);
		
	var title = container.append("text")
		.attr("class", "title")
		.attr("text-anchor", "middle")
		.attr("x", 450)
		.attr("y", 30)
		.text("West Coast City Populations");
		
	var labels = container.selectAll(".labels")
		.data(cityPop)
		.enter()
		.append("text")
		.attr("class", "labels")
		.attr("text-anchor", "left")
		.attr("x", function(d,i){
			return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
		})
		.attr("y", function(d){
			return y(d.population) + 5;
		})

	var nameLine = labels.append("tspan")
		.attr("class", "nameLine")
		.attr("x", function(d, i){
			//position labels to the right of the circles
			return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
		})
		.text(function(d){
			return d. city;
		});
		
	var format = d3.format(",");
	
	var popLine = labels.append("tspan")
		.attr("class", "popLine")
		.attr("x", function(d, i){
			//position labels to the right of the circles
			return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
		})
		.attr("dy", "15") //vertical offset
		.text(function(d){
			return "Pop. " + format(d.population);
		});
		
    //Example 2.6 line 3
    var circles = container.selectAll(".circles") //create an empty selection
        .data(cityPop) //here we feed in an array
        .enter() //one of the great mysteries of the universe
        .append("circle") //inspect the HTML--holy crap, there's some circles there
        .attr("class", "circles")
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use the index to place each circle horizontally
            return x(i);
        })
        .attr("cy", function(d){
            return y(d.population);
        })
        .style("fill", function(d, i){
        	return color(d.population);
        })
        .style("stroke", "gray");
}



//selectAll(".squares")
	//.data()
	//.enter()


//D3 only takes an array