const ONEMINUTE = 60 as const;
const ONEHOUR = 3600 as const;
const ONEDAY = 86400 as const;
const ONEMONTH = 30 * ONEDAY;

// 얼마나 지났나??
const calculTimeAgo = (time: number): string => {

  const currentTime = Math.floor(new Date().getTime() / 1000);
  const gap = currentTime - time;

  if (gap < ONEMINUTE) {
    return `${gap} sec ago`
  }
  else if (gap < ONEHOUR) {
    return `${Math.floor(gap / ONEMINUTE)} minute ago`
  }
  else if (gap < ONEDAY) {
    return `${Math.floor(gap / ONEHOUR)} hour ago`
  }
  else if (gap < ONEMONTH) {
    return `${Math.floor(gap / ONEDAY)} day ago`
  }

  return timeToDate(time * 1000);
}

// 날짜를 시간으로 변환
const timeToDate = (time: number) => {

  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
}

export {calculTimeAgo, timeToDate};