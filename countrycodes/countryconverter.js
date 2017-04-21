
var countryDiv = document.getElementById("countries");
for(var i = 0; i < countries[0].length; i++) {
    var name = countries[0][i].name;
    var code = countries[0][i].alpha3;

    countryDiv.innerHTML += "<span>case \"" + code + "\":<br>&#09;return CountryEnum." + name + ";<br></span>";
}