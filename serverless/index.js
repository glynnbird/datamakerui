const datamaker = require('datamaker')


exports.main = function(args) {
  if (!args.template) {
    return Promise.reject({statusCode: 400})
  }
  const format = 'csv'
  const iterations = 100
  let str = args.header + '\n'
  return new Promise((resolve, reject) => {
    datamaker
      .generate(args.template, format, iterations)
      .on('data', (d) => { str += d + '\n' })
      .on('end', (d) => { 
        resolve({
          statusCode: 200, 
          headers: { 
            'content-type': 'text/csv'//,
            //'content-disposition': 'attachment; filename=data.csv'
          },
          body: str
        })
      })
  })

  

}