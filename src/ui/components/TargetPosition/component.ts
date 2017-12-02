import Component, { tracked } from '@glimmer/component';
import { setProperty } from '@glimmer/object-reference/dist/types/lib/object';
import debounce from 'lodash.debounce';

export default class extends Component {
  @tracked position: object = {
    top: undefined,
    left: undefined,
    width: undefined,
    height: undefined
  };

  handleResize: (event: Event) => void;

  constructor(options) {
    super(options);

    this.handleResize = debounce(() => {
      this.setPosition();
    }, 100);
  }

  didInsertElement() {
    this.setPosition();
    window.addEventListener('resize', this.handleResize);
  }

  willDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }

  setPosition() {
    const target = document.getElementById(this.args.id);

    this.position = {
      top: target.offsetTop,
      left: target.offsetLeft,
      width: target.offsetWidth,
      height: target.offsetHeight
    };
  }
}