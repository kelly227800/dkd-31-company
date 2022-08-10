export function timeFormat(date) {
  if (!date || typeof date === "string") {
    this.error("参数异常，请检查...");
  }
  var y = date.getFullYear(); //年
  var m = date.getMonth() + 1; //月
  var d = date.getDate(); //日
  var h = date.getHours();
  var mm = date.getMinutes();
  var s = date.getSeconds();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  h = h < 10 ? "0" + h : h;
  mm = mm < 10 ? "0" + mm : mm;
  s = s < 10 ? "0" + s : s;

  return y + "-" + m + "-" + d ;
}
function timeFormats(date) {
  if (!date || typeof date === "string") {
    this.error("参数异常，请检查...");
  }
  var y = date.getFullYear(); //年
  var m = date.getMonth() + 1; //月
  var d = date.getDate(); //日
  var h = date.getHours();
  var mm = date.getMinutes();
  var s = date.getSeconds();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  h = h < 10 ? "0" + h : h;
  mm = mm < 10 ? "0" + mm : mm;
  s = s < 10 ? "0" + s : s;

  return y + "-" + m + "-" + d ;
}
export function getFirstDayOfMonth(date) {
  date.setDate(1);
  return timeFormats(date);
}
