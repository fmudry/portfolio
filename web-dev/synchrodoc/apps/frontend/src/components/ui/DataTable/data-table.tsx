import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import clsx from "clsx";
import {Button} from "../button";
import {useState} from "react";
import {useTranslation} from "react-i18next";

import {SlidersHorizontalIcon} from "lucide-react";
import FilterSortForm from "@/components/forms/FilterSort/filter-sort-form";
import { Input } from "../input";
import DataTableFormFooter from "./forms-footer";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    className?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    className,
}: DataTableProps<TData, TValue>) {
    const {t} = useTranslation();
    const [currPage, setCurrPage] = useState<number>(1);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    });

    return (
        <div className={clsx("lg:mx-4 mb-4", className)}>
            <div className="flex items-center py-4 ml-4 gap-2">
                <Input
                    id="documents-filter-input"
                    placeholder={t("docs-table.search-title")}
                    value={
                        (table
                            .getColumn("title")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("title")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="flex gap-3 mr-1" variant={"default"}>
                            <SlidersHorizontalIcon />
                            {t("docs.filter-documents")}
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-auto">
                        <SheetHeader>
                            <SheetTitle className="mb-4">
                                {t("docs.filter")}
                            </SheetTitle>
                        </SheetHeader>

                        <FilterSortForm
                            children={
                                <DataTableFormFooter acceptButtonTranslation="docs.apply" rejectButtonTranslation="docs.cancel"/>
                            }
                        />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="mx-2 rounded-2xl border md:mx-0">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {t("docs-table.no-results")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4 mr-4">
                <span>{currPage}</span>
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                        table.previousPage();
                        setCurrPage((prev) => prev - 1);
                    }}
                    disabled={!table.getCanPreviousPage()}
                >
                    {t("docs.previous")}
                </Button>
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                        table.nextPage();
                        setCurrPage((prev) => prev + 1);
                    }}
                    disabled={!table.getCanNextPage()}
                >
                    {t("docs.next")}
                </Button>
            </div>
        </div>
    );
}
