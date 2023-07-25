import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Edit() {
	const user = useSelector((store) => store.user);
	const params = useParams();
	const navigate = useNavigate();

	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');
	const [Detail, setDetail] = useState({});

	const handleUpdate = () => {
		if (Title.trim() === '' || Content.trim() === '') {
			return alert('모든 항목을 입력하세요.');
		}

		const updateItem = {
			title: Title,
			content: Content,
			id: params.id,
		};

		axios
			.post('/api/community/update', updateItem)
			.then((res) => {
				if (res.data.success) {
					alert('글수정을 완료했습니다.');
					navigate(`/detail/${params.id}`);
				} else {
					alert('글수정에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (user.uid === '') navigate('/');

		axios
			.post('/api/community/detail', params)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.detail);
				} else {
					alert('상세글 호출에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	}, [navigate, user, params]);

	useEffect(() => {
		// 서버쪽으로 새로운 응답이 넘어올 때
		console.log(Detail);

		setTitle(Detail.title);
		setContent(Detail.content);
	}, [Detail]);

	return (
		<Layout name={'Post'}>
			<label htmlFor='title'>Title</label>
			<input
				type='text'
				id='title'
				value={Title || ''}
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
			<br />
			<label htmlFor='content'>Content</label>
			<textarea
				id='content'
				cols='30'
				rows='3'
				value={Content || ''}
				onChange={(e) => {
					setContent(e.target.value);
				}}
			></textarea>
			<br />

			<button onClick={handleUpdate}>UPDATE</button>
		</Layout>
	);
}

export default Edit;
