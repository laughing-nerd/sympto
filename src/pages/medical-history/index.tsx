import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Globe, Phone } from 'lucide-react';
import Link from 'next/link';
import { Rating } from '@/components/Star/Star';


const MedicalHistoryIndex = () => {

  const [users, setUsers] = React.useState<any[]>([]);
  const { data: user } = useSession()

  React.useEffect(() => {
    (async () => {

      if (!user) return

      const res = await axios.get(`http://localhost:3000/api/user/get?email=${user?.user?.email}`)
      const data = res.data
      setUsers(data.doctors)
    })()
  }, [user]);


  return (
    <div className="px-3 py-10">
      <p className="text-2xl font-semibold">Your recent interactions with doctors</p>

      <div className="mt-5 space-y-5">
        {users?.length > 0 ?
          <>
            {users?.map((doctor: any, index: number) => (
              <Card key={index} className="transition-all hover:bg-primary/20 shadow-md cursor-pointer" onClick={() => {
                if (!window) return
                window.open(doctor.googleUrl, "_blank")
              }}>
                <CardHeader>
                  <CardTitle>{doctor.doctorName}</CardTitle>
                  <CardDescription>{doctor.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">

                  <p className="font-semibold text-primary">{doctor.address}</p>

                  {/* Website */}
                  <div className="flex items-center gap-2 underline underline-offset-4">
                    <Globe size={20} />
                    <Link href={doctor.Website}>{doctor.Website}</Link>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2">
                    <Phone size={20} />
                    <Link href={doctor.phone}>{doctor.phone}</Link>
                  </div>

                </CardContent>
                <CardFooter>
                  <Rating rating={doctor.stars} />
                </CardFooter>
              </Card>
            ))}
          </>
          : <p>No interactions found</p>
        }
      </div>
    </div>
  )
}

export default MedicalHistoryIndex
