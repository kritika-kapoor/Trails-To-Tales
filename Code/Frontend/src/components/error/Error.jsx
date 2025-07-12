import { Link } from "react-router-dom";

export default function Error(){
    return(
        <>
        <h1 className="text-center">404 Page Not Found</h1>
        <h5 className="text-center">
        <Link to={'/'} className="text-center">Go Back</Link>
        </h5>
        </>
        
    )
}