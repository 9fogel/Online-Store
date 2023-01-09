import Component from './components';

class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderFooter() {
    const team = document.createElement('div');
    team.classList.add('footer_team');

    const gihubLogo = document.createElement('div');
    gihubLogo.classList.add('github_logo');

    const githubLinks = document.createElement('div');
    githubLinks.classList.add('github_links');

    const fogel = document.createElement('a');
    fogel.classList.add('github_link');
    fogel.href = 'https://github.com/9fogel';
    fogel.target = '_blank';
    fogel.innerHTML = '9fogel';

    const quark = document.createElement('a');
    quark.classList.add('github_link');
    quark.href = 'https://github.com/4Quark';
    quark.target = '_blank';
    quark.innerText = '4Quark';

    team.append(gihubLogo);
    team.append(githubLinks);
    githubLinks.append(fogel);
    githubLinks.append(quark);

    const year = document.createElement('span');
    year.classList.add('year');
    year.innerText = '© 2023';

    const RSSchool = document.createElement('a');
    RSSchool.classList.add('rs_logo');
    RSSchool.href = 'https://rs.school/js/';
    RSSchool.target = '_blank';

    const wrapper = document.createElement('div');
    wrapper.classList.add('footer_content');
    wrapper.append(team);
    wrapper.append(year);
    wrapper.append(RSSchool);
    this.container.append(wrapper);
  }

  render() {
    this.renderFooter();
    return this.container;
  }
}

export default Footer;
