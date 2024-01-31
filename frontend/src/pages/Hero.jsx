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
                <div className="max-w-3xl text-center mx-auto ">
                    <h1 className='font-title italic font-medium tracking-tight text-5xl'>Welcome to BLO<span className="text-black font-black tracking-tighter">GGG</span>ERS</h1>
                    <p className="text-muted-foreground max-w-lg mx-auto italic font-title text-sm my-1 font-regular">community of people seeking self improvement. Create your account and start writing <span className="font-semibold underline">for free.</span></p>
                </div>
                <div className="text-center mx-auto mb-12">
                    <Button className='mt-10 font-chillax'>Create a post</Button>
                    <Button className='mt-10 ml-5'>Read posts</Button>
                </div>
                <h2 className="font-bold text-3xl my-2">Recent articles</h2>

                <div className="flex justify-center container mx-auto p-0">
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
