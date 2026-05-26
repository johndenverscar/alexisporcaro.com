export function youtubeEmbed(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export function vimeoEmbed(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? `https://player.vimeo.com/video/${m[1]}` : null;
}

export function videoEmbed(url: string): string | null {
  return youtubeEmbed(url) ?? vimeoEmbed(url);
}

export function spotifyEmbed(url: string): string | null {
  const m = url.match(/open\.spotify\.com\/(track|episode|album)\/([\w]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}` : null;
}

export function soundcloudEmbed(url: string): string {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23c89b3c&inverse=true&auto_play=false&show_user=true`;
}

export function audioEmbed(url: string): string | null {
  if (url.includes("spotify.com")) return spotifyEmbed(url);
  if (url.includes("soundcloud.com")) return soundcloudEmbed(url);
  return null;
}
