
class Base{
  constructor(){
    "use strict"
  }
  nav_to(url, text) {//跳转页面
    wx: wx.navigateTo({
      url: url,
      success: function (res) {
        console.log(text)
      },
    })
  }
  getDataSet(event, key) {
  return event.currentTarget.dataset[key]
  }
  setTimeout(fn,arg){
     setTimeout(function(){fn(arg)},200);
  }
  formatNumber(n) {//规范数字
      n = n.toString()
      return n[1] ? n : '0' + n
  }  
  formatDate(time){
    const year = time.getFullYear();
    const month = time.getMonth()+1;
    const day = time.getDate;
    const hour = time.getHours();
    const minute = time.getMinutes();
    return [year, month, day].map(this.formatNumber).join("/") + " " + [hour, minute].map(this.formatNumber).join(":")
  }
  setdb(){
    const db = wx.cloud.database({
      env: 'resold-822f1b'
    })
    console.log(db)
    return db  
  }
}

export {Base}