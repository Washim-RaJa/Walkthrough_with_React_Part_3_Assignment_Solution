import { Link } from 'react-router-dom';
import './Image.css'
function Image({ id , image}){
    return(
        <Link to={`/photos/${id}`}>
            <div className="image-wrapper">
                <img src={image}/>
            </div>
        </Link>
    )
}

export default Image;