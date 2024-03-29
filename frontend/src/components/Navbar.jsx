/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate } from "react-router-dom"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Button, buttonVariants } from "./ui/button"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import ChatSheet from "./ChatSheet"
import { toast } from "sonner"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = () => {

    // const [isChatOpen, setIsChatOpen] = useState(false);
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

    function logout() {
        fetch('http://localhost:8080/sessions/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setRedirect(true);
        setUserInfo(null);
        toast.success('Logged out successfully');

    }

    const username = userInfo?.email;

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    // --> NO ELIMINAR ESTE CÓDIGO <--
    /* const openChat = () => {
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
    }; */

    return (
        <MaxWidthWrapper className='hidden md:block'>
            <nav className="flex items-center justify-between py-3 border-b border-gray-200">
                <Link to={'/'}>
                    {/* <img src={szLogo} alt="" className="h-12" /> */}
                    <span className="font-title font-black italic text-3xl tracking-tighter drop-shadow-lg">GGG</span>
                </Link>


                <div className="grid grid-flow-col gap-5 ">
                    {username && (
                        <>
                            {/* <ChatSheet onOpen={openChat} onClose={closeChat} /> */}
                            <Link className={buttonVariants({ variant: 'default' })} to="/create">Create new post</Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={buttonVariants({ variant: 'outline' })}>Account</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel><span className="text-muted-foreground">Logged in as</span> {username}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link to={'/my-account'}>
                                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">My Account</DropdownMenuItem>
                                    </Link>
                                    <a onClick={logout}>
                                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">Logout</DropdownMenuItem>
                                    </a>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}
                    {!username && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </MaxWidthWrapper>
    )
}

export default Navbar
