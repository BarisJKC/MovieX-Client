console.log("Hello!");

const addMovieModal = document.getElementById("add-movie-modal");

async function getMoviesFromApi() {

    const response = await fetch (
        'https://whispering-thicket-31912.herokuapp.com/movies' //fetch sends default get request
    );
    const movies = await response.json();
    // const xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if(this.readyState===4 && this.status===200) {
    //         const movies = JSON.parse(this.response);
            movies.forEach(movie => {
                let markup= `
                <div class="card-body">
                    <h2 class="card-title">${movie.name}</h2>
                    <p class="card-text">${movie.description}</p>
                    <button class="btn btn-danger delete-movie" data-movieid="${movie._id}">Delete Movie</button>
                </div>
                <div class="card-footer">
                ${movie.genre
                    .map(
                        genre =>
                            `<span class="badge badge-pill badge-warning m-1">${genre}</span>`
                    )
                    .join("")}
                `;
                let card=document.createElement("div");
                card.classList.add("card","bg-dark","text-white");
                // card.style.width="300px";
                card.innerHTML=markup;
                document.getElementById("movies").appendChild(card); //appendChild node ekler, append text ekler!. appencchild sona node ekler
            });
            // console.log(JSON.parse(this.response)); // gelen response text formatında olduğu için JSON parse ile dönüştürüldü
        // }
    // }
    // xhttp.open('GET', 'https://whispering-thicket-31912.herokuapp.com/movies',true);
    // xhttp.send();
};

async function postMovieToApi(event) {
    event.preventDefault();
    const movieName = document.getElementById("movie-name").value;
    const movieDescription = document.getElementById("movie-description").value;
    const movieReleased = document.getElementById("movie-released").value;
    const movieGenres = document.getElementById("movie-genres").value;

    const genreArray = movieGenres.split(",").map(genre =>genre.trim()); 

    const requestBody={
        name:movieName,
        description:movieDescription,
        released:movieReleased,
        genre:genreArray
    };

    const options = {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(requestBody)
    };

    const response = await fetch (
        'https://whispering-thicket-31912.herokuapp.com/movies',options
    );

    const responseJson = await response.json();

    $("#add-movie-modal").modal("toggle");
    $("#movies").html("");
    getMoviesFromApi();

}

async function deleteMovieFromAPI() {
    const movieId = $(this).data("movieid");
    await fetch(`https://whispering-thicket-31912.herokuapp.com/movies/${movieId}`, {method:"DELETE"});
    $("#movies").html("");
    getMoviesFromApi();
}

getMoviesFromApi();


const addMovieForm = document.getElementById("add-movie-form");

addMovieForm.addEventListener("submit", postMovieToApi); // callback olarak bu fonksiyonu kullan derken parantezleri gerekli değil

$("#movies").on("click", ".delete-movie",deleteMovieFromAPI);