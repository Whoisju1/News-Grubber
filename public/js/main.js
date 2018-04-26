/* eslint no-plusplus: 0 */
const saveButtons = Array.from(document.querySelectorAll('.article__btn--save')); // eslint-disable-line no-undef
const hideFormButtons = Array.from(document.querySelectorAll('.close-form')); // eslint-disable-line no-undef
const signInBtn = document.querySelector('.header__auth--signin'); // eslint-disable-line no-undef
const signUpBtn = document.querySelector('.header__auth--signup'); // eslint-disable-line no-undef
const links = Array.from(document.querySelectorAll('a[data-location]')); // eslint-disable-line no-undef
const savedArticlesLink = document.querySelector('.nav__link--saved-articles'); // eslint-disable-line no-undef
const dropDown = document.querySelector('.header__dropdown'); // eslint-disable-line no-undef
const userImg = document.querySelector('.header__auth--img'); // eslint-disable-line no-undef
const signOutElem = document.querySelector('#dropdown-sign-out'); // eslint-disable-line no-undef

class ModalAuthForm {
  constructor({ formLabel, inputPlaceholder, submitBtnVal }) {
    this._template = document.createElement('template'); // eslint-disable-line no-undef
    this._template.innerHTML = `
      <div class="backdrop">
        <form class="auth-form">
        <i class="fa fa-close close-form" aria-hidden="true"></i>
          <label class="auth-form__label">${formLabel}</label>
          <input
            class="auth-form__input auth-form__input--username"
            name="username"
            placeholder="${inputPlaceholder}"
            required
            autofocus
          />
          <input type="password"
            placeholder="Password"
            name="password"
          />
          <input type="submit"
            class="auth-form__input--submit"
            value="${submitBtnVal}"
            required
          />
        </form>
      </div>
    `;

    this._fragment = this._template.content.cloneNode(true);
    this._form = this._fragment.querySelector('form');
    this._backdrop = this._fragment.querySelector('.backdrop');
    this._closeBtn = this._fragment.querySelector('.close-form');
    this.mount = this.mount.bind(this);
    this.unmount = this.unmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getFormData = this.getFormData.bind(this);
    this._closeBtn.addEventListener('click', this.unmount);
  }

  onSubmit(handleSubmit) {
    this._form.addEventListener('submit', handleSubmit);
    return this._fragment;
  }

  mount(parent) {
    parent.appendChild(this._fragment);
  }

  unmount() {
    this._backdrop.remove();
  }

  getFormData() {
    const formData = new FormData(this._form); // eslint-disable-line no-undef
    return {
      username: formData.get('username'),
      password: formData.get('password'),
    };
  }
}

// get target elements
const contentContainers = Array.from(document.querySelectorAll('.content-container')); // eslint-disable-line no-undef

// load the page that the hash matches on startup
contentContainers.forEach((section) => {
  if (window.location.hash.substr(1) === section.getAttribute('id')) { // eslint-disable-line no-undef
    section.style.display = 'grid';
  } else {
    section.style.display = 'none';
  }
});

// make sure home page is loaded at the root
if (!window.location.hash) document.querySelector('#home').style.display = 'grid'; // eslint-disable-line no-undef

// create function to active link
const highlightTarget = () => {
  links.forEach((anchorTag) => {
    if (anchorTag.getAttribute('data-location') === window.location.hash) { // eslint-disable-line no-undef
      anchorTag.classList.add('active-link');
    } else if (!window.location.hash) { // eslint-disable-line no-undef
      document.querySelector('a[data-location]').classList.add('active-link'); // eslint-disable-line no-undef
    } else {
      anchorTag.classList.remove('active-link');
    }
  });
};

// highlight selected link on startup
highlightTarget();

links.forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
    // get the hash from the clicked anchor tag
    const hash = e.target.getAttribute('data-location');

    // set the hash from the anchor tag to the url
    window.history.pushState({}, '', hash); // eslint-disable-line

    // highlight clicked link when it is clicked
    highlightTarget();

    // if it is displayed make it invisible
    contentContainers.forEach((contentContainer) => {
      const id = hash.substring(1); // eslint-disable-line no-unused-vars
      if (contentContainer.getAttribute('id') !== id) {
        contentContainer.style.display = 'none';
      } else {
        contentContainer.style.display = 'grid';
      }
    });
    return false;
  };
});

// create class that shows notifications
class CustomNotification {
  constructor({ message = 'Success', type }) {
    if (!type) throw Error('Please provide a type');
    if (type === 'success' || type === 'failure') {
      this._type = type;
    } else {
      throw Error('type must be a string of success or failure');
    }

    this._message = message;
    this._container = document.createElement('div'); // eslint-disable-line no-undef
    this._container.classList.add('notification');
    this._container.classList.add(`notification--${this._type}`);
    this._container.appendChild(document.createTextNode(this._message)); // eslint-disable-line
    document.body.appendChild(this._container); // eslint-disable-line no-undef
  }

  notify() {
    this._container.classList.add('notification__appear');
    setTimeout(() => {
      this._container.classList.add('notification__disappear');
    }, 5000);
  }
}

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

// make class that toggles the elements in the user section in the header
class HeaderUserSection {
  constructor() {
    this._headerLoggedIn = document.querySelector('.header__auth--logged-in'); // eslint-disable-line no-undef
    this._headerLoggedOut = document.querySelector('.header__auth--logged-out'); // eslint-disable-line no-undef
    this._userImage = document.querySelector('.header__auth--img'); // eslint-disable-line no-undef
    this._username = document.querySelector('.header__auth--username'); // eslint-disable-line no-undef

    this.showUser = this.showUser.bind(this);
    this.showAuth = this.showAuth.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  showUser() {
    const img = (localStorage.getItem('img') !== 'null' && // eslint-disable-line no-undef
    localStorage.getItem('img') !== 'undefined' && // eslint-disable-line no-undef
    localStorage.getItem('img') !== null) ? // eslint-disable-line no-undef
      localStorage.getItem('img') : // eslint-disable-line no-undef
      '/images/user_profile_image.png';
    const username = localStorage.getItem('username'); // eslint-disable-line no-undef
    this._userImage.setAttribute('src', img);
    this._username.textContent = username; // eslint-disable-line no-undef
    this._headerLoggedIn.style.display = 'grid';
    this._headerLoggedOut.style.display = 'none';
  }

  showAuth() {
    this._headerLoggedIn.style.display = 'none';
    this._headerLoggedOut.style.display = 'grid';
    this._userImage.setAttribute('src', '');
    this._username.textContent = '';
  }
  checkLogin() {
    return !!localStorage.getItem('token'); // eslint-disable-line no-undef
  }
}

const changeHeaderUserSection = new HeaderUserSection();
changeHeaderUserSection.checkLogin() ? changeHeaderUserSection.showUser() : changeHeaderUserSection.showAuth(); // eslint-disable-line

// create error alert for error messages using AlertModal class
const handleFetchError = (ErrClass => (err) => {
  const fetchErr = new ErrClass();
  if (err.message === 'Network Error') return fetchErr.open({ message: 'Network Error! Please check your Internet connection' });
  if (!err.response) return fetchErr.open({ message: 'Oops! Something went wrong. :(' });
  const { message } = err.response.data.error;
  if (err.response.data) fetchErr.open({ message });
})(AlertModal);

class Auth {
  constructor() {
    this.loginState = !!localStorage.getItem('token'); // eslint-disable-line no-undef
    this.authElement = document.querySelector('.header__auth'); // eslint-disable-line no-undef
  }

  // login user
  async signIn({ username, password }, callback) {
    try {
      const { data: userInfo } = await axios({ // eslint-disable-line no-undef
        url: '/api/auth/signin',
        data: {
          username,
          password,
        },
        method: 'post',
      });

      const {
        token,
        id,
        username: signedInUser,
        profileImageURL,
      } = userInfo;

      // clear out old items
      localStorage.removeItem('token'); // eslint-disable-line no-undef
      localStorage.removeItem('id'); // eslint-disable-line no-undef

      // store token and user id in local storage
      localStorage.setItem('token', token); // eslint-disable-line no-undef
      localStorage.setItem('id', id); // eslint-disable-line no-undef
      localStorage.setItem('username', signedInUser); // eslint-disable-line no-undef
      localStorage.setItem('img', profileImageURL); // eslint-disable-line no-undef
      changeHeaderUserSection.showUser();
      callback();
      const successfulLogin = new CustomNotification({
        type: 'success',
        message: `Successfully logged in as ${userInfo.username}.`,
      });
      changeHeaderUserSection.showUser();
      successfulLogin.notify();
      return userInfo;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  // sign sign up user
  async signUp({ username, password }, callback) {
    if (this.everythingAuth) return;
    try {
      const { data: userInfo } = await axios({ // eslint-disable-line no-undef
        url: '/api/auth/signup',
        data: {
          username,
          password,
        },
        method: 'post',
      });

      const {
        token,
        id, username: newUser,
        profileImageURL,
      } = userInfo;
      callback();
      // clear out old items
      localStorage.removeItem('token'); // eslint-disable-line no-undef
      localStorage.removeItem('id'); // eslint-disable-line no-undef
      // store token and user id in local storage
      localStorage.setItem('token', token); // eslint-disable-line no-undef
      localStorage.setItem('id', id); // eslint-disable-line no-undef
      localStorage.setItem('username', newUser); // eslint-disable-line no-undef
      localStorage.setItem('img', profileImageURL); // eslint-disable-line no-undef
      const accountCreated = new CustomNotification({
        type: 'success',
        message: 'Account Created Successfully',
      });
      changeHeaderUserSection.showUser();
      accountCreated.notify();
      return userInfo;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  // sign out user
  signOut() {
    localStorage.removeItem('token'); // eslint-disable-line no-undef
    localStorage.removeItem('id'); // eslint-disable-line no-undef
    changeHeaderUserSection.showAuth();
  }
}

const auth = new Auth();

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
    const successfulSave = new CustomNotification({ type: 'success', message: 'Article added to your collection' });
    successfulSave.notify();
    return response;
  } catch (e) {
    return handleFetchError(e);
  }
};
// Make function and event handlers to toggles header drop down and to sign user out
const handleSignOut = (e) => {
  e.preventDefault();
  // logout user
  auth.signOut();
};

// create function that hides dropdown
const hideDropdown = () => {
  dropDown.classList.add('dropdown-disappear');
  dropDown.classList.remove('dropdown-appear');
};

// create function that shows dropdown
const showDropdown = () => {
  dropDown.classList.add('dropdown-appear');
  dropDown.classList.remove('dropdown-disappear');
};

const toggleDropDown = () => {
  if (dropDown.classList.contains('dropdown-appear')) {
    hideDropdown();
  } else {
    showDropdown();
  }
};

// show dropdown when user image is clicked
userImg.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleDropDown();
}, true);

// hide dropdown when any dropdown item is clicked
Array.from(document.querySelectorAll('.header__dropdown-item')) // eslint-disable-line no-undef
  .forEach(elem => elem.addEventListener('click', hideDropdown));

// logout user when the logout option in the dropdown is clicked
signOutElem.addEventListener('click', handleSignOut);

window.addEventListener('click', (e) => { // eslint-disable-line no-undef
  // close dropdown when uer clicks anything that is not dropdown
  if (e.target !== document.querySelector('.header__auth--img')) hideDropdown(); // eslint-disable-line no-undef
}, false);
class SavedArticles {
  constructor() {
    // grab container
    this._container = document.querySelector('#saved-articles'); // eslint-disable-line no-undef
    this.populateContainer = this.populateContainer.bind(this);
    this.getAllArticles = this.getAllArticles.bind(this);
    this.empty = this.empty.bind(this);
    this.insertPlaceholder = this.insertPlaceholder.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.addNote = this.addNote.bind(this);
    this._form_id = 0;
  }

  // empty container
  empty() {
    this._container.innerHTML = '';
  }

  // create function to print placeholder content when there's no data to populate this section
  insertPlaceholder(placeholderText) {
    this.empty();
    this._container.innerHTML = `
      <div class="saved-article__placeholder">
        ${placeholderText}
      </div>
    `;
  }

  // create method to populate page
  populateContainer({
    _id: articleID,
    url,
    title,
    subTitle,
    image,
    author,
    publicationDate,
    notes = null,
  }) {
    const contentWrapper = document.createElement('div'); // eslint-disable-line no-undef
    contentWrapper.classList.add('saved-article');
    const formId = `note-form-${articleID}`;
    // create content to place inside of content wrapper
    const content = `
      <a class="saved-article__img-wrapper" href="${url}" target="article image" target="_blank">
        <img class="saved-article__img" src="${image}"/>
      </a>
      <div class="saved-article__content" id="saved-article-${articleID}">
        <a class="saved-article__title" href="${url}">
          <h1 class="saved-article__title--main">${title}</h1>
          <h2 class="saved-article__title--sub">${subTitle}</h2>
        </a>
        <a class="saved-article__author" href="${author.authorInfo || ''}">
          ${author.name || ''}
        </a>
        <div class="saved-article__date">
          <span class="saved-article__date--date">${publicationDate.date || ''}</span>
          <span class="saved-article__date--time">${publicationDate.time || ''}</span>
        </div>
      </div>
      <button class="saved-article--dlt" id="article-dlt-${articleID}" data-id="${articleID}"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
      <div class="saved-articles__action">
      <div class="saved-articles__action--btn-area">
      <a class="saved-article--add" id="add-note-${articleID}"><i class="fa fa-plus-square-o" aria-hidden="true"></i> Add Note</a>
      </div>
      <form class="saved-article__form" id="${formId}">
          <i class="fa fa-remove form-remove" id="form-remove-${articleID}" aria-hidden="true"></i>
          <textarea name="note" placeholder="What are your thoughts?" class="saved-article-form__input--note" id="textarea-${articleID}" required ></textarea>
          <input type="submit" value="Save Note" class="saved-article-form__input--save" />
        </form>
        <div class="notes-area" id="note-container-${articleID}">
        </div>
      </div>
    `;
    contentWrapper.innerHTML = content;
    this._container.appendChild(contentWrapper);
    const textArea = document.querySelector(`#textarea-${articleID}`); // eslint-disable-line no-undef
    const addNoteBtn = document.querySelector(`#add-note-${articleID}`); // eslint-disable-line no-undef
    const noteForm = document.querySelector(`#${formId}`); // eslint-disable-line no-undef
    const removeFormBtn = document.querySelector(`#form-remove-${articleID}`); // eslint-disable-line no-undef
    const notesContainer = document.querySelector(`#note-container-${articleID}`); // eslint-disable-line no-undef

    // write function to create a fragment that contains the form to edit notes
    const createNoteForm = ({ noteID }, callback) => {
      const fragment = document.createDocumentFragment(); // eslint-disable-line no-undef
      const noteEditBackdrop = document.createElement('div'); // eslint-disable-line no-undef
      noteEditBackdrop.classList.add('note-edit-form__backdrop');
      const noteEditForm = document.createElement('form'); // eslint-disable-line no-undef
      noteEditForm.classList.add('note-edit-form');

      // get the note from the dom
      const getNote = () => document.querySelector(`#note-content-${noteID}`).textContent.trim(); // eslint-disable-line no-undef

      noteEditForm.innerHTML = `
        <label class="note-edit-form__label">Edit Note</label>
        <textarea class="note-edit-form__textarea" name="note">${getNote()}</textarea>
        <input type="submit" value="SAVE" class="note-edit-form__submit" />
        <button class="note-edit-cancel">Leave Unedited</button>
      `;
      // add event handler to note edit form
      noteEditForm.addEventListener('submit', async (e) => {
        try {
          e.preventDefault();
          // get token and user id to get authorization
          const userID = localStorage.getItem('id'); // eslint-disable-line no-undef
          const token = localStorage.getItem('token'); // eslint-disable-line no-undef
          const noteBody = new FormData(e.target).get('note'); // eslint-disable-line no-undef
          const { data } = await axios({ // eslint-disable-line no-undef
            url: `/api/users/${userID}/notes`,
            method: 'put',
            headers: { Authorization: `Bearer ${token}` },
            data: { articleID, noteID, noteBody },
          });
          // get note from returned payload
          const [{ note: newData }] =
            data.notes.filter(returnedNote => returnedNote._id === noteID);

          callback(newData);
          noteEditBackdrop.remove();
        } catch (err) {
          handleFetchError(err);
        }
      });
      noteEditBackdrop.appendChild(noteEditForm);
      fragment.appendChild(noteEditBackdrop);

      // target the cancel button
      const cancelBtn = fragment.querySelector('.note-edit-cancel');

      // add event handler to cancel button
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // close the form when clicked
        noteEditBackdrop.remove();
      });

      return fragment;
    };

    const renderNotes = (articleNotes) => {
      notesContainer.innerHTML = '';
      if (articleNotes.length) {
        articleNotes.forEach(({ _id: noteID, note, timeCreated }) => {
          const noteContent = `
            <div class="note__content" id="note-content-${noteID}">
              ${note}
            </div>
            <i class="fa fa-edit note-edit" id="note-edit-${noteID}" aria-hidden="true"></i>
            <i class="fa fa-remove note-remove" id="note-remove-${noteID}" aria-hidden="true"></i>
            <div class="note__date">
              ${moment(timeCreated).fromNow()}
            </div>
          `;
          const noteContentWrapper = document.createElement('div'); // eslint-disable-line no-undef
          noteContentWrapper.classList.add('note');
          noteContentWrapper.innerHTML = noteContent;
          notesContainer.appendChild(noteContentWrapper);

          // make function to change content of the note
          const updateNote = (newNote) => {
            const noteContainer = document.querySelector(`#note-content-${noteID}`); // eslint-disable-line no-undef
            noteContainer.innerHTML = newNote;
          };

          // get note edit and delete buttons
          const noteEditBtn = document.querySelector(`#note-edit-${noteID}`); // eslint-disable-line no-undef
          const noteRemoveBtn = document.querySelector(`#note-remove-${noteID}`); // eslint-disable-line no-undef

          noteEditBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const noteEditForm = createNoteForm({
              note,
              noteID,
            }, updateNote);

            this._container.appendChild(noteEditForm);
          });

          noteRemoveBtn.addEventListener('click', async (e) => {
            try {
              const { target } = e;
              // get token and user id to get authorization
              const userID = localStorage.getItem('id'); // eslint-disable-line no-undef
              const token = localStorage.getItem('token'); // eslint-disable-line no-undef
              await axios({ // eslint-disable-line no-undef
                url: `/api/users/${userID}/notes`,
                method: 'delete',
                headers: { Authorization: `Bearer ${token}` },
                data: { articleID, noteID },
              });

              target.parentNode.remove();
            } catch (err) {
              handleFetchError(err);
            }
          });

          return note;
        });
      }
    };

    renderNotes(notes);

    noteForm.style.display = 'none';
    noteForm.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target); // eslint-disable-line no-undef
      const note = formData.get('note');
      const newNotes = await this.addNote({ note, articleID });
      textArea.value = '';
      renderNotes(newNotes.data.notes);
    };

    // remove form when removeFormBtn is clicked
    removeFormBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addNoteBtn.style.display = 'inline-block';
      noteForm.style.display = 'none';
    });

    // add event handler to add button to make form appear
    addNoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.style.display = 'none';
      noteForm.style.display = 'grid';
    });

    // find delete button and assign event handler to it
    const deleteBtn = document.querySelector(`#article-dlt-${articleID}`); // eslint-disable-line no-undef
    deleteBtn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      await this.deleteArticle(id);
      contentWrapper.classList.add('disappear');
      setTimeout(() => {
        contentWrapper.remove();
        if (!this._container.childNodes.length) return this.insertPlaceholder('You have no articles saved yet.');
      }, 600);
    }, true);
  }
  /* eslint class-methods-use-this: 0 */
  // create method to fetch all saved-articles
  async getAllArticles(url) {
    try {
      const token = localStorage.getItem('token'); // eslint-disable-line no-undef
      const savedArticles = await axios({ // eslint-disable-line no-undef
        url,
        headers: { Authorization: `Bearer ${token}` },
      });
      return savedArticles;
    } catch (e) {
      handleFetchError(e);
    }
  }

  async addNote({ note, articleID }) {
    try {
      const token = localStorage.getItem('token'); // eslint-disable-line no-undef
      const userID = localStorage.getItem('id'); // eslint-disable-line no-undef

      const data = await axios({ // eslint-disable-line no-undef
        url: `/api/users/${userID}/notes`,
        method: 'post',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          id: articleID,
          note,

        },
      });

      return data;
    } catch (e) {
      handleFetchError(e);
    }
  }

  async deleteArticle(id) {
    try {
      const token = localStorage.getItem('token'); // eslint-disable-line no-undef
      const userID = localStorage.getItem('id'); // eslint-disable-line no-undef

      const article = await axios({ // eslint-disable-line no-undef
        url: `/api/users/${userID}/articles`,
        method: 'delete',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          id,
        },
      });

      return article;
    } catch (e) {
      handleFetchError(e);
    }
  }
}

const savedArticles = new SavedArticles();

// make function to show saved articles page
const showSavedArticlesPage = async () => {
  const token = localStorage.getItem('token'); // eslint-disable-line no-undef
  // if user is not logged in insert placeholder text instead
  if (!token) return savedArticles.insertPlaceholder('You must be logged in to save articles.');
  const id = localStorage.getItem('id'); // eslint-disable-line no-undef
  const url = `/api/users/${id}/articles`; // eslint-disable-line no-undef
  const articles = await savedArticles.getAllArticles(url);
  if (!articles.data.length) return savedArticles.insertPlaceholder('You have no articles saved yet.');
  savedArticles.empty();
  articles.data.forEach(item => savedArticles.populateContainer(item));
};

if (window.location.hash === '#saved-articles') showSavedArticlesPage(); // eslint-disable-line no-undef

savedArticlesLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSavedArticlesPage();
  return false;
});

saveButtons.forEach((btn) => {
  btn.onclick = async function () { // eslint-disable-line no-param-reassign
    const getAttrValue = dataName => this.attributes.getNamedItem(`data-${dataName}`).nodeValue;
    // get values from the DOM
    const attrList = ['date', 'time', 'author-name', 'author-info', 'title', 'subTitle', 'url', 'image'];
    const data = attrList
      .map(attr => (attr && { [attr]: getAttrValue(attr) }))
      .reduce((acc, item) => {
        // structure properties that are suppose to be nested
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
    const token = localStorage.getItem('token'); // eslint-disable-line no-undef
    const id = localStorage.getItem('id'); // eslint-disable-line no-undef
    // store values in database
    const url = `/api/users/${id}/articles`;
    const newData = await storeData({
      url,
      token,
      data,
    });
    return newData;
  };
});

const operateLoginForm = () => {
  // create user login form
  const loginForm = new ModalAuthForm({
    formLabel: 'Login',
    inputPlaceholder: 'Username',
    submitBtnVal: 'Login',
  });

  // login
  const handleUserLogin = async (event) => {
    event.preventDefault();
    try {
      const formData = loginForm.getFormData();
      const userData = await auth.signIn(formData, loginForm.unmount);
      return userData;
    } catch (e) {
      handleFetchError(e);
    }
  };
  // sign in
  loginForm.onSubmit(handleUserLogin);

  // mount form
  loginForm.mount(document.body); // eslint-disable-line no-undef
};


const operateSignUpForm = () => {
  // create user signup form
  const signUpForm = new ModalAuthForm({
    formLabel: 'Sign Up',
    inputPlaceholder: 'Username',
    submitBtnVal: 'Sign Up',
  });

  const handleUserSignup = async (e) => {
    e.preventDefault();
    const formData = signUpForm.getFormData();
    await auth.signUp(formData, signUpForm.unmount);
  };
  // sign up
  signUpForm.onSubmit(handleUserSignup);

  // mount form
  signUpForm.mount(document.body); // eslint-disable-line no-undef
};

// hide form
hideFormButtons.forEach((btn) => {
  btn.onclick = function (e) {
    e.preventDefault();
    const thisBtn = this;
    const backdrop = thisBtn.parentNode.parentNode;
    // hide backdrop by switching classes
    backdrop.classList.remove('show-form');
    backdrop.classList.add('hide-form');
  };
});

signInBtn.addEventListener('click', operateLoginForm); // eslint-disable-line no-undef
signUpBtn.addEventListener('click', operateSignUpForm); // eslint-disable-line no-undef

// const startupAlert = new AlertModal();
// setTimeout(() => {
//   startupAlert.open({ message: 'This site is still under construction.' });
// }, 100);

