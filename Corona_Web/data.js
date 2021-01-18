
function getc(){
    data = [{"Country":"US","Deaths":387741,"Deathrate":118.5,"TotalCases":23266473},{"Country":"Brazil","Deaths":207095,"Deathrate":98.9,"TotalCases":8324294},{"Country":"India","Deaths":151918,"Deathrate":11.2,"TotalCases":10527683},{"Country":"Mexico","Deaths":137916,"Deathrate":109.3,"TotalCases":1588369},{"Country":"UK","Deaths":87295,"Deathrate":130.0,"TotalCases":3316019},{"Country":"Italy","Deaths":81325,"Deathrate":134.1,"TotalCases":2368733},{"Country":"France","Deaths":69313,"Deathrate":106.7,"TotalCases":2851670},{"Country":"Russia","Deaths":63558,"Deathrate":43.6,"TotalCases":3483531},{"Country":"Iran","Deaths":56621,"Deathrate":69.2,"TotalCases":1318295},{"Country":"Spain","Deaths":53079,"Deathrate":113.7,"TotalCases":2211967}]

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
    dr = data[0].Deathrate
    tc = data[0].TotalCases

    var dtitle = document.getElementById("d_title")
    dtitle.style.display = "block"
    dtitle = document.getElementById("dr_title")
    dtitle.style.display = "block"

    dtitle = document.getElementById("tc_title")
    dtitle.style.display = "block"



    document.getElementById("deaths").innerHTML = d;
    document.getElementById("deathrate").innerHTML = dr;
    document.getElementById("totalcases").innerHTML = tc;
    
    // document.getElementById("data").innerHTML = c;
    
}
  
function subd(){
    data = [{"Country":"US","Deaths":387741,"Deathrate":118.5,"TotalCases":23266473},{"Country":"Brazil","Deaths":207095,"Deathrate":98.9,"TotalCases":8324294},{"Country":"India","Deaths":151918,"Deathrate":11.2,"TotalCases":10527683},{"Country":"Mexico","Deaths":137916,"Deathrate":109.3,"TotalCases":1588369},{"Country":"UK","Deaths":87295,"Deathrate":130.0,"TotalCases":3316019},{"Country":"Italy","Deaths":81325,"Deathrate":134.1,"TotalCases":2368733},{"Country":"France","Deaths":69313,"Deathrate":106.7,"TotalCases":2851670},{"Country":"Russia","Deaths":63558,"Deathrate":43.6,"TotalCases":3483531},{"Country":"Iran","Deaths":56621,"Deathrate":69.2,"TotalCases":1318295},{"Country":"Spain","Deaths":53079,"Deathrate":113.7,"TotalCases":2211967}]

    var selected = document.getElementById("sel1");
    var c = selected.value;
    for (i in data){
        if (c == data[i].Country){
            d = data[i].Deaths
            dr = data[i].Deathrate
            tc = data[i].TotalCases
        }
    }

    var dtitle = document.getElementById("d_title")
    dtitle.style.display = "block"
    dtitle = document.getElementById("dr_title")
    dtitle.style.display = "block"

    dtitle = document.getElementById("tc_title")
    dtitle.style.display = "block"



    document.getElementById("deaths").innerHTML = d;
    document.getElementById("deathrate").innerHTML = dr;
    document.getElementById("totalcases").innerHTML = tc;


    
}
    
function italy(){

    temp = 'Italy/italydeaths.csv'

    var margin = {top: 20, right: 20, bottom: 70, left: 50},
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
        .attr("transform", "rotate(-90)" );

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
        .attr("class","label")
        .attr("x", (function(d) { return x(d.date); }  ))
        .attr("y", function(d) { return y(d.value) - 20; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d.date); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

    });
    
    
}

