const saveButtons = Array.from(document.querySelectorAll('.article__btn--save')); // eslint-disable-line no-undef
const loginForm = document.querySelector('.login__form'); // eslint-disable-line no-undef
const signUpForm = document.querySelector('.signup__form'); // eslint-disable-line no-undef
const hideFormButtons = Array.from(document.querySelectorAll('.close-form')); // eslint-disable-line no-undef

// create class that that operates the alert modal
class AlertModal {
  constructor() {
    this._modal = document.querySelector('.alert'); // eslint-disable-line no-undef

    // create font-awesome icon
    this.closeBtn = document.createElement('i'); // eslint-disable-line no-undef
    this.closeBtn.classList.add('fa');
    this.closeBtn.classList.add('fa-window-close-o');
    this.closeBtn.classList.add('alert__btn--close');
    this.closeBtn.setAttribute('aria-hidden', 'true');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  // create method for opening modal
  open({ message, alertContentArea = document.createElement('div') }) { // eslint-disable-line no-undef
    if (!message) throw new Error('Please supply a message to the open method');
    // if the backdrop element has a child element, remove it
    if (this._modal.firstChild) this._modal.removeChild(this._modal.firstChild);
    this.closeBtn.onclick = this.close;
    const messageText = document.createTextNode(message); // eslint-disable-line no-undef
    alertContentArea.classList.add('alert__content');
    alertContentArea.appendChild(this.closeBtn);
    alertContentArea.appendChild(messageText);
    this._modal.appendChild(alertContentArea);
    this._modal.classList.remove('alert-close');
    this._modal.classList.add('alert-open');
  }
  // create method for closing modal
  close() {
    this._modal.classList.remove('alert-open');
    this._modal.classList.add('alert-close');
    this._modal.removeChild(this._modal.firstChild);
  }
}

const showBackdrop = (elem) => {
  elem.parentElement.classList.add('show-form');
  elem.parentElement.classList.remove('hide-form');
};

// make functions that hide forms
const showLoginForm = () => showBackdrop(loginForm);
const showSignUpForm = () => showBackdrop(signUpForm);

// create function for logging in
const login = async ({ username, password }) => {
  try {
    const { data: userInfo } = await axios({ // eslint-disable-line no-undef
      url: '/api/auth/signin',
      data: {
        username,
        password,
      },
      method: 'post',
    });

    const { token, id } = userInfo.data;

    // store token and user id in local storage
    localStorage.setItem('token', token); // eslint-disable-line no-undef
    localStorage.setItem('id', id); // eslint-disable-line no-undef

    return userInfo;
  } catch (e) {
    return e.message;
  }
};

// create function for singing up
const signUp = async ({ username, password }) => {
  try {
    const { data: userInfo } = await axios({ // eslint-disable-line no-undef
      url: '/api/auth/signup',
      data: {
        username,
        password,
      },
      method: 'post',
    });

    const { token, id } = userInfo;

    // store token and user id in local storage
    localStorage.setItem('token', token); // eslint-disable-line no-undef
    localStorage.setItem('id', id); // eslint-disable-line no-undef
    return userInfo;
  } catch (e) {
    return e;
  }
};

const signOut = () => {
  localStorage.removeItem('token'); // eslint-disable-line no-undef
  localStorage.removeItem('id'); // eslint-disable-line no-undef
};


// create function for storing data
const storeData = async ({ url, data }) => { // eslint-disable-line no-shadow
  try {
    const token = localStorage.getItem('token'); // eslint-disable-line no-undef
    const { data: response } = await axios({ // eslint-disable-line no-undef
      url,
      method: 'post',
      headers: { Authorization: `Bearer ${token}` },
      data,
    });

    return response;
  } catch (e) {
    const { message } = e.response.data.error;
    const storeErr = new AlertModal();
    if (e.response.status === 401) storeErr.open({ message });
    else return storeErr.open({ message: 'Oops! Something went wrong. :(' });
  }
};

saveButtons.forEach((btn) => {
  const token = localStorage.getItem('token'); // eslint-disable-line no-undef
  const id = localStorage.getItem('id'); // eslint-disable-line no-undef
  btn.onclick = async function () { // eslint-disable-line no-param-reassign
    const getAttrValue = dataName => this.attributes.getNamedItem(`data-${dataName}`).nodeValue;
    // get values from the DOM
    const attrList = ['date', 'time', 'author-name', 'author-info', 'title', 'subtitle', 'url', 'image'];
    const data = attrList
      .map(attr => (attr && { [attr]: getAttrValue(attr) }))
      .reduce((acc, item) => {
        if (item['author-info']) {
          acc.author.authorInfo = item['author-info'];
        } else if (item['author-name']) {
          acc.author.name = item['author-name'];
        } else if (item.date) {
          acc.publicationDate.date = item.date;
        } else if (item.time) {
          acc.publicationDate.time = item.time;
        } else {
          acc = { ...acc, ...item }; // eslint-disable-line no-param-reassign
        }
        return acc;
      }, { author: { name: null, authorInfo: null }, publicationDate: { date: null, time: null } });

    // store values in database
    const url = `/api/users/${id}/articles`;
    const newData = await storeData({
      url,
      token,
      data,
    });
  };
});

// login
loginForm.onsubmit = async function (event) {
  event.preventDefault();
  const formData = new FormData(this); // eslint-disable-line no-undef
  const username = formData.get('username');
  const password = formData.get('password');
  const userData = await login({
    username,
    password,
  });
  return userData;
};

// sign up
signUpForm.onsubmit = async function (event) {
  event.preventDefault();
  const formData = new FormData(this); // eslint-disable-line no-undef
  const username = formData.get('username');
  const password = formData.get('password');
  const userData = await signUp({
    username,
    password,
  });
  return userData;
};

// hide form
hideFormButtons.forEach((btn) => {
  btn.onclick = function (e) {
    e.preventDefault();
    const backdrop = this.parentNode.parentNode;
    // hide backdrop by switching classes
    backdrop.classList.remove('show-form');
    backdrop.classList.add('hide-form');
  };
});

