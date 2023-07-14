import Player from '@vimeo/player'; 
import throttle from 'lodash.throttle';
import "simplelightbox/dist/simple-lightbox.min.css";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let isSeeking = false;

player.on('play', function() {
  console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
  console.log('title:', title);
});

player.ready().then(() => {
  const storedTime = localStorage.getItem('videoplayer-current-time');

  if (storedTime && storedTime < player.getDuration()) { 
    player.setCurrentTime(storedTime).catch(error => {
      console.error('Failed to set current time:', error); 
    });
  }

  player.on('timeupdate', throttle(() => {
    if (!isSeeking) { 
      const currentTime = player.getCurrentTime().then(time => {
        localStorage.setItem('videoplayer-current-time', time); 
      }).catch(error => {
        console.error('Failed to get current time:', error);
      });
    }
  }, 1000));

  player.on('seeking', () => {
    isSeeking = true; 
  });

  player.on('seeked', () => {
    isSeeking = false; 
  });

  window.addEventListener('beforeunload', () => {
    const currentTime = player.getCurrentTime().then(time => {
      localStorage.setItem('videoplayer-current-time', time); 
    }).catch(error => {
      console.error('Failed to get current time:', error);
    });
  });
});
