const api_key = `8ahjOnYZANP3nKIXiu1qBbKEjPxoW4da`;
const form = document.querySelector(`#form`);
const imgTable = document.querySelector(`#imgTable`);
const remove = document.querySelector(`#remove`);

console.log("Let's get this party started!");

form.addEventListener(`submit`,function(e){
    e.preventDefault();
    let term = document.querySelector(`#searchTerm`);
    appendImage(term.value);
    term.value = ``;
})

async function appendImage(q){
    const res = await axios.get(`https://api.giphy.com/v1/gifs/search`,{params:{api_key,q}})
    let length = Math.floor(Math.random() * res.data.data.length);
    let newImg = document.createElement(`img`);
    newImg.src = res.data.data[length].images.original.url;
    imgTable.append(newImg);
}

remove.addEventListener(`click`,function(){
    document.querySelector(`#searchTerm`).value = ``;
    imgTable.innerHTML = ``;
})

