$(function(){
    $(`#form`).on(`submit`,function(e){
        e.preventDefault();
        let name = $(`#name`).val();
        let rate = $(`#rate`).val();
        if(name.length < 2 || rate === ``){
            alert(`Please enter valid input!`)
            return;
        }
        const movie = {name,rate};
        const htmlAppend = htmlTable(movie);
        $(`#movie-table`).append(htmlAppend);
        $("#form").trigger("reset");
    });

    $(`#movie-table`).on(`click`,`.deleteBtn`,function(){
        $(this).closest(`tr`).remove();
        //or use .parent().partent() instead of closet(`tr`)
    })

});

function htmlTable(data){
    return `
    <tr>
        <td>${data.name}</td>  
        <td>${data.rate}</td>  
        <td><button class = "deleteBtn">Delete</button>
        </td>  
    </tr>
    `
}


