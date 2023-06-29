export function formatDateToCron(date) {
    const minute = date.getMinutes()
    const hour = date.getHours() - 4
    const dayOfMonth = date.getDate()
    const month = date.getMonth() + 1
  
    return `${minute} ${hour} ${dayOfMonth} ${month} *`
}