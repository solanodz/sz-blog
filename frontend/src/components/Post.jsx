/* eslint-disable react/prop-types */

import { format } from 'date-fns'
import { useEffect } from 'react';
import { Link } from "react-router-dom"


const Post = ({ _id, author, title, summary, cover, content, createdAt }) => {



    return (
        <div className="rounded-xl shadow-lg border border-gray-200 ">
            <div className="p-3 flex flex-col">
                <Link to={`/post/${_id}`} className="rounded-xl overflow:hidden">
                    <img
                        src={`http://localhost:8080/${cover}`}
                        alt=""
                        className=" rounded-lg object-cover w-full h-48"
                    />
                </Link>
                <div className="p-2 h-32">
                    <Link to={`/post/${_id}`} className="text-xl md:text-2xl font-bold">{title}</Link>
                    <p className="text-sm">{summary}</p>
                </div>
                <div className="text-muted-foreground text-xs">
                    <p>Created by <span className='font-medium'>{author ? author.username : "Uknown author"}</span></p>
                    <time>{format(new Date(createdAt), 'MMM d, yyyy. HH:mm aaaa')}</time>
                </div>
            </div>

        </div>
    )
}

export default Post
