const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

module.exports = async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing URL");

  try {
    const proxyList = await fetch("https://api.proxyscrape.com/?request=displayproxies&proxytype=http&timeout=5000")
      .then(r => r.text());
    const proxies = proxyList.split("\n").filter(Boolean);
    const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
    const agent = new HttpsProxyAgent("http://" + randomProxy);

    const proxiedResponse = await fetch(targetUrl, { agent });
    const body = await proxiedResponse.text();
    res.setHeader("Content-Type", "text/html");
    res.send(body);
  } catch (err) {
    res.status(500).send("Proxy failed: " + err.message);
  }
};
