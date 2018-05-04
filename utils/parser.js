const formatCNPJ = require('./formatCNPJ')
const formatDate = require('./formatDate')

exports.parseQueryParams = (req, url) => {
	console.log(url.parse(req.url, true).query.dataCadastro)
	const { data_hora, data, mes, ano } = formatDate(url.parse(req.url, true).query.dataCadastro)
	return {
		email: url.parse(req.url, true).query.email,
		cadastro: url.parse(req.url, true).query.cadastro,
		data_hora_cadastro: data_hora,
		data_cadastro: data,
		mes: mes,
		ano: ano,
		lojista: url.parse(req.url, true).query.lojista,
	  cnpj: formatCNPJ(url.parse(req.url, true).query.cnpj),
	  whatsapp: url.parse(req.url, true).query.whatsapp,
	  como_descobriu: url.parse(req.url, true).query.referral,
	  tem_loja_fisica: url.parse(req.url, true).query.hasStore,
	  disposicao_a_pagar: url.parse(req.url, true).query.maxPay,
	  tempo_para_compra: url.parse(req.url, true).query.when,
	  gasto_pretendido: url.parse(req.url, true).query.monthSpend
	}
}

/* 
http://localhost:3000/?type=lojistas&email=lidianesrreis@gmail.com&cadastro=00uewqe7hurEsyN260h7&dataCadastro=04/Mai/2018%2014:18:56&lojista=Lidiane%20dos%20Reis&cnpj=30.144.102/0001-41&whatsapp=82996302060&referral=Indica%C3%A7%C3%A3o&hasStore=Sim&maxPay=At%C3%A9%20R$200,00&when=O%20quanto%20antes&monthSpend=At%C3%A9%20R$%2015.000,00
*/