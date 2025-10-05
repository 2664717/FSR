import { useEffect, useRef, useState } from "react";
import RatingBar from "./RatingBar";
import "../styles/player.css";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [rating, setRating] = useState(null);

  // 👇 видео-URL из старого index(1).html (актуальный)
  const VIDEO_URL =
    "https://filesamples.com/samples/video/mp4/sample_640x360.mp4
"; // ← та же ссылка

  useEffect(() => {
    // Telegram WebApp SDK init
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVolume = (e) => {
    const v = e.target.value;
    setVolume(v);
    if (videoRef.current) videoRef.current.volume = v;
  };

  const handleRating = (val) => {
    setRating(val);
    console.log("Оценка:", val);
  };

  return (
    <div className="video-wrapper">
      <video
        ref={videoRef}
        className="video-element"
        src={VIDEO_URL}
        playsInline
        autoPlay
        muted
        controls
      />

      <RatingBar rating={rating} onRate={handleRating} />

      <div className="controls">
        <button onClick={togglePlay} className="btn-play">
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
}
