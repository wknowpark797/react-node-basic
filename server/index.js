const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000; // 웹서버 구동을 5000번 포트로 응답받도록 설정

// 클라이언트로부터 보내진 데이터를 전달받도록 설정 (body-parser 설정)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 react안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../client/build')));

app.listen(port, () => {
	mongoose
		.connect('mongodb+srv://decodelab:!abcd1234@cluster0.vm1kfyg.mongodb.net/')
		//접속 성공시
		.then(() => console.log(`Server app listening on port ${port} with MongoDB`))
		//접속 실패시
		.catch((err) => console.log(err));
});

app.get('/', (req, res) => {
	//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//어떤 URL에서 접속하더라도 화면이 뜨도록 설정
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// 클라이언트로부터 전달된 요청 라우터
app.post('/api/send', (req, res) => {
	console.log('전달받은 요청: ', req.body);
	res.json({ success: true, result: req.body.name + '성공' });
});
