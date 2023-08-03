import ImageThumbnail from 'components/MediaThumbnail/ImageThumbnail'
import VideoThumbnail from 'components/MediaThumbnail/VideoThumbnail'

// Only presentation layers are present in MediaThumbnail component,
// Skipping the default structure of container, data and presentation layers.
export default {
  Image: ImageThumbnail,
  Video: VideoThumbnail,
}
