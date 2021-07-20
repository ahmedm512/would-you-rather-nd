import { 
    REQUEST_QUESTIONS_PENDING,
    REQUEST_QUESTIONS_SUCCESS,
    REQUEST_QUESTIONS_FAILED, 
    ADD_ANSWER_TO_QUESTION,
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_PENDING,
    ADD_QUESTION_FAILED
} from "./question.types";

import { _getQuestions, _saveQuestion } from '../utils/_DATA';
import { addQuestionToUser } from "../user/user.actions";

export const requestQuestions = () => (dispatch) => {
    dispatch({type: REQUEST_QUESTIONS_PENDING});
    _getQuestions()
    .then(data => dispatch({type: REQUEST_QUESTIONS_SUCCESS, payload: data}))
    .catch(error => dispatch({type: REQUEST_QUESTIONS_FAILED, payload: error}))
    
}

export const addAnswerToQuestion = (authUser, qid, answer) => ({
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer
})


export const handleSaveQuestion = (optionOneText, optionTwoText, author ) => (dispatch) => {
    dispatch({type: ADD_QUESTION_PENDING});
    _saveQuestion({ optionOneText, optionTwoText, author })
    .then( (question)=> {
        dispatch({ type: ADD_QUESTION_SUCCESS, question });
        dispatch(addQuestionToUser(question));
    }
    )
    .catch((error) => dispatch({type: ADD_QUESTION_FAILED, payload: error}))
    
}