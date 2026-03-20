"use client";

import { Room } from "@/db/schema";
import { Link as GithubIcon, User, ExternalLink, Edit2, Trash2, Rocket } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface RoomCardProps {
  room: Room;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (room: Room) => void;
}

export function RoomCard({ room, isOwner, onDelete, onEdit }: RoomCardProps) {
  const languages = String(room.language)
    .split(",")
    .map((lang: string) => lang.trim());

  return (
    <div className="bg-surface-container-low border-r border-b border-outline-variant/20 p-6 flex flex-col group hover:bg-surface-container-high transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-headline font-bold text-lg tracking-tight group-hover:text-primary transition-colors uppercase">
          {String(room.name ?? "Untitled Room")}
        </h3>
        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1">
          <User className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-label font-bold text-primary">12</span>
        </div>
      </div>
      
      <p className="text-on-surface-variant text-sm mb-6 flex-1 font-body leading-relaxed line-clamp-3">
        {String(room.description ?? "No description provided.")}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {languages.map((tag, i) => (
          <span 
            key={i} 
            className="text-[9px] font-label px-2 py-0.5 bg-surface-container-highest border border-outline-variant/20 uppercase tracking-wider text-on-surface"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Link 
            href={`/rooms/${room.id}`}
            className="flex-1 emerald-gradient text-on-primary font-label font-bold py-3 text-[10px] uppercase tracking-widest text-center transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Join Room
            <Rocket className="w-3 h-3" />
          </Link>
          
          {room.githubRepo && (
            <Link 
              href={String(room.githubRepo)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-outline-variant/40 hover:border-primary/60 transition-colors bg-surface-container-highest"
            >
              <GithubIcon className="w-4 h-4 text-on-surface-variant opacity-70 group-hover:opacity-100" />
            </Link>
          )}
        </div>

        {isOwner && (
          <div className="flex gap-2 pt-2 border-t border-outline-variant/10">
            <button 
              onClick={() => onEdit?.(room)}
              className="flex-1 border border-primary/20 hover:bg-primary/5 text-primary py-2 text-[9px] font-label uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
            <button 
              onClick={() => onDelete?.(String(room.id))}
              className="px-4 border border-error/20 hover:bg-error/5 text-error py-2 text-[9px] font-label uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
