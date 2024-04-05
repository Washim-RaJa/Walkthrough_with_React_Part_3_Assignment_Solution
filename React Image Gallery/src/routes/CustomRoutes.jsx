import { Routes, Route } from "react-router-dom";
import ImageDetails from "../components/ImageDetails/ImageDetails";
import Gallery from "../components/Gallery/Gallery";

function CustomRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Gallery/>}/>
            <Route path="/photos/:id" element={<ImageDetails/>}/>
        </Routes>
    )
}

export default CustomRoutes;