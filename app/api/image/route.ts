import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        const body = await request.json();
        const { prompt, amount = 1, resolution= '512x512'} = body;
        console.log(body);
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

        // TO DO :


        return NextResponse.json({
            success: true
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
