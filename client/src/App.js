import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Main from './common/Main';
import List from './community/List';
import Create from './community/Create';
import GlobalStyle from './globalStyle';
import Detail from './community/Detail';
import Edit from './community/Edit';
import Join from './user/Join';
import Login from './user/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginUser, logoutUser } from './redux/userSlice';
import firebase from './firebase';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// 파이어베이스에서 인증된 유저 정보 가져오기(로그인 정보)
		firebase.auth().onAuthStateChanged((userInfo) => {
			console.log(userInfo);

			if (userInfo === null) dispatch(logoutUser());
			else dispatch(loginUser(userInfo.multiFactor.user));
		});
	}, [dispatch]);

	useEffect(() => {
		// firebase.auth().signOut(); // 파이어베이스 로그아웃
	}, []);

	return (
		<>
			<GlobalStyle />
			<Header />

			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				<Route path='/detail/:id' element={<Detail />} />
				<Route path='/edit/:id' element={<Edit />} />
				<Route path='/join' element={<Join />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
