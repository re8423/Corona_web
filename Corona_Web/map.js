
class worldmap {
    constructor(type){
        this.type = type

        if(type == 'deaths'){
            this.text = "Total deaths per million"
            this.link = "worlddeaths.csv"
            this.domain = [1, 201, 401, 601, 801, 1000]
            this.labels = ['No Data', '1-200', '201-400', '401-600', '601-800', '801-1000', '> 1000']
            this.colour = d3.schemeReds[7]
        } else if (type =='conf'){
            this.text = "Total cases per million"
            this.link = "worldconf.csv"
            this.domain = [1, 10001, 15001, 30001, 50001, 70000]
            this.labels = ['No Data', '1-10000', '10001-15000: LOW RISK AREA', '15001-30000', '30001-50000: MEDIUM RISK AREA', '50001-70000', '> 70000: HIGH RISK AREA']
            this.colour = d3.schemeBlues[7]

        } else if (type =='hosp'){
            this.text = "Total Hospital beds available per thousand"
            this.link = "worldhosp.csv"
            this.domain = [0, 1.1, 2.1, 3.1, 4.1, 5.1]
            this.labels = ['No Data', '0-1', '1.1-2', '2.1-3', '3.1-4', '4.1-5', '> 5']
            this.colour = d3.schemeGreens[7]
        }

        this.width = 960
        this.height = 500

        // The svg
        var svg = d3.select('#map').append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
        // Map and projection
        var path = d3.geoPath();
        var projection = d3.geoNaturalEarth()
        .scale(this.width / 2 / Math.PI)
        .translate([this.width / 2, this.height / 2])
        var path = d3.geoPath()
        .projection(projection);

        // Data and color scale
        var data = d3.map();
        var colorScheme = this.colour;
        var colorScale = d3.scaleThreshold()
        .domain(this.domain)
        .range(colorScheme);

        // Legend
        var g = svg.append("g")
            .attr("class", "legendThreshold")
            .attr("transform", "translate(0,247)");
        g.append("text")
            .attr("class", "caption")
            .attr("x", 0)
            .attr("y", -6)
            .text(this.text);
            var labels = this.labels;
            var legend = d3.legendColor()
            .labels(function (d) { return labels[d.i]; })
            .shapePadding(4)
            .scale(colorScale);
            svg.select(".legendThreshold")
            .call(legend);


        // Load external data and boot
        d3.queue()
        .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
        .defer(d3.csv, this.link, function(d) { data.set(d.code, +d.total); })
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
}