import store from "./store";
import {addListeners} from "./swipe-feat";
import {showSnackbar} from "./snackbar";

async function renderMarkup() {
  const input = document.querySelector("input");

  let main = document.querySelector("main");
  let dotsBox = document.querySelector(".box-dots");

  dotsBox && document.body.removeChild(dotsBox);
  dotsBox = document.createElement('div');

  let idVideo = '';

  main && document.body.removeChild(main);
  main = document.createElement("main");

  if(!input.value) {
    showSnackbar();
    return;
  }

  const windowSize = document.body.offsetWidth;
  let maxResults = 16;
  let countOfCards = 1;

  if (windowSize > 992) {
    countOfCards = 4;
  } else if (windowSize > 768) {
    countOfCards = 3;
  } else if (windowSize > 480) {
    countOfCards = 2;
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&type=video&q=${
      input.value
    }&key=AIzaSyCBmISPTi_svtm99LmOtfo0EKKRKhmzJOo`
  );
  const data = await response.json();

  data.items.forEach((element) => {
    idVideo += `${element.id.videoId},`;
  });

  const statisticsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${
      idVideo
    }&key=AIzaSyCBmISPTi_svtm99LmOtfo0EKKRKhmzJOo`
  );
  const statisticsData = await statisticsResponse.json();

  store.clear();
  store.add(data,statisticsData.items);

  maxResults = data.items.length;

  const slider = document.createElement("div");
  slider.className = "slider";
  const sliderInner = document.createElement("div");
  sliderInner.className = "slider-inner";

  for (let slide = 0; slide < Math.floor(maxResults / countOfCards); slide++) {
    let sliderPage = document.createElement("div");
    sliderPage.className = "slider-page";

    const offset = countOfCards * slide;
    const limit = countOfCards * (slide + 1);

    for (let index = offset; index < limit; index++) {
      let card = document.createElement("div");
      card.className = "card";

      if(statisticsData.items[index]) {
        card.innerHTML = `
        <img src=${data.items[index].snippet.thumbnails.medium.url} alt="" />
        <a href=https://www.youtube.com/watch?v=${data.items[index].id.videoId}  target="blank">
          <span> ${data.items[index].snippet.title} </span>
        </a>
        <span>
          <img src="styles/images/count.png" class="icon" alt="">
          ${statisticsData.items[index].statistics.viewCount}
        </span>
        <span>
          <img src="styles/images/icon-author.png" class="icon" alt="">
          ${data.items[index].snippet.channelTitle}
          </span>
        <span>
          <img src="styles/images/data.png" class="icon" alt="">
          ${data.items[index].snippet.publishedAt.substring(0, 10)}
        </span>
        <input type="checkbox" id=${data.items[index].id.videoId}  class="del"/>
        <label for=${data.items[index].id.videoId} " class="del">Description</label>
        <div class="box-description">
          <p class="description">
            ${data.items[index].snippet.description}
          </p>
        </div>
        `;
      }


      sliderPage.appendChild(card);
      store.removeHead();
    }

    sliderInner.appendChild(sliderPage);
  }

  slider.appendChild(sliderInner);
  main.appendChild(slider);
  document.body.appendChild(main);

  dotsBox.className = 'box-dots';
  document.body.appendChild(dotsBox);
}

const renderContent = async () => {
  await renderMarkup();
  addListeners();
};

export { renderContent };