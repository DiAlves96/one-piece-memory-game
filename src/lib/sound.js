function _createAudio(src, volume, loop = false) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.loop = loop;
  return audio;
}

export function playSound(src, enabled = true, volume = 0.5) {
  if (!enabled) return;
  const audio = _createAudio(src, volume);
  audio.play().catch(() => { });
}

export function playSoundLoop(src, enabled = true, volume = 0.4) {
  if (!enabled) return null;
  const audio = _createAudio(src, volume, true);
  audio.play().catch(() => { });
  return audio;
}