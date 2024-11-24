import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Expense } from "@/lib/types";

// Geçerli dili parametre olarak alıyoruz
export const getColumns = (): ColumnDef<Expense>[] => [
  { accessorKey: "id", header: "Id" },
  {
    accessorKey: `category`,
    header: "Kategori",
  },
  {
    accessorKey: `amount`,
    header: "Miktar",
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
