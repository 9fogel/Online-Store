import Page from '../templates/pageTemplate';

class AboutPage extends Page {
  static textObj = {
    mainTitle: 'About',
  };

  constructor(id: string) {
    super(id);
  }

  renderAbout() {
    const about = document.createElement('div');
    about.innerHTML = `
        <div class="about">
          <span>Descroption about store. Some story about brand. Maby team info</span>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>`;
    this.container.append(about);
  }

  render() {
    this.renderAbout();
    return this.container;
  }
}

export default AboutPage;
