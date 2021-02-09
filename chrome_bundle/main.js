chrome.tabs.getSelected(null, tab => {
  document.getElementById("frame").setAttribute("src", "https://qrgen.thepeshka.ru/data#"+btoa(tab.url));
});
