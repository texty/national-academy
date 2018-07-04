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

d3.csv("data/dataset.csv", function (error, data) {
    if (error) throw error;


    data.forEach(function (d) {
        d.workers = +d.workers;
        d.womenScientists = +d.womenScientists;
        d.menScientists = +d.menScientists;
    });


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-chartHeight)
        .tickPadding(10);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-chartWidth)
        .tickPadding(10);


    x.domain([0, 500]);
    y.domain([0, 500]);



    // ageChart.selectAll("#agesvg > g > g.y.axis > g.tick").style("opacity", 0);
    ageChart.select(".y.axis")
        .duration(durationTime)
        .call(yAxis);

    ageChart.select(".x.axis")
        .duration(durationTime)
        .call(xAxis);

    ageChart.select("#yAxisHint").duration(durationTime).text("чоловіків");
    ageChart.select("#xAxisHint").duration(durationTime).text("жінок");

    var scatter = d3.select("#targetG");

    ageChart.selectAll(".line").transition().duration(10).style("opacity","0");
    ageChart.selectAll(".ageChartLabels").transition().duration(durationTime).style("opacity","0");



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
        .duration(durationTime)
        .attr("cx", function (d) {
            return x(d.womenScientists);
        })
        .attr("cy", function (d) {
            return y(d.menScientists);
        })
        .style("opacity", "0.5")
        .on("mouseover", function (d) {

            div.style("opacity", .9);

            div.html(d.name + "<br>" + "Жінок: " + d.womenScientists + "<br>" + "Чоловіків: " + d.menScientists)
                .style("left", (d3.event.pageX) + 10 + "px")
                .style("top", (d3.event.pageY) - 100 + "px")


        })
        .on("mouseout", function (d) {
            div.style("opacity", 0);


        });;

    if ($('#bla').length === 0) {
        scatter.append("text")
            .attr("x", x(218))
            .attr("y", y(294))
            .attr("id", "bla")
            .style("fill", "grey")
            .text("наведіть мишею на будь-яку точку");
    }
    else {
        ageChart.select("#bla")
            .duration(500)
            .attr("x", x(218))
            .attr("y", y(294))
        ;
    }







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

    d3.csv("data/dataset.csv", function (error, data) {
        if (error) throw error;


        data.forEach(function (d) {
            d.workers = +d.workers;
            d.womenScientists = +d.womenScientists;
            d.menScientists = +d.menScientists;
        });


        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickSize(-chartHeight)
            .tickPadding(10);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickSize(-chartWidth)
            .tickPadding(10);


        x.domain([0, 100]);
        y.domain([0, 100]);


        // ageChart.selectAll("#agesvg > g > g.y.axis > g.tick").style("opacity", 0);
        ageChart.select(".y.axis")
            .duration(durationTime)
            .call(yAxis);

        ageChart.select(".x.axis")
            .duration(durationTime)
            .call(xAxis);

        var scatter = d3.select("#targetG");

        ageChart.selectAll(".dot")
            .duration(durationTime)
            .attr("cx", function (d) {
                return x(d.womenScientists);
            })
            .attr("cy", function (d) {
                return y(d.menScientists);
            });

        ageChart.selectAll("#bla")
            .duration(durationTime)
            .attr("x", x(41))
            .attr("y", y(59))
            ;

    });
}







function scatterFinance() {

    var ageChart = d3.select("#agesvg").transition();
    var body = d3.select("body");

    var x = d3.scale.linear()
        .range([0, chartWidth]);


    var y = d3.scale.linear().range([chartHeight, 20]);

    
    d3.csv("data/dataset.csv", function (error, data) {
        if (error) throw error;
        
        
        data.forEach(function(d) {
            d.theorandpract = + d.theorandpract;
            d.development = +d.development;
        });

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickPadding(10);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        x.domain([0, 50000]);

        y.domain([0, 50000]);


        var scatter = d3.select("#targetG");

        ageChart.selectAll(".dot")
            .duration(750)
            .attr("cx", function (k) {
                return x(k.theorandpract);
            })
            .attr("cy", function (k) {
                return y(k.development);
            })
            .style("fill", function (k) {
                return color(k.group);
            });

        div.duration(750).html(function(d) {
            d.name + "<br>" + "Дослідження: " + d.theorandpract + "<br>" + "Розробки: " + d.development
        });


        ageChart.select("#yAxisHint").duration(durationTime).text("розробки");
        ageChart.select("#xAxisHint").duration(durationTime).text("дослідження");

        // ageChart.selectAll("#agesvg > g > g.y.axis > g.tick").style("opacity", 0);
        ageChart.select(".y.axis")
            .duration(durationTime)
            .call(yAxis);

        ageChart.select(".x.axis")
            .duration(durationTime)
            .call(xAxis);




    });
}