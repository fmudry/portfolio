import {FC, ReactNode} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import clsx from "clsx";
import "./new-document-form.css";
import {newDocumentValidationSchema} from "validation-schemas/src/forms";
import {NewDocumentDetails} from "@/types/forms";
import {useTranslation} from "react-i18next";
import EditTags from "../EditTags/edit-tags";
import EditCollaborators from "../EditCollaborators/edit-collaborators";
import DocsApi from "@/api/docsApi";
import TagsApi from "@/api/tagApi";

interface NewDocumentFormProps {
    children: ReactNode;
    className?: string;
}

const NewDocumentForm: FC<NewDocumentFormProps> = ({
    className,
    children,
}: NewDocumentFormProps) => {
    const {t} = useTranslation();

    const form = useForm<NewDocumentDetails>({
        resolver: zodResolver(newDocumentValidationSchema),
        mode: "onSubmit",
        defaultValues: {
            title: "",
            collaborators: [],
            tags: [],
        },
    });

    const {
        fields: collaborators,
        append: appendCollaborator,
        remove: removeCollaborator,
    } = useFieldArray({
        control: form.control,
        name: "collaborators",
    });

    const {
        fields: tags,
        append: appendTag,
        remove: removeTag,
    } = useFieldArray({
        control: form.control,
        name: "tags",
    });

    const onSubmit = async (data: NewDocumentDetails) => {
        let docId;
        try {
            const res = await DocsApi.createSingle({title: data.title});
            docId = res.item.id;
        } catch (e) {
            console.log(e);
            return;
        }

        try {
            if (docId)
                data.collaborators.forEach(async (collaborator) => {
                    const res = await DocsApi.shareSingle(docId, {
                        shareWith: collaborator.email,
                        permissions: collaborator.permission,
                    });
                    if (!res) {
                        console.log("unable to share doc");
                        return false;
                    }
                });
        } catch (e) {
            console.log(e);
            return;
        }

        try {
            if (docId) {
                data.tags.forEach(async (tag) => {
                    const res = await TagsApi.createSingle(tag);
                    if (!res) {
                        console.log("tag creation error");
                        return;
                    }
                    const res2 = await DocsApi.addSingleTag(docId, {
                        tagId: res.item.id,
                    });
                    if (!res2) {
                        console.log("unable to add tag to document");
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }

        // TODO - USE TOAST HERE
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={clsx("space-y-8 mt-4", className)}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem className="form__item">
                            <FormLabel>{t("docs-forms.title")}</FormLabel>
                            <FormControl>
                                <Input placeholder="Joe mama" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <EditCollaborators
                    form={form}
                    collaborators={collaborators}
                    appendCollaborator={() =>
                        appendCollaborator({email: "", permission: "READ"})
                    }
                    removeCollaborator={removeCollaborator}
                />

                {/* TODO, solve type issue */}
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

export default NewDocumentForm;
