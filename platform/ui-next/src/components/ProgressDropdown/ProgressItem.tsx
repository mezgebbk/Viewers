import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import ProgressItemDetail from './ProgressItemDetail';
import { ProgressDropdownOption, ProgressDropdownOptionPropType } from './types';

const ProgressItem = ({
  option,
  onSelect,
}: {
  option: ProgressDropdownOption;
  onSelect: (option: ProgressDropdownOption) => void;
}): ReactElement => {
  const { value } = option;

  return (
    <div
      key={value}
      className={'hover:bg-[#3a3a3a] flex cursor-pointer py-1 transition duration-1000'}
      onClick={() => onSelect(option)}
    >
      <ProgressItemDetail option={option} />
    </div>
  );
};

ProgressItem.propTypes = {
  option: ProgressDropdownOptionPropType.isRequired,
  onSelect: PropTypes.func,
};

export default ProgressItem;
