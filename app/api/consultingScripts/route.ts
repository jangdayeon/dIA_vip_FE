import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'consultingScripts.json');

    const jsonData = fs.readFileSync(filePath, 'utf8');
    const consultingScripts = JSON.parse(jsonData);

    return NextResponse.json(consultingScripts);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json(
      { error: 'Failed to read consultingScripts' },
      { status: 500 }
    );
  }
}
