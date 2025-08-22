import React from 'react'

// FPCC
import PageCrudPresentation from 'components/PageCrud/PageCrudPresentation'
import PageCrudData from 'components/PageCrud/PageCrudData'
import PageForm from 'components/PageCrud/PageForm'
import Loading from 'components/Loading'
import DocHead from 'components/DocHead'

function PageCrudContainer() {
  const {
    backHandler,
    dataToEdit,
    isWidgetAreaEdit,
    site,
    submitHandler,
    deleteHandler,
  } = PageCrudData()
  return isWidgetAreaEdit ? (
    <Loading.Container isLoading={!dataToEdit?.id}>
      <PageCrudPresentation dataToEdit={dataToEdit} site={site} />
    </Loading.Container>
  ) : (
    <>
      <DocHead key="dochead" titleArray={['Create Custom Page']} />,
      <PageForm
        cancelHandler={backHandler}
        submitHandler={submitHandler}
        dataToEdit={dataToEdit}
        deleteHandler={deleteHandler}
      />
    </>
  )
}

export default PageCrudContainer
