const express = require('express');
const router = express.Router();
const { Post } = require('../model/postSchema'); // 모델 생성자
const { User } = require('../model/userSchema');
const { Counter } = require('../model/counterSchema');

// Create
/*
	[ 글 저장 작업 흐름 ]
	1. Counter 모델에서부터 글번호를 가져온다.
		- body-parser로 제목, 본문을 가져와서 글 번호를 추가한 후 모델 인스턴스에 저장
		- 저장이 완료되면 카운터 모델에 있는 글번호 증가
*/
router.post('/create', (req, res) => {
	const params = req.body;

	/*
		1. Counter 모델에서 communityNum을 찾은 다음 client에서 받은 요청객체 파라미터에 추가
		2. User collection에서 현재 로그인 사용자의 uid값으로 해당 유저 정보 document를 찾고 해당 document의 objectId값을 writer 속성에 추가
		3. 해당 Post 모델의 writer 프로퍼티 안에는 작성자 정보의 document가 참조된 모델객체를 저장하고 저장이 성공하면 counter collection의 communityNum값을 증가시킨다.
	*/

	// find: 모두 가져오기, findOne: 하나만 가져오기 (조건 필요)
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			params.communityNum = doc.communityNum;

			User.findOne({ uid: params.uid })
				.exec()
				.then((doc) => {
					params.writer = doc._id;
					const PostModel = new Post(params);

					PostModel.save().then(() => {
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
router.get('/read/:num', (req, res) => {
	Post.find()
		// writer에 해당하는 정보를 풀어서 제공
		.populate('writer')
		.sort({ createdAt: -1 })
		.limit(req.params.num)
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
router.get('/detail/:id', (req, res) => {
	console.log('request: ', req.body);

	Post.findOne({ communityNum: req.params.id })
		.populate('writer')
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
router.put('/update', (req, res) => {
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
// post - 두번째 인수로 파라미터를 보낸다.
// delete - 쿼리 스트링으로 삭제할 포스트의 객체값을 넘겨야 한다. (REST API)
router.delete('/delete/:id', (req, res) => {
	Post.deleteOne({ communityNum: req.params.id })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch(() => {
			res.json({ success: false });
		});
});

module.exports = router;

/*
	[ read, delete ]: get방식(params) - url로 쿼리스트링 전송
	[ create, update ]: post 방식
*/
