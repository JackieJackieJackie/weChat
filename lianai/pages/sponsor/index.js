// pages/sponsor/index.js
import _HUIBAOData from '../../utils/data';
var app = getApp();
var sging = false;
var types = ['default', 'primary', 'warn']
var pageObject = {
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },
  setDisabled: function (e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function (e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function (e) {
    this.setData({
      loading: !this.data.loading
    })
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: '',
    tagDenglu:false,//判断被邀人是否是 恋人
    match: false,//是否匹配
    zf: false,//是否已送祝福
    dz: false,//是否当日已领取登陆钻
    insured: false,
    showInfo: false,
    showUserInfo: false,
    closeEject: false,
    myIcon: '/images/blank.png',
    loverIcon: '/images/blank.png',
    cntZuan: 0,
    sgnum: 0,
    diamondList: [],
    sgList: [],
    sgClk: [],
    zuanLabel: '查看恋爱钻',
    daysLabel: '查看相恋天数',
    leftDays: '',
    insureLabel: '距离领取玫瑰还有',
    item: {},
    rankList: [],
    myRanking: {},
    isSplashModal:true,//闪屏页面
    linkId:"",//接受来自 分享的linked、或者单双链 创建的linkId


    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false

  },

 

  onReady: function (e) {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // for (var i = 0; i < types.length; ++i) {
    //   (function (type) {
    //     pageObject[type] = function (e) {
    //       var key = type + 'Size'
    //       var changedData = {}
    //       changedData[key] =
    //         this.data[key] === 'default' ? 'mini' : 'default'
    //       this.setData(changedData)
    //     }
    //   })(types[i])
    // }

    // Page(pageObject)
    

    var that=this;

    that.setData({
      tag: options.tag ? options.tag : ""
    });


    //是否显示引导页
    var isFir=wx.getStorageSync("isFirst");

   
    if (isFir ){
      that.setData({
        isSplashModal: false,//闪屏页面
      })

    }else{
      that.setData({
        isSplashModal: true,//闪屏页面
      })
    }
    if (options.linkId){
      console.log("======分享获得=linkId======" + options.linkId)
      //分享进入的 不去选择 单、双链，不获得linked;,已经选择的，不需要再去选择获得linkId
      that.setData({
        isSplashModal: false,//闪屏页面
        linkId: options.linkId,
      })
      //判断被邀请人 是否是恋人
      if (that.data.tag == 'inviteDz') {
        that.isLover();
      }

     
    }

  

    var isFir = wx.setStorageSync("isFirst","true");
    this.refreshData();
  },
  //获取linked
  createChain: function () {
    var that=this;
    wx.request({
      url: _HUIBAOData.huibao_host_createChain + "?openId=" + app.userData.openId + "&access_token=" + app.userData.accessToken,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {

        if (res.data.code == 10000) {
        

          that.setData({
            linkId: res.data.response
          })
        
        }
      }
    })
  }
  ,
  refreshData: function () {
    var that = this;
    if (app.userData.openId) {
      this.loadData();
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        if (res.data != undefined && res.data.code != undefined && res.data.code == 10000) {
          that.loadData();
        }
      }
    }
  },

  clkSg: function (e) {

    if (sging) return;

    var id = e.currentTarget.id;

    sging = true;

    //请求数据
    var that = this;
    var value = that.data.diamondList[id].value;
    var baseId = that.data.diamondList[id].baseId;
   

    wx.request({
      url: _HUIBAOData.huibao_host_sendZu + "?openId=" + app.userData.openId + "&linkId=" + app.userData.linkId + "&baseId=" + baseId + "&access_token=" + app.userData.accessToken,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {


        console.log("rrbx===" + res.data.code);
        if (res.data.code == 10000) {

          //MP3 收割音效
          wx.playBackgroundAudio({
            dataUrl: 'https://m1.renrenbx.com/rrbxcdn/miniapp/bi.mp3'
          });

          // 更新数据
          var newval = Math.floor((that.data.cntZuan + value) * 10000) / 10000;
          that.setData({
            cntZuan: newval,
            zuanLabel: "恋爱钻   " + newval
          });



          var ls = that.data.sgClk;
          ls[id] = 1;

          that.setData({
            sgClk: ls
          });



          var anim = 'sgList[' + id + '].anim'

          var cnt = 0;
          var key;
          for (key in that.data.sgClk) {
            if (that.data.sgClk[key] == 1)
              cnt++;
          }
          if (cnt == that.data.sgnum) {
            console.log('收割完成');


            setTimeout(function () {
              that.setData({
                sgnum: 0
              });
            }, 1000);
          }

        } else {

          //收割失败
          var ls = that.data.sgClk;
          ls[id] = 0;

          that.setData({
            sgClk: ls
          });

          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 1000
          })

        }
        sging = false;
      },
      fail: function (res) {
        console.dir(res);

        //收割失败
        var ls = that.data.sgClk;
        ls[id] = 0;

        that.setData({
          sgClk: ls
        });

        wx.showToast({
          title: '请求服务器失败',
          icon: 'loading',
          duration: 1000
        })

        sging = false;
      }

    })

  },


  /**
   * 送祝福
   */
  onZf: function (options) {


    //请求数据
    var that = this;

    wx.request({
      url: _HUIBAOData.huibao_host_sendZf + "?openId=" + app.userData.openId + "&linkId=" + app.userData.linkId + "&access_token=" + app.userData.accessToken,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
        console.log("rrbx===" + res.data.code);
        if (res.data.code == 10000) {
          wx.showToast({
            title: '祝福成功',
          })
          // 更新数据
          var newval = Math.floor((that.data.cntZuan + 5) * 10000) / 10000;
          that.setData({
            cntZuan: newval,
            zuanLabel: "恋爱钻   " + newval,
            zf: true,
            closeEject: true
          });
        } else {
          console.log(res);
          wx.showToast({
            title: res.data.info,
            icon: 'loading'
          })
          that.setData({
            zf: true,
            closeEject: true
          });
        }
      },
      fail: function (res) {
        console.dir(res);
      }

    })

  },

  /**
   * 登录领钻
   */
  onDz: function (options) {

    //请求数据
    var that = this;

    wx.request({
      url: _HUIBAOData.huibao_host_sendDz + "?openId=" + app.userData.openId + "&linkId=" + app.userData.linkId + "&access_token=" + app.userData.accessToken,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
        console.log("rrbx===" + res.data.code);
        if (res.data.code == 10000) {
          wx.showToast({
            title: '领取成功',
          })
          // 更新数据
          var newval = Math.floor((that.data.cntZuan + 1) * 10000) / 10000;
          that.setData({
            cntZuan: newval,
            zuanLabel: "恋爱钻   " + newval,
            dz: true,
            closeEject: true
          });
        } else {
          console.log(res);
          wx.showToast({
            title: res.data.info,
            icon: 'loading'
          })
          that.setData({
            dz: true,
            closeEject: true
          });
        }
      },
      fail: function (res) {
        console.dir(res);
      }

    })

  },

  //点击查看
  onViewCnt: function () {
    console.log('ok');
    if (!this.data.match) {
      wx.showModal({
        title: '提示',
        content: '邀请心上人加入后，才可以查看哦',
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#333333'
      })
    }
  },
  //关闭弹框
  closeEject: function () {
    this.setData({
      closeEject: true,
      showInfo: false,
      showUserInfo: false
    })
  },
  //邀请心上人
  onInviteloves: function () {
    console.log('ok');

    wx.navigateTo({
      url: 'invitelove/index',
    })
  },
  //恋爱花园
  onLoveGarden: function () {
    wx.navigateTo({
      url: 'lovegarden/index',
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      var tag = "", title = "";
      if (res.target.id == "friend") {
        tag = "inviteZf";
        title = '我和对象开通了恋爱链，快来送祝福吧';
      } else if (res.target.id == "login") {
        tag = "inviteDz";
        title = '亲爱的，想你了，快来恋爱链，领取恋爱钻';
        
      }

      var url = '/pages/sponsor/index?tag=' + tag + '&linkId=' + app.userData.linkId;

      console.log(url);
      return {
        title: title,
        imageUrl: '/images/share.png',
        path: url,
        success: function (res) {
          // 保存记录
          wx.showToast({
            title: '邀请成功',
          })
        }
      }
    } else {
      return {
        title: '西方有巴黎情人锁，东方有微信恋爱链，一条恋爱链，一生只链一人，天长地久，不可串改，点击开启相恋之旅',
        imageUrl: '/images/share.png',
        path: '/pages/sponsor/index',
      }
    }
  },
  //判断被邀请人是不是恋人
  isLover:function(){
    var that=this;
    wx.request({
      url: _HUIBAOData.huibao_host_garden_islover + "?openId=" + app.userData.openId + "&linkId=" + that.data.linkId + "&access_token=" + app.userData.accessToken,
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {

        if (res.data.code == 10000) {


          that.setData({
            tagDenglu: res.data.response
          })

        }
      }
    })
  },
  onInfo: function () {
    this.setData({
      showInfo: true,
      closeEject: false
    });
  },
  onUserInfo: function () {
    this.setData({
      showUserInfo: true,
      closeEject: false
    });
  },
  onZfReg: function () {
    wx.navigateTo({
      url: '/pages/sponsor/index',
    })
    this.setData({
      match: false,//是否匹配
    })
  },
  loadData: function () {
    //请求数据
    var that = this;
    if (app.userData.userInfo.avatarUrl) {
      that.setData({
        myIcon: app.userData.userInfo.avatarUrl
      });
    }

    var url = '';
    if (that.data.tag == '' ) {
      url = _HUIBAOData.huibao_host_home;
    } else if (that.data.tag == 'inviteLover') {
      url = _HUIBAOData.huibao_host_homeInviteAccepted;
    } else if (that.data.tag == 'inviteZf') {
      url = _HUIBAOData.huibao_host_homeInviteZf;
    } else if (that.data.tag == 'inviteDz' && that.data.tagDenglu) {
      url = _HUIBAOData.huibao_host_homeInviteDz;
    } else if (that.data.tag == 'inviteDz' && that.data.tagDenglu == false) {
      url = _HUIBAOData.huibao_host_home;
    }

    url += "?openId=" + app.userData.openId + "&linkId=" + that.data.linkId + "&access_token=" + app.userData.accessToken;
    console.log("tagDenglu===》" + that.data.tagDenglu);
    console.log("openId===》" + app.userData.openId);
    console.log("homeUrl===》" + url);
    //先选择单恋、双链 创建linked
  
    wx.request({
      url: url,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
        if (res.data.code == 10000) {
         
          that.setData({
            item: res.data.response.item,
            rankList: res.data.response.rankList,
            myRanking: res.data.response.myRanking
          });

          if (res.data.response.item) {
            app.userData.linkId = res.data.response.item.linkId;
            console.log("====主页加载获得的=linkId======" + app.userData.linkId);
            wx.setStorageSync("linkId", res.data.response.item.linkId);
            that.setData({
              linkId: app.userData.linkId,
            })
            //完成配对
            if (res.data.response.item.matchSuccess == "true") {
              that.setData({
                match: true,
                zf: res.data.response.item.zf == "true",
                dz: res.data.response.item.dz == "true",
                sgnum: res.data.response.item.diamondList ? res.data.response.item.diamondList.length : 0,
                diamondList: res.data.response.item.diamondList,
                myIcon: res.data.response.item.myIcon,
                loverIcon: res.data.response.item.loverIcon,
                cntZuan: res.data.response.item.zuan,
                zuanLabel: "" + res.data.response.item.zuan,
                daysLabel: "" + res.data.response.item.loveDays,
                leftDays: res.data.response.item.leftDays,
              });
              that.initSg();
            }else{
              that.setData({
                match: false,
                zf: res.data.response.item.zf == "false",
                dz: res.data.response.item.dz == "false",
                sgnum: res.data.response.item.diamondList ? res.data.response.item.diamondList.length : 0,
                diamondList: res.data.response.item.diamondList,
                myIcon: res.data.response.item.myIcon,
                loverIcon: res.data.response.item.loverIcon,
                cntZuan: res.data.response.item.zuan,
                zuanLabel: "" + res.data.response.item.zuan,
                daysLabel: "" + res.data.response.item.loveDays,
                leftDays: res.data.response.item.leftDays,
              });
              that.initSg();
            }
            //是否投保
            if (res.data.response.item.insured == "true") {
              app.userData.insurePid = res.data.response.item.insurePid;

              var itemList = [
                "距离领取玫瑰还有",
                "距离领取钻石还有",
                "距离领取现金还有",
                "距离领取现金还有"
              ]

              that.setData({
                insured: true,
                insureLabel: itemList[res.data.response.item.insurePid]
              });
            }
          }
        } else {
          console.log(res);
          wx.showToast({
            title: res.data.info,
            icon: 'loading'
          })
          console.log("=====info======" + res.data.info)
          if ("尚未创建恋爱链或参与配对!" == res.data.info){
            that.setData({
              isSplashModal: true,
            })
          
          }
        }
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      },
      fail: function (res) {
        console.dir(res);
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }

    })
  },

  initSg: function () {
    if (this.data.sgnum == 0) {
      return;
    }

    // 收割
    var ls = [];
    var ls2 = [];

    for (var i = 0; i < this.data.sgnum; i++) {
      var it = { x: 0, y: 0, value: this.data.diamondList[i].value, anim: "anim" + i };
      if (i % 2 == 0) {
        it.y = 140 + Math.ceil(Math.random() * 20);
      } else {
        it.y = Math.ceil(Math.random() * 40) - 40;
      }

      it.x = i * ((this.data.sgnum > 7 ? 0 : 1) * 20 + 65 + Math.ceil(Math.random() * 10)) + Math.ceil(Math.random() * 20) + (10 - this.data.sgnum) * 25;

      ls.push(it);

      ls2.push(0);
    }
    this.setData({
      sgList: [],
      sgClk: []
    });
    this.setData({
      sgList: ls,
      sgClk: ls2
    });
  },

  // 下拉刷新  
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    this.refreshData();
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //开屏页面 选择 单双链 ，首页获取数据使用
  splashModal:function(){
    var that=this;
    that.setData({
      isSplashModal:false,     
    })
    //初次进入单、双链选择，获得linked
    that.createChain();

  },
 
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }
})