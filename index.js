const app = require('./app')

const port = process.env.PORT || 5000;
// host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
app.listen(port, () => {

  console.log(`Server running on port ${port} `)

});