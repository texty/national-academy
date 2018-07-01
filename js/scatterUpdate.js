/**
 * Created by yevheniia on 02.07.18.
 */
/**
 * Created by yevheniia on 01.07.18.
 */

function scatter() {

var ageChart = d3.select("#agesvg").transition();



var x = d3.scale.linear()
    .range([0, chartWidth]);

var scatterColor = d3.scale.category10();

var scatterplot = d3.select("#gender-scatter").append("svg")
    .attr("width", chartWidth + chartMargin.left + chartMargin.right)
    .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
    .append("g")
    .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

d3.csv("data/menWomen.csv", function (error, data) {
    if (error) throw error;


    data.forEach(function (d) {
        d.workers = +d.workers;
        d.womenScientists = +d.womenScientists;
        d.menScientists = +d.menScientists;
    });


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");


    x.domain([0, 500]);
    y.domain([0, 500]);


    // ageChart.selectAll("#agesvg > g > g.y.axis > g.tick").style("opacity", 0);
    ageChart.select(".y.axis")
        .duration(750)
        .call(yAxis);

    ageChart.select(".x.axis")
        .duration(750)
        .call(xAxis);



    var scatter = d3.select("#targetG");

    ageChart.selectAll(".line").transition().duration(300).style("opacity","0");
    scatter.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        // .style("opacity","0")
        .attr("r", function (d) {
            return "5px"
        })
        .attr("cx", function (d) {
            return x(d.womenScientists);
        })
        .attr("cy", function (d) {
            return y(d.menScientists);
        })
        .style("fill", "orange")

        .style("opacity", "0.5")
        .on("mouseover", function (d) {

            div.transition()
                .duration(200)
                .style("opacity", .9);

            div.html(d.name + "<br>" + "Жінок: " + d.womenScientists + "<br>" + "Чоловіків: " + d.menScientists)
                .style("left", (d3.event.pageX) + 10 + "px")
                .style("top", (d3.event.pageY) - 100 + "px")


        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);


        });


    ageChart.selectAll(".dot")
        .duration(750)
        .attr("cx", function (d) {
            return x(d.womenScientists);
        })
        .attr("cy", function (d) {
            return y(d.menScientists);
        })

});
}


function scatterSmall() {

    var ageChart = d3.select("#agesvg").transition();



    var x = d3.scale.linear()
        .range([0, chartWidth]);

    // var scatterColor = d3.scale.category10();
    //
    // var scatterplot = d3.select("#gender-scatter").append("svg")
    //     .attr("width", chartWidth + chartMargin.left + chartMargin.right)
    //     .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
    //     .append("g")
    //     .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

    d3.csv("data/menWomen.csv", function (error, data) {
        if (error) throw error;


        data.forEach(function (d) {
            d.workers = +d.workers;
            d.womenScientists = +d.womenScientists;
            d.menScientists = +d.menScientists;
        });


        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");


        x.domain([0, 100]);
        y.domain([0, 100]);


        // ageChart.selectAll("#agesvg > g > g.y.axis > g.tick").style("opacity", 0);
        ageChart.select(".y.axis")
            .duration(750)
            .call(yAxis);

        ageChart.select(".x.axis")
            .duration(750)
            .call(xAxis);

        var scatter = d3.select("#targetG");

        ageChart.selectAll(".dot")
            .duration(750)
            .attr("cx", function (d) {
                return x(d.womenScientists);
            })
            .attr("cy", function (d) {
                return y(d.menScientists);
            })

    });
}