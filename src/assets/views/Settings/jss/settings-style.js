let styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
    card: {
        marginTop: theme.spacing.unit * 4,
        maxWidth: 500,
    },
    form: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        // IE 11 is for wankers.
        objectFit: 'cover',
    },
})

export default styles;