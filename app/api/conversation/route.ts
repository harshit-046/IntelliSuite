import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import { ChatMessage } from "@/app/(dashboard)/(routes)/conversation/page";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        const body = await request.json();
        const { messages } = body;
        console.log(messages);
        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized"
                },
                {
                    status: 401
                }
            )
        }

        if (!genAI.apiKey) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gemini Key not configured"
                },
                {
                    status: 500
                }
            )
        }

        if (!messages) {
            return NextResponse.json({ error: "Messages are required" }, { status: 400 });
        }
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const formattedHistory = (messages as ChatMessage[])
            .filter(msg => msg.role === "user" || msg.role === "model")
            .map(msg => ({
                role: msg.role as "user" | "model",
                parts: [{ text: msg.content }],
            }));

        const chat = model.startChat({
            history: formattedHistory,
        });

        const latestMessage = messages[messages.length - 1]?.content;
        const result = await chat.sendMessage(latestMessage);
        const response = await result.response;
        const text = response.text();


        return NextResponse.json({
            success: true,
            message: text
        });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate response"
            },
            {
                status: 500
            }
        );
    }


}
