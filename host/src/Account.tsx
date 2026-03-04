import { useEffect, useState } from "react";
import type { Accounts } from "./generated/models/AccountsModel";
import { AccountsService } from "./generated";


const Account = () => {

    const [count, setCount] = useState(0);
    const [accountsEntityCollection, setAccountsEntityCollection] = useState<Accounts[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      loadAccounts();
    }, []);

    const loadAccounts = () => {
        const fetchAccounts = async () => {
            setLoading(true)
            setError(null)
            
            try {
                const resultCollection = await AccountsService.getAll();
                console.log(resultCollection.success);
                if(resultCollection.data) {
                    const resultDataCollection = resultCollection.data;
                    console.log(`resultcollection: ${resultCollection} ${resultDataCollection}`)
                    console.log(`Retrieved ${resultDataCollection.length} accounts`);
                    setCount(resultDataCollection.length);
                    setAccountsEntityCollection(resultDataCollection);
                }
            } 
            catch (error) {
                console.log(`Failed to fetch accounts: `, error);
                setError(`Failed to fetch accounts`);
            }
            finally {
                setLoading(false);
            }
        }

        fetchAccounts();
    }

     /******** System Users *********
    
        const loadSystemUser = () => {
            const fetchUsers = async () => {
                setLoading(true)
                setError(null)
                try {
                const result = await SystemusersService.getAll()
                if (result.data) {
                    const users = result.data
                    console.log(`Retrieved ${users.length} accounts`)
                    setCount(users.length);
                    setSystemUsersEntityCollection(users);
                }
                } 
                catch (err) {
                console.error('Failed to retrieve users:', err)
                setError('Failed to retrieve users')
                } 
                finally {
                setLoading(false)
                }
            }
    
            fetchUsers();
        }
    
        const returnSystemUser = () => {
            return (
                <div>
                <div>
                <h2>SystemUser</h2>
                {loading && <p>Loading users</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && (
                    <div>
                    <p>Total users: {count}</p>
                    <ul>
                    {systemusersEntityCollection.map((user) => (
                        <li key={user.systemuserid}>
                        {user.fullname || 'Unknown User'}
                        </li>
                    ))}
                    </ul>
                    </div>
                )}
                </div>
            </div>
            );
        }
    
        ******************************/
    

    return (<div>
            <div>
            <h2>Accounts</h2>
            {loading && <p>Loading accounts</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
            <div>
            <p>Total accounts: {count}</p>
                <ul>
                {accountsEntityCollection.map((acct) => (
                    <li key={acct.accountid}>
                        {acct.name || 'Unknown User'}
                    </li>
                ))}
                </ul>
            </div>
            )}
            </div>
        </div>);
}

export default Account;