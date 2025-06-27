import React from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { SignOutButton, UserButton } from "@clerk/nextjs"
import MobileSidebar from '@/components/MobileSidebar'


const NavBar = () => {
    return (
        <div className='flex items-center p-4'>
            <MobileSidebar></MobileSidebar>
            <div className='flex w-full justify-end'>
                <UserButton/>
            </div>
        </div>
    )
}

export default NavBar