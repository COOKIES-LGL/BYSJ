// pages/center/mineLabel/mineLabel.js
import { cloudapi } from "../../cloud_api/api_center.js"
const cloudApi = new cloudapi
import { cloudFocusapi } from "../../cloud_api/api_focus.js"
const cloudFocusApi = new cloudFocusapi
Page({

   /**
    * 页面的初始数据
    */
   data: {
     userinfo:'',
     focusList:[],
     likeTag: "like",
     applicationClass:"application",
     lookMore:"查看更多",
     application:[
        {
           img:'../../../images/wode/js.png',
           name:'简书',
           url:'',
        },
        {
           img: '../../../images/wode/csdn.png',
           name: 'CSDN',
           url: '',
        },
        {
           img: '../../../images/wode/SF.png',
           name: '思否',
           url: '',
        },
        {
           img: '../../../images/wode/zhihu.png',
           name: '知乎',
           url: '',
        },
        {
           img: '../../../images/wode/BKY.png',
           name: '博客园',
           url: '',
        },
        {
           img: '../../../images/wode/nkw.png',
           name: '牛客网',
           url: '',
        },
        {
           img: '../../../images/wode/douban.png',
           name: '豆瓣',
           url: '',
        },
        {
           img: '../../../images/wode/github.png',
           name: 'github',
           url: '',
        },
        {
           img: '../../../images/wode/leetcode.png',
           name: 'offershow',
           url: '',
        },
        {
           img: '../../../images/wode/leetcode.png',
           name: '看准',
           url: '',
        },
        {
           img: '../../../images/wode/leetcode.png',
           name: '企查查',
           url: '',
        },
        {
           img: '../../../images/wode/leetcode.png',
           name: '网易云',
           url: '',
        }
     ],
     interest: [{ status: 0, value: "萌萌哒" }, { status: 0, value: "长腿欧巴" },
         { status: 0, value: "夜猫子" }, { status: 0, value: "小清新"},
         { status: 0, value: "穷游党" }, { status: 0, value: "烹饪" },
         { status: 0, value: "麦霸" }, { status: 0, value: "超神玩家" },
         { status: 0, value: "科幻迷" }, { status: 0, value: "运动" },
         { status: 0, value: "民谣" }, { status: 0, value: "天然呆" },
         { status: 0, value: "脑残粉" }, { status: 0, value: "安静" },
         { status: 0, value: "学霸" }, { status: 0, value: "自然熟" }
     ],
     dates: '点击选择',
     xinzuoImage:"",
     userInterestList:[],
     showXinzuo:true,
     label:{
        heartNum:0,
        birstday:'点击选择',
        interest:[],
        music:'',
        application:[],
     }
   },
   formSubmit: function () {//表单提交
      var that = this;
      var formData = this.data.label;
      if (wx.getStorageSync('customizeLabel')[0]){
        var  _id = wx.getStorageSync('customizeLabel')[0]._id;
        var  _openid = wx.getStorageSync('customizeLabel')[0]._openid;
         cloudApi.savecustomizeLabel(formData,that.getcustomizeLabel,_openid,_id);
      }else{
        var  _openid = wx.getStorageSync("appUserInfo")[0]._openid;
         cloudApi.savecustomizeLabel(formData,that.getcustomizeLabel, _openid);
      }
   },
   getFocusMesg:function(){
      var that =this;
      var callback1 = function(data){
         that.setData({
            focsuNum:data.length
         })
         wx.setStorageSync("focusList",data);
      }
      var callback2 = function (data) {
         that.setData({
            fansNum: data.length
         })
         wx.setStorageSync("focusedList", data);
         wx.hideLoading();
      }
      cloudFocusApi.getFocusList(callback1);
      cloudFocusApi.getFocusedList(callback2);
   },
   getcustomizeLabel: function () {
      var that = this
      cloudApi.querycustomizeLabel(wx.getStorageSync("appUserInfo")[0]._openid);
      if (wx.getStorageSync('customizeLabel').length > 0) {
         that.setData({
            label: wx.getStorageSync('customizeLabel')[0],     
         })
      }
      that.getImage(that.data.label.birstday);
      for(var i=0;i<that.data.label.interest.length;i++){
         that.choiceshow(that.data.label.interest[i],true);
      }
   },

   lookMore:function(){
      if(this.data.lookMore=="收起"){
         this.setData({
            applicationClass: "application",
            lookMore: "查看更多",
         })
      }else{
         this.setData({
            applicationClass: "applicationClass",
            lookMore: "收起",
         })
      }
   },
   musicInput:function(e){//音乐输入
      var up = "label.music";
      this.setData({
         [up]:e.detail.value,
      })
      this.formSubmit();
   },
   showToast:function(arr){//展示提示
      if (arr.length >= 6) {
         wx.showToast({
            title: '最多添加六个标签！',
            icon: 'none',
            duration: 1500//持续的时间
         })
         return true;
      }else{
         return false;
      }
   },
   choiceshow:function(value,tag){
      var arr = this.data.label.interest;
      var interest = this.data.interest;
      var valueIndex;
      var _index;
      function check(item, itemIndex) {
         if (value == item) {
            valueIndex = itemIndex;
            return value;
         }
      }
      function findfunc(item, itemIndex) {
         if (value == item.value) {
            _index = itemIndex
            return itemIndex;
         }
      }
      if(tag){
         if (this.showToast(arr)) { return };
         interest.find(findfunc);
         interest[_index].status = 1;
         this.setData({
            interest: interest
         });
      }else{
         if (arr.find(check)) {//已在列表中
            interest.find(findfunc);
            interest[_index].status = 0;
            this.setData({
               interest: interest
            })
            arr.splice(valueIndex, 1);
         } else {
            if (this.showToast(arr)) { return };
            interest.find(findfunc);
            interest[_index].status = 1;
            this.setData({
               interest: interest
            });
            arr.push(value);
         }
      }
      var up = "label.interest";
      this.setData({
         [up]: arr
      })
   },
   choiceItem:function(e){
      var value = e.target.dataset.id;
      this.choiceshow(value);
   },

   toEyeing:function(){
      wx.navigateTo({
         url: '../FocusList/FocusList?type=focus',
      }) 
   },
   toFans:function(){
      wx.navigateTo({
         url: '../FocusList/FocusList?type=focused',
      }) 
   },
   /**
    * 生命周期函数--监听页面加载
    */
   init :function(){
     wx.showLoading({
        title: '加载中',
        mask:true
     })
     this.getFocusMesg();
     this.setData({
        userinfo:wx.getStorageSync("userInfo"),
     })
   },
   getXingzuo:function(month, day){
      const s = '魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯';
      const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
   },
   getImage:function(eValue){
      var value = "label.birstday";
      this.setData({
         [value]: eValue
      })
      var arr = eValue.split('-');
      var month = this.removeZero(arr[1]);
      var day = this.removeZero(arr[2]);
      var image = this.getXingzuo(month, day);
      this.setData({
         xinzuoImage: 'cloud://resold-822f1b.7265-resold-822f1b-1258157186/xinzuo/' + image + "座.jpg",
         showXinzuo: false,
      })
   },
   bindDate: function (e) {
      var eValue = e.detail.value;
      this.getImage(eValue);
      this.formSubmit();
   },
   removeZero:function(res){
      return parseInt(res);
   },
   onLoad: function (options) {
      this.getcustomizeLabel();
      if (wx.getStorageSync("customizeLabel").length <= 0){
         this.formSubmit();
      }
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
     this.init();
   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {
     this.formSubmit();
   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {
      this.formSubmit();
   },
})