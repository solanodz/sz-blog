import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { FaTrashCan, } from 'react-icons/fa6'
import { GoComment, GoHeart, GoShare } from "react-icons/go";
import { FaPencilAlt } from "react-icons/fa";
import { format } from 'date-fns';
import { UserContext } from '@/components/UserContext';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const PostPage = () => {

    const [postInfo, setPostInfo] = useState(null)
    const { userInfo } = useContext(UserContext)
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {

        fetch(`http://localhost:8080/post/${id}`, {
            credentials: 'include',
        })
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo)
                });
            });
    }, [])

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:8080/post/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (!postInfo) return '';
    if (redirect) return <Navigate to='/' />

    return (
        <MaxWidthWrapper>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center my-8'>
                    <div className='my-6'>
                        <h2 className=' text-3xl sm:text-5xl font-bold'>{postInfo.title}</h2>
                        <time className='text-xs text-muted-foreground'>{format(new Date(postInfo.createdAt), 'MMM d, yyyy. HH:mm aaaa')}</time>
                        <p className='text-sm sm:text-md text-muted-foreground'>Created by <span className='font-medium'>{postInfo.author ? postInfo.author.username : "Uknown author"}</span></p>
                        {/* TODO -> fix date of creation */}
                        <div className='my-2 grid w-fit grid-flow-col mx-auto gap-2 '>
                            {userInfo && postInfo && userInfo.id === postInfo.author._id && (
                                <>
                                    {/* TODO -> Finish dialog functionalitty */}
                                    <Dialog>
                                        <DialogTrigger><Button size='sm' variant='destructive'><FaTrashCan className='mr-2' />Delete</Button></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will permanently delete your post
                                                    and remove all the information from our servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button onClick={handleDelete}>Delete</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Button size='sm' variant='outline'><FaPencilAlt className='mr-2' />Edit</Button>
                                </>
                            )}
                        </div>

                    </div>

                    <img
                        src={`http://localhost:8080/${postInfo.cover}`}
                        alt=""
                        className='rounded-lg object-cover w-full h-56 shadow-lg mb-8'
                    />
                    <div className='grid sm:mx-0 mx-auto gap-4 my-auto grid-flow-col w-fit text-3xl text-gray-700'>
                        <div className='flex m-1'>
                            <GoHeart className='m-1' />
                            <span className='text-xs font-medium text-muted-foreground p-1 bg-gray-200 leading-none h-fit rounded-full'>37</span>
                            {/* <GoHeartFill /> */}
                        </div>
                        <div className='flex m-1'>
                            <GoComment className='m-1' />
                            <span className='text-xs font-medium text-muted-foreground p-1 bg-gray-200 leading-none h-fit rounded-full'>37</span>
                            {/* <GoHeartFill /> */}
                        </div>
                        <div className='flex m-1'>
                            <GoShare className='m-1' />
                            <span className='text-xs font-medium text-muted-foreground p-1 bg-gray-200 leading-none h-fit rounded-full'>37</span>
                            {/* <GoHeartFill /> */}
                        </div>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </div>
        </MaxWidthWrapper >
    )
}

export default PostPage
