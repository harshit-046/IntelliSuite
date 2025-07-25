import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ModelAvatar = () => {
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage className='p-1' src="/logo.png" />
            <AvatarFallback>AI</AvatarFallback>
        </Avatar>
    )
}

export default ModelAvatar