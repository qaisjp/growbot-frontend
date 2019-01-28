import appStyle from '../../assets/app-style'
import {createStyles} from '@material-ui/core'

const styles = (theme) => createStyles({
    drawer: {
        padding: '10px',
        width: appStyle.drawerWidth,
        overFlow: 'hidden',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
    },
    drawerModal:{
        borderRight: '1.5px solid rgba(0,0,0,0.5)',
        paddingRight: '10px',
        height: '98vh',
        backgroundColor:'#654321'
    },
    list:{
        margin: '25px 0px 0px 0px',
        padding: '0px'
    },
    // add style for elevation on focus,
    listItem:{
        borderRadius: '8px',
        margin: '5px 0px 0px 0px',
        padding: 'auto 5px',
        minHeight: '100px',
        boxShadow: '0 1px 1px 1px rgba(0, 0, 0, 0.2)',
        color: 'green',
        "&:hover": {
            backgroundColor: 'white',
            // boxShadow: '2px 2px rgba(0, 0, 0, 0.3)',
        }
    },
    selected:{
        backgroundColor: 'green',
        color: 'white',
        "&:hover":{
            backgroundColor: 'green',
            color: 'white',
        }
    },
    listItemText: {
        color: 'green',
        ...appStyle.defaultFont,
        fontSize: '18px',

    },
    listItemTextSelected:{
        color: 'white',
        fontSize: '18px',
        ...appStyle.defaultFont,
    },
    image:{
        maxWidth: '200px',
        maxheight: '200px',
        margin: '20px 15px',
        padding: '5px'
    },
    divider: {
        height: '2px',
        inline: 'true'
    },
    links:{
        textDecoration: 'none',
        color: 'inherit'
    }
});

export default styles;