const MyReact = {
  render(Component) {
    const Comp = Component(); // Component가 호출되어 객체를 반환함
    Comp.render(); // 객체의 메서드를 호출함
    return Comp; // 객체를 반환함
  },
};

export default MyReact;
