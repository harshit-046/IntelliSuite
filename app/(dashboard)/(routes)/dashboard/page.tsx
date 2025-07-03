"use client"
import { ArrowRight, Code, Image, MessageSquare, Music, Video } from "lucide-react"
import {Card} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        href: "/conversation"
    },
    {
        label: "Music Generation",
        icon: Music,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        href: "/music"
    },
    {
        label: "Image Generation",
        icon: Image,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        href: "/image"
    },
    {
        label: "Video Generation",
        icon: Video,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        href: "/video"
    },
    {
        label: "Code Generation",
        icon: Code,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        href: "/code"
    }
]
const DashBoard = () => {
    const router = useRouter();
    return (
        <>
            <div className='mb-8 space-y-4'>
                <h2 className='text-2xl md:text-4xl font-bold text-center'>Empower Your Ideas with AI</h2>
                <p className='text-sm md:text-lg text-center text-muted-foreground font-light'>Your Smart AI Companion - Discover True Intelligence</p>
            </div>

            <div className='px-4 md:px-20 lg:px-32 space-y-4'>
                {tools.map((tool) => {
                    return (
                        <Card onClick={() => {
                            router.push(`${tool.href}`)
                        }} key={tool.label} className="hover:shadow-md transition cursor-pointer p-4">
                            <div className="flex items-center justify-between p-4 border-black/5">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("w-fit p-2 rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("h-8 w-8", tool.color)} />
                                    </div>
                                    <div className="font-semibold">{tool.label}</div>
                                </div>
                                <ArrowRight />
                            </div>
                        </Card>
                    )
                })}
            </div>

        </>
    )
}

export default DashBoard