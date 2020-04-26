// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database({
   env: 'resold-822f1b'
});
const wxContext = cloud.getWXContext();

function update_heartNum(event){
   try { // data 传入需要局部更新的数据
      return db.collection('appUserInfo').doc(event._id).update({
         data: {
            _openid: wxContext.OPENID,
            heartNum: event.heartNum,
         },
         success(res) {
            console.log(res)
         },
         fail(res){
            console.log(res,"更新失败！")
         }
      })
   } catch (e) {
      console.error(e)
   }
}

function update_appUserInfo(event){
   var formData = event.formData;
   try { // data 传入需要局部更新的数据
      return db.collection('appUserInfo').doc(event._id).update({
         data: {
            _openid: wxContext.OPENID,
            phone: formData.input_phone,
            wechat: formData.input_wechat,
            college: formData.collegeValue,
            major: formData.majorValue,
            grade: formData.radio_group  
         },
         success(res) {
            console.log(res)
         }
      })
   } catch (e) {
      console.error(e)
   }
}

function bingoOrder(event){
   try { // data 传入需要局部更新的数据
      return db.collection('sendOrders').doc(event.obj._id).update({
         data: {
            _openid: event.obj.sender_openid,
            receive_openid: event.obj.receive_openid,
            receiverTime: event.obj.receiverTime,
            goodsStatus:1,
            receiver_gender: event.obj.receiver_gender,
            receiver_avatarUrl: event.obj.receiver_avatarUrl,
            receiver_nickname: event.obj.receiver_nickname,
         },
         success(res) {
            console.log(res)
         },
         fail(res) {
            console.log(res, "更新失败！")
         }
      })
   } catch (e) {
      console.error(e)
   }
}

function cancelOrder(event) {
   try { // data 传入需要局部更新的数据
      return db.collection('sendOrders').doc(event.obj._id).update({
         data: {
            _openid: event.obj.sender_openid,
            receiverTime: event.obj.receiverTime,
            goodsStatus: 0,
            receive_openid: event.obj.receive_openid,
            receiver_gender: event.obj.receiver_gender,
            receiver_avatarUrl: event.obj.receiver_avatarUrl,
            receiver_nickname: event.obj.receiver_nickname,
         },
         success(res) {
            console.log(res)
         },
         fail(res) {
            console.log(res, "更新失败！")
         }
      })
   } catch (e) {
      console.error(e)
   }
}

function finishOrder(event) {
   try { // data 传入需要局部更新的数据
      return db.collection('sendOrders').doc(event.obj._id).update({
         data: {
            _openid: event.obj.sender_openid,
            finishTime: event.obj.finishTime,
            goodsStatus: 2,
         },
         success(res) {
            console.log(res)
         },
         fail(res) {
            console.log(res, "更新失败！")
         }
      })
   } catch (e) {
      console.error(e)
   }
}

function deleteOrder(event) {

   try { // data 传入需要局部更新的数据
      return db.collection('sendOrders').doc(event.obj._id).remove({
         success(res) {
            console.log(res);
            const fileIDs = event.obj.goodsImage
            const result = await cloud.deleteFile({
               fileList: fileIDs,
            })
            console.log(result);
         },
         fail(res) {
            console.log(res, "删除失败！")
         }
      })
   } catch (e) {
      console.error(e)
   }
}

exports.main = async (event, context) => {
   
   switch (event.action) {
      case 'update_heartNum': {
         return await update_heartNum(event)
      }
      case 'update_appUserInfo': {
         return await update_appUserInfo(event)
      }
      case 'bingoOrder': {
         return await bingoOrder(event)
      }
      case 'finishOrder': {
         return await finishOrder(event)
      }
      case 'cancelOrder': {
         return await cancelOrder(event)
      }
      case 'deleteOrder': {
         return await deleteOrder(event)
      }
      default: {
         return ;
      }
   }
}