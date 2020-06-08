
import { cloudapi } from "../../cloud_api/api_delOrder.js"
const cloudApi = new cloudapi();
import { cloudapi as managerapi }  from "../../cloud_api/api_manager.js"
const managerApi = new managerapi();
import { Base } from '../../base/common.js';
const base = new Base();
import { cloudapi as del } from "../../cloud_api/api_delOrder.js"
const DEL = new del;
var manNum = 0, womanNum = 0;
var gradeOne = 0, gradeTwo = 0,gradeThree = 0,gradeFour = 0;
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
      userInfoList:[],
      genderData:'',
      grademanData:'',
      manNum:'',
      gradewomanData: '',
      womanNum:'',
      gradeType1:'',
      gradeType1:'',
      gradeType1:'',
      gradeType1:'',
      gradeType1Num:'',
      gradeType2Num: '',
      gradeType3Num: '',
      gradeType4Num: '',
      allOrderList1:[],
      allOrderList2: [],
      allOrderList3: [],
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
      managerApi.addNavImages(that.data.fileIDs, that.data.navImageListId);
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
                        managerApi.addNavImages(that.data.fileIDs, that.data.navImageListId);
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
   checkchange:function(e){
     var _id= e.target.dataset.id;
     var images = e.target.dataset.images;
     console.log(_id,images);
     var that = this;
     wx.showModal({
        title: '提示',
        content: '你确定要删除这条记录吗？', 
        success: function (res) {
           if (res.cancel) {
              //点击取消,默认隐藏弹框
           } else {
              //点击确定
              wx.showLoading({
                 title: '取消订单中',
              })
              var param = {
                 _id: _id,
                 goodsImage: images,
              }
              var callback = function () {
                 wx.showToast({
                    title: '记录已删除！',
                 });
                 that.initOne();
              }
              DEL.deleteOrder(param, callback);
           }
        },
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
      var that = this;
      wx.showLoading({
         title: '载入中',
      })
      var callback1 = function(res){
         console.log(res);
         that.setData({
            allOrderList1:res
         })
         wx.hideLoading(); 
      }
      managerApi.queryOrderInfo1(callback1);
      var callback2 = function (res) {
         console.log(res);
         that.setData({
            allOrderList2: res
         })
         wx.hideLoading();
      }
      managerApi.queryOrderInfo2(callback2);
      var callback3 = function (res) {
         console.log(res);
         that.setData({
            allOrderList3: res
         })
         wx.hideLoading();
      }
      managerApi.queryOrderInfo3(callback3);
   },
   canvasGender:function(res){
      if(!!res){
         if (res == 1) {
            manNum++;
         } else {
            womanNum++;
         }
      }
   },
   canvasGrade: function (res) {
      if(!!res){
         if (res == "大一") {
           gradeOne++;
         } else if (res == "大二") {
            gradeTwo++;
         } else if(res == "大三"){
            gradeThree++;
         } else if(res == "大四"){
            gradeFour++;
         }
      }
   },
   canvasgraph:function(){
       var param = manNum/(manNum+womanNum);
       var temp =  (param.toFixed(2))*100;
       var param1 = womanNum / (manNum + womanNum);
       var temp1 = (param1.toFixed(2)) * 100;
//-----------------------------------------------------
      var grade1 = gradeOne / (gradeOne+gradeTwo+gradeThree+gradeFour);
      var tempgrade1 = (grade1.toFixed(2)) * 100;
      var grade2 = gradeTwo / (gradeOne + gradeTwo + gradeThree + gradeFour);
      var tempgrade2 = (grade2.toFixed(2)) * 100;
      var grade3 = gradeThree / (gradeOne + gradeTwo + gradeThree + gradeFour);
      var tempgrade3 = (grade3.toFixed(2)) * 100;
      var grade4 = gradeFour / (gradeOne + gradeTwo + gradeThree + gradeFour);
      var tempgrade4 = (grade4.toFixed(2)) * 100;
       this.setData({
          gendermanData: "text-align:center;color:#fff;background:rgb(45,177,251);width:"+temp+"%;height:50rpx;line-height:50rpx;",
          manNum:temp+'%',
          genderwomanData: "text-align:center;color:#fff;background:rgb(45,177,251);width:"+temp1+"%;height:50rpx;line-height:50rpx;",
          womanNum: temp1 + '%',
          gradeType1: "margin:0 auto;text-align:center;color:#fff;background:rgb(45,177,251);height:" +tempgrade1+ "%;width:100rpx;line-height:50rpx;",
          gradeType1Num:gradeOne,
          gradeType2: "margin:0 auto;text-align:center;color:#fff;background:rgb(45,177,251);height:" + tempgrade2 + "%;width:100rpx;line-height:50rpx;",
          gradeType2Num: gradeTwo,
          gradeType3: "margin:0 auto;text-align:center;color:#fff;background:rgb(45,177,251);height:" + tempgrade3 + "%;width:100rpx;line-height:50rpx;",
          gradeType3Num: gradeThree,
          gradeType4: "margin:0 auto;text-align:center;color:#fff;background:rgb(45,177,251);height:" + tempgrade4 + "%;width:100rpx;line-height:50rpx;",
          gradeType4Num: gradeFour,
       })
      wx.hideLoading();
   },
   initTwo: function () {
      wx.showLoading({
         title: '载入中',
         mask: true,
      })
      var that = this;
      var userInfo,appUserInfo,userInfoArray=[];
      manNum = 0;womanNum = 0;
      gradeOne = 0;gradeTwo = 0;gradeThree = 0;gradeFour = 0;
      var callback = function(res){
         userInfo = res;
         managerApi.queryappUserInfo(callback2);
      }
      managerApi.queryUserInfo(callback);
      var callback2 = function (res) {
         appUserInfo = res;
         for (var i = 0; i < userInfo.length; i++) {
            var param = {
               registTime: userInfo[i].registTime,
               userinfo: userInfo[i].userinfo,
               college: appUserInfo[i].college || '',
               grade: appUserInfo[i].grade || '',
               major: appUserInfo[i].major || '',
            }
            userInfoArray.push(param);
         }
         that.setData({
           userInfoList: userInfoArray
         })
         for (var i = 0; i < that.data.userInfoList.length; i++) {
            that.canvasGender(that.data.userInfoList[i].userinfo.gender);//绘制性别比例；
            that.canvasGrade(that.data.userInfoList[i].grade);//绘制年级比例；
         }
         that.canvasgraph();
      }
   },
   initThree: function () {
      wx.showLoading({
         title: '载入中',
         mask: true,
      })
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
      callback();
      // managerApi.queryOrder(callback);
      
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
      // managerApi.queryOrder(callback2);
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
      managerApi.queryFeedback(callback);
   },
   delFeedback: function (event){
      var _id = base.getDataSet(event, "id");
      var that = this;
      var callback = function () {
         that.initFour();
      };
      managerApi.delFeedback(_id,callback);
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
     var that = this;
     var callback = function (res) {
        if(res.length>0){
           that.setData({
              fileIDs: res[0].imageUrl,
              imgbox: res[0].imageUrl,
              navImageListId:res[0]._id
           })
        }
     }
     managerApi.queryNavImages(callback);
     this.initOne();
  },
  onShow: function () {
     this.initData();
  },
  showDetail:function(e){
     var id = e.currentTarget.dataset['id'];
     for (var item of this.data.feedBackList) {
        if (id === item._id) {
           console.log(item.senderNickname)
           wx.showModal({
              title: `${item.senderNickname}`,
              content: `${item.detail}`,
              showCancel:false,
           });
           return;
        }
     }
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