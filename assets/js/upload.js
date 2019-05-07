/*
 * @Description: oss对象上传
 * @Author: chenchen
 * @Date: 2019-05-07 14:17:31
 * @LastEditTime: 2019-05-07 16:15:49
 */
import OSS from 'ali-oss';

export class Upload {

    constructor() {
        this.client = new OSS({
            region:'oss-cn-hangzhou',
            secure: true,
            accessKeyId: "LTAIY6Ks3Ek8gMjP",
            accessKeySecret: "Hr1YevigvxkXrjkF76YC6jn0GfRm3x",
            bucket: "blog-cc-oss",
            // endpoint: "https://chenchenblog.com",
            // cname: true,
            // timeout: 60
        });

    }



}

export class Uploadfile extends Upload {
    constructor(location, file) {
        super();
        this.location = location;
        this.file = file;
    }

    static generateBuffer() {
        console.log(this.file);

        var bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], { type: "image/png" });


    }

   getUuid() {
        var len = 32; //32长度
        var radix = 16; //16进制
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }

   async  uploadFile(selectedFile,nameimg) {

        const file = selectedFile;
        const name = nameimg;
        var type = name.substring(name.lastIndexOf('.') + 1)

        var storeAs = "upload/" + this.getUuid() + '.' + type;

        
        

        try {
            return await this.client.multipartUpload(storeAs, file,
                {
                    progress: (p)=>{
                        console.log(p);
                        
                    }
                })
        } catch (error) {
            console.log(error);

        }
    }

}

