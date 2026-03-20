import { getServerSession } from "next-auth";
import { CreateRoomForm } from "./create-room-form";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function CreateRoomPage() {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return redirect(`/api/auth/signin?callbackUrl=/create-room`);
    }

    return (
      <DashboardShell 
        title="Initialize Room" 
        description="Deploying new collaboration cluster"
      >
        <div className="max-w-2xl mx-auto">
          <Card className="bg-surface-dim border-outline-variant/30 shadow-2xl shadow-primary/5">
            <CardHeader className="border-b border-outline-variant/10 pb-6">
              <CardTitle className="font-headline text-2xl font-bold tracking-tighter uppercase text-primary">
                Room Configuration
              </CardTitle>
              <CardDescription className="font-label text-xs uppercase tracking-widest text-outline">
                Define the parameters for your pair-programming session
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <CreateRoomForm />
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    );
}