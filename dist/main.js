//setting random movies.
function randomMovies() {
  typeOfData = document.getElementById('typeOfData').value;
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=06952d5eda1c1b29d20609da5e9d2693`)
      .then((response) => {
        let movies = response.data.results;
      	let output = '';
      	movies.forEach(movie => {
      	image=`https://image.tmdb.org/t/p/original/${movie.poster_path}`
        output += `
            <div class='col-md-3'>
            <div class= 'well text-center'>
                <img src='${image}'></img>
                <h6>${movie.title}</h6>
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
  let typeOfData;
  searchText = document.getElementById('searchText').value;
  typeOfData = document.getElementById('typeOfData').value;
  if(searchText&&typeOfData){
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=06952d5eda1c1b29d20609da5e9d2693&query=${searchText}`)
    .then((response) => {
      let movies = response.data.results;
      let output = '';
      movies.forEach(movie => {
      	image=`https://image.tmdb.org/t/p/original/${movie.poster_path}`
        output += `
            <div class='col-md-3'>
            <div class= 'well text-center'>
                <img src='${image}'></img>
                <h6>${movie.title}</h6>
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
		    	}else{genereString+=` ,${obj.name}`
		    	}
		    		
    	})
console.log(movie)
    let output = `
         <div class="row">
           <div class="col-md-4">
             <img src="${image}" class="thumbnail">
           </div>
           <div class="col-md-8">
             <h2>${movie.original_title}</h2>
             <ul class="list-group">
         		
         		<li class="list-group-item"><strong>Genre:</strong> ${genereString}</li>
               <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
               <li class="list-group-item"><strong>Bundget:</strong> ${movie.budget}</li>
               <li class="list-group-item"><strong>Revenue:</strong> ${movie.revenue}</li>
      			<li class="list-group-item"><strong>Status:</strong> ${movie.status}</li>
      			<li class="list-group-item"><strong>Tagline:</strong> ${movie.tagline}</li>
             </ul>
           </div>
         </div>

        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a href="${movie.homepage}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;
    $('#movie').html(output);

  }).catch((err) => {
    console.log(err)
  });

}