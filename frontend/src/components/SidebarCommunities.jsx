import { Link } from "react-router"
const SidebarCommunities = () => {
    return (
        <>
            <div className="communities-preview">
                <div className="label">My communities</div>
                <div className="communites-list">
                    <Link to='4903' className="community">
                        <div className="avatar-placeholder">C</div>
                        <p>Canary Wharf</p>
                    </Link>
                </div>
                <div className="button-area right">
                    <Link to='my-communities'>
                        <button>View all</button>
                    </Link>
                </div>
            </div>
            <div className="communities-preview">
                <div className="label">Suggested communities</div>
                <div className="communites-list">
                    <Link to='49033' className="community">
                        <div className="avatar-placeholder">S</div>
                        <p>Soho</p>
                    </Link>
                    <Link to='3932' className="community">
                        <div className="avatar-placeholder">P</div>
                        <p>Pilates in Greenwich</p>
                    </Link>
                </div>
                <div className="button-area right">
                    <Link to='communities'>
                        <button>Browse more</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default SidebarCommunities