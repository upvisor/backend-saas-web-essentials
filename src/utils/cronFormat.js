export function formatDateToCron(date) {
    const minute = date.getMinutes()
    const hour = date.getHours()
    const dayOfMonth = date.getDate()
    const month = date.getMonth() + 1
    const dayOfWeek = date.getDay()
  
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
}