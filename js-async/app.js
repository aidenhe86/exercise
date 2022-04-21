// Part 1
const NUM_BASE_URL = "http://numbersapi.com";
let favNum = 7;
let favNums = [4,7,554,1];

// 1
async function part1(){
    let res = await axios.get(`${NUM_BASE_URL}/${favNum}/?json`);
    $("body").append(`<p>Part 1.1</p>`).append(`<p>${res.data.text}</p>`);
}
part1();

// 2
async function part2(){
    let res = await axios.get(`${NUM_BASE_URL}/${favNums}/?json`);
    $("body").append(`<p>Part 1.2</p>`);
    for(let num of favNums){
        $("body").append(`<p>${res.data[num]}</p>`)
    }
}
part2();

// 3
async function part3() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => axios.get(`${NUM_BASE_URL}/${favNum}/?json`))
    );
    $("body").append(`<p>Part 1.3</p>`);
    facts.forEach(data => {
      $('body').append(`<p>${data.data.text}</p>`);
    });
}
part3();

// Part 2
const DECK_BASE_URL = "http://deckofcardsapi.com/api/deck";

// 1
async function d1(){
    let res = await axios.get(`${DECK_BASE_URL}/new/draw/`);
    let {suit, value} = res.data.cards[0];
    console.log(`${value} of ${suit}`);
}
d1();

// 2
async function d2(){
    cards = [];
    let res = await axios.get(`${DECK_BASE_URL}/new/draw/`);
    cards.push(res.data.cards[0]);
    let deck_id = res.data.deck_id;
    let res2 = await axios.get(`${DECK_BASE_URL}/${deck_id}/draw/`)
    cards.push(res2.data.cards[0]);
    for(let card of cards){
        console.log(`${card.value} of ${card.suit}`)
    }
}
d2();

// 3
async function d3(){
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let res = await axios.get(`${DECK_BASE_URL}/new/shuffle/`);
    let deck_id = res.data.deck_id;

    $btn.show().on("click", async function(){
        let res = await axios.get(`${DECK_BASE_URL}/${deck_id}/draw/`);
        let card = res.data.cards[0].image;
        $cardArea.empty().append($(`<img src="${card}">`));
        if (res.data.remaining === 0) $btn.remove();
    })
}
d3();
