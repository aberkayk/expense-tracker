import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Expense } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

// Geçerli dili parametre olarak alıyoruz
export const getColumns = (): ColumnDef<Expense>[] => [
  { accessorKey: "id", header: "Id" },
  {
    accessorKey: `category`,
    header: "Kategori",
  },
  {
    accessorKey: `amount`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Miktar (₺)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <p className="px-4">{row.getValue("amount")}</p>,
  },
  {
    accessorKey: `description`,
    header: "Açıklama",
  },
  {
    accessorKey: "date",
    header: "Tarih",
    cell: ({ row }) => <p>{row.getValue("date")}</p>,
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
