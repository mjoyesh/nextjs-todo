import { NextResponse } from 'next/server';

export async function GET() {
  const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Windy'];
  const temperature = Math.floor(Math.random() * 35) + 10; // Random temp between 10-45°C
  const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

  return NextResponse.json({
    temperature,
    condition,
    humidity: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString(),
  });
}
