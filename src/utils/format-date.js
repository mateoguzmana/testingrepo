import moment from 'moment';

/**
 * Formats date with an specific format.
 * @param {Date} date
 * @param {String} format
 */
export const formatDate = (date, format) => moment(date).format(format);

/**
 * Sorts object by date.
 * @param {Object} obj 
 * @param {String} key 
 */
export const sortByDate = (obj, key) => obj.sort((a,b) => moment.utc(b[key]) - moment.utc(a[key]));

