import OpenAI from "openai";
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const userId = auth();
        const body = await request.json();
        const { messages } = body;
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

        if (!openai.apiKey) {
            return NextResponse.json(
                {
                    success: false,
                    message: "OpenAI Key not configured"
                },
                {
                    status: 401
                }
            )
        }

        if (!messages) {
            return NextResponse.json({ error: "Messages are required" }, { status: 400 });
        }

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: body.prompt }],
        });

        const aiResponse = chatCompletion.choices[0].message.content;

        return NextResponse.json({
            success: true,
            response: aiResponse
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
