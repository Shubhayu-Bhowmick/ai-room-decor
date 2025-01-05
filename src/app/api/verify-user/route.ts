import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, imageUrl } = body;

    if (!id || !email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if the user already exists in the database
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      // User exists, return the existing user data
      return NextResponse.json(existingUser[0]);
    }

    // If user does not exist, create a new user
    const newUser = await db
      .insert(users)
      .values({
        id,
        name,
        email,
        imageUrl,
        credits: 0, // Default credits
      })
      .returning();

    return NextResponse.json(newUser[0]);
  } catch (error) {
    console.error('Error in verify-user API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
