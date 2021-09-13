import React, { useState } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

export default ({label, handleDate, error, value}) => {
    const [currentDate, setNewDate] = useState(null);
    const onChange = (event, data) => {
        // setNewDate(data.value);
        handleDate(data.value);
    }
    const tempValue = value?(new Date(value)):(new Date());

    return <SemanticDatepicker label={label} onChange={onChange} error={error} value={tempValue}/>;
};

// const AppWithRangeAndInPortuguese = () => {
//   const [currentRange, setNewRange] = useState([]);
//   const onChange = (event, data) => setNewRange(data.value);

//   return <SemanticDatepicker locale="pt-BR" onChange={onChange} type="range" />;
// };