const jwt=require('jsonwebtoken');
const config=require('../config');
const db=require('../db');
// 注册接口
exports.register=function(req,res){
    let username=req.body.username;
    let password=req.body.password;
    let sqlStr='insert into users(username,password) values (?,?)';
    db.query(sqlStr,[username,password],(err,result)=>{
        if(err){
            return res.send({
                status:500,
                msg:'注册失败',
                data:err,
            })
        }
        if(result.affectedRows===1){
            res.send({
                status:200,
                msg:'注册成功',
            })
        }else{
            return res.send({
                status:500,
                msg:'注册失败',
                data:result,
            })
        }
    })
    
}
// 登录
exports.login=function(req,res){
    console.log(req.body);
    let username=req.body.username;
    let password=req.body.password;
    let token=jwt.sign({username,isLogin:true},config.secretKey,{algorithm:'HS256',expiresIn:'24h'});
    res.send({
        status:200,
        msg:'登录成功',
        data:token
    })
}
// 获取用户信息
exports.getUserMessage=function(req,res){
    let jwtInfo=req.auth;
    res.send({
        status:200,
        msg:'获取用户信息成功',
        data:jwtInfo
    })
}