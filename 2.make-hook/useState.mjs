let _val;

export const useState = (initialValue) => {
  if (!_val) {
    _val = initialValue;
  }

  function setValue(newValue) {
    _val = newValue;
  }

  return [_val, setValue];
};

// value는 무조건 새롭게 넣은 value로 초기화됨
// 모든 value값이 초기화돼서 하나의 value만 가질 수 있는 한계점을 가짐
