
function confmap(){
    width = 960
    height = 500

    // The svg
    var svg = d3.select('#map').append("svg")
        .attr("width", width)
        .attr("height", height)
    // Map and projection
    var path = d3.geoPath();
    var projection = d3.geoNaturalEarth()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2])
    var path = d3.geoPath()
    .projection(projection);

    // Data and color scale
    var data = d3.map();
    var colorScheme = d3.schemeBlues[7];
    var colorScale = d3.scaleThreshold()
    .domain([1, 10001, 15001, 30001, 50001, 70000])
    .range(colorScheme);

    // Legend
    var g = svg.append("g")
        .attr("class", "legendThreshold")
        .attr("transform", "translate(0,247)");
    g.append("text")
        .attr("class", "caption")
        .attr("x", 0)
        .attr("y", -6)
        .text("Total cases per million");
        var labels = ['No Data', '1-10000', '10001-15000: LOW RISK AREA', '15001-30000', '30001-50000: MEDIUM RISK AREA', '50001-70000', '> 70000: HIGH RISK AREA'];
        var legend = d3.legendColor()
        .labels(function (d) { return labels[d.i]; })
        .shapePadding(4)
        .scale(colorScale);
        svg.select(".legendThreshold")
        .call(legend);


    // Load external data and boot
    d3.queue()
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "worldconf.csv", function(d) { data.set(d.code, +d.total); })
    .await(ready);

    function ready(error, topo) {
    if (error) throw error;

    // Draw the map
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
                // Pull data for this country
                d.total = data.get(d.id) || 0;
                // Set the color
                return colorScale(d.total);
            })
            .attr("d", path);
    }
}

function deathmap(){
    width = 960
    height = 500

    // The svg
    var svg = d3.select('#map').append("svg")
        .attr("width", width)
        .attr("height", height)
    width = +svg.attr("width"),
    height = +svg.attr("height");
    // Map and projection
    var path = d3.geoPath();
    var projection = d3.geoNaturalEarth()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2])
    var path = d3.geoPath()
    .projection(projection);

    // Data and color scale
    var data = d3.map();
    var colorScheme = d3.schemeReds[7];
    var colorScale = d3.scaleThreshold()
    .domain([1, 201, 401, 601, 801, 1000])
    .range(colorScheme);

    // Legend
    var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(0,247)");
    g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Total deaths per million");
    var labels = ['No Data', '1-200', '201-400', '401-600', '601-800', '801-1000', '> 1000'];
    var legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(4)
    .scale(colorScale);
    svg.select(".legendThreshold")
    .call(legend);

    // Load external data and boot
    d3.queue()
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "worlddeaths.csv", function(d) { data.set(d.code, +d.total); })
    .await(ready);

    function ready(error, topo) {
    if (error) throw error;

    // Draw the map
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
                // Pull data for this country
                d.total = data.get(d.id) || 0;
                // Set the color
                return colorScale(d.total);
            })
            .attr("d", path);
    }
}

function hospmap(){
    width = 960
    height = 500

    // The svg
    var svg = d3.select('#map').append("svg")
        .attr("width", width)
        .attr("height", height)
    width = +svg.attr("width"),
    height = +svg.attr("height");
    // Map and projection
    var path = d3.geoPath();
    var projection = d3.geoNaturalEarth()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2])
    var path = d3.geoPath()
    .projection(projection);

    // Data and color scale
    var data = d3.map();
    var colorScheme = d3.schemeGreens[7];
    var colorScale = d3.scaleThreshold()
    .domain([0, 1.1, 2.1, 3.1, 4.1, 5.1])
    .range(colorScheme);

    // Legend
    var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(0,247)");
    g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Total Hospital beds available per thousand");
    var labels = ['No Data', '0-1', '1.1-2', '2.1-3', '3.1-4', '4.1-5', '> 5'];
    var legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(4)
    .scale(colorScale);
    svg.select(".legendThreshold")
    .call(legend);

    // Load external data and boot
    d3.queue()
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "worldhosp.csv", function(d) { data.set(d.code, +d.total); })
    .await(ready);

    function ready(error, topo) {
    if (error) throw error;

    // Draw the map
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
                // Pull data for this country
                d.total = data.get(d.id) || 0;
                // Set the color
                return colorScale(d.total);
            })
            .attr("d", path);
    }
}