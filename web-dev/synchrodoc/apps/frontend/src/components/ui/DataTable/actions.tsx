import {FC} from "react";
import {useTranslation} from "react-i18next";

import {Settings2Icon} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    // DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import RenameDocumentForm from "@/components/forms/RenameDocument/rename-document-form";
import EditTagsForm from "@/components/forms/EditTagsForm/edit-tags-form";
import {Tag} from "@/types/src";
import EditCollaboratorsForm from "@/components/forms/EditCollaboratorsForm/edit-collborators-form";
import DataTableFormFooter from "./forms-footer";
import DocsApi from "@/api/docsApi";

interface ActionsProps {
    documentId: string;
    tags: Tag[];
}

const Actions: FC<ActionsProps> = ({documentId, tags}: ActionsProps) => {
    const {t} = useTranslation();

    documentId; // TODO
    // USE IN HOOKS
    // SEE iteration2 -> frontend -> src -> components -> dialogs
    // use toast ! :)o
    const _onDeleteSubmit = async () => {
        try {
            const res = DocsApi.deleteSingle(documentId);
            if (!res) {
                console.log("unable to delete");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">
                        {t("docs-table.actions-open-menu")}
                    </span>
                    <Settings2Icon className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="flex flex-col gap-1 px-3 pb-3"
            >
                <DropdownMenuLabel>{t("docs-table.actions")}</DropdownMenuLabel>

                <Sheet>
                    <SheetTrigger className="w-full" asChild>
                        <Button className="w-full">{t("docs.rename")}</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                {t("docs.rename")} {t("docs.document")}
                            </SheetTitle>
                            <SheetDescription>
                                {t("docs.rename-description")}
                            </SheetDescription>
                        </SheetHeader>

                        <RenameDocumentForm
                            children={
                                <DataTableFormFooter
                                    acceptButtonTranslation="docs.rename"
                                    rejectButtonTranslation="docs.cancel"
                                />
                            }
                            documentId={documentId}
                        />
                    </SheetContent>
                </Sheet>

                <Sheet>
                    <SheetTrigger className="w-full" asChild>
                        <Button className="w-full">
                            {t("docs.edit-tags")}
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-auto">
                        <SheetHeader>
                            <SheetTitle>{t("docs.edit-tags")}</SheetTitle>
                            <SheetDescription>
                                {t("docs.edit-tags-description")}
                            </SheetDescription>
                        </SheetHeader>

                        <EditTagsForm
                            children={
                                <DataTableFormFooter
                                    acceptButtonTranslation="docs.save-changes"
                                    rejectButtonTranslation="docs.cancel"
                                />
                            }
                            initialTags={tags}
                            documentId={documentId}
                        />
                    </SheetContent>
                </Sheet>

                <Sheet>
                    <SheetTrigger className="w-full" asChild>
                        <Button className="w-full">
                            {t("docs.edit-collaborators")}
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-auto">
                        <SheetHeader>
                            <SheetTitle>
                                {t("docs.edit-collaborators")}
                            </SheetTitle>
                            <SheetDescription>
                                {t("docs.edit-collaborators-description")}
                            </SheetDescription>
                        </SheetHeader>

                        <EditCollaboratorsForm
                            children={
                                <DataTableFormFooter
                                    acceptButtonTranslation="docs.save-changes"
                                    rejectButtonTranslation="docs.cancel"
                                />
                            }
                            documentId={documentId}
                        />
                    </SheetContent>
                </Sheet>

                <DropdownMenuSeparator />

                <Sheet>
                    <SheetTrigger className="w-full" asChild>
                        <Button className="w-full" variant={"destructive"}>
                            {t("docs.delete")}
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                {t("docs.delete")} {t("docs.document")}
                            </SheetTitle>
                            <SheetDescription>
                                {t("docs.delete-description")}
                            </SheetDescription>
                        </SheetHeader>
                        <DataTableFormFooter
                            acceptButtonTranslation="docs.delete"
                            rejectButtonTranslation="docs.cancel"
                            acceptButtonIsDestructive={true}
                            documentId={documentId}
                        />
                    </SheetContent>
                </Sheet>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Actions;
