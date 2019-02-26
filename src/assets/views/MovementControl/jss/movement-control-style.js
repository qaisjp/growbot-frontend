//root

//        flexGrow: 1,
//         width: '100%',
//         maxWidth: 345,

//card 345 maxwidth

let styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },
    media: {
        height: 140,
    },
    inline: {
        display: 'inline',
    }
});

export default styles;