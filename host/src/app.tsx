import React, { Suspense } from 'react';
import { makeStyles, shorthands, Spinner, tokens } from '@fluentui/react-components';
import Layout from './components/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Account from './Account.tsx';

// import type { Systemusers } from './generated/models/SystemusersModel.ts';
// import { SystemusersService } from './generated/services/SystemusersService.ts';


const Remote = React.lazy(() => import("mfe1/Remote"!));

const useStyles = makeStyles({
  root: {
    ...shorthands.margin(0),
    ...shorthands.padding(0),
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
});

const App = () => {

    // const [systemusersEntityCollection, setSystemUsersEntityCollection] = useState<Systemusers[]>([]);

    const styles = useStyles();
    
    const LoadingFallback = () => (
        <div className={styles.loadingContainer}>
        <Spinner size="medium" label="Loading page..." />
        </div>
    );

    

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

    return(<>
        <Layout>
            <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route path="/" element={<Account />} />
                <Route path="/contacts" element={<Remote />} />
            </Routes>
            </Suspense>
        </Layout>
    </>)

}

export default App;