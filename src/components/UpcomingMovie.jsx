import React from 'react'
import { useGetUpComingMovieQuery } from '../services/api';

import { Link } from 'react-router-dom';

function UpcomingMovie() {

    const {data} = useGetUpComingMovieQuery();
   console.log(data);

  return (


  <section className='rounded'>
<h1 className='text-xl font-mono mb-5'>Upcoming Movies</h1>
<div className='grid grid-rows-2 grid-flow-col gap-1 overflow-x-scroll overflow-y-hidden h-screen'>

{data?.results?.map(item=>(
 
<div key={item?.id} className='w-80 h-80 pe-20' >
<Link to={`/movies/details/${item.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`} alt="" className='w-64 max-h-56 rounded' />
<p>{item?.title}</p>
<span className='flex justify-between'><li>{item.original_language}</li>
<li>{item?.release_date}</li></span>
</Link>
   </div>
))}



</div>
  
   </section>
  )
}

export default UpcomingMovie