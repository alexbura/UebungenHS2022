function prova() {
    var p = document.querySelector("#gross");

    var random = Math.floor(Math.random()*16777215).toString();

    var farbe = "#" + random;

    p.innerHTML = document.querySelector("#text").value;

    p.style["color"] = farbe;
    p.style["font-size"] = "30px";
    p.style["text-align"] = "center";
}
