import * as actions from './actions';
import fetch from 'isomorphic-fetch';
import { call, put, takeEvery } from 'redux-saga/effects'

export function* getData() {
  try {
    const response = yield call(fetch, 'https://api.github.com/users/burczu/repos');
    const data = yield response.json();
    yield put(actions.getDataDone(data));
  } catch (e) {
    yield put(actions.getDataFailed(e));
  }
}

export function* getDataSaga() {
  yield takeEvery(actions.GET_DATA_REQUESTED, getData);
}