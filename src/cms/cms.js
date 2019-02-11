import React from 'react'
import CMS from 'netlify-cms'
import { CSSInjector } from 'CSSInjector'

import HomePagePreview from './preview-templates/HomePagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'

// CMS.registerPreviewTemplate('home', HomePagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('thanks', AboutPagePreview)
CMS.registerPreviewTemplate('news', BlogPostPreview)
CMS.registerPreviewTemplate('menu', ProductPagePreview)
CMS.registerPreviewStyle('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css');
CMS.registerPreviewStyle('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css');

CMS.registerPreviewTemplate('home', props => (
  <CSSInjector>
    <HomePagePreview {...props} />
  </CSSInjector>
))
