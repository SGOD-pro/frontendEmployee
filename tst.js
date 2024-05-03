const newDate = new Date("2024-01-01T00:00:00.000Z");
const options = { day: '2-digit', month: 'short', year: 'numeric' };
let formattedDate = newDate.toLocaleDateString('en-GB', options);
formattedDate=formattedDate.split(' ')
formattedDate=formattedDate.join('/')

console.log(formattedDate);