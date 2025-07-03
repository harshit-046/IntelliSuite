"use client"
import Heading from '@/components/Heading'
import { MessagesSquare } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchema } from './constant'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import { amountOptions } from './constant'
import { resolutionOptions } from './constant'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

const page = () => {
    const [images, setImages] = useState<string[]>([]);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: '256x256'
        }
    });
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await axios.post('/api/image', values)
            const urls = response.data.map((image: { url: string }) => {
                return image.url;
            })
            setImages(urls);
            form.reset();
        } catch (error) {
            console.log(error);
        } finally {
            router.refresh();
        }
    }
    return (
        <div>
            <Heading
                title='Image Generation'
                description='Create images from your imagination'
                icon={MessagesSquare}
                iconColor='text-red-700'
                bgColor='bg-red-500/10'
            />

            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-20 gap-2">
                            <FormField
                                control={form.control}
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-20 lg:col-span-14'>

                                        <FormControl className='m-0 p-0'>
                                            <Input className='p-2 border-0 outline-none focus-visible::ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder="Can you create an image of a sunset over the mountains?" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='amount'
                                render={({ field }) => (
                                    <FormItem className='col-span-20 lg:col-span-2'>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value} >
                                            <FormControl className='m-0 p-1'>
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue placeholder={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option): any => {
                                                    return (
                                                        <SelectItem value={option.value} key={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='resolution'
                                render={({ field }) => (
                                    <FormItem className='col-span-20 lg:col-span-2'>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className='m-0 p-1'>
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue placeholder={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((resolutionOptions): any => {
                                                    return (
                                                        <SelectItem value={resolutionOptions.value} key={resolutionOptions.value}>
                                                            {resolutionOptions.label}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <Button className='col-span-20 lg:col-span-2 w-full bg-red-700 hover:bg-red-400' variant={'default'} disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {images.length === 0 && !isLoading && <Empty label='No image generated yet' />}
                    {isLoading && <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted gap-2'><Loader /></div>}

                    <div className='flex flex-col-reverse gap-y-4'>
                        {images.map((images, index) => {
                            return (
                                <div key={index} className={cn('p-8 w-full flex items-start rounded-lg gap-x-8')}>
                                    <div className='relative w-20 h-20'>
                                        <Image
                                            fill
                                            src={images}
                                            alt="image"
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default page
