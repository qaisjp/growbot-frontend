import {Theme,createStyles} from '@material-ui/core/styles'

const style = (theme) => createStyles({
    content: {
        flexGrow: 1,
        backgroundColor: '#fdfdfd',
        padding: theme.spacing.unit * 3,
    },
    appFrame: {
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    }
});

export default style;