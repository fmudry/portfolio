import {FC} from "react";

import "../index.css";
import "../css/docspage.css";
import DocsNavbar from "@/components/base/DocsNavbar/docs-navbar";
import {DataTable} from "@/components/ui/DataTable/data-table";

import {columns} from "@/components/ui/DataTable/columns";
import {useDocsGetAll} from "@/hooks/useDocs";
import DataTableSkeleton from "@/components/ui/DataTable/data-table-skeleton";
import {useAuth} from "@/hooks/AuthProvider";
import {Navigate} from "react-router-dom";

const DocsPageHome: FC = () => {
    const auth = useAuth();
    if (!auth.isAuth) {
        return <Navigate to="/sign-in" />;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data: docs, isFetching} = useDocsGetAll();

    return (
        <div className="docspage fixed-height">
            <DocsNavbar className="docspage__navbar" />
            {isFetching ? (
                <DataTableSkeleton />
            ) : (
                <DataTable
                    className="docspage__table"
                    columns={columns.docsHomeColumns}
                    data={
                        docs?.items || [
                            {
                                id: "nope",
                                title: "nope",
                                automergeUrl: "none",
                                updatedAt: new Date(),
                                owner: "nope",
                                tags: [],
                            },
                        ]
                    }
                />
            )}
        </div>
    );
};

export default DocsPageHome;
