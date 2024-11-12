import {FC, ReactNode} from "react";
import {EditTagsDetails} from "@/types/forms";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import clsx from "clsx";
import "./edit-tags-form.css";
import EditTags from "../EditTags/edit-tags";
import {Tag} from "@/types/src";
import {editTagsValidationSchema} from "validation-schemas/src/forms";

interface EditTagsFormProps {
    initialTags: Tag[];
    children: ReactNode;
    className?: string;
    documentId?: string;
}

const EditTagsForm: FC<EditTagsFormProps> = ({
    className,
    children,
    initialTags,
    documentId,
}: EditTagsFormProps) => {
    const form = useForm<EditTagsDetails>({
        resolver: zodResolver(editTagsValidationSchema),
        mode: "onSubmit",
        defaultValues: {
            tags: initialTags,
        },
    });

    const onSubmit = (data: EditTagsDetails) => {
        // TODO, use hook

        data;
    };

    const {
        fields: tags,
        append: appendTag,
        remove: removeTag,
    } = useFieldArray({
        control: form.control,
        name: "tags",
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={clsx("space-y-8", className)}
            >
                <EditTags
                    form={form}
                    tags={tags}
                    appendTag={() => appendTag({name: "", color: "black"})}
                    removeTag={removeTag}
                />
                {children}
            </form>
        </Form>
    );
};

export default EditTagsForm;
