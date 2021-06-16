const TrackBar = ((_) => {
  const bar = document.querySelector(".trackbar__progress");

  const state = {
    currentTrackTime: 0,
    fullTrackTime: 0,
    barWidth: 0,
  };
  const init = (_) => {
    render();
  };
  const render = (_) => {
    bar.style.width = `${state.barWidth}%`;
  };
  const getPercentage = (current, full) => {
    return (current / full) * 100;
  };
  const setState = (obj) => {
    state.currentTrackTime = obj.currentTime;
    state.fullTrackTime = obj.duration;
    state.barWidth = getPercentage(state.currentTrackTime, state.fullTrackTime);
  };
  return {
    init,
    setState,
  };
})();
export default TrackBar;
