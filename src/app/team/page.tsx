'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    aiHint: string;
    bio: string;
}

export default function TeamPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'teamMembers'), (snapshot) => {
            setTeamMembers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember)));
        });
        return () => unsubscribe();
    }, []);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          আমাদের দল
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mt-4 max-w-3xl mx-auto">
          রক্তবন্ধু প্ল্যাটফর্মের পেছনের কারিগরদের সাথে পরিচিত হন। আমরা জীবন বাঁচানোর এই মিশনে প্রতিশ্রুতিবদ্ধ।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {teamMembers.map((member) => (
          <Card key={member.id} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <Image
              src={member.image}
              alt={member.name}
              width={128}
              height={128}
              className="rounded-full mb-4 border-4 border-primary/20"
              data-ai-hint={member.aiHint}
            />
            <CardHeader className="p-0 w-full">
              <CardTitle className="font-headline text-2xl">{member.name}</CardTitle>
              <Badge variant="secondary" className="mt-1 w-fit mx-auto">{member.role}</Badge>
            </CardHeader>
            <CardContent className="p-0 pt-4 flex-grow">
              <p className="text-foreground/80">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
