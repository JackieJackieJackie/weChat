import _HUIBAOData from '../../../utils/data';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPopping: true, //是否已经弹出
    isSeed: true, //默认选中 种子
    isPack: false, //默认不选中 包装
    isProperty: false, //默认不选择 道具
    animPlus: {}, //旋转动画
    animSetting: {}, //item位移,透明度
    animNotice: {}, //item位移,透明度
    animStrategy: {}, //item位移,透明度
    animRecord: {}, //item位移,透明度
    index: 0, //记录第几个item
    animation: '',
    closeEject: true,
    closeEjectStrategy:true,
    carts: [], // 购物车列表
    hasShopInfoList: false, //商店列表是否有数据
    hasWarehouseInfoList: false, //仓库列表是否有数据
    selectAllStatus: true, // 全选状态，默认全选
    obj: {
      name: "hello"
    },
    cntZuan: 0,
    sgnum: 0,
    growthStatus: '', //"0"-"4"分别是 枯萎 种子 幼苗 大叶子期 成熟期
    landStatus: '', //10-可浇水 11-已浇水 20-可除草 21-已除草 30-可除虫 31-已除虫 40-可收取 50-可铲除 00-可播种
    matchSuccess: "false", //匹配字段
    WateringType: '',
    plantId: '',
    landId: '',
    occupied: 0, //0--空土地  1--已经种植
    gardenOpenId: "", //花园入口id
    mShopWarehouseType: 1, //0-花朵 1-种子 2-包装 3-道具
    mShopInfoList: [], //商店列表信息
    mWarehouseInfoList: [], //仓库列表信息
    mWarehouseInfoListDetail: {}, //仓库产品详情
    mWarehouseInfoListDetailCount: 0, //玫瑰总数
    mWarehouseInfoListDetailID: '', //仓库的物品Id
    mSellCount: 1, //仓库出售玫瑰的数量
    mRecordLogsList: [], //交易记录数据
    hasRecordList: false, //交易记录 是否有数据
    showToastLandStatus: '成功', //种子生长的各种状态提示
    inviteName: '', //恋爱花园题目
    circleStatus: true, //记录头像颜色的当前状态
    isSelf: "无权查看",
    myOpenId: '',
    myIcon: '',
    loverOpenId: '',
    loverIcon: '',
    imgUrl:''
  },

  //关闭弹框
  closeEject: function() {
    this.setData({
      closeEject: true,
    })
  },
  //关闭公告弹框
  closeEjectStrategy: function () {
    this.setData({
      closeEjectStrategy: true,
    })
  },
  //点击弹出
  plus: function() {

    if (this.data.isPopping) {
      //弹出动画
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //缩回动画
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },
  gardenSetting: function() {
    console.log("setting");
    wx.navigateTo({
      url: '../settings/index',
    })
  },
  gardenNotice: function() {
    console.log("notice")
    wx.navigateTo({
      url: '../strategy/index?type=' + 1,
    })
  },
  gardenStrategy: function() {
    console.log("strategy")
    wx.navigateTo({
      url: '../strategy/index?type=' + 2,
    })
  },


  /**花园 ---交易记录 */
  onRecord: function() {


    console.log("record")
    var that = this;
    if (that.data.circleStatus == false) {
      wx.showToast({
        title: that.data.isSelf,
        icon: 'loading',
        duration: 2000

      })
      return;
    }


    that.setData({
      closeEject: false
    });
    wx.request({
      url: _HUIBAOData.huibao_host_garden_recordLogs + '?openId=' + app.userData.openId + "&limit=1000" + "&access_token=" + app.userData.accessToken,
      method: "GET",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function(res) {

        if (res.data.code == 10000) {
          var mData = res.data.response;
          if (mData.length > 0) {
            that.setData({
              hasRecordList: true,
              mRecordLogsList: mData
            })
          } else {
            that.setData({
              hasRecordList: false,
            })
          }


        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 2000
          })
        }

      },
      fail: function(res) {
        console.log("网络连接失败！")
      }
    })
  },


  //弹出动画
  popp: function() {
    //plus顺时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationSetting = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationNotice = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationStrategy = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationRecord = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationSetting.translate(-30, -70).rotateZ(360).opacity(1).step();
    animationNotice.translate(-72, -22).rotateZ(360).opacity(1).step();
    animationStrategy.translate(-60, 35).rotateZ(360).opacity(1).step();
    animationRecord.translate(-5, 60).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animSetting: animationSetting.export(),
      animNotice: animationNotice.export(),
      animStrategy: animationStrategy.export(),
      animRecord: animationRecord.export(),
    })
  },
  //收回动画
  takeback: function() {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationSetting = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationNotice = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationStrategy = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationRecord = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationSetting.translate(0, 0).rotateZ(0).opacity(0).step();
    animationNotice.translate(0, 0).rotateZ(0).opacity(0).step();
    animationStrategy.translate(0, 0).rotateZ(0).opacity(0).step();
    animationRecord.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animSetting: animationSetting.export(),
      animNotice: animationNotice.export(),
      animStrategy: animationStrategy.export(),
      animRecord: animationRecord.export(),
    })
  },
  navigateBack: function() {
    wx.navigateBack({
      changed: true
    }); //返回上一页  
  },
  /**订单交易记录 */
  onOrderInfo: function() {
    console.log("=======onOrderInfo=======")


  },
  /**种子 出售接口 */
  requestPaymentSell: function(e) {
    var that = this
    var id = that.data.mWarehouseInfoListDetailID;
    console.log("====id=====" + id)

    var price = e.target.dataset.price;
    var count = that.data.mSellCount;

    var currentZuan = that.data.cntZuan + price * count;
    wx.showModal({
      title: "当前恋爱钻  " + that.data.cntZuan,
      content: "要出售的恋爱钻  " + price * count,
      cancelText: "取消",
      confirmText: "确定",
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: _HUIBAOData.huibao_host_garden_sell + '?openId=' + app.userData.openId + "&id=" + id +
              "&type=" + that.data.mShopWarehouseType + "&count=" + count + "&price=" + price + "&linkId=" + that.data.linkId + "&access_token=" + app.userData.accessToken,
            method: "POST",
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencode' // 默认值
            },
            success: function(res) {

              if (res.data.code == 10000) {
                var mData = res.data.response;
                wx.showToast({
                  title: "出售成功！",
                  icon: 'success',
                  duration: 2000,
                })
                that.setData({
                  cntZuan: currentZuan,
                  mWarehouseInfoListDetailCount: that.data.mWarehouseInfoListDetailCount - count
                })

                //刷新数据
                that.onWareHouseInfoFirst();
              } else {
                wx.showToast({
                  title: res.data.info,
                  icon: 'loading',
                  duration: 2000
                })
              }

            },
            fail: function(res) {
              console.log("网络连接失败！")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  //商店购买接口
  requestPaymentBuy: function(e) {
    var that = this
    var currentZuan = that.data.cntZuan - e.target.dataset.text;
    const index = e.currentTarget.dataset.index;
    let mShopInfoList = that.data.mShopInfoList;
    wx.showModal({
      title: "当前恋爱钻  " + that.data.cntZuan,
      content: "购买的恋爱钻  " + e.target.dataset.text,
      cancelText: "取消",
      confirmText: "确定",
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: _HUIBAOData.huibao_host_garden_buy + '?openId=' + app.userData.openId + "&goodsId=" + that.data.mShopInfoList[index].id +
              "&type=" + that.data.mShopWarehouseType + "&count=" + mShopInfoList[index].extraMap.count + "&linkId=" + that.data.linkId + "&access_token=" + app.userData.accessToken + "&gardenOpenId=" + that.data.gardenOpenId,
            method: "POST",
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencode' // 默认值
            },
            success: function(res) {

              if (res.data.code == 10000) {
                var mData = res.data.response;
                that.setData({
                  cntZuan: currentZuan,
                })
                wx.showToast({
                  title: "购买成功！",
                  icon: 'success',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: res.data.info,
                  icon: 'loading',
                  duration: 2000
                })
              }

            },
            fail: function(res) {
              console.log("网络连接失败！")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })






  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '恋爱链'
    });
    var linkedData = wx.getStorageSync('linkId')
    console.log("====onLoad==linkId=====" + app.userData.linkId)
    this.setData({
      linkId: linkedData,
      myOpenId: app.userData.openId,
      gardenOpenId: app.userData.openId,
    })

    this.loadData();

    //是否显示引导页
    var isFir = wx.getStorageSync("isStrategy");


    if (isFir) {

    } else {
      this.onStrategy();
    }


  },
  /**显示公告 */
  onStrategy: function() {
    var that = this;

    that.setData({
      closeEjectStrategy: false
    });
    var mUrl = _HUIBAOData.huibao_host_strategy + '?type=1' + "&access_token=" + app.userData.accessToken
    console.log("=====strategy======" + mUrl)
    wx.request({

      url: mUrl,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function(res) {
        if (res.data.code == 10000) {
          that.setData({
            imgUrl: res.data.response
          })
          wx.setStorageSync("isStrategy", "true");
          console.log("====response====" + that.data.imgUrl)

        } else {
          console.log("获取失败")
        }

      },
      fail: function(res) {
        console.log("联网失败")
      }

    })

  },
  /**主页--加载数据 */
  loadData: function() {
    var that = this;
    wx.request({
      url: _HUIBAOData.huibao_host_garden + '?linkId=' + that.data.linkId + "&openId=" + app.userData.openId +
        "&gardenOpenId=" + app.userData.openId + "&access_token=" + app.userData.accessToken,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function(res) {

        if (res.data.code == 10000) {
          var mData = res.data.response;

          console.log("=========occupied======" + mData.myLands[0].occupied)
          that.setData({
            myOpenId: mData.item.myOpenId,
            myIcon: mData.item.myIcon,
            loverIcon: mData.item.loverIcon,
            loverOpenId: mData.item.loverOpenId,
            cntZuan: mData.item.zuan,
            sgnum: mData.item.rose,
            growthStatus: mData.myLands[0].growthStatus,
            landStatus: mData.myLands[0].landStatus,
            occupied: mData.myLands[0].occupied,
            landId: mData.myLands[0].id,
            plantId: mData.myLands[0].plantId,
            gardenOpenId: app.userData.openId,
            matchSuccess: mData.item.matchSuccess,
            inviteName: mData.item.myName,
            circleStatus: true, //记录头像颜色的当前状态
          });
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 2000
          })
        }

      },
      fail: function(res) {
        console.log("网络连接失败！")
      }

    })
  },

  loadDataLove: function() {
    var that = this;
    wx.request({
      url: _HUIBAOData.huibao_host_garden + '?linkId=' + that.data.linkId + "&openId=" + app.userData.openId +
        "&gardenOpenId=" + that.data.loverOpenId + "&access_token=" + app.userData.accessToken,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function(res) {

        if (res.data.code == 10000) {
          var mData = res.data.response;
          that.setData({
            myOpenId: mData.item.myOpenId,
            myIcon: mData.item.myIcon,
            loverIcon: mData.item.loverIcon,
            loverOpenId: mData.item.loverOpenId,
            cntZuan: mData.item.zuan,
            sgnum: mData.item.rose,
            growthStatus: mData.myLands[0].growthStatus,
            landStatus: mData.myLands[0].landStatus,
            occupied: mData.myLands[0].occupied,
            landId: mData.myLands[0].id,
            plantId: mData.myLands[0].plantId,
            gardenOpenId: mData.item.loverOpenId,
            matchSuccess: mData.item.matchSuccess,
            inviteName: mData.item.loverName,
            circleStatus: false, //记录头像颜色的当前状态
          });
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 2000
          })
        }

      },
      fail: function(res) {
        console.log("网络连接失败！")
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 页面渲染完成
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 1000,
      /**
       * http://cubic-bezier.com/#0,0,.58,1 
       * linear 动画一直较为均匀
       * ease  从匀速到加速在到匀速
       * ease-in 缓慢到匀速
       * ease-in-out 从缓慢到匀速再到缓慢
       * 
       * http://www.tuicool.com/articles/neqMVr
       * step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       * step-end  保持 0% 的样式直到动画持续时间结束    一闪而过
       */
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 100,
      /**
       * 以什么为基点做动画 效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'left top 0',
      success: function(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //商店图片切换 种子、包装、道具    
  onFlowerTap: function(event) {
    var that = this;

    //更新Data的数据绑定变量,从而实现图片切换
    that.setData({
      isflower: true,
      isSeed: false, //isSeed
      isPack: false,
      isProperty: false,
      mShopWarehouseType: 0,
    });
    that.onWareHouseInfoFirst();

  },
  onSeedTap: function(event) {
    var that = this;
    console.log("-------------seed")

    //更新Data的数据绑定变量,从而实现图片切换
    that.setData({
      isflower: false,
      isSeed: true, //isSeed
      isPack: false,
      isProperty: false,
      mShopWarehouseType: 1,
    });
    that.onShopsInfo();

  },
  onPackTap: function(event) {
    var that = this;

    //更新Data的数据绑定变量,从而实现图片切换
    that.setData({
      isflower: false,
      isSeed: false,
      isPack: true, //isPack
      isProperty: false,
      mShopWarehouseType: 2,

    });
    that.onShopsInfo();

  },
  onPropertyTap: function(event) {
    var that = this;

    //更新Data的数据绑定变量,从而实现图片切换
    that.setData({
      isflower: false,
      isSeed: false,
      isPack: false, //isPack
      isProperty: true,
      mShopWarehouseType: 3,
    })

  },
  onSeedTapWareHouse: function(event) {
    var that = this;
    console.log("-------------seed")

    //更新Data的数据绑定变量,从而实现图片切换
    that.setData({
      isflower: false,
      isSeed: true, //isSeed
      isPack: false,
      isProperty: false,
      mShopWarehouseType: 1,
    });
    that.onWareHouseInfoFirst();


  },
  onPackTapWareHouse: function(event) {
    var that = this;

    //更新Data的数据绑定变量,从而实现图片切换
    that.setData({
      isflower: false,
      isSeed: false,
      isPack: true, //isPack
      isProperty: false,
      mShopWarehouseType: 2,

    });
    that.onWareHouseInfoFirst();


  },

  showModalWareHouse: function() {

    var that = this;
    if (that.data.circleStatus == false) {
      wx.showToast({
        title: that.data.isSelf,
        icon: 'loading',
        duration: 2000

      })
      return;
    }

    //初始化状态值
    that.onFlowerTap();
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateX(-380).step()
    that.setData({
      animationData: animation.export(),
      showModalWareHouseStatus: true,
      isflower: true,
      isSeed: false, //isSeed
      isPack: false,
      isProperty: false

    })
    setTimeout(function() {
      animation.translateX(0).step()
      that.setData({
        animationData: animation.export()
      })
    }.bind(that), 200)
  },
  hideModalWareHouse: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateX(-380).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateX(0).step()
      this.setData({
        animationData: animation.export(),
        showModalWareHouseStatus: false
      })
    }.bind(this), 200)
  },

  showModalShop: function() {
    //初始化状态值
    var that = this;
    if (that.data.circleStatus == false) {
      wx.showToast({
        title: that.data.isSelf,
        icon: 'loading',
        duration: 2000

      })
      return;
    }
    that.onSeedTap();
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateX(-380).step()
    that.setData({
      animationData: animation.export(),
      isflower: false,
      isSeed: true,
      isPack: false, //isPack
      isProperty: false,
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateX(0).step()
      that.setData({
        animationData: animation.export()
      })
    }.bind(that), 200)
  },
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateX(-380).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateX(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,

      })
    }.bind(this), 200)
  },

  /**仓库--花朵、种子、包装信息 */
  onWareHouseInfoFirst: function() {
    var that = this;

    wx.request({
      url: _HUIBAOData.huibao_host_garden_warehouse + '?type=' + that.data.mShopWarehouseType + "&limit=1000" + "&openId=" + app.userData.openId + "&access_token=" + app.userData.accessToken,
      method: "GET",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },

      success: function(res) {

        if (res.data.code == 10000) {

          var mDataList = res.data.response;

          if (mDataList.length > 0) {

            that.setData({
              hasWarehouseInfoList: true,
              mWarehouseInfoList: mDataList,
            });
          } else {
            that.setData({
              hasWarehouseInfoList: false,
              mWarehouseInfoList: mDataList,
            });
          }
          console.log("默认展示第一个详情数据")
          //默认展示第一个详情数据
          that.onWareHouseInfoDetailFirst();
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 2000
          })
        }

      },
      fail: function(res) {
        console.log("网络连接失败！")
      }
    })

  },
  /**仓库--产品详情--默认展示第一个 */
  onWareHouseInfoDetailFirst: function(e) {


    var that = this;

    var mWarehouseInfoList = that.data.mWarehouseInfoList;
    if (mWarehouseInfoList.length == 0) {
      console.log("======mWarehouseInfoList为0获取不到goodsId===" + mWarehouseInfoList.length)
      return;
    }

    wx.request({
      url: _HUIBAOData.huibao_host_garden_warehouse_detail + '?goodsId=' + that.data.mWarehouseInfoList[0].goodsId + "&access_token=" + app.userData.accessToken,
      method: "GET",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function(res) {

        if (res.data.code == 10000) {
          var mDataList = res.data.response;
          that.setData({
            mWarehouseInfoListDetail: mDataList,
            mWarehouseInfoListDetailCount: that.data.mWarehouseInfoList[0].count, //后台说 不能返回，需要从列表中 去取总的数量
            mWarehouseInfoListDetailID: that.data.mWarehouseInfoList[0].id, //此id，出售的时候当做货物id
            plantId: that.data.mWarehouseInfoList[0].goodsId, //goodsId代表了plantId

          });
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function(res) {
        console.log("网络连接失败！")
      }
    })


  },
  /**仓库--花朵、种子、包装信息 */
  onWareHouseInfo: function() {
    var that = this;

    wx.request({
      url: _HUIBAOData.huibao_host_garden_warehouse + '?type=' + that.data.mShopWarehouseType + "&limit=1000" + "&openId=" + app.userData.openId + "&access_token=" + app.userData.accessToken,
      method: "GET",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },

      success: function(res) {

        if (res.data.code == 10000) {

          var mDataList = res.data.response;

          if (mDataList.length > 0) {

            that.setData({
              hasWarehouseInfoList: true,
              mWarehouseInfoList: mDataList,
            });
          } else {
            that.setData({
              hasWarehouseInfoList: false,
              mWarehouseInfoList: mDataList,
            });
          }
          console.log("默认展示第一个详情数据")
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 2000
          })
        }

      },
      fail: function(res) {
        console.log("网络连接失败！")
      }
    })

  },
  /**仓库--产品详情 */
  onWareHouseInfoDetail: function(e) {



    var that = this;
    that.onWareHouseInfo();
    //跟新列表数据
    const index = e.currentTarget.dataset.index;
    var count = e.target.dataset.text;
    wx.request({
      url: _HUIBAOData.huibao_host_garden_warehouse_detail + '?goodsId=' + that.data.mWarehouseInfoList[index].goodsId + "&access_token=" + app.userData.accessToken,
      method: "GET",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },

      success: function(res) {

        if (res.data.code == 10000) {
          var mDataList = res.data.response;
          that.setData({
            mWarehouseInfoListDetail: mDataList,
            mWarehouseInfoListDetailCount: count, //后台说 不能返回，需要从列表中 去取总的数量
            mWarehouseInfoListDetailID: that.data.mWarehouseInfoList[index].id, //此id，出售的时候当做货物id
            plantId: that.data.mWarehouseInfoList[index].goodsId, //goodsId代表了plantId
          });

        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 2000
          })
        }

      },
      fail: function(res) {
        console.log("网络连接失败！")
      }


    })


  },

 
  /**商店--种子、包装信息 */

  onShopsInfo: function() {
    var that = this;
    wx.request({
      url: _HUIBAOData.huibao_host_garden_goods + '?type=' + that.data.mShopWarehouseType + "&limit=1000" + "&access_token=" + app.userData.accessToken,
      method: "GET",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },

      success: function(res) {

        if (res.data.code == 10000) {
          var mDataList = res.data.response;

          if (mDataList.length > 0) {
            that.setData({
              hasShopInfoList: true,
              mShopInfoList: mDataList,
            });
          } else {
            that.setData({
              hasShopInfoList: false,
              mShopInfoList: mDataList,
            });
          }
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 2000
          })
        }

      },
      fail: function(res) {
        console.log("网络连接失败！")
      }

    })

  },
  /**
   * 浇水/摘花 /播种
   */
  onWateringPlantTake: function() {
    var that = this;


    console.log("========linkId======" + that.data.linkId)
    console.log("=========openId=====" + app.userData.openId)
    console.log("=========gardenOpenId=====" + that.data.gardenOpenId)
    console.log("=========WateringType=====" + that.data.WateringType)
    console.log("=========plantId=====" + that.data.plantId)
    console.log("=========landId=====" + that.data.landId)
    wx.request({

      //此处 plantId为null，必须先购买种子才可以种植
      url: _HUIBAOData.huibao_host_garden_planting + '?linkId=' + that.data.linkId + "&openId=" + app.userData.openId +
        "&gardenOpenId=" + that.data.gardenOpenId + "&type=" + that.data.WateringType + "&plantId=" + that.data.plantId +
        "&landId=" + that.data.landId + "&access_token=" + app.userData.accessToken,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },

      success: function(res) {

        if (res.data.code == 10000) {

          that.animation.opacity(0).step({
            ducation: 3000
          }).translate(0, 0).step()

          that.setData({
            //输出动画
            animation: that.animation.export(),
          })
          wx.showToast({
            title: that.data.showToastLandStatus,
            icon: 'success',
            duration: 2000
          })
          that.loadData();
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 2000
          })
        }

        that.animation.opacity(1).step({
          ducation: 1000
        }).translate(0, 0).step()

        that.setData({
          //输出动画
          animation: that.animation.export(),
        })

      },
      fail: function(res) {
        console.log("网络连接失败！")
      }

    })
  },

  /**
   * 播种
   */
  onSowingSeeds: function() {
    var that = this;

    if (that.data.plantId == null) {
      console.log("======plantId=======" + that.data.plantId)
      return;
    }
    //种植 occupied == 0，空土地
    if (that.data.occupied == 0) {
      that.setData({
        //输出动画
        WateringType: 1
      })
      wx.showModal({
        content: "是否播种？",
        cancelText: "取消",
        confirmText: "确定",
        success: function(res) {
          if (res.confirm) {
            wx.request({

              //此处 plantId为null，必须先购买种子才可以种植
              url: _HUIBAOData.huibao_host_garden_planting + '?linkId=' + that.data.linkId + "&openId=" + app.userData.openId +
                "&gardenOpenId=" + that.data.gardenOpenId + "&type=" + that.data.WateringType + "&plantId=" + that.data.plantId +
                "&landId=" + that.data.landId + "&access_token=" + app.userData.accessToken,
              method: 'POST',
              data: {},
              header: {
                'content-type': 'application/x-www-form-urlencode' // 默认值
              },

              success: function(res) {

                if (res.data.code == 10000) {


                  that.setData({
                    mWarehouseInfoListDetailCount: that.data.mWarehouseInfoListDetailCount - 1
                  })
                  wx.showToast({
                    title: '播种成功！',
                    icon: 'success',
                    duration: 2000
                  })
                  that.loadData();
                } else {
                  wx.showToast({
                    title: res.data.info,
                    icon: 'loading',
                    duration: 2000
                  })
                }

              },
              fail: function(res) {
                console.log("网络连接失败！")
              }



            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (that.data.occupied == 1) {

      wx.showModal({
        content: "您已经播种过了",
        showCancel: false,
        confirmText: "确定"
      })

    }

  },
  /**
   * 花朵兑换
   */
  onExchangeSell: function() {
    wx.showModal({
      content: "此功能正在开发中",
      showCancel: false,
      confirmText: "确定"
    })
  },
  /**
   * 一键播种
   */
  onSowingSeedsAll: function() {

    wx.showModal({
      content: "此功能正在开发中",
      showCancel: false,
      confirmText: "确定"
    })

  },
  /**
   * 首页空土地 提示
   */
  onSowingSeedsEmpty: function() {
    wx.showModal({
      content: "请去仓库选购【种子】播种",
      showCancel: false,
      confirmText: "确定"
    })
  },
  /**
   * 浇水/摘花 
   */
  onWateringKettle: function() {

    var that = this;

    if (that.data.plantId == null) {
      console.log("======plantId=======" + that.data.plantId)
      return;
    }

    /** 10-可浇水 11-已浇水 20-可除草 21-已除草 30-可除虫 31-已除虫 40-可收取 50-可铲除 00-可播种
       	操作类型1-6 分别是 种植 浇水 除虫 除草 收取 铲除
         occupied 1-已种植 0-未种植
         */


    if (that.data.landStatus == 10) {
      that.setData({
        WateringType: 2,
        showToastLandStatus: "浇水成功！"
      })
    }
    if (that.data.landStatus == 20) {
      that.setData({
        WateringType: 3,
        showToastLandStatus: "除草成功！"
      })
    }
    if (that.data.landStatus == 30) {
      that.setData({
        WateringType: 4,
        showToastLandStatus: "除虫成功！"
      })
    }
    if (that.data.landStatus == 40) {
      that.setData({
        WateringType: 5,
        showToastLandStatus: "收取成功！"
      })
    }
    if (that.data.landStatus == 50) {
      that.setData({
        WateringType: 6,
        showToastLandStatus: "铲除成功！"
      })
    }
    console.log("=========WateringType=====" + that.data.WateringType)
    that.onWateringPlantTake();
    //  setTimeout(function () {  
    //  }.bind(that),1000)


  },
  /**
   * 仓库---绑定减数量事件
   */
  minusCountWarehouse(e) {
    var that = this;

    let count = that.data.mSellCount;
    if (count <= 1) {
      return false;
    }
    count = count - 1;


    that.setData({
      mSellCount: count,
    });


  },
  /**
   * 仓库---绑定加数量事件
   */
  addCountWarehouse(e) {
    var that = this;

    let count = that.data.mSellCount;
    count = count + 1;
    that.setData({
      mSellCount: count,
    });


  },
  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let mShopInfoList = this.data.mShopInfoList;

    let count = mShopInfoList[index].extraMap.count;
    count = count + 1;

    mShopInfoList[index].extraMap.count = count;
    this.setData({
      mShopInfoList: mShopInfoList,
    });



  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let mShopInfoList = this.data.mShopInfoList;
    let count = mShopInfoList[index].extraMap.count;
    if (count <= 1) {
      return false;
    }
    console.log("========" + index);
    count = count - 1;

    mShopInfoList[index].extraMap.count = count;

    this.setData({
      mShopInfoList: mShopInfoList,
    });
  },
})