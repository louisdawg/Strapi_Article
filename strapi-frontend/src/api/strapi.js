const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

/**
 * Holt alle publizierten Artikel mit je einem Cover-Bild
 */
export async function fetchArticles() {
  const res = await fetch(
    `${STRAPI_URL}/api/articles?populate[coverImage][fields][0]=url&populate[coverImage][fields][1]=alternativeText&populate[coverImage][fields][2]=width&populate[coverImage][fields][3]=height&filters[publishedAt][$notNull]=true&sort=publishedAt:desc`
  )
  if (!res.ok) throw new Error(`Fehler beim Laden der Artikel: ${res.status}`)
  const { data } = await res.json()
  return data
}

/**
 * Holt einen einzelnen Artikel mit allen Bildern und dem vollständigen Text
 */
export async function fetchArticleById(id) {
  const res = await fetch(
    `${STRAPI_URL}/api/articles/${id}?populate=*`
  )
  if (!res.ok) throw new Error(`Fehler beim Laden des Artikels: ${res.status}`)
  const { data } = await res.json()
  return data
}

/**
 * Gibt die vollständige Bild-URL zurück (funktioniert mit relativen & absoluten Pfaden)
 */
export function getImageUrl(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}
