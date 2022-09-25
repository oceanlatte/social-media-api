const formatDate = date => {
  console.log('date timestamp as is:', date);

  let dateString = date.toString();
  console.log('new date string:', dateString);

  return `${new Date(dateString).getMonth() + 1}/${new Date(dateString).getDate()}/${new Date(
    dateString).getFullYear()} @ ${new Date(dateString).toLocaleTimeString()}`
}

module.exports = formatDate;