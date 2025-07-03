import { NextResponse } from "next/server";
import Replicate from "replicate";
import { auth } from "@clerk/nextjs/server";


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY!
});

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        const { prompt } = await request.json();
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

        if (!process.env.REPLICATE_API_KEY) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Replicate Key not configured"
                },
                {
                    status: 500
                }
            )
        }

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }
        const input = {
            prompt_a : prompt
        }
        const response = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });

        return NextResponse.json({
            success: true,
            response
        });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate music"
            },
            {
                status: 500
            }
        );
    }


}
