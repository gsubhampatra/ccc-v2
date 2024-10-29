import { NextResponse } from "next/server";
import { sendMessage } from "@/lib/emailService";

export async function POST(request) {
  try {
    const formData = await request.json();
    await sendMessage(formData);
    
    return NextResponse.json({ 
      success: true, 
      message: "Message sent successfully" 
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
} 