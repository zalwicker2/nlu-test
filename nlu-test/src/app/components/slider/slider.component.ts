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
  ];
  imageIndex = 0;
  idleInterval = null; // contains the interval that automatically slides if no input has been made yet

  /**
   * @function clearIntervalIfAvailable
   * If the idle interval currently exists, clear it so we don't mess with what the user wants to see.
   */
  clearIntervalIfAvailable() {
    if (this.idleInterval != null) {
      clearInterval(this.idleInterval);
    }
  }

  /**
   * @function prevImage
   * Go to the previous image in the slider. Wraps around.
   */
  prevImage() {
    if (this.imageIndex == 0) {
      this.imageIndex = this.tabs.length - 1;
    } else {
      this.imageIndex--;
    }
    this.clearIntervalIfAvailable();
  }

  /**
   * @function nextImage
   * Go to the next image in the slider. Wraps around.
   */
  nextImage() {
    if (this.imageIndex == this.tabs.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex++;
    }
    this.clearIntervalIfAvailable();
  }

  ngOnInit() {
    // setup idle interval
    this.idleInterval = setInterval(() => this.nextImage(), 10000)
  }

  /**
   * @function ClickToImage
   * @description Switch to a particular image when clicking on the dots.
   * @param index The index of the image to switch to.
   */
  ClickToImage(index) {
    this.imageIndex = index;
  }
}
