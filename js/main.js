var init = false;

function initScript() {

  if (init) {
    return false;
  }

  browser.contextMenus.create({
    id: 'siif-folder-selection',
    title: browser.i18n.getMessage('contextMenuTopEntry'),
    contexts: ['image'],
    icons: {
      '16': 'icons/16/003-folder.png',
      '32': 'icons/32/003-folder.png'
    }
  },onCreated);
  
  var getStoredFolders = browser.storage.local.get('folders');
  
  getStoredFolders.then((result) => {
    var folders = result.folders;
    
    var i = 0;
    for (let key in folders) {
      if (folders.hasOwnProperty(key)) {
  
        browser.contextMenus.create({
          id: `siif-save-${i}`,
          title: key,
          parentId: 'siif-folder-selection',
          icons: {
            '16': 'icons/16/001-folder.png',
            '32': 'icons/32/001-folder.png'
          },
          onclick: (info) => {
            console.log(info);
            
            browser.downloads.download({
              url: info.srcUrl
            });
            
          }
        });
  
        i++;
  
      }
    }
  });
  
  browser.contextMenus.create({
    id: 'siif-open-options',
    title: browser.i18n.getMessage('contextMenuOptions'),
    parentId: 'siif-folder-selection',
    icons: {
      '16': 'icons/16/002-multimedia.png',
      '32': 'icons/32/002-multimedia.png'
    }
  },onCreated);
  
  browser.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === 'siif-folder-selection') {
      console.log('happy stuff');
    } else if (info.menuItemId === 'siif-open-options') {
      browser.runtime.openOptionsPage();
    }
  });

  init = true;
}




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

(() => { 
  var getDefaultAction = browser.storage.local.get('action');

  getDefaultAction.then((result) => {
    browser.downloads.FilenameConflictAction = result.action || 'prompt';

    initScript();
  });
})();