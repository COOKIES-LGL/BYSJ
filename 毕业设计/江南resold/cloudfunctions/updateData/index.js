// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database({
   env: 'resold-822f1b'
});
const wxContext = cloud.getWXContext();

function update_heartNum(event){
   try { // data 传入需要局部更新的数据
      return db.collection('appUserInfo').where({ _openid:wxContext.OPENID}).update({
         data: {
            heartNum: event.heartNum,
         },
         success(res) {
            console.log(res)
         }
      })
   } catch (e) {
      console.error(e)
   }
}

function update_appUserInfo(event){
   try { // data 传入需要局部更新的数据
      return  db.collection('appUserInfo').doc('id字段').update({
         data: {
            isHave: true
         }
      })
   } catch (e) {
      console.error(e)
   }
}

function update_order(event){
   try { // data 传入需要局部更新的数据
      return db.collection('appUserInfo').doc('id字段').update({
         data: {
            isHave: true
         }
      })
   } catch (e) {
      console.error(e)
   }
}

exports.main = async (event, context) => {
   
   switch (event.action) {
      case 'update_heartNum': {
         return update_heartNum(event)
      }
      case 'update_appUserInfo': {
         return update_appUserInfo(event)
      }
      case 'update_order': {
         return update_order(event)
      }
      default: {
         return ;
      }
   }
}