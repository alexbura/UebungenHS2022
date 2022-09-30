// Alex Burà Uebung02

// Aufgabe 1

var array = [];
for (var i = 1; i<100; i+=2) {
    array.push(i);
}

console.log(array);


// Aufgabe 2

function wuerfeln() {
    var a=Math.floor(6*Math.random());
    return a
}

var ErsteNummer = wuerfeln()
console.log(ErsteNummer);
