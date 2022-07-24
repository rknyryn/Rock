const ConstantValues = {
  // Regex for YouTube
  regex: {
    youtubRegex:
      /^(https?:\/\/)?(www\.)?(m\.|music\.)?(youtube\.com|youtu\.?be)\/.+$/gi,
    playlistRegex: /^.*(list=)([^#\&\?]*).*/gi,
    songRegex: /^.*(watch\?v=)([^#\&\?]*).*/gi,
  },
  urls: {
    youtubVideo: "https://www.youtube.com/watch?v=",
    youtubPlaylist: "https://www.youtube.com/playlist?list=",
  }
};

module.exports = {
  ConstantValues: ConstantValues,
};
