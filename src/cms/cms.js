import React from 'react'
import CMS from 'netlify-cms-app'
import { CSSInjector } from './CSSInjector'

import HomePagePreview from './preview-templates/HomePagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'

// CMS.registerPreviewTemplate('about', AboutPagePreview)

CMS.registerPreviewTemplate('take-away', props => (
  <CSSInjector>
    <AboutPagePreview {...props} />
  </CSSInjector>
))
CMS.registerPreviewTemplate('dicono-di-noi', props => (
  <CSSInjector>
    <AboutPagePreview {...props} />
  </CSSInjector>
))
CMS.registerPreviewTemplate('contatti', props => (
  <CSSInjector>
    <AboutPagePreview {...props} />
  </CSSInjector>
))
CMS.registerPreviewTemplate('prenotazioni', props => (
  <CSSInjector>
    <ContactPagePreview {...props} />
  </CSSInjector>
))
CMS.registerPreviewTemplate('news', props => (
  <CSSInjector>
    <BlogPostPreview {...props} />
  </CSSInjector>
))
CMS.registerPreviewTemplate('menu', props => (
  <CSSInjector>
    <ProductPagePreview {...props} />
  </CSSInjector>
))

CMS.registerPreviewStyle('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css');
CMS.registerPreviewStyle('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css');
CMS.registerPreviewTemplate('home', props => (
  <CSSInjector>
    <HomePagePreview {...props} />
  </CSSInjector>
))
