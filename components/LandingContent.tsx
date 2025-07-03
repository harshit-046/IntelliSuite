import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const testimonials = [
    {
        name: "Amit Sharma",
        avatar: "",
        title: "AI Research Engineer",
        description: "The code generation tool has been a game-changer for my daily development tasks."
    },
    {
        name: "Priya Desai",
        avatar: "",
        title: "NLP Engineer",
        description: "The chat model feels so natural—it’s like talking to a real teammate who knows everything!"
    },
    {
        name: "Rohit Verma",
        avatar: "",
        title: "Video Editor",
        description: "I created a stunning video concept using AI in under 10 minutes. Absolutely blown away!"
    },
    {
        name: "Sneha Iyer",
        avatar: "",
        title: "Music Composer",
        description: "The AI-generated music helped me explore new genres I’d never composed before. Incredible!"
    },
    {
        name: "Karthik Reddy",
        avatar: "",
        title: "Generative Artist",
        description: "The image generation results are crisp and creative. It’s like having a virtual art assistant."
    },
    {
        name: "Neha Kapoor",
        avatar: "",
        title: "Full Stack Developer",
        description: "With chat + code generation combined, I built and deployed features 3x faster. Highly recommended!"
    }
];


const LandingContent = () => {
    return (
        <div className='px-10 pb-20'>
            <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
                Testimonials
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {testimonials.map((item) => {
                    return (
                        <Card key={item.description} className='bg-[#192339] border-none text-white'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-x-2'>
                                    <div>
                                        <p className='text-lg'>
                                            {item.name}
                                        </p>
                                        <p className='text-zinc-400 text-sm'>
                                            {item.title}
                                        </p>
                                    </div>
                                </CardTitle>
                                <CardContent>
                                    {item.description}
                                </CardContent>
                            </CardHeader>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default LandingContent