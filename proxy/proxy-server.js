const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

// Start Ultraviolet backend
require('./Ultraviolet/lib/index.cjs');

const app = express();

const NEW_SITE = 'https://proprogramer123.github.io/c00lgames/';

// Serve your main site static files (if you have a /public folder)
// app.use(express.static(path.join(__dirname, 'public')));

// Serve Ultraviolet's static client at /uv
app.use('/uv', express.static(path.join(__dirname, 'Ultraviolet/public')));

// Proxy ALL other requests to the new site
app.use(
  '/',
  createProxyMiddleware({
    target: NEW_SITE,
    changeOrigin: true,
    followRedirects: true,
    ws: true,
    onProxyReq: (proxyReq, req, res) => {
      // Optionally, modify headers or log requests here
    },
    onError: (err, req, res) => {
      res.status(500).send('Proxy error');
    },
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Ultraviolet client served at http://localhost:${PORT}/uv`);
});