import Image from 'next/image'
import React from 'react'

interface EmptyProps{
    label: string
}
const Empty = (props:EmptyProps) => {
  return (
    <div className='h-full p-20 flex flex-col items-center justify-center'>
        <div className='relative w-100 h-100'>
            <Image 
                fill
                alt="Empty"
                src={'/empty.jpg'}
            />
        </div>
        <p className='text-md text-muted-foreground text-center'>
            {props.label}
        </p>
    </div>
  )
}

export default Empty