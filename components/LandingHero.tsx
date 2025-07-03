'use client'
import { useAuth } from '@clerk/nextjs'
import Typewriter from 'typewriter-effect';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className='text-white font-bold py-36 text-center space-y-5'>
            <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold'>
                <h1>
                    AI-Powered Tool Perfect for
                </h1>
                <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                    <Typewriter
                        options={{
                            strings: [
                                "Chatbot.",
                                "Photo Generation.",
                                "Code Generation.",
                                "Music Generation.",
                                "Video Generation.",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>

            <div className='text-sm md:text-xl font-light text-zinc-400'>
                Boost your content creation speed with AI — 10x faster!
            </div>

            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"} >
                    <Button variant='secondary' className='rounded-full cursor-pointer md:text-lg p-4 md:p-6'>
                        Start Creating for Free
                    </Button>
                </Link>
            </div>

            <div className='text-zinc-400 text-xs md:text-sm font-normal'>
                No credit card required
            </div>

        </div>
    )
}

export default LandingHero