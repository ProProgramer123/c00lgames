const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Replace this with your new site's URL
const NEW_SITE = 'https://proprogramer123.github.io/c00lgames/';

// Redirect root to the new site
app.get('/', (req, res) => {
  res.redirect(NEW_SITE);
});

// Proxy all other requests to the new site
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
});