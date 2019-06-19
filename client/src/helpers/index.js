import moment from 'moment';

export function formatDate(date) {
    date = moment(date);

    if (date.format('D.M.YY') == moment().format('D.M.YY')) {
        return date.format('hh:mm a');
    } else {
        return date.format('DD MMM');
    }
}