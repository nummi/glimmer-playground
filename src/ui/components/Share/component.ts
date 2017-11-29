import Component, { tracked } from '@glimmer/component';

export default class extends Component {
  @tracked fullUrl = '';
  @tracked tinyUrl = '';
  @tracked fullUrlCopied = false;
  @tracked tinyUrlCopied = false;

  constructor(options) {
    super(options);
    this.fullUrl = window.location.href;
  }

  generateTinyurl() {
    let url = "https://tinyurl.com/api-create.php?url=" + this.fullUrl;
    this.tinyUrl = 'https://tinyurl.com/blablabla';
  }

  copyToClipboard(id, successProperty) {
    let input = <HTMLInputElement>document.getElementById(id);

    if (input && input.select) {
      input.select();

      try {
        document.execCommand('copy');
        this[successProperty] = true;
      }
      catch (err) {
        alert('please press ctrl/cmd+c to copy');
      }
    }
  }
}
