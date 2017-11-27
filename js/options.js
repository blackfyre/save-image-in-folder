var folders = {};

/**
 * Get the radio value based on the name attr
 * @param {String} rName 
 */
function getRVBN(rName) {
  let radioButtons = document.getElementsByName(rName);
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) return radioButtons[i].value;
  }
  return '';
}

/**
 * Set the radio value based on the name attr
 * @param {String} rName 
 * @param {String} value 
 */
function setRVBN(rName, value) {
  let radioButtons = document.getElementsByName(rName);
  for (let i = 0; i < radioButtons.length; i++) {

    if (radioButtons[i].value === value) {
      radioButtons[i].checked = true;
    }

  }
}

function saveAlias(event) {
  event.preventDefault();
  let alias = document.getElementById('alias').value;
  let path = document.getElementById('path').value;

  folders[alias] = path;

  updateFolderStorate();  
}

function updateFolderStorate() {
  browser.storage.local.set({
    'folders': folders
  });

  displayFolders();
}

/**
 * Save the default action
 * @param {Event} event 
 */
function saveAction(event) {

  event.preventDefault();

  browser.storage.local.set({
    action: getRVBN('action')
  });
}

restoreOptions();

document.querySelector('#add-alias').addEventListener('submit', saveAlias);
document.querySelector('#default-action').addEventListener('submit', saveAction);

/**
 * Restores the stored options
 */
function restoreOptions() { 
  var getDefaultAction = browser.storage.local.get('action');
  var getStoredFolders = browser.storage.local.get('folders');

  getDefaultAction.then((result) => {
    setRVBN('action', result.action || 'prompt');
  });

  getStoredFolders.then((result) => {
    folders = result.folders;

    displayFolders();
  });
}

/**
 * Updates the folder listing table
 */
function displayFolders() {
  var listContainer = document.querySelector('#folderList');

  listContainer.innerHTML = '';

  for (let key in folders) {
    if (folders.hasOwnProperty(key)) {

      let row = document.createElement('tr');

      let alias = document.createElement('td');
      let aliasText = document.createTextNode(key);

      alias.appendChild(aliasText);

      let path = document.createElement('td');
      let pathText = document.createTextNode(folders[key]);

      path.appendChild(pathText);

      let action = document.createElement('td');

      let deleteItem = document.createElement('button');
      let deleteItemText = document.createTextNode('Delete');

      deleteItem.appendChild(deleteItemText);
      deleteItem.className += ' browser-style';
      deleteItem.className += ' default';
      deleteItem.className += ' block-width';

      deleteItem.addEventListener('click', (event) => {
        event.preventDefault();
        deleteFolder(key)
      });
      

      action.appendChild(deleteItem);

      row.appendChild(alias);
      row.appendChild(path);
      row.appendChild(action);
      listContainer.appendChild(row);
    }
  }
}

/**
 * 
 * @param {Event} event 
 */
function deleteFolder(key) {
  
  delete folders[key];

  updateFolderStorate();
}