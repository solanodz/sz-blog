import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
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
import { toast } from 'sonner';


const PostPage = () => {

    const [postInfo, setPostInfo] = useState(null)
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);
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
            toast.success('Post deleted successfully');
            setRedirect(true);
        }
    }

    if (!postInfo) return '';
    if (redirect) return <Navigate to='/' />

    return (
        <MaxWidthWrapper className='flex sm:flex-row flex-col'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center my-8'>
                    <div className='my-6'>
                        <h2 className=' text-3xl sm:text-4xl max-w-3xl mx-auto font-bold font-title tracking-tight'>{postInfo.title}</h2>
                        <time className='text-xs text-muted-foreground'>{format(new Date(postInfo.createdAt), 'MMM d, yyyy. HH:mm aaaa')}</time>
                        <p className='text-sm sm:text-md text-gray-700'>Created by <span className='font-semibold'>{postInfo.author ? postInfo.author.username : "Uknown author"}</span></p>
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
                                    <Link to={`/edit-post/${postInfo._id}`} size='sm' className={buttonVariants({ variant: 'outline' })}><FaPencilAlt className='mr-2' />Edit</Link>
                                </>
                            )}
                        </div>

                    </div>

                    <img
                        src={`http://localhost:8080/${postInfo.cover}`}
                        alt=""
                        className='rounded-lg object-cover w-full h-56 shadow-lg mb-8'
                    />
                    {/* TODO --> give functionality to each button */}
                    <div className='grid sm:mx-0 mx-auto gap-4 my-auto grid-flow-col w-fit text-3xl text-gray-700'>
                        <div className='flex m-1'>
                            <Button variant='none' className='text-2xl p-0'>
                                <GoHeart className='m-1' />
                            </Button>
                            <span className='text-xs text-muted-foreground font-bold leading-none h-fit rounded-full'>37</span>
                            {/* <GoHeartFill /> */}
                        </div>
                        <div className='flex m-1'>
                            <Button variant='none' className='text-2xl p-0'>
                                <GoComment className='m-1' />
                            </Button>
                            <span className='text-xs text-muted-foreground font-bold leading-none h-fit rounded-full'>37</span>
                        </div>
                        <div className='flex m-1'>
                            <Button variant='none' className='text-2xl p-0'>
                                <GoShare className='m-1' />
                            </Button>
                            <span className='text-xs text-muted-foreground font-bold leading-none h-fit rounded-full'>3</span>
                        </div>
                    </div>
                </div>
                <div className='my-8' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </div>
        </MaxWidthWrapper >
    )
}

export default PostPage
