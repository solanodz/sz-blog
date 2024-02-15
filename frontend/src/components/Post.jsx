/* eslint-disable react/prop-types */

import { Separator } from '@radix-ui/react-dropdown-menu';
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
                <div className="p-2 my-auto items-center h-30 sm:h-40">
                    <Link to={`/post/${_id}`} className="text-xl md:text-lg tracking-tight font-bold">
                        {typeof title === 'string' ? (title.length > 120 ? title.substr(0, 120) + '...' : title) : null}
                    </Link>
                    {/* <p className="text-sm my-2 text-muted-foreground">{summary.length > 200 ? (summary.substr(0, 200)) + '...' : summary}</p> */}
                </div>
                <Separator className="my-2 border" />

                <div className="text-gray-700 text-xs">
                    <p>Created by <span className='font-semibold'>{author ? author.username : "Uknown author"}</span></p>
                    <time>{format(new Date(createdAt || Date.now()), 'MMM d, yyyy. HH:mm aaaa')}</time>
                </div>
            </div>

        </div>
    )
}

export default Post
