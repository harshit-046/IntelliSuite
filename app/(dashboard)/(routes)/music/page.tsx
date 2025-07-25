"use client"
import Heading from '@/components/Heading'
import { Music } from 'lucide-react'
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
  const [music, setMusic] = useState<string>();
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
      setMusic(undefined);
      const response = await axios.post('/api/music', values)
      setMusic(response.data.audio);
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
        title='Music'
        description='Cutting-edge technology for generating high-quality, original music.'
        icon={Music}
        iconColor='text-green-500'
        bgColor='bg-green-500/10'
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
                        placeholder="Chill piano with soft beats" {...field} />

                    </FormControl>

                  </FormItem>
                )}
              />
              <Button className='col-span-12 lg:col-span-2 w-full bg-green-700 hover:bg-green-400' variant={'default'} disabled={isLoading}>Generate</Button>
            </form>
          </Form>
        </div>
        <div className='space-y-4 mt-4'>
          {!music && !isLoading && <Empty label='No music generated yet' />}
          {isLoading && <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted gap-2'><Loader /></div>}

          {music && (
            <audio controls className='w-full mt-8'>
              <source src={music}/>
            </audio>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
