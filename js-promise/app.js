// Part 1
const NUM_BASE_URL = "http://numbersapi.com";
let favNum = 7;
let favNums = [4,7,554,1];

// 1
axios.get(`${NUM_BASE_URL}/${favNum}/?json`).then(res => {
    $("body").append(`<p>Part 1.1</p>`);
    $("body").append(`<p>${res.data.text}</p>`);
})

// 2
let multRequest = []
for(let num of favNums){
    multRequest.push(
        axios.get(`${NUM_BASE_URL}/${num}/?json`)
    )
}
Promise.all(multRequest).then(multRes => {
    $("body").append(`<p>Part 1.2</p>`);
    multRes.forEach( res =>{
        $("body").append(`<p>${res.data.text}</p>`)
    });
})

// 3
axios.get(`${NUM_BASE_URL}/${favNums}/?json`).then(res => {
    $("body").append(`<p>Part 1.3</p>`);
    for(let num of favNums){
        $("body").append(`<p>${res.data[num]}</p>`)
    }
})


// Part 2
// 1
const DECK_BASE_URL = "http://deckofcardsapi.com/api/deck";
axios.get(`${DECK_BASE_URL}/new/draw/`).then(res => {
    let {suit, value} = res.data.cards[0];
    console.log(`${value} of ${suit}`);
})

// 2
let cards = [];
axios.get(`${DECK_BASE_URL}/new/draw/`)
.then(res => {
    cards.push(res.data.cards[0]);
    let deck_id = res.data.deck_id;
    return axios.get(`${DECK_BASE_URL}/${deck_id}/draw/`)
})
.then(res => {
    cards.push(res.data.cards[0]);
    for(let card of cards){
        console.log(`${card.value} of ${card.suit}`)
    }
})

// 3
let deck_id;
let $btn = $('button');
let $cardArea = $('#card-area');
axios.get(`${DECK_BASE_URL}/new/shuffle/`)
.then(res => {
    deck_id = res.data.deck_id;
    $btn.show();
})

$btn.on("click",function(){
    axios.get(`${DECK_BASE_URL}/${deck_id}/draw/`).then(res =>{
        let card = res.data.cards[0].image;
        $cardArea.empty().append($(`<img src="${card}">`));
        if (res.data.remaining === 0) $btn.remove();
    })
})
