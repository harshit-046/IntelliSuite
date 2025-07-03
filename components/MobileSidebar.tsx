"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import  SideBar  from '@/components/SideBar'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={'ghost'} size={'icon'} className='md:hidden'>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0'>
                <SideBar/>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar                  