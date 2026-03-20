"use client";

import { Room } from "@/db/schema";
import { RoomCard } from "@/components/RoomCard";
import { deleteUserRoom } from "./action";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function YourRoomsList({ rooms }: { rooms: Room[] }) {
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setRoomToDelete(id);
  };

  const confirmDelete = async () => {
    if (!roomToDelete) return;
    try {
      await deleteUserRoom(roomToDelete);
      toast.success("Node decommissioned successfully");
      router.refresh();
    } catch (error) {
      toast.error("Process failed: manual intervention required");
    } finally {
      setRoomToDelete(null);
    }
  };

  const handleEdit = (room: Room) => {
    router.push(`/edit-room/${room.id}`);
  };

  return (
    <>
      <AlertDialog open={!!roomToDelete} onOpenChange={() => setRoomToDelete(null)}>
        <AlertDialogContent className="bg-surface-container-high border-outline-variant/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline uppercase tracking-tight">Node Decommissioning</AlertDialogTitle>
            <AlertDialogDescription className="text-on-surface-variant text-xs">
              This will permanently erase all data associated with this cluster. This action is immutable.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-outline-variant hover:bg-surface-container-highest uppercase text-[10px] font-label font-bold tracking-widest text-on-surface">Abort</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-error text-on-error hover:bg-error/90 uppercase text-[10px] font-label font-bold tracking-widest"
            >
              Confirm_Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-outline-variant/20">
        {rooms.map((room) => (
          <RoomCard 
            key={String(room.id)} 
            room={room} 
            isOwner 
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </>
  );
}
