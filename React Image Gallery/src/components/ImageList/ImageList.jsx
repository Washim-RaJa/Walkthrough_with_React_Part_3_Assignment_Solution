import axios from 'axios'
import { useEffect, useState } from 'react';
import Image from '../Image/Image';
import './ImageList.css'


function ImageList(){
    const [ images, setImages ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [offset, setOffset] = useState(0);
    const [ imageGalleryUrl, setImageGalleryUrl ] = useState(`https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=20`);
    async function downloadImages(){
        try {
            const response = await axios.get(imageGalleryUrl);      // Getting the api response
            const imageArr = response.data.photos                  // Extracting the array of objects of image
            console.log(response.data);
            console.log(imageGalleryUrl);
            // Iterating over the extracted array & extracting relavent details from each object of image
            const eachImageObj = imageArr.map((obj)=>{
                return{
                    id: obj.id,
                    image: obj.url,
                    title: obj.title,
                    description: obj.description
                }
            })
    
            setImages(eachImageObj);
            setIsLoading(false)
        } catch (error) {
            console.log("Something went wrong or you might not be connected to the internet ");
        }
    }
    useEffect(()=>{
        downloadImages();

    },[imageGalleryUrl]);
    console.log(offset);
    function prevPage(){
        
        setImageGalleryUrl(`https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=20`)
        setOffset(offset-20);
    }
    function nextPage(){        
        setOffset(offset+20);
        setImageGalleryUrl(`https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=20`)

    }
    return(
        <div className='imageList-container'>
            { 
                isLoading ? <h1>Please wait a moment..!</h1> :

                <div className='imageList-wrapper'>

                    {images.map((i)=> <Image image={i.image} key={i.id} id={i.id}/>)}

                    <div className='button-wrapper'>
                        <button disabled={offset == 0} onClick={prevPage}>Prev</button>
                        <button onClick={nextPage}>Next</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default ImageList