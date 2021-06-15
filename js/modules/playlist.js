import { surahList } from "../data/surahs.js";

const Playlist = ((_) => {
  let surahs = surahList;
  let currentPlayingIndex = 0;
  let currentSurah = new Audio(surahs[currentPlayingIndex].url);
  let currentCover = surahs[currentPlayingIndex].pic;
  let isPlaying = false;
  // currentSurah.currentTime = 255;
  //initialize the dom

  const playlistEl = document.querySelector(".playlist");
  const totalSurahEl = document.querySelector(".player__count");
  const playNextSurah = document.querySelector(".playNext");
  const playPrevSurah = document.querySelector(".playPrev");
  const playPauseBtn = document.querySelector(".playButton");
  const thumbnail = document.querySelector(".thumbnail");

  const init = (_) => {
    render();
    listeners();
  };

  const changeAudioSrc = (_) => {
    currentSurah.src = surahs[currentPlayingIndex].url; //change audio src to current index

    //change thumbnail src to current index
    thumbnail.src = surahs[currentPlayingIndex].pic;
  };

  //toggle play pause

  const playPauseToggle = (_) => {
    return currentSurah.paused ? currentSurah.play() : currentSurah.pause();
    //play if paused
    //pause if playing
  };
  //automatically play next audio

  const playNextAuto = (_) => {
    if (surahs[currentPlayingIndex] + 1) {
      currentPlayingIndex++;
      changeAudioSrc();
      playPauseToggle();
      render();
    }
  };

  const mainPlay = (clickedIndex) => {
    if (currentPlayingIndex === clickedIndex) {
      console.log("same index");
      playPauseToggle();
    } else {
      console.log("new index");
      currentPlayingIndex = clickedIndex;
      changeAudioSrc();
      playPauseToggle();
    }
  };

  //! listeners
  const listeners = (_) => {
    playlistEl.addEventListener("click", (e) => {
      if (e.target && e.target.matches(".pp-icon")) {
        const listElem = e.target.parentNode.parentNode; //get the li tag
        const listElemIndex = [...listElem.parentElement.children].indexOf(
          listElem
        );
        mainPlay(listElemIndex);
        render();
      }
    });
    //play next audio
    playNextSurah.addEventListener("click", (_) => {
      currentPlayingIndex++;

      if (currentPlayingIndex > surahs.length - 1) {
        currentPlayingIndex = 0;
      }
      changeAudioSrc();
      playPauseToggle();
      render();
      playPauseBtn.innerHTML = "Pause";
    });

    //play prev audio
    playPrevSurah.addEventListener("click", (_) => {
      if (currentPlayingIndex === 0) return false;
      if (currentPlayingIndex <= surahs.length - 1) {
        currentPlayingIndex--;
        changeAudioSrc();
        playPauseToggle();
        render();
      }
      playPauseBtn.innerHTML = "Pause";
    });

    //auto play next audio
    currentSurah.addEventListener("ended", () => {
      playNextAuto();
    });
    //play pause audio
    playPauseBtn.addEventListener("click", (_) => {
      playPauseToggle();
      render();
      if (playPauseBtn.innerText === "Play" && !currentSurah.paused) {
        playPauseBtn.innerText = "Pause";
      } else {
        playPauseBtn.innerText = "Play";
      }
    });

    //cover animation hover control
    thumbnail.addEventListener("mouseover", () => {
      thumbnail.classList.toggle("cover");
    });
    thumbnail.addEventListener("mouseout", () => {
      thumbnail.classList.toggle("cover");
    });
  };

  const render = (_) => {
    let markup = "";

    //! toggle play/pause Icon

    const toggleIcon = (itemIndex) => {
      if (currentPlayingIndex === itemIndex) {
        return currentSurah.paused ? "fa-play" : "fa-pause";
      }
      return "fa-play";
    };

    surahs.forEach((surah, index) => {
      markup += `
        
      <li class="playlist__surah ${
        index === currentPlayingIndex ? "playlist__surah--active" : ""
      }">
      <div class="play-pause">
        <i class="fa ${toggleIcon(index)} pp-icon"></i>
      </div>
      <div class="playlist__surah-details">
        <span class="playlist__surah-title">${surah.title}</span>
        <br />
        <span class="playlist__surah-reciter">${surah.reciter}</span>
      </div>
      <div class="playlist__surah-duration">${surah.time}</div>
    </li>
        
        
        `;
    });
    playlistEl.innerHTML = markup;
    totalSurahEl.innerHTML = `${surahs.length} Surah`;
  };
  return {
    init,
  };
})();
export default Playlist;
