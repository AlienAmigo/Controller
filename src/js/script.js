const baseCode = '125673';
const downloadLinks = {
  android: './assets/UGRA.apk',
  ios: 'itms-services://?action=download-manifest&url=https://alienamigo.github.io/Controller/assets/UGRA.plist',
}

function downloadFile(filePath){
  var link=document.createElement('a');
  link.href = filePath;
  link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
  link.click();
}

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
  const modal = document.getElementById("modal-base");
  const downloadBtn = document.getElementById("download-btn");
  const androidBtn = document.getElementById("android-btn");
  const iosBtn = document.getElementById("ios-btn");
  const closeBtn = modal.querySelector('.popup__close-btn');
  let currentCode = [];
  let currentSelected = '';

  closeBtn.onclick = () => {
    modal.style.display = "none";
    currentSelected = '';
  }

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      currentSelected = '';
    }
  };

  androidBtn.onclick = () => {
    modal.style.display = "flex";
    currentSelected = 'android';
  }

  iosBtn.onclick = () => {
    modal.style.display = "flex";
    currentSelected = 'ios';
  }

  downloadBtn.onclick = () => {
    downloadFile(downloadLinks[currentSelected]);
  }

  Array(6).fill(0).forEach((_, i) => {
    const element = document.getElementById(`code-${i}`);
    element.onfocus = (e) => {
      e.target.select();
    };

    element.oninput = (e) => {
      currentCode[i] = e.data;
      downloadBtn.disabled = currentCode.join('') !== baseCode;
      if(document.getElementById(`code-${i + 1}`)) {
        document.getElementById(`code-${i + 1}`).focus();
      }
    };
  })
});
