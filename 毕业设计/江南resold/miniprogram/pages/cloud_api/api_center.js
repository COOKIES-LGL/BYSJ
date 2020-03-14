

import { Api } from './api.js'
import { Base } from "../base/common.js"
const base = new Base

class cloudapi{
  constructor() {
    "use strict"
     this._db = base.setdb();
  }
  

  saveUserData(param) {//添加用户数据
     var that = this;
     var DATE = base.formatDate(new Date());
     this._db.collection('user').where({
        _openid: wx.getStorageSync("OPENID")
     }).get().then(res => {
        if(res.data.length>0){//已注册过的用户
           return;
        }else{
           db.collection('user').add({//新用户
              data: {
                 userinfo: param,
                 registTime: DATE,
              },
              success(res) {
                 console.log(res)
              }
           })
        }
     }).catch (res=> {
        console.log(res);
     })    
   }
   saveAppUserInfo(obj){
      this._db.collection('appUserInfo').where({
         _openid: wx.getStorageSync("OPENID")
      }).get().then(res => {
         if (res.data.length > 0) {//已填写过的表单用户
            //批量更新表单已经移到云函数开发
            // this._db.collection('appUserInfo').doc("_openid").updata({//更新表单
            //    data: {
            //       phone: obj.phone,
            //       wechat: obj.wechat,
            //       college: obj.college,
            //       grade: obj.grade,
            //       major: obj.major,
            //    },
            //    success(res) {
            //       console.log(res)
            //    }
            // })
         } else {
            this._db.collection('appUserInfo').add({//新用户 新建表单
               data: {
                  heartNum: 0,
                  phone: obj.input_phone,
                  wechat:obj.input_wechat,
                  college:obj.collegeValie,
                  grade:obj.radio_group,
                  major:obj.majorValue,
               },
               success(res) {
                  console.log(res)
               }
            })
         }
      }).catch(res => {
         console.log(res);
      })     
   }
   updateHeartNum(num) {//更新点赞数据
      wx.cloud.callFunction({
         name: 'updateData',
         data:{
            action: 'update_heartNum',
            heartNum:num
         },
         fail: err => {
            console.error('[云函数] [login] 调用失败', err)
         }
      })
   
   }
   queryAppUserInfo(){//查询用户平台信息
      this._db.collection('appUserInfo').where({
         _openid: wx.getStorageSync("OPENID")
      }).get({  
         success: res => {
            wx.setStorageSync("appUserInfo", res.data);
            console.log('[数据库] [查询记录] 成功: ', res.data)
         },
         fail: err => {
            console.error('[数据库] [查询记录] 失败：', err)
         }
      })
   }
}
  
export { cloudapi }
