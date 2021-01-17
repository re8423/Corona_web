
function getc(){
    var data = [{"Country":"US","Deaths":247621},{"Country":"Brazil","Deaths":166699},{"Country":"India","Deaths":130993},{"Country":"Mexico","Deaths":99026},{"Country":"UK","Deaths":52147},{"Country":"Italy","Deaths":46464},{"Country":"France","Deaths":45054},{"Country":"Iran","Deaths":42461},{"Country":"Spain","Deaths":41688},{"Country":"Argentina","Deaths":36106}]

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
    
    // document.getElementById("data").innerHTML = c;
    
}

function subd(){
    var data = [{"Country":"US","Deaths":247621},{"Country":"Brazil","Deaths":166699},{"Country":"India","Deaths":130993},{"Country":"Mexico","Deaths":99026},{"Country":"UK","Deaths":52147},{"Country":"Italy","Deaths":46464},{"Country":"France","Deaths":45054},{"Country":"Iran","Deaths":42461},{"Country":"Spain","Deaths":41688},{"Country":"Argentina","Deaths":36106}]

    var selected = document.getElementById("sel1");
    var c = selected.value;

    for (i in data){
        if (c == data[i].Country){
            d = data[i].Deaths
        }
    }

    document.getElementById("deaths").innerHTML = d;

}
