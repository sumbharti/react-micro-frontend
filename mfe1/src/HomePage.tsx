import Office365 from "./office365";
import Remote from "./remote";
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
    root: {
        ...shorthands.margin("16px"),
        ...shorthands.padding("16px"),
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        '@media (max-width: 768px)': {
            ...shorthands.margin("12px"),
            ...shorthands.padding("12px"),
        },
    },
});

const HomePage = () => {
    const styles = useStyles();

    return(
        <div className={styles.root}>
            {/* Hello mfe1
            <hr />
            <Office365 />
            <hr /> */}
            <Remote />
        </div>
    )

}

export default HomePage;