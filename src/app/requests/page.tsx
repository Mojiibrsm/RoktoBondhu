import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bloodRequests } from "@/lib/placeholder-data";
import { Droplet, MapPin, PlusCircle } from "lucide-react";

export default function RequestsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Blood Requests</h1>
            <p className="text-lg md:text-xl text-foreground/80 mt-4 max-w-3xl">
            Browse active requests or post one if you are in need.
            </p>
        </div>
        <Button size="lg" className="bg-accent hover:bg-accent/90 flex-shrink-0">
          <PlusCircle className="mr-2 h-5 w-5" /> Post a Request
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bloodRequests.map((request) => (
          <Card key={request.id} className="shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle className="font-headline text-2xl">{request.patientName}</CardTitle>
                  <Badge variant={request.status === 'Urgent' ? 'destructive' : 'secondary'} className={request.status === 'Urgent' ? 'bg-primary' : ''}>
                      {request.status}
                  </Badge>
              </div>
              <CardDescription className="flex items-center pt-2 gap-4">
                <span className="flex items-center font-bold text-primary">
                    <Droplet className="mr-2 h-4 w-4" /> {request.bloodType}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="flex items-center text-foreground/80">
                    <MapPin className="mr-2 h-4 w-4" /> 
                    {request.location}
                </p>
                <p className="text-sm text-muted-foreground mt-1 ml-6">
                    ({request.upazila}, {request.district}, {request.division})
                </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary/90">
                View Details & Donate
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
