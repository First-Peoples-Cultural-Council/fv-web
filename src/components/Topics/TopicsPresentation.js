import React from 'react'
import PropTypes from 'prop-types'
import TopicsPresentationTopic from 'components/Topics/TopicsPresentationTopic'
import SectionTitle from 'components/SectionTitle'
import Slider from 'components/Slider'

function TopicsPresentation({ title, topics }) {
  return (
    <section className="py-12 bg-white" data-testid="TopicsPresentationWidget">
      <div className="mx-10 mb-4">
        <SectionTitle.Presentation title={title} />
      </div>
      <div className="hidden lg:grid gap-y-10 gap-x-14 grid-cols-4 mx-10 mt-5">
        {topics.map((topic, index) => {
          const key = `topic${index}`
          return <TopicsPresentationTopic key={key} topic={topic} />
        })}
      </div>
      <div className="mx-10 block lg:hidden">
        <Slider.Container items={topics} topics />
      </div>
    </section>
  )
}
// PROPTYPES
const { array, string } = PropTypes
TopicsPresentation.propTypes = {
  topics: array,
  title: string,
}

export default TopicsPresentation
