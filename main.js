browser.contextMenus.create({
  id: 'siif-folder-selection',
  title: browser.i18n.getMessage('contextMenuTopEntry'),
  contexts: ['image']
},onCreated);

browser.contextMenus.create({
  id: 'siif-open-options',
  title: browser.i18n.getMessage('contextMenuOptions'),
  contexts: ['image'],
  parentId: 'siif-folder-selection'
},onCreated);

browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'siif-folder-selection') {
    console.log('happy stuff');
  } else if (info.menuItemId === 'siif-open-options') {
    browser.runtime.openOptionsPage()
  }
});

/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log('Item created successfully');
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log('Item removed successfully');
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}