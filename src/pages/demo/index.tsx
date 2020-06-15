import React, { useState, useCallback } from 'react';
import PicSelect from '@/components/picSelect';
import './index.less';

const pictures = [
  {
    id: '1',
    name: 'foo',
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ',
  },
  {
    id: '2',
    name: 'foo',
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ',
  },
  {
    id: '3',
    name: 'foo',
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ',
  },
];
const Demo: React.FC = () => {
  const [picValue, setPicValue] = useState<string[]>([]);
  const onChange = useCallback((values: string[]) => {
    setPicValue(values);
  }, []);
  return (
    <div className="demo">
      <PicSelect list={pictures} onChange={onChange} value={picValue}></PicSelect>
    </div>
  );
};

export default Demo;
