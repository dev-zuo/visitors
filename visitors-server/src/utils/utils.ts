import { HttpStatus } from '@nestjs/common';
/**
 * @description 获取时间查询 sql
 * @param startDate
 * @param endDate
 * @returns
 */
export const getTimeQuerySql = (startDate: string, endDate: string) => {
  const isNotDateFormat = /[^0-9\-]/g;
  if ([startDate, endDate].some((date) => isNotDateFormat.test(date))) {
    throw new Error('开始时间或结束时间格式错误');
  }

  if (startDate === endDate) {
    return `and DATE_FORMAT(time, '%Y-%m-%d') = '${startDate}' `;
  } else {
    // 时间间隔
    return `and DATE_FORMAT(time, '%Y-%m-%d') <= '${endDate}' and DATE_FORMAT(time, '%Y-%m-%d') >= '${startDate}' `;
  }
};

/**
 * @description 通用接口 500 处理
 */
export const resServerError = (res, err) => {
  // INTERNAL_SERVER_ERROR
  // 如果是以 500 的状态码返回，前端直接从 catch 逻辑，拿不到 res data
  // 所以这种状态码还是设置为 200
  res.status(HttpStatus.OK).json({
    code: 500,
    data: null,
    msg: '接口错误：' + err.message,
  });
};
