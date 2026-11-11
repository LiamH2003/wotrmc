'use client'

import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import frontMap from '@/app/images/front_map.jpg'
import mountainHall from '@/app/images/c_mt_inside.jpg'
import khazadDum from '@/app/images/k_hall.jpg'
import whiteTower from '@/app/images/w_stack.jpg'
import ship from '@/app/images/s_ship.jpg'
import blackGate from '@/app/images/c_blackgate.webp'
import mumakil from '@/app/images/b_mumak.jpg'
import feast from '@/app/images/f_food.webp'
import gems from '@/app/images/f_gems.webp'
import orthanc from '@/app/images/c_orthanc2.webp'
import minasTirith from '@/app/images/c_minas_tirith2.webp'
import siege from '@/app/images/x_siege.webp'
import thrones from '@/app/images/x_thrones.webp'
import parade from '@/app/images/x_parade.webp'
import erebor from '@/app/images/c_erebor2.webp'
import minasMorgul from '@/app/images/c_morgul.webp'
import osgiliath from '@/app/images/c_osgiliath2.webp'
import lakeTown from '@/app/images/c_laketown.webp'
import edoras from '@/app/images/c_edoras.webp'
import mistyMountains from '@/app/images/air_misty.jpg'

interface GalleryPhoto {
  image: StaticImageData
  title: string
  detail: string
  alt: string
}

interface GalleryChapter {
  eyebrow: string
  title: string
  description: string
  note: string
  theme: string
  feature: GalleryPhoto
  photos: GalleryPhoto[]
}

const CHAPTERS: GalleryChapter[] = [
  {
    eyebrow: 'I · Beyond the borders',
    title: 'A world made for wandering.',
    description:
      'Follow the old roads from the western shores to the high mountain passes. There is always another horizon, another hidden place, another story waiting beyond the map.',
    note: 'From the Blue Mountains to the Long Lake',
    theme: 'Realms & roads',
    feature: {
      image: frontMap,
      title: 'Middle-earth',
      detail: 'A world seen from above',
      alt: 'A sweeping view across Middle-earth at dusk',
    },
    photos: [
      {
        image: mistyMountains,
        title: 'The Misty Mountains',
        detail: 'The high passes',
        alt: 'Aerial view of the Misty Mountains',
      },
      {
        image: ship,
        title: 'Beyond the Shore',
        detail: 'A passage across the sea',
        alt: 'A ship sailing across the water',
      },
      {
        image: whiteTower,
        title: 'The White Tower',
        detail: 'A beacon in the West',
        alt: 'A tall white tower rising above the landscape',
      },
      {
        image: lakeTown,
        title: 'Lake-town',
        detail: 'Houses on the water',
        alt: 'The wooden houses of Lake-town standing in the Long Lake',
      },
    ],
  },
  {
    eyebrow: 'II · Stone & memory',
    title: 'Kingdoms written in stone.',
    description:
      'Climb the white tiers of a city under siege, walk beneath the mountain halls, and find the golden roofs of Rohan. Every kingdom leaves its mark on the land.',
    note: 'Cities of the Free Peoples',
    theme: 'The great cities',
    feature: {
      image: minasTirith,
      title: 'The White City',
      detail: 'Minas Tirith',
      alt: 'Minas Tirith climbing the slopes of Mount Mindolluin',
    },
    photos: [
      {
        image: mountainHall,
        title: 'Within the Mountains',
        detail: 'The Blue Mountains',
        alt: 'An interior view inside the Blue Mountains',
      },
      {
        image: khazadDum,
        title: 'The Dwarven Halls',
        detail: 'Khazad-dûm',
        alt: 'A vast hall beneath the mountains',
      },
      {
        image: erebor,
        title: 'At the Lonely Mountain',
        detail: 'Dale and Erebor',
        alt: 'The walled town of Dale among autumn woods below Erebor',
      },
      {
        image: edoras,
        title: 'The Golden Hall',
        detail: 'Edoras',
        alt: 'The thatched town of Edoras on its green hill',
      },
    ],
  },
  {
    eyebrow: 'III · Under the shadow',
    title: 'Not every road leads home.',
    description:
      'Beyond the black walls, forgotten cities watch over a land shaped by darker powers. These are places of silence, old ambition, and a shadow that reaches far.',
    note: 'From Isengard to the gates of Mordor',
    theme: 'Lands of shadow',
    feature: {
      image: blackGate,
      title: 'The Black Gate',
      detail: 'The threshold of Mordor',
      alt: 'The dark towers and walls of the Black Gate',
    },
    photos: [
      {
        image: orthanc,
        title: 'The Tower of Orthanc',
        detail: 'Isengard',
        alt: 'The black tower of Orthanc at the centre of Isengard',
      },
      {
        image: minasMorgul,
        title: 'The Moonlit City',
        detail: 'Minas Morgul',
        alt: 'Minas Morgul at the foot of the dark mountains',
      },
      {
        image: osgiliath,
        title: 'The City in Ruins',
        detail: 'Osgiliath',
        alt: 'The domed ruins of Osgiliath on both banks of the Anduin',
      },
      {
        image: thrones,
        title: 'Seats of Power',
        detail: 'Legacies carved in stone',
        alt: 'A pair of ancient thrones',
      },
    ],
  },
  {
    eyebrow: 'IV · A world at war',
    title: 'The story belongs to its people.',
    description:
      'Armies gather, banners rise, and history turns on the courage of ordinary folk. When the fighting ends, there are feasts to share and treasures still to uncover.',
    note: 'Battles, gatherings & the moments between',
    theme: 'War & fellowship',
    feature: {
      image: osgiliath,
      title: 'The City in Ruins',
      detail: 'Osgiliath',
      alt: 'The domed ruins of Osgiliath on both banks of the Anduin',
    },
    photos: [
      {
        image: parade,
        title: 'A City in Celebration',
        detail: 'The people gather',
        alt: 'A grand procession through a city',
      },
      {
        image: siege,
        title: 'Before the Walls',
        detail: 'The siege begins',
        alt: 'An army gathered before a city under siege',
      },
      {
        image: feast,
        title: 'At the Table',
        detail: 'A moment of respite',
        alt: 'Food prepared for a gathering',
      },
      {
        image: gems,
        title: 'Treasures of the Deep',
        detail: 'Crafted beneath the mountains',
        alt: 'Gems and treasures from the mountain halls',
      },
    ],
  },
]

const ALL_PHOTOS = CHAPTERS.flatMap((chapter) => [chapter.feature, ...chapter.photos])

function ChapterPhoto({
  photo,
  priority,
  onSelect,
  className = '',
}: {
  photo: GalleryPhoto
  priority?: boolean
  onSelect: (photo: GalleryPhoto, button: HTMLButtonElement) => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={(event) => onSelect(photo, event.currentTarget)}
      aria-label={`View ${photo.title}: ${photo.detail}`}
      className={`group relative block overflow-hidden border border-gold/15 bg-shadow-light text-left focus-visible:z-10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
    >
      <Image
        src={photo.image}
        alt={photo.alt}
        fill
        priority={priority}
        sizes="(max-width: 1023px) 100vw, 65vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-shadow/80 via-shadow/5 to-shadow/10 transition-colors duration-300 group-hover:from-shadow/65" />
      <span className="absolute inset-0 border border-gold/0 transition-colors duration-300 group-hover:border-gold/40" />
      <span className="absolute inset-x-0 bottom-0 p-2 text-left sm:p-3">
        <span className="block font-cinzel text-[9px] uppercase leading-tight tracking-[0.12em] text-parchment/90 sm:text-[10px]">
          {photo.title}
        </span>
        <span className="mt-1 hidden font-garamond text-xs italic text-parchment/55 sm:block">
          {photo.detail}
        </span>
      </span>
      <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-gold/60 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-gold/60 opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  )
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const reducedMotion = useReducedMotion() ?? false
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const activePhoto = activeIndex === null ? null : ALL_PHOTOS[activeIndex] ?? null

  const openPhoto = (photo: GalleryPhoto, button: HTMLButtonElement) => {
    openerRef.current = button
    setActiveIndex(ALL_PHOTOS.indexOf(photo))
  }

  const closeViewer = () => {
    setActiveIndex(null)
    window.requestAnimationFrame(() => openerRef.current?.focus())
  }

  const stepPhoto = (direction: -1 | 1) => {
    setActiveIndex((index) =>
      index === null ? null : (index + direction + ALL_PHOTOS.length) % ALL_PHOTOS.length,
    )
  }

  useEffect(() => {
    if (activeIndex === null) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeViewer()
      if (event.key === 'ArrowLeft') stepPhoto(-1)
      if (event.key === 'ArrowRight') stepPhoto(1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  return (
    <section id="gallery" className="relative overflow-hidden bg-shadow-mid py-14 sm:py-20">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #c9a84c44, transparent)' }}
      />
      <div className="pointer-events-none absolute -left-48 top-40 h-[32rem] w-[32rem] rounded-full bg-gold/[0.035] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <header className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-gold/15 pb-6 sm:mb-12 sm:pb-8">
          <div className="max-w-3xl">
            <p className="mb-3 font-cinzel text-[10px] uppercase tracking-[0.35em] text-gold/60 sm:text-[11px]">
              A visual chronicle · Season IV
            </p>
            <h2 className="font-cinzel-decorative text-4xl leading-[1.08] text-parchment sm:text-5xl md:text-6xl">
              The world beyond the war.
            </h2>
            <p className="mt-4 max-w-2xl font-garamond text-lg leading-relaxed text-parchment/55 sm:text-xl">
              Wander the roads, enter the old cities, and see the places where the fate of
              Middle-earth is still being written.
            </p>
          </div>
          <p className="font-cinzel text-[9px] uppercase tracking-[0.22em] text-parchment/35">
            <span className="text-gold/80">20</span> scenes · 4 chapters
          </p>
        </header>

        <div className="space-y-8 sm:space-y-12">
          {CHAPTERS.map((chapter, index) => {
            const imageFirst = index % 2 === 1

            return (
              <motion.article
                key={chapter.eyebrow}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid min-h-[50vh] overflow-hidden border-y border-gold/15 bg-shadow lg:grid-cols-[0.82fr_1.18fr]"
              >
                <div
                  className={`relative z-10 flex min-h-[50vh] flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16 ${
                    imageFirst ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="mb-7 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/45 font-cinzel text-[10px] text-gold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px w-9 bg-gold/35" />
                    <span className="font-cinzel text-[9px] uppercase tracking-[0.24em] text-gold/55 sm:text-[10px]">
                      {chapter.eyebrow}
                    </span>
                  </div>
                  <p className="mb-3 font-cinzel text-[9px] uppercase tracking-[0.3em] text-parchment/35">
                    {chapter.theme}
                  </p>
                  <h3 className="max-w-xl font-cinzel-decorative text-3xl leading-tight text-parchment sm:text-4xl xl:text-5xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-5 max-w-lg font-garamond text-lg leading-relaxed text-parchment/60 sm:text-xl">
                    {chapter.description}
                  </p>
                  <div className="mt-7 flex items-center gap-3">
                    <span className="h-px w-8 bg-gold/45" />
                    <p className="font-garamond text-sm italic text-gold/70">{chapter.note}</p>
                  </div>
                  <p className="mt-8 font-cinzel text-[9px] uppercase tracking-[0.22em] text-parchment/25">
                    Click any scene to step inside
                  </p>
                </div>

                <div
                  className={`relative min-h-[50vh] overflow-hidden bg-shadow-light ${
                    imageFirst ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="absolute inset-0">
                    <ChapterPhoto
                      photo={chapter.feature}
                      priority={index === 0}
                      onSelect={openPhoto}
                      className="h-full w-full"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-shadow/45 via-transparent to-transparent lg:from-shadow/65" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-shadow/80 to-transparent" />
                  </div>
                  <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-6 sm:top-6">
                    <span className="border border-gold/35 bg-shadow/60 px-3 py-1.5 font-cinzel text-[9px] uppercase tracking-[0.2em] text-gold/85 backdrop-blur-sm">
                      {chapter.theme}
                    </span>
                  </div>
                  <div className="pointer-events-none absolute bottom-28 left-5 right-5 sm:bottom-32 sm:left-7">
                    <p className="font-cinzel text-[9px] uppercase tracking-[0.28em] text-gold/65">
                      Featured scene
                    </p>
                    <p className="mt-1 font-cinzel-decorative text-2xl text-parchment drop-shadow-lg sm:text-3xl">
                      {chapter.feature.title}
                    </p>
                    <p className="mt-1 font-garamond text-base italic text-parchment/65">
                      {chapter.feature.detail}
                    </p>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 grid grid-cols-4 gap-2 sm:inset-x-6 sm:bottom-6 sm:gap-3">
                    {chapter.photos.map((photo) => (
                      <ChapterPhoto
                        key={photo.title}
                        photo={photo}
                        onSelect={openPhoto}
                        className="h-[4.5rem] sm:h-20 lg:h-[5.5rem] xl:h-20"
                      />
                    ))}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

      </div>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-shadow/95 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={closeViewer}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-dialog-title"
              className="relative w-full max-w-6xl border border-gold/25 bg-shadow p-3 shadow-[0_0_80px_rgba(0,0,0,0.65)] sm:p-5"
              initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.97, y: reducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-start justify-between gap-4 sm:mb-4">
                <div>
                  <p className="mb-1 font-cinzel text-[9px] uppercase tracking-[0.25em] text-gold/55">
                    Scene {String((activeIndex ?? 0) + 1).padStart(2, '0')} /{' '}
                    {String(ALL_PHOTOS.length).padStart(2, '0')}
                  </p>
                  <h3
                    id="gallery-dialog-title"
                    className="font-cinzel-decorative text-xl text-parchment sm:text-2xl"
                  >
                    {activePhoto.title}
                  </h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeViewer}
                  aria-label="Close image viewer"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/20 text-parchment/60 transition-colors hover:border-gold/50 hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="relative h-[55vh] min-h-64 max-h-[44rem] overflow-hidden bg-black/40 sm:h-[65vh]">
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1152px"
                  className="object-contain"
                  priority
                />
                <button
                  type="button"
                  onClick={() => stepPhoto(-1)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-gold/25 bg-shadow/75 text-parchment/75 backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => stepPhoto(1)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-gold/25 bg-shadow/75 text-parchment/75 backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>

              <p className="mt-3 font-garamond text-base italic text-parchment/55 sm:text-lg">
                {activePhoto.detail}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
