import { NextRequest, NextResponse } from "next/server";
import { StreamClient } from '@stream-io/node-sdk';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: roomId } = await params;
  const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY;
  const apiSecret = process.env.GET_STREAM_SECRET_KEY;

  if (!apiKey || !apiSecret) {
    return NextResponse.json({ participantCount: 0 }, { status: 500 });
  }

  try {
    const client = new StreamClient(apiKey, apiSecret);
    const response = await client.video.queryCalls({
      filter_conditions: { id: roomId },
    });

    const call = response.calls[0];
    const count = call?.call.session?.participants?.length || 0; // The active participants in session
    
    return NextResponse.json(
      { participantCount: count },
      { 
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
        }
      }
    );
  } catch(e) {
    console.error("Stream Node SDK Error:", e);
    return NextResponse.json(
      { participantCount: 0 },
      { 
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
        }
      }
    );
  }
}
