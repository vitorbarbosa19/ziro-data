require('dotenv').config()
const request = require('request')
const url = require('url') 
const resellersSheetId = process.env.RESELLERS_SHEET_ID
const suppliersSheetId = process.env.SUPPLIERS_SHEET_ID
const apiKey = process.env.API_KEY

module.exports = (req, res) => {
  const type = url.parse(req.url, true).query.type
  res.setHeader('Access-Control-Allow-Origin', '*')
  if(type === 'lojistas') {
    request(`https://sheets.googleapis.com/v4/spreadsheets/${resellersSheetId}/values/${type}?key=${apiKey}`, (error, response, body) => {
      if(!error) {      
        res.end(body)
      }
      else
        console.log(error)
    })
  }
  else if(type === 'fornecedores') {
    request(`https://sheets.googleapis.com/v4/spreadsheets/${suppliersSheetId}/values/${type}?key=${apiKey}`, (error, response, body) => {
      if(!error) {      
        res.end(body)
      }
      else
        console.log(error)
    })
  }
  else
    res.end('Especifique um tipo: Lojistas ou Fornecedores')
}

//remember to deploy with --dotenv
