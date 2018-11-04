const formatDate = (date) => {
	const day = date.substr(8,2)
	const monthNumber = new Date(date).getMonth()
	let month
	switch (monthNumber) {
		case 0:
			month = 'jan'
			break
		case 1:
			month = 'fev'
			break
		case 2:
			month = 'mar'
			break
		case 3:
			month = 'abr'
			break
		case 4:
			month = 'mai'
			break
		case 5:
			month = 'jun'
			break
		case 6:
			month = 'jul'
			break
		case 7:
			month = 'ago'
			break
		case 8:
			month = 'set'
			break
		case 9:
			month = 'out'
			break
		case 10:
			month = 'nov'
			break
		case 11:
			month = 'dez'
			break	
	}
	const year = new Date(date).getFullYear()
	const time = date.substr(11,8)
	return {
		data_hora: `${day}/${month}/${year} ${time}`,
		data: `${day}/${month}/${year}`,
		mes: month,
		ano: year
	}
}

module.exports = formatDate
