import {FC} from "react";
import "./tags-cell.css";
import {Tag} from "@/types/src/index";
import clsx from "clsx";
import TagComponent from "@/components/ui/Tag/tag";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

interface TagsCellProps {
    tags: Tag[];
    className?: string;
}

const TagsCell: FC<TagsCellProps> = ({tags, className}: TagsCellProps) => {
    const tagsLimit = 2;
    return (
        <HoverCard>
            <HoverCardTrigger
                className={clsx(
                    "tags-hover-trigger",
                    tags.length > tagsLimit ? "cursor-pointer" : null
                )}
            >
                <div className={clsx("tags-cell", className)}>
                    {tags.map((tag, index) => {
                        if (index >= tagsLimit) {
                            return "";
                        }

                        return (
                            <TagComponent
                                key={index}
                                name={tag.name}
                                color={tag.color}
                            />
                        );
                    })}
                    {tags.length > tagsLimit ? (
                        <span className="font-bold">...</span>
                    ) : (
                        ""
                    )}
                </div>
            </HoverCardTrigger>
            {tags.length > tagsLimit ? (
                <HoverCardContent className="tags-hover-content">
                    {tags.map((tag, index) => {
                        return (
                            <TagComponent
                                key={index}
                                name={tag.name}
                                color={tag.color}
                            />
                        );
                    })}
                </HoverCardContent>
            ) : (
                ""
            )}
        </HoverCard>
    );
};

export default TagsCell;
