import React, { Suspense } from 'react';
import { makeStyles, shorthands, Spinner, tokens } from '@fluentui/react-components';
import Layout from './components/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import AppContext from './Context.tsx';

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

    return(<>
        <Layout>
            <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route path="/" element={<AppContext />} />
                <Route path="/contacts" element={<Remote />} />
            </Routes>
            </Suspense>
        </Layout>
    </>)

}

export default App;