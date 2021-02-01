import React from 'react';
import i18n from 'i18next';

import db from '../../../db.json';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useState } from 'react';


export default function LanguageSelect() {
  const [lng, setLng] = useState(i18n.language);

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div style={{marginLeft: '16px'}}>
        <Select
          value={i18n.language}
          onChange={handleChange}
        >
          <MenuItem value={'pt'}><img src={db.brasil} height="30px"/></MenuItem>
          <MenuItem value={'en'}><img src={db.usa} height="30px"/></MenuItem>
        </Select>
    </div>
  );
}