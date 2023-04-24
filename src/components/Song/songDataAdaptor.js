function songDataAdaptor(data) {
  const properties = data?.properties ? data.properties : {}
  const songContextParams = data?.contextParameters?.book ? data.contextParameters.book : {}

  let author = songContextParams?.authors?.[0]?.['dc:title'] || ''
  if (songContextParams?.authors?.length > 1) {
    for (let i = 1; i < songContextParams?.authors?.length; i++) {
      author = author + `, ${songContextParams?.authors?.[i]?.['dc:title']}`
    }
  }

  let coverVisual = { type: null, id: null }
  if (songContextParams?.related_pictures?.length > 0) {
    const firstImage = songContextParams?.related_pictures?.[0]
    coverVisual = { type: firstImage?.['mime-type'] === 'image/gif' ? 'gifOrImg' : 'image', id: firstImage?.uid }
  } else if (properties['fv:related_videos']?.[0]?.length > 0) {
    coverVisual = { type: 'video', id: properties['fv:related_videos']?.[0] }
  }
  // V1_FUDGE - will need modifying for new FVSong docs
  let pages = songContextParams?.pages
  let pagesHaveContent =
    pages?.filter((page) => page?.content != null || page?.contentTranslation?.length > 0)?.length > 0

  const entry = {
    id: data?.uid || '',
    type: properties['fvbook:type'] || '',
    title: properties['dc:title'] || '',
    titleTranslation: properties['fvbook:title_literal_translation']?.[0]?.translation || '',
    audio: properties['fv:related_audio'] || [],
    coverVisual: coverVisual,
    introduction: properties['fvbook:introduction'] || '',
    introductionTranslation: properties['fvbook:introduction_literal_translation']?.[0]?.translation || '',
    hasLyrics: pagesHaveContent,
    lyrics: pages || [],
    author: author,
    videos: properties['fv:related_videos'] || [],
    pictures: properties['fv:related_pictures'] || [],
  }
  return entry
}

export default songDataAdaptor
