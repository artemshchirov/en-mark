const input = document.getElementById('load-file__input_id');
const textarea = document.getElementById('load-file__textarea_id');

const cards = document.querySelector('.cards');
const starredTemplate = document.querySelector('#starred-template').content;
const cardTemplate = document.querySelector('#card-template').content;
const cardExplanationTemplate = document.querySelector('#card-explanation').content;
const cardSentenceTemplate = document.querySelector('#card-sentence').content;
const cardListTemplate = document.querySelector('#card-list').content;
let count = 0;

input.addEventListener('change', () => {
    const files = input.files;

    if (files.length == 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = evt => {
        const file = evt.target.result;
        const lines = file.split(/\r\n|\n/);
        textarea.value = file;

        let cardElem = "";
        let cardExplanation = "";
        let cardSentence = "";
        let cardList = "";

        for (let line = 0; line <= lines.length; line++) {

            if (typeof lines[line + 1] === "undefined") {
                break
            } else {
                if (!lines[line] || !lines[line].length) {  // empty line
                    cards.append(cardElem);
                    cardElem = cardTemplate.querySelector('.card').cloneNode(true);

                } else if (lines[line].slice(0, 4) === '    ') {  // sentence
                    cardSentence = cardSentenceTemplate.querySelector('.card__sentence').cloneNode(true);
                    cardSentence.textContent = lines[line];
                    cardSentence.addEventListener('click', evt => createStarred(evt.target.textContent));
                    cardList.append(cardSentence);
                    if ((lines[line + 1].slice(0, 2) === '  ' && lines[line + 1].slice(2, 5) !== '  ') || !lines[line + 1] || !lines[line + 1].length) {
                        cardElem.append(cardList);
                    }

                } else if (lines[line].slice(0, 2) === '  ') {  // explanation
                    cardList = cardListTemplate.querySelector('.card__list').cloneNode(true);
                    cardExplanation = cardExplanationTemplate.querySelector('.card__explanation').cloneNode(true);
                    cardExplanation.textContent = lines[line];
                    cardElem.append(cardExplanation);

                } else {  // word
                    let cardTitle = cardElem.querySelector('.card__title');
                    cardTitle.textContent = lines[line];
                };
            };
        };
    };

    reader.onerror = evt => alert(evt.target.error.name);
    reader.readAsText(file);
});


const createStarred = txt => {
    starredSentence = starredTemplate.querySelector('.starred__sentence').cloneNode(true);
    count += 1;
    starredSentence.textContent = `${count}. ${txt}`;
    addStarred(starredSentence);
};

const starredContainer = document.querySelector('.starred__container');

const addStarred = sentence => {
    starredContainer.append(sentence);
}