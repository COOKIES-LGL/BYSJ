
import { cloudapi } from "../../cloud_api/api_delOrder.js"
const cloudApi = new cloudapi();
import { cloudapi as centerapi }  from "../../cloud_api/api_center.js"
const centerApi = new centerapi();
import { Base } from '../../base/common.js';
const base = new Base();
Page({
   data: {
      add:false,
      imgbox:[],
      fileIDs:[],
      current0: "currentClass",
      current1: "top_item",
      current2: "top_item",
      current3: "top_item",
      type:0,
      options:["","","","用户反馈"],
      feedBackList:[],//用户反馈信息列表
      fabu:'',
      yuyue:'',
   },
  /**
   * 生命周期函数--监听页面加载
   */
   imgDelete1: function (e) {   // 删除照片 &&
      let that = this;
      let index = e.currentTarget.dataset.deindex;
      let imgbox = this.data.imgbox;
      imgbox.splice(index, 1);
      var fileIds = this.data.fileIDs;
      var param = fileIds[index];
      fileIds.splice(index, 1);
      that.setData({
         imgbox: imgbox,
         fileIDs:fileIds,
      });
      var array = [param];
      cloudApi.delImage(array);
      wx.setStorageSync("navImagesList", this.data.fileIDs);
      wx.showToast({
         title: '删除成功',
      })
   },
   add_image: function (e) {   // 选择图片 &&
      var imgbox = this.data.imgbox;
      var that = this;
      var n = 6;
      if (6 > imgbox.length > 0) {
         n = 6 - imgbox.length;
      } else if (imgbox.length == 6) {
         n = 1;
      }
      wx.chooseImage({
         count: n, // 默认9，设置图片张数
         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
         success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths.reverse();
            if (imgbox.length == 0) {
               imgbox = tempFilePaths
            } else if (6 > imgbox.length) {
               imgbox = imgbox.concat(tempFilePaths);
            }
            wx.showLoading({
               title: '上传中',
               mask: true,
            })
            let promiseArr = [];
            for (let i = 0; i < tempFilePaths.length; i++) {
               promiseArr.push(new Promise((reslove, reject) => {
                  let item = tempFilePaths[i];
                  let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
                  wx.cloud.uploadFile({
                     cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
                     filePath: item, // 小程序临时文件路径
                     success: res => {
                        that.setData({
                           fileIDs: that.data.fileIDs.concat(res.fileID),
                           imgbox:imgbox
                        });
                        reslove();
                        wx.setStorageSync("navImagesList", that.data.fileIDs);
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
            Promise.all(promiseArr).then(res => {
                wx.showToast({
                   title: '配置成功',
                })
            })
         }
      })
   },
   navTo: function (e) {//页面跳转
      var that = this;
      var Index = e.currentTarget.dataset.index;
      switch (Index) {
         case "0":this.setData({
            current0:"currentClass",
            current1:"top_item",
            current2:"top_item",
            current3:"top_item",
         }); this.initOne();break;
         case "1":this.setData({
            current1: "currentClass",
            current0: "top_item",
            current2: "top_item",
            current3: "top_item",
         }); this.initTwo();break;
         case "2":this.setData({
            current2: "currentClass",
            current1: "top_item",
            current0: "top_item",
            current3: "top_item",
         }); this.initThree();break;
         case "3": this.setData({
            current3: "currentClass",
            current1: "top_item",
            current2: "top_item",
            current0: "top_item",
         });this.initFour();break;
         default: break;
      }

   },
   onSubmit: function (e) {   //发布按钮
   
   },
   initOne:function(){
      // queryFeedback
   },
   initTwo: function () {
      // queryFeedback
   },
   initThree: function () {
      var that = this;
      var callback = function (data) {
         var data1 =14;
         var data2 =35;
         that.setData({
            fabu: "text-align:center;color:#fff;background:rgb(45,177,251);width:"+data1*10+"rpx;height:50rpx;line-height:50rpx;",
            yuyue: "text-align:center;color:#fff;background:rgb(45,177,251);width:" + data2 * 10 + "rpx;height:50rpx;line-height:50rpx;",
            fabuNum: data1,
            yuyueNum: data2,
         })
         wx.hideLoading();
      };
      wx.showLoading({
         title: '载入中',
      })
      callback();
      // centerApi.queryOrder(callback);
      
      var callback2 = function (data) {
         var data1 = 54;
         var data2 = 25;
         var data3 = 80;
         that.setData({
            orderType1: "text-align:center;color:#fff;background:rgb(45,177,251);height:" + data1 * 10 + "rpx;width:100rpx;line-height:50rpx;",
            orderType2: "text-align:center;color:#fff;background:rgb(45,177,251);height:" + data2 * 10 + "rpx;width:100rpx;line-height:50rpx;",
            orderType3: "text-align:center;color:#fff;background:rgb(45,177,251);height:" + data3 * 10 + "rpx;width:100rpx;line-height:50rpx;",
            orderType1Num: data1,
            orderType2Num: data2,
            orderType3Num: data3,
         })
         wx.hideLoading();
      };
      wx.showLoading({
         title: '载入中',
      })
      callback2()
      // centerApi.queryOrder(callback2);
   },
   initFour: function () {
      var that =this;
      var callback=function(data){
         console.log(data);
         that.setData({
            feedBackList:data
         })
         wx.hideLoading();
      };
      wx.showLoading({
         title: '载入中',
      })
      centerApi.queryFeedback(callback);
   },
   delFeedback: function (event){
      var _id = base.getDataSet(event, "id");
      var that = this;
      var callback = function () {
         that.initFour();
      };
      centerApi.delFeedback(_id,callback);
   },
   onLoad: function (options) {
   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  initData(){
     this.setData({
        fileIDs:wx.getStorageSync("navImagesList"),
        imgbox: wx.getStorageSync("navImagesList")
     })
  },
  onShow: function () {
     this.initData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})