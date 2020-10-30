import { combineReducers } from 'redux';
import skills from './skills';
import user from './user';
import search from './search';
import userview from './userview';

export default combineReducers({
    user,
    skills,
    userview,
    search
})