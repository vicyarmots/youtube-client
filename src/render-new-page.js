import store from "./store";

const renderNewPage = () => {
  const items = store.getAllItems();
  const staticsItems = store.getStatics();
  const windowSize = document.body.offsetWidth;
  const maxResults = 4;
  let countOfCards = 1;

  if (windowSize > 992) {
    countOfCards = 4;
  } else if (windowSize > 768) {
    countOfCards = 3;
  } else if (windowSize > 480) {
    countOfCards = 2;
  }

  const sliderInner = document.querySelector(".slider-inner");
  const sliderWidth = document.querySelector(".slider").offsetWidth;

  for (let slide = 0; slide < Math.floor(maxResults / countOfCards); slide++) {
    let sliderPage = document.createElement("div");
    sliderPage.className = "slider-page";

    const offset = countOfCards * slide;
    const limit = countOfCards * (slide + 1);

    for (let index = offset; index < limit; index++) {
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
      <img src=${items[index].snippet.thumbnails.medium.url} alt="" /> 
      <a href=https://www.youtube.com/watch?v=${items[index].id.videoId}  target="blank"> 
        <span> ${items[index].snippet.title} </span>
      </a>
      <span> 
        <img src="styles/images/count.png" class="icon" alt="">
        ${staticsItems[index].statistics.viewCount} 
      </span>
      <span> 
        <img src="styles/images/icon-author.png" class="icon" alt="">
        ${items[index].snippet.channelTitle} 
      </span>
      <span> 
        <img src="styles/images/data.png" class="icon" alt="">  
        ${items[index].snippet.publishedAt.substring(0, 10)} 
      </span>
      <input type="checkbox" id=${items[index].id.videoId}  class="del"/>
      <label for=${items[index].id.videoId} " class="del">Description</label>
      <div class="box-description">
        <p class="description">
          ${items[index].snippet.description}
        </p>
      `;


      sliderPage.appendChild(card);
      sliderPage.setAttribute("style", `width:${sliderWidth}px`);
      store.removeHead();
    }

    sliderInner.appendChild(sliderPage);
  }
};

export { renderNewPage };
