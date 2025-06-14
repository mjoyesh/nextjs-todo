import { NextRequest, NextResponse } from 'next/server';

// Mock user data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'user' },
];

export async function GET(request: NextRequest) {
  // Get the user ID from the URL if provided
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  }

  // Return all users if no ID provided
  return NextResponse.json(users);
}
