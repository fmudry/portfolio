import {FC} from "react";
import "./cell.css";
import clsx from "clsx";

interface CellProps {
    value: string;
    title: string;
    disappearing: boolean;
    documentId?: string;
    automergeUrl?: string;
    className?: string;
}

const Cell: FC<CellProps> = ({
    value,
    title,
    disappearing,
    className,
}: CellProps) => {
    return (
        <div
            className={clsx(
                "text-left font-medium",
                disappearing ? "hidden md:block text-wrap" : "flex flex-col",
                className
            )}
            title={title}
        >
            {value}
        </div>
    );
};

export default Cell;
