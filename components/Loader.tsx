import Image from 'next/image'
import React from 'react'

const Loader = () => {
    return (
        <>
            <div className='h-full flex flex-col items-center justify-center gap-y-4'>
                <div className='relative h-10 w-10 animate-spin'>
                    <Image
                        fill
                        alt='logo'
                        src={'/logo.png'}
                    />
                </div>
                <p className='text-sm text-muted-foreground'>
                    IntelliSuite is thinking...
                </p>
            </div>
        </>
    )
}

export default Loader