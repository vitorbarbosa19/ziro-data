const formatDate = (date) => {
	const day = date.substr(8,2)
	const monthNumber = new Date(date).getMonth()
	let month
	switch (monthNumber) {
		case 0:
			month = 'Jan'
			break
		case 1:
			month = 'Fev'
			break
		case 2:
			month = 'Mar'
			break
		case 3:
			month = 'Abr'
			break
		case 4:
			month = 'Mai'
			break
		case 5:
			month = 'Jun'
			break
		case 6:
			month = 'Jul'
			break
		case 7:
			month = 'Ago'
			break
		case 8:
			month = 'Set'
			break
		case 9:
			month = 'Out'
			break
		case 1:
			month = 'Nov'
			break
		case 11:
			month = 'Dez'
			break	
	}
	const year = new Date(date).getFullYear()
	const time = date.substr(11,8)
	return {
		data: `${day}/${month}/${year} ${time}`,
		mes: month,
		ano: year
	}
}

module.exports = formatDate
