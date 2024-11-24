"use client";

import React from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navbarItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const MobileNavbar = () => {
  return (
    <nav
      className={cn(
        "sticky bg-white top-0 z-50 flex md:hidden h-[60px] min-h-[60px] text-sm px-8 border-black/10"
      )}
    >
      <div className="h-full w-full flex gap-3 justify-between items-center xl:container">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <div className="border rounded-md flex justify-center items-center py-[1.5px] px-1">
                  <MenuIcon
                    size={30}
                    className="cursor-pointer hover:rotate-180 transition duration-100"
                  />
                </div>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex flex-col justify-between items-center p-0 border-none w-full md:hidden"
              >
                <div className="flex flex-col items-center gap-4 w-full py-20 px-8 font-semibold ">
                  {navbarItems.map((item, index) => (
                    <Link
                      className="w-fit flex justify-center capitalize"
                      href={item.href}
                      key={index.toString()}
                    >
                      <SheetClose className="w-fit h-full flex justify-center">
                        <p
                          className={cn(
                            "capitalize h-full w-64 transition px-3 py-2 text-xl border-b-2 border-transparent  hover:border-b-2 border-spacing-4 "
                          )}
                        >
                          {item.label}
                        </p>
                      </SheetClose>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
