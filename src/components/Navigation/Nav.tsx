import Link from "next/link";
import { Button } from "@/components/ui/button";
import MenuToggle from "../theme/MenuToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Nav() {

  const { data: user } = useSession();

  return (
    <div className="px-3 navbar flex flex-row justify-between items-center pt-2">
      <Link href="/">
        <div id="logo" className="text-black-600 text-3xl font-bold">
          Sympt<span className="text-primary">Ω</span>
        </div>
      </Link>

      <div className="flex items-center gap-5">
        <MenuToggle />

        <div>
          {!user ? <Button variant="outline" onClick={() => signIn("google")}>Login</Button> :
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2">
                    <Image
                      src={user?.user?.image as string}
                      alt="dp"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <p className="text-xl hidden md:block">{user?.user?.name as string}</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-black z-[999]">
                  <DropdownMenuLabel className="hidden md:block">My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="block md:hidden">{user?.user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer"><Link href="/medical-history">Medical History</Link></DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          }
        </div>

      </div>
    </div>
  );
}
