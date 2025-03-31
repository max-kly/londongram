import { Link } from "react-router"
import HomeIcon from "../icons/HomeIcon"
import MessageIcon from "../icons/MessageIcon"
import PeopleIcon from "../icons/PeopleIcon"
import SidebarCommunities from "./SidebarCommunities"
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="navs">
                <Link to='feed' className="nav">
                    <HomeIcon />
                    <p>Feed</p>
                </Link>
                <Link to='messages' className="nav">
                    <MessageIcon />
                    <p>Messages</p>
                </Link>
                <Link to='people' className="nav">
                    <PeopleIcon />
                    <p>People</p>
                </Link>
            </div>
            <div className="community-navs">
                <input type="text" placeholder="🔍  Look for communities" />
                <SidebarCommunities />
            </div>
        </div>
    )
}
export default Sidebar