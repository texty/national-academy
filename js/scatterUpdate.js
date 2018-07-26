/**
 * Created by yevheniia on 02.07.18.
 */


var blue = "#85a8d0";
var pink = "#e377c2";
var red = "#d62728";
var green = "#bcbd22";


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

// d3.csv("data/dataset.csv", function (error, data) {
    retrieve_dot_data(function(data){
    // if (error) throw error;
    //
    //
    // data.forEach(function (d) {
    //     d.workers = +d.workers;
    //     d.womenScientists = +d.womenScientists;
    //     d.menScientists = +d.menScientists;
    // });


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
               var xtext = 'жінок',
                xnumber = d.womenScientists,
                ytext = "чоловіків",
                ynumber = d.menScientists,
                xtext2 = 'молодих вчених',
                xnumber2 = d.young,
                ytext2 = "старих",
                ynumber2 = d.old;

            div.transition()
                .duration(durationTime)
                .style("opacity", .9);

            if (isInView($('#step3')) || isInView($('#step4'))) {

                div.html(d.name + "<br>" + "<span id='genderspan'> " + xtext + ": " + xnumber + "; " + ytext + ": " + ynumber)
                    .style("left", (d3.event.pageX) + 10 + "px")
                    .style("top", (d3.event.pageY) - 100 + "px")
            }

            if (isInView($('#step5')) || isInView($('#step6'))) {

                div.html(d.name + "<br>" + "<span id='agespan'>" + xtext2 + ": " + xnumber2 + "; " + ytext2 + ": " + ynumber2 + "</span>")
                    .style("left", (d3.event.pageX) + 10 + "px")
                    .style("top", (d3.event.pageY) - 100 + "px")
            }


        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(durationTime)
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
        .style("fill", function(t) {
            t.womenScientists = +t.womenScientists;
            t.menScientists = +t.menScientists;
            if (t.womenScientists < t.menScientists) {
                return blue;
            }
            else {
                return pink
            }
        });


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
            .duration(durationTime)
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

    // d3.csv("data/dataset.csv", function (error, data) {
    //     if (error) throw error;
    //
    //
    //     data.forEach(function (d) {
    //         d.workers = +d.workers;
    //         d.womenScientists = +d.womenScientists;
    //         d.menScientists = +d.menScientists;
    //     });

    retrieve_dot_data(function(data){
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
            });

ageChart.select("#yAxisHint").duration(durationTime).text("чоловіків");
ageChart.select("#xAxisHint").duration(durationTime).text("жінок");
        
        ageChart.selectAll("#bla")
            .duration(durationTime)
            .attr("x", x(41))
            .attr("y", y(59))
            ;

    });
}







function scatterAge() {

    

    var ageChart = d3.select("#agesvg").transition();
    var body = d3.select("body");

    var x = d3.scale.linear()
        .range([0, chartWidth]);


    var y = d3.scale.linear().range([chartHeight, 20]);


    // d3.csv("data/dataset.csv", function (error, data) {
    //     if (error) throw error;
    //
    //
    //
    //     data.forEach(function(d) {
    //         d.young = +d.young;
    //         d.old = +d.old;
    //     });
    retrieve_dot_data(function(data){

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickSize(-chartHeight)
            .tickPadding(10);

        var yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(-chartWidth)
            .orient("left");

        x.domain([0, 700]);

        y.domain([0, 700]);


        var scatter = d3.select("#targetG");

        ageChart.selectAll(".dot")
            .duration(durationTime)
            .attr("cx", function (k) {
                return x(k.young);
            })
            .attr("cy", function (k) {
                return y(k.old);
            })
            .style("fill", function (t) {
                t.young = +t.young;
                t.old = +t.old;
                if (t.young > t.old) {
                    return green;
                }
                else {
                    return red
                }
            });



        ageChart.select("#yAxisHint").duration(durationTime).text("від 50 років");
        ageChart.select("#xAxisHint").duration(durationTime).text(" до 50 років");

        // ageChart.selectAll("#agesvg > g > g.y.axis > g.tick").style("opacity", 0);
        ageChart.select(".y.axis")
            .duration(durationTime)
            .call(yAxis);

        ageChart.select(".x.axis")
            .duration(durationTime)
            .call(xAxis);


        ageChart.selectAll("#bla")
            .duration(durationTime)
            .attr("x", x(200))
            .attr("y", y(308))
        ;

    });
}

function scatterAgeSmall() {

    var ageChart = d3.select("#agesvg").transition();
    var body = d3.select("body");

    var x = d3.scale.linear()
        .range([0, chartWidth]);


    var y = d3.scale.linear().range([chartHeight, 20]);


    // d3.csv("data/dataset.csv", function (error, data) {
    //     if (error) throw error;
    //
    //
    //     data.forEach(function(d) {
    //         d.young = +d.young;
    //         d.old = +d.old;
    //     });
    retrieve_dot_data(function(data){

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickSize(-chartHeight)
            .tickPadding(10);

        var yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(-chartWidth)
            .orient("left");

        x.domain([0, 150]);

        y.domain([0, 150]);


        var scatter = d3.select("#targetG");

        ageChart.selectAll(".dot")
            .duration(durationTime)
            .attr("cx", function (k) {
                return x(k.young);
            })
            .attr("cy", function (k) {
                return y(k.old);
            })
            .style("fill", function (t) {
                t.young = +t.young;
                t.old = +t.old;
                if (t.young > t.old) {
                    return green;
                }
                else {
                    return red
                }
            });



        ageChart.select("#yAxisHint").duration(durationTime).text("від 50 років");
        ageChart.select("#xAxisHint").duration(durationTime).text("до 50 років");

        // ageChart.selectAll("#agesvg > g > g.y.axis > g.tick").style("opacity", 0);
        ageChart.select(".y.axis")
            .duration(durationTime)
            .call(yAxis);

        ageChart.select(".x.axis")
            .duration(durationTime)
            .call(xAxis);

        ageChart.selectAll("#bla")
            .duration(durationTime)
            .attr("x", x(40))
            .attr("y", y(115))
        ;


    });
}






