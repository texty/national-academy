/**
 * Created by yevheniia on 30.06.18.
 */
function financechart() {
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var margin = {
            top: 20,
            right: window.innerWidth / 50,
            bottom: 60,
            left: window.innerWidth / 20
        },
        width = window.innerWidth - margin.left - margin.right,
        height = window.innerHeight / 2;

    var color = d3.scale.ordinal()
        .domain([0, 3])
        .range(['#4A7B9D', '#54577C', '#ED6A5A', '#B49A84']);

    var barPadding = 40;


    d3.csv("data/nanuTotalFinancing.csv", function (error, myData) {


        myData.forEach(function (d) {
            d.sum = +d.sum;
            d.perPerson = +d.perPerson;
        });

        myData.sort(function (a, b) {
            return d3.descending(a.perPerson, b.perPerson);
        });


        var data = d3.nest()
            .key(function (d) {
                return d.group
            })
            .entries(myData);


        var rangeBands = [];
        var cummulative = 0;
        data.forEach(function (val, i) {
            val.cummulative = cummulative;
            cummulative += val.values.length + 3;
            val.values.forEach(function (values) {
                values.parentKey = val.name;
                rangeBands.push(i);
            })
        });


        console.log(data);
//    console.log(nestedData);

        var x_category = d3.scale.linear()
            .range([10, width / 1.3]);


        var x_defect = d3.scale.ordinal().domain(rangeBands).rangeRoundBands([0, width], .1);
        var x_category_domain = x_defect.rangeBand() * rangeBands.length;
        x_category.domain([0, x_category_domain]);


        var y = d3.scale.linear()
            .range([height, 100]);

        y.domain([0, d3.max(data, function (cat) {
            return d3.max(cat.values, function (def) {
                return def.perPerson * 1.5;
            });
        })]);

        var category_axis = d3.svg.axis()
                .scale(x_category)
                .orient("bottom")
            ;


        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"));

        var svg = d3.select("body").append("svg")
            .attr("id", "finance-chart")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //                .style('background-color', '#EFEFEF')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            //                .attr("transform", "rotate(-90)")
            .attr("y", 80)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("тис. грн");


        var category_g = svg.selectAll(".category")
            .data(data)
            .enter().append("g")
            .attr("class", function (d) {
                return 'category category-' + d.key;
            })
            .attr("transform", function (d) {
                return "translate(" + x_category((d.cummulative * x_defect.rangeBand()) + 5) + ",0)";
            })
            .attr("fill", function (d) {
                return color[d.key];
            });

        var category_label = category_g.selectAll(".category-label")
            .data(function (d) {
                return [d];
            })
            .enter().append("text")
            .attr("class", function (d) {
                console.log(d)
                return 'category-label category-label-' + d.group;
            })
            .attr("transform", function (d) {
                var x_label = x_category((d.values.length * x_defect.rangeBand() + barPadding) / 2);
                var y_label = height + 30;
                return "translate(" + x_label + "," + y_label + ")";
            })
            .text(function (d) {
                return d.key;
            })
            .attr('text-anchor', 'middle');

        var defect_g = category_g.selectAll(".defect")
            .data(function (d) {
                return d.values;
            })
            .enter().append("g")
            .attr("class", function (d) {
                return 'defect defect ' + d.group;
            })
            .attr("transform", function (d, i) {
                return "translate(" + x_category((i * x_defect.rangeBand())) + ",0)";
            })

            .style("margin-left", "390px");

//    var defect_label = defect_g.selectAll(".defect-label")
//            .data(function(d) {
//                return [d];
//            })
//            .enter().append("text")
//            .attr("class", function(d) {
//                console.log(d)
//                return 'defect-label defect-label-' + d.name;
//            })
//            .attr("transform", function(d) {
//                var x_label = x_category((x_defect.rangeBand() + barPadding) / 2);
//                var y_label = height + 10;
//                return "translate(" + x_label + "," + y_label + ")";
//            })
//            .text(function(d) {
//                return d.name;
//            })
//            .attr('text-anchor', 'middle');


        var rects = defect_g.selectAll('.rect')
            .data(function (d) {
                return [d];
            })

            .enter().append("rect")
            .attr("class", "rect")
            .attr("width", x_category(x_defect.rangeBand() - barPadding))
            .attr("x", function (d) {
                return x_category(barPadding);
            })
            //                .attr("y",180)
            //                .attr("height", 0)
            //                .transition()
            //                .duration(1500)
            .attr("y", function (d) {
                return y(d.perPerson);
            })

            .attr("height", function (d) {
                return height - y(d.perPerson);
            })
            .attr("fill", function (d) {
                if (d.sum > 40000) {
                    return "red"
                }
                else {
                    return "orange"
                }
            })
            .on("mouseover", function (d) {

                d3.select(this).attr("fill", "grey");
                div.transition()
                    .duration(200)
                    .style("opacity", .9);

//                    div.html(d.name + "<br> <br> Загальне фінансування: " + d.sum + " тис. грн")
                div.html(d.name + "<br>" + "<span style='font-weight: 800; color: orange;'>" + d.perPerson.toFixed(2) + "</span>")

                    .style("left", (d3.event.pageX) + 10 + "px")
                    .style("top", (d3.event.pageY) - 100 + "px")


            })
            .on("mouseout", function (d) {
                d3.select(this).attr("fill", function () {
                    if (d.sum > 40000) {
                        return "red"
                    }
                    else {
                        return "orange"
                    }
                });
                div.transition()
                    .duration(200)
                    .style("opacity", 0);


            });


        defect_g.selectAll("text")
            .data(function (d) {
                return [d];
            })
            .enter()
            .append("text")
            .attr("class", "nanu-labels")

            .attr("x", function (d) {
                return x_category(barPadding);
            })
            .attr("y", function (d) {
                return y(d.perPerson) - 80
            })
            .attr("dy", 0)
            .attr("transform", "translate(10,0)")
            .style("font-size", "9px")
            .style("background-color", "white")
            .html(function (d) {
                if (d.perPerson > 115 && d.group === "технические" || d.perPerson > 115 && d.group === "социальные" || d.perPerson > 115 && d.group === "естественные науки" || d.perPerson > 80 && d.group === "гуманитарные") {
                    return d.name + " ";
                }
            })
            .call(wrap, 80)
            .append("tspan")
            .attr("class", "sum")
            .attr("fill", "red")
            .html(function (d) {
                if (d.perPerson > 115 && d.group === "технические" || d.perPerson > 115 && d.group === "социальные" || d.perPerson > 115 && d.group === "естественные науки" || d.perPerson > 80 && d.group === "гуманитарные") {
                    return "  " + d.perPerson.toFixed(2)
                }
            })
        ;


        defect_g.selectAll('line')
            .data(function (d) {
                return [d];
            })
            .enter().append('path')
        //                .interpolate("basis")
            .attr("d", function (d) {

                var n = y(d.perPerson).toFixed(0);
                return "M10, " + n + " C-10, " + (n - 20) + " 0, " + (n - 50) + " 5," + (n - 50) + ""
            })
            .attr('class', 'right-axis')
            .attr('x1', function (d) {
                return x_category(barPadding) + 2;
            })
            .attr('x2', function (d) {
                return x_category(barPadding) + 2;
            })
            .attr('y1', function (d) {
                return y(d.perPerson)
            })
            .attr('y2', function (d) {
                return y(d.perPerson) - 20
            })
            .attr("marker-end", "url(#arrow)")
            .attr("stroke", 'black')
            .attr("fill", 'transparent')
            .attr("stroke-width", function (d) {
                if (d.perPerson > 115 && d.group === "технические" || d.perPerson > 115 && d.group === "социальные" || d.perPerson > 115 && d.group === "естественные науки" || d.perPerson > 80 && d.group === "гуманитарные") {
                    return 0.5
                }
                else {
                    return 0
                }
            });


        svg.append("text")
            .attr("y", 50)
            .style("font-size", "18px")
            .style("letter-spacing", "1px")
            .style("font-weight", "bold")
            .text("Питоме фінансування на робітника")
        ;


        var len = $("text.nanu-labels>tspan").length;
        for (var i = 0; i < len; i++) {
            var myString = d3.selectAll("text.nanu-labels>tspan")[0][i]
                .innerHTML;
            var numbers = parseInt(myString);
            // var numbers2 = myString.match(/\d+/g);
            console.log(numbers);
        }

    });

    function wrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
            // words = text.text().split(/\s+/).reverse(),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan")
                        .attr("x", 0).attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word);
                }
            }
        });
    }
}









