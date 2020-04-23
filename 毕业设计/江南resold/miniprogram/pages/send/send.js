import { cloudapi } from "../cloud_api/api_send.js"
import { configData } from "../config/configData.js/"
const cloudApi = new cloudapi
Page({

  /**
   * 页面的初始数据
   */
   data: {
      add: false,
      image: true,
      check1: 'check_radio',
      check2: 'check_radio',
      change_text: '接受',
      place_text1: '请认真填写',
      show: true,
      show_box: true,
      look1: false,
      look2: false,
      date: '',//日期
      description: '',//描述
      text: '',//名称
      site: '',//地点
      phone: '',//手机号
      wechat:'',//微信
      major:'',//专业
      code_ID: '',//学生证号
      name: '',//姓名
      lost_type: '',//类型
      subLists: [
      '教材课本', '三方服务','寝室用品',"考研资料"
      ],
      goodsName:'',
      goodsName_status:false,
      minPrice:'',
      minPrice_status:false,
      goodsNum:'一',
      nums:['一','二','三','四','五','六','七','八','九','十'],
      numValue:'',
      maxPrice:'',
      maxPrice_status:false,
      phone_status: false,
      title_status: false,
      allDataValid:false,
      code_status: '',
      name_status: '',
      changed1: false,
      imgbox: [],//选择图片
      fileIDs: [],//上传云存储后的返回值
   },
   look_owner: function () {
      if (this.data.check1 == 'check_radio') {
      var that = this;
      this.setData({
         check1: 'hover_radio',
         change_text: '接受',
         show_box: false,
         show: true,
         look2: true,
         lost_type: 'pick',
         text:''
      })
      if (that.data.check2 == 'hover_radio') {
         that.setData({
            check2: 'check_radio'
         })
      }
      } else {
      this.setData({
         check1: 'check_radio',
         show_box: true,
         look2: false,
      })
      }
   },
   look_lost: function () {
      if (this.data.check2 == 'check_radio') {
      var that = this;
      this.setData({
         check2: 'hover_radio',
         change_text: '接受',
         show_box: false,
         show: false,
         look1: true,
         lost_type: 'lose',
         text:''
      })
      if (that.data.check1 == 'hover_radio') {
         that.setData({
            check1: 'check_radio'
         })
      }
      } else {
      this.setData({
         check2: 'check_radio',
         show_box: true,
         look1: false,
      })
      }
   },
   bindInput: function (e) {
      var value = e.detail.value;
      if (value == '') {
      wx.showToast({
         title: '物品类目不能为空',
         icon: 'none',
         duration: 600
      })
      } else {
      this.setData({
         title_status: true,
         text: value
      });
      }
   },
   bind_title:function(e){
      var value = e.detail.value;
      if (value == '') {
         wx.showToast({
            title: '物品名称不能为空',
            icon: 'none',
            duration: 600
         })
      } else {
         this.setData({
            goodsName_status: true,
            goodsName: value
         });
      }
   },
   bind_max: function (e) {
      var value = e.detail.value;
      if (value == '') {
      wx.showToast({
         title: '最高价位不能为空',
         icon: 'none',
         duration: 600
      })
      } else {
         this.setData({
            maxPrice_status: true,
            maxPrice: value
         });
      }
   },
   bind_min: function (e) {
      var value = e.detail.value;
      if (value == '') {
      wx.showToast({
         title: '价位不能为空',
         icon: 'none',
         duration: 600
      })
      } else {
         this.setData({
            minPrice_status: true,
            minPrice: value
         });
      }
   },
   description: function (e) {
      var value = e.detail.value;
      this.setData({
      description: value,
      })
   },
   checkNumber: function (value) {
      let reg = /^\d{11}$/
      if (reg.test(value)) {
      return true;
      } else {
      return false;
      }
   },
   bindDateChange: function (e) {
      var that = this;
      var value = e.detail.value;
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
      date: value,
      time_status: true,
      changed1: true,
      })
   },
   onAddInfo: function (e) {
      var that = this;
      let id = e.currentTarget.dataset.id;
      console.log(this.data.subLists[id])
      this.setData({
         text: this.data.subLists[id],
         title_status:true
      })
   },
   initData:function(){
      var localInfo = wx.getStorageSync("appUserInfo")[0];
      if (localInfo){
         this.setData({
            phone: localInfo.phone,
            wechat: localInfo.wechat,
            major: localInfo.major,
         }) 
      }  
   },
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      this.initData();
   },
   onLoad: function (options) {

   },

   imgDelete1: function (e) {   // 删除照片 &&
      let that = this;
      let index = e.currentTarget.dataset.deindex;
      let imgbox = this.data.imgbox;
      imgbox.splice(index, 1)
      that.setData({
         imgbox: imgbox
      });
   },

   add_image: function (e) {   // 选择图片 &&&
      var imgbox = this.data.imgbox;
      console.log(imgbox)
      var that = this;
      var n = 3;
      if (3 > imgbox.length > 0) {
         n = 3 - imgbox.length;
      } else if (imgbox.length == 3) {
         n = 1;
      }
      wx.chooseImage({
         count: n, // 默认9，设置图片张数
         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
         success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            if (imgbox.length == 0) {
               imgbox = tempFilePaths
            } else if (5 > imgbox.length) {
               imgbox = imgbox.concat(tempFilePaths);
            }
            that.setData({
               imgbox: imgbox,
               add: true,
            });
         }
      })
   },

   //图片
   imgbox: function (e) {
      this.setData({
         imgbox: e.detail.value
      })
   },
   bindNumchange:function(e){
      const val = e.detail.value;
      this.setData({
         goodsNum: val[0],
         numValue:val
      })
   },
   uploadImage: function (e) {   //发布按钮
      var  that =  this;
      if (!this.data.imgbox.length) {
         wx.showToast({
            icon: 'none',
            title: '图片类容为空'
         });
      } else {
         //上传图片到云存储
         wx.showLoading({
            title: '发布中',
         })
         let promiseArr = [];
         for (let i = 0; i < this.data.imgbox.length; i++) {
            promiseArr.push(new Promise((reslove, reject) => {
               let item = this.data.imgbox[i];
               let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
               wx.cloud.uploadFile({
                  cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
                  filePath: item, // 小程序临时文件路径
                  success: res => {
                     this.setData({
                        fileIDs: this.data.fileIDs.concat(res.fileID),
                     });
                     reslove();
                     wx.hideLoading();
                  },
                  fail: res => {
                     wx.hideLoading();
                     wx.showToast({
                        title: "上传失败",
                     })
                  }
               })
            }));
         }
         Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
            var userInfo = wx.getStorageSync('userInfo');
            var time = new Date();
            var orderForm = {
               goodsName:that.data.goodsName,
               goodsTitle:that.data.text,
               goodsType:that.data.look2?"卖物":"买物",
               goodsImage: that.data.fileIDs,
               goodsMaxprice: that.data.maxPrice,
               goodsMinprice: that.data.minPrice,
               goodsNum: that.data.goodsNum,
               goodsremark:that.data.description,
               goodsphone:that.data.phone,
               goodswechat:that.data.wechat,
               send_nickname:userInfo.nickName,
               send_avatarUrl:userInfo.avatarUrl,
               sender_gender: userInfo.gender==1?"男":"女",
               sender_openid:wx.getStorageSync('OPENID'),
               releaseTime: time.toLocaleString()
            }
            var callback=function(){
               wx.hideLoading();
               wx.redirectTo({
                  url: '../center/orderList/orderList?type=2',
               })
            }
            cloudApi.sendOrder(orderForm, callback);
            that.setData({
               imgbox: []
            })
         })
      }
   },
  checkStatus:function(){
     console.log(this.data.maxPrice_status , this.data.title_status , this.data.goodsName_status)
     if (this.data.maxPrice_status&&this.data.title_status&&this.data.goodsName_status){
      this.setData({
         allDataValid:true,
      })
     }else{
        wx.showToast({
           icon:"none",
           title: '请填写订单信息',
        })
     }
     if (wx.getStorageSync("appUserInfo").length==0){
        this.setData({
           allDataValid: false,
        })
        wx.showModal({
           title: '小提示',
           content: '请先完善用户表单信息',
           showCancel: true,//是否显示取消按钮
           cancelText: "取消",
           cancelColor: 'skyblue',//取消文字的颜色
           confirmText: "前往",//默认是“确定”
           confirmColor: 'skyblue',//确定文字的颜色
           success: function (res) {
              if (res.cancel) {
                 return;
              } else {
                wx.navigateTo({
                   url: '../center/center?type=hasTable',
                })
              }
           },
           fail: function (res) { },//接口调用失败的回调函数
        })
     }
  },
  onsubmit: function () {
     this.checkStatus();
     if(this.data.allDataValid){
        wx.showLoading({
           title: '发布中',
        })
        this.uploadImage();
     }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})