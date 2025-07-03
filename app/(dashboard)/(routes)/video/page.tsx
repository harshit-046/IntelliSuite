"use client"
import Heading from '@/components/Heading'
import { Video } from 'lucide-react'
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
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'

const Page = () => {
  const [video, setVideo] = useState<string>();
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
      setVideo(undefined);
      const response = await axios.post('/api/video', values)
      setVideo(response.data.audio);
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
        title='Video'
        description='Cutting-edge technology for generating high-quality video.'
        icon={Video}
        iconColor='text-orange-500'
        bgColor='bg-orange-500/10'
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
                        placeholder="Sunset over calm ocean waves" {...field} />

                    </FormControl>

                  </FormItem>
                )}
              />
              <Button className='col-span-12 lg:col-span-2 w-full bg-orange-700 hover:bg-orange-400' variant={'default'} disabled={isLoading}>Generate</Button>
            </form>
          </Form>
        </div>
        <div className='space-y-4 mt-4'>
          {!video && !isLoading && <Empty label='No video generated yet' />}
          {isLoading && <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted gap-2'><Loader /></div>}

          {video && (
            <div className="mt-8 flex justify-center">
              <video
                controls
                className="w-full max-w-3xl rounded-2xl shadow-lg border border-gray-300"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
