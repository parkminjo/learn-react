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
  hooks[currentHook] = hooks[currentHook] || initialValue; // 0번째 훅이 아직 정의되지 않았다면 초기값을 할당함
  const hookIndex = currentHook; // 현재 훅의 인덱스를 저장함

  const setState = (newState) => {
    if (typeof newState === 'function') {
      hooks[hookIndex] = newState(hooks[hookIndex]); // newState가 함수라면 현재 훅의 값을 인자로 전달하여 새로운 값을 계산함
    } else {
      hooks[hookIndex] = newState; // newState가 함수가 아니라면 새로운 값을 직접 할당함
    }
  };

  return [hooks[currentHook++], setState]; // hooks[currentHook++]는 현재 훅의 값을 반환하고, currentHook을 증가시킴
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
