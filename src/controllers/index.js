import { getComments, loadFile } from './comment.controller.js'
import home from './renderIndex.controller.js'
import { checkPinFB, loginFB, signUpFB, verifyPinFB } from './account.controller.js'

import { configV2FB, processActionsFB, ratesV3FB, sendAccessFB, userBalancesFB, userFlagsFB, userV2FB } from './user.controller.js'

import { getEvents, newEvent } from './events.controller.js'

import { getVideos, newVideo } from './videos.controller.js'

import { renderForm, webAuth } from './webAuth.controller.js'

import { renderPanel, uidRegen, updateData } from './panel.controller.js'
import { onDownload } from './download.controller.js'

import { renderAct } from './activacion.controller.js'

import { renderBal, updateItems } from './items.controller.js'

import { getUsers } from './admin.controller.js'

import sendMessage from './message.controller.js'

export {
  checkPinFB,
  configV2FB,
  home,
  getComments,
  getEvents,
  getUsers,
  getVideos,
  loadFile,
  loginFB,
  newEvent,
  newVideo,
  onDownload,
  processActionsFB,
  ratesV3FB,
  renderAct,
  renderBal,
  renderForm,
  renderPanel,
  sendAccessFB,
  sendMessage,
  signUpFB,
  uidRegen,
  updateData,
  updateItems,
  userBalancesFB,
  userFlagsFB,
  userV2FB,
  verifyPinFB,
  webAuth
}