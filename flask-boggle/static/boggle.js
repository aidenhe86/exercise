const $form=$('form');
let score = 0;
let guessed = 0;
const words = new Set ();
// send axios and get return value that if the word is in words
async function getGuess(word) {
    const res = await axios.get('/check-guess',{params:{word}});
    return res.data.result;
}

//show the result when submit the guess
async function handleGuess(evt){
    evt.preventDefault();
    //show number of time guesses
    guessed++;
    $(`#guess`).text(guessed);

    let word = $form.find(`input[name="word"]`).val();
    //check if word already guess, return if guessed
    if(words.has(word)){
        return
    }
    else{
        words.add(word);
    }

    //score game when guess right word
    result = await getGuess(word);
    console.log(result);
    if(result === "ok"){
        console.log("score");
        score += word.length;
        $("#score").text(score);
    }
}


$form.on("submit",handleGuess);

//count down timer and end game at 60 sec
const timer = setInterval(countDown,1000);
let sec = 60;
$("#second").text(sec);
async function countDown(){
    sec--;
    $("#second").text(sec);
    if(sec === 0){
        clearInterval(timer);
        await scoreGame();
    }
}

//score game and send post request to back end
async function scoreGame(){
    $form.hide();
    const res = await axios.post("/score-game",{score});
    if(res.data.brokeRecord){
        $(`body`).append(`<p>New Record!<p>`)
    }
    else{
        $(`body`).append(`<p>End Game!<p>`)
    }
}


