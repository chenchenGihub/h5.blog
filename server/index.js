/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-10 18:50:38
 * @LastEditTime: 2019-05-26 21:57:47
 */
const http = require('http')
const express = require('express')
const consola = require('consola')
const mongoose = require('mongoose')

const {
  Nuxt,
  Builder
} = require('nuxt')
const app = express()
const bodyParser = require('body-parser')
const proxy = require('http-proxy-middleware');
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const { DBURL, REDIS_HOST, REDIS_PORT } = require('./config')

const api = require('./api')

const { filter } = require('./middleware/filter')

const log4js = require('./log/log');



async function start() {


  

  /**
   * 创建一个mongodb连接
   */
  mongoose.connect(DBURL, { useNewUrlParser: true });

  const con = mongoose.connection;

  //mongodb连接数据库发生错误
  con.on("error", console.error.bind(console, "mongodb数据库连接失败"));

  con.once("open", () => {
    consola.ready({
      message: `数据库连接成功`,
      badge: true
    })
  })

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host,
    port
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  //将前端json参数转换为json或者是urlencoded
  app.use(bodyParser.json())

  // app.use('/api', proxy({target: 'http://localhost:3000', changeOrigin: true}));



  app.use('/api', (req, res, next) => {

    //   try {
    //  let a =   await client.get("testLists");
    //  console.log(a);

    //   } catch (error) {
    //     console.log(error);

    //   }


    next();

  }, api)

  // Give nuxt middleware to express
  app.use(nuxt.render);

  const server = http.createServer(app)
  const io = require('socket.io').listen(server)


  // Listen the server
  server.listen(port, host)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

}
start()
