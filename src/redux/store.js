// https://dev.to/thatgalnatalie/how-to-get-started-with-redux-toolkit-41e
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { reducer as user } from './user';
import { reducer as widget } from './widget';
import { reducer as league } from './league';
import { reducer as team } from './team';
import {reducer as userr } from './myuser';
import { reducer as standing} from "./standingdata";
import { reducer as fixture } from "./fixturedata";

const reducer = combineReducers({
    user,
    widget,
    league,
    team,
    userr,
    standing,
    fixture,
});

const store = configureStore({
    reducer,
});

export default store;
