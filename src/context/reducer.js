import { questionsMock, steps } from '../constants';
import { SET_QUESTIONS, SET_STEP, SET_IS_ANSWERED, SET_VIDEO_ANSWER, SET_LOADING, SET_RECORDING } from './action-types';

export const initialState = {
    questions: questionsMock,
    actualStep: steps.MainView,
    prevStep: steps.MainView,
    isLastQuestion: false,
    isFirstQuestion: false,
    loading: false,
    recording: false,
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
                    prevStep: state.actualStep,
                    actualStep: action.payload,
                    isLastQuestion: true,
                };
            }else if(action.payload === steps.QuestionView[0]){
                return {
                    ...state,
                    prevStep: state.actualStep,
                    actualStep: action.payload,
                    isFirstQuestion: true,
                };
            }
            return {
                ...state,
                prevStep: state.actualStep,
                actualStep: action.payload,
                isFirstQuestion: false,
                isLastQuestion: false,
            };
        }
        else if (action.payload === 'next') {
            if (state.actualStep + 1 === steps.QuestionView.length) {
                return {
                    ...state,
                    prevStep: state.actualStep,
                    actualStep: state.actualStep + 1,
                    isLastQuestion: true,
                    isFirstQuestion: false,
                };
            }
            return {
                ...state,
                prevStep: state.actualStep,
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
    case SET_VIDEO_ANSWER:
        return {
            ...state,
            questions: state.questions.map(question => {
                if (question.id === action.payload.id) {
                    return {
                        ...question,
                        answer: action.payload.answer,
                        isAnswered: action.payload.isAnswered,
                        duration: action.payload.duration,
                    };
                }
                return question;
            })
        };
    case SET_LOADING:
        return {
            ...state,
            loading: action.payload,
        };
    case SET_RECORDING:
        return {
            ...state,
            recording: action.payload,
        };
    default:
        return state;
    }
};