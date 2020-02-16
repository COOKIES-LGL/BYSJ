

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
    code_ID: '',//学生证号
    name: '',//姓名
    lost_type: '',//类型
    subLists: [
      '教材课本', '试卷资料', '运动器材', '三方服务', '数码产品', '寝室用品','官方发布',"其它"
    ],
    phone_status: false,
    site_status: false,
    title_status: false,
    time_status: false,
    code_status: '',
    name_status: '',
    changed1: false,
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
        lost_type: 'lose'
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
        title: '物品名称不能为空',
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
  bind_max: function (e) {
    var value = e.detail.value;
    if (value == '') {
      wx.showToast({
        title: '价位不能为空',
        icon: 'none',
        duration: 600
      })
    } else {
      this.setData({
        site_status: true,
        site: value
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
        site_status: true,
        site: value
      });
    }
  },
  description: function (e) {
    var value = e.detail.value;
    this.setData({
      description: value,
    })
    //  console.log(this.data.descrition);
  },
  check_phone: function (e) {
    var Phone = e.detail.value;
    let status = this.checkNumber(Phone);
    if (!status) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
      })
    } else {
      this.setData({
        phone_status: status,
        phone: Phone,
      })
    }
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
    if (id == 0) {
      if (that.data.check1 == 'hover_radio') {
        that.setData({
          place_text1: '若校园卡信息清晰，请务必填写！',
          show: false,
        })
      } else {
        that.setData({
          place_text1: '请务必填写！',
          show: false,
        })
      }
    } else {
      that.setData({
        show: true,
      })
    }
    console.log(this.data.subLists[id])
    this.setData({
      text: this.data.subLists[id]
    })

  },
  onLoad: function (options) {

  },
  add_image: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        let tempFilePaths = res.tempFilePaths[0];
        that.setData({
          avatarPath: tempFilePaths,
          add: true,
          image: false
        })
      }
    })
  },
 
  onsubmit: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})