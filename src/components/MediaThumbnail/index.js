import ImageThumbnail from 'components/MediaThumbnail/ImageThumbnail'
import VideoThumbnail from 'components/MediaThumbnail/VideoThumbnail'
import AudioThumbnail from 'components/MediaThumbnail/AudioThumbnail'

// Only presentation layers are present in MediaThumbnail component,
// Skipping the default structure of container, data and presentation layers.
export default {
  Audio: AudioThumbnail,
  Image: ImageThumbnail,
  Video: VideoThumbnail,
}
