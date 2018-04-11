const saveButtons = Array.from(document.querySelectorAll('.article__btn--save')); // eslint-disable-line no-undef

// create function for logging in
const login = async ({ username, password }) => {
  try {
    const userInfo = await axios({ // eslint-disable-line no-undef
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
    const userInfo = await axios({ // eslint-disable-line no-undef
      url: '/api/auth/signup',
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
    return e;
  }
};

const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
};

const token = localStorage.getItem('token'); // eslint-disable-line no-undef
const id = localStorage.getItem('id'); // eslint-disable-line no-undef

// create function for storing data
const storeData = async ({ url, data, token }) => { // eslint-disable-line no-shadow
  try {
    const response = await axios({ // eslint-disable-line no-undef
      url,
      method: 'post',
      headers: { Authorization: `Bearer ${token}` },
      data,
    });

    return response;
  } catch (e) {
    return e;
  }
};

saveButtons.forEach((btn) => {
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

