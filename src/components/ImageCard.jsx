import React from 'react'

const ImageCard = ({image}) => {
  return (
    <div className="w-full rounded overflow-hidden shadow my-1 group h-[350px] relative mx-auto" key={image?.id}>
      <img src={image?.largeImageURL} alt="" className="w-full h-full object-cover group-hover:scale-125 transition-all" />
      <div className="absolute w-full h-full top-0 left-0 p-2 md:p-6 bg-black/80 text-white flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all">
        <span>
          <i className="ri-camera-line"></i>
          &nbsp;{image?.user}
        </span>
        <div className="flex justify-between items-center">
          <span>
            <i className="ri-eye-line"></i>
            &nbsp;{image?.views}
          </span>
          <span>
            <i className="ri-download-line"></i>
            &nbsp;{image?.downloads}
          </span>
          <a href={image?.pageURL} download target='_blank' className='px-4 py-2 text-white bg-violet-600 rounded'>
            <i className="ri-download-line"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ImageCard