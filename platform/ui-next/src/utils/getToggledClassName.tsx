const getToggledClassName = isToggled => {
  return isToggled
    ? '!text-primary'
    : '!text-common-bright hover:!bg-[#424242] hover:text-primary-light';
};

export { getToggledClassName };
