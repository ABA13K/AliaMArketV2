import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Replace with your actual authentication logic
    if (email === "test@example.com" && password === "password") {
        return NextResponse.json({
            id: "1",
            email: "test@example.com",
            name: "Test User",
            token: "your_jwt_token_here"
        });
    }

    return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
    );
}