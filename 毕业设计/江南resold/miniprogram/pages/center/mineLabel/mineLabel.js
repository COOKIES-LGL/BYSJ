// pages/center/mineLabel/mineLabel.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
     userinfo:'',
     appUserInfo:{
        eyeing:10,
        fans:24,
     },
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
           img: '../../../images/wode/js.png',
           name: '简书',
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
           img: '../../../images/wode/github.png',
           name: 'github',
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
     musicList:'',
     userInterestList:[]
   },
   musicInput:function(e){
      this.setData({
         musicList: e.detail.value
      })
   },
   showToast:function(arr){
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
   choiceItem:function(e){
      var value = e.target.dataset.id;
      console.log(e);
      var arr = this.data.userInterestList;
      var interest = this.data.interest;
      var valueIndex;
      function check(item,itemIndex) {
         if(value == item){
            valueIndex = itemIndex;
            return value;
         }
      }
      var _index;
      function findfunc(item, itemIndex) {
         if (value == item.value) {
            _index = itemIndex
            return itemIndex;
         }
      }
      if (arr.find(check)){
         interest.find(findfunc);
         interest[_index].status = 0;
         this.setData({
            interest: interest
         })
         arr.splice(valueIndex,1);
         this.setData({
            userInterestList: arr
         })  
      }else{
         if(this.showToast(arr)){return};
         interest.find(findfunc);
         interest[_index].status = 1;
         this.setData({
            interest: interest
         });
         arr.push(value);
         this.setData({
            userInterestList: arr
         })
      }
      console.log(this.data.userInterestList)
   },
   toEyeing:function(){

   },
   toFans:function(){

   },
   /**
    * 生命周期函数--监听页面加载
    */
   init :function(){
     this.setData({
        userinfo:wx.getStorageSync("userInfo"),
      //   appUserInfo: wx.getStorageSync("appUserInfo")
     })
     
   },
   getXingzuo:function(month, day){
      const s = '魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯';
      const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
   },
   bindDate: function (e) {
      this.setData({
         dates: e.detail.value
      })
      console.log(this.data.dates);
      var arr = this.data.dates.split('-');
      var month = this.removeZero(arr[1]);
      var day = this.removeZero(arr[2]);
      var image = this.getXingzuo(month,day);
      console.log(image);
      this.setData({
         xinzuoImage: '../../../images/wode/'+image+"座.jpg"
      })
   },
   removeZero:function(res){
      return parseInt(res);
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
   onShow: function () {
     this.init();
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