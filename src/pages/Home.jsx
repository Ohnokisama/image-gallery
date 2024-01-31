import axios from 'axios'
import React, {useState, useEffect} from 'react'
import ImageSearch from '../components/ImageSearch'
import ImageCard from '../components/ImageCard'

const Home = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const image = images[Math.floor(Math.random() * images.length)]

  useEffect(() => {
    axios.get(`https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&q=&image_type=photo$pretty=true`)
    .then(response => {
      setImages(response.data.hits)
      setIsLoading(false)
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [])

  return (
    <>
      <div className='w-full h-[500px] text-white'>
        <div className="w-full h-full relative">
          <div className="absolute w-full h-full bg-black/60 top-0 left-0"></div>
          <img src={`${image?.largeImageURL}`} alt="" className='w-full h-full object-cover' />
          <div className="absolute top-[30%] left-0 w-full px-6 md:px-12">
            <div className="w-full md:w-[50%] mx-auto">
              <h1 className="text-4xl font-medium">Welcome to JayPegs - Royalty free images for personal or professional use.</h1>
              <ImageSearch />
            </div>
            
          </div>
        </div>
      </div>
      <div className='container mx-auto my-12'>
        <h1 className="text-center text-2xl md:text-4xl font-semibold my-6">Image Gallery</h1>
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

export default Home