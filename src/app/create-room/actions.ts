"use server";

import { createRoom } from "@/data-access/room";

import {  Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";


export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }

 
  const createdRoom = await createRoom(roomData, session.user.id);

  revalidatePath("/your-rooms");
  return createdRoom.id;

}