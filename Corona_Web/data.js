/** Due to the unavaialability of data all data for the Hospital availability, Effect on economy, and Effect on mental health were all generated randomly with python.
 */

data = [{"Country":"US","Deaths":395851,"TotalCases":23758855},{"Country":"Brazil","Deaths":209296,"TotalCases":8455059},{"Country":"India","Deaths":152274,"TotalCases":10557985},{"Country":"Mexico","Deaths":140241,"TotalCases":1630258},{"Country":"UK","Deaths":88590,"TotalCases":3357361},{"Country":"Italy","Deaths":81325,"TotalCases":2368733},{"Country":"France","Deaths":82225,"TotalCases":2268733},{"Country":"Russia","Deaths":64134,"TotalCases":3507201},{"Country":"Iran","Deaths":56717,"TotalCases":1324395},{"Country":"Spain","Deaths":53314,"TotalCases":2252164}]

links = [{"Country":"US", "Link":"https://www.usa.gov/coronavirus"},{"Country":"Brazil","Link":"https://home.kpmg/xx/en/home/insights/2020/04/brazil-government-and-institution-measures-in-response-to-covid.html"},{"Country":"India","Link":"https://home.kpmg/xx/en/home/insights/2020/04/india-government-and-institution-measures-in-response-to-covid.html"},{"Country":"Mexico","Link":"https://home.kpmg/xx/en/home/insights/2020/04/mexico-government-and-institution-measures-in-response-to-covid.html"},{"Country":"UK","Link":"https://www.gov.uk/guidance/national-lockdown-stay-at-home"},{"Country":"Italy","Link":"http://www.salute.gov.it/portale/nuovocoronavirus/dettaglioFaqNuovoCoronavirus.jsp?lingua=english&id=230"},{"Country":"France","Link":"https://www.gouvernement.fr/en/coronavirus-covid-19"},{"Country":"Russia","Link":"https://home.kpmg/xx/en/home/insights/2020/04/russia-government-and-institution-measures-in-response-to-covid.html"},{"Country":"Iran","Link":"https://home.kpmg/xx/en/home/insights/2020/04/iran-government-and-institution-measures-in-response-to-covid.html"},{"Country":"Spain","Link":"https://www.esmadrid.com/en/information-coronavirus?utm_referrer=https%3A%2F%2Fwww.google.com%2F"}]

/** This function takes the link to the gov info website for the appropriate country from the links array */
function guidelines(){
    var selected = document.getElementById("sel1");
    var c = selected.value;

    for (var i = 0; i < c.length; i++) {
        if(c.charAt(i) == ':'){
            for(var a =0; a<i; a++){
                c = c.replace(c.charAt(a), '')
            }
            c = c.replace(c.charAt(0), '')
            break
        }
    }

    for(i in links){
        if(c==links[i].Country){
            link = links[i].Link
        }
    }
    return link
}
/** This function initializes everything on the main.html. The first for loop generates the options in the select input using the above json array*/
function init(){

    c = ""

    for(i in data){  
        var para = document.createElement("option");
        c = data[i].Country
        a = parseInt(i) + 1
        a = a.toString().concat(':')
        name = a.concat(c)
        var node = document.createTextNode(name);
        para.appendChild(node);
        var element = document.getElementById("sel1");
        element.appendChild(para);
    }

    var c = data[0].Country;
    d = data[0].Deaths
    tc = data[0].TotalCases
    dr = d / tc * 100 
    dr = Math.round((dr + Number.EPSILON) * 100) / 100
    if(dr > 3){
        var risk = ': High risk area';
    } else if(dr < 2) {
        var risk = ': Low risk area';
    } else if(dr > 5) {
        var risk = ': Medium risk area';
    }

    dr = dr.toString().concat(risk);

    document.getElementById("deaths").innerHTML = d;
    document.getElementById("deathrate").innerHTML = dr;
    document.getElementById("totalcases").innerHTML = tc;

    document.getElementById("graphtitle").innerHTML = 'Confirmed cases in '.concat(c);
    document.getElementById("hosptitle").innerHTML = 'Hospitals with most open beds in '.concat(c);
    document.getElementById("rupttitle").innerHTML = 'Bankrupt buisnesses in '.concat(c);
    document.getElementById("calltitle").innerHTML = 'Mental health hotline calls in '.concat(c);

    link = guidelines();

    var guide = document.getElementById("guideline")
    guide.innerHTML = 'Government guidelines for '.concat(c);
    guide.setAttribute('href', link)
    
}

/** This function updates all the info shown on main.html according to the country selected in the select input */

function upda(){

    var selected = document.getElementById("sel1");
    var c = selected.value;

    for (var i = 0; i < c.length; i++) {
        if(c.charAt(i) == ':'){
            for(var a =0; a<i; a++){
                c = c.replace(c.charAt(a), '')
            }
            c = c.replace(c.charAt(0), '')
            break
        }
    }

    for (i in data){
        if (c == data[i].Country){
            d = data[i].Deaths
            tc = data[i].TotalCases
            dr = d / tc * 100 
            dr = Math.round((dr + Number.EPSILON) * 100) / 100
            break
        }
    }
    if(dr > 5){
        var risk = ': High risk area';
    } else if(dr < 3) {
        var risk = ': Low risk area';
    } else if(dr > 3) {
        var risk = ': Medium risk area';
    }

    dr = dr.toString().concat(risk);

    document.getElementById("deaths").innerHTML = d;
    document.getElementById("deathrate").innerHTML = dr;
    document.getElementById("totalcases").innerHTML = tc;
    
}

/** This is the hospchart class used to create the horizontal barchart on main.html. The d3 code for the barchart was taken from CKelleher."Horizontal Bar Chart." Bl.ocks. http://bl.ocks.org/curran/8ac62d283a7aa6e95de8 - Released under the MIT licence*/

class hospchart{
    constructor(name){
        this.name = name

        var outerWidth = 900;
        var outerHeight = 400;
        var margin = { left: 250, top: 0, right: 50, bottom: 90 };
        var barPadding = 0.2;
        var barPaddingOuter = 0.1;

        var xColumn = "beds";
        var yColumn = "area";
        var xAxisLabelText = "Available beds";
        var xAxisLabelOffset = 30;

        var innerWidth  = outerWidth  - margin.left - margin.right;
        var innerHeight = outerHeight - margin.top  - margin.bottom;

        var svg = d3.select('#hospchart').append("svg")
            .attr("width",  outerWidth)
            .attr("height", outerHeight)
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xAxisG = g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + innerHeight + ")")
        var xAxisLabel = xAxisG.append("text")
            .attr("x", innerWidth / 1.1)
            .attr("y", xAxisLabelOffset)
            .attr("class", "label")
            .text(xAxisLabelText)
            
        var yAxisG = g.append("g")
            .attr("class", "y axis");

        var xScale = d3.scale.linear().range([0, innerWidth]);
        var yScale = d3.scale.ordinal().rangeRoundBands([0, innerHeight], barPadding, barPaddingOuter);

        var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
            .ticks(5)
            .tickFormat(d3.format("s"))
            .outerTickSize(0);
        var yAxis = d3.svg.axis().scale(yScale).orient("left")
            .outerTickSize(0);

        function render(data){

            xScale.domain([0, d3.max(data, function (d){ return d[xColumn]; })]);
            yScale.domain(       data.map( function (d){ return d[yColumn]; }));

            xAxisG.call(xAxis);
            yAxisG.call(yAxis);


            var bars = g.selectAll("rect").data(data);
            bars.enter().append("rect")
            .attr("height", yScale.rangeBand())
            bars
            .attr("x",0)
            .attr("y",     function (d){ return yScale(d[yColumn]); })
            .attr("width", function (d){ return xScale(d[xColumn]); })
            .style("fill", "#DE274E");

            bars.exit().remove();
        }

        function type(d){
            d.population = +d.population;
            return d;
        }

        d3.csv(this.name, type, render);
    }
}

/** This function takes the type of data wanted and the country from the select option and returns a path to the appropriate csv file:
 * e.g. type -> 'deaths' and selected -> 'Spain' returns Spain/Spaindeaths.csv to be used for creating the barchart objects
 */

function getnametrue(type){
    var selected = document.getElementById("sel1");
    var c = selected.value;

    for (var i = 0; i < c.length; i++) {
        if(c.charAt(i) == ':'){
            for(var a =0; a<i; a++){
                c = c.replace(c.charAt(a), '')
            }
            c = c.replace(c.charAt(0), '')
            break
        }
    }

    temp = '/'.concat(c)
    c = c.concat(temp)
    fin = c.concat(type)
    fin = fin.concat('.csv')
    return fin
}


/** This is the barchart class used to create the various barcharts on main.html. The d3 code for the barchart was taken from: d3noob."Simple d3.js bar chart." Bl.ocks. https://bl.ocks.org/d3noob/8952219 - Released under the MIT licence */

class barchar {
    constructor(name, total, type) {
        this.total = total
        this.name = name
        this.type = type

        if(type == 'conf' || type =='deaths' || type=='rec'){
            this.divid = 'graph'.concat('chart')
            this.contid = 'graph'.concat('cont')
        }else{
            this.divid = type.concat('chart')
            this.contid = type.concat('cont')
        }

        var div = document.createElement('div');
        div.setAttribute("align", "center")
        div.setAttribute("id", this.divid)
        document.getElementById(this.contid).appendChild(div);
    
        var margin = {top: 20, right: 20, bottom: 70, left: 70},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    
        // Parse the date / time
        var	parseDate = d3.time.format("%Y-%m").parse;
    
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    
        var y = d3.scale.linear().range([height, 0]);
    
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.time.format("%Y-%m"));
    
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10);
    
        this.divid = '#'.concat(this.divid)

        var svg = d3.select(this.divid).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");
    
        var arr = []

        d3.csv(name, function(error, data) {
            
            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.value = +d.value;
                if(total==true){
                    arr.push(d.value)
                
                    for(i = 0; i < arr.length-1; i++){
                        d.value = d.value + arr[i]
                    }
                }
            });
            
        x.domain(data.map(function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);
    
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" )
    
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Patients");
    
        svg.selectAll(".text")        
            .data(data)
            .enter()
            .append("text")
            .style("font-size", "8px")
            .attr("class","label")
            .attr("x", (function(d) { return x(d.date); }  ))
            .attr("y", function(d) { return y(d.value) - 20; })
            .attr("dy", ".75em")
            .text(function(d) { return d.value; });
    
        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .style("fill", "#2B8FEE")
            .attr("x", function(d) { return x(d.date); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });
    
        });
    
    }


}

/** This is the worldmap class used to create the worldmap on index.html. The d3 code for the barchart was taken from: BWelsh. “World Choropleth.” Bl.ocks. http://bl.ocks.org/palewire/d2906de347a160f38bc0b7ca57721328 - Released under the MIT licence */

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
