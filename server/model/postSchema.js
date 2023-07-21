/*
  [ 데이터 베이스 ]

  - table 형식의 DB
    - ( Oracle, mySQL, msSQL, mariaDB )
    - SQL 표준 문법을 통해 데이터 입출력
    - RDBMS

  - json 형식의 DB
    - ( MongoDB )
    - SQL 표준 문법이 아닌 자바스크립트 구문으로 데이터 입출력
    - NoSQL

  - Model
    - DB에 저장되는 데이터 객체

  - Schema
    - 데이터베이스에 저장될 자료형식, 키값을 강제하는 시스템적인 틀
*/

const mongoose = require('mongoose');

// 게시글 객체가 저장될 스키마 구조를 생성
const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		communityNum: Number,
	},
	{ collection: 'Posts' }
);

// 게시글 스키마 구조가 적용될 모델 생성자를 만든 뒤 export
const Post = mongoose.model('Post', postSchema);
module.exports = { Post };
