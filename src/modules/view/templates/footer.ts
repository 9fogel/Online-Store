import Component from './components';

class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderFooter() {
    const footer = document.createElement('div');
    footer.innerHTML = `
      <div class="wrapper">
        <div class="footer_info_wrapper">
          <div class="made_by">
            <span class="made-by">Made by </span>
            <a href="https://github.com/9fogel" target=_blank class="github_logo">9fogel</a>
            <a href="https://github.com/4Quark" target=_blank class="github_logo">4Quark</a>
          </div>
          <a href="https://rs.school/js/" target=_blank class="RSS_logo">RSSchool</a>
          <span>© Rolling Scopes School, 2022</span>
        </div>
      </div>`;
    this.container.append(footer);
  }

  render() {
    this.renderFooter();
    return this.container;
  }
}

export default Footer;
