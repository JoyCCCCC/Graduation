import defaultSettings from '@/settings'

const title = defaultSettings.title || '智能教育'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
