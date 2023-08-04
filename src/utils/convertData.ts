export default function convertDateTime(dateStr: string): string {
    const [date, time, offset] = dateStr.split(/[T+]/);
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
  
    const offsetMinutes = parseInt(offset.slice(0, 2), 10) * 60 + parseInt(offset.slice(2), 10);
  
    const utcTime = new Date(
      Date.UTC(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
      ) -
        offsetMinutes * 60000
    );
  
    const moscowTime = new Date(utcTime.getTime() + 3 * 3600000);
  
    return `${moscowTime.getUTCHours() + 3}:${
      moscowTime.getUTCMinutes() < 10 ? '0' : ''
    }${moscowTime.getUTCMinutes()}`;
}
