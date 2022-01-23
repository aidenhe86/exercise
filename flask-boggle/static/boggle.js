const $form=$('form');

// send axios and get return value that if the word is in words
async function getGuess(guess) {
    const res = await axios.get('/check-guess',{params:{guess}});
    return res.data.result;
}

//show the result when submit the guess
async function handleGuess(evt){
    evt.preventDefault();
    let guess = $form.find(`input[name="guess"]`).val();
    result = await getGuess(guess);
    $(`#result`).html(``).append(`<span>${result}</span>`);
}

$form.on("submit",handleGuess);


