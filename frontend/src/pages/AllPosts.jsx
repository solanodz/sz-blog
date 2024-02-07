import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Post from '@/components/Post';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react'
import { DatePickerDemo } from '@/components/DatePickerDemo';

const AllPosts = () => {
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
        <MaxWidthWrapper>
            <h1>All posts</h1>
            <section className='grid grid-flow-col gap'>
                <div className='my-5 max-w-2xl grid grid-flow-col gap-2'>
                    {/* Give funcitionality to the search input */}
                    <Input placeholder='Search posts...' />
                    <Button className='w-fit'>Search</Button>
                </div>
                <div>
                    <p className='text-muted-foreground text-sm'>Search posts by date</p>
                    {/* Give functionality to search by date */}
                    <DatePickerDemo />
                </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.length > 0 && posts.map(post => (
                    <Post {...post} key={post._id} />
                ))}
            </div>
        </MaxWidthWrapper>
    )
}

export default AllPosts
