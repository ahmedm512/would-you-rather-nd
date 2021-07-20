import { 
    SET_AUTH_USER,
    REQUEST_USERS_PENDING,
    REQUEST_USERS_SUCCESS,
    REQUEST_USERS_FAILED, 
    ADD_ANSWER_TO_USER,
    SAVE_QUESTION_FAILED,
    ADD_QUESTION_TO_USER
} from "./user.types";

import { _getUsers, _saveQuestionAnswer } from '../utils/_DATA';
import { addAnswerToQuestion } from "../questions/question.actions";

export const setAuthUser = (id) => ({
    type: SET_AUTH_USER,
    payload: id
})

export const requestUsers = () => (dispatch) => {
    dispatch({type: REQUEST_USERS_PENDING});
    _getUsers()
    .then(data => dispatch({type: REQUEST_USERS_SUCCESS, payload: data}))
    .catch(error => dispatch({type: REQUEST_USERS_FAILED, payload: error}))
    
}

export const addAnswerToUser = (authUser, qid, answer) => ({
    type: ADD_ANSWER_TO_USER,
    authUser, 
    qid, 
    answer
})

export const handleAnswerQuestion = (authUser, qid, answer) => (dispatch) => {
    dispatch(addAnswerToUser(authUser, qid, answer));
    dispatch(addAnswerToQuestion(authUser, qid, answer));
    _saveQuestionAnswer(authUser, qid, answer)
    .catch(error => dispatch({type: SAVE_QUESTION_FAILED, payload: error}))
}

export const addQuestionToUser = ({ id, author }) => ({
    type: ADD_QUESTION_TO_USER,
    id,
    author
})