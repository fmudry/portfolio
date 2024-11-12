import {FC} from "react";
import "./tag.css";
import clsx from "clsx";
import {truncateString} from "../../utils";

interface TagProps {
    name: string;
    color: string;
    className?: string;
}

const TagComponent: FC<TagProps> = ({className, name, color}: TagProps) => {
    return (
        <div className={clsx("tag", className)}>
            <span
                className="tag__empty-text"
                style={{backgroundColor: color, borderColor: color}}
            ></span>
            <span style={{borderColor: color}} className="tag__text">
                {truncateString(name, 15)}
            </span>
        </div>
    );
};

export default TagComponent;
