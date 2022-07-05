import { questionsMock, steps } from '../constants';
import { SET_QUESTIONS, SET_STEP, SET_IS_ANSWERED } from './action-types';

export const initialState = {
    questions: questionsMock,
    actualStep: steps.MainView,
    isLastQuestion: false,
    isFirstQuestion: false,
};


export const reducer = (state, action) => {
    switch (action.type) {
    case SET_QUESTIONS:
        return {
            ...state,
            questions: action.payload,
        };
    case SET_STEP:
        if (typeof action.payload === 'number') {
            if (action.payload === steps.QuestionView.length){
                return {
                    ...state,
                    actualStep: action.payload,
                    isLastQuestion: true,
                };
            }else if(action.payload === steps.QuestionView[0]){
                return {
                    ...state,
                    actualStep: action.payload,
                    isFirstQuestion: true,
                };
            }
            return {
                ...state,
                actualStep: action.payload,
                isFirstQuestion: false,
                isLastQuestion: false,
            };
        }
        else if (action.payload === 'next') {
            if (state.actualStep + 1 === steps.QuestionView.length) {
                return {
                    ...state,
                    actualStep: state.actualStep + 1,
                    isLastQuestion: true,
                    isFirstQuestion: false,
                };
            }
            return {
                ...state,
                actualStep: state.actualStep + 1,
                isLastQuestion: false,
                isFirstQuestion: false,
            };
        }else if (action.payload === 'prev') {
            if (state.actualStep - 1 === steps.QuestionView[0]) {
                return {
                    ...state,
                    actualStep: state.actualStep - 1,
                    isLastQuestion: false,
                    isFirstQuestion: true,
                };
            }
            return {
                ...state,
                actualStep: state.actualStep - 1,
                isLastQuestion: false,
                isFirstQuestion: false,
            };
        }else return state;
    case SET_IS_ANSWERED:
        return {
            ...state,
            questions: state.questions.map(question => {
                if (question.id === action.payload.id) {
                    return {
                        ...question,
                        isAnswered: action.payload.isAnswered,
                    };
                }
                return question;
            }),
        };
    default:
        return state;
    }
};