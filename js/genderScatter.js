/**
 * Created by yevheniia on 01.07.18.
 */

// function scatter() {
    // var scatterWidth = (window.innerWidth / 2) - chartMargin.left - chartMargin.right,
    //     scatterHeight = (window.innerWidth / 2) - chartMargin.top - chartMargin.bottom;

    var scatterX = d3.scale.linear()
        .range([0, chartWidth]);

    var scatterY = d3.scale.linear()
        .range([chartHeight, 0]);

    var scatterColor = d3.scale.category10();

    var scatterXaxis = d3.svg.axis()
        .scale(scatterX)
        .orient("bottom");

    var scatterYaxis = d3.svg.axis()
        .scale(scatterY)
        .orient("left");

    var scatterplot = d3.select("#gender-scatter").append("svg")
        .attr("width", chartWidth + chartMargin.left + chartMargin.right)
        .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
        .append("g")
        .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

    d3.csv("data/menWomen.csv", function (error, menWomen) {
        if (error) throw error;

        menWomen.forEach(function (d) {
            d.workers = +d.workers;
            d.womenScientists = +d.womenScientists;
            d.menScientists = +d.menScientists;
        });

        // scatterX.domain(d3.extent(menWomen, function (d) {
        //     return d.womenScientists;
        // }));
        // scatterY.domain(d3.extent(menWomen, function (d) {
        //     return d.menScientists;
        // }));

        scatterX.domain([0, 500]);
        scatterY.domain([0, 500]);

        scatterplot.append("g")
            .attr("class", "xx axis")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(scatterXaxis)
            .append("text")
            .attr("class", "label")
            .attr("x", chartWidth)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Жінки");

        scatterplot.append("g")
            .attr("class", "yy axis")
            .call(scatterYaxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Чоловіки");

        scatterplot.selectAll(".dot")
            .data(menWomen.filter(function (d) {
                return d.workers > 100;
            }))
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", function (d) {
                return "5px"
            })
            .attr("cx", function (d) {
                return scatterX(d.womenScientists);
            })
            .attr("cy", function (d) {
                return scatterY(d.menScientists);
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
    });
// }