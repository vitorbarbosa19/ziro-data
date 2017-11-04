const url = require('url')

module.exports = (req, res) => {
  //set header to allow cross origin
  res.setHeader('Access-Control-Allow-Origin', '*')
  //stop annoying browser favicon request
  if(req.url === '/favicon.ico')
    res.end() 
  //verify type of request and decide which handler to pass it to
  const type = url.parse(req.url, true).query.type
  const handler = require('./utils/handler')
  if(type === 'lojistas') {
    handler.resellers(req, res, url)
  }
  else if(type === 'fornecedores') {
    handler.suppliers(req, res, type) 
  }
  else
    res.end('Especifique um tipo: lojistas ou fornecedores')
}

//remember to deploy with --dotenv
