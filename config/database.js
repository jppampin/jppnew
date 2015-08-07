module.exports = {
    development : 'mongodb://localhost/test',
    production : 'mongodb://'+ process.env.DBUSER +':'+ process.env.DBPASSWORD +'@ds031193.mongolab.com:31193/cancha2'
}