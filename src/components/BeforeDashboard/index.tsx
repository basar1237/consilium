import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to the Consilium dashboard</h4>
      </Banner>
      Manage your website content from here:
      <ul className={`${baseClass}__instructions`}>
        <li>
          Create and edit <strong>Pages</strong> to update site sections such as Home, About, and
          Services.
        </li>
        <li>
          Publish new <strong>Insights</strong> (blog posts) to share expert perspectives with your
          audience.
        </li>
        <li>
          Update global content like the <strong>Header</strong> and <strong>Footer</strong> from
          the Globals menu.
        </li>
        <li>
          After saving changes,{' '}
          <a href="/" target="_blank" rel="noopener noreferrer">
            visit the live site
          </a>{' '}
          to review the result.
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
