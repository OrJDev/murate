import moment from 'moment'

export default (date: number) => {
    let d = moment.duration(date)
    const results = moment.utc(
        d.as('milliseconds')
    ).format(d.hours() > 0 ? 'HH:mm:ss' : 'mm:ss')
    return results == 'Invalid date' ? null : results;
}