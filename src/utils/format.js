export const dateFormat = function (dateinit) {
  let formatStr = 'yyyy-mm-dd hh:ii:ss'
  if (dateinit === null || dateinit === 0 || dateinit === '' || dateinit === undefined) {
    return ''
  }
  const date = new Date(dateinit)
  const dateStr = {
    'y+': date.getFullYear(), // 年
    'm+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'i+': date.getMinutes(), // 分
    's+': date.getSeconds() // 秒
  }
  for (const item in dateStr) {
    if (new RegExp('(' + item + ')', 'i').test(formatStr)) {
      formatStr = formatStr.replace(
        RegExp.$1,
        dateStr[item].toString().length < 2 ? '0' + dateStr[item] : dateStr[item]
      )
    }
  }
  return formatStr
}
