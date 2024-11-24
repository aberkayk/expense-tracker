"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { getColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Expense, Income } from "@/lib/types";

// TODO: Searchable column eklenecek

interface Props {
  data: Income[] | Expense[];
  isExpense: boolean;
}

const Client = ({ isExpense, data }: Props) => {
  const router = useRouter();

  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">
        {isExpense ? "Gider Tablosu" : "Gelir Tablosu"}
      </h4>
      <DataTable columns={getColumns()} data={data} />
    </div>
  );
};

export default Client;
