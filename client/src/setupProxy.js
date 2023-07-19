const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:5000', // 응답을 받을 서버 port
			changeOrigin: true,
		})
	);
};
