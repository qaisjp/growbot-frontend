import {createMuiTheme} from "@material-ui/core/styles/index";

const styles = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#006600'
        },
        secondary: {
            main: '#339933'
        }
    }
})

export default styles;