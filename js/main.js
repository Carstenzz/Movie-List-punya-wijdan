const main = document.getElementById("movie-list")
const apikey = "98f03ad5";

function OnChangeSearch(searchParam, page) {
  axios.get(`https://www.omdbapi.com/?apikey=${apikey}&s=${searchParam}&page=${page}`)
    .then((response) => {
      const movies = response.data.Search;
      if (movies == undefined) {
        main.innerHTML = notFound();
      } else {
        let cards = '';
        movies.forEach(data => cards += showCards(data));
        main.innerHTML = cards;

        const cardsDetail = document.querySelectorAll(".card")

        cardsDetail.forEach(detail => {
          detail.addEventListener("click", function () {
            const imdbId = detail.getAttribute("data-id");
            console.log(imdbId);
            fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${imdbId}`)
              .then(response => response.json())
              .then(m => {
                console.log(m);
                const movieDetail = modalDetail(m) // naruh datanya
                const modal = document.querySelector('.modal')
                modal.style.display = "flex";
                modal.innerHTML = movieDetail

                const btnClose = document.querySelector('.closeModal')
                btnClose.addEventListener('click', () => modal.style.display = "none")
              })

          })
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
}




const showCards = (data) => {
  return `
    <div class="card" data-id="${data.imdbID}">
    <img src="${data.Poster}">
    <div class="text">
      <h2>${data.Title}</h2>
      <h3>(${data.Year})</h3>
    </div>
    <button class="btn">Details</button>
  </div>
  `
}

const notFound = () => {
  return `
  <h1 class="notFound">Film Tidak Ditemukan</h1>
  `
}

const modalDetail = (data) => {
  return `
      <div class="heading">
        <h2>Detail Movie</h2>
        <button type="button" class="closeModal" ><i class='bx bx-x'></i></button>
      </div>
      
      <div class="content">
        <div class="img">
          <img src="${data.Poster}">
          <div class="text">
            <h3>Rated : ${data.Rated}</h3>
            <h3>Rateing : ${data.imdbRating}</h3>
          </div>
        </div>

        <div class="desc">
          <div class="poin">
            <h3>Title</h3>
            <p>${data.Title} (${data.Year})</p>
          </div>
          <div class="poin">
            <h3>Director</h3>
            <p>${data.Director}n</p>
          </div>
          <div class="poin">
            <h3>Actors</h3>
            <p>${data.Actors}</p>
          </div>
          <div class="poin">
            <h3>Country</h3>
            <p>${data.Country}</p>
          </div>
          <div class="poin">
            <h3>Plot</h3>
            <p class="plot">${data.Plot}</p>
          </div>
        </div>
      </div>
  `
}

// Input nama
const input = document.getElementById("search");
const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", () => {
  OnChangeSearch(input.value);
})

// Pagination
const nextPage = document.querySelector(".kanan")
const prevPage = document.querySelector(".kiri")
const page = document.querySelector('.page')
let currentPage = 1;
nextPage.addEventListener('click', () => {
  currentPage++;
  page.innerText = currentPage;
  OnChangeSearch(input.value, currentPage);
})
prevPage.addEventListener('click', () => {
  if (page.innerText > 1) {
    currentPage--;
    page.innerText = currentPage;
    OnChangeSearch(input.value, currentPage);
  }
})

input.addEventListener('blur', () => {
  currentPage = 1;
  page.innerText = currentPage;
  OnChangeSearch(input.value, currentPage);
})
