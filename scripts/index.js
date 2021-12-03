const input = document.getElementById('load-file__input_id');
const textarea = document.getElementById('load-file__textarea_id');
const cards = document.querySelector('.cards');
const starredContainer = document.querySelector('.starred__container');
const starredTemplate = document.querySelector('#starred-template').content;
const cardTemplate = document.querySelector('#card-template').content;
const cardExplanationTemplate = document.querySelector('#card-explanation').content;
const cardListTemplate = document.querySelector('#card-list').content;
const cardSentenceTemplate = document.querySelector('#card-sentence').content;
let cardElem = "";
let cardList = "";
let countStarred = 0;

const createExplanationElem = txt => {
    let cardExplanation = cardExplanationTemplate.querySelector('.card__explanation').cloneNode(true);
    cardExplanation.textContent = txt;
    return cardExplanation;
}
const createSentenceElem = txt => {
    let cardSentence = cardSentenceTemplate.querySelector('.card__sentence').cloneNode(true);
    cardSentence.textContent = txt;
    cardSentence.addEventListener('click', evt => createStarred(evt.target.textContent));
    return cardSentence;
}
const createStarred = txt => {
    countStarred += 1;
    starredSentence = starredTemplate.querySelector('.starred__sentence').cloneNode(true);
    starredSentence.textContent = `${countStarred}. ${txt}`;
    addStarred(starredSentence); //! разделить на разные функции по 1 действию
};
const addCardElem = elem => cardElem.append(elem);
const addListElem = elem => cardList.append(elem);
const addStarred = sentence => starredContainer.append(sentence);
const readTextCardsFile = file => {
    for (let line = 0; line <= file.length; line++) {
        // if current line empty line
        if (!file[line] || !file[line].length) {
            // if last line
            if (typeof file[line] === "undefined") break;
            cards.append(cardElem);
            cardElem = cardTemplate.querySelector('.card').cloneNode(true);
            // if current line sentence
        } else if (file[line].slice(0, 4) === '    ') {
            addListElem(createSentenceElem(file[line]));
            // if next line not sentence or empty string
            if ((file[line + 1].slice(0, 2) === '  ' && file[line + 1].slice(2, 5) !== '  ') || !file[line + 1] || !file[line + 1].length) {
                addCardElem(cardList);
            }
            // if current line explanation
        } else if (file[line].slice(0, 2) === '  ') {
            cardList = cardListTemplate.querySelector('.card__list').cloneNode(true);
            addCardElem(createExplanationElem(file[line]));
            // if current line title word
        } else {
            let cardTitle = cardElem.querySelector('.card__title');
            cardTitle.textContent = file[line];
        };
    };
}
input.addEventListener('change', () => {
    const files = input.files;
    if (files.length == 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = evt => {
        const file = evt.target.result;
        const lines = file.split(/\r\n|\n/);
        textarea.value = file;
        readTextCardsFile(lines);
    };
    reader.onerror = evt => alert(evt.target.error.name);
    reader.readAsText(file);
});
