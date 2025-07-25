"use client"
import { useAuth } from '@clerk/nextjs';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
const font = Montserrat({
    weight: "600",
    subsets: ['latin']
})


const LandingNavBar = () => {
    const { isSignedIn } = useAuth();
    return (
        <nav className='p-4 bg-transparent flex items-center justify-between'>
            <Link href={"/dashboard"} className='flex items-center'>
                <div className='relative h-8 w-8 mr-4'>
                    <Image
                        fill
                        alt="logo"
                        src={'/logo.png'}
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    IntelliSuite
                </h1>
            </Link>
            <div className='flex items-center gap-x-2'>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant={'outline'} className='rounded-full cursor-pointer'>
                        Get Started
                    </Button>
                </Link>
            </div>

        </nav>
    )
}

export default LandingNavBar

