const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000; // 웹서버 구동을 5000번 포트로 응답받도록 설정
const { Post } = require('./model/postSchema'); // 모델 생성자
const { Counter } = require('./model/counterSchema');

// 클라이언트로부터 보내진 데이터를 전달받도록 설정 (body-parser 설정)
// body 객체에서 문자열로 전달해야 한다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 react안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../client/build')));

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

// Create
/*
	[ 글 저장 작업 흐름 ]
	1. Counter 모델에서부터 글번호를 가져온다.
		- body-parser로 제목, 본문을 가져와서 글 번호를 추가한 후 모델 인스턴스에 저장
		- 저장이 완료되면 카운터 모델에 있는 글번호 증가
*/
app.post('/api/create', (req, res) => {
	console.log('request: ', req.body);

	// find: 모두 가져오기, findOne: 하나만 가져오기 (조건 필요)
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			const PostModel = new Post({
				title: req.body.title,
				content: req.body.content,
				communityNum: doc.communityNum,
			});

			// 포스트 저장, 카운터값 증가
			PostModel.save().then(() => {
				// update: $inc(기존값을 증가), $dec(기존값을 감소), $set(새로운값으로 변경)
				Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
					.then(() => {
						res.json({ success: true });
					})
					.catch(() => {
						res.json({ success: false });
					});
			});
		});

	/*
		// PostSchema가 적용된 Post모델 생성자를 통해 저장 모델 인스턴스 생성
		const PostModel = new Post({
			title: req.body.title,
			content: req.body.content,
		});

		// 생성된 모델 인스턴스로부터 save 명령어로 DB 저장 (Promise 반환)
		PostModel.save()
			.then(() => res.json({ success: true }))
			.catch(() => res.json({ success: false }));
	*/
});

// Read - find() => Promise 반환
app.post('/api/read', (req, res) => {
	Post.find()
		.exec()
		.then((doc) => {
			console.log(doc);
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

// Detail
app.post('/api/detail', (req, res) => {
	console.log('request: ', req.body);

	Post.findOne({ communityNum: req.body.id })
		.exec()
		.then((doc) => {
			console.log(doc);
			res.json({ success: true, detail: doc });
		})
		.catch((err) => {
			res.json({ success: false, err: err });
		});
});
