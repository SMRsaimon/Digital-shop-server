const app = require('./app')

const port = process.env.PORT || 5000;
// host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
app.listen(port, () => {

  console.log(`Server running on port ${port} `)

});




// server git Link :
// https://github.com/Porgramming-Hero-web-course/full-stack-server-SMRsaimon


// Clink site git Link 
// https://github.com/Porgramming-Hero-web-course/full-stack-client-SMRsaimon