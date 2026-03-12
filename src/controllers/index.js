import { cargarBalance, cargarConfig, cargarFlags, infoCoinPoints, getHour, getReports, getUserId, processActions, ratesV3, userV2, v2URL } from './cargarBalance.controller.js'
import { addPoints, changeCoupon, checkPin, coinPoints, sendAccess, sendUrbiCoins, substractPoints, transferBalance, userKeys, verifyPin } from './movimientos.controller.js'
import { activar } from './activacion.controller.js'
import sendMessage from './message.controller.js'
import { loadFile } from './comment.controller.js'
import home from './renderIndex.controller.js'
import { getUCinfo, ucSender } from './ucSender.controller.js'
import { checkPinFB, loginFB, signUpFB, verifyPinFB } from './account.controller.js'

import { configV2FB, processActionsFB, ratesV3FB, sendAccessFB, userBalancesFB, userFlagsFB, userV2FB } from './user.controller.js'

import { getEvents } from './events.controller.js'

import { renderForm, webAuth } from './webAuth.controller.js'

import { renderPanel, updateData } from './panel.controller.js'

export {
  activar,
  addPoints,
  cargarBalance,
  cargarConfig,
  cargarFlags,
  changeCoupon,
  checkPin,
  checkPinFB,
  coinPoints,
  configV2FB,
  home,
  infoCoinPoints,
  getEvents,
  getHour,
  getUCinfo,
  getUserId,
  getReports,
  loadFile,
  loginFB,
  processActions,
  processActionsFB,
  ratesV3,
  ratesV3FB,
  renderForm,
  renderPanel,
  sendAccess,
  sendAccessFB,
  sendMessage,
  sendUrbiCoins,
  signUpFB,
  substractPoints,
  transferBalance,
  ucSender,
  updateData,
  userBalancesFB,
  userFlagsFB,
  userKeys,
  userV2,
  userV2FB,
  v2URL,
  verifyPin,
  verifyPinFB,
  webAuth
}