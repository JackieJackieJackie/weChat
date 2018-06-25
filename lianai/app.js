//app.js
import _HUIBAOData from '/utils/data';
var timer;
var currentTime;
App({
  onLaunch: function () { },
  onShow: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.getUserInfo(this);

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function (cb) {
   
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code;
          console.log('rrbx===login=code=》' + code);

          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)

              var userInfo = res.userInfo,
                nickName = userInfo.nickName,
                avatarUrl = userInfo.avatarUrl,
                gender = userInfo.gender,
                province = userInfo.province,
                city = userInfo.city,
                country = userInfo.country;

              that.userData.userInfo = userInfo;
              var userSet = '&wxName=' + nickName + '&wxAvatar=' + avatarUrl + '&sex=' + gender + '&province=' + province + '&city=' + city + '&appId=' + that.userData.appId + '&secret=' + that.userData.secret;

              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              if (code) {
                console.log('rrbx==login=code===》'+userSet);
                wx.request({
                  url: _HUIBAOData.huibao_host_userinfo + '?jscode=' + code + userSet,
                  method: 'POST',
                  data: {},
                  header: {
                    'content-type': 'application/x-www-form-urlencode' // 默认值
                  },
                  success: function (res) {
                    if (res.data.code == 10000) {
                      that.userData.openId = res.data.response.openId;
                      that.userData.accessToken = res.data.response.accessToken;
                      that.userData.nickName = nickName;
                      console.log("====openId======" + res.data.response)

                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (that.userInfoReadyCallback) {
                        that.userInfoReadyCallback(res)
                      }
                    } else {
                      console.log(res);
                    }
                  },
                  fail: function (res) {
                    console.dir(res);
                  }

                })

              } else {
                console.log('获取用户code失败！' + res.errMsg)
              }

            },
            fail: function () {
              // 调用微信弹窗接口
              wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法正常使用******的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                success: function (res) {
                  if (res.confirm) {
                    wx.canIUse('button.open-type.getUserInfo') 

                  }
                }
              })
            }
          })
        }
      })

    }
  },

  globalData: {
    userInfo: '',
    utoken: '',
  },
  userData: {
    'openId': '',
    'accessToken':'',
    'nickName':'',
    'linkId': '',
    'appId': '你自己的',
    'secret':'你自己的',
    'insurePid': '',
    'userInfo': {}
  }
})