// import Text from '../components/input-fields/Text.jsx'
import SwitchWithLabel from '../components/input-fields/SwitchWithLabel.jsx'
import Date from '../components/input-fields/Date.jsx'
import {Textarea, Datepicker, ToggleSwitch} from 'flowbite-react';
import {TextField, Switch} from '@mui/material';

import MaxSubmissions from '../components/settings-fields/MaxSubmissions.jsx'
import Boolean from '../components/settings-fields/Boolean.jsx'

const registry = {
    default: [
        {
            type: 'text',
            component: TextField,
        },{
            type: 'boolean',
            component: Boolean,
        },{
            type: 'number',
            component: TextField,
        },{
            type: 'array',
            component: TextField,
        },{
            type: 'boolean',
            component: Boolean,
        },{
            type:'datetime',
            component: Date,
        }
    ],

    custom: [
        {
            key: 'maxSubmissions',
            component: MaxSubmissions,

        },
        {
            key: 'userRestrictions',
            component: TextField,
            props: {
                type: 'number',
                size: 'small',
                variant: 'outlined',
                fullWidth: true,
                // Add more props as needed
            }
        },
        {
            key: 'allowModificationsAfterSubmission',
            component: Boolean,
        },
    ],

    // Takes the 'key' for the setting, returns a textbox if not found
    getComponent: (key) =>{
        if(!key){
            return null;
        }
        let index = registry.custom.findIndex((x)=> x.key === key);
        if(index !== -1){
            return registry.custom[index];
        }else{
            return registry.default[0];
        }
    }
}

export default registry;