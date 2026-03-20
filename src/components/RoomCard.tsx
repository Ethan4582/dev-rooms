"use client";

import { Room } from "@/db/schema";
import { Link as GithubIcon, User, ExternalLink, Edit2, Trash2, Rocket } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (room: Room) => void;
}

export function RoomCard({ room, isOwner, onDelete, onEdit }: RoomCardProps) {
  const [count, setCount] = useState<number | null>(null);
  
  const languages = String(room.language)
    .split(",")
    .map((lang: string) => lang.trim());

  useEffect(() => {
    // Simple fetch to the API route I just created
    fetch(`/api/rooms/${room.id}/status`)
      .then(res => res.json())
      .then(data => setCount(data.participantCount))
      .catch(() => setCount(0));
  }, [room.id]);

  return (
    <div className="bg-surface-dim border border-outline-variant/10 p-8 flex flex-col group hover:bg-[#121212] transition-all duration-300 relative overflow-hidden">
      {/* Card Header: Name and Active Count */}
      <div className="flex justify-between items-start mb-6 gap-4">
        <h3 className="font-headline font-bold text-2xl tracking-tight text-on-surface group-hover:text-primary transition-colors leading-tight truncate w-full">
          {String(room.name ?? "Untitled Room")}
        </h3>
        <div className="flex items-center gap-2 bg-[#004a31]/20 px-3 py-1.5 border border-[#004a31]/30 shrink-0">
          <User className={cn("w-3.5 h-3.5 text-primary", count === null && "animate-pulse")} />
          <span className={cn("font-label text-xs font-bold text-primary min-w-[1ch]", count === null && "opacity-0")}>
            {count ?? "--"}
          </span>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-on-surface-variant/80 text-base mb-8 font-body leading-relaxed line-clamp-3">
          {String(room.description ?? "No description provided.")}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {languages.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-[#1a1a1a] border border-outline-variant/10 text-[10px] font-mono text-outline uppercase tracking-wider hover:text-primary transition-colors cursor-default"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Join Button and Actions/GitHub */}
      <div className="flex items-center gap-3 pt-6">
        <Link 
          href={`/rooms/${room.id}`}
          className="flex-1 emerald-gradient text-[#004a31] font-label font-black py-4 text-xs uppercase tracking-[0.2em] text-center transition-all active:scale-95 shadow-[0_4px_15px_rgba(78,222,163,0.1)] hover:shadow-[0_4px_25px_rgba(78,222,163,0.2)]"
        >
          Join Room
        </Link>
        
        <div className="flex gap-2">
          {room.githubRepo && (
            <Link 
              href={String(room.githubRepo)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#1a1a1a] border border-outline-variant/20 hover:border-primary/40 transition-colors group/repo"
            >
              <GithubIcon className="w-5 h-5 text-on-surface-variant opacity-60 group-hover/repo:opacity-100 group-hover/repo:text-primary transition-all" />
            </Link>
          )}

          {isOwner && (
            <div className="flex gap-1">
              <button 
                onClick={() => onEdit?.(room)}
                className="p-4 bg-[#1a1a1a] border border-outline-variant/20 hover:border-primary/40 transition-colors group/edit"
                title="Edit Node"
              >
                <Edit2 className="w-4 h-4 text-outline/40 group-hover/edit:text-primary transition-colors" />
              </button>
              <button 
                onClick={() => onDelete?.(String(room.id))}
                className="p-4 bg-[#1a1a1a] border border-outline-variant/20 hover:border-error/40 transition-colors group/delete"
                title="Decommission Node"
              >
                <Trash2 className="w-4 h-4 text-outline/40 group-hover/delete:text-error transition-colors" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


