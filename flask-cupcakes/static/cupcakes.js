BASE_URL = " http://127.0.0.1:5000/api";

// Generate html for cupcake
function generateCupCakeHTML(cupcake){
    return `
        <div data-cupcake-id = ${cupcake.id}>
            <li>
                ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
                <button class="delete-button">X</button>
            </li>
            <img class = cupcake-img src="${cupcake.image}">
        </div>
    `
}

//Get all cupcake list from api
async function getCupCakeList(){
    const res = await axios.get(`${BASE_URL}/cupcakes`);
    for (let CupCake of res.data.cupcakes){
        let NewCupCake = generateCupCakeHTML(CupCake);
        $("#cupcakes-list").append(NewCupCake);
    }
}


//handle add cupcake
async function submitNewCupCake(e){
    e.preventDefault();

    //get data from form
    const flavor =$(`#form-flavor`).val();
    const size =$(`#form-size`).val();
    const rating =$(`#form-rating`).val();
    const image =$(`#form-image`).val();

    //API post new cupcake
    const NewCupCakeRes = await axios.post(`${BASE_URL}/cupcakes`,{
        flavor,
        size,
        rating,
        image
    })

    //append new cupcake to the page
    let NewCupCake = generateCupCakeHTML(NewCupCakeRes.data.cupcake);
    $("#cupcakes-list").append(NewCupCake);
    $("#new-cupcake-form").trigger("reset");
}
$("#new-cupcake-form").on("submit",submitNewCupCake)


//handle delete cupcake
async function deleteCupCake(e){
    e.preventDefault();
    //selete the cupcake div
    const $target = $(e.target).closest("div");

    //selete the cupcake id
    const cupcakeID = $target.attr(`data-cupcake-id`);

    //delete cupcake from database and page
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeID}`)
    $target.remove();
}
$("#cupcakes-list").on("click",".delete-button",deleteCupCake)

getCupCakeList();