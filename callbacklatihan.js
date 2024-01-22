$("#search-button").on("click", function () {
  $.ajax({
    url:
      "https://www.omdbapi.com/?i=tt3896198&apikey=f935f03e&s=" +
      $("#input-keyword").val(),
    success: (results) => {
      console.log(results);
      const movies = results.Search;
      let cards = "";
      movies.forEach((element) => {
        cards += `<div class="col-md-3 my-4">
                <div class="card">
                    <img src="${element.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${element.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                         data-bs-target="#movieDetailModal" data-imdbid="${element.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
      });
      $(".movie-container").html(cards);

      // Ketika tombol diklik
      $(".modal-detail-button").on("click", function () {
        const imdbID = $(this).data("imdbid");

        $.ajax({
          url: "https://www.omdbapi.com/?i=" + imdbID + "&apikey=f935f03e", // Perbaikan pada URL
          success: (element) => {
            if (element.Response === "True") {
              console.log(element);
              const movieDetail = `<div class="container-fluid">
                      <div class="row">
                          <div class="col-md-3">
                              <img src="${element.Poster}" class="img-fluid">
                          </div>
                          <div class="col-md">
                              <ul class="list-group">
                                  <li class="list-group-item">
                                      <h4>${element.Title} (${element.Year})</h4>
                                  </li>
                                  <li class="list-group-item"><strong>Director :</strong> ${element.Director}</li>
                                  <li class="list-group-item"><strong>Actor :</strong> ${element.Actors}</li>
                                  <li class="list-group-item"><strong>Writer :</strong> ${element.Writer}</li>
                                  <li class="list-group-item"><strong>Plot :</strong> ${element.Plot}</li>
                              </ul>
                          </div>
                      </div>
                  </div>`;
              $(".modal-body").html(movieDetail);
            } else {
              console.error("Incorrect IMDb ID or Movie not found.");
            }
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});
