require('dotenv').config()

exports.resellers = (req, res, url) => {
	//require basic modules
	const async = require('async')
  const GoogleSpreadsheet = require('google-spreadsheet')
  //receive all parsed query params as lead information to be stored in google sheet and Okta
  const parser = require('./parser')
	const leadInfo = parser.parseQueryParams(req, url)
  //create a new instance of google spreadsheet's object
  const spreadsheet = new GoogleSpreadsheet(process.env.RESELLERS_SHEET_ID)
		//declare callback to handle error during async execution
  const errorCallback = (error) => {
		res.end(JSON.stringify(error.response.data))
	}
		//invoke several async functions to be executed in series
  async.series([
  	//authenticate with google api
    (callback) => {
      const creds = require('./api_credentials.js')
      spreadsheet.useServiceAccountAuth(creds, callback)
    },
    //save lead information by adding new row to google sheet
    (callback) => {
      spreadsheet.addRow(1, leadInfo, (error, rows) => {
        if(error)
          errorCallback(error)
        callback(null, 'sheet')
      })
    },
    //create new user via Okta api
    (callback) => {
      const axios = require('axios')
      axios({
        url: `${process.env.OKTA_URL}/api/v1/users`,
        method: 'post',
        headers: {
          'Authorization': `SSWS ${process.env.OKTA_TOKEN}`
        },
        data: {
          'profile': {
            'firstName': leadInfo.firstName,
            'lastName': leadInfo.lastName,
            'email': leadInfo.email,
            'login': leadInfo.email,
          },
          'credentials': {
            'password': leadInfo.cnpj
          }
        }
      })
      .then( (response) => {
        res.end(JSON.stringify(response.data))
      })
      .catch( (error) => {
        errorCallback(error)
      })
    }
  ], (error) => {
    errorCallback(error)
  })
}

exports.suppliers = (req, res, type) => {
  const request = require('request')
  request(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.SUPPLIERS_SHEET_ID}/values/${type}?key=${process.env.API_KEY}`,
    (error, response, body) => {
      if(!error)
        res.end(body)
      else
        console.log(error)
  })
}

exports.cloudinary = (req, res) => {
  const url = require('url')
  const request = require('request')
  // get query params and fetch images from cloudinary
  const brand = url.parse(req.url, true).query.brand
  const next = url.parse(req.url, true).query.next
  // request next page of results if the 'next' param is present
  if (next) {
    request(`${process.env.CLOUDINARY_URL}${brand}?next_cursor=${next}`, (error, response, body) => {
      if (!error)
        res.end(body)
      else
        console.log(error)
    })
  }
  else { 
    request(`${process.env.CLOUDINARY_URL}${brand}`, (error, response, body) => {
      if (!error)
        res.end(body)
      else
        console.log(error)
    })
  }
}

















































































