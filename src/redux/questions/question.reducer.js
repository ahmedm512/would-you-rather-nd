import { 
    REQUEST_QUESTIONS_PENDING,
    REQUEST_QUESTIONS_SUCCESS,
    REQUEST_QUESTIONS_FAILED, 
    ADD_QUESTION_PENDING,
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILED,
    ADD_ANSWER_TO_QUESTION
} from "./question.types";

const intialStateQuestion = {
    isPending: false,
    questions: {},
    error: ''
}

const questionReducer = ( state = intialStateQuestion, action={}) => {
    switch(action.type){
        case REQUEST_QUESTIONS_PENDING:
            return {...state, isPending: true}
        case REQUEST_QUESTIONS_SUCCESS:
            return {...state, questions: action.payload, isPending: false}
        case REQUEST_QUESTIONS_FAILED:
            return {...state, error: action.payload, isPending: false}
        
        case ADD_QUESTION_PENDING:
            return {...state, isPending: true}
        case ADD_QUESTION_SUCCESS:
            const {question } = action;
            return {...state, 
                questions:{
                    ...state["questions"],
                    [question.id]: question
                },
            isPending: false
        }
        case ADD_QUESTION_FAILED:
            return {...state, error: action.payload, isPending: false}

        case ADD_ANSWER_TO_QUESTION:
            const { authUser, qid, answer } = action;
            return {
                ...state,
                questions:{
                    ...state.questions,
                    [qid]: {
                        ...state.questions[qid],
                        [answer]:{
                            ...state.questions[qid][answer],
                            votes: state.questions[qid][answer].votes.concat(authUser)
                        }
                    }
                }
            }

        default:
            return state;


    }
}

export default questionReducer;