// pages/center/mineLabel/mineLabel.js
import { cloudFocusapi } from "../../cloud_api/api_focus.js"
const cloudFocusApi = new cloudFocusapi
import { cloudapi } from "../../cloud_api/api_center.js"
const cloudApi = new cloudapi
Page({

   /**
    * 页面的初始数据
    */
   data: {
      userinfo: '',
      // appUserInfo: {
      //    eyeing: 10,
      //    fans: 24,
      // },
      likeTag: "like",
      applicationClass: "application",
      lookMore: "查看更多",
      application: [
         {
            img: '../../../images/wode/js.png',
            name: '简书',
            url: '',
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
         { status: 0, value: "夜猫子" }, { status: 0, value: "小清新" },
         { status: 0, value: "穷游党" }, { status: 0, value: "烹饪" },
         { status: 0, value: "麦霸" }, { status: 0, value: "超神玩家" },
         { status: 0, value: "科幻迷" }, { status: 0, value: "运动" },
         { status: 0, value: "民谣" }, { status: 0, value: "天然呆" },
         { status: 0, value: "脑残粉" }, { status: 0, value: "安静" },
         { status: 0, value: "学霸" }, { status: 0, value: "自然熟" }
      ],
      dates: '点击选择',
      _id:'',
      xinzuoImage: "",
      userInterestList: [],
      showXinzuo: true,
      addheart:'',
      likeTag:"like",
      openid:'',
      type:'',
      focuse:"关注",
      label: {
         heartNum: 0,
         birstday: '用户暂未填写',
         interest: [],
         music: '',
         application: [],
      }
   },

   addHeart: function () {
      this.setData({ addheart: "addheart" });
      var up = "label.heartNum";
      if (this.data.likeTag == 'like') {
         var value = this.data.label.heartNum + 1;
         this.setData(
            {
               [up]: value,
               likeTag: "dislike"
            }
         )
      } else {
         var value = this.data.label.heartNum - 1;
         this.setData(
            {
               [up]: value,
               likeTag: "like"
            }
         )
      }
      var that = this;
      setTimeout(function () { that.setData({ addheart: "" }) }, 1000);
      this.formSubmit();
   },
   formSubmit: function () {//表单提交
      var that = this;
      var formData = this.data.label;
      if (wx.getStorageSync('customizeLabel')[0]) {
         var _id = wx.getStorageSync('customizeLabel')[0]._id;
         var _openid = wx.getStorageSync('customizeLabel')[0]._openid;
         cloudApi.savecustomizeLabel(formData, that.getcustomizeLabel, _openid, _id);
      } else {
         var _openid = wx.getStorageSync("appUserInfo")[0]._openid;
         cloudApi.savecustomizeLabel(formData, that.getcustomizeLabel, _openid);
      }
   },
   tofocus: function () {
      if (this.data.focuse == '关注') {
         this.setData(
            {
               focuse: "取消关注"
            }
         )
         var callback = function(){
            wx.showToast({
               title: '已关注',
            })
         }
         var param={
               focus_openid: wx.getStorageSync("OPENID"),
               focus_nickname: wx.getStorageSync("userInfo").nickName,
               focus_avatarUrl: wx.getStorageSync("userInfo").avatarUrl,
               focused_openid: this.data.openid,
               focused_nickname: this.data.userinfo.nickName,
               focused_avatarUrl: this.data.userinfo.avatarUrl
            }
         cloudFocusApi.addFocus(param,callback);
      } else {
         this.setData(
            {
               focuse: "关注"
            }
         )
         var callback = function (res) {
            wx.showToast({
               title: '已取消关注',
            })
         }
         cloudFocusApi.removeFocus(this.data._id,callback);
      }
   },
   checkFocus:function(){
      var that = this;
      var callback=function(text,data){
        that.setData({
           focuse:text,
           _id:data._id,
        })
      }
      cloudFocusApi.checkFocus(that.data.openid,callback)
   },
   getcustomizeLabel: function () {
      var that = this;
      var callback  = function(){
         if (wx.getStorageSync('customizeLabel').length > 0) {
            that.setData({
               label: wx.getStorageSync('customizeLabel')[0],
            })
            that.getImage(that.data.label.birstday);
         }else{
            // that.setData({
            //    label: wx.getStorageSync('customizeLabel')[0],
            // })
         }
         for (var i = 0; i < that.data.label.interest.length; i++) {
            that.choiceshow(that.data.label.interest[i], true);
         }
      }
      cloudApi.querycustomizeLabel(that.data.openid,callback);

   },
   lookOrder:function(){
      wx.navigateTo({
         url: '../orderList/orderList?openid='+this.data.openid,
      })
   },
   lookMore: function () {
      if (this.data.lookMore == "收起") {
         this.setData({
            applicationClass: "application",
            lookMore: "查看更多",
         })
      } else {
         this.setData({
            applicationClass: "applicationClass",
            lookMore: "收起",
         })
      }
   },
   musicInput: function (e) {//音乐输入
      var up = "label.music";
      this.setData({
         [up]: e.detail.value,
      })
      this.formSubmit();
   },
   showToast: function (arr) {//展示提示
      if (arr.length >= 6) {
         wx.showToast({
            title: '最多添加六个标签！',
            icon: 'none',
            duration: 1500//持续的时间
         })
         return true;
      } else {
         return false;
      }
   },
   choiceshow: function (value, tag) {
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
      if (tag) {
         if (this.showToast(arr)) { return };
         interest.find(findfunc);
         interest[_index].status = 1;
         this.setData({
            interest: interest
         });
      } else {
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
   choiceItem: function (e) {
      var value = e.target.dataset.id;
      this.choiceshow(value);
   },

   toEyeing: function () {

   },
   toFans: function () {

   },
   /**
    * 生命周期函数--监听页面加载
    */
   init: function () {
      var that =this;
      var callback = function (res){
         that.setData({
            userinfo: res[0].userinfo,
         })
         wx.hideLoading();  
      }
      cloudApi.getUserDate(this.data.openid,callback);
   },
   getXingzuo: function (month, day) {
      const s = '魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯';
      const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
   },
   getImage: function (eValue) {
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
   removeZero: function (res) {
      return parseInt(res);
   },
   sendMesg:function(){
      wx.navigateTo({
         url: "../sendMineMesg/sendMineMesg?openid=" + this.data.openid+"&&nickName=" + this.data.userinfo.nickName+ "&&avatarUrl=" + this.data.userinfo.avatarUrl+"&&type=send",
      })
   },
   onLoad: function (options) {
      wx.showLoading({
         title: '加载中',
      })
      this.setData({
         openid:options.openid,
      })
      if(options.type){
         this.setData({
            type: options.type
         })
      }
      this.getcustomizeLabel();
      if (wx.getStorageSync("customizeLabel").length <= 0) {
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
      this.checkFocus();
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