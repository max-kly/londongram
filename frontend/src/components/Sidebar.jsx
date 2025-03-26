import { Link } from "react-router"
import HomeIcon from "../icons/HomeIcon"
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="navs">
                <Link to='feed'>
                    <HomeIcon />
                    <p>Feed</p>
                </Link>
            </div>
        </div>
    )
}
export default Sidebar