import { combineReducers } from 'redux';
import UserReducer from './user_reducer';
import ArticleReducer from './article_reducer';

const rootReducer = combineReducers({
    User: UserReducer,
    Article: ArticleReducer
})

export default rootReducer;