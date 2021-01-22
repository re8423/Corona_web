data = [{"Country":"US","Deaths":395851,"TotalCases":23758855},{"Country":"Brazil","Deaths":209296,"TotalCases":8455059},{"Country":"India","Deaths":152274,"TotalCases":10557985},{"Country":"Mexico","Deaths":140241,"TotalCases":1630258},{"Country":"UK","Deaths":88590,"TotalCases":3357361},{"Country":"Italy","Deaths":81325,"TotalCases":2368733},{"Country":"France","Deaths":82225,"TotalCases":2268733},{"Country":"Russia","Deaths":64134,"TotalCases":3507201},{"Country":"Iran","Deaths":56717,"TotalCases":1324395},{"Country":"Spain","Deaths":53314,"TotalCases":2252164}]

links = [{"Country":"US", "Link":"https://www.usa.gov/coronavirus"},{"Country":"Brazil","Link":"https://home.kpmg/xx/en/home/insights/2020/04/brazil-government-and-institution-measures-in-response-to-covid.html"},{"Country":"India","Link":"https://home.kpmg/xx/en/home/insights/2020/04/india-government-and-institution-measures-in-response-to-covid.html"},{"Country":"Mexico","Link":"https://home.kpmg/xx/en/home/insights/2020/04/mexico-government-and-institution-measures-in-response-to-covid.html"},{"Country":"UK","Link":"https://www.gov.uk/guidance/national-lockdown-stay-at-home"},{"Country":"Italy","Link":"http://www.salute.gov.it/portale/nuovocoronavirus/dettaglioFaqNuovoCoronavirus.jsp?lingua=english&id=230"},{"Country":"France","Link":"https://www.gouvernement.fr/en/coronavirus-covid-19"},{"Country":"Russia","Link":"https://home.kpmg/xx/en/home/insights/2020/04/russia-government-and-institution-measures-in-response-to-covid.html"},{"Country":"Iran","Link":"https://home.kpmg/xx/en/home/insights/2020/04/iran-government-and-institution-measures-in-response-to-covid.html"},{"Country":"Spain","Link":"https://www.esmadrid.com/en/information-coronavirus?utm_referrer=https%3A%2F%2Fwww.google.com%2F"}]

types = ['rupt', 'call']

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

function getc(){

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

function subd(){

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

function hospchart(name){
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

      d3.csv(name, type, render);
}

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
    // alert(tempconf)
}

function barchart(name, total, type){

    if(type == 'conf' || type =='deaths' || type=='rec'){
        var divid = 'graph'.concat('chart')
        var contid = 'graph'.concat('cont')
    }else{
        var divid = type.concat('chart')
        var contid = type.concat('cont')
    }



    var div = document.createElement('div');
    div.setAttribute("align", "center")
    div.setAttribute("id", divid)
    document.getElementById(contid).appendChild(div);

    temp = name
    var arr = []

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

    divid = '#'.concat(divid)

    var svg = d3.select(divid).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(temp, function(error, data) {

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

function makechart(){
    for(i =0; i<types.length; i++){
        type = types[i]
        barchart(getnametrue(type), true, type)
    }
}