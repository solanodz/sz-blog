/* eslint-disable react/jsx-no-target-blank */
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Post from "@/components/Post";
import { UserContext } from "@/components/UserContext";
import { buttonVariants } from "@/components/ui/button"
import { useContext, useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Hero = () => {

    const [posts, setPosts] = useState([]);
    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    // this should show only 4 posts
    useEffect(() => {
        fetch('http://localhost:8080/post', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, [])

    const username = userInfo?.email;

    return (
        <div>
            <MaxWidthWrapper className='mt-20'>
                <div className="max-w-3xl text-center mx-auto ">
                    <h1 className='font-title italic font-medium tracking-tight text-5xl drop-shadow-lg'>Welcome to BLO<span className="text-black font-black tracking-tighter">GGG</span>ERS</h1>
                    <p className="text-muted-foreground max-w-lg mx-auto italic font-title text-sm my-1 font-regular">community of people seeking self improvement. Create your account and start writing <span className="font-semibold underline">for free.</span></p>
                </div>
                <div className=" w-fit mx-auto my-6">
                    {username && (
                        <div className="grid grid-flow-col gap-3">
                            <Link to={'/create'} className={buttonVariants({ variant: 'default' })}>Create a post</Link>
                            <Link to={'/all-posts'} className={buttonVariants({ variant: 'outline' })}>Read posts</Link>
                        </div>
                    )}
                    {!username && (
                        <div className="grid grid-flow-col gap-3">
                            <Link to={'/login'} className={buttonVariants({ variant: 'default' })}>Create your account</Link>
                            <Link to={'all-posts'} className={buttonVariants({ variant: 'outline' })}>Read posts</Link>
                        </div>
                    )}

                </div>
                <div className="">
                    <h2 className="font-semibold font-title text-3xl my-2">Recent articles</h2>
                    <Link to={'/all-posts'} className="grid grid-flow-col gap-2 hover:gap-4 duration-200 text-left w-fit items-center text-sm cursor-pointer my-2">See all posts <FaArrowRight /></Link>
                </div>
                <div className="flex justify-center container mx-auto p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {posts.length > 0 && posts.slice(0, 4).map(post => (
                            <Post {...post} key={post._id} />
                        ))}
                    </div>
                </div>
            </MaxWidthWrapper>
            <Footer />

        </div>
    )
}

export default Hero
