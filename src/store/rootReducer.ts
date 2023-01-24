import { combineReducers } from 'redux';

const testReducer = (state = [], action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    test: testReducer,
});
