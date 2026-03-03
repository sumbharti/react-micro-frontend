import { useCallback, useEffect, useMemo, useState } from "react";
import type { Contacts } from "./generated/models/ContactsModel.ts";
import { ContactsService } from "./generated/services/ContactsService.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHeader,
    TableHeaderCell,
    Button,
    Input,
} from "@fluentui/react-components";
import { ArrowDownRegular, ArrowUpRegular, DismissRegular } from "@fluentui/react-icons";

const PAGE_SIZE = 10;

type SortKey = "fullname" | "createdon" | "address1_line1" | "address1_line2" | "address1_city" | "address1_stateorprovince" | "address1_country" | "address1_postalcode";
const COLUMNS: { key: SortKey; label: string }[] = [
    { key: "fullname", label: "Contact Name" },
    { key: "createdon", label: "Created On" },
    { key: "address1_line1", label: "Address1 Line1" },
    { key: "address1_line2", label: "Address1 Line2" },
    { key: "address1_city", label: "Address1 City" },
    { key: "address1_stateorprovince", label: "Address1 State or Province" },
    { key: "address1_country", label: "Address1 Country" },
    { key: "address1_postalcode", label: "Address1 Postal Code" },
];

const getCellValue = (cont: Contacts, key: SortKey): string => {
    const v = cont[key];
    return v != null ? String(v) : "";
};

const Remote = () => {
    const [contactEntityCollection, setContactEntityCollection] = useState<Contacts[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("fullname");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        loadContacts();
    }, []);

    const filteredContacts = useMemo(() => {
        if (!searchQuery.trim()) return contactEntityCollection;
        const q = searchQuery.trim().toLowerCase();
        return contactEntityCollection.filter((cont) => {
            return COLUMNS.some((col) => getCellValue(cont, col.key).toLowerCase().includes(q));
        });
    }, [contactEntityCollection, searchQuery]);

    const sortedContacts = useMemo(() => {
        const list = [...filteredContacts];
        list.sort((a, b) => {
            const aVal = getCellValue(a, sortKey);
            const bVal = getCellValue(b, sortKey);
            const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
            return sortDirection === "asc" ? cmp : -cmp;
        });
        return list;
    }, [filteredContacts, sortKey, sortDirection]);

    const totalPages = Math.max(1, Math.ceil(sortedContacts.length / PAGE_SIZE));
    const paginatedContacts = useMemo(() => {
        const page = Math.min(currentPage, totalPages);
        const start = (page - 1) * PAGE_SIZE;
        return sortedContacts.slice(start, start + PAGE_SIZE);
    }, [sortedContacts, currentPage, totalPages]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredContacts.length]);

    const handleSort = useCallback((key: SortKey) => {
        setSortKey((prev) => {
            if (prev === key) {
                setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
                return prev;
            }
            setSortDirection("asc");
            return key;
        });
    }, []);

    const loadContacts = () => {
        const fetchContacts = async () => {
            setLoading(true);
            setError(null);
            try {
                const resultCollection = await ContactsService.getAll();
                if (resultCollection.data) {
                    const resultDataCollection = resultCollection.data;
                    setContactEntityCollection(resultDataCollection);
                }
            } catch (err) {
                console.log("Failed to fetch contacts: ", err);
                setError("Failed to fetch contacts");
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    };

    return (
        <div>
            <h2>Active Contacts</h2>
            {loading && <p>Loading contacts ..</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
                        <Input
                            type="search"
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChange={(_, data) => setSearchQuery(data.value ?? "")}
                            style={{ width: 320 }}
                            contentAfter={
                                searchQuery ? (
                                    <Button
                                        aria-label="Clear search"
                                        appearance="subtle"
                                        icon={<DismissRegular />}
                                        size="small"
                                        onClick={() => setSearchQuery("")}
                                    />
                                ) : undefined
                            }
                        />
                    </div>
                    <p>Total contacts: {filteredContacts.length}{searchQuery ? ` (filtered from ${contactEntityCollection.length})` : ""}</p>
                    <Table aria-label="Contacts" size="medium">
                        <TableHeader>
                            <TableRow style={{ fontWeight: 700 }}>
                                {COLUMNS.map((col) => (
                                    <TableHeaderCell
                                        key={col.key}
                                        style={{ fontWeight: 700 }}
                                        onClick={() => handleSort(col.key)}
                                    >
                                        <span style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
                                            {col.label}
                                            {sortKey === col.key
                                                ? sortDirection === "asc"
                                                    ? <ArrowUpRegular />
                                                    : <ArrowDownRegular />
                                                : null}
                                        </span>
                                    </TableHeaderCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedContacts.map((cont) => (
                                <TableRow key={cont.contactid}>
                                    <TableCell>{cont.fullname ?? "—"}</TableCell>
                                    <TableCell>{cont.createdon ?? "—"}</TableCell>
                                    <TableCell>{cont.address1_line1 ?? "—"}</TableCell>
                                    <TableCell>{cont.address1_line2 ?? "—"}</TableCell>
                                    <TableCell>{cont.address1_city ?? "—"}</TableCell>
                                    <TableCell>{cont.address1_stateorprovince ?? "—"}</TableCell>
                                    <TableCell>{cont.address1_country ?? "—"}</TableCell>
                                    <TableCell>{cont.address1_postalcode ?? "—"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {sortedContacts.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                            <Button
                                appearance="subtle"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
                            >
                                Previous
                            </Button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                appearance="subtle"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Remote;