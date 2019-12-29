//jshint esversion:6
//setting random movies.
function randomMovies() 
{
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=06952d5eda1c1b29d20609da5e9d2693`)
      .then((response) => {
        let movies = response.data.results;
      	let output = '';
      	movies.forEach(movie => {
      	image=`https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        output += `

            <div class='col-md-3'>
            <div class= 'well text-center'>
                <img src='${image}'></img>
                <h4>${movie.title}</h4>
            <button onclick= "movieId('${movie.id}')" class="btn btn-primary" href="#">Movie Detail</button>
            </div>
            </div>`;
        });
        $('#movies').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
}
function getMovie() {
  let searchText;
  searchText = document.getElementById('searchText').value;
  if(searchText){
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=06952d5eda1c1b29d20609da5e9d2693&query=${searchText}`)
    .then((response) => {
      let movies = response.data.results;
      let output = '';
      movies.forEach(movie => {
      	image=`https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        output += `
            <div class='col-md-3'>
            <div class= 'well text-center'>
                <img src='${image}'></img>
                <h4>${movie.title}</h4>
            <button onclick= "movieId('${movie.id}')" class="btn btn-primary" href="#">Movie Detail</button>
            </div>
            </div>`;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
	}
   
   else{
     window.alert("please fill the following field");
   }

}


function movieId(id) {
	console.log(id);
  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=06952d5eda1c1b29d20609da5e9d2693`).then((response) => {
    let movie = response.data;
    let image=`https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    let genereString=0;
     movie.genres.forEach(obj=>{
		    	if(genereString===0){
		    		genereString=`${obj.name}`;
		    	}else{genereString+=` ,${obj.name}`;
		    	}
		    		
      });
      




console.log(movie);
    let output = `
         
<div class="card mb-3" >
  <div class="row no-gutters">
    <div class="col-md-4">
    <img src="${image}" class="card-img" alt="...">
    </div>
      <div class="col-md-8">
        <div class="card-body">
              <h1 class="card-title text-center">${movie.original_title}</h1>
              <h4 class="card-text">  ${movie.overview}</h4>
              <h3><strong>Genre:</strong> ${genereString}</br></h3>
              <h3><strong>Released:</strong> ${movie.release_date}</br></h3>
              <h3><strong>Budget:</strong> ${movie.budget}</br></h3>
              <h3><strong>Revenue:</strong> ${movie.revenue}</br></h3>
              <h3><strong>Status:</strong> ${movie.status}</br></h3>
              <h3><strong>Tagline:</strong> ${movie.tagline}</br></h3>
        </div>
      </div>
    </div>
</div>
             
<div class="row">
  <div class="well">
    <a href="${movie.homepage}" target="_blank" class="btn btn-primary">View IMDB</a>
    <a href="index.html" class="btn btn-default">Go Back To Search</a>
  </div>
</div> `;
$('#movie').html(output);

  }).catch((err) => {
    console.log(err);
  });

}