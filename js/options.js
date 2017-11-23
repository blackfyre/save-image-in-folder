function getRVBN(rName) {
  let radioButtons = document.getElementsByName(rName);
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) return radioButtons[i].value;
  }
  return '';
}

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
}

function saveAction(event) {

  browser.storage.sync.set({
    action: getRVBN('action')
  });
  event.preventDefault();


}

document.querySelector('#add-alias').addEventListener('submit', saveAlias);
document.querySelector('#default-action').addEventListener('submit', saveAction);

function restoreOptions() {
    
  var gettingItem = browser.storage.sync.get('action');

  gettingItem.then((res) => {
    setRVBN('action', res || 'ask');
  });
}
  
document.addEventListener('DOMContentLoaded', restoreOptions);

//TODO: set a web extension id in the manifest