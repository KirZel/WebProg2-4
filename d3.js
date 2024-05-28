const width = 300;
const height = 300;
let svg = d3.select("#animationContainer")
 .attr("width", width)
 .attr("height", height) ;

 function drawRedDot() {
	let dot = svg.append("g")
		.style("stroke", "green")
		.style("stroke-width", 4)
		.style("fill", "brown");
	dot.append("line")
		 .attr("x1", 14)
		 .attr("y1", 14)
		 .attr("x2", -14)
		 .attr("y2", -14)
		 .style("stroke", "red")
		 .style("stroke-width", "2");
	
	dot.append("line")
		 .attr("x1", 14)
		 .attr("y1", -14)
		 .attr("x2", -14)
		 .attr("y2", 14)
		 .style("stroke", "red")
		 .style("stroke-width", "2");

	dot.append("circle")
		 .attr("cx", 14)
		 .attr("cy", 14)
		 .attr("r", 3)
		 .style("fill", "red")
		 .style("stroke", "red")
		 .style("stroke-width", "2");
	dot.append("circle")
		 .attr("cx", -14)
		 .attr("cy", -14)
		 .attr("r", 3)
		 .style("fill", "red")
		 .style("stroke", "red")
		 .style("stroke-width", "2");
	dot.append("circle")
		 .attr("cx", -14)
		 .attr("cy", 14)
		 .attr("r", 3)
		 .style("fill", "red")
		 .style("stroke", "red")
		 .style("stroke-width", "2");
	dot.append("circle")
		 .attr("cx", 14)
		 .attr("cy", -14)
		 .attr("r", 3)
		 .style("fill", "red")
		 .style("stroke", "red")
		 .style("stroke-width", "2");

    dot.append("circle")
  		.attr("cx", 0)
  		.attr("cy", 0)
  		.attr("r", 10)
 	  	.style("fill", "brown");
	dot.append("polygon")
 		.attr("points", "-4,-4 5,0 -4,4")
 		.style("fill", "white")
 		.style("stroke", "white")
 		.style("stroke-width", "2");

	let arc = d3.arc()
		 .innerRadius(10)
		 .outerRadius(10);

	dot.append("path")
		 .attr("d", arc({startAngle: Math.PI /2, endAngle: Math.PI/2 * 3}))
		 .style("stroke", "white");	

	return dot;
   }

function preparePath() {
	let points = [];
	for (let posX = 10; posX <= 295; posX++) {
		const posY = Math.abs(Math.sin(posX/26));
		points.push({x: posX, y: posY*150+70});
	}
	return points;
}

function rotationEffect(dot) {
	dot.transition()
		.duration(4500)
		.attrTween("transform", function() {
			return d3.interpolateString("rotate(0)", "rotate(360)");
		});
  }

function drawLine(speed, effect){
	// создаем массив точек пути в зависимости от параметра
	const dataPoints = preparePath();
	const line = d3.line()
	.x((d) => d.x)
	.y((d) => d.y);
	// создаем путь на основе массива точек
	const path = svg.append('path')
		.attr('d', line(dataPoints))
		.attr('stroke', 'blue')
		.attr('fill', 'none')
		.attr("stroke-width", 2)
		.attr("stroke-linecap", "round");
   

	let pict = drawRedDot();

	let pathLength = path.node().getTotalLength();
	let dotTransition = pict
		.attr("transform", `translate(${10}, ${126})`)
   		.transition()
   		.ease(d3.easeLinear)
  		.duration(speed)
  		.attrTween("transform", function() {
			return function(t) {
				if (effect === "larging") {
					let pos = path.node().getPointAtLength(pathLength * t);
					return `translate(${pos.x},${pos.y}) scale(${1+pos.x/500})` ;
				}
				if (effect === "reducing") {
					let pos = path.node().getPointAtLength(pathLength * t);
					return `translate(${pos.x},${pos.y}) scale(${1-pos.x/500})` ;
				}
				if (effect === "rotation") {
					let pos = path.node().getPointAtLength(pathLength * t);
					return `translate(${pos.x},${pos.y}))`
				}
				if (effect === "none") {
					let pos = path.node().getPointAtLength(pathLength * t);
					return `translate(${pos.x},${pos.y})` ;
				}		
	 			}
			});


}

   

function startAnimation() {
	let speed = parseInt(document.getElementById("speed").value);
	let effect = document.getElementById("effect").value;
	drawLine(speed, effect);
  }

  function clearAnimation() {
	d3.select("#animationContainer").selectAll("*").remove();
  }