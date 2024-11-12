import {
    AutomergeUrl,
    isValidAutomergeUrl,
    Repo,
} from "@automerge/automerge-repo";
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket";
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb";
import {RepoContext} from "@automerge/automerge-repo-react-hooks";
import {FC} from "react";
import EditorBody from "@/components/base/EditorBody/editor-body";
import "../css/editorpage.css";
import "../index.css";
import {Button} from "@/components/ui/button";
import {useTranslation} from "react-i18next";
import DocsNavbar from "@/components/base/DocsNavbar/docs-navbar";
import {ChevronLeftIcon} from "lucide-react";
import {useAuth} from "@/hooks/AuthProvider";
import {Navigate, useLocation} from "react-router-dom";
import {docsKeys} from "@/hooks/useDocs";
import {useQueryClient} from "@tanstack/react-query";

function initAutomerge(): {
    repo: Repo;
    docUrl: AutomergeUrl;
    needsBind?: boolean;
} {
    const repo = new Repo({
        network: [new BrowserWebSocketClientAdapter("ws://localhost:6001")],
        storage: new IndexedDBStorageAdapter(),
    });

    const rootDocUrl = document.location.hash.substring(1);

    let handle;
    let needsBind;
    if (isValidAutomergeUrl(rootDocUrl)) {
        handle = repo.find(rootDocUrl);
    } else {
        handle = repo.create({text: ""});
        try {
            needsBind = true;
        } catch (e) {
            console.log(e);
        }
    }
    const docUrl = (document.location.hash = handle.url);
    const ret = {
        repo,
        docUrl,
        needsBind,
    };

    // @ts-expect-error
    window.handle = handle;
    // @ts-expect-error
    window.repo = repo;

    return ret;
}

interface EditorProps {
    documentId: string;
    automergeUrl?: string;
}

const EditorPage: FC<EditorProps> = (_props?: EditorProps) => {
    const location = useLocation();
    const props = location.state;
    console.log(props);
    const auth = useAuth();
    if (!auth.isAuth) {
        return <Navigate to="/sign-in" />;
    }
    if (props?.automergeUrl) {
        document.location.hash = props.automergeUrl;
    }

    const {t} = useTranslation();
    const {repo, docUrl, needsBind} = initAutomerge();

    if (needsBind && props) {
        const url = `http://localhost:6001/documents/bind/${props.documentId}`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({automergeUrl: docUrl}),
            credentials: "include",
        });

        const queryClient = useQueryClient();
        queryClient.invalidateQueries({queryKey: docsKeys.all});
    }

    return (
        <div className="editor fixed-height">

            <DocsNavbar className="docspage__navbar" />
            <div className="flex flex-col items-start py-4 mx-4 w-full">
                <Button
                    className="editor-button-return mb-4 flex gap-1"
                    variant={"default"}
                >
                    <ChevronLeftIcon />
                    {t("editor.return-to-docs")}
                </Button>

                <RepoContext.Provider value={repo}>
                    <EditorBody docUrl={docUrl} className="editor-body" />
                </RepoContext.Provider>
            </div>
        </div>
    );
};

export default EditorPage;
