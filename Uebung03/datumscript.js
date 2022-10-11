function data(event) {
    setInterval(data, 500);

    var d = new Date();
    var dt = d.toDateString();
    var ds = d.toTimeString();

    var time = document.querySelector("#time");
    var date = document.querySelector("#datum");

    time.innerHTML = ds;
    date.innerHTML = dt;
}