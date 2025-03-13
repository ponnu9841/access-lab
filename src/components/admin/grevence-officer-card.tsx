import { Mail, MapPin, Phone, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GrievanceOfficerCard({
    name = "Jane Smith",
    email="jane.smith@example.com",
    contact= "+1 (555) 123-4567",
    designation = "Senior Product Designer",
    address = "123 Main Street, San Francisco, CA 94105",
}: GrievanceOfficer) {
    return (
        <Card className="w-full max-w-md overflow-hidden mx-auto">
            <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                    <User className="h-5 w-5" />
                    {name}
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-4">
                <div className="flex items-start gap-2">
                    <div className="mt-0.5 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-sm font-medium">Designation</p>
                        <p className="text-sm text-muted-foreground">{designation}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <div className="mt-0.5 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{contact}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <div className="mt-0.5 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                </div>

                {address && <div className="flex items-start gap-2">
                    <div className="mt-0.5 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">{address}</p>
                    </div>
                </div>}
            </CardContent>
        </Card>
    )
}

