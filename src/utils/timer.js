// 时间格式化

//获取今年第一天
export const getYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  const firstMonth = year + "-" + "01" + "-" + "01";
  return firstMonth;
};

//获取当月第一天
export function getCurrentMonthFirst() {
  const date = new Date();
  date.setDate(1);
  let month = parseInt(date.getMonth() + 1);
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return date.getFullYear() + "-" + month + "-" + day;
}

// 获取本周第一天
export const getWeek = () => {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + 1);

  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;

  const begin = date.getFullYear() + "-" + month + "-" + day;
  return begin;
};

// 获取今天的时间
export const getCurrentDay = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;
  return year + "-" + month + "-" + day;
};
