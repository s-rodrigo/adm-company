require("dotenv-safe").load();
let app = require('./config/server');

const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log('Server On in ' + PORT);
