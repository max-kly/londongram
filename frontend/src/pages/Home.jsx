import Sidebar from "../components/Sidebar"
import CreatePost from "../components/CreatePost"
const Home = () => {
    return (
        <>
            <h1>Your feed</h1>
            <Sidebar />
            <CreatePost />
        </>
    )
}
export default Home