import { controller } from './controller.js'
import { cargarBalance, cargarConfig, cargarFlags, infoCoinPoints, getHour, getReports, getUserId, processActions, ratesV3, userV2, v2URL } from './cargarBalance.controller.js'
import { addPoints, changeCoupon, checkPin, coinPoints, sendAccess, sendUrbiCoins, substractPoints, transferBalance, userKeys, verifyPin } from './movimientos.controller.js'
import { activar } from './activacion.controller.js'
import sendMessage from './message.controller.js'
import { loadFile } from './comment.controller.js'
import home from './renderIndex.controller.js'
import { getUCinfo, ucSender } from './ucSender.controller.js'

export {
  activar,
  addPoints,
  cargarBalance,
  cargarConfig,
  cargarFlags,
  changeCoupon,
  checkPin,
  coinPoints,
  controller,
  home,
  infoCoinPoints,
  getHour,
  getUCinfo,
  getUserId,
  getReports,
  loadFile,
  processActions,
  ratesV3,
  sendAccess,
  sendMessage,
  sendUrbiCoins,
  substractPoints,
  transferBalance,
  ucSender,
  userKeys,
  userV2,
  v2URL,
  verifyPin
}