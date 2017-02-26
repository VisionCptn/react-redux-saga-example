import 'babel-polyfill';
import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connect, Provider } from 'react-redux';
import * as actions from './actions';
import { reducer } from './reducer';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  { isLoading: false, isError: false, repositories: [] },
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

class Repositories extends React.Component {
  componentDidMount() {
    const { getDataRequested } = this.props;
    getDataRequested();
  }

  render() {
    const { isLoading, isError, repositories } = this.props;

    return (
      <div>
        {repositories.map((item, index) => {
          return (<div key={index}>
            {item.name}
          </div>);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDataRequested: () => dispatch(actions.getDataRequested())
  }
};

Repositories = connect(mapStateToProps, mapDispatchToProps)(Repositories);

render(
  <Provider store={store}>
    <Repositories />
  </Provider>
  , document.getElementById('root')
);