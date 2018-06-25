// pages/sponsor/strategy/index.js
import _HUIBAOData from '../../../utils/data';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mType:'',
    imgUrl:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //这里获取url里面的参数
    var that=this;
    var type=options.type;
    that.setData({
      mType:type
    })
    var mUrl = _HUIBAOData.huibao_host_strategy + '?type=' + that.data.mType + "&access_token=" + app.userData.accessToken
    console.log("=====strategy======"+mUrl)
    wx.request({
      
      url: mUrl,
      method: 'GET',
      data:{},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
        if (res.data.code == 10000) {
          that.setData({
            imgUrl: res.data.response
          })

          console.log("====response====" + that.data.imgUrl)

          

        } else {
          console.log("获取失败")
        }

      },
      fail: function (res) {
        console.log("联网失败")
      }

    })
  
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
  ,
  navigateBack: function () {
    wx.navigateBack({
      changed: true
    });//返回上一页  
  },

})