export const durationFormat = (duration: any) => {
  // console.log(row, column, duration, index);
  const result = "-"; // 没有正常捕获到结束时间或正在访问
  // 如果完成记录的访问时间 visitDuration 有值
  if (duration) {
    duration = Math.round(duration - 0);
    let hour = 0;
    let min = 0;
    let sec: number = duration;
    if (sec >= 60) {
      min = Math.floor(sec / 60);
      sec = sec % 60;
    }
    if (min >= 60) {
      hour = Math.floor(min / 60);
      min = min % 60;
    }
    return `${hour ? hour + "时" : ""}${min ? min + "分" : ""}${sec}秒`;
  }
  return result;
};
