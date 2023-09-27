import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  tabs = [
    { img: 'slider_1.jpg', link: '/capabilities/design', text: 'Design' },
    { img: 'slider_2.jpg', link: '/capabilities/production', text: 'Production' },
    { img: 'slider_3.jpg', link: '/capabilities/certification', text: 'Certification' }
  ]
  images = ['slider_1.jpg', 'slider_2.jpg', 'slider_3.jpg']
  imageIndex = 0;
  idleTimeout = null;

  clearIntervalIfAvailable() {
    if (this.idleTimeout != null) {
      clearInterval(this.idleTimeout);
    }
  }

  prevImage() {
    if (this.imageIndex == 0) {
      this.imageIndex = this.images.length - 1;
    } else {
      this.imageIndex--;
    }
    this.clearIntervalIfAvailable();
  }

  nextImage() {
    if (this.imageIndex == this.images.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex++;
    }
    this.clearIntervalIfAvailable();
  }

  ngOnInit() {
    this.idleTimeout = setInterval(() => this.nextImage(), 10000)
  }

  ClickToImage(index) {
    this.imageIndex = index;
  }
}
