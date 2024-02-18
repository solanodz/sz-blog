/* eslint-disable no-unused-vars */
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Post from '@/components/Post';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react'
import { DatePickerDemo } from '@/components/DatePickerDemo';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch = (event) => {
        const newSearch = event.target.value;
        console.log(`Updating search state to: ${newSearch}`);
        setSearch(newSearch);
    };

    useEffect(() => {
        console.log(`Sending request to: http://localhost:8080/post?search=${search}`);
        fetch(`http://localhost:8080/post?search=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, [search]);

    return (
        <MaxWidthWrapper>
            <h2 className='font-title font-bold mb-3 mt-12 tracking-tight text-3xl'>All Posts</h2>
            {/* <section className='grid grid-flow-col gap'>
                <div className='my-5 max-w-2xl grid grid-flow-col gap-2'>
                    <Input placeholder='Search posts...' value={search} onChange={handleSearch} />
                    <Button className='w-fit'>Search</Button>
                </div>
                <div>
                    <p className='text-muted-foreground text-sm'>Search posts by date</p>
                    <DatePickerDemo />
                </div>
            </section> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.length > 0 && posts.map(post => (
                    <Post {...post} key={post._id} />
                ))}
            </div>
        </MaxWidthWrapper>
    )
}

export default AllPosts
