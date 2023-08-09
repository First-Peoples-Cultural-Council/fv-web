export function notesAcknowledgementsAdaptor({ item }) {
  return {
    notes: item?.notes || [],
    acknowledgements: item?.acknowledgements || [],
  }
}
