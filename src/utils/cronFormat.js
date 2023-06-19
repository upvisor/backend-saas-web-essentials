export function formatDateToCron(date) {
    const minute = date.getMinutes();
    const hour = date.getHours();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
    const dayOfWeek = date.getDay(); // 0 es Domingo, 1 es Lunes, ...
  
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} comando`;
}