
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IoChatbubbles } from "react-icons/io5";


const ChatSheet = () => {
    return (
        <div>
            <Sheet side='left'>
                <SheetTrigger className="flex flex-row items-center m-2"><IoChatbubbles className="mr-2 text-xl" /> Open Chat</SheetTrigger>
                <SheetContent side='left' className='sm:max-w-5xl max-w-2xl'>
                    <SheetHeader>
                        <SheetTitle>Your chats</SheetTitle>
                        <SheetDescription>
                            display chats here 🤪
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ChatSheet
