// pages/sponsor/Invitelove/index.js
import _HUIBAOData from '../../../utils/data';
var util = require('../../../utils/md5.js');
var app = getApp();
var defaultData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loveBeginDate: '开始恋爱的时间',
    insureOption: '是否有恋爱保险',
    insureProduct: '选择已买到的恋爱保险',
    insureTime: '选择生效日期',
    insured: false,
    dataSelected: false
  },
  checkData: function () {
    var seleced = false;
    if (defaultData.loveBeginDate != this.data.loveBeginDate
      && defaultData.insureOption != this.data.insureOption) {
      if (this.data.insureOption == '无') {
        seleced = true;       
      } else {
        if(defaultData.insureProduct != this.data.insureProduct
          && defaultData.insureTime != this.data.insureTime) {
          seleced = true;
        }
      }
    }
    this.setData({
      dataSelected: seleced
    })
    
  },
  bindDateChange: function (e) {
    this.setData({
      loveBeginDate: e.detail.value
    })
    this.checkData();
  },
  bindDateChange2: function (e) {
    this.setData({
      insureTime: e.detail.value
    })
    this.checkData();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    defaultData = 
    {
      loveBeginDate: this.data.loveBeginDate,
      insureOption: this.data.insureOption,
      insureProduct: this.data.insureProduct,
      insureTime: this.data.insureTime
    };
    console.log("=====linkId======" + wx.getStorageSync("linkId"));
  },
  onShareAppMessage: function () {
    var that = this;

    var linkId = util.hexMD5(app.userData.openId);
    return {
      title: '快来开通最有爱的恋爱链。一生只链一人！',
      imageUrl: '/images/share.png',
      path: '/pages/sponsor/index?tag=inviteLover&linkId=' + linkId,
      success: function(res) {

        // 保存记录

        var setData = "openId=" + app.userData.openId + "&linkId=" + linkId + "&loveBeginDate=" + that.data.loveBeginDate + "&insureOption=" + (that.data.insureOption=='有'?'true':'false');
        if (that.data.insureOption=='有') {
          setData += "&insureProduct=" + that.data.insureProduct + "&insureTime=" + that.data.insureTime + "&insurePid=" + app.userData.insurePid;
        }

        console.log(setData);

        wx.request({
          url: _HUIBAOData.huibao_host_inviteSuccess + "?" + setData + "&access_token=" + app.userData.accessToken,
          method: 'POST',
          data: {},
          header: {
            'content-type': 'application/x-www-form-urlencode' // 默认值
          },
          success: function (res) {
            if (res.data.code == 10000) {

              app.userData.linkId = res.data.response;
              
              wx.showToast({
                title: '邀请成功',
              })

            } else {
              console.log(res);
              wx.showToast({
                title: '邀请失败',
              })
            }

            setTimeout(function () {
              wx.navigateBack({
                url: '/pages/sponsor/index',
              })
            }, 1000);
          },
          fail: function (res) {
            wx.showToast({
              title: '邀请失败',
            })
            console.dir(res);
          }

        })

      }
    }
  },
  onShareTap: function () {
    var that = this;
    var itemList = [
      "有",
      "无"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#333333',//设置元素颜色
      success: function (res) {
        if (res.tapIndex === 1) {
          that.setData({
            insureProduct: defaultData.insureProduct,
            insureTime: defaultData.insureTime
          })
        }
        that.setData({
          insured: (res.tapIndex === 0),
          insureOption: (itemList[res.tapIndex])
        })
        that.checkData();
      }
    })
  },
  onShareTap2: function () {
    var that = this;
    var itemList = [
      "玫瑰版恋爱保险",
      "钻石版恋爱保险",
      "2年现金版恋爱保险",
      "3年现金版恋爱保险"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#333333',//设置元素颜色
      success: function (res) {
        app.userData.insurePid = res.tapIndex + '';
        that.setData({
          insureProduct: (itemList[res.tapIndex])
        })
        that.checkData();
      }
    })
  },
  //忘记生效日期
  onForget: function () {
    wx.navigateTo({
      url: '../forget/index',
    })
  },
  navigateBack: function () {
    wx.navigateBack({
      changed: true
    });//返回上一页  
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
  
  }
})