import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Checkbox } from 'antd';
import './index.less';

export interface PicTureProps {
  id: string;
  name: string;
  url: string;
}
interface PicSelectProps {
  value?: string[];
  onChange?: (v: string[]) => void;
  list?: PicTureProps[];
}
/** 图片选择组件，样式还没来得及写 */
const PicSelect: React.FC<PicSelectProps> = props => {
  const { value, onChange, list } = props;
  useEffect(() => {
    setLocalValue(value || []);
  }, [value]);
  const [localValue, setLocalValue] = useState<string[]>([]);
  /** 单个选择回调 */
  const singeChange = useCallback(
    (id: string) => {
      const tIndex = localValue.indexOf(id);
      let nowValue: string[] = [];
      if (tIndex !== -1) {
        nowValue = [...localValue];
        nowValue.splice(tIndex, 1);
      } else {
        nowValue = [...localValue, id];
      }
      setLocalValue(nowValue);
      onChange && onChange(nowValue);
    },
    [localValue, onChange],
  );
  /** 全选按钮是否全部选中 */
  const allCircled = useMemo(() => {
    return list?.every((item: PicTureProps) => localValue.includes(item.id));
  }, [localValue, list]);
  /** 全选按钮点击回调 */
  const allCircleChange = useCallback(() => {
    let nowValue: string[] = [];
    if (allCircled) {
      nowValue = [];
    } else {
      nowValue = [...(list?.map(item => item.id) || [])];
    }
    setLocalValue(nowValue);
    onChange && onChange(nowValue);
  }, [list, onChange, localValue, allCircled]);
  return (
    <div className="pic-select">
      <div className="pic-all-circle">
        <Checkbox checked={allCircled} onChange={allCircleChange} />
        <span>已选中{localValue.length}张</span>
      </div>
      <div className="pic-list">
        {list?.map(item => (
          <div key={item.id} className="pic-item">
            <Checkbox
              onChange={() => {
                singeChange(item.id);
              }}
              checked={localValue?.includes(item.id)}
            ></Checkbox>
            <div className="pic-item-content" style={{ backgroundImage: `url(${item.url})` }} />
            <div className="pic-item-name">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PicSelect;
