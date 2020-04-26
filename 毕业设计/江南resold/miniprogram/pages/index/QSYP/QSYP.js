//index.js
const app = getApp()
import { Base } from '../../base/common.js';
import { configData } from "../../config/configData.js/"
import { cloudapi } from "../../cloud_api/api_index.js"
const cloudApi = new cloudapi
const base = new Base();

var touch = {
   startX: "",
   startY: "",
   endX: "",
   endY: ""
}
Page({

   data: {
      index: '',
      searchInput: '',
      couldFuncName: "getOrderTopList",
      hideSearch: false,
      if_phone_list: false,
      search_show_list: [],
      searchList: [],
      hasesellData: true,
      hasebookData: true,
      multiIndex: [0, 0],
      multiArray: [],
      options: [
         {
            img: '../../images/icon8.png',
            name: '教材资料'
         },
         {
            img: '../../images/icon4.png',
            name: '寝室用品'
         },
         {
            img: '../../images/icon6.png',
            name: '三方服务'
         },
         {
            img: '../../images/icon5.png',
            name: '其它'
         },
      ],
      check1: "onchoiced",
      check2: "btn",
      toView: "demo1",
      changed1: false,
      changed2: false,
      section1: "Unsection",
      section2: "Unsection",
      college_text: "您要筛选的学院",
      major_text: "您要筛选的专业",
      collegeArr: ["物联网工程（卓越工程师）", "自动化（卓越工程师）", "自动化", "电气工程及其自动化", "计算机科学与技术", "通信工程", "微电子科学与工程"],
      collegeIndex: 0,
      book_order_items: [],
      sell_order_items: [],
      if_search_list: false,
      nosellListData: true,
      nobookListData: true,
      noListData: true,
      defaultValue: false,
      noData: true,
      param1: {
         searchMesg: "卖物",
         college: '',
         major: '',
         pageSize: 6,
         pageNum: 0,
         goodsTitle: '寝室用品',
      },
      param2: {
         searchMesg: "买物",
         college: '',
         major: '',
         pageSize: 6,
         pageNum: 0,
         goodsTitle: '寝室用品',
      },
   },

   init: function () {
      var up1 = "param1.pageNum";
      var up2 = "param2.pageNum";
      var college1 = "param1.college";
      var college2 = "param2.college";
      var major1 = "param1.major";
      var major2 = "param2.major";
      this.setData({
         [up1]: 0,
         [up2]: 0,
         couldFuncName: "getOrderTopList",
      });
      if (wx.getStorageSync("appUserInfo")[0].major) {
         var college = wx.getStorageSync("appUserInfo")[0].college
         var major = wx.getStorageSync("appUserInfo")[0].major
         this.setData({
            [college1]: college,
            [college2]: college,
            college_text: college,
            major_text: major,
            [major1]: major,
            [major2]: major,
            defaultValue: true,
            couldFuncName: "getOrderMajorList",
         })
      }
      this.getsearchTips();
   },

   bindMultiPickerChange: function (e) {
      wx.showLoading({
         title: '加载中..',
         mask: true,
      })
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
         multiIndex: e.detail.value,
         changed1: true,
         section1: "section",
         couldFuncName: "getOrdercollegeList",
      })
      this.reload(1, this.data.multiArray[1][this.data.multiIndex[1]])
   },
   bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
         multiArray: this.data.multiArray,
         multiIndex: this.data.multiIndex,
         changed1: true,
         section1: "section",
         collegeArr: [],
         couldFuncName: "getOrdercollegeList",
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
      switch (data.multiArray[1][data.multiIndex[1]]) {
         case "物联网工程学院":
            data.collegeArr = configData[0].wulianwanggongcheng; break;
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
         case "数字媒体学院":
            data.collegeArr = configData[0].shuzimeiti; break;
         default: break;
      }
      console.log(data);
      this.setData(data);
      this.reload(1, this.data.multiArray[1][this.data.multiIndex[1]])
   },
   bindPickerType1: function (e) {
      wx.showLoading({
         title: '加载中..',
         mask: true,
      })
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
         collegeIndex: e.detail.value,
         changed2: true,
         section2: "section",
         couldFuncName: "getOrderMajorList",
      })
      this.reload(2, this.data.collegeArr[this.data.collegeIndex]);
   },
   reload: function (tag, value) {
      var college1 = "param1.college";
      var college2 = "param2.college";
      var major1 = "param1.major";
      var major2 = "param2.major";
      if (tag == 1) {
         this.setData({
            [college1]: value,
            [college2]: value,
         });
      } else {
         this.setData({
            [major1]: value,
            [major2]: value,
         });
      }
      this.loadData("firstLoad");
   },
   renderData: function (tag) {
      if (tag) {
         if (wx.getStorageSync("TopsellOrderList").length > 0) {
            this.setData({
               sell_order_items: wx.getStorageSync("TopsellOrderList"),
               nosellListData: true
            })
         } else {
            this.setData({
               nosellListData: false,
               noListData: false,
            })
         }
      } else {
         if (wx.getStorageSync("TopbookOrderList").length > 0) {
            this.setData({
               book_order_items: wx.getStorageSync("TopbookOrderList"),
               nobookListData: true
            })
         } else {
            this.setData({
               nobookListData: false
            })
         }
      }
      console.log(this.data.noListData)

   },

   getsearchTips: function () {//获取搜索数据
      var searchTextArr = configData[0].searchText;
      var searchtipArr = [];
      searchTextArr.find(function (item) {
         if (wx.getStorageSync("appUserInfo").length > 0) {
            if (item.college == wx.getStorageSync("appUserInfo")[0].college) {
               searchtipArr = item.searchtips;
            }
         }
      })
      if (searchtipArr.length > 0) {
         this.setData({
            search_show_list: searchtipArr
         })
         wx.setStorageSync("searchtipArr", searchtipArr);
      }
   },

   onPageScroll: function (e) {//page滑动隐藏search
      var that = this;
      clearTimeout(this.data.s_timer)
      this.data.s_timer = setTimeout(() => {
         that.setData({
            hideSearch: e.scrollTop >= 60 ? true : false,
         })
      }, 20)
   },

   seachAction: function (value) {
      var searchList = [];
      if (!value) { searchList = []; return; }
      this.data.search_show_list.find(function (item) {
         if (item.indexOf(value) == 0) {
            searchList.push(item);
         }
      })
      if (searchList.length > 0) {
         this.setData({
            if_search_list: true,
            searchList: searchList
         })
      } else {

      }
   },
   bindblur: function (e) {
      var value = e.detail.value;
      var that = this;
      this.to_search(value);
      if (value) {
         setTimeout(function () { that.to_search(value); }, 300);
      }
   },
   to_search: function (value) {
      wx.navigateTo({
         url: '../search/search?searchText=' + value,
      })
   },
   item_search_click: function (event) {
      var bookValue = base.getDataSet(event, "id");
      this.setData({
         searchInput: bookValue,
         if_search_list: false,
      })
      wx.navigateTo({
         url: '../search/search?searchText=' + bookValue,
      })
   },
   bindInput: function (e) {
      var value = e.detail.value;
      if (value === "jndx") {
         wx.navigateTo({
            url: '../innerManager/ManagerHome/ManagerHome',
         })
      } else {
         this.seachAction(value);
      }
   },
   item_search_click: function (event) {
      var bookValue = base.getDataSet(event, "id");
      this.setData({
         searchInput: bookValue,
         if_search_list: false,
      })
      this.to_search(bookValue)
   },

   toDetail: function (event) {
      var order_id = base.getDataSet(event, "goodsid");
      var type = base.getDataSet(event, "type");
      wx.navigateTo({
         url: '../../detail/detail?id=' + order_id + "&&type=" + type,
      })
   },

   typeCheck: function (event) {//发布预约切换
      wx: wx.showLoading({
         title: '加载中',
         mask: true,
      })
      var listtype = event.currentTarget.dataset.type;
      if (listtype === "物品发布") {
         this.setData({
            check1: "onchoiced",
            check2: "btn",
            toView: "demo1",
            noListData: this.data.nosellListData
         })
      } else {
         this.setData({
            check2: "onchoiced",
            check1: "btn",
            toView: "demo2",
            noListData: this.data.nobookListData
         })
      }
      this.init();
      this.loadData("firstLoad");
   },

   onShow: function () {
      wx.showLoading({
         title: '加载中',
      });
      this.init();
      this.loadData("firstLoad");
      let res = wx.getSystemInfoSync()
      wx.setStorageSync('height', res.screenHeight)//获取屏幕高度
   },

   loadData: function (res) {//数据加载
      var that = this;
      var callback1 = function (num, newData) {
         if (num == 0) {
            that.data.noData = false;
            that.data.hasesellData = false;
         }
         var up = "param1.pageNum";
         that.setData({
            [up]: num,
            sell_order_items: newData || that.data.sell_order_items
         });
         base.setTimeout(that.renderData, true);
      }
      var callback2 = function (num, newData) {
         if (num == 0) {
            that.data.noData = false;
            that.data.hasebookData = false;
         }
         var up = "param2.pageNum";
         that.setData({
            [up]: num,
            book_order_items: newData || that.data.book_order_items
         });
         base.setTimeout(that.renderData, false);
      }
      if (res == "firstLoad") {
         wx.setStorageSync("TopsellOrderList", []);
         wx.setStorageSync("TopbookOrderList", []);
         if (this.data.nosellListData) {
            cloudApi[this.data.couldFuncName](this.data.param1, callback1);
         } else {
            wx.hideLoading();
         }
         if (this.data.nobookListData) {
            cloudApi[this.data.couldFuncName](this.data.param2, callback2);
         } else {
            wx.hideLoading();
         }
      } else {
         if (this.data.toView == "demo1") {
            if (this.data.hasesellData) {
               cloudApi[this.data.couldFuncName](this.data.param1, callback1);
            } else {
               wx.hideLoading();
            }
         } else {
            if (this.data.hasebookData) {
               cloudApi[this.data.couldFuncName](this.data.param2, callback2);
            } else {
               wx.hideLoading()
            }
         }
      }

   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.setData({
         multiArray: [configData[0].campus, configData[0].north_college]
      })
   },

   navTo: function (e) {
      var Index = e.currentTarget.dataset.index;
      switch (Index) {
         case 0: wx.navigateTo({
            url: '../index/JCZL/JCZL',
         }); break;
         case 1: wx.navigateTo({
            url: '../index/QSYP/QSYP',
         }); break;
         case 2: wx.navigateTo({
            url: '../index/SFFW/SFFW',
         }); break;
         case 3: wx.navigateTo({
            url: '../index/QT/QT',
         }); break;
         default: break;
      }
   },
   rankList: function () {
      wx.navigateTo({
         url: '../rankList/rankList',
      })
   },
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },
   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },
   onPullDownRefresh: function () {
      wx.showLoading({
         title: '加载中..',
         mask: true,
      })
      this.init();
      this.loadData("firstLoad");
      wx.stopPullDownRefresh();
   },
   onReachBottom: function () {
      wx.showToast({
         title: '获取更多订单中',
         icon: 'loading',
         duration: 500
      });
      this._loadMoreData()
   },
   _loadMoreData: function () {
      this.loadData();
   },


   _notice: function () {//欢迎界面

   }

})
