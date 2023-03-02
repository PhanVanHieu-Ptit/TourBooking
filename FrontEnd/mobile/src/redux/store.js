import thunk from 'redux-thunk';

const AppReducers = combineReducers({
    loginReducer,
});

const rootReducer = (state, action) => {
    return AppReducers(state, action);
};
let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
