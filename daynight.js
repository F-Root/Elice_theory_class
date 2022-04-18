function night() {
  document.querySelector("body").style.backgroundColor = "black";
  document.querySelector("body").style.color = "white";
  let as = document.querySelectorAll("a");
  for (let i = 0; i < as.length; i = i + 1) {
    as[i].style.color = "white";
  }
}
export function day() {
  // document.querySelector("body").style.backgroundColor = "white";
  $("body").css("background-color", "white");
  // document.querySelector("body").style.color = "black";
  $("body").css("color", "black");
  // let as = document.querySelectorAll("a");
  // for (let i = 0; i < as.length; i = i + 1) {
  //   as[i].style.color = "black";
  // }
  $("a").css("color", "black");
}
export function dayNight(mode) {
  if (mode === "night") {
    night();
  } else {
    day();
  }
}
