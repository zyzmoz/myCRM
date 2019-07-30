import React, {useState} from 'react';
import {FormControl} from 'react-bootstrap';

const DropdownInput = ({name, list, listField, keyField, onChange, onSelect, placeholder, value }) => { 
  const [showList, setShowList] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    onChange(e);    
  }  

  const handleSelect = (item) => {    
    console.log('Click');
    onSelect(item);
    value = item[listField];    
  }
  return (
    <div className="dropdown-input">
      <FormControl
        name={name}
        type="text"
        placeholder={placeholder}       
        onChange={e => { handleChange(e); }}  
        value={inputValue} 
        
      />
      {(list && list.length > 0 &&  showList ) &&  <ul className="dropdown">
        {
          list.map(item => 
            <li
              onClick={() => handleSelect(item)}
             key={item[keyField]}>{item[listField]}</li>)}
      </ul>}
      
    </div>
  );
};

export default DropdownInput;