import { 
    SET_AUTH_USER,
    REQUEST_USERS_PENDING,
    REQUEST_USERS_SUCCESS,
    REQUEST_USERS_FAILED, 
    ADD_QUESTION_TO_USER,
    ADD_ANSWER_TO_USER
} from "./user.types";

const intialStateUser = {
    authUser: '',
    isPending: false,
    users: [],
    error: ''
}

const userReducer = ( state = intialStateUser, action={}) => {
    switch(action.type){
        case SET_AUTH_USER:
            return { ...state, authUser: action.payload }
        case REQUEST_USERS_PENDING:
            return {...state, isPending: true}
        case REQUEST_USERS_SUCCESS:
            return {...state, users: action.payload, isPending: false}
        case REQUEST_USERS_FAILED:
            return {...state, error: action.payload, isPending: false}
        
        case ADD_QUESTION_TO_USER:
            const {id, author} = action;
            return {
                ...state, 
                users: {
                    ...state.users,
                    [author]:{
                        ...state.users[author],
                        questions: state.users[author].questions.concat(id)

                    }
                }
            }

        case ADD_ANSWER_TO_USER:
            const { authUser, qid, answer } = action;

            return {
              ...state,
              users:{
                  ...state.users,
                  [authUser]: {
                    ...state.users[authUser],
                    answers: {
                      ...state.users[authUser].answers,
                      [qid]: answer
                    }
                  }

              }
              
            };



        default:
            return state;


    }
}

export default userReducer;
