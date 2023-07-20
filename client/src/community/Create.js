import axios from 'axios';
import { useState, useEffect } from 'react';
import Layout from '../common/Layout';

function Create() {
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');

	const handleCreate = () => {
		const item = { title: Title, content: Content };
		axios
			.post('/api/create', item)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
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
	Create (저장)
	Read (읽어오기)
	Update (수정)
	Delete (삭제)

	-> REST API
*/
