import express from 'express';
import { dirname } from 'path';
import { fileURLtoPath } from 'url';

const app = express();
const PORT = 3000;

const __dirname = dirname(fileURLtoPath(import.meta.url))

app.use(express.static('./dist'));


app.get('*', (req, res) => {
	res.sendFile('./dist/index.html', { root: __dirname })
})

app.use((req, res) => {
	res.status(404).send('./dist');
});

app.listen(PORT, function() {
	console.log('running');
});