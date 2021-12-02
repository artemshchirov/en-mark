const input = document.getElementById('load-file__input_id');
const textarea = document.getElementById('load-file__textarea_id');

const cards = document.querySelector('.cards');
const starredTemplate = document.querySelector('#starred-template').content;
const cardTemplate = document.querySelector('#card-template').content;

input.addEventListener('change', () => {
    const files = input.files;

    if (files.length == 0) return;

    const file = files[0];

    const reader = new FileReader();

    reader.onload = evt => {
        const file = evt.target.result;
        const lines = file.split(/\r\n|\n/);
        // textarea.value = lines.join('\n');
        textarea.value = file;
        
        let cardElem = "";

        for (let line = 0; line <= lines.length; line++) {
            if (lines[line] === '') {  // empty line
                console.log('==========')
                cards.append(cardElem);
                cardElem = cardTemplate.querySelector('.card').cloneNode(true);
            } else if (lines[line].slice(0, 4) === '    ') {  // sentence
                console.log('    4')
                let cardSentence = cardElem.querySelector('.card__sentence');
                cardSentence.textContent = lines[line];
            } else if (lines[line].slice(0, 2) === '  ') {  // explanation
                console.log('  2')
                let cardExplanation = cardElem.querySelector('.card__explanation');
                cardExplanation.textContent = lines[line];
            } else {  // word
                console.log(lines[line]);
                let cardTitle = cardElem.querySelector('.card__title');
                cardTitle.textContent = lines[line];
            };
        
        };
    };

    reader.onerror = evt => alert(evt.target.error.name);
    reader.readAsText(file);
});

const createCard = card => {
    const cardElem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElem.querySelector('.card__title');
    const cardExplanation = cardElem.querySelector('.card__explanation');
    const cardSentence = cardElem.querySelector('.card__sentence');
}