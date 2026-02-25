import { getImageUrl } from '../api/strapi'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
}

export default function ArticleCard({ article, onClick, featured }) {
  const { title, description, publishedAt, coverImage } = article.attributes || article

  // Strapi v4 vs v5 Kompatibilität
  const imgData = coverImage?.data?.attributes || coverImage
  const imgUrl = imgData?.url ? getImageUrl(imgData.url) : null
  const imgAlt = imgData?.alternativeText || title

  return (
    <article
      className={`article-card${featured ? ' featured' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`Artikel lesen: ${title}`}
    >
      <div className="card-img-wrap">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={imgAlt}
            className="card-img"
            loading="lazy"
          />
        ) : (
          <div className="card-img-placeholder">📄</div>
        )}
      </div>

      <div className="card-overlay" />

      <div className="card-body">
        <p className="card-category">Artikel</p>
        <h2 className="card-title">{title}</h2>
        {description && (
          <p className="card-excerpt">{description}</p>
        )}
        <div className="card-footer">
          <time className="card-date" dateTime={publishedAt}>
            {formatDate(publishedAt)}
          </time>
          <span className="card-read-more">Lesen →</span>
        </div>
      </div>
    </article>
  )
}
