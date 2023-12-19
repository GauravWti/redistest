function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function tds() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
    );
}


function get_month(time) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(time * 1000);
    let month = months[date.getMonth()];
    return month;
}

function get_year(time) {
    const date = new Date(time * 1000);
    let year = date.getFullYear();
    return year;
}




module.exports = {
    tds,
    get_month,
    get_year,
}