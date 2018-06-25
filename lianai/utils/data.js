var HUIBAO_HOST_URL = "https://api2.renrenbx.com";
module.exports = {
  huibao_host_createChain: HUIBAO_HOST_URL +"/mobile/lovechain2/createChain",//获取linked
  huibao_host_userinfo: HUIBAO_HOST_URL + '/mobile/wxinfo/getOpenIdAndAuthorize',//首页获取userinfo和openid
  huibao_host_home: HUIBAO_HOST_URL + '/mobile/lovechain2/home',//邀请人主页
  huibao_host_homeInviteAccepted: HUIBAO_HOST_URL + '/mobile/lovechain2/homeInviteAccepted',//接受邀请
  huibao_host_homeInviteZf: HUIBAO_HOST_URL + '/mobile/lovechain2/homeInviteZf',//送祝福进入主页
  huibao_host_homeInviteDz: HUIBAO_HOST_URL + '/mobile/lovechain2/homeInviteDz',//登录领钻进入主页
  huibao_host_inviteSuccess: HUIBAO_HOST_URL + '/mobile/lovechain2/inviteSuccess',//邀请成功回调
  huibao_host_sendZu: HUIBAO_HOST_URL + '/mobile/lovechain2/sendZu',//收钻石
  huibao_host_sendZf: HUIBAO_HOST_URL + '/mobile/lovechain2/sendZf',//送祝福
  huibao_host_sendDz: HUIBAO_HOST_URL + '/mobile/lovechain2/sendDz',//登录领钻
  huibao_host_strategy: HUIBAO_HOST_URL +"/mobile/lovechain2/more",//公告--攻略
  huibao_host_garden: HUIBAO_HOST_URL +"/mobile/lovechain2/garden",//花园主页
  huibao_host_garden_planting: HUIBAO_HOST_URL + "/mobile/lovechain2/planting",//花园浇水、摘花
  huibao_host_garden_goods: HUIBAO_HOST_URL +"/mobile/lovechain2/goods",//花园---商店
  huibao_host_garden_warehouse: HUIBAO_HOST_URL +"/mobile/lovechain2/warehouse",//花园---仓库
  huibao_host_garden_buy: HUIBAO_HOST_URL +"/mobile/lovechain2/buy",//花园--购买恋爱钻
  huibao_host_garden_sell: HUIBAO_HOST_URL + "/mobile/lovechain2/sell",//仓库--产品出售
  huibao_host_garden_warehouse_detail: HUIBAO_HOST_URL +"/mobile/lovechain2/goods/detail",//仓库--产品详情
  huibao_host_garden_recordLogs: HUIBAO_HOST_URL +"/mobile/lovechain2/myTradingLogs",//订单交易记录
  huibao_host_garden_islover: HUIBAO_HOST_URL +"/mobile/lovechain2/isLover",//判断 被邀请人是不是恋人
}