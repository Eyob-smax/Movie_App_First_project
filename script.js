document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector("#menu-btn");
  const searchInput = document.querySelector("#search-movies");
  const search = document.querySelector("#search");
  const displayed = document.querySelector(".displayed");
  const trending = document.querySelector(".trending");
  const latest = document.querySelector(".latest");
  const series = document.querySelector(".series");
  const trendingMovies = document.querySelectorAll("#trending-movie");
  const seriesPop = document.querySelectorAll("#series-movie");
  const latestMovies = document.querySelectorAll("#latest-movie");
  const popupModel = document.querySelector(".popup-model");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const modalBackBtn = document.querySelector(".back-btn");
  const addFavoriteBtn = document.querySelector(".favorite-btn");
  const successMessage = document.querySelector(".favorite-section");
  const aboutUs = document.querySelector("#about-us");
  const bestMovies = document.querySelector("#best-movies");
  const darkTheme = document.querySelector("#dark-theme");
  const favorites = document.querySelector("#favorites");
  const closeMenu = document.querySelector("#close-menu");
  const menuSection = document.querySelector("#menu-section");
  const favoriteMenuSection = document.querySelector(".favorite-menu-section");
  const aboutPage = document.querySelector(".about-page");

  const searchedMovieCon = document.querySelector("#movieMainContainer");

  const searchSection = document.querySelector(".search-section");
  const backHome = document.querySelector("#backHome");
  const backHomeAbout = document.querySelector("#back-home-about");
  const searchResultContainer = document.querySelector(
    ".search-result-container"
  );
  const searchResult = document.querySelector(".each-search-movie");
  const transitionPage = document.querySelector(".transition");
  const bestMovieBtn = document.querySelector("#best-movies");
  const bestMoviesSection = document.querySelector(".best-movies-section");
  const favoriteMoviesContainer = document.querySelector("#favorite-container");
  const searchDetail = document.querySelector(".search-detail");

  const iFrame = document.querySelector("iframe");
  const detailName = document.querySelector("#movie-detal-title");
  const genreHolder = document.getElementById("genre-holder");
  const detailDesc = document.querySelector(".detail-desc");
  const detailDate = document.querySelector(".detail-released-date");

  const sections = [
    displayed,
    header,
    footer,
    menuSection,
    favoriteMenuSection,
    aboutPage,
    popupModel,
    header,
    searchSection,
    latest,
    bestMoviesSection,
    searchResultContainer,
    searchDetail,
  ];
  let favArr = [];
  let dataGenre = null;
  let dataTvGenre = null;
  let dataUpcome = null;
  let data = null;
  /*  let dataTrailer = null; */
  footer.classList.remove("hide");

  const apiKey = "21d63f70af9ef597fdeb1bb793050970";
  const searchMovie = async (movieName) => {
    //url section
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`;
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    const genreTvUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`;
    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const popTv = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;

    const bestMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&page=1
`;

    try {
      const resGenre = await fetch(genreUrl);
      dataGenre = await resGenre.json();

      const resTvGenre = await fetch(genreTvUrl);
      dataTvGenre = await resTvGenre.json();

      const resBest = await fetch(bestMovies);
      const dataBest = await resBest.json();

      const resUpcome = await fetch(upcomingUrl);
      dataUpcome = await resUpcome.json();
      displayData(dataUpcome.results, latestMovies);

      const resTvPop = await fetch(popTv);
      const dataTvPop = await resTvPop.json();
      displayData(dataTvPop.results, seriesPop);

      const resPop = await fetch(popularUrl);
      const dataPop = await resPop.json();
      displayData(dataPop.results, trendingMovies);

      const response = await fetch(url);
      data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  searchMovie();
  setTimeout(function () {
    transitionPage.style.display = "none";
  }, 3000);
  transitionPage.style.display = "flex";
  let favoriteMovies = "";

  function displayData(popMovies, dispSection) {
    popMovies.forEach((movie, index) => {
      dispSection.forEach((item, ind) => {
        if (index === ind) {
          item.firstElementChild.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          item.lastElementChild.textContent = movie.title;
          if (dispSection === seriesPop) {
            item.lastElementChild.textContent = movie.name;
          }
          item.addEventListener("click", function () {
            let genreNames = [];
            function identifyIds(ids) {
              ids.forEach((item) => {
                movie.genre_ids.forEach((genre) => {
                  if (item.id === genre) {
                    genreNames.push(item.name);
                  }
                });
              });
              genreNames = genreNames.join(", ");
              return genreNames;
            }
            identifyIds(dataGenre.genres);
            document.querySelector(
              "#popup-modal-img"
            ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            sections.forEach((section) => {
              section.classList.toggle("blury");
            });
            popupModel.classList.toggle("hide");
            popupModel.classList.remove("blury");

            document.querySelector(
              "#title"
            ).textContent = `Title - ${movie.title}`;
            if (dispSection === seriesPop) {
              document.querySelector(
                "#title"
              ).textContent = `Title - ${movie.name}`;
              document.querySelector("#year").textContent = `Year - ${
                movie.first_air_date.split("-")[0]
              }`;
              let genreTvNames = [];
              function identifyTvIds(tvIds) {
                tvIds.forEach((item) => {
                  movie.genre_ids.forEach((genre) => {
                    if (item.id === genre) {
                      genreTvNames.push(item.name);
                    }
                  });
                });
                if (genreTvNames.length > 1) {
                  genreTvNames = genreTvNames.join(", ");
                } else {
                  genreTvNames = genreTvNames.join();
                }
                return genreTvNames;
              }
              identifyTvIds(dataTvGenre.genres);
              document.querySelector(
                "#genre"
              ).innerHTML = `Genre - ${genreTvNames}`;
              popupModel.classList.remove("hide");
            }

            document.querySelector(
              "#genre"
            ).innerHTML = `Genre - ${genreNames}`;
            if (
              dispSection === trendingMovies ||
              dispSection === latestMovies
            ) {
              document.querySelector("#year").textContent = `Year - ${
                movie.release_date.split("-")[0]
              }`;
            }
            document.querySelector(
              "#overview"
            ).textContent = `Overview - ${movie.overview}`;
            function addFavorite() {
              favorites.addEventListener("click", function () {
                sections.forEach((section) => {
                  section.classList.add("hide");
                });

                favoriteMenuSection.classList.remove("hide");
              });
              addFavoriteBtn.addEventListener("click", function (e) {
                e.preventDefault();
                successMessage.style.display = "flex";
                setTimeout(function () {
                  successMessage.style.display = "none";
                }, 2000);

                if (e.target.classList.contains("favorite-btn")) {
                  favoriteMovies = ` <div
          id="favorite-added-movies"
          class="h-[190x] max-w-[165px] rounded-2xl bg-[#3F7A66]"
        >
          <img
            class="mx-auto mt-2 overflow-hidden rounded-2xl object-contain"
            src=${`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
            width="150"
            class="overflow-hidden rounded-lg object-fill"
          />
          <p class="text-center text-white font-inria">${movie.title}</p>
        </div>`;
                  favArr.push(favoriteMovies);
                  console.log(favArr);
                  favArr.forEach((fav) => {
                    localStorage.setItem("favs", JSON.stringify(fav));
                  });
                }
              });
              const getFromLS = JSON.parse(localStorage.getItem("favs"));
              favoriteMoviesContainer.innerHTML += getFromLS;
            }
            addFavorite();
          });

          modalBackBtn.addEventListener("click", function () {
            sections.forEach((section) => {
              section.classList.remove("blury");
            });
            popupModel.classList.add("hide");
          });
        }
      });
    });
  }

  function searchFunc() {
    search.addEventListener("focus", function () {
      sections.forEach((section) => {
        section.classList.add("hide");
      });
      searchResultContainer.classList.remove("hide");
      searchSection.style.display = "none";
    });
    document
      .querySelector(".search-btn")
      .addEventListener("click", function () {
        searchMovie(searchInput.value);
        const searched = data.results;
        const finalStr = searched
          .map((item) => {
            return `<div class="each-search-movie rounded-2xl bg-[#43856f] p-2">
            <img src="${`https://image.tmdb.org/t/p/w500${item.poster_path}`}" alt="" class="overflow-hidden rounded-lg object-fill" />
            <p class="font-inria text-sm mt-2">${item.title || item.name}</p>
          
          <p class="hide">${item.id}</p>
          <p class="hide">${item.overview}</p>
          <p class="hide">${item.genre_ids}</p>
          <p class="hide">${item.release_date}</p></div>`;
          })
          .join("");

        searchedMovieCon.innerHTML = finalStr;

        Array.from(searchedMovieCon.children).forEach((child, index) => {
          child.addEventListener("click", function () {
            let clickedId = child.children[2].innerHTML;
            let clickedGenreArr = child.children[4].innerHTML;
            let clickedDesc = child.children[3].innerHTML;
            let clickedyear = child.children[5].innerHTML;

            detailName.innerHTML = child.children[1].innerHTML;
            detailDesc.innerHTML = clickedDesc;
            detailDate.innerHTML = clickedyear;
            let detailGenrenames = [];
            let convertedtoArr = clickedGenreArr.split(",");
            convertedtoArr.forEach((item) => {
              convertedtoArr.push(Number(item));
            });
            function identifydetailIds(ids) {
              ids.forEach((item) => {
                convertedtoArr.forEach((genre) => {
                  if (item.id === genre) {
                    detailGenrenames.push(item.name);
                  }
                });
              });
              return detailGenrenames;
            }
            identifydetailIds(dataGenre.genres);
            console.log(detailGenrenames);
            const detailGenreStr = detailGenrenames
              .map((genres) => {
                return `<div
            class="rounded-2xl bg-yellow-500 px-5 py-1.5 text-sm shadow-xl shadow-slate-900/5"
          >
            ${genres}
          </div>`;
              })
              .join("");

            document
              .getElementById("detail-add-fav")
              .addEventListener("click", function () {
                console.log(searched);
                let eachPoster = `https://image.tmdb.org/t/p/w500${searched.poster_path}`;
                favDetailAdded = ` <div
        id="favorite-added-movies"
        class="h-[190x] max-w-[165px] rounded-2xl bg-[#3F7A66]"
      >
        <img
          class="mx-auto mt-2 overflow-hidden rounded-2xl object-contain"
          src = ${eachPoster}
          alt=""
          width="150"
          class="overflow-hidden rounded-lg object-fill"
        />
        <p class="text-center text-white font-inria">${child.children[1].innerHTML}</p>
      </div>`;
                favoriteMoviesContainer.innerHTML += favDetailAdded;
              });

            genreHolder.innerHTML = detailGenreStr;
            sections.forEach((section) => {
              section.classList.add("blury");
            });
            searchDetail.classList.remove("hide");
            searchDetail.style.zIndex = "1000";
            searchDetail.classList.remove("blury");
            header.classList.remove("blury");
            async function getTrailer(movieId) {
              const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
              const responseTrailer = await fetch(trailerUrl);
              const dataTrailer = await responseTrailer.json();
              console.log(dataTrailer);
              const findTrailer = dataTrailer.results.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
              );
              let finalTrailer = `https://www.youtube.com/embed/${findTrailer.key}`;

              iFrame.src = finalTrailer;
            }
            getTrailer(clickedId);
          });
        });
      });
  }

  document
    .getElementById("movies-detail-back")
    .addEventListener("click", function () {
      sections.forEach((section) => {
        section.classList.remove("blury");
      });
      searchDetail.classList.add("hide");
    });

  document
    .querySelector("#close-search")
    .addEventListener("click", function () {
      backToHomebuttons();
    });
  searchFunc();
  searchSection.style.display = "block";
  function menuData() {
    aboutUs.addEventListener("click", function () {
      sections.forEach((section) => {
        section.classList.add("hide");
      });
      aboutPage.classList.remove("hide");
    });

    closeMenu.addEventListener("click", function () {
      menuSection.classList.add("hide");
    });
    menuBtn.addEventListener("click", function () {
      menuSection.classList.remove("hide");
    });
  }

  function backToHomebuttons() {
    sections.forEach((section) => {
      section.classList.remove("hide");
      section.classList.remove("blury");
    });
    aboutPage.classList.add("hide");
    menuSection.classList.add("hide");
    favoriteMenuSection.classList.add("hide");
    searchSection.classList.add("hide");
    aboutPage.classList.add("hide");
    popupModel.classList.add("hide");
    bestMoviesSection.classList.add("hide");
    searchResultContainer.classList.add("hide");
    searchSection.style.display = "block";
    searchDetail.classList.add("hide");
  }
  backHome.addEventListener("click", backToHomebuttons);
  backHomeAbout.addEventListener("click", backToHomebuttons);
  menuData();
});
