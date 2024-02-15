import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Quill from '@/components/Quill'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreatePost = () => {

    const [title, setTitle] = useState('')
    // const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    const createNewPost = async (e) => {
        const data = new FormData();
        data.set('title', title);
        // data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        e.preventDefault();

        const response = await fetch('http://localhost:8080/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })

        if (response.ok) {
            toast.success('Post created successfully');
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to='/' />
    }


    return (
        <MaxWidthWrapper>
            <h2 className=' font-bold mb-3 mt-12 tracking-tight text-3xl'>Create Post</h2>
            <form onSubmit={createNewPost} className='grid grid-flow-row gap-4'>
                <Input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                {/* <Input
                    type='text'
                    placeholder='Summary'
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                /> */}
                <Input
                    type='file'
                    placeholder='Image'
                    onChange={e => setFiles(e.target.files)}
                />
                <Quill value={content} onChange={setContent} />
                <Button className="my-12" type="submit">Create Post</Button>
            </form>
        </MaxWidthWrapper>
    )
}

export default CreatePost
