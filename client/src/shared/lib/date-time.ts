export const dateTime = (timestamp: number) => {

    var d = new Date(timestamp);
    var now_time = +new Date();

    let month_name = [
        '',
        'янв',
        'фев',
        'мар',
        'апр',
        'мая',
        'июня',
        'июля',
        'авг',
        'сен',
        'окт',
        'нояб',
        'дек'
    ];

    let month = month_name[d.getMonth() + 1];

    let day  = d.getDate();
    // let year = d.getFullYear();
    let hour = d.getHours();
    let min  = d.getMinutes();

    let date = day + ' ' + month + ' ' + (hour < 10 ? ('0' + hour) : hour)  + ':' + (min < 10 ? ('0' + min) : min);

    let dif = Math.floor((now_time - timestamp) / 1000);

    if(dif < 59){

        return dif + " сек";

    } else if(dif / 60 > 1 && dif / 60 < 59) {

        return Math.round(dif / 60) + " мин";

    } else if(dif / 3600 > 1 && dif / 3600 < 23) {

        return Math.round(dif / 3600) + " час";

    } else {

        return date;

    }

}