import Layout from './Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.article`
	width: 100%;
	padding: 30px 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
	margin-bottom: 50px;
`;

function Main() {
	const [List, setList] = useState([]);

	useEffect(() => {
		axios.post('/api/community/read', { count: 3 }).then((res) => {
			if (res.data.success) {
				setList(res.data.communityList);
			}
		});
	}, []);

	useEffect(() => {
		console.log(List);
	}, [List]);

	return (
		<Layout name={'Main'}>
			{List.map((post) => {
				return (
					<Item key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
						<p>작성자: {post.writer.displayName}</p>
						<p>작성일: {post.createdAt.split('T')[0]}</p>
					</Item>
				);
			})}
		</Layout>
	);
}

export default Main;
