const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

const proxyList = [
  "http://134.209.29.120:3128",
  "http://103.251.58.60:35101",
  "http://185.199.231.45:8383"
];

function getRandomProxy() {
  return proxyList[Math.floor(Math.random() * proxyList.length)];
}

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("No URL provided.");

  const proxy = getRandomProxy();
  const agent = new HttpsProxyAgent(proxy);

  try {
    const response = await fetch(url, { agent });
    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
