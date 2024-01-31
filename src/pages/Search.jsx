import axios from 'axios'
import React, {useState, useEffect} from 'react'
import ImageSearch from '../components/ImageSearch'
import ImageCard from '../components/ImageCard'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query')

  const image = images[Math.floor(Math.random() * images.length)]

  useEffect(() => {
    axios.get(`https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&q=${query}&image_type=all$pretty=true`)
    .then(response => {
      setImages(response.data.hits)
      setIsLoading(false)
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [query])

  return (
    <>
      <div className='w-full h-[300px] text-white'>
        <div className="w-full h-full relative">
          <div className="absolute w-full h-full bg-black/60 top-0 left-0"></div>
          <img src={`${image?.largeImageURL}`} alt="" className='w-full h-full object-cover' />
          <div className="absolute top-[40%] left-0 w-full px-6 md:px-12">
            <div className="w-full">
              <h1 className="text-4xl font-medium">Your Search Results on:- {query}</h1>
            </div>
            
          </div>
        </div>
      </div>
      <div className='container mx-auto my-12'>
        <h1 className="text-center text-2xl md:text-4xl font-semibold my-6">Image Gallery</h1>
        {!isLoading && images.length === 0 && <h1 className='text-4xl text-center font-bold mx-auto mt-32 text-red-600'><i className="ri-emotion-sad-line ri-3x block font-extralight mb-4"></i><br />Images Not Found!</h1>}

        {
          isLoading ? <h1 className='text-4xl text-center mx-auto mt-32'>Loading</h1> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 md:mx-0">
          {
            images.map(image => (
              <ImageCard key={image?.id} image={image} />
            ))
          }
        </div>
        }
      </div>
    </>
  )
}

export default Search