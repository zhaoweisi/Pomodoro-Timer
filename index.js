const express = require('express');

const app = express();


app.get('/', (req, res) => {
	res.send({hi: 'there'})
});


// listen to environmetn port when delploy or 5000 if in development
const PORT = process.env.PORT || 5000;

app.listen(PORT)


