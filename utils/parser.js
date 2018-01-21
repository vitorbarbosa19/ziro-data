const formatCNPJ = require('./formatCNPJ')
const formatDate = require('./formatDate')

exports.parseQueryParams = (req, url) => {
	const { data, mes, ano } = formatDate(url.parse(req.url, true).query.dataCadastro)
	return {
		cadastro: url.parse(req.url, true).query.cadastro,
		dataCadastro: data,
		mes: mes,
		ano: ano,
		lojista: url.parse(req.url, true).query.lojista,
	  cnpj: formatCNPJ(url.parse(req.url, true).query.cnpj),
	  email: url.parse(req.url, true).query.email,
	  whatsapp: url.parse(req.url, true).query.whatsapp,
	  lojaFisica: url.parse(req.url, true).query.hasStore,
	  valorMaximoPago: url.parse(req.url, true).query.maxPay,
	  comoDescobriu: url.parse(req.url, true).query.referral,
	  tempoParaCompra: url.parse(req.url, true).query.when,
	  quantoPretendeGastar: url.parse(req.url, true).query.monthSpend
	}
}