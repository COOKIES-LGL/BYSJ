

import { Api } from './api.js'
import { Base } from "../base/common.js"
const base = new Base

class cloudapi {
   constructor() {
      "use strict"
      this._db = base.setdb();
   }
   bingoOrder(param,callback) {//更新点赞数据
      wx.cloud.callFunction({
         name: 'updateData',
         data: {
            action: 'bingoOrder',
            obj: param,
         },
         success: res => {
            wx.hideLoading();
            console.log('[云函数] [login] 调用成功', res);
            callback();
         },
         fail: err => {
            console.error('[云函数] [login] 调用失败', err)
         }
      })
   }
   cancelOrder(param, callback) {//更新点赞数据
      wx.cloud.callFunction({
         name: 'updateData',
         data: {
            action: 'cancelOrder',
            obj: param,
         },
         success: res => {
            wx.hideLoading();
            console.log('[云函数] [login] 调用成功', res);
            callback();
         },
         fail: err => {
            console.error('[云函数] [login] 调用失败', err)
         }
      })
   }
   delImage(param){
      wx.cloud.callFunction({
         name: "cloudStore",
         data: {
            obj: param,
         },
         success: res => {
            console.log('[云函数] [cloudStore] 调用成功', res);
         },
         fail: err => {
            console.error('[云函数] [cloudStore] 调用失败', err)
         }
      })
   }
   deleteOrder(param, callback) {//删除订单
      wx.cloud.callFunction({
         name: 'updateData',
         data: {
            action: 'deleteOrder',
            obj: param,
         },
         success: res => {
            wx.hideLoading();
            console.log('[云函数] [login] 调用成功', res);
            callback();
         },
         fail: err => {
            console.error('[云函数] [login] 调用失败', err)
         }
      })
      this.delImage(param.goodsImage);
   }
   finishOrder(param, callback) {
      wx.cloud.callFunction({
         name: 'updateData',
         data: {
            action: 'finishOrder',
            obj: param,
         },
         success: res => {
            wx.hideLoading();
            console.log('[云函数] [login] 调用成功', res);
            callback();
         },
         fail: err => {
            console.error('[云函数] [login] 调用失败', err)
         }
      })
   }
}

export { cloudapi }
