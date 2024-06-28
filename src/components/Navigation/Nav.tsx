import Link from "next/link";
import { Button } from "@/components/ui/button";
import MenuToggle from "../theme/MenuToggle";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";

export default function Nav() {
  const { user } = useUser();

  if (user) {
    (async () => {
      await fetch("/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user?.name,
          email: user?.email,
          diseases: [],
          doctors: [],
        }),
      });
    })();
  }

  return (
    <div className="px-3 navbar flex flex-row justify-between items-center pt-2">
      <Link href="/">
        <div id="logo" className="text-black-600 text-3xl font-bold">
          Sympt<span className="text-primary">O</span>
        </div>
      </Link>

      <div className="buttons flex items-center gap-5">
        <MenuToggle />
        <div>
          {user === undefined ? (
            <Link href="/api/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
          ) :
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2">
                    <Image
                      src={user.picture as string}
                      alt="dp"
                      width={45}
                      height={32}
                      className="rounded-full"
                    />
                    <p className="text-2xl">{user.name}</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer"><Link href="/details">Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 cursor-pointer"><Link href="/api/auth/logout">Logout</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>


            </>
          }
        </div>
      </div>
    </div>
  );
}
