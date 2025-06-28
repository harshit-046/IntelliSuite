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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
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
                                render={({field})=>(
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
                    Message Content
                </div>
            </div>
        </div>
    )
}

export default page
