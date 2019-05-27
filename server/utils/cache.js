/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-26 21:56:53
 * @LastEditTime: 2019-05-26 23:15:00
 */
let redis = require('redis');
let client = null;
/**
   * 创建一个redis连接
   */
  try {
    client = redis.createClient(6379, 'localhost');
  } catch (error) {
    console.log("redis连接错误", error);
  }


  // 鉴权处理(如果redis设置密码的话)
  client.auth('');


  //redis连接数据库发生错误
  client.on("error", (error) => {
    console.error.bind(console, error, "redis数据库连接失败")
  })


   redis = {};

  redis.set = async (key,value)=>{
      try {
        await client.set(key, JSON.stringify(value))
      } catch (error) {
          console.log(error);
          
      }
    
  }

  let getValue = async (key)=>{
    let doc =  await new Promise((resovle,reject)=>{
          client.get(key,(err,v)=>{
              if (err) {
                  return reject(err)
              }
              return resovle(v)
          })
      })

      return JSON.parse(doc);

  }


  redis.get = async (key)=>{
      let value = null;
      try {
       value =  await getValue(key)
      } catch (error) {
          console.log(error);
          
      }
     return value
  }




  






module.exports = redis;