import { FC } from "react";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableSkeletonProps {
  className?: string;
}

const DataTableSkeleton: FC<DataTableSkeletonProps> = ({
  className,
}: DataTableSkeletonProps) => {

  return (
    <div className={clsx("flex flex-col space-y-3 w-full px-4 pt-16", className)}>
      <div className="flex justify-between gap-4">
        <Skeleton className="h-6 w-24 rounded-xl" />
        <Skeleton className="h-6 w-24 rounded-xl" />
        <Skeleton className="h-6 w-24 rounded-xl" />
        <Skeleton className="h-6 w-24 rounded-xl" />
      </div>
      <div className="flex flex-col justify-around gap-4">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  )
};

export default DataTableSkeleton;
