import { preloadNewPage } from "./add-data-new-page";
import { renderNewPage } from "./render-new-page";

function calculatePageWidth() {
  const sliderWidth = document.querySelector(".slider").offsetWidth;
  const sliderPages = document.querySelectorAll(".slider-page");

  for (let i = 0; i < sliderPages.length; i++) {
      sliderPages[i].setAttribute("style", `width:${sliderWidth}px`);
  }
}

function getSliderInnerLeftValue() {
  const sliderInner = document.querySelector(".slider-inner");
  const style = window.getComputedStyle(sliderInner);
  const left = parseInt(style.getPropertyValue("left")) || 0;
  return left;
}

function addListeners() {
  const boxDots = document.querySelector('.box-dots');
  let curruntPage  = 1;

  const showDots = () => {
    boxDots.innerHTML = `
      <span>${curruntPage} </span>
      <span>  </span>
      <span>  </span>
    `;
  }
  
  const plusNumberPage = () => {
    ++curruntPage;
    boxDots.innerHTML = `
      <span>  </span>
      <span> ${curruntPage} </span>
      <span>  </span>
  `;
  }

  const minusNumberPage = () => {
    --curruntPage;
    boxDots.innerHTML = `
      <span> </span>
      <span> ${curruntPage} </span>
      <span> </span>
    `;
  }


  showDots();
  calculatePageWidth();

  window.addEventListener("resize", function() {
    calculatePageWidth();
  });

  const sliderInner = document.querySelector(".slider-inner");
  let startPosition;
  let leftPosition;

  const onMouseDown = (event) => {
    let eventX;
    eventX = event.x || event.changedTouches[0].clientX;
    startPosition = eventX;
    leftPosition = getSliderInnerLeftValue();
  };

  const onMouseMove = (event) => {
    let eventX;
    if (startPosition) {
      eventX = event.x || event.changedTouches[0].clientX
      sliderInner.setAttribute(
        "style",
        `left: ${-(startPosition - eventX - leftPosition)}px`
      );
    }
  };

  const onMouseUp = async (event) => {
    let eventX; 
    eventX = event.x || event.changedTouches[0].clientX;
    const mouseOffset = startPosition - eventX;
    startPosition = 0;

    if (Math.abs(mouseOffset) > 150) {
      const sliderWidth = document.querySelector(".slider").offsetWidth;
      const sliderInner = document.querySelector(".slider-inner");
      const left =
        mouseOffset > 0
          ? leftPosition - sliderWidth
          : leftPosition + sliderWidth;
      
      if(mouseOffset < 0) {
        minusNumberPage();
      } else {
        plusNumberPage();
      }
      
      sliderInner.setAttribute("style", `left: ${left}px`);
      await preloadNewPage();
      renderNewPage();
    } else {
      sliderInner.setAttribute("style", `left: ${leftPosition}px`);
    }
  };

  sliderInner.addEventListener('mousedown', onMouseDown, false);
  sliderInner.addEventListener('touchstart', onMouseDown, false);

  sliderInner.addEventListener('mousemove', onMouseMove, false);
  sliderInner.addEventListener('touchmove', onMouseMove, false);

  sliderInner.addEventListener('mouseup', onMouseUp, false);
  sliderInner.addEventListener('touchend', onMouseUp, false);
}

export {addListeners};