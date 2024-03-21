class Slider {
  constructor(slides, paginationObj) {
    this.slides = slides;
    this.paginationObj = paginationObj;
    this.slideIndex = 0;
    this.slideCount = this.paginationObj.dots.length;

    this.prevButton = document.querySelector('.toggle__prev');
    this.nextButton = document.querySelector('.toggle__next');

    this.prevButton.addEventListener('click', () => this.prevSlide());
    this.nextButton.addEventListener('click', () => this.nextSlide());

    this.paginationObj.dots.forEach((dot, index) => this.togglePagination(dot, index));

    this.paginationObj.texts.forEach((text, index) => this.togglePagination(text, index));
  }

  prevSlide() {
    this.slideIndex = (this.slideIndex - 1 + this.slideCount) % this.slideCount;
    this.updateSlide();
  }

  nextSlide() {
    this.slideIndex = (this.slideIndex + 1) % this.slideCount;
    this.updateSlide();
  }

  togglePagination(el, index) {
    el.addEventListener('click', () => {
      if (this.slideIndex === index) {
        return;
      } else {
        this.slideIndex = index;
        this.updateSlide();
      }
    });
  }

  updateSlide() {
    this.slides.forEach((nodeList) => {
      nodeList.forEach((el, index) => {
        if (index === this.slideIndex) {
          el.classList.replace(`${el.className}`, `${el.className}_active`);
        } else {
          el.classList.replace(`${el.className}`, `${el.className.replace('_active', '')}`);
        }
      });
    });

    Object.values(this.paginationObj).forEach((pagination) => {
      pagination.forEach((el, index) => {
        el.checked = (index === this.slideIndex) ? true : false;
      });
    });
  }
}

// Вылавливаем элементы, которые нужно изменить
const imgs = document.querySelectorAll('.slider__container img');
const values1 = document.querySelectorAll('.data__item_1 span');
const values2 = document.querySelectorAll('.data__item_2 span');
const values3 = document.querySelectorAll('.data__item_3 span');
const values4 = document.querySelectorAll('.data__item_4 span');

// Закидываем все эти элементы в массив
let allSlides = [imgs, values1, values2, values3, values4];

// Вылавливаем кнопки и пагинацию
const dotsPagination = document.querySelectorAll('.toggle__pagination input[type="radio"]');
const textsPagination = document.querySelectorAll('.slider__pagination input[type="radio"]');

// Закидываем все эти элементы в массив
// const allPagination = [dotsPagination, textsPagination];

const slider = new Slider(allSlides, {dots: dotsPagination, texts: textsPagination});
