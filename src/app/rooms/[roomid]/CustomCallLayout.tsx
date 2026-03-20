"use client";

import { 
  useCallStateHooks, 
  ParticipantView,
  StreamVideoParticipant,
  useCall,
  hasAudio
} from "@stream-io/video-react-sdk";
import { 
  Mic, MicOff, Video, VideoOff, ScreenShare, 
  Smile, PhoneOff, Github, User, Info, 
  MoreVertical, Command, Maximize2, Settings
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Room } from "@/db/schema";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Sidebar } from "@/components/Sidebar";

import { useSession } from "next-auth/react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function CustomCallLayout({ room, onLeave }: { room: Room, onLeave: () => Promise<void> }) {
  const { data: session } = useSession();
  const { 
    useParticipants, 
    useCameraState, 
    useMicrophoneState, 
    useScreenShareState,
  } = useCallStateHooks();

  const call = useCall();
  const rawParticipants = useParticipants();
  
  // Resolve issue with duplicate participants on reloads/dev modes
  const participants = rawParticipants.reduce((acc, current) => {
    const exists = acc.find(item => item.userId === current.userId);
    if (!exists) {
      return acc.concat([current]);
    }
    // Prefer the active speaking stream to stay if multiple exist
    if (current.isSpeaking || (current as any).isScreenSharing) {
      return acc.map(item => item.userId === current.userId ? current : item);
    }
    return acc;
  }, [] as typeof rawParticipants);

  // Sorting: Creator first, then others
  const roomCreator = participants.find(p => p.userId === room.userId);
  const otherParticipants = participants.filter(p => p.userId !== room.userId);

  // Participant join notifications
  const prevParticipantsRef = useRef(participants);
  useEffect(() => {
    const previous = prevParticipantsRef.current;
    const current = participants;
    
    // Only fire if someone actually joined
    if (current.length > previous.length) {
      const newUsers = current.filter(c => !previous.find(p => p.userId === c.userId));
      newUsers.forEach(u => {
        // Exclude local participant edge cases
        if (!u.isLocalParticipant) {
          toast.success(`${u.name || "A user"} joined the room`, {
            style: { background: '#111', color: '#4edea3', border: '1px solid rgba(78,222,163,0.2)' }
          });
        }
      });
    }
    
    prevParticipantsRef.current = current;
  }, [participants]);

  const { camera, isMute: isCameraMuted } = useCameraState();
  const { microphone, isMute: isMicMuted } = useMicrophoneState();
  const { screenShare, isEnabled: isScreenSharing } = useScreenShareState();
  
  // App-level sidebar toggle
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  const screenShareParticipant = participants.find(p => (p as any).isScreenSharing || (p as any).publishedTracks?.includes("screenShare"));
  const dominantSpeaker = participants.find(p => p.isDominantSpeaker) || participants[0];
  const mainParticipant = screenShareParticipant || dominantSpeaker;
  const localParticipant = participants.find(p => p.isLocalParticipant);
  
  const stripParticipants = participants.filter(p => p.sessionId !== mainParticipant?.sessionId);

  const isCreator = session?.user?.id === room.userId;

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
       document.documentElement.requestFullscreen().catch(e => console.error(e));
    } else {
       document.exitFullscreen();
    }
  };

  const handleEndCall = async () => {
    try {
      await camera.disable();
      await microphone.disable();
      if (isScreenSharing) await screenShare.disable();
    } catch(e) {
      console.error(e);
    }
    await onLeave();
  };

  const handleMuteUser = async (pId: string) => {
    try {
       await call?.muteUser(pId, "audio");
       toast.success("User muted successfully");
    } catch (e) {
       toast.error("Failed to mute user");
    }
  };

  const handleRemoveUser = async (pId: string) => {
    try {
       await call?.kickUser(pId);
       toast.success("User removed from session");
    } catch (e) {
       toast.error("Failed to remove user");
    }
  };

  return (
    <div className="font-['Inter'] relative bg-[#0e0e0e] text-[#e7e5e4] h-screen w-full overflow-hidden flex flex-col">
       {/* TopAppBar */}
       <header className="bg-[#0e0e0e] text-[#4edea3] font-['Space_Grotesk'] tracking-tight flex justify-between items-center w-full px-6 h-14 border-b border-[#484848]/20 z-50 shrink-0">
          <div className="text-xl font-bold tracking-tighter text-[#4edea3]">CARBON_FORGE_COLLAB</div>
          <div className="flex items-center gap-6">
             <div className="flex gap-4">
               <span className="text-[#4edea3] border-b-2 border-[#4edea3] cursor-pointer text-sm font-medium">LIVE_SESSION</span>
             </div>
             <div className="flex items-center ml-2 border-l border-[#484848]/20 pl-4">
               <span 
                 className="material-symbols-outlined text-[#767575] hover:text-[#4edea3] cursor-pointer transition-colors" 
                 onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                 title="Toggle App Sidebar"
               >
                 {leftSidebarOpen ? 'close' : 'menu'}
               </span>
             </div>
          </div>
       </header>

       <div className="flex flex-1 overflow-hidden">
         {/* Left Global App Sidebar */}
         {leftSidebarOpen && (
           <div className="z-50 h-full border-r border-[#484848]/20 bg-[#000000] shrink-0">
             <Sidebar onToggle={() => setLeftSidebarOpen(false)} />
           </div>
         )}

         {/* Main Content Canvas */}
         <main className="flex-1 bg-[#0e0e0e] p-4 flex flex-col gap-4 overflow-hidden relative pb-24 duration-300">
            {/* Primary Area */}
            <div className="relative flex-1 bg-[#000000] overflow-hidden group border border-[#484848]/20 bg-black">
               {mainParticipant && (
                 <ParticipantView
                   participant={mainParticipant}
                   className="w-full h-full object-contain"
                 />
               )}
               
               {/* Overlay Metadata */}
               {mainParticipant && (
               <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-[#484848]/30">
                  <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                    {screenShareParticipant?.sessionId === mainParticipant.sessionId ? "screen_share" : "account_circle"}
                  </span>
                  <span className="font-['Space_Grotesk'] text-xs font-bold tracking-wider uppercase text-on-surface">
                    {String(mainParticipant.name)} {screenShareParticipant?.sessionId === mainParticipant.sessionId ? "/ SCREEN_01" : ""}
                  </span>
               </div>
               )}

               <div className="absolute bottom-4 right-4 flex gap-2">
                  <div 
                    className="bg-black/60 backdrop-blur-md p-2 border border-[#484848]/30 cursor-pointer hover:text-[#4edea3] transition-colors"
                    onClick={toggleFullScreen}
                  >
                     <span className="material-symbols-outlined text-[20px] text-white hover:text-[#4edea3]">fullscreen</span>
                  </div>
               </div>

               {/* Local / Floating Mini Tile */}
               {localParticipant && localParticipant.sessionId !== mainParticipant?.sessionId && (
               <div className="absolute bottom-4 left-4 w-48 aspect-video bg-[#1f2020] border-2 border-[#4edea3] shadow-2xl overflow-hidden">
                  <ParticipantView
                    participant={localParticipant}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#4edea3]/90 text-[#004a31] px-2 py-0.5 font-['Space_Grotesk'] text-[10px] font-bold uppercase truncate drop-shadow-sm">
                      {String(localParticipant.name)} (YOU)
                  </div>
               </div>
               )}
            </div>

            {/* Secondary Strip: Active Camera Grid */}
            {stripParticipants.length > 0 && (
            <div className="h-32 flex gap-4 overflow-x-auto custom-scrollbar shrink-0">
               {stripParticipants.map(participant => (
                 <div key={participant.sessionId} className={cn(
                   "min-w-[200px] h-full bg-[#1f2020] relative border group overflow-hidden",
                   participant.isSpeaking ? "border-[#4edea3] shadow-[0_0_10px_rgba(78,222,163,0.3)]" : "border-[#484848]/20"
                 )}>
                    <ParticipantView
                       participant={participant}
                       className={cn("w-full h-full object-cover transition-all", !participant.isSpeaking && "grayscale group-hover:grayscale-0")}
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-2">
                       <span className="bg-black/40 text-[10px] text-white font-bold px-2 py-0.5 backdrop-blur-sm uppercase truncate max-w-[120px] font-['Space_Grotesk'] tracking-wider">
                         {String(participant.name)}
                       </span>
                       {hasAudio(participant) ? (
                         <span className="material-symbols-outlined text-[14px] text-[#4edea3]">mic</span>
                       ) : (
                         <span className="material-symbols-outlined text-[14px] text-[#ee7d77]">mic_off</span>
                       )}
                    </div>
                    {participant.isSpeaking && (
                    <div className="absolute top-2 right-2">
                       <div className="w-2 h-2 bg-[#4edea3] rounded-full animate-pulse shadow-[0_0_8px_rgba(78,222,163,0.8)]"></div>
                    </div>
                    )}
                 </div>
               ))}
            </div>
            )}
         </main>

         {/* Meeting Sidebar (Right) */}
         <aside className="w-80 bg-[#000000] border-l border-[#484848]/20 flex flex-col z-40 shrink-0 shadow-2xl pb-20">
            <div className="p-6 border-b border-[#484848]/20 shrink-0">
                <h2 className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-white mb-1 uppercase break-words w-full">
                  {String((room as any).name).replace(/[^a-zA-Z0-9_\- ]/g, "").replace(/\s+/g, "_")}
                </h2>
                {!!(room as any).githubRepo && (
                  <Link 
                    href={String((room as any).githubRepo)}
                    target="_blank"
                    className="flex items-center gap-2 text-[#4edea3] text-[10px] font-mono mb-4 cursor-pointer hover:underline opacity-80 hover:opacity-100"
                  >
                    <span className="material-symbols-outlined text-[14px]">link</span>
                    {String((room as any).githubRepo).replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                  </Link>
                )}
                <p className="text-[#767575] text-xs leading-relaxed whitespace-pre-wrap break-words">
                   {String((room as any).description ?? "No session telemetry available. Daily stand-up and technical architectural review.")}
                </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
               <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-['Space_Grotesk'] tracking-widest text-[#767575] uppercase px-2 mb-2">
                    ACTIVE_PARTICIPANTS ({participants.length})
                  </div>
                  
                  {/* Sorting Logic: Creator first */}
                  {roomCreator && (
                     <ParticipantRow 
                        p={roomCreator} 
                        isCreator={isCreator} 
                        isOwner={true}
                        handleMute={handleMuteUser} 
                        handleRemove={handleRemoveUser} 
                     />
                  )}
                  
                  {otherParticipants.map((p) => (
                    <ParticipantRow 
                      key={p.sessionId} 
                      p={p} 
                      isCreator={isCreator} 
                      isOwner={false}
                      handleMute={handleMuteUser} 
                      handleRemove={handleRemoveUser} 
                    />
                  ))}
               </div>
            </div>
         </aside>
       </div>

       {/* BottomNavBar (Controls) */}
       <footer className="fixed bottom-0 w-full z-50 flex justify-center items-center gap-4 px-8 bg-[#131313] h-20 border-t border-[#484848]/20 font-['Space_Grotesk'] font-medium text-[11px]">
          {/* Call Controls */}
          <div className="flex items-center gap-3">
             <button 
               onClick={async () => await microphone.toggle()}
               className={cn(
                 "flex flex-col items-center justify-center w-14 h-14 transition-all focus:outline-none",
                 !isMicMuted 
                   ? "bg-[#4edea3] text-[#004a31] active:bg-[#005236]"
                   : "text-[#767575] border border-[#484848]/20 hover:border-[#4edea3] hover:text-[#4edea3]"
               )}
             >
                <span className="material-symbols-outlined mb-0.5">{!isMicMuted ? 'mic' : 'mic_off'}</span>
                <span className="uppercase">{!isMicMuted ? 'Mute' : 'Mic'}</span>
             </button>

             <button 
               onClick={async () => await camera.toggle()}
               className={cn(
                 "flex flex-col items-center justify-center w-14 h-14 transition-all focus:outline-none",
                 !isCameraMuted 
                   ? "bg-[#4edea3] text-[#004a31] active:bg-[#005236]"
                   : "text-[#767575] border border-[#484848]/20 hover:border-[#4edea3] hover:text-[#4edea3]"
               )}
             >
                <span className="material-symbols-outlined mb-0.5">{!isCameraMuted ? 'videocam' : 'videocam_off'}</span>
                <span className="uppercase">Camera</span>
             </button>

             <button 
               onClick={async () => await screenShare.toggle()}
               className={cn(
                 "flex flex-col items-center justify-center w-14 h-14 transition-all focus:outline-none",
                 isScreenSharing 
                   ? "bg-[#4edea3] text-[#004a31] active:bg-[#005236]"
                   : "text-[#767575] border border-[#484848]/20 hover:border-[#4edea3] hover:text-[#4edea3]"
               )}
             >
                <span className="material-symbols-outlined mb-0.5" style={{fontVariationSettings: "'FILL' 1"}}>screen_share</span>
                <span className="uppercase">Share</span>
             </button>
          </div>

          <div className="h-8 w-px bg-[#484848]/40 mx-2"></div>

          <button 
            onClick={handleEndCall}
            className="flex flex-col items-center justify-center w-14 h-14 bg-[#ee7d77]/10 text-[#ee7d77] border border-[#ee7d77]/20 hover:bg-[#ee7d77] hover:text-white transition-all focus:outline-none"
          >
             <span className="material-symbols-outlined mb-0.5">call_end</span>
             <span className="uppercase">Leave</span>
          </button>

          <div className="absolute right-8 hidden md:flex items-center gap-4 text-[#767575]">
             <div className="flex flex-col items-end">
                <div className="text-[10px] tracking-widest text-[#4edea3]">NETWORK_STABLE</div>
                <div className="text-[9px]">PING: {(Math.random() * 20 + 10).toFixed(0)}MS</div>
             </div>
             <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-[#4edea3] transition-colors">add_reaction</span>
          </div>
       </footer>
    </div>
  );
}

function ParticipantRow({ p, isCreator, isOwner, handleMute, handleRemove }: { 
  p: StreamVideoParticipant, 
  isCreator: boolean, 
  isOwner: boolean,
  handleMute: (id: string) => Promise<void>,
  handleRemove: (id: string) => Promise<void>
}) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-[#1f2020] transition-colors group rounded-sm">
      <div className="flex items-center gap-3 max-w-[140px]">
        <div className="w-8 h-8 bg-[#252626] border border-[#484848]/40 flex items-center justify-center font-bold text-[10px] text-[#4edea3] font-['Space_Grotesk'] uppercase shrink-0">
          {String(p.name).substring(0,2)}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-[11px] font-medium text-[#e7e5e4] uppercase truncate tracking-wide font-['Inter']">
              {String(p.name)}
            </div>
            {isOwner && (
              <span className="text-[7px] bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20 px-1 py-0.5 rounded-sm font-black tracking-tighter uppercase whitespace-nowrap">CREATOR</span>
            )}
          </div>
          {p.isDominantSpeaker && (
            <span className="text-[8px] text-[#4edea3] font-mono tracking-widest animate-pulse uppercase">Speaking</span>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {hasAudio(p) ? (
          <span className="material-symbols-outlined text-[16px] text-[#4edea3] drop-shadow-[0_0_5px_rgba(78,222,163,0.5)]">mic</span>
        ) : (
          <span className="material-symbols-outlined text-[16px] text-[#ee7d77] opacity-40 group-hover:opacity-100 transition-opacity">mic_off</span>
        )}
        
        {isCreator && !p.isLocalParticipant && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="material-symbols-outlined text-[16px] text-[#767575] cursor-pointer hover:text-white transition-colors">more_vert</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#111111] border-[#484848]/20 rounded-none shadow-2xl p-1">
               <DropdownMenuItem 
                 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-outline hover:text-primary hover:bg-white/5 cursor-pointer p-3"
                 onClick={() => handleMute(p.userId)}
               >
                  <span className="material-symbols-outlined text-sm">mic_off</span>
                  Mute Remote
               </DropdownMenuItem>
               <DropdownMenuItem 
                 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#ee7d77] hover:bg-[#ee7d77]/10 cursor-pointer p-3"
                 onClick={() => handleRemove(p.userId)}
               >
                  <span className="material-symbols-outlined text-sm">person_remove</span>
                  Remove From Room
               </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}


