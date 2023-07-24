import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';

function Create() {
	const navigate = useNavigate();
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');

	const handleCreate = () => {
		const item = { title: Title, content: Content };
		// post는 두번째 인수값으로 데이터를 전달할 수 있다.
		axios
			.post('/api/community/create', item)
			.then((res) => {
				console.log(res);
				alert('글 저장에 성공했습니다.');
				navigate('/list');
				// navigate(-1);
			})
			.catch((err) => {
				console.log(err);
				alert('글 저장에 실패했습니다.');
			});
	};

	useEffect(() => {}, []);

	return (
		<Layout name={'Post'}>
			<label htmlFor='title'>Title</label>
			<input type='text' id='title' value={Title} onChange={(e) => setTitle(e.target.value)} />
			<br />
			<label htmlFor='content'>Content</label>
			<textarea
				name='content'
				id='content'
				cols='30'
				rows='3'
				value={Content}
				onChange={(e) => setContent(e.target.value)}
			></textarea>
			<br />
			<button onClick={handleCreate}>SEND</button>
		</Layout>
	);
}

export default Create;

/*
	[ CRUD ]
	- Create (저장)
	- Read (읽어오기)
	- Update (수정)
	- Delete (삭제)

	-> REST API를 활용하여 구조적으로 개선
*/
