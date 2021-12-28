const createElement = (tag, className) => {
  const $tag = document.createElement(tag);

  if(className) {
      $tag.classList.add(className);
  }

  return $tag;
};

const stopScroll = () => {
  document.body.classList.add("disable-scroll");
};

const getScroll = () => {
  document.body.classList.remove("disable-scroll");
};



export {createElement, stopScroll, getScroll};