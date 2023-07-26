const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000; // 웹서버 구동을 5000번 포트로 응답받도록 설정

// 클라이언트로부터 보내진 데이터를 전달받도록 설정 (body-parser 설정)
// body 객체에서 문자열로 전달해야 한다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 react안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/community', require('./router/communityRouter')); // 커뮤니티 전용 라우터
app.use('/api/user', require('./router/userRouter')); // 유저 전용 라우터

app.listen(port, () => {
	// mongoose로 몽고디비 데이터베이스 연동까지 확인할 수 있다.
	mongoose
		.connect('mongodb+srv://decodelab:!abcd1234@cluster0.vm1kfyg.mongodb.net/')
		//접속 성공시
		.then(() => console.log(`Server app listening on port ${port} with MongoDB`))
		//접속 실패시
		.catch((err) => console.log(err));
});

/***** 라우터 설정 *****/
app.get('/', (req, res) => {
	//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	// __dirname: 현재 서버폴더의 경로를 자동으로 잡아준다.
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//어떤 URL에서 접속하더라도 화면이 뜨도록 설정
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// 클라이언트로부터 전달된 요청 라우터 Sample Test
app.post('/api/send', (req, res) => {
	console.log('전달받은 요청: ', req.body); // 요청객체
	res.json({ success: true, result: req.body.name + '성공' }); // 응답객체
});
