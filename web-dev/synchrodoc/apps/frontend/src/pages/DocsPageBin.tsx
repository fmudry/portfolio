import {FC} from "react";

import "../index.css";
import "../css/docspage.css";
import DocsNavbar from "@/components/base/DocsNavbar/docs-navbar";
import {DataTable} from "@/components/ui/DataTable/data-table";

import {columns} from "@/components/ui/DataTable/columns";
// import {docsData} from "@/components/ui/DataTable/mock-data";
import {useBin} from "@/hooks/useBin";
import DataTableSkeleton from "@/components/ui/DataTable/data-table-skeleton";
import {useAuth} from "@/hooks/AuthProvider";
import {Navigate} from "react-router-dom";

const DocsPageBin: FC = () => {
    const auth = useAuth();
    if (!auth.isAuth) {
        return <Navigate to="/sign-in" />;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data: docs, isFetching} = useBin();

    return (
        <div className="docspage fixed-height">
            <DocsNavbar className="docspage__navbar" />
            {isFetching ? (
                <DataTableSkeleton />
            ) : (
                <DataTable
                    className="docspage__table"
                    columns={columns.docsBinColumns}
                    data={
                        docs?.items || [
                            {
                              id: "nope",
                              title: "nope",
                              deletedAt: new Date(),
                              owner: "nope",
                            },
                        ]
                    }
                />
            )}
        </div>
    );
};

export default DocsPageBin;
