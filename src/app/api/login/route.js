import { NextResponse } from "next/server";
export async function POST(request) {
    let body = await request.json();
    console.log(body);

    return NextResponse.json({ "data": body, "status": 'ok' });
}