"use client"
import Heading from '@/components/Heading'
import { MessagesSquare } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchema } from './constant'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/UserAvatar'
import ModelAvatar from '@/components/ModelAvatar'

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

const page = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const updatedMessages = [...messages, {
                role: 'user',
                content: values.prompt
            }] as ChatMessage[];
            setMessages(updatedMessages);

            const response = await axios.post('/api/conversation', {
                messages: updatedMessages
            })
            if (response.data.message) {
                const newMessages = [...updatedMessages, {
                    role: 'model',
                    content: response.data.message
                }] as ChatMessage[];
                setMessages(newMessages);
            }
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
                title='Conversation'
                description='Our most advanced conversation model.'
                icon={MessagesSquare}
                iconColor='text-purple-500'
                bgColor='bg-purple-500/10'
            />

            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField
                                control={form.control}
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>

                                        <FormControl className='m-0 p-0'>
                                            <Input className='p-2 border-0 outline-none focus-visible::ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder="Can you recommend a good book based on my interests?" {...field} />

                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full bg-violet-700 hover:bg-violet-400' variant={'default'} disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {messages.length===0 && !isLoading && <Empty label='Conversation not started yet'/>}
                    {isLoading && <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted gap-2'><Loader/></div>}

                    <div className='flex flex-col-reverse gap-y-4'>
                        {messages.map((messages, index) => {
                            return (
                                <div key={index} className={cn('p-8 w-full flex items-start rounded-lg gap-x-8', messages.role==='user' ? ("bg-white border border-black/10"):("bg-muted"))}>
                                    {messages.role==='user' && <UserAvatar/>}
                                    {messages.role==='model' && <ModelAvatar/>}
                                    <p className='text-sm'>
                                        {messages.content}
                                    </p>
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
