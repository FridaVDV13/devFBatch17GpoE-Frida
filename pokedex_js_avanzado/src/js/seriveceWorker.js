// service worker
if('serviceWorker'in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(reg=>console.log('Registro de Service Worker existoso', reg))
    .then(err=>console.warn('Error al registrar el SW',err));
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type=text]').forEach( node => node.addEventListener('keypress', e => {
      if(e.keyCode == 13) {
        e.preventDefault();
      }
    }))
});