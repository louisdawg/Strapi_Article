import { useEffect, useCallback } from 'react'
import { getImageUrl } from '../api/strapi'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
}

/**
 * Rendert Strapi Rich-Text (Blocks oder plain string)
 */
function renderContent(content) {
  if (!content) return null

  // Plain string
  if (typeof content === 'string') {
    return content.split('\n').map((p, i) => p ? <p key={i}>{p}</p> : null)
  }

  // Strapi v5 Block-Format (Array)
  if (Array.isArray(content)) {
    return content.map((block, i) => {
      if (block.type === 'paragraph') {
        const text = block.children?.map(c => c.text).join('') || ''
        return text ? <p key={i}>{text}</p> : null
      }
      if (block.type === 'heading') {
        const text = block.children?.map(c => c.text).join('') || ''
        const Tag = `h${block.level || 2}`
        return <Tag key={i} style={{ fontFamily: 'var(--font-serif)', margin: '1.5em 0 0.5em', color: 'var(--text)' }}>{text}</Tag>
      }
      return null
    })
  }

  return null
}

export default function ArticleModal({ article, loading, onClose }) {
  // ESC zum Schließen
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  // Alle Bilder sammeln (Strapi v4 & v5 kompatibel)
  const getImages = () => {
    if (!article) return []
    const attrs = article.attributes || article
    const images = []

    // Cover
    const cover = attrs.coverImage?.data?.attributes || attrs.coverImage
    if (cover?.url) images.push({ url: getImageUrl(cover.url), alt: cover.alternativeText || 'Cover' })

    // Weitere Bilder (z.B. "images" Feld)
    const extra = attrs.images?.data || attrs.images
    if (Array.isArray(extra)) {
      extra.forEach(img => {
        const a = img.attributes || img
        if (a?.url) images.push({ url: getImageUrl(a.url), alt: a.alternativeText || '' })
      })
    }
    return images
  }

  const images = getImages()
  const attrs = article?.attributes || article || {}
  const [hero, ...gallery] = images

  return (
    <div
      className="modal-backdrop"
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Schließen">✕</button>

        {loading ? (
          <div className="modal-loading">
            <div className="spinner" />
            Artikel wird geladen…
          </div>
        ) : (
          <>
            {hero && (
              <img
                src={hero.url}
                alt={hero.alt}
                className="modal-hero-img"
              />
            )}

            {gallery.length > 0 && (
              <div className="modal-gallery">
                {gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={img.alt}
                    className="modal-gallery-img"
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            <div className="modal-content">
              <div className="modal-eyebrow">
                <span>Artikel</span>
                {attrs.publishedAt && (
                  <time dateTime={attrs.publishedAt}>
                    {formatDate(attrs.publishedAt)}
                  </time>
                )}
              </div>

              <h1 className="modal-title">{attrs.title}</h1>
              <div className="modal-divider" />

              <div className="modal-body">
                {attrs.description && !attrs.content && (
                  <p>{attrs.description}</p>
                )}
                {renderContent(attrs.content)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
