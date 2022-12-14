import React from 'react';
import PropTypes from 'prop-types';

const YoutubeEmbed = ({ embedId, width, height, videoClass }) => (
  <div className={videoClass}>
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  videoClass: PropTypes.string
};

export default YoutubeEmbed;
