import store from "./store";
const preloadNewPage = async () => {
  const input = document.querySelector("input");
  const query = input.value;
  let fetchRequest;

  fetchRequest =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=" +
    store.getNextPageToken() +
    "&type=video&"+
    "&q=" +
    query +
    "&key=AIzaSyCBmISPTi_svtm99LmOtfo0EKKRKhmzJOo";


  const response = await fetch(fetchRequest);
  const data = await response.json();

  let idVideo = "";

  data.items.forEach((element) => {
    idVideo += `${element.id.videoId},`;
  });

  const statisticsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${
      idVideo
    }&key=AIzaSyCBmISPTi_svtm99LmOtfo0EKKRKhmzJOo`
  );

  const statisticsData = await statisticsResponse.json();
  store.add(data,statisticsData.items);

};

export { preloadNewPage };
