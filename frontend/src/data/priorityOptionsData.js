
import { lightGreen, cyan, amber, red } from "@mui/material/colors";

const priorityOptionsData = {
    1: {
        label: "Low",
        color: lightGreen[500],
    },
    2: {
        label: "Medium",
        color: cyan[500],
    },
    3: {
        label: "High",
        color: amber[500],
    },
    4: {
        label: "Critical",
        color: red[500],
    },
};

// Object.keys(priorityOptionsData) this is an array of 4 keys [1,2,3,4]

// console.log('return from priority Data',Object.keys(priorityOptionsData).map(key => ({ key, ...priorityOptionsData[key], value: key })))
// return an array of {
    // "key": "2",
    // "label": "Medium",
    // "color": "#00bcd4",
    // "value": "2"}

export const priorityOptionsDataList = Object
    .keys(priorityOptionsData)
    .map(key => ({ key:key, ...priorityOptionsData[key], value: key }));

export default priorityOptionsData;