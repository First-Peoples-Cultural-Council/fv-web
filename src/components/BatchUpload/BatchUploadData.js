// FPCC

function BatchUploadData() {
  const submitHandler = (formData) => {
    console.log(formData)
  }

  return {
    submitHandler,
    isLoading: false,
  }
}

export default BatchUploadData
