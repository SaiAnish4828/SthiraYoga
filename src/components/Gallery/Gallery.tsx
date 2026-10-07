import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icons'
import Img from '@/components/ui/Img'
import Modal from '@/components/ui/Modal'
import Reveal from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import {
  galleryAlt,
  galleryCategories,
  galleryImages,
  type GalleryCategory,
} from '@/data/gallery'
import pub from '@/utils/asset'
import './Gallery.css'

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const gridRef = useRef<HTMLUListElement>(null)

  const visible = useMemo(
    () =>
      filter === 'All'
        ? galleryImages
        : galleryImages.filter((image) => image.category === filter),
    [filter],
  )

  const current = openIndex !== null ? visible[openIndex] : null

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((index) => {
        if (index === null || visible.length === 0) return index
        return (index + delta + visible.length) % visible.length
      })
    },
    [visible.length],
  )

  // Arrow-key navigation while the lightbox is open.
  useEffect(() => {
    if (openIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        step(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        step(-1)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openIndex, step])

  // Reset the open index if the filter changes underneath it.
  useEffect(() => {
    setOpenIndex(null)
  }, [filter])

  const close = useCallback(() => setOpenIndex(null), [])

  return (
    <Section id="gallery" labelledBy="gallery-title" className="gallery">
      <SectionHead
        align="center"
        eyebrow="Gallery"
        id="gallery-title"
        title="Inside the studio"
        lede="Sessions, quiet corners, workshops and the small moments in between. Tap any image to see it larger."
      />

      {/* ---- Filters ---- */}
      <Reveal className="gallery__filters">
        <div className="gallery__filters-inner" role="group" aria-label="Filter gallery by category">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`gallery__chip ${filter === category ? 'is-active' : ''}`.trim()}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </Reveal>

      {/* ---- Masonry grid ---- */}
      {visible.length === 0 ? (
        <div className="gallery__empty">
          <Icon name="lotus" size={30} strokeWidth={1.4} />
          <p>No images in this category yet — new photos are on the way.</p>
        </div>
      ) : null}

      <ul className="gallery__grid" ref={gridRef}>
        {visible.map((image, index) => (
          <li
            key={image.id}
            className={`gallery__cell ${image.span === 'tall' ? 'is-tall' : ''}`.trim()}
          >
            <button
              type="button"
              className="gallery__button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Enlarge gallery image ${index + 1} of ${visible.length}`}
            >
              <Img
                className="gallery__img"
                src={pub(image.src)}
                alt={galleryAlt(image)}
                width={800}
                height={image.span === 'tall' ? 1000 : 620}
              />
              <span className="gallery__overlay">
                <span className="gallery__zoom" aria-hidden="true">
                  <Icon name="arrow-up-right" size={18} strokeWidth={1.8} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Reveal delay={80} className="gallery__hint">
        <Icon name="info" size={17} strokeWidth={1.6} />
        <p>
          Placeholder photography for now — real studio images will replace them shortly. Use the
          arrow keys to move through the lightbox.
        </p>
      </Reveal>

      {/* ---- Lightbox ---- */}
      <Modal
        open={current !== null}
        onClose={close}
        label={
          current
            ? `${current.category} photo ${(openIndex ?? 0) + 1} of ${visible.length} — enlarged`
            : 'Gallery image'
        }
        panelClassName="lightbox"
        hideCloseButton
      >
        {current ? (
          <figure className="lightbox__inner">
            <button type="button" className="lightbox__close" onClick={close} aria-label="Close image">
              <Icon name="close" size={20} />
            </button>

            {visible.length > 1 ? (
              <>
                <button
                  type="button"
                  className="lightbox__nav lightbox__nav--prev"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                >
                  <Icon name="chevron-left" size={22} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  className="lightbox__nav lightbox__nav--next"
                  onClick={() => step(1)}
                  aria-label="Next image"
                >
                  <Icon name="chevron-right" size={22} strokeWidth={1.8} />
                </button>
              </>
            ) : null}

            <div className="lightbox__frame">
              <Img
                key={current.id}
                className="lightbox__img"
                src={pub(current.large ?? current.src)}
                alt={galleryAlt(current)}
                width={1400}
                height={1000}
              />
            </div>

            <figcaption className="lightbox__meta">
              <span className="lightbox__count" aria-live="polite">
                {(openIndex ?? 0) + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>
        ) : null}
      </Modal>
    </Section>
  )
}

export default Gallery
