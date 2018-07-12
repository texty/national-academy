/**
 * Created by yevheniia on 06.07.18.
 */
var blue = "#85a8d0";
var pink = "#e377c2";
var red = "#d62728";
var green = "#bcbd22";

var chartMargin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var color = d3.scale.category10();  // set the colour scale
var chartWidth, chartHeight;



if (screen.width < 800) {
    chartWidth = (window.innerWidth) - chartMargin.left - chartMargin.right - 50;
    chartHeight = (window.innerWidth) - chartMargin.top - chartMargin.bottom - 50;
} else if(screen.width >= 800 && screen.width < 1824 ) {
    chartWidth = (window.innerWidth / 2.5) - chartMargin.left - chartMargin.right;
    chartHeight = (window.innerWidth / 2.5) - chartMargin.top - chartMargin.bottom;
} else if (screen.width >= 1824) {
    chartWidth = (window.innerWidth / 5) - chartMargin.left - chartMargin.right;
    chartHeight = (window.innerWidth / 5) - chartMargin.top - chartMargin.bottom;
}



/*-------------------- Chart 1 ------------------*/
var parseDate = d3.time.format("%Y-%m-%d").parse;

// Set the ranges



d3.csv("data/age.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.year = parseDate(d.year);
        d.percent = +d.percent;
    });

    var x = d3.time.scale().range([0, chartWidth]);
    var y = d3.scale.linear().range([chartHeight, 20]);

    var valuesForXAxis  = [parseDate("2006-01-01"), parseDate("2012-01-01"),  parseDate("2017-01-01")];

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

    var ageChart = d3.select("#chart1")
        .append("svg")
        .attr("width", chartWidth + chartMargin.left + chartMargin.right)
        .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + chartMargin.left + "," + chartMargin.top + ")")
        .attr("id", "targetG");

    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.percent; })]);

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.age;})
        .entries(data);

    var color = d3.scale.category10();  // set the colour scale

    // Loop through each symbol / key
    var linePath;

    dataNest.forEach(function(d, i) {

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


/*-------------------- Chart 2 ------------------*/


d3.csv("data/sex.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.year = parseDate(d.year);
        d.percent = +d.percent;
    });


    var x = d3.time.scale().range([0, chartWidth]);
    var y = d3.scale.linear().range([chartHeight, 20]);

    var valuesForXAxis  = [parseDate("2006-01-01"), parseDate("2012-01-01"), parseDate("2017-01-01")];

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


    var ageChart = d3.select("#chart2")
        .append("svg")
        .attr("width", chartWidth + chartMargin.left + chartMargin.right)
        .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + chartMargin.left + "," + chartMargin.top + ")")
        .attr("id", "targetG");

    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.percent; })]);

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.sex;})
        .entries(data);

    var color = d3.scale.category10();  // set the colour scale

    // Loop through each symbol / key
    var linePath;

    dataNest.forEach(function(d, i) {

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
            .style("font-weight", "800")
            .attr("transform", function () {
                    xx = d.values[7].year;
                    yy = d.values[7].percent-0.5;
                    return "translate(" + x(xx) + "," + y(yy) + ")";

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
});


/*----------------- chart 3--------------*/




d3.csv("data/dataset.csv", function (error, data) {
    if (error) throw error;


    data.forEach(function (d) {
        d.workers = +d.workers;
        d.womenScientists = +d.womenScientists;
        d.menScientists = +d.menScientists;
    });


    var x = d3.scale.linear()
        .range([0, chartWidth]);
    var y = d3.scale.linear()
        .range([chartHeight, 20]);
//
    var scatterplot = d3.select("#chart3").append("svg")
        .attr("width", chartWidth + chartMargin.left + chartMargin.right)
        .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
        .append("g")
        .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

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

//
    scatterplot.selectAll(".dot")
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
        .style("fill", function(t) {
            t.womenScientists = +t.womenScientists;
            t.menScientists = +t.menScientists;
            if (t.womenScientists < t.menScientists) {
                return blue;
            }
            else {
                return pink
            }
        })
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

    scatterplot.append("g")
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
        .text("Жінки");

    scatterplot.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("id", "yAxisHint")
        .attr("y", -5)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Чоловіки");

});


/*----------------- chart 4--------------*/

d3.csv("data/dataset.csv", function (error, data) {
    if (error) throw error;


    data.forEach(function (d) {
        d.workers = +d.workers;
        d.womenScientists = +d.womenScientists;
        d.menScientists = +d.menScientists;
    });


    var x = d3.scale.linear()
        .range([0, chartWidth]);
    var y = d3.scale.linear()
        .range([chartHeight, 20]);
//
    var scatterplot = d3.select("#chart4").append("svg")
        .attr("width", chartWidth + chartMargin.left + chartMargin.right)
        .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
        .append("g")
        .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

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

//
    scatterplot.selectAll(".dot")
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
        .style("fill", function(t) {
            t.womenScientists = +t.womenScientists;
            t.menScientists = +t.menScientists;
            if (t.womenScientists < t.menScientists) {
                return blue;
            }
            else {
                return pink
            }
        })

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

    scatterplot.append("g")
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
        .text("Жінки");

    scatterplot.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("id", "yAxisHint")
        .attr("y", -5)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Чоловіки");

});




/*----------------- chart 5--------------*/

d3.csv("data/dataset.csv", function (error, data) {
    if (error) throw error;


    data.forEach(function (d) {
        d.workers = +d.workers;
        d.young = +d.young;
        d.old = +d.old;
    });


    var x = d3.scale.linear()
        .range([0, chartWidth]);
    var y = d3.scale.linear()
        .range([chartHeight, 20]);
//
    var scatterplot = d3.select("#chart5").append("svg")
        .attr("width", chartWidth + chartMargin.left + chartMargin.right)
        .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
        .append("g")
        .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

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


    x.domain([0, 650]);
    y.domain([0, 650]);

//
    scatterplot.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        // .style("opacity","0")
        .attr("r", function (d) {
            return "5px"
        })
        .attr("cx", function (d) {
            return x(d.young);
        })
        .attr("cy", function (d) {
            return y(d.old);
        })
        .style("fill", function(t) {
            t.young = +t.young;
            t.old = +t.old;
            if (t.young > t.old) {
                return green;
            }
            else {
                return red
            }
        })

        .style("opacity", "0.5")
        .on("mouseover", function (d) {

            div.transition()
                .duration(200)
                .style("opacity", .9);

            div.html(d.name + "<br>" + "Молодих: " + d.young + "<br>" + "Старих " + d.old)
                .style("left", (d3.event.pageX) + 10 + "px")
                .style("top", (d3.event.pageY) - 100 + "px")


        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);


        });

    scatterplot.append("g")
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
        .text("Жінки");

    scatterplot.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("id", "yAxisHint")
        .attr("y", -5)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Чоловіки");

});


/*----------------- chart 5--------------*/

d3.csv("data/dataset.csv", function (error, data) {
    if (error) throw error;


    data.forEach(function (d) {
        d.workers = +d.workers;
        d.young = +d.young;
        d.old = +d.old;
    });


    var x = d3.scale.linear()
        .range([0, chartWidth]);
    var y = d3.scale.linear()
        .range([chartHeight, 20]);
//
    var scatterplot = d3.select("#chart6").append("svg")
        .attr("width", chartWidth + chartMargin.left + chartMargin.right)
        .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
        .append("g")
        .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

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


    x.domain([0, 150]);
    y.domain([0, 150]);

//
    scatterplot.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        // .style("opacity","0")
        .attr("r", function (d) {
            return "5px"
        })
        .attr("cx", function (d) {
            return x(d.young);
        })
        .attr("cy", function (d) {
            return y(d.old);
        })
        .style("fill", function(t) {
            t.young = +t.young;
            t.old = +t.old;
            if (t.young > t.old) {
                return green;
            }
            else {
                return red
            }
        })

        .style("opacity", "0.5")
        .on("mouseover", function (d) {

            div.transition()
                .duration(200)
                .style("opacity", .9);

            div.html(d.name + "<br>" + "Молодих: " + d.young + "<br>" + "Старих " + d.old)
                .style("left", (d3.event.pageX) + 10 + "px")
                .style("top", (d3.event.pageY) - 100 + "px")


        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);


        });

    scatterplot.append("g")
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
        .text("Жінки");

    scatterplot.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("id", "yAxisHint")
        .attr("y", -5)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Чоловіки");

});



