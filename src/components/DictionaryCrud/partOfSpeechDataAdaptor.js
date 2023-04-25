function partOfSpeechDataAdaptor({ data }) {
  return data?.entries
    ? data.entries?.map((entry) => {
        const { label, id } = entry?.properties
        return { label, value: id }
      })
    : null
}

export default partOfSpeechDataAdaptor
