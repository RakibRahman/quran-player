import { surahList } from "../data/surahs.js";
import TrackBar from "./tracker.js";
const Playlist = ((_) => {
  let surahs = surahList;
  let currentPlayingIndex = 0;
  let currentSurah = new Audio(surahs[currentPlayingIndex].url);

  const playlistEl = document.querySelector(".playlist");
  const totalSurahEl = document.querySelector(".player__count");
  const playNextSurah = document.querySelector(".playNext");
  const playPrevSurah = document.querySelector(".playPrev");
  const playPauseBtn = document.querySelector(".playButton");
  const thumbnail = document.querySelector(".thumbnail");
  const shuffle = document.querySelector(".shuffle");

  const shuffleSurah = (_) => {
    surahs.sort((a, b) => 0.5 - Math.random());
  };

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
  const playStatus = (_) => {
    //Toggle play/pause state on icon click

    currentSurah.paused
      ? (playPauseBtn.innerText = "Pause")
      : (playPauseBtn.innerText = "Play");
  };
  const mainPlay = (clickedIndex) => {
    if (currentPlayingIndex === clickedIndex) {
      playStatus();
      playPauseToggle();
    } else {
      currentPlayingIndex = clickedIndex;
      changeAudioSrc();
      playStatus();
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
    //! play next audio
    const playNext = (_) => {
      currentPlayingIndex++;

      if (currentPlayingIndex > surahs.length - 1) {
        currentPlayingIndex = 0;
      }
      changeAudioSrc();
      playPauseToggle();
      render();
      playPauseBtn.innerHTML = "Pause";
    };
    //! play prev audio
    const playPrev = (_) => {
      if (currentPlayingIndex === 0) return false;
      if (currentPlayingIndex <= surahs.length - 1) {
        currentPlayingIndex--;
        changeAudioSrc();
        playPauseToggle();
        render();
      }
      playPauseBtn.innerHTML = "Pause";
    };
    playNextSurah.addEventListener("click", (_) => {
      playNext();
    });
    playPrevSurah.addEventListener("click", (_) => {
      playPrev();
    });

    //! Auto Play Next Audio
    currentSurah.addEventListener("ended", () => {
      playNextAuto();
    });

    //! Tracker Event
    currentSurah.addEventListener("timeupdate", (_) => {
      TrackBar.setState(currentSurah);
    });

    //! PlayPause Button Text Update
    const playInfoUpdate = (_) => {
      if (playPauseBtn.innerText === "Play") {
        playPauseBtn.innerText = "Pause";
      } else {
        playPauseBtn.innerText = "Play";
      }
    };

    //! Play Pause Audio
    playPauseBtn.addEventListener("click", (_) => {
      playPauseToggle();
      render();
      playInfoUpdate();
    });

    //! Shuffle Button
    shuffle.addEventListener("click", (_) => {
      shuffleSurah();
      changeAudioSrc();
      playPauseToggle();
      playInfoUpdate();
      render();
    });

    //! Keyboard Controls
    window.addEventListener("keyup", (e) => {
      playInfoUpdate();
      if (e.key === " ") {
        playPauseToggle();
        render();
      }
      if (e.key === "p") {
        playPrev();
      }
      if (e.key === "n") {
        playNext();
      }
    });

    //! Cover Animation Hover Control
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
        <span class="playlist__surah-reciter text-sm">${surah.reciter}</span>
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
