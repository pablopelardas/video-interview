export const questionsMock = [
    {
        id: 1,
        message: '¿Qué nos podrías contar sobre ti?',
        isAnswered: false,
        answer: [],
        duration: 0,
    },
    {
        id: 2,
        message: '¿Cuáles son tus metas?',
        isAnswered: false,
        answer: [],
        duration: 0,
    },
    {
        id: 3,
        message: '¿Cuáles son tus fortalezas y debilidades?',
        isAnswered: false,
        answer: [],
        duration: 0,
    },
    {
        id: 4,
        message: '¿Por qué quieres trabajar con nosotros?',
        isAnswered: false,
        answer: [],
        duration: 0,
    },
];

export const steps = {
    MainView: 0,
    QuestionView: [1,2,3,4], // N array of steps according to question's ids
};