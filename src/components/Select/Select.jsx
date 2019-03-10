import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import MUSelect from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core';

import PropTypes from "prop-types";

function Select(props) {
    const {value, onChange, name, id, items} = props;

    return (
        <MUSelect
            value={value}
            onChange={onChange}
            inputProps={{
                name: {name},
                id: {id},
            }}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {items}

        </MUSelect>
    )

}

Select.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    items: PropTypes.object.isRequired

}

export default withStyles({})(Select);