/* eslint-disable no-mixed-operators */
import React, { useState } from 'react';
import './index.less';
import { Select } from 'antd';
import { distinctByFilter } from './util'
const { Option } = Select  

const USelect = (props) => {
  const {
    showSearch,
    api,
    keyMapper,
    valueMapper,
    placeholder,
    className,
    valueItem, // 选中的data
  } = props;

  let {
    value, // 选中的key
  } = props;

  const [ searchText, setSearchText ] = useState('');
  let dataSource = props.dataSource || [];
  let loading = false;
  if (!props.dataSource && api) {
    const [ apiData, apiLoading ] = api && api(searchText) || [];
    dataSource = apiData || [];
    loading = apiLoading;
  }
  if (valueItem) {
    value = keyMapper(valueItem);
  }

  const onChange = (val) => {
    if (props.onChange) {
      const item = dataSource.find(i => keyMapper(i) === val);
      props.onChange(val, item);
    }
  };
  const onSearch = showSearch && ((val) => setSearchText(val));
  let addSelectedItemInFirstOne = true;
  if (searchText && valueItem) {
    const value = valueMapper(valueItem);
    addSelectedItemInFirstOne = value && String(value).includes(searchText);
  }

  const optionEls = [ addSelectedItemInFirstOne && valueItem, ...dataSource ]
    .filter(i => i)
    .filter(distinctByFilter(i => keyMapper(i)))
    .map((item, index) => {
      return <Option key={String(keyMapper(item, index))}>{valueMapper(item)}</Option>;
    });

  return <div className={[ 'u-select-wrapper', className ].join(' ')}>
    <Select
      allowClear={props.allowClear}
      size="small"
      className={[ 'u-select-selector', loading && 'loading' ].join(' ')}
      showSearch={showSearch}
      onSearch={onSearch}
      onChange={onChange}
      filterOption={false}
      onBlur={props.onBlur}
      placeholder={placeholder}
      style={{
        ...props.style,
      }}
      dropdownClassName="dropdownClassName"
      loading={loading}
      value={value || value === 0 ? String(value) : undefined}
    >
      {optionEls}
    </Select>
  </div>;
};

export default USelect;