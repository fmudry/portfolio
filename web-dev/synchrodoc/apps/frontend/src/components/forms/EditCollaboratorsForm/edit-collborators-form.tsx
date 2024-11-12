import {FC, ReactNode} from "react";
import {editCollaboratorsDetails} from "@/types/forms";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import clsx from "clsx";
import "./edit-collaborators.css";
import {Collaborator} from "@/types/src";
import {editCollaboratorsValidationSchema} from "validation-schemas/src/forms";
import EditCollaborators from "../EditCollaborators/edit-collaborators";
import {useAddCollaborator, useCollaborators} from "@/hooks/useDocs";

interface EditCollaboratorsFormProps {
    children: ReactNode;
    className?: string;
    documentId: string;
}

const EditCollaboratorsForm: FC<EditCollaboratorsFormProps> = ({
    className,
    children,
    documentId,
}: EditCollaboratorsFormProps) => {
    const collabs = useCollaborators(documentId);
    const initialCollaborators: Collaborator[] = collabs.isSuccess
        ? collabs.data.items.map((c) => {
              return {
                  email: c.shareWith,
                  permission: c.permissions,
              };
          })
        : [];
    // const initialCollaborators: Collaborator[] = [
    //     {email: "john@doe.com", permission: "READ"},
    //     {email: "marian@kotleba.de", permission: "WRITE"},
    // ]; // TODO, fetch from api

    const form = useForm<editCollaboratorsDetails>({
        resolver: zodResolver(editCollaboratorsValidationSchema),
        mode: "onSubmit",
        defaultValues: {
            collaborators: initialCollaborators,
        },
    });

    const {mutateAsync: addCollab} = useAddCollaborator(documentId);

    const onSubmit = (data: editCollaboratorsDetails) => {
        // TODO, fix :P
        try {
            data.collaborators.map((c) => {
                addCollab({shareWith: c.email, permissions: c.permission});
            });
        } catch (e) {
            console.log(e);
        }
        // TODO - USE TOAST HERE
    };

    const {
        fields: collaborators,
        append: appendCollaborator,
        remove: removeCollaborator,
    } = useFieldArray({
        control: form.control,
        name: "collaborators",
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={clsx("space-y-8", className)}
            >
                <EditCollaborators
                    form={form}
                    collaborators={collaborators}
                    appendCollaborator={() =>
                        appendCollaborator({email: "", permission: "READ"})
                    }
                    removeCollaborator={removeCollaborator}
                />
                {children}
            </form>
        </Form>
    );
};

export default EditCollaboratorsForm;
