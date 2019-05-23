import { GET_ARTICLES,ADD_ARTICLE,RESET_ARTICLE } from '../actions/actionTypes';


const ArticleReducer = (state = {},action) => {
    switch(action.type){
        case GET_ARTICLES:
            return {
                ...state,
                payload: action.payload
            }
            break;
        case ADD_ARTICLE:
            return {
                ...state,
                newArticle: action.payload
            }
        break;
        case RESET_ARTICLE:
            return {
                ...state,
                newArticle:action.payload
            }
            break;
        default:
            return state;
    }
}

export default ArticleReducer;