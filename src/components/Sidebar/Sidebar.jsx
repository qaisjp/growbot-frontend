import * as React from 'react'
import styles from './sidebar-style'
import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {NavLink} from 'react-router-dom'
import classNames from 'classnames'

class Sidebar extends React.Component {
    state = {
        open: true
    };

    isSelectedRoute = (path) => {
        return window.location.pathname === path;
    };

    render () {
        const {classes} = this.props;
        return(
            <div>
                <Drawer variant='permanent'
                        open={true} className={classes.drawer}
                        PaperProps={{
                            className:classes.drawerModal
                        }}>
                    <img src="https://cdn0.iconfinder.com/data/icons/tiny-icons-1/100/tiny-15-512.png" alt="" className={classes.image}/>
                    <Divider className={classes.divider}/>
                    <List className={classes.list}>
                        {
                            this.props.routes.map((prop,key) => {
                                const isCurrPath = this.isSelectedRoute(prop.path)
                                return(
                                    <NavLink to={prop.path} className={classes.links} activeClassName={classes.selected} key={prop.name}>
                                        <ListItem button={true} key={key} divider={true}  className={classNames({[classes.listItem]:true,[classes.selected]:isCurrPath})}>
                                            <ListItemText
                                                primaryTypographyProps={{
                                                    className:isCurrPath ? classes.listItemTextSelected : classes.listItemText
                                                }}
                                            >
                                                {prop.name}
                                            </ListItemText>
                                        </ListItem>
                                    </NavLink>
                                );
                            })
                        }
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(Sidebar)