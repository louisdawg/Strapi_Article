import { useState, useEffect } from 'react'
import { fetchArticles, fetchArticleById } from './api/strapi'
import ArticleCard from './components/ArticleCard'
import ArticleModal from './components/ArticleModal'

export default function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedArticle, setSelectedArticle] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  // ── Artikel-Liste laden ──────────────────────────────────────────
  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // ── Klick auf Karte → vollständigen Artikel laden ────────────────
  async function handleCardClick(article) {
    // Optimistisch sofort öffnen (Skeleton zeigen)
    setSelectedArticle(article)
    setModalLoading(true)

    try {
      const id = article.id
      const full = await fetchArticleById(id)
      setSelectedArticle(full)
    } catch (err) {
      console.error('Artikel-Detail konnte nicht geladen werden:', err)
      // Fallback: Vorschau bleibt sichtbar
    } finally {
      setModalLoading(false)
    }
  }

  function handleModalClose() {
    setSelectedArticle(null)
    setModalLoading(false)
  }

  // ── Aktuelles Datum für Header ───────────────────────────────────
  const today = new Date().toLocaleDateString('de-DE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  // ── Render ───────────────────────────────────────────────────────
  return (
    <>
      <header className="site-header">
        <a href="/" className="site-logo">
          Das<span>Journal</span>
        </a>
        <span className="header-meta">{today}</span>
      </header>

      <div className="hero-band">
        <div>
          <p className="hero-eyebrow">Aktuelle Beiträge</p>
          <h1 className="hero-title">
            Alle <em>Artikel</em>
          </h1>
        </div>
        {!loading && !error && (
          <p className="hero-count">
            {articles.length} {articles.length === 1 ? 'Beitrag' : 'Beiträge'}
          </p>
        )}
      </div>

      <main className="articles-wrapper">
        {loading && (
          <div className="state-loading">
            <div className="spinner" />
            Artikel werden geladen…
          </div>
        )}

        {error && (
          <div className="state-error">
            <h2>Verbindungsfehler</h2>
            <p>{error}</p>
            <p style={{ marginTop: '0.8rem', fontSize: '0.8rem' }}>
              Läuft Strapi auf <strong>localhost:1337</strong>?
            </p>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="state-empty">
            Noch keine publizierten Artikel vorhanden.
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="articles-grid">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                featured={index === 0}
                onClick={() => handleCardClick(article)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          loading={modalLoading}
          onClose={handleModalClose}
        />
      )}
    </>
  )
}
