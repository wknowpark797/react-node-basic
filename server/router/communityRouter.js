const express = require('express');
const router = express.Router();
const { Post } = require('../model/postSchema'); // 모델 생성자
const { Counter } = require('../model/counterSchema');

// Create
/*
	[ 글 저장 작업 흐름 ]
	1. Counter 모델에서부터 글번호를 가져온다.
		- body-parser로 제목, 본문을 가져와서 글 번호를 추가한 후 모델 인스턴스에 저장
		- 저장이 완료되면 카운터 모델에 있는 글번호 증가
*/
router.post('/create', (req, res) => {
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
					.exec()
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
router.get('/read', (req, res) => {
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
router.post('/detail', (req, res) => {
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

// Update
router.post('/update', (req, res) => {
	console.log('request: ', req);

	const item = {
		title: req.body.title,
		content: req.body.content,
	};

	Post.updateOne({ communityNum: req.body.id }, { $set: item })
		.exec()
		.then((doc) => {
			console.log(doc); // 수정된 데이터 확인
			res.json({ success: true });
		})
		.catch((err) => {
			res.json({ success: false });
		});
});

// Delete
router.post('/delete', (req, res) => {
	Post.deleteOne({ communityNum: req.body.id })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch(() => {
			res.json({ success: false });
		});
});

module.exports = router;
