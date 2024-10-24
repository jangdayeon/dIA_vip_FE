import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'categories.json');

    const jsonData = fs.readFileSync(filePath, 'utf8');
    const categories = JSON.parse(jsonData);

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json(
      { error: 'Failed to read categories' },
      { status: 500 }
    );
  }
}
