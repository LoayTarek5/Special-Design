// Local Storage Color Main
if (window.localStorage.getItem("color") != null) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color")
  );

  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");
    // Check for add active class to Selected before(Local storage)
    if (e.dataset.color === window.localStorage.getItem("color"))
      e.classList.add("active");
  });
}
let backgroundRandom = true;
let randomInterval;

if (localStorage.getItem("background-random") !== null) {
  document
    .querySelectorAll(".setting-box .box .random-btn button")
    .forEach((e) => e.classList.remove("active"));
  if (localStorage.getItem("background-random") === "true") {
    backgroundRandom = true;
    document
      .querySelector(".setting-box .box .random-btn .yes")
      .classList.add("active");
  } else {
    backgroundRandom = false;
    document
      .querySelector(".setting-box .box .random-btn .no")
      .classList.add("active");
  }
}

if (localStorage.getItem("display-bullets") !== null) {
  document
    .querySelectorAll(".setting-box .box .bullet-btn button")
    .forEach((e) => e.classList.remove("active"));

  if (localStorage.getItem("display-bullets") === "show") {
    document.querySelector(".bullets").style.display = "block";
    document
      .querySelector(".setting-box .box .bullet-btn .yes")
      .classList.add("active");
  } else {
    document.querySelector(".bullets").style.display = "none";
    document
      .querySelector(".setting-box .box .bullet-btn .no")
      .classList.add("active");
  }
}
// Setting Properties
let settingBtn = document.querySelector(".setting-box .setting-btn");
settingBtn.onclick = () => {
  // Open Setting menu and close it
  document
    .querySelector(".setting-box .setting-btn i")
    .classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
};

// color background according to data-color
let colorsOpt = document.querySelectorAll(".colors-list li");
colorsOpt.forEach((e) => (e.style.backgroundColor = e.dataset.color));

// Switch Color From Setting
colorsOpt.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Change Root Color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Add Color TO Local Storage
    window.localStorage.setItem("color", e.target.dataset.color);
    // Remove all active class then add to Selected
    addActive(colorsOpt, li);
  });
});

// Enable Or Disable the Random Background Image Land
let randomImgbtn = document.querySelectorAll(
  ".setting-box .box .random-btn button"
);
randomImgbtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Remove all active class then add to Selected
    addActive(randomImgbtn, btn);

    if (e.target.dataset.background == "yes") {
      backgroundRandom = true;
      changBackgroundImg();
      localStorage.setItem("background-random", true);
    } else {
      backgroundRandom = false;
      clearInterval(randomInterval);
      localStorage.setItem("background-random", false);
    }
  });
});

// Enable Or Disable the Bullets links

let bulletsLnk = document.querySelectorAll(
  ".setting-box .box .bullet-btn button"
);
bulletsLnk.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Remove all active class then add to Selected
    addActive(bulletsLnk, btn);
    window.localStorage.setItem("display-bullets", e.target.dataset.display);
    if (e.target.dataset.display == "show") {
      document.querySelector(".bullets").style.display = "block";
    } else {
      document.querySelector(".bullets").style.display = "none";
    }
  });
});

// Store images in an Array
let imgArr = [];
for (let i = 1; i <= 10; i++) {
  if (i != 10) {
    if (i == 6) imgArr.push(`0${i}.png`);
    else imgArr.push(`0${i}.jpg`);
  } else imgArr.push(`${i}.jpg`);
}

// Shuffle background Image in Landing page
function changBackgroundImg() {
  let landing = document.querySelector(".landing");
  if (backgroundRandom) {
    randomInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArr.length);
      landing.style.backgroundImage = `url(/imgs/${imgArr[randomNumber]})`;
    }, 3000);
  }
}
changBackgroundImg();

// Show Skill Bars on Scrolling Set Width of Skill Bar According to it's data-prograss
let barSpan = document.querySelectorAll(".skills .skill-bar span");
window.onscroll = () => {
  if (window.scrollY >= 900) {
    barSpan.forEach((span) => (span.style.width = span.dataset.prograss));
  }
};

// Pop up Images in Gallery Section
let imgsGallery = document.querySelectorAll(".gallery .gallery-content img");
imgsGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create OverLay to pervent any event
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");

    document.body.appendChild(overlay);
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    let imgSelected = document.createElement("img");
    imgSelected.setAttribute("src", e.target.attributes.src.value);
    imgContainer.appendChild(imgSelected);

    // Close Image Button
    let clsBtn = document.createElement("button");
    clsBtn.innerText = "X";

    // style Close Button
    clsBtn.classList.add("cls-pop");
    imgContainer.appendChild(clsBtn);
    document.body.appendChild(imgContainer);

    clsBtn.onclick = () => {
      // Remove the overlay the pop up
      imgContainer.remove();
      overlay.remove();
    };
  });
});

//  Links of sections
let allLnk = document.querySelectorAll(".links a");
let allBulletsLnk = document.querySelectorAll(".bullets a");

function scrollToSections(element) {
  element.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target.dataset.link);
      document.querySelector(`.${e.target.dataset.link}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSections(allLnk);
scrollToSections(allBulletsLnk);

// Add Active Class to Selected Element
function addActive(element, clicked) {
  element.forEach((e) => e.classList.remove("active"));
  clicked.classList.add("active");
}

// Reset Button To Reset All Setting properties
document.querySelector(".reset-setting").onclick = () => {
  localStorage.clear();
  location.reload();
};


// Toggle Menu
document.querySelector(".toggle-menu").onclick = () => {
  document.querySelector(".links").classList.toggle("open-links")
}