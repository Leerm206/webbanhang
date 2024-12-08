const listImage = document.querySelector(".list-images");
const imgs = listImage.getElementsByTagName("img");
const length = imgs.length;
let current = 0;

function slidechange() {
  if (current == length - 1) {
    current = 0;
    let width = imgs[0].offsetWidth;
    listImage.style.transform = `translateX(0px)`;
    document.querySelector(".active").classList.remove("active");
    document.querySelector(".index-item-" + current).classList.add("active");
  } else {
    current++;
    let width = imgs[0].offsetWidth;
    listImage.style.transform = `translateX(${width * -1 * current}px)`;
    document.querySelector(".active").classList.remove("active");
    document.querySelector(".index-item-" + current).classList.add("active");
  }
}

let autoslidechange = setInterval(slidechange, 5000);

function butright() {
  clearInterval(autoslidechange);
  slidechange();
  autoslidechange = setInterval(slidechange, 5000);
}

function butleft() {
  clearInterval(autoslidechange);
  if (current == 0) {
    current = length - 1;
    let width = imgs[0].offsetWidth;
    listImage.style.transform = `translateX(${width * -1 * current}px)`;
    document.querySelector(".active").classList.remove("active");
    document.querySelector(".index-item-" + current).classList.add("active");
  } else {
    current--;
    let width = imgs[0].offsetWidth;
    listImage.style.transform = `translateX(${width * -1 * current}px)`;
    document.querySelector(".active").classList.remove("active");
    document.querySelector(".index-item-" + current).classList.add("active");
  }
  autoslidechange = setInterval(slidechange, 4000);
}
