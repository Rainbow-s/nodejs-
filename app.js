// 引入express
const express=require('express');
const path=require('path');
const cors=require('cors');
const config=require('./config');
// 实例化
const app=express();
const {expressjwt}= require('express-jwt');
// 引入路由模块
const userRouter=require('./routes/user');
// app.use('传入中间件即为全局生效的中间件，每次调用都会触发')
app.use(cors());
// 部署静态资源目录
app.use(express.static(path.join(__dirname,'public')));
// 解析json格式请求体数据 中间件
app.use(express.json());
//解析 application/x-www-form-urlencoded 格式数据 中间件
app.use(express.urlencoded({extended:false}));
//解析jwt
app.use(expressjwt({secret:config.secretKey,algorithms:['HS256']}).unless({path:[/^\/api\//]}));
// 注册全局 调用时间统计中间件
app.use(async (req,res,next)=>{
    const start=new Date();
    await next();
    const ms=new Date() -start;
    console.log(`url:${req.url} method:${req.method} ms:${ms}ms`);
})
// 注册路由 
app.use(userRouter);
//错误级别中间件，防止项目异常，导致程序崩溃
app.use((err,req,res,next)=>{
    console.log('Error:'+err.message);
    if(err.status==401){
        return res.send({
            status:401,
            msg:'无效的token'
        })
    }
    res.send({
        status:500,
        msg:err.message?err.message:'服务器错误'
    })
})
app.listen(3000,()=>{
    console.log('server running！');
})