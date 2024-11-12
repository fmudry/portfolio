import {FC} from "react";
import clsx from "clsx";
import {truncateString} from "../utils";

interface ColorTextCouple {
    name: string;
    color: string;
    className?: string;
}

const ColorTextCouple: FC<ColorTextCouple> = ({
    className,
    name,
    color,
}: ColorTextCouple) => {
    return (
        <div className={clsx("flex items-center gap-2 ", className)}>
            <span
                className="w-[10px] h-[10px]"
                style={{backgroundColor: color}}
            ></span>
            {truncateString(name, 12).toUpperCase()}
        </div>
    );
};

export default ColorTextCouple;
