const express = require('express');
const apiRouter = express.Router();
const app = express();
let {
    MockData,
} = require('./../src/api/index.js')

// 设置cors跨域
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};

app.use(allowCrossDomain);

// 查询指标树（侧边导航栏）
apiRouter.post('/url/aaa/bbb/ccc', function(req, res) {
    res.json(MockData)
});


module.exports = apiRouter