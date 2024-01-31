import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Post from "@/components/Post";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"


const Hero = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/post', {
        }).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, [])

    return (
        <div>
            <MaxWidthWrapper className='mt-20'>
                <h1 className='max-w-3xl font-bold text-center tracking-tight mx-auto text-5xl'>Welcome to my blog</h1>
                <div className="text-center mx-auto mb-12">
                    <Button className='mt-10'>Create a post</Button>
                    <Button className='mt-10 ml-5'>Read posts</Button>
                </div>
                <div className="flex justify-center container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {posts.length > 0 && posts.map(post => (
                            <Post {...post} key={post._id} />
                        ))}
                    </div>
                </div>
            </MaxWidthWrapper>

        </div>
    )
}

export default Hero
