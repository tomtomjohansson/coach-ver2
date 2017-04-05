import * as types from './actionTypes';
import {rootUrl,getHeaders} from './ajaxConfig';
import {beginAjaxCall, ajaxCallError, ajaxCallDone} from './ajaxActions';

export function addGameSuccess(games) {
  return {
    type: types.ADD_GAME_SUCCESS,
    games
  };
}

export function removeGameSuccess(gameID) {
  return {
    type: types.DELETE_GAME_SUCCESS,
    gameID
  };
}

export function saveElevenSuccess(game) {
  return {
    type: types.SAVE_ELEVEN_SUCCESS,
    game
  };
}

export function updateStatSuccess(game) {
  return {
    type: types.UPDATE_STAT_SUCCESS,
    game
  };
}

export function addGame(game) {
  const url = `${rootUrl}/api/games`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers,
        body: JSON.stringify(game)
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(addGameSuccess(json.games));
        return { success: json.success };
      } else {
        dispatch(ajaxCallDone);
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      dispatch(ajaxCallError);
      return { success: false, message: e };
    }
  };
}

export function saveEleven(game,eleven,bench = [],formation) {
  const url = `${rootUrl}/api/games/eleven`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'PUT',
        headers,
        body: JSON.stringify({game,eleven,bench,formation})
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(saveElevenSuccess(json.game));
        return { success: json.success };
      } else {
        dispatch(ajaxCallDone);
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      dispatch(ajaxCallError);
      return { success: false, message: e };
    }
  };
}

export function saveGameAsFinished(game) {
  const url = `${rootUrl}/api/games`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'PUT',
        headers,
        body: JSON.stringify({game})
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(updateStatSuccess(json.game));
        return { success: json.success };
      } else {
        dispatch(ajaxCallDone);
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      dispatch(ajaxCallError);
      return { success: false, message: e };
    }
  };
}

export function subPlayer(game,playerOut,playerIn,minute) {
  const url = `${rootUrl}/api/games/sub`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'PUT',
        headers,
        body: JSON.stringify({game,playerOut,playerIn,minute})
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(updateStatSuccess(json.game));
        return { success: json.success };
      } else {
        dispatch(ajaxCallDone);
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      dispatch(ajaxCallError);
      return { success: false, message: e };
    }
  };
}

export function removeGame(gameID) {
  const url = `${rootUrl}/api/games/${gameID}`;
  return async (dispatch) => {
    const headers = await getHeaders();
    dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'DELETE',
        headers
      });
      const json = await response.json();
      if (json) {
        await dispatch(removeGameSuccess(gameID));
        return { success: json.success, message: json.message };
      } else {
        dispatch(ajaxCallDone);
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      dispatch(ajaxCallError);
      return { success: false, message: e };
    }
  };
}

export function updateStat(game) {
  const url = `${rootUrl}/api/games/stat`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'PUT',
        headers,
        body: JSON.stringify({game})
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(updateStatSuccess(json.game));
        return { success: json.success };
      } else {
        dispatch(ajaxCallDone);
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      dispatch(ajaxCallError);
      return { success: false, message: e };
    }
  };
}