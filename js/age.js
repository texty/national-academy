/**
 * Created by yevheniia on 30.06.18.
 */

var chartMargin = {
    top: 20,
    right: window.innerWidth / 20,
    bottom: 60,
    left: window.innerWidth / 20
};

var color = d3.scale.category20c();

var chartWidth = (window.innerWidth / 3) - chartMargin.left - chartMargin.right,
    chartHeight = (window.innerWidth / 3) - chartMargin.top - chartMargin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

// Set the ranges
var x = d3.time.scale().range([0, chartWidth]);
var y = d3.scale.linear().range([chartHeight, 20]);

var valuesForXAxis  = [parseDate("2006-01-01"), parseDate("2011-01-01"), parseDate("2012-01-01"), parseDate("2013-01-01"), parseDate("2014-01-01"), parseDate("2015-01-01"), parseDate("2016-01-01"), parseDate("2017-01-01")];

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom")
    .ticks(10)
    .tickValues(valuesForXAxis)
    .tickSize(-chartHeight)
    ;

var yAxis = d3.svg.axis().scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-chartWidth)
    ;

// Define the line
var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.percent); });

// Adds the svg canvas
var ageChart = d3.select("#age-chart")
    .append("svg")
    .attr("id", "agesvg")
    .attr("width", chartWidth + chartMargin.left + chartMargin.right)
    .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + chartMargin.left + "," + chartMargin.top + ")")
    .attr("id", "targetG");

d3.csv("data/age.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.year = parseDate(d.year);
        d.percent = +d.percent;
    });

    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.percent; })]);

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.age;})
        .entries(data);

    var color = d3.scale.category20c();  // set the colour scale

    // Loop through each symbol / key
    var linePath;

    dataNest.forEach(function(d) {

        var group = ageChart.append('g');

        group.append("path")
            .attr("class", "line")
            .style("stroke", function() {
                return d.color = color(d.key); })
            .attr("d", line(d.values))
            .attr("fill", "none")
            .attr("stroke-width", "4px");

        var xx;
        var yy;

        var label = group.append("text");

        // setInterval(function () {
            label.attr("class", "ageChartLabels")
                .attr("fill", d.color)

                .attr("transform", function () {
                    if (d.key === "30-34 роки") {
                        xx = d.values[2].year;
                        yy = d.values[2].percent + 0.5;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    } else {
                        xx = d.values[7].year;
                        yy = d.values[7].percent;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    }
                })

                .html(d.key)
            ;
        // }, 2005)

    });

    // Add the X Axis
    ageChart.append("g")
        .attr("class", "x axis")
        .style("display", "block")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(xAxis)
        .append("text")
        .attr("id", "xAxisHint")
        .attr("transform",
            "translate(" + (chartWidth + 20) + " ," +
            (0) + ")")
        .style("text-anchor", "middle")
        .text("")
    ;

    // Add the Y Axis
    // ageChart.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis);

    // ageChart.append("text")
    //     .attr("y", 50)
    //     .attr("id", "ageChartTitle")
    //     .style("font-size", "18px")
    //     .style("letter-spacing", "1px")
    //     .style("font-weight", "bold")
    //     .html("Структурні частки окремих вікових груп серед всіх дослідників НАН, %")
    //     .attr("dy", 0)
    //     .call(wrap, chartWidth);

    ageChart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("id", "yAxisHint")
        .attr("y", -5)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("%");



    var totalLength = [$('path.line')[9].getTotalLength() ];

    console.log(totalLength);
    d3.selectAll("path.line")
        .attr("stroke-dasharray", totalLength[0] + " " + totalLength[0] )
        .attr("stroke-dashoffset", totalLength[0])
        .transition()
        .duration(1000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);
});


function updateData() {


    var ageChart = d3.select("#agesvg").transition();


    d3.csv("data/sex.csv", function (error, data) {
        if (error) throw error;


        data.forEach(function (d) {
            d.year = parseDate(d.year);
            d.percent = +d.percent;
        });

        var x = d3.time.scale().range([0, chartWidth]);

        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom")
            .ticks(10)
            .tickValues(valuesForXAxis)
            .tickSize(-chartHeight);

        x.domain(d3.extent(data, function (d) {
            return d.year;
        }));

        y.domain([0, d3.max(data, function (d) {
            return d.percent;
        })]);


        ageChart.select(".y.axis")
            .duration(durationTime)
            .call(yAxis);

        ageChart.select(".x.axis")
            .duration(durationTime)
            .call(xAxis);



        // Nest the entries by symbol
        var dataNest = d3.nest()
            .key(function (d) {
                return d.sex;
            })
            .entries(data);

        var color = d3.scale.category10();  // set the colour scale

        // Loop through each symbol / key
        var linePath;

        dataNest.forEach(function (d, i) {


            ageChart.select("#agesvg > g > g:nth-child(3) > text").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(4) > text").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(5) > text").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(6) > text").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(7) > text").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(8) > text").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(9) > text").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(10) > text").style("display", "none");


            ageChart.select("#agesvg > g > g:nth-child(" + (i + 1) +") > path")
                .duration(durationTime)
                .attr("d", line(data.filter(function (v) {
                    return v.sex === d.key;
                })))
               ;


            ageChart.select("#agesvg > g > g:nth-child(" + (i + 1) +") > text")
                .duration(durationTime)
                .text(d.key)
                // .attr("fill", d.color)
                .attr("transform", function () {
                    var xx = d.values[7].year;
                    var yy = d.values[7].percent;
                    return "translate(" + x(xx) + "," + y(yy) + ")";
                });

            ageChart.select("#agesvg > g > g:nth-child(3) > path").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(4) > path").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(5) > path").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(6) > path").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(7) > path").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(8) > path").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(9) > path").style("display", "none");
            ageChart.select("#agesvg > g > g:nth-child(10) > path").style("display", "none");



            ageChart.select("#yAxisHint").duration(durationTime).text("осіб");
            ageChart.select("#xAxisHint").duration(durationTime).text("");


            ageChart.selectAll(".dot").transition().duration(durationTime).style("opacity","0");


            ageChart.select("#agesvg > g > g:nth-child(" + 1 + ") > path").style("opacity","1");
            ageChart.select("#agesvg > g > g:nth-child(" + 2 + ") > path").style("opacity","1");
            ageChart.select("#agesvg > g > g:nth-child(" + 1 + ") > text").style("opacity","1");
            ageChart.select("#agesvg > g > g:nth-child(" + 2 + ") > text").style("opacity","1");
            // ageChart.selectAll(".ageChartLabels").transition().duration(300).style("opacity","1");


        });






    });
}


// d3.select("#agesvg > g > g.x.axis > g.tick:nth-child(1) > text").remove();

