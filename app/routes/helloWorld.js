module.exports = application => {
    application.get('/public/', (req, res) => res.json({msg: 'Hello World'}));
}