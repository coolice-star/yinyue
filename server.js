const express = require('express');
const app = express();
const port = 3000;

// 设置静态文件目录
app.use(express.static('public'));
app.use('/music', express.static('music'));
app.use('/picture', express.static('picture'));  // 添加图片静态服务

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 