import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for todos (in a real app, you'd use a database)
const todos: { id: number; title: string; completed: boolean }[] = [];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  if (!data.title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const newTodo = {
    id: Date.now(),
    title: data.title,
    completed: false,
  };

  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  
  if (!data.id || typeof data.completed !== 'boolean') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const todoIndex = todos.findIndex(todo => todo.id === data.id);
  if (todoIndex === -1) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }

  todos[todoIndex].completed = data.completed;
  return NextResponse.json(todos[todoIndex]);
}
