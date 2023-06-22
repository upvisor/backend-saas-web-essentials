export function formatDateToCron(date) {
    const minute = date.getMinutes()
    const hour = date.getHours() - 1
    const dayOfMonth = date.getDate()
    const month = date.getMonth() + 1
  
    return `${minute} ${hour} ${dayOfMonth} ${month} *`
}