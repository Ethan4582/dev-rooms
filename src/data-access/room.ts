import { unstable_noStore } from 'next/cache';
import { db } from '../db';
import { Room, room } from '../db/schema'; 
import { eq } from 'drizzle-orm'; 
import { authOptions } from "@/lib/auth"; 


import { getServerSession } from "next-auth";

export async function getRooms(search?: string, tag?: string) {
  unstable_noStore(); 

  const rooms = await db.query.room.findMany({
    where: (room, { like, or, and }) => {
      const searchFilter = search ? or(
        like(room.name, `%${search}%`),
        like(room.description, `%${search}%`),
        like(room.language, `%${search}%`),
        like(room.githubRepo, `%${search}%`)
      ) : undefined;

      const tagFilter = (tag && tag !== "All Topics") ? like(room.language, `%${tag}%`) : undefined;

      if (searchFilter && tagFilter) return and(searchFilter, tagFilter);
      return searchFilter || tagFilter;
    }
  });
  
  return rooms;
}



export async function getRoom(roomId: string) {
   unstable_noStore(); 
  if (!roomId || roomId.trim() === "") {
    throw new Error("Room ID is required");
  }
  return await db.query.room.findFirst({
    where: (room, { eq }) => eq(room.id, roomId),
  });
}

export async function getUserRooms() {
 
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("User not authenticated");
  }
  return await db.query.room.findMany({
    where: (room, { eq }) => eq(room.userId, session.user.id),
  });
}


export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}  


export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  const inserted = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning();
  return inserted[0];
}

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning();
  return updated[0];
}