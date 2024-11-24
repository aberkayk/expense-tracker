"use client";

import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/alert-modal";
import { useState } from "react";
import { Expense, Income } from "@/lib/types";
import { toast } from "sonner";
import { deleteExpense, deleteIncome } from "@/actions/income-expense";

interface CellActionProps {
  data: Expense | Income;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    setLoading(true);

    try {
      console.log({ type: data.type });
      if (data.type === "expense") {
        await deleteExpense(data.id); // Gideri sil
        toast.success("Gider silindi.");
      } else if (data.type === "income") {
        await deleteIncome(data.id); // Geliri sil
        toast.success("Gelir silindi.");
      }
    } catch (err: any) {
      toast.error(`${err.response?.statusText} - ${err.response?.status}`);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <div className="space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0 rounded-xl">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksiyonlar</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4 text-primary" /> Sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default CellAction;
