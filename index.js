require('dotenv').config()
const request = require('request')
const url = require('url') 
const sheetId = process.env.SHEET_ID
const apiKey = process.env.API_KEY

module.exports = (req, res) => {
  const range = url.parse(req.url, true).query.range
  request(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`, (error, response, body) => {
    if(!error) {      
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.end(body)
    }
    else
      console.log(error)
  })
}
