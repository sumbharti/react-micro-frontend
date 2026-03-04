import { makeStyles, shorthands, Spinner, tokens } from "@fluentui/react-components";
import Layout from "./components/Layout";
import { Suspense } from "react";
import { Routes, Route } from 'react-router-dom'
import HomePage from "./HomePage";

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

    const styles = useStyles();

    const LoadingFallback = () => (
        <div className={styles.loadingContainer}>
        <Spinner size="medium" label="Loading page..." />
        </div>
    );

    return(<div className={styles.root}>
        <Layout>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Suspense>
        </Layout>
    </div>)

}

export default App;