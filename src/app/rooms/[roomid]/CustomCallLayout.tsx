"use client";

import { 
  useCallStateHooks, 
  ParticipantView,
  StreamVideoParticipant,
} from "@stream-io/video-react-sdk";
import { 
  Mic, MicOff, Video, VideoOff, ScreenShare, 
  Smile, PhoneOff, Github, User, Info, 
  MoreVertical, Command, Maximize2, Settings
} from "lucide-react";
import { useState } from "react";
import { Room } from "@/db/schema";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CustomCallLayout({ room, onLeave }: { room: Room, onLeave: () => void }) {
  const { 
    useParticipants, 
    useCameraState, 
    useMicrophoneState, 
    useScreenShareState 
  } = useCallStateHooks();

  const participants = useParticipants();
  const { camera, isMute: isCameraMuted } = useCameraState();
  const { microphone, isMute: isMicMuted } = useMicrophoneState();
  const { screenShare, isEnabled: isScreenSharing } = useScreenShareState();

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
       document.documentElement.requestFullscreen().catch(err => {
         console.error(`Error attempting to enable full-screen mode: ${err.message}`);
       });
    } else {
       document.exitFullscreen();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#070707] text-on-surface overflow-hidden font-sans">
      {/* Premium Window Header */}
      <div className="h-14 bg-[#111111] flex items-center justify-between px-8 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 mr-6">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(78,222,163,0.5)]" />
             <span className="text-[10px] font-mono text-outline uppercase tracking-[0.3em] font-medium opacity-70">
               DevFinder::Live_Node::{String((room as any).name)}
             </span>
          </div>
        </div>
        <div className="flex gap-8 items-center">
            <Settings 
               className="w-4 h-4 text-outline/30 hover:text-primary transition-all cursor-pointer hover:rotate-90 duration-500" 
               onClick={() => console.log("Settings panel not yet initialized.")}
            />
            <Maximize2 
               className="w-4 h-4 text-outline/30 hover:text-primary transition-all cursor-pointer active:scale-90" 
               onClick={handleFullScreen}
            />
        </div>
      </div>


      <div className="flex-1 flex overflow-hidden p-8 gap-8">
        {/* Main Grid Area */}
        <div className="flex-1 flex flex-col gap-8 min-w-0">
          <div className={cn(
            "flex-1 grid gap-6 auto-rows-fr",
            participants.length <= 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
          )}>
            {participants.map((participant) => (
              <div key={participant.sessionId} className="relative bg-[#121212] border border-white/5 group overflow-hidden shadow-2xl rounded-sm">
                <ParticipantView 
                   participant={participant} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Indicators */}
                <div className="absolute top-6 left-6 flex gap-3">
                  <div className="p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                     {(participant as any).audioMuted ? (
                       <MicOff className="w-4 h-4 text-[#ff4b4b]/80" />
                     ) : (
                       <Mic className="w-4 h-4 text-primary" />
                     )}
                  </div>
                </div>

                <div className="absolute top-6 right-6 flex gap-3">
                   {participant.isSpeaking && (
                     <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 backdrop-blur-xl rounded-full shadow-2xl animate-in fade-in zoom-in duration-300">
                        <span className="text-[9px] font-label font-bold text-primary uppercase tracking-widest">Speaking</span>
                     </div>
                   )}
                   {(participant as any).isScreenSharing && (
                     <div className="px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full shadow-2xl">
                        <span className="text-[10px] font-label font-bold text-on-surface uppercase tracking-widest">Coding</span>
                     </div>
                   )}
                </div>

                <div className="absolute bottom-6 left-6 flex items-center gap-4 px-4 py-2 bg-black/40 shadow-2xl border border-white/5 backdrop-blur-xl rounded-sm">
                   <div className="w-6 h-6 bg-primary/10 flex items-center justify-center border border-primary/20">
                     <User className="w-3.5 h-3.5 text-primary" />
                   </div>
                   <span className="text-[11px] font-label font-black text-on-surface uppercase tracking-[0.2em]">{String(participant.name)}</span>
                </div>
              </div>
            ))}
          </div>


          {/* Bottom Control Bar */}
          <div className="h-28 flex items-center justify-center relative">
             <div className="flex items-center gap-4 bg-[#111111]/80 backdrop-blur-2xl px-10 py-5 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-full">
                <ControlButton 
                  icon={isMicMuted ? MicOff : Mic} 
                  label="Audio" 
                  active={!isMicMuted} 
                  onClick={async () => await microphone.toggle()}
                  isError={isMicMuted}
                />
                <ControlButton 
                  icon={isCameraMuted ? VideoOff : Video} 
                  label="Video" 
                  active={!isCameraMuted} 
                  onClick={async () => await camera.toggle()}
                  isError={isCameraMuted}
                />
                <div className="w-px h-8 bg-white/5 mx-2" />
                <ControlButton 
                  icon={ScreenShare} 
                  label="Share" 
                  active={isScreenSharing} 
                  onClick={async () => await screenShare.toggle()}
                />
                <ControlButton 
                  icon={Smile} 
                  label="React" 
                  onClick={() => {}}
                />
                <div className="w-px h-8 bg-white/5 mx-2" />
                <button 
                   onClick={onLeave}
                   className="flex items-center justify-center w-16 h-16 bg-[#ff4b4b]/10 border border-[#ff4b4b]/30 rounded-full hover:bg-[#ff4b4b] hover:text-white transition-all group active:scale-95 shadow-lg shadow-[#ff4b4b]/5 hover:shadow-[#ff4b4b]/20"
                   title="Decommission Node Connection"
                >
                  <PhoneOff className="w-6 h-6 text-[#ff4b4b] group-hover:text-white transition-colors rotate-135" />
                </button>
             </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 flex flex-col gap-8 shrink-0">
          {/* Room Summary */}
          <div className="bg-[#111111] border border-white/5 p-8 flex flex-col gap-6 shadow-2xl rounded-sm">
             <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                <Info className="w-4 h-4 text-primary" />
                <h4 className="font-headline text-[11px] font-black uppercase tracking-[0.3em] text-primary/80">Telemetry</h4>
             </div>
             <div className="space-y-6">
                <p className="text-on-surface-variant text-[12px] leading-relaxed font-body tracking-tight opacity-70">
                  {String((room as any).description ?? "No session telemetry available.")}
                </p>
                {!!(room as any).githubRepo && (
                  <Link 
                    href={String((room as any).githubRepo)}
                    target="_blank"
                    className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 hover:bg-primary/5 hover:border-primary/20 transition-all group"
                  >
                    <Github className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    <span className="text-[10px] font-mono text-outline/60 group-hover:text-on-surface truncate tracking-wider">
                      {String((room as any).githubRepo).replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                    </span>
                  </Link>
                )}
             </div>
          </div>

          {/* Nodes List */}
          <div className="flex-1 bg-[#111111] border border-white/5 p-8 flex flex-col gap-6 shadow-2xl rounded-sm overflow-hidden">
             <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                <User className="w-4 h-4 text-primary" />
                <h4 className="font-headline text-[11px] font-black uppercase tracking-[0.3em] text-primary/80">Active Nodes ({participants.length})</h4>
             </div>
             <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-3">
                {participants.map((p) => (
                  <div key={p.sessionId} className="flex items-center justify-between p-3 hover:bg-white/[0.02] transition-all cursor-default border border-transparent hover:border-white/5 rounded-sm group/node">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#1a1a1a] border border-white/5 flex items-center justify-center relative shadow-xl">
                          <User className="w-5 h-5 text-outline/20 group-hover/node:text-primary/40 transition-colors" />
                          <div className={cn(
                            "absolute bottom-0 right-0 w-3 h-3 border-4 border-[#111111] rounded-full",
                            p.isSpeaking ? "bg-primary animate-pulse" : "bg-white/10"
                          )} />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[11px] font-label font-black text-on-surface uppercase tracking-tight">{String(p.name)}</span>
                          <span className="text-[9px] font-mono text-outline/40 uppercase tracking-widest mt-0.5">Contributor</span>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function ControlButton({ 
  icon: Icon, 
  label, 
  active = false, 
  isError = false, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  isError?: boolean,
  onClick?: () => Promise<void> | void 
}) {
  return (
    <button 
      onClick={() => onClick?.()}
      className={cn(
        "flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all active:scale-90 group relative",
        active 
          ? "bg-primary text-on-primary shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:shadow-[0_0_30px_rgba(78,222,163,0.5)] border-none" 
          : "bg-white/5 text-outline/60 border border-white/5 hover:bg-white/10 hover:text-white"
      )}
    >
      <Icon className={cn("w-6 h-6 transition-transform group-hover:scale-110", isError && !active && "text-[#ff4b4b]")} />
      <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
         <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">{label}</span>
      </div>
    </button>
  );
}

