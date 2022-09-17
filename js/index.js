var levelArr = [
  0, 2, 3, 4, 5, 7, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 29,
];
if (!parseInt(localStorage.getItem("levelNum"))) {
  document.querySelector(".resume-button").style.display = "none";
}
document.querySelector(".levelNum").innerHTML =
  "level : " + localStorage.getItem("levelNum");
var starNum = document.querySelector(".stars-count");
starCount = localStorage.getItem("starNum");
starNum.innerHTML = String(starCount);

//////////////////////////////////////////////////////////////
function newGame() {
  document.querySelector(".start-game").remove();
  document.querySelector(".main-game").style.display = "block";
  localStorage.setItem("levelNum", "1");
  localStorage.setItem("starNum", 0);
  starCount = 0;
  setTimeout(function () {
    document.querySelector(".levelNum").innerHTML =
      "level : " + localStorage.getItem("levelNum");
    var starNum = document.querySelector(".stars-count");
    starCount = localStorage.getItem("starNum");
    starNum.innerHTML = String(starCount);
    startLevel();
  }, 200);
}
///////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
function resumeGame() {
  document.querySelector(".start-game").remove();
  document.querySelector(".main-game").style.display = "block";
  var levNum = parseInt(localStorage.getItem("levelNum"));
  starCount = 0;
  for (var i = 0; i < levNum; i++) starCount += levelArr[i];
  localStorage.setItem("starNum", starCount);
  startLevel();
}

function nexeLevel() {
  document.querySelector("#next-level").style.display = "none";
  var levNum = parseInt(localStorage.getItem("levelNum"));
  localStorage.setItem("levelNum", levNum + 1);
  document.querySelector(".levelNum").innerHTML =
    "level : " + localStorage.getItem("levelNum");
  startLevel();
}

function startLevel() {
  var gameBody = document.getElementById("main-game-body");
  let level = parseInt(localStorage.getItem("levelNum"));
  console.log(level, "aaa");
  for (var i = 1; i <= levelArr[level]; i++) {
    var x1, y1, x2, y2;
    x1 = Math.floor(Math.random() * 510);
    y1 = Math.floor(Math.random() * 300);
    x2 = Math.floor(Math.random() * 510);
    y2 = Math.floor(Math.random() * 300);
    var img1 = document.createElement("img");
    var img2 = document.createElement("img");
    img1.src = "images/game-imgs/" + i + ".png";
    img1.className = "img" + i;
    img1.id = "img" + i + "s";
    img1.style.top = y1 + "px";
    img1.style.left = x1 + "px";
    gameBody.appendChild(img1);
    img2.src = "images/game-imgs/" + i + ".png";
    img2.className = "img" + i;
    img2.id = "img" + i + "2" + "s";
    img2.style.top = y2 + "px";
    img2.style.left = x2 + "px";
    gameBody.appendChild(img2);
  }
  var gameBodyImgs = document.querySelectorAll("#main-game-body img");

  var imgHelp, idHelp;
  for (var i = 0; i < gameBodyImgs.length; i++) {
    gameBodyImgs[i].addEventListener("click", function () {
      console.log(this);
      console.log(gameBodyImgs);
      if (!imgHelp) {
        imgHelp = this.className;
        idHelp = this.id;
        this.style.border = "2px solid #f5f0f8";
        document.getElementById("audio1").play();
      } else if (imgHelp && this.className == imgHelp && this.id != idHelp) {
        var removeImgs = document.getElementsByClassName(imgHelp);
        removeImgs[1].remove();
        removeImgs[0].remove();
        imgHelp = "";
        starCount++;
        localStorage.setItem("starNum", starCount);
        starNum.innerHTML = String(starCount);
        document.getElementById("audio2").play();

        if (document.querySelectorAll("#main-game-body img").length === 0) {
          document.querySelector(".levelNum2").innerHTML =
            "level : " + (parseInt(localStorage.getItem("levelNum")) + 1);
          document.querySelector("#next-level").style.display = "block";
        }
      } else if (imgHelp && this.className !== imgHelp) {
        var ele = document.getElementById(idHelp);
        ele.style.border = "";
        this.style.border = "2px solid #f5f0f8";
        imgHelp = this.className;
        idHelp = this.id;
        document.getElementById("audio1").play();
      }
    });
  }
}
