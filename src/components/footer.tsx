import React from "react";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="w-full ">
      <Separator className="w-full" />
      <div className="w-full xl:container flex gap-8 flex-col py-4 px-8">
        <p className="text-muted-foreground text-sm">
          Expense Tracker &#169; | Tüm Hakları Saklıdır
        </p>
      </div>
    </footer>
  );
};

export default Footer;
