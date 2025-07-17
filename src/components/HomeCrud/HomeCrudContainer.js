import React from 'react'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import HomeCrudPresentation from 'components/HomeCrud/HomeCrudPresentation'
import HomeCrudData from 'components/HomeCrud/HomeCrudData'
import HomeForm from 'components/HomeCrud/HomeForm'
import Loading from 'components/Loading'

function HomeCrudContainer() {
  const { backHandler, dataToEdit, isWidgetAreaEdit, site, submitHandler } =
    HomeCrudData()

  return (
    <>
      {' '}
      <SiteDocHead titleArray={['Homepage Edit']} />
      {isWidgetAreaEdit ? (
        <Loading.Container isLoading={!site?.id}>
          <HomeCrudPresentation site={site} />
        </Loading.Container>
      ) : (
        <HomeForm
          cancelHandler={backHandler}
          submitHandler={submitHandler}
          dataToEdit={dataToEdit}
        />
      )}
    </>
  )
}

export default HomeCrudContainer
