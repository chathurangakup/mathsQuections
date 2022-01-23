import React, {useRef} from 'react';

import NetInfo from '@react-native-community/netinfo';

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
  showSpinner = global.showAppDown ? false : true,
  method = 'POST',
) => {
  if (showSpinner == true) {
    try {
      if (showSpinner) {
        global.store.dispatch({
          type: UPDATE_LOADING_SPINNER_STATE,
          payload: true,
        });
      }

      let response = await fetch(
        url,
        {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: method === 'GET' ? '' : JSON.stringify(params),
        },
        (err, res) => {
          if (err) {
            return null;
          }
          return res;
        },
      );

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
      // okText,
      // okFn,
      // btnCancel,
    },
  });
};
