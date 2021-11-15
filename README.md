# CocosCrear jsc decrypt

## 对CocosCreator构建后生成的jsc文件解密成js文件，需要构建时的 脚本加密密钥

### 1.安装node.js
### 2.安装npm包
npm install
### 3.执行如下命令解密
node decrypt.js 加密密钥 jsc路径

### eg:
node decrypt.js 9f46b605-dae3-41 ./index.jsc