'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Montserrat } from "next/font/google"

import { cn } from "@/lib/utils"
import { LayoutDashboard } from "lucide-react"
import { MessageSquare } from 'lucide-react';
import { Image as ImageIcon } from 'lucide-react';
import { Video } from 'lucide-react';
import { Music } from 'lucide-react';
import { Code } from 'lucide-react';
import { Settings } from 'lucide-react';

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"]
})

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-purple-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-red-500",
  },
  {
    label: "Video Generation",
    icon: Video,
    href: "/video",
    color: "text-orange-500",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-green-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-200",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  }
]
const SideBar = () => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">

      <div className="flex py-1 px-3">
        <Link href={'/dashboard'} className="flex items-center pl-3 mb-6">
          <div className="relative w-15 h-15 mr-4">
            <Image
              fill
              alt="Logo"
              src="/logo.png"
            />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            IntelliSuite
          </h1>
        </Link>
      </div>

      <div className="px-2 space-y-1">
        {routes.map((route, index) => {
          const Icon = route.icon;
          return (
            <Link
              key={index}
              href={`/${route.href}`}
              className="block w-full px-3 py-2 rounded-2xl  hover:bg-white/10 active:opacity-60 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${route.color} transition-transform group-hover:scale-110`} />
                <span className="text-base font-medium text-gray-400 group-hover:text-black">
                  {route.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>



    </div >
  )
}

export default SideBar