import { useParams } from 'react-router-dom';
import './ImageDetails.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function ImageDetails(){
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [ image, setImage ] = useState({})
    async function downloadImage(){
        try {
            // Getting the api response with individual image id
            const response = await axios.get(`https://api.slingacademy.com/v1/sample-data/photos/${id}`);
            
            // Extracting the object of the image
            const imageResult = response.data.photo;

            // Setting relavent values from the object of image
            setImage({
                imageUrl: imageResult.url,
                title: imageResult.title,
                description: imageResult.description
            })
            setIsLoading(false)
        } catch (error) {
            console.log("Something went wrong or you might not be connected to the internet ");
        }
    }
    useEffect(()=>{
        downloadImage()
    },[])


    return(
        <div className='image-details-container'>
            {
                isLoading ? <h1>Please wait a moment..!</h1> :
                <div className='image-details-wrapper'>
                    <img src={image.imageUrl}/>
                    <div className='image-details-contents'>
                        <h1>{image.title}</h1>
                        <p>{image.description}</p>
                    </div>
                </div>
            }
        </div>
        
    )

}

export default ImageDetails;