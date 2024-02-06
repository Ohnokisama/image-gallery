import React, {useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { Link } from 'react-router-dom'

function SavedImages() {
  const {user} = UserAuth()
  const [images, setImages] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setImages(doc.data().savedImages)
    })
  }, [user?.email])

  const getImage = doc(db, 'users', `${user?.email}`)
  const removeImage = async (imageID) => {
    try {
      const res = images.filter(item => item.id !== imageID)
      await updateDoc(getImage, {
        savedImages: res
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="container mx-auto my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-0">
          {
            images.map(image => <div className="w-full rounded overflow-hidden shadow my-1 group h-[350px] relative mx-auto" key={image?.id}>
            <img src={image?.pic} alt="" className="w-full h-full object-cover group-hover:scale-125 transition-all" />
            <div className="absolute w-full h-full top-0 left-0 p-2 md:p-6 bg-black/80 text-white flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all">
              <div className="flex justify-between items-center">
                <span>
                  <i className="ri-camera-line"></i>
                  &nbsp;{image?.owner}
                </span>
                <i className="ri-close-line cursor-pointer" onClick={() => removeImage(image?.id)}></i>
              </div>
              <div className="flex justify-between items-center">
                <span>
                  <i className="ri-eye-line"></i>
                  &nbsp;{image?.views}
                </span>
                <a href={image?.link} download target='_blank' className='px-4 py-2 text-white bg-violet-600 rounded'>
                  <i className="ri-download-line"></i>
                </a>
              </div>
            </div>
          </div>)
          }
        </div>
      </div>
    </>
  )
}

export default SavedImages