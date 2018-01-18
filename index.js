const url = require('url')

module.exports = (req, res) => {
  //set header to allow cross origin
  res.setHeader('Access-Control-Allow-Origin', '*')
  //stop annoying browser favicon request
  if (req.url === '/favicon.ico')
    res.end() 
  //verify type of request and decide which handler to pass it to
  const type = url.parse(req.url, true).query.type
  const handler = require('./utils/handler')
  switch (type) {
    case 'lojistas':
      handler.resellers(req, res, url)
      break
    case 'fornecedores':
      handler.suppliers(req, res, type)
      break
    case 'cloudinary':
      handler.cloudinary(req, res)
      break
    default:
      res.end('Especifique um tipo: lojistas, fornecedores ou cloudinary')
  }
}

//If deploying to Now, remember to use --dotenv
