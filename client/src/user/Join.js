import Layout from '../common/Layout';
import { useState } from 'react';
import firebase from '../firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BtnSet = styled.nav`
	margin-top: 20px;
	display: flex;
	gap: 20px;
`;

function Join() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd1, setPwd1] = useState('');
	const [Pwd2, setPwd2] = useState('');
	const [Name, setName] = useState('');

	const handleJoin = async () => {
		if (!(Name && Email && Pwd1 && Pwd2)) return alert('모든 항목을 입력하세요.');
		if (Pwd1 !== Pwd2) return alert('비밀번호 두개를 동일하게 입력하세요.');

		// 위의 조건을 통과하면 필요한 정보값을 firebase에 등록처리 (이메일, 비밀번호 정보만 필요)
		const createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd1);
		await createdUser.user.updateProfile({ displayName: Name });
		console.log(createdUser.user);
		alert('성공적으로 회원가입이 완료되었습니다.');
		navigate('/login');
	};

	return (
		<Layout name={'Join'}>
			<input
				type='email'
				value={Email}
				placeholder='이메일 주소를 입력하세요.'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd1}
				placeholder='비밀번호를 입력하세요.'
				onChange={(e) => setPwd1(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd2}
				placeholder='비밀번호를 재입력하세요.'
				onChange={(e) => setPwd2(e.target.value)}
			/>
			<input
				type='text'
				value={Name}
				placeholder='사용자 이름을 입력하세요.'
				onChange={(e) => setName(e.target.value)}
			/>

			<BtnSet>
				<button onClick={() => navigate(-1)}>취소</button>
				<button onClick={handleJoin}>회원가입</button>
			</BtnSet>
		</Layout>
	);
}

export default Join;
