import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function List() {
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		axios.get('/api/community/read').then((res) => {
			console.log(res);
			setPosts(res.data.communityList);
		});
	}, []);

	return (
		<Layout name={'List'}>
			{Posts.map((post) => {
				return (
					<article key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
					</article>
				);
			})}
		</Layout>
	);
}

export default List;
