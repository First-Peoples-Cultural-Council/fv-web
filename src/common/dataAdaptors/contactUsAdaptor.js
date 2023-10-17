export function contactUsAdaptor({ formData }) {
  return {
    name: formData?.name || '',
    email: formData?.email || '',
    message: formData?.message || '',
  }
}
