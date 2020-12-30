
export function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + year;
}

export function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const monthNames = [
        "januari", "februari", "maart", "april",
        "mei", "juni", "juli", "augustus",
        "september", "oktober", "november", "december"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + formatTime(date.getHours()) + ':' + formatTime(date.getMinutes());
}

function formatTime(number){
    if (number < 10){
        return "0" + number;
    }
    else return number;
}