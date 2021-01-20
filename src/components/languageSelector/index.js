import React from 'react';
import Lang, {Languages} from '../../lang';
import {Select} from 'antd';

const LanguageSelector = () => (
  <Select
    bordered={false}
    value={Lang.id}
    dropdownMatchSelectWidth={false}
    optionLabelProp="label"
    onChange={v => {localStorage.setItem("lang", v); window.location.reload()}}
  >
    {Object.values(Languages).map((lang) => (
      <Select.Option value={lang.id} label={lang.flag}>
        {lang.flag} {lang["name.local"]}
      </Select.Option>
    ))}
  </Select>
);

export default LanguageSelector;
