"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  CallParticipantsList,
} from "@stream-io/video-react-sdk";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Room } from "@/db/schema";
import { generateTokenAction } from "./action";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export function DevfinderVideo({ room }: { room: Room }) {
  const { data: session } = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!session || !room || typeof room.id !== "string") return;

    let active = true;
    let localCall: Call | null = null;
    let localClient: StreamVideoClient | null = null;

    const setup = async () => {
      const userId = session.user.id;

      const client = new StreamVideoClient({
        apiKey,
        user: {
          id: userId,
          name: session.user.name ?? undefined,
          image: session.user.image ?? undefined,
        },
        tokenProvider: () => generateTokenAction(),
      });

      const call = client.call("default", String(room.id));
      await call.join({ create: true });

      if (!active) return;

      setClient(client);
      setCall(call);
      setLoading(false);

      localCall = call;
      localClient = client;
    };

    setup();

    return () => {
      active = false;
      if (localCall && localClient) {
        const clientToDisconnect = localClient;
        localCall
          .leave()
          .then(() => clientToDisconnect.disconnectUser())
          .catch(console.error);
      }

    };
  }, [session, room]);

  const handleLeave = async () => {
    setLeaving(true);

    if (call) await call.leave().catch(console.error);
    if (client) await client.disconnectUser().catch(console.error);

   
    if (typeof navigator !== "undefined") {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(() => {});
    }

    router.push("/browse");
  };

  if (loading || leaving || !client || !call) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh] bg-surface-dim">
        <Loader />
      </div>
    );
  }


  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls onLeave={handleLeave} />
          <CallParticipantsList onClose={() => undefined} />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}
