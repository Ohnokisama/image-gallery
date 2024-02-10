import React, {useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const ImageCard = ({image}) => {
  const [like, setLike] = useState(false)
  const {user} = UserAuth()
  const [saved, setSaved] = useState(false)

  // Getting user id to save an image
  const userID = doc(db, 'users', `${user?.email}`)
  const saveImage = async () => {
    if(user?.email) {
      setLike(!like)
      setSaved(true)
      await(updateDoc(userID, {
        savedImages: arrayUnion({
          id: image.id,
          owner: image.user,
          pic: image.largeImageURL,
          views: image.views,
          link: image.pageURL
        })
      }))
    } else {
      alert('Please log in to save a picture')
    }
  }



  return (
    <div className="w-full rounded overflow-hidden shadow my-1 group h-[350px] relative mx-auto" key={image?.id}>
      <img src={image?.largeImageURL} alt="" className="w-full h-full object-cover group-hover:scale-125 transition-all" />
      <div className="absolute w-full h-full top-0 left-0 p-4 md:p-6 bg-black/80 text-white flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all">
        <div className="flex justify-between items-center">
          <span>
            <i className="ri-camera-line"></i>
            &nbsp;{image?.user}
          </span>
          <p onClick={saveImage}>
            {
              like ? <i className="ri-heart-fill"></i> : <i className="ri-heart-line"></i>
            } 
          </p>
        </div>
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