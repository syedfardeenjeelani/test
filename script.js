const modal = document.getElementById("myModal");
const contactUsBtn = document.getElementById("contactUsBtn");
const email = document.querySelector(".email");
const firstName = document.querySelector(".Firstname");
const lastName = document.querySelector(".Lastname");
const iagree = document.querySelector(".iagree");
const form = document.getElementById("form");
const slider = document.querySelector(".slider");
const images = slider.querySelectorAll("img");
const dots = document.querySelectorAll(".dot");
const imagess = images.length - 6

const activeDotSrc =
  "https://cdn-sharing.adobecc.com/content/storage/id/urn:aaid:sc:US:62beadb2-fac2-491b-90d9-5bc90d77ae70;revision=0?component_id=b7edbec1-0f7b-464e-8dae-0110db9497e0&api_key=CometServer1&access_token=1717261521_urn%3Aaaid%3Asc%3AUS%3A62beadb2-fac2-491b-90d9-5bc90d77ae70%3Bpublic_d71342ea9d011fc7a0bab7effb4c24fa8f95bbf7";
const inactiveDotSrc =
  "https://cdn-sharing.adobecc.com/content/storage/id/urn:aaid:sc:US:62beadb2-fac2-491b-90d9-5bc90d77ae70;revision=0?component_id=ccdcc25e-1c5b-4da9-a812-5c4f394b5c10&api_key=CometServer1&access_token=1717261521_urn%3Aaaid%3Asc%3AUS%3A62beadb2-fac2-491b-90d9-5bc90d77ae70%3Bpublic_d71342ea9d011fc7a0bab7effb4c24fa8f95bbf7";

let currentIndex = 0;
const imageWidth = 370;
const isPortrait = window.innerHeight > window.innerWidth;
console.log(isPortrait, window.innerHeight, window.innerWidth);
const img1 = document.getElementById("img1").src;
const img2 = document.getElementById("img2").src;
const img3 = document.getElementById("img3").src;
let autoSlideInterval;

contactUsBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append("email", email.value);
  formData.append("firstName", firstName.value);
  formData.append("lastName", lastName.value);
  formData.append("iagree", iagree.value);

  fetch("https://getform.io/f/raeqdgqa", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      form.reset();
      modal.style.display = "none";
    })
    .catch((error) => console.error("Error:", error));
});

console.log(img2, img1, img3);

const updateDots = () => {
  dots.forEach((el, index) => {
    el.src = currentIndex === index ? activeDotSrc : inactiveDotSrc;

    el.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      currentIndex = index;
      if (isPortrait) {
        images.forEach((img) => {
          if (currentIndex === 1) {
            img.src = img2;
          } else if (currentIndex === 2) {
            img.src = img3;
          } else {
            img.src = img1;
          }
        });
      } else {
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
      }
      updateDots();
    });
  });
};


updateDots();

if (!isPortrait) {
  autoSlideInterval = setInterval(nextImg, 3000);
}

function nextImg() {
  if (currentIndex === imagess - 1) {
    currentIndex = 0;
    console.log(currentIndex, imagess - 1);
    slider.style.transform = `translateX(0)`;
    updateDots();
  } else {
    currentIndex++;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
    console.log(currentIndex, imagess - 1);
    updateDots();
  }
}
