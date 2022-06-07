const ONEMINUTE = 60;
const ONEHOUR = 3600;
const ONEDAY = 86400;
const ONEMONTH = 30 * ONEDAY;

const calculPassedTime = (time: number): string => {

  const currentTime = Math.floor(new Date().getTime() / 1000);
  const gap = currentTime - time;

  if (gap < ONEMINUTE) {
    return `${gap} sec ago`
  }
  else if (gap < ONEHOUR) {
    return `${Math.floor(gap / ONEMINUTE)} 분전`
  }
  else if (gap < ONEDAY) {
    return `${Math.floor(gap / ONEHOUR)} 시간전`
  }
  else if (gap < ONEMONTH) {
    return `${Math.floor(gap / ONEDAY)} 일전`
  }

  return timeToDate(time * 1000);
}

const timeToDate = (time: number) => {

  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${year}.${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`;
}

export { calculPassedTime, timeToDate };