/**
 * Created by yevheniia on 30.06.18.
 */

var age_data;


function retrieve_age_data(cb) {
    if (age_data) return cb(age_data);

    return d3.csv("data/age.csv", function(err, data){
        if (err) throw err;

        data.forEach(function (d) {
            d.year = parseDate(d.year);
            d.percent = +d.percent;
        });


        if (cb) return cb(data);
        return;
    })
}



var sex_data;
function retrieve_sex_data(cb) {
    if (sex_data) return cb(sex_data);

    return d3.csv("data/sex.csv", function(err, data){
        if (err) throw err;

        data.forEach(function (d) {
            d.year = parseDate(d.year);
            d.percent = +d.percent;
        });


        if (cb) return cb(data);
        return;
    })
}


var dot_data;
function retrieve_dot_data(cb) {
    if (dot_data) return cb(dot_data);

    return d3.csv("data/dataset.csv", function(err, data){
        if (err) throw err;

        data.forEach(function (d) {
            d.workers = +d.workers;
            d.womenScientists = +d.womenScientists;
            d.menScientists = +d.menScientists;
            d.young = +d.young;
            d.old = +d.old;
        });


        if (cb) return cb(data);
        return;
    })
}








var chartMargin = {
    top: 50,
    right: 80,
    bottom: 50,
    left: 50
};

// var color = d3.scale.category20c();


var colors = ['#ff0000','#ff5a21','#f87f36','#eb9845','#d6a94c','#bcb14e','#9cb248','#76aa3b','#4a9926','#008000'];

var colors2 = ['#85a8d0','#e377c2'];


var mycolor = d3.scale.ordinal()
    .domain(["Від 65 років", "60-64 роки", "55-59 років", "50-54 роки", "45-49 років", "40-44 роки", "35-39 років", "30-34 роки", "25-29 років", "До 25 років"])
    .range(colors);

var mycolor2 = d3.scale.ordinal()
    .domain(["чоловіки", "жінки"])
    .range(colors2);


var chartWidth, chartHeight;



if (screen.width < 800) {
    chartWidth = (window.innerWidth) - chartMargin.left - chartMargin.right - 50;
    chartHeight = (window.innerWidth) - chartMargin.top - chartMargin.bottom;
} else if(screen.width >= 800 && screen.width < 1824 ) {
   chartWidth = (window.innerWidth / 2.5) - chartMargin.left - chartMargin.right;
   chartHeight = (window.innerWidth / 2.5) - chartMargin.top - chartMargin.bottom;
} else if (screen.width >= 1824) {
    chartWidth = (window.innerWidth / 3) - chartMargin.left - chartMargin.right;
    chartHeight = (window.innerWidth / 3) - chartMargin.top - chartMargin.bottom;
}



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
    .tickPadding(10)
    ;

var yAxis = d3.svg.axis().scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-chartWidth)
    .tickPadding(10)
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

    // retrieve_age_data(function(chart_data){
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

    // Loop through each symbol / key
    var linePath;

    dataNest.forEach(function(d, i) {

        var group = ageChart.append('g');

        group.append("path")
            .attr("class", "line")
            .style("stroke", function() {
                return d.color = mycolor(d.key); })
            .attr("d", line(d.values))
            .attr("fill", "none")
            .attr("stroke-width", "4px");

        var xx;
        var yy;

        var label = group.append("text");

        // setInterval(function () {
            label.attr("class", "ageChartLabels")
                .attr("fill", d.color)
                .style("font-weight", "800")

                .attr("transform", function () {
                    if (d.key === "30-34 роки") {
                        xx = d.values[1].year;
                        yy = d.values[2].percent + 0.5;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    }
                    if (d.key === "45-49 років") {
                        xx = d.values[7].year;
                        yy = d.values[7].percent - 0.5;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    }
                    if (d.key === "60-64 роки") {
                        xx = d.values[7].year;
                        yy = d.values[7].percent + 0.1;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    }
                    if (d.key === "50-54 роки") {
                        // xx = d.values[0].year;
                        xx = parseDate("2007-06-01");
                        yy = d.values[0].percent - 0.5;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    }

                    else {
                        xx = d.values[7].year;
                        yy = d.values[7].percent-0.5;
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

    ageChart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("id", "yAxisHint")
        .attr("y", -5)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("%");



    // var totalLength = [$('path.line')[9].getTotalLength() ];
    //
    // console.log(totalLength);
    // d3.selectAll("path.line")
    //     .attr("stroke-dasharray", totalLength[0] + " " + totalLength[0] )
    //     .attr("stroke-dashoffset", totalLength[0])
    //     .transition()
    //     .duration(500)
    //     .ease("linear")
    //     .attr("stroke-dashoffset", 0);






});




function updateData() {


    var ageChart = d3.select("#agesvg").transition();


    // d3.csv("data/sex.csv", function (error, data) {
    retrieve_sex_data(function(data){

    // if (error) throw error;
    //
    //
    //     data.forEach(function (d) {
    //         d.year = parseDate(d.year);
    //         d.percent = +d.percent;
    //     });

        var x = d3.time.scale().range([0, chartWidth]);

        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom")
            .ticks(10)
            .tickValues(valuesForXAxis)
            .tickSize(-chartHeight)
            .tickPadding(10);


        var yAxis = d3.svg.axis().scale(y)
                .orient("left")
                .ticks(5)
                .tickSize(-chartWidth)
                .tickPadding(10)
            ;

        x.domain(d3.extent(data, function (d) {
            return d.year;
        }));

        y.domain([0, d3.max(data, function (d) {
            return d.percent;
        })]);


        ageChart.select(".x.axis")
            .duration(durationTime)
            .call(xAxis);


        ageChart.select(".y.axis")
            .duration(durationTime)
            .call(yAxis);


        // Nest the entries by symbol
        var dataNest = d3.nest()
            .key(function (d) {
                return d.sex;
            })
            .entries(data);


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
                .style("stroke", function() {
                    return d.color = mycolor2(d.key); })
               ;


            ageChart.select("#agesvg > g > g:nth-child(" + (i + 1) +") > text")
                .duration(durationTime)
                .text(d.key)
                .attr("fill", function() {
                    return d.color = mycolor2(d.key);})
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

function toStart () {

    var ageChart = d3.select("#agesvg").transition();


    // d3.csv("data/age.csv", function (error, data) {
    //     if (error) throw error;
    //
    //
    //     data.forEach(function(d) {
    //         d.year = parseDate(d.year);
    //         d.percent = +d.percent;
    //     });

        retrieve_age_data(function(data){

        var x = d3.time.scale().range([0, chartWidth]);

        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom")
            .ticks(10)
            .tickValues(valuesForXAxis)
            .tickSize(-chartHeight)
            .tickPadding(10);

        var yAxis = d3.svg.axis().scale(y)
                .orient("left")
                .ticks(5)
                .tickSize(-chartWidth)
                .tickPadding(10)
            ;


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


        var dataNest = d3.nest()
            .key(function(d) {return d.age;})
            .entries(data);


    ageChart.select("#yAxisHint").duration(durationTime).text("%");
    ageChart.select("#xAxisHint").duration(durationTime).text("");


        var linePath;

        dataNest.forEach(function(d, i) {

            ageChart.select("#agesvg > g > g:nth-child(3) > path").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(4) > path").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(5) > path").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(6) > path").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(7) > path").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(8) > path").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(9) > path").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(10) > path").duration(durationTime).style("display", "block").style("opacity", "1");






            ageChart.select("#agesvg > g > g:nth-child(" + (i + 1) +") > path")
                .duration(durationTime)
                .attr("d", line(data.filter(function (v) {
                    return v.age === d.key;
                })))
                .style("stroke", function() {
                    return d.color = mycolor(d.key); })
            ;




            ageChart.select("#agesvg > g > g:nth-child(" + (i + 1) +") > text")
                .duration(durationTime)
                .text(d.key)
                .attr("fill", function() {
                    return d.color = mycolor(d.key);})
                .attr("transform", function () {

                    if (d.key === "30-34 роки") {
                        xx = d.values[1].year;
                        yy = d.values[2].percent + 0.5;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    }
                    if (d.key === "45-49 років") {
                        xx = d.values[7].year;
                        yy = d.values[7].percent - 0.5;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    }
                    if (d.key === "60-64 роки") {
                        xx = d.values[7].year;
                        yy = d.values[7].percent + 0.1;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    }
                    if (d.key === "50-54 роки") {
                        // xx = d.values[0].year;
                        xx = parseDate("2007-06-01");
                        yy = d.values[0].percent - 0.5;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    }

                    else {
                        xx = d.values[7].year;
                        yy = d.values[7].percent-0.5;
                        return "translate(" + x(xx) + "," + y(yy) + ")";
                    }



                });


            ageChart.select("#agesvg > g > g:nth-child(3) > text").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(4) > text").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(5) > text").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(6) > text").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(7) > text").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(8) > text").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(9) > text").duration(durationTime).style("display", "block").style("opacity", "1");
            ageChart.select("#agesvg > g > g:nth-child(10) > text").duration(durationTime).style("display", "block").style("opacity", "1");



        });


    });



    
}




