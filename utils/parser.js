exports.parseQueryParams = (req, url) => {
	return {
		lojista: url.parse(req.url, true).query.lojista,
	  cnpj: url.parse(req.url, true).query.cnpj,
	  email: url.parse(req.url, true).query.email,
	  whatsapp: url.parse(req.url, true).query.whatsapp,
	  lojaFisica: url.parse(req.url, true).query.hasStore,
	  valorMaximoPago: url.parse(req.url, true).query.maxPay,
	  comoDescobriu: url.parse(req.url, true).query.referral,
	  tempoParaCompra: url.parse(req.url, true).query.when,
	  quantoPretendeGastar: url.parse(req.url, true).query.monthSpend
	}
}