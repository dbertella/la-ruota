import React from 'react'
import PropTypes from 'prop-types'
import { HomePageTemplate } from '../../templates/home-page'

const HomePagePreview = ({ entry, widgetFor }) => {
  const carouselSlides = entry.getIn(['data', 'carousel'])
  const slides = carouselSlides ? carouselSlides.toJS() : []
  return (
    <HomePageTemplate
      title={entry.getIn(['data', 'title'])}
      subtitle={entry.getIn(['data', 'subtitle'])}
      carousel={{ slides }}
      content={widgetFor('body')}
    />
  )
}

HomePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default HomePagePreview
