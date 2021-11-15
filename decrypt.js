var fs = require("fs");
var path = require("path")
var pako = require("pako")
var xxtea = require("xxtea-node");
const { exit } = require("process");

const arr = process.argv;
const KEY = arr[2];
const TARGET = arr[3];

if (!KEY) {
    console.error('没有key');
    exit();
}

if (!TARGET) {
    console.error('没有目标');
    exit();
}

decrypt = (fileUrl) => {
    fs.readFile(fileUrl, (error, data) => {
        if (error) {
            console.log("读取文件失败");
            return;
        }
        const byteKey = xxtea.toBytes(KEY);
        let res = xxtea.decrypt(data, byteKey);
        if (res == null) {
            console.log("解密失败:" + fileurl);
            return;
        }

        // 数据压缩
        res = pako.inflate(res);

        const newFileUrl = fileUrl + '.js';
        fs.writeFile(newFileUrl, res, () => {
            if (error) {
                console.log('存储失败:', newFileUrl);
                return;
            }
            console.log('存储成功:', newFileUrl);
        });
    })
}

console.log('开始解密:', TARGET);
decrypt(TARGET);