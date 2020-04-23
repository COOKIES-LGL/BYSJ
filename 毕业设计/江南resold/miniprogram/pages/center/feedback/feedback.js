Page({

  /**
   * 页面的初始数据
   */
  data: {
    subLists:[
        '隐私泄露','交易失败','平台Bug','打赏失败'
        ],
    text:''
  },

  bindInput: function (e) {
      this.setData({
          text: e.detail.value
      });
  },

  onAddInfo: function(e) {
      let id = e.currentTarget.dataset.id
      console.log(this.data.subLists[id])
      this.setData({
          text: this.data.text + this.data.subLists[id]+'，'
      })

  },

  onSubmit: function(e) {
      if(this.data.text==''){
        wx.showToast({
          title: '亲，反馈信息不能为空',
          icon:'none',
        })
      }else{
     // let id = wx.getStorageSync('id')
      let params = {
        url: 'comments/feedback',
        setUpUrl:true,
        type: 'POST',
        data:{
            detail: this.data.text,
            token: wx.getStorageSync('Public_token')
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        }, 
        sCallback:function(e) {
            console.log(e)
            if(e.status==true ){
                wx.showToast({
                    title: '提交成功',
                    icon: 'success'
                })
                setTimeout(function(){
                    wx.navigateBack({})
                },1500)
                
            } else {
                wx.showModal({
                    title: '提交失败',
                    content: '请稍后重新提交',
                    showCancel:false,
                    confirmColor: '#FFC002'
                })
            }
        },
        eCallback:function(e){
            wx.showModal({
                title: '提交失败',
                content: '请稍后重新提交',
                showCancel: false,
                confirmColor: '#FFC002'
            })
        }
      }
      // base.request(params)
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
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