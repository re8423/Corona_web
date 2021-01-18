data = [{"Country":"US","Deaths":395851,"TotalCases":23758855},{"Country":"Brazil","Deaths":209296,"TotalCases":8455059},{"Country":"India","Deaths":152274,"TotalCases":10557985},{"Country":"Mexico","Deaths":140241,"TotalCases":1630258},{"Country":"UK","Deaths":88590,"TotalCases":3357361},{"Country":"Italy","Deaths":81325,"TotalCases":2368733},{"Country":"France","Deaths":82225,"TotalCases":2268733},{"Country":"Russia","Deaths":64134,"TotalCases":3507201},{"Country":"Iran","Deaths":56717,"TotalCases":1324395},{"Country":"Spain","Deaths":53314,"TotalCases":2252164}]

function getc(){

    c = ""
    // a =""
    
    // for(i in data){
    //     c+= "<option>" + data[i].Country + "</option>"
    //     a+= "<p>" + data[i].Deaths + "</p>"
    // }

    for(i in data){  
        var para = document.createElement("option");
        var node = document.createTextNode(c = data[i].Country);
        para.appendChild(node);
        var element = document.getElementById("sel1");
        element.appendChild(para);
    }

    var c = data[0].Country;
    d = data[0].Deaths
    tc = data[0].TotalCases
    dr = d / tc * 100 
    dr = Math.round((dr + Number.EPSILON) * 100) / 100

    document.getElementById("deaths").innerHTML = d;
    document.getElementById("deathrate").innerHTML = dr;
    document.getElementById("totalcases").innerHTML = tc;
    
    // document.getElementById("data").innerHTML = c;
    
}

function subd(){

    var selected = document.getElementById("sel1");
    var c = selected.value;
    for (i in data){
        if (c == data[i].Country){
            d = data[i].Deaths
            tc = data[i].TotalCases
            dr = d / tc * 100 
            dr = Math.round((dr + Number.EPSILON) * 100) / 100
        }
    }

    document.getElementById("deaths").innerHTML = d;
    document.getElementById("deathrate").innerHTML = dr;
    document.getElementById("totalcases").innerHTML = tc;
    
}
    
function getname(){
    var selected = document.getElementById("sel1");
    var c = selected.value;
    temp = '/'.concat(c)
    c = c.concat(temp)
    tempconf = c.concat('conf.csv')
    return tempconf
    // alert(tempconf)
}

function getnamedeath(){
    var selected = document.getElementById("sel1");
    var c = selected.value;
    temp = '/'.concat(c)
    c = c.concat(temp)
    tempdeath = c.concat('deaths.csv')
    return tempdeath
    // alert(tempconf)
}

function getnamerec(){
    var selected = document.getElementById("sel1");
    var c = selected.value;
    temp = '/'.concat(c)
    c = c.concat(temp)
    temprec = c.concat('rec.csv')
    return temprec
    // alert(tempconf)
}

function confchart(name){

    temp = name

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

    var svg = d3.select("#confchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(temp, function(error, data) {

        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.value = +d.value;
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

function deathchart(name){

    temp = name

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

    var svg = d3.select("#deathchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(temp, function(error, data) {

        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.value = +d.value;
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
        .text("Deaths");

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
        .style("fill", "#EE4D2B")
        .attr("x", function(d) { return x(d.date); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

    });
    
    
}

function recchart(name){

    temp = name

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

    var svg = d3.select("#recchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(temp, function(error, data) {

        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.value = +d.value;
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
        .text("Recovered");

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
        .style("fill", "#27DE61")
        .attr("x", function(d) { return x(d.date); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

    });
    
    
}