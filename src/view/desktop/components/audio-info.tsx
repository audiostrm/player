import React from 'react';

export const Image = () => {
  return (
    <div className="audio-info">
      <div className="image-wrapper">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/3/39/Artpop_cover.png"
          draggable={false}
        />
      </div>
      <summary>
        <p className="audio-title">Applause</p>
        <p className="audio-artist">Lady gaga</p>
      </summary>
    </div>
  );
};
