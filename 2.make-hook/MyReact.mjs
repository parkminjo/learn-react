// 여러 개의 value를 갖기 위해 value를 배열로 관리할 필요가 있음
let hooks = [],
  currentHook = 0;

const MyReact = {
  render(Component) {
    const Comp = Component(); // Component가 호출되어 객체를 반환함
    Comp.render(); // 객체의 메서드를 호출함
    currentHook = 0; // 배열의 인덱스 초기화
    return Comp; // 객체를 반환함
  },
};

export const useState = (initialValue) => {
  hooks[currentHook] = hooks[currentHook] || initialValue;
  const hookIndex = currentHook;

  const setState = (newState) => {
    if (typeof newState === 'function') {
      hooks[hookIndex] = newState(hooks[hookIndex]);
    } else {
      hooks[hookIndex] = newState;
    }
  };

  return [hooks[currentHook++], setState];
};

export const useEffect = (callback, depArray) => {
  const hasNoDeps = !depArray;
  const prevDeps = hooks[currentHook] ? hooks[currentHook].deps : undefined;

  const prevCleanup = hooks[currentHook]
    ? hooks[currentHook].cleanup
    : undefined;

  const hasChangedDeps = prevDeps
    ? !depArray.every((el, i) => el === prevDeps[i])
    : true;

  if (hasNoDeps || hasChangedDeps) {
    if (prevCleanup) prevCleanup();
    const cleanup = callback();
    hooks[currentHook] = { deps: depArray, cleanup };
  }
  currentHook++;
};

export default MyReact;
