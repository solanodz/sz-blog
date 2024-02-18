import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Input } from "@/components/ui/Input"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ReactQuill from "react-quill"
import { Navigate, useParams } from "react-router-dom"



const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    // const [summary,setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`${URL}post/` + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    // setSummary(postInfo.summary);
                });
            });
    }, []);

    async function editPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        //   data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch(`${URL}post`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }


    return (
        <MaxWidthWrapper>
            <h1 className=' font-bold mb-3 mt-12 tracking-tight text-3xl'>Edit Post</h1>
            <form onSubmit={editPost} className='grid grid-flow-row gap-4'>
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
                <ReactQuill onChange={setContent} value={content} />
                <Button className="my-12" type="submit">Confirm changes</Button>
            </form>
        </MaxWidthWrapper>

    )
}

export default EditPost
