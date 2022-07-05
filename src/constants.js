export const questionsMock = [
    {
        id: 1,
        message: '¿Cuál es tu video juego favorito de la infancia?',
        isAnswered: false,
    },
    {
        id: 2,
        message: '¿Cuál es tu video juego favorito de la infancia?',
        isAnswered: false,
    },
    {
        id: 3,
        message: '¿Cuál es tu video juego favorito de la infancia?',
        isAnswered: false,
    },
    {
        id: 4,
        message: '¿Cuál es tu video juego favorito de la infancia?',
        isAnswered: false,
    },
];

export const steps = {
    MainView: 0,
    QuestionView: [1,2,3,4], // N array of steps according to question's ids
};