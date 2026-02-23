import { useEffect, useState } from "react";
import type {Contacts } from "./generated/models/ContactsModel.ts";
import { ContactsService } from "./generated/services/ContactsService.ts";

const Remote = () => {

    const [count, setCount] = useState(0);
    const [contactEntityCollection, setContactEntityCollection] = useState<Contacts[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = () => {
        const fetchContacts = async () => {
            setLoading(true);
            setError(null);

            try {
                const resultCollection = await ContactsService.getAll();
                if(resultCollection != null && resultCollection.data.length > 0) {
                    const resultDataCollection = resultCollection.data;
                    console.log(`Retrieved ${resultDataCollection.length} contacts`);
                    setCount(resultDataCollection.length);
                    setContactEntityCollection(resultDataCollection);
                }
            } 
            catch (error) {
                console.log(`Failed to fetch contacts: `, error);
                setError(`Failed to fetch contacts`);
            }
            finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }

    return (
        <div>
            <h2>Contacts</h2>
            {loading && <p>Loading contacts ..</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {!loading && !error && (
                <div>
                    <p>Total contacts: {count}</p>
                    <ul>
                        {contactEntityCollection.map((cont) => (
                            <li key={cont.contactid}>{cont.fullname}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Remote;