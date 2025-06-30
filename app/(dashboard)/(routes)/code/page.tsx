"use client"
import Heading from '@/components/Heading'
import { Code, MessagesSquare } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchema } from './constant'
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/UserAvatar'
import ModelAvatar from '@/components/ModelAvatar'
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; 

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

            const response = await axios.post('/api/code', {
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
                title='Code'
                description='Let AI help you write smarter code, faster.'
                icon={Code}
                iconColor='text-emerald-500'
                bgColor='bg-emerald-500/10'
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
                                                placeholder="Can you write a code for adding two numbers?" {...field} />

                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full bg-emerald-700 hover:bg-emerald-400' variant={'default'} disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {messages.length === 0 && !isLoading && <Empty label='No code generated yet' />}
                    {isLoading && <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted gap-2'><Loader /></div>}

                    <div className='flex flex-col-reverse gap-y-4'>
                        {messages.map((messages, index) => {
                            return (
                                <div key={index} className={cn('p-8 w-full flex items-start rounded-lg gap-x-8', messages.role === 'user' ? ("bg-white border border-black/10") : ("bg-muted"))}>
                                    {messages.role === 'user' && <UserAvatar />}
                                    {messages.role === 'model' && <ModelAvatar />}
                                    <div className="text-sm overflow-hidden leading-7 prose prose-sm dark:prose-invert max-w-full p-4">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeHighlight]}
                                            components={{
                                                pre: ({ node, ...props }) => (
                                                    <div className="overflow-auto w-full my-2 bg-gray-800 p-3 rounded-lg text-white text-sm">
                                                        <pre {...props} />
                                                    </div>
                                                ),
                                                code: ({ node, inline, className, children, ...props } :any) => {
                                                    return inline ? (
                                                        <code className="bg-black/10 text-red-600 px-1 py-0.5 rounded" {...props}>
                                                            {children}
                                                        </code>
                                                    ) : (
                                                        <code className={className} {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                            }}
                                        >
                                            {messages.content || ""}
                                        </ReactMarkdown>
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
