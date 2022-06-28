import {get, post} from '../axios/axios'

//管理员
const loginAmin = (params) => {
  return post('/account/loginAmin.php',params)
}

const checkAdmin = (params) => {
  return post('/account/checkAdmin.php', params)
}

const getAdminInfo = (params) => {
  return post('/account/getAdminInfo.php', params)
}

const getUserTotal = (params) => {
  return post('/account/getUserTotal.php', params)
}

//商品
const addGoodsInfo = (params) => {
  return post('/goods/addGoodsInfo.php',params)
}

const getGoodsTotal = (params) => {
  return post('/goods/getGoodsTotal.php', params)
}

const getAllGoods = (params) => {
  return post('/goods/getAllGoods.php', params)
}

const updateGoodsRecom = (params) => {
  return post('/goods/updateGoodsRecom.php', params)
}

const updateGoodsSale = (params) => {
  return post('/goods/updateGoodsSale.php', params)
}

const deleteGoods = (params) => {
  return post('/goods/deleteGoods.php', params)
}

//订单
const getSaleGoodsTotal = (params) => {
  return post('/order/getSaleGoodsTotal.php', params)
}

const getOrderList = (params) => {
  return post('/order/getOrderList.php', params)
}

const updateOrderDistribution = (params) => {
  return post('/order/updateOrderDistribution.php', params)
}

const updateOrderComplete = (params) => {
  return post('/order/updateOrderComplete.php', params)
}

//用户
const getUserList = (params) => {
  return post('/account/getUserList.php', params)
}

const getRegister = (params) => {
  return post('/account/register.php', params)
}

const lockAccountUser = (params) => {
  return post('/account/lockAccountUser.php', params)
}

const unlockAccountUser = (params) => {
  return post('/account/unlockAccountUser.php', params)
}

export {
  loginAmin,
  checkAdmin,
  getAdminInfo,
  getUserTotal,
  getUserList,
  getRegister,
  addGoodsInfo,
  getGoodsTotal,
  getAllGoods,
  getSaleGoodsTotal,
  lockAccountUser,
  unlockAccountUser,
  updateGoodsRecom,
  updateGoodsSale,
  deleteGoods,
  getOrderList,
  updateOrderDistribution,
  updateOrderComplete

}