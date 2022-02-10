import '@babel/polyfill';
import './scss/index.scss';
import video from './media/video.mp4'

let nav = document.getElementById('nav');
let square = document.getElementById('square');

nav.addEventListener('click', handleClose);
square.addEventListener('click', handlePic);
function handleClose(event) {
    if (event.currentTarget.id === 'nav') {
        if (nav.classList.contains('open')) {
            nav.classList.remove('open');
        }
        else {
            nav.classList.add('open');
        }
    }
}

function handlePic(event) {
    if (event.target.classList.contains('rotateimg180')) {
        event.currentTarget.classList.remove('rotateimg180');
        event.currentTarget.classList.add('rotateimg180-back');
    } else {
        event.currentTarget.classList.add('rotateimg180');
        event.currentTarget.classList.remove('rotateimg180-back');
    }
}