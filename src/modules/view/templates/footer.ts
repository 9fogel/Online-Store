import Component from './components';

class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderFooter() {
    const team = document.createElement('div');
    team.classList.add('footer_team');
    const madeBy = document.createElement('span');
    madeBy.classList.add('made_by');
    madeBy.innerText = 'Made by ';
    const fogel = document.createElement('a');
    fogel.classList.add('github_logo');
    fogel.href = 'https://github.com/9fogel';
    fogel.target = '_blank';
    fogel.innerHTML = '9fogel';
    const Quark = document.createElement('a');
    Quark.classList.add('github_logo');
    Quark.href = 'https://github.com/4Quark';
    Quark.target = '_blank';
    Quark.innerText = '4Quark';
    team.append(madeBy);
    team.append(fogel);
    team.append(Quark);
    const RSSchool = document.createElement('a');
    RSSchool.classList.add('RSS_logo');
    RSSchool.href = 'https://rs.school/js/';
    RSSchool.target = '_blank';
    RSSchool.innerText = 'RSSchool';
    const year = document.createElement('span');
    year.innerText = '© Rolling Scopes School, 2023';
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    wrapper.append(team);
    wrapper.append(RSSchool);
    wrapper.append(year);
    this.container.append(wrapper);
  }

  render() {
    this.renderFooter();
    return this.container;
  }
}

export default Footer;
