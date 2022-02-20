import React, {useRef} from 'react';

import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL, DEFAULT_PROTOCOL, API_ENDPOINT} from '../config/settings';
import {Modalize} from 'react-native-modalize';

import {UPDATE_LOADING_SPINNER_STATE} from '../actyonTypes/Common';

export const setConfig = async (key, value) => {
  global.username = true;
};

export const getConfig = async (key, value) => {
  try {
    const username = global.username;
    return username;
  } catch (e) {
    console.log(e);
  }
};

export const setJwttoken = async token => {
  await AsyncStorage.setItem('jwtToken', token);
};

export const getJwttoken = async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  console.log('token', token);
  return token;
};

export const setUserId = async userId => {
  await AsyncStorage.setItem('userId', userId);
};

export const getUserId = async () => {
  const userId = await AsyncStorage.getItem('userId');
  console.log('userId', userId);
  return userId;
};

export const setLanguageId = async id => {
  await AsyncStorage.setItem('languageId', id);
};

export const getLanguageId = async () => {
  const languageId = await AsyncStorage.getItem('languageId');
  console.log('languageId', languageId);
  return languageId;
};

/**
 * Creates a node compatible backend URL from provided input
 * @param {string} nodeController
 * @param {string} nodeAction
 * @param {string} nodeModule
 * @param {string} proto
 */
export const createUrl = (nodeController, nodeAction) => {
  let url;
  let protocol;
  protocol = `${DEFAULT_PROTOCOL}://`;
  url = API_ENDPOINT + '/' + nodeController + '/' + nodeAction;
  url = protocol + url;
  console.log(':: Url', url);
  return url;
};

/**
 * Sends an API call
 * @param {string} url
 * @param {object} params
 * @param {string} method
 * @param {number} timeout
 */
export const ajaxCall = async (
  url,
  params = {},
  showSpinner = true,
  method = 'POST',
  isAccessToken,
) => {
  if (showSpinner == true) {
    try {
      if (showSpinner) {
        global.store.dispatch({
          type: UPDATE_LOADING_SPINNER_STATE,
          payload: true,
        });
      }

      let response = '';
      const accesstoken = await getJwttoken();
      if (isAccessToken == true && method == 'GET') {
        console.log('accesstoken', accesstoken);
        response = await fetch(
          url,
          {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accesstoken,
            },
          },
          (err, res) => {
            if (err) {
              return null;
            }
            return res;
          },
        );
      } else if (isAccessToken == true && method == 'POST') {
        response = await fetch(
          url,
          {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accesstoken,
            },
            body: JSON.stringify(params),
          },
          (err, res) => {
            if (err) {
              return null;
            }
            return res;
          },
        );
      } else if (isAccessToken == false && method == 'POST') {
        response = await fetch(
          url,
          {
            method: method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          },
          (err, res) => {
            if (err) {
              return null;
            }
            return res;
          },
        );
      } else if (isAccessToken == false && method == 'GET') {
        response = await fetch(
          url,
          {
            method: method,
            headers: {
              'Content-Type': 'application/json',
            },
          },
          (err, res) => {
            if (err) {
              return null;
            }
            return res;
          },
        );
      }

      // const response = await fetch(url, {
      //     method: 'GET',
      //     headers: {
      //      "Content-Type": "application/json",
      //     },
      //    // body: '',
      //   });

      if (showSpinner) {
        global.store.dispatch({
          type: UPDATE_LOADING_SPINNER_STATE,
          payload: false,
        });
      }

      if (response !== null) {
        if (response.status === 404) {
          console.log('no result', response);
          showErrorSlideUpPanel('Something went Wrong', 'Server not found');
        }

        if (response.status === 401) {
          showErrorSlideUpPanel('Something went Wrong', 'Server not found');
          return;
        }
        let responseJson = await response.json();
        console.log('responce1', responseJson);
        if (responseJson.success || responseJson.result) {
          return responseJson;
        } else {
          if (responseJson.maintenance) {
            return responseJson;
          } else {
            return responseJson;
          }
        }
      } else {
        return {success: false, info: 'error.system'};
      }
    } catch (err) {
      console.log(':: error - ' + err, url, params);
      if (showSpinner) {
        global.store.dispatch({
          type: UPDATE_LOADING_SPINNER_STATE,
          payload: false,
        });
      }
      return {success: false, info: 'error.system'};
    }
  }
};

/**
//  * V2 Message alert
//  * @param {string} title
//  * @param {string} msg
//  * @param {function} okFn (Optional)
//  * @param {string} okText (Optional)
//  */
export const showErrorSlideUpPanel = (
  title,
  msg,
  twoButtons,
  imgType,
  leftBtnText,
  onPressLeft = () => {},
  rightBtnText,
  onPressRight = () => {},
  // okFn = () => {},
  // okText = 'button.ok',
  // btnCancel = () => {},
) => {
  global.store.dispatch({
    type: 'SHOW_BOTTOM_ALERT',
    payload: {
      alertType: 'TYPE_ERROR_ALERT',
      visible: true,
      title,
      msg,
      twoButtons,
      imgType,
      leftBtnText,
      onPressLeft,
      rightBtnText,
      onPressRight,
      // okText,
      // okFn,
      // btnCancel,
    },
  });
};
