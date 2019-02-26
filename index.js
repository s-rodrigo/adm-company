require("dotenv-safe").load();
let app = require('./config/server');

app.listen(8080, () => console.log('Server On'));
