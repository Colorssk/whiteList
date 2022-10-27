import React, { useState, forwardRef, useImperativeHandle } from 'react';
import classnames from 'classnames';
import './index.less';
// eslint-disable-next-line react/display-name
const Filter = forwardRef((props,ref) => {
  const { className, title, filters, isCtrl } = props;
  const [filterEnabled, setFilterEnabled] = useState([ '全部' ]);
  const [ defaultFiltered ] = useState([ '全部' ]);
  const emitFilteredData = (res) => {
    const { title, onChange = () => { }, queryKey } = props;
    onChange({
      filterTitle: title,
      filterKey: queryKey,
      filterSelect: [].concat(res),
    });
  };
  useImperativeHandle(ref, () => ({
    initFilterEnabled,

  }));
  // eslint-disable-next-line no-unused-vars
  const initFilterEnabled = () => {
    setFilterEnabled([ '全部' ]);
  };
  const handleOnFilterItemClick = (e,filterItem) => {
    let newFilterEnabled = [];
    if (
      e.ctrlKey &&
        !/全部|ALL|All|all/.test(filterItem.title) &&
        filterEnabled[0] !== '全部'
    ) {
      newFilterEnabled = filterEnabled;
    }
    if (newFilterEnabled.indexOf(filterItem.title) !== -1) {
      newFilterEnabled = newFilterEnabled.filter(
        (item) => item !== filterItem.title
      );
    } else {
      newFilterEnabled.push(filterItem.title);
    }
    if (newFilterEnabled.length > 1) {
      newFilterEnabled = newFilterEnabled.filter(
        (item) => !/全部|ALL|All|all/.test(item)
      );
    }
    const res = isCtrl?newFilterEnabled:(newFilterEnabled.length?[ newFilterEnabled.pop() ]:[])
    setFilterEnabled(res);
    emitFilteredData(res);
    
  };
  return (
    <div className={classnames([ 'quebee-filter', className ])}
      data-default={defaultFiltered}>
      <span className={'filter-title'}>{title}</span>
      <div className={'filter-list'}>
        {filters.map((item, i) => {
          if (item.filterValue === 0) {
            return (
              <span
                disabled
                key={i}
                className={classnames({
                  topSpan: true,
                  'filter-item': true,
                  on: filterEnabled.indexOf(item.title) !== -1,
                })}
              >
                {item.title}
              </span>
            );
          } else {
            return (
              <span
                key={i}
                className={classnames({
                  'filter-item': true,
                  on: filterEnabled.indexOf(item.title) !== -1,
                })}
                onClick={(e)=>{handleOnFilterItemClick(e,item);}}
              >
                 {item.title}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
});
Filter.filterDataByKeyString = () => {
  return 123;
};

export default Filter;
