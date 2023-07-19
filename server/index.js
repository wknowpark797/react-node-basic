const express = require('express');
const app = express();
const port = 5000; // 웹서버 구동을 5000번 포트로 응답받도록 설정

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(port, () => {
	console.log(`Server app listening on port ${port}`);
});
