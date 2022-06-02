const linksOnPage = document.querySelectorAll('.nav ul li');
const formBtn = document.querySelector(".btn-email");
const input = document.querySelector(".input-email");
const hidenItems = document.querySelectorAll('.hideElem');
const modal = document.querySelector('#modal-content');
const overlay = document.querySelector('#modal-background');
const modalText = document.querySelector('#modal-content h3');
const closemodalBtn = document.querySelector('#modal-close');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuBtn = document.querySelector('.mobile');
let closeAll = [overlay, closemodalBtn]
let email = {
  value: ''
}
let fakeData = [];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hide');
      entry.target.classList.add('show')
      return;
    };
    entry.target.classList.add('hide');
    entry.target.classList.remove('show')
  })
})

const addToFakeData = (url, localData) => {
  try {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (Array.isArray(json)) {
          localData = json.map(i => i);
          console.log(localData)
        }
      })
  } catch (e) {
    console.error("Failed to fetch data");
  }
};


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const btnOff = (bool) => {
  formBtn.disabled = bool;
}

btnOff(true);

linksOnPage.forEach(i =>
  i.addEventListener('click', (e) => {
    if (!e.target.parentNode.classList.contains('off')) {
      e.preventDefault();
      let data = i.getAttribute("data-to-ankor");
      document.querySelector(`[data-ankor=${data}]`).scrollIntoView();
    }
  })
);

hidenItems.forEach(item => {
  observer.observe(item);
})

const removeModal = () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
};
//listeners

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    removeModal();
  }
});

closeAll.forEach(i => {
  i.addEventListener('click', () => {
    removeModal();
  });
})
input.addEventListener('input', (e) => {
  email.value = e.target.value;
  if (validateEmail(email.value)) {
    btnOff(false);
  }
})
formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert('Сделан Get запрос из https://jsonplaceholder.typicode.com/, результат выведен в консоль');
  addToFakeData('https://jsonplaceholder.typicode.com/users', fakeData);
  modal.classList.add('active');
  overlay.classList.add('active');
  modalText.textContent = `Спасибо за подписку, ${email.value}`;
  btnOff(true);
  input.value = '';
  email.value = '';
})
// open/close mobile menu
mobileMenuBtn.addEventListener('click', () => {
  if (mobileMenu.classList.contains('on')) {
    mobileMenu.classList.remove('on');
    mobileMenu.classList.add('off');
  } else {
    mobileMenu.classList.remove('off');
    mobileMenu.classList.add('on');
  }


});

// slider
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
const itemsCount = document.querySelectorAll('.slider-item').length;
let itemsToShow = { value: 4 };
const itemWidth = function () { return +(container.clientWidth / itemsToShow.value) };
const items = document.querySelectorAll('.slider-item');
const moveWidth = itemsToShow.value * itemWidth();
let position = 0;
// dots on bottom of slider
const dots = document.querySelectorAll('.slider-wrapper .dots .dot');
const dotsSelector = document.querySelector('.slider-wrapper .dots');
// returns active position for dot
const activeDotNum = function () {
  return Math.abs(position / moveWidth);
}
const changeitemsToShowCount = (count) => {
  return itemsToShow.value = count
};
const setNextPositions = () => {
  position += moveWidth;
  track.style.transform = `translateX(${position}px)`;
}
const setPrevPositions = () => {
  position -= moveWidth;
  track.style.transform = `translateX(${position}px)`;
}
const disabledScroll = () => {
  if (Math.abs(position) >= itemWidth() * itemsCount - (itemWidth() * itemsToShow.value)) {
    btnPrev.style.display = 'none';
  } else {
    btnPrev.style.display = '';
  }
  if (Math.abs(position) <= 0) {
    btnNext.style.display = 'none';
  } else {
    btnNext.style.display = '';
  }
  dots.forEach(i => { i ? i.classList.remove('active') : console.log(i) });
  dots[activeDotNum()] ? dots[activeDotNum()].classList.add('active') : null;
}
btnNext.addEventListener('click', () => {
  setNextPositions();
  disabledScroll();
})
btnPrev.addEventListener('click', () => {
  setPrevPositions();
  disabledScroll();
})
// adaptive slider
let FourSlide = window.matchMedia('(min-width: 1241px)');
let threeSlide = window.matchMedia('(max-width: 1240px)');
let TwoSLide = window.matchMedia('(max-width: 1000px)');
let OneSlide = window.matchMedia('(max-width: 700px)');
const sliderAdaptive = () => {
  FourSlide.matches === true ? changeitemsToShowCount(4) : null;
  threeSlide.matches === true ? changeitemsToShowCount(3) : null;
  TwoSLide.matches === true ? changeitemsToShowCount(2) : null;
  OneSlide.matches === true ? changeitemsToShowCount(1) : null;
}
window.addEventListener('resize', () => {
  sliderAdaptive();
})
sliderAdaptive();
disabledScroll();