import {FC} from "react";

import "../index.css";
import "../css/docspage.css";
import DocsNavbar from "@/components/base/DocsNavbar/docs-navbar";
import {DataTable} from "@/components/ui/DataTable/data-table";

import {columns} from "@/components/ui/DataTable/columns";
import DataTableSkeleton from "@/components/ui/DataTable/data-table-skeleton";
import {useAuth} from "@/hooks/AuthProvider";
import {Navigate} from "react-router-dom";
import {useDocsShares} from "@/hooks/useDocs";

interface DocsPagesShared {
    userId?: string;
}

const DocsPageShared: FC<DocsPagesShared> = ({userId}: DocsPagesShared) => {
    const auth = useAuth();
    if (!auth.isAuth) {
        return <Navigate to="/sign-in" />;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data: docs, isFetching} = useDocsShares(userId || "");

    return (
        <div className="docspage fixed-height">
            <DocsNavbar className="docspage__navbar" />
            {isFetching ? (
                <DataTableSkeleton />
            ) : (
                <DataTable
                    className="docspage__table"
                    columns={columns.docsSharedColumns}
                    data={
                        docs?.items || [
                            {
                                id: "nope",
                                title: "nope",
                                automergeUrl: "none",
                                updatedAt: new Date(),
                                owner: "nope",
                                tags: [],
                                permissions: "READ",
                            },
                        ]
                    }
                />
            )}
        </div>
    );
};

export default DocsPageShared;
