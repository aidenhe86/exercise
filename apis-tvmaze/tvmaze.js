async function searchShows(query) {
  const res = await axios.get(`http://api.tvmaze.com/search/shows`,{params:{q:query}});
  console.log(res);
  const result = res.data.map(shows =>{
    return {
      id : shows.show.id,
      name : shows.show.name,
      summary : shows.show.summary,
      image : shows.show.image ? shows.show.image.original : `https://tinyurl.com/tv-missing`
    }
  });
  return result;
}


function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  //add episode button when populate shows
  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-primary get-episodes">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);

});

async function getEpisodes(id) {
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  console.log(res);
  const list = res.data.map(ep =>{
    return {
      id : ep.id,
      name : ep.name,
      season : ep.season,
      number: ep.number
    }
  })
  return list;
}

function populateEpisodes(eps){
  const $episodesList = $(`#episodes-list`);
  $episodesList.empty();
  for(let ep of eps){
    let $item = $(
      `<li>${ep.name} Season:${ep.season} Eposide:${ep.number}</li>
    `);
    $episodesList.append($item);
  }
  $("#episodes-area").show();
}

$("#shows-list").on("click", ".get-episodes", async function handleEpisodeClick(evt) {
  let showId = $(evt.target).closest(".Show").data("show-id");
  let episodes = await getEpisodes(showId);
  populateEpisodes(episodes);
});
