const API_KEY="4f599baa15d072c9de346b2816a131b8",BASE_URL="https://api.themoviedb.org/3",IMAGE_BASE_URL="https://image.tmdb.org/t/p/w500";let movies=[],currentPage=1,searchQuery="",isLoading=!1;const blockedMovieIds=[1163258,179387];async function fetchMovies(e=1,t=!1){try{isLoading=!0,document.getElementById("loading-spinner").style.display="block";const n=await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${e}`),o=await n.json(),i=(new Date).toISOString().split("T")[0],a=o.results.filter(e=>e.release_date&&e.release_date<=i&&!blockedMovieIds.includes(e.id));movies=t?[...movies,...a]:[...a],t?displayMovies(a,!0):applyFilters(),isLoading=!1,document.getElementById("loading-spinner").style.display="none"}catch(e){console.error("Error fetching movies:",e),isLoading=!1}}async function searchMovies(e,t=1){try{isLoading=!0,document.getElementById("loading-spinner").style.display="block";const n=await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${e}&page=${t}`),o=await n.json(),i=(new Date).toISOString().split("T")[0],a=o.results.filter(e=>e.release_date&&e.release_date<=i&&!blockedMovieIds.includes(e.id));movies=t>1?[...movies,...a]:[...a],displayMovies(a,t>1),isLoading=!1,document.getElementById("loading-spinner").style.display="none"}catch(e){console.error("Error searching movies:",e),isLoading=!1}}function displayMovies(e,t=!1){const n=document.getElementById("gallery");t||n.innerHTML="",0===e.length&&!t?(n.innerHTML="<p>No movies found.</p>",void 0):e.forEach(e=>{const t=document.createElement("div");t.className="column";const o=document.createElement("div");o.className="spinner";const i=document.createElement("img");i.className="lazy-image",i.setAttribute("data-src",IMAGE_BASE_URL+e.poster_path),i.alt=e.title,i.addEventListener("load",()=>{i.classList.add("loaded"),o.style.display="none"}),i.addEventListener("error",()=>{o.style.display="none",console.error(`Failed to load image for movie: ${e.title}`)});const a=document.createElement("a");a.href=`player.html?id=${e.id}`,a.target="_self",a.appendChild(i),t.appendChild(o),t.appendChild(a),n.appendChild(t)}),initializeLazyLoad()}function initializeLazyLoad(){const e=document.querySelectorAll("img.lazy-image"),t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const t=e.target;t.src=t.dataset.src,t.onload=()=>t.classList.add("loaded"),t.unobserve(t)}})});e.forEach(e=>t.observe(e))}function handleSearch(){const e=document.getElementById("search-bar").value.trim();searchQuery=e,currentPage=1,movies=[],e?searchMovies(e):fetchMovies()}async function populateGenreDropdown(){try{const e=await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`),t=await e.json(),n=document.getElementById("genre-dropdown");t.genres.forEach(e=>{"Documentary"!==e.name&&"Western"!==e.name&&(option=document.createElement("option")).value=e.id,option.textContent=e.name,n.appendChild(option)})}catch(e){console.error("Error fetching genres:",e)}}function applyFilters(){const e=document.getElementById("genre-dropdown").value;let t=movies.slice();e&&(t=t.filter(t=>t.genre_ids&&t.genre_ids.includes(parseInt(e)))),displayMovies(t)}window.addEventListener("scroll",()=>{window.innerHeight+window.scrollY>=document.body.offsetHeight-100&&!isLoading&&(currentPage++,searchQuery?searchMovies(searchQuery,currentPage):fetchMovies(currentPage,!0))}),document.addEventListener("DOMContentLoaded",()=>{populateGenreDropdown(),fetchMovies()}),document.getElementById("search-bar").addEventListener("input",handleSearch),document.getElementById("genre-dropdown").addEventListener("change",applyFilters);
