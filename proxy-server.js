const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy all requests starting with /api to the target URL
app.use('/api', createProxyMiddleware({
  target: 'https://c00lgames.onrender.com', // Change this to your target URL
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

app.get('/', (req, res) => {
  res.send('Proxy server is running. Use /api/your-path to proxy requests.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});