const input = document.getElementById('load-file__input_id');
const textarea = document.getElementById('load-file__textarea_id');
let cards = document.querySelector('.cards');
const starredContainer = document.querySelector('.starred__container');
const starredTemplate = document.querySelector('#starred-template').content;
const cardTemplate = document.querySelector('#card-template').content;
const cardExplanationTemplate = document.querySelector('#card-explanation').content;
const cardListTemplate = document.querySelector('#card-list').content;
const cardSentenceTemplate = document.querySelector('#card-sentence').content;
let cardElem = "";
let cardList = "";

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
    starredSentence = starredTemplate.querySelector('.starred__sentence').cloneNode(true);
    starredSentence.textContent = txt;
    // starredSentence = starredSentence.textContent.replace(/(\r\n|\n|\r)/gm, "");
    newBr = document.createElement('br');
    starredSentence.appendChild(newBr);
    addStarred(starredSentence); //! разделить на разные функции по 1 действию
};

const header = document.querySelector('header');

const addCardElem = elem => cardElem.append(elem);
const addListElem = elem => cardList.append(elem);
const addStarred = sentence => starredContainer.append(sentence);
const readTextCardsFile = file => {
    let cardTitle = document.querySelector('.card__title') !== null;
    console.log(file[0])

    // file = " \n" + file;
    console.log(file[0])
    for (let line = 0; line <= file.length; line++) {
        // if current line empty line
        if (!file[line] || !file[line].length) {

            if (typeof file[line] === "undefined") break;
            if (cardTitle.textContent) cards.append(cardElem);

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
            // else current line title word
        } else if (file[line][0]) {
            cardTitle = cardElem.querySelector('.card__title');
            cardTitle.textContent = file[line];
        };
        textarea.scrollTo(0, 0);
        window.scrollTo(0, 0);
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
    textarea.blur();
});

const btnReadText = document.getElementById('btn-read-text');
btnReadText.addEventListener('click', () => {
    cards.querySelectorAll('.card').forEach(elem => elem.remove());

    const textAreaContent = document.getElementById("load-file__textarea_id").value;
    if (textAreaContent.length == 0) return;
    const lines = textAreaContent.split(/\r\n|\n/);
    readTextCardsFile(lines);
}
);

const showColors = evt => {
    console.log(evt.keyCode);
    let color = document.getElementById('col');
    console.log(color);
    if (evt.keyCode === 96) {
        console.log('1');
        console.log(color.style.display);
        colorCSS = window.getComputedStyle(color, null).getPropertyValue("display");
        console.log(colorCSS);
        if (colorCSS === "none") {
            console.log('2');
            color.style.display = 'flex';
        } else if (color.style.display === "flex") {
            console.log('3');
            color.style.display = 'none';
        };
    }
};
document.addEventListener('keypress', evt => showColors(evt));


// readTextCardsFile(document.getElementById("load-file__textarea_id").value.split(/\r\n|\n/));

colorHeader = () => {
    let elem = document.querySelector('.header');
    let newColor = document.getElementById('input-color-header_id').value;
    elem.style.backgroundColor = newColor;
};
colorTitle = () => {
    let elem = document.querySelector('.header__title');
    let newColor = document.getElementById('input-color-header-text_id').value;
    elem.style.color = newColor;
};
colorBackground = () => {
    let elem = document.querySelector('.page');
    let newColor = document.getElementById('input-color-background-page_id').value;
    elem.style.backgroundColor = newColor;
};
colorStarred = () => {
    let elem = document.querySelector('.starred');
    let newColor = document.getElementById('input-color-background-starred_id').value;
    elem.style.backgroundColor = newColor;
};
colorCards = () => {
    let elem = document.querySelector('.cards');
    let newColor = document.getElementById('input-color-background-cards_id').value;
    elem.style.backgroundColor = newColor;
};
colorText = () => {
    let elem = document.querySelector('.page');
    let newColor = document.getElementById('input-color-text_id').value;
    elem.style.color = newColor;
};
colorLoad = () => {
    let elem = document.querySelector('.load-file');
    let newColor = document.getElementById('input-color-load-file_id').value;
    elem.style.backgroundColor = newColor;
};
colorFooter = () => {
    let elem = document.querySelector('.footer');
    let newColor = document.getElementById('input-color-footer_id').value;
    elem.style.backgroundColor = newColor;
};