/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Post from '@/components/Post';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { UserContext } from '@/components/UserContext';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

function MyAccount({ userId }) {

    const [myPosts, setMyPosts] = useState([]);

    const { setUserInfo, userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch(`http://localhost:8080/profile`, {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/post`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the data here
                setMyPosts(data);
            })
            .catch(error => console.error('Errorrrr:', error))
    }, [])


    return (
        <MaxWidthWrapper>
            {/* <h1>{userInfo.username}</h1> */}
            <p>Email: {userInfo.email}</p>
            {/* Display other user information here */}
            <Button type="submit">Change Password</Button>
            <section className='my-8'>
                <h2 className='text-3xl font-bold font-title'>Your posts</h2>
                <div className='flex flex-col gap-4'>
                    {/* Display posts here */}
                    {myPosts.map(post => (
                        <Post key={post.id} author={userInfo.username} />
                    ))}
                </div>
            </section>
        </MaxWidthWrapper>
    );
}

export default MyAccount;