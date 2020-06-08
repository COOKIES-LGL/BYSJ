// pages/center/center.js
import {cloudapi} from "../cloud_api/api_center.js"
import { configData } from "../config/configData.js/"
const cloudApi = new cloudapi
Page({

  /**
   * 页面的初始数据
   */
  data: {
        user:{
          image:"../../images/user-unlogin.png",
          nickName:"小鼋君",          
        },
        majorArray:[],
        multiArray: [],
        collegeArr: ["物联网工程（卓越工程师）", "自动化（卓越工程师）", "自动化", "电气工程及其自动化", "通信工程", "微电子科学与工程"],
        changed1:false,
        changed2:false,
        multiIndex: [0, 0],
        collegeIndex:0,
        heartNum: 0,
        addheart:'',
        showUserInfoDialog:false,
        options: [
          {
            img: '../../images/shezhi.png',
            name: '我的关注'
          },
          {
            img: '../../images/gexin.png',
            name: '个性标签'
          },
          {
            img: '../../images/myinfo.png',
            name: '我的留言'
          },
          {
            img: '../../images/yijian.png',
            name: '意见反馈'
          },
        ],
        show_alert:false,
        likeTag:"like",
        alert:{
          show_alert: false,
          show_btn: true,
          title: "是否同意授权登陆？",
          cancel_text: "取消",
          submit_text: "同意",
        },
        verifyAlert:{
           show_alert:false,
           title: "请输入有效值？", 
           submit_text: "确认",
        },
        updataTag:false,
        formValue:{
           phone:'',
           weChat:'',
           college_text: "请选择您的学院",
           major_text: "请选择您的专业",
           grade: [
              { value: '大一', checked: true },
              { value: '大二', checked: false },
              { value: '大三', checked: false },
              { value: '大四', checked: false },
           ]
        },


  },

   /**
      * 生命周期函数--监听页面加载
      */
   addHeart:function(){
      //添加喜欢数量
         this.setData({addheart:"addheart"})
         if (this.data.likeTag === 'like') {
            this.setData(
               {
                  heartNum:this.data.heartNum+1,
                  likeTag:"dislick"
               }
            )
         }else {
            this.setData(
               {
                  heartNum: this.data.heartNum-1,
                  likeTag: "like"
               }
            )
         }
         var that = this;
         setTimeout(function () { that.setData({ addheart: "" })},1000);
         cloudApi.updateHeartNum(that.data.heartNum,wx.getStorageSync('appUserInfo')[0]._id);
   },
   navTo: function (e) {//页面跳转
      var that = this;
      var Index = e.currentTarget.dataset.index;
      switch (Index) {
         case 0: wx.navigateTo({
            url: './FocusList/FocusList?type=focus',
         })  
         break;
         case 1: wx.navigateTo({
         url: '../center/mineLabel/mineLabel',
         }); break;
         case 2: wx.navigateTo({
         url: '../center/mineMesg/mineMesg',
         }); break;
         case 3: wx.navigateTo({
         url: '../center/feedback/feedback',
         }); break;
         default: break;
      }
   },
   nav_sort:function(){
     wx:wx.navigateTo({
        url: '../userAgreement/userAgreement',
     }) 
   },
   turndown: function (a, b, c, d, e) {//授权弹窗
      this.setData({
         alert: {
         show_alert: a,
         show_btn: b,
         title: c,
         cancel_text: d,
         submit_text: e,
         }
      })
   },
   verify: function (a, b, c) {//验证有效性
      this.setData({
         verifyAlert: {
            show_alert: a,
            title: b,
            submit_text: c,
         }
      })
   },
   checkstate:function(){//检测是否授权
         var state=wx.getStorageSync("userInfo");
         if (state == "" || undefined) {
            this.turndown(true, true, "是否同意授权登陆？", "取消", "同意");
         }else{
            this.setData({
               user: {
                  image: state.avatarUrl,
                  nickName: state.nickName,
               },
            })
         }
   },
   
   bind_ok:function(){
      this.turndown(false, true, "是否同意授权登陆？","取消","同意");
   },
   bind_cancel:function(){
      this.turndown(false, true, "是否同意授权登陆？", "取消", "同意");
   },
   bindGetUserInfo:function(){
      this.turndown(false, true, "是否同意授权登陆？", "取消", "同意");
      var that=this
         wx.getSetting({
         success(res) {
         if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
               success(res) {              
               console.log(res);
               const userInfo = res.userInfo
               wx.setStorageSync("userInfo", userInfo);
               that.insertUser(userInfo);//插入数据库
               }
            })
         }
         }
      })
      if (wx.getStorageSync("appUserInfo").length==0) {
         this.setData({
            showUserInfoDialog: true
         })
      }
   },
   insertUser:function(data){
      cloudApi.saveUserData(data);//保存用户数据
      this.checkstate();
   },
   userinfoDialog:function(){
      this.setData({
      showUserInfoDialog:true,
      })
      console.log(this.data.showUserInfoDialog)
   },
   closeDialog:function(){//关闭弹窗
      this.setData({
         showUserInfoDialog: false,
      })
   },
   formSubmit: function (e) {//表单提交
      var that = this;
      wx.showLoading({
         title: '表单提交中',
      })
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
      var formData = e.detail.value;
      if(!formData.input_phone){
         this.verify(true, "请输入手机号!","确认");
      } else if (!this.data.changed1 && !this.data.updataTag) {
         this.verify(true, "请选择您的学院！", "确认");
      } else if (!this.data.changed2 && !this.data.updataTag) {
         this.verify(true, "请选择您的专业!", "确认");
      } else if (!formData.radio_group && !this.data.updataTag) {
         this.verify(true, "请选择您的年级!", "确认");
      }else{//提交表单
         var _id; 
         if (wx.getStorageSync('appUserInfo')[0]){
           _id = wx.getStorageSync('appUserInfo')[0]._id;
         }
         cloudApi.saveAppUserInfo(formData,_id,that.verify,that.getAppUserinfo);
         this.closeDialog();
      }      
   },
   getAppUserinfo:function(){
      var that = this
      cloudApi.queryAppUserInfo(that.reflushHeartNum);//获取平台用户数据
      if (wx.getStorageSync('appUserInfo').length > 0) {
         var userInfoData = wx.getStorageSync('appUserInfo')[0];
         that.setData({
            formValue: {
               phone: userInfoData.phone,
               weChat: userInfoData.wechat,
               college_text: userInfoData.college,
               major_text: userInfoData.major,
               grade: [
                  { value: '大一', checked: userInfoData.grade == "大一" },
                  { value: '大二', checked: userInfoData.grade == "大二" },
                  { value: '大三', checked: userInfoData.grade == "大三" },
                  { value: '大四', checked: userInfoData.grade == "大四" },
               ]
            },
            updataTag: true
         })
      }    
   },
   bind_confirm:function(){
      this.verify(false, "请选择您的年级!", "确认");
   },
   formReset: function () {
      console.log('form发生了reset事件')
   },
   onLoad: function (options) {
      console.log(configData[0]);
      this.setData({
         multiArray: [configData[0].campus,configData[0].north_college],
      })
      this.checkstate();
      this.login();
      if(options.type=="hasTable"){
         this.setData({
            showUserInfoDialog:true
         })
      }
   },
   login:function(){
      wx.cloud.callFunction({
      name: 'user',
      complete: res => {
         wx.setStorageSync("OPENID", res.result.OPENID);
      }
      });     
   },
   reflushHeartNum:function(){
      this.setData({
         heartNum: wx.getStorageSync("appUserInfo")[0].heartNum
      })  
   },
   onShow: function () {
      var that = this
      this.getAppUserinfo();
   },

   to_order_list:function(order_Type){
      wx.navigateTo({
      url: './orderList/orderList?type='+order_Type,
      success: function(res) {console.log("nav_to"+order_Type)},
      })
   },
   to_my_history_order:function(){
      this.to_order_list("my_history_order");
   },
   to_my_history_sender: function () {
      this.to_order_list("my_history_sender");
   },
   to_my_order: function () {
      this.to_order_list("my_order");
   },
   to_my_sender: function () {
      this.to_order_list("my_sender");
   },
   to_my_receive: function () {
      this.to_order_list("selfReceive");
   },
   bindMultiPickerChange:function(e){
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
         multiIndex: e.detail.value,
         changed1: true
      })
   },
   bindMultiPickerColumnChange:function(e){
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
         multiArray: this.data.multiArray,
         multiIndex: this.data.multiIndex,
         changed1:true,
         collegeArr:[],
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.value) {
         case 0:
            data.multiArray[1] = configData[0].north_college;
            data.multiIndex[1] = 0;
            break;
         case 1:
            data.multiArray[1] = configData[0].south_college;
            data.multiIndex[1] = 0; 
            break;
         default: break;   
      }
      switch (data.multiArray[1][data.multiIndex[1]]){
         case "物联网工程学院":
            data.collegeArr = configData[0].wulianwanggongcheng;break;
         case "机械学院":
            data.collegeArr = configData[0].jixeigongcheng; break;
         case "环境与土木工程学院":
            data.collegeArr = configData[0].huanjinyutumu; break;
         case "纺织与服装学院":
            data.collegeArr = configData[0].fangzhifuzhuang; break;
         case "设计学院":
            data.collegeArr = configData[0].shejixueyuan; break;
         case "人文学院":
            data.collegeArr = configData[0].renwenxueyuan; break;
         case "理学院":
            data.collegeArr = configData[0].lixueyuan; break;
         case "商学院":
            data.collegeArr = configData[0].shangxueyuan; break;
         case "食品学院":
            data.collegeArr = configData[0].shipin; break;
         case "药学院":
            data.collegeArr = configData[0].yaoxueyuan; break;
         case "医学院":
            data.collegeArr = configData[0].yixueyuan; break;
         case "法学院":
            data.collegeArr = configData[0].faxueyuan; break;
         case "化学与材料工程学院":
            data.collegeArr = configData[0].huaxueyucailiao; break;
         case "外国语学院":
            data.collegeArr = configData[0].waiguoyu; break;
         case "生物工程学院":
            data.collegeArr = configData[0].shengwugongcheng; break;
         case "人工智能与计算机学院":
            data.collegeArr = configData[0].shuzimeiti; break;
         default:break;
      }
      console.log(data);
      this.setData(data);
      console.log(this.data.collegeArr);
   },
   bindPickerType1: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
         collegeIndex: e.detail.value,
         changed2: true
      })
   },

})