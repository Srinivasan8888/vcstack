import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'VC Pitch Decks — Real Fund Pitch Decks',
  description:
    'Browse real pitch decks used by VC funds to raise capital. Learn from Shrug Capital, Seedcamp, Not Boring Capital and more.',
}

const PITCH_DECKS = [
  {
    title: 'Shrug Capital',
    description:
      'This is the deck Shrug Capital uses to promote their early stage consumer vc fund.',
    link: 'https://docsend.com/view/q7t34yjccmcbvrrn',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e7bf6e78b0cf5f3bdb05d_shrug-capital.jpg',
  },
  {
    title: 'Spacecadet',
    description:
      'Spacecadet used a very unusual, but very successful approach to pitching their $10M fund to investors.',
    link: 'https://spacecadet.ventures/fund/',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e7cdd6c004e32b37ff44d_spacecadet.png',
  },
  {
    title: 'Seedcamp',
    description:
      'This is the deck seedcamp used to raise their heavily-oversubscribed Seedcamp Fund V.',
    link: 'https://www.slideshare.net/seedcamp/seedcamp-fund-v-fundraising-deck/1',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e91bc2d1e1e347ad05139_seedcamp.png',
  },
  {
    title: 'Hack Fund',
    description:
      'This is the presentation Hack Fund used to raise their publicly-traded Fund V.',
    link: 'https://www.slideshare.net/hackersandfounders/hack-fund-v-pitch-deck',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e92f5aab2526ba7424fda_hackfund.png',
  },
  {
    title: 'Notation Capital',
    description:
      'This is the pitch deck they used to raise Notation Capital Fund 1 in 2014.',
    link: 'https://www.slideshare.net/Notation/notation-capital-fund-1-pitch-deck',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e93ac46158a50f5b5f1b0_notation-capital.jpeg',
  },
  {
    title: 'Worklife.vc',
    description:
      'These are parts of the deck Brianne Kimmel used to convince Marc Andreessen and other investors to invest in her first fund.',
    link: 'http://briannekimmel.com/what-it-takes-to-start-your-own-vc-fund/',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e947b6589187f68f8259e_work-life-ventures-icon-idx3kss9po.jpeg',
  },
  {
    title: 'Slingshot Venture Fund',
    description:
      'The $15 million fund has been formed as an Early Stage Venture Capital Limited Partnership (ESVCLP) registered with Innovation and Science Australia.',
    link: 'https://www.alexanderjarvis.com/vc-pitch-deck-slingshot-venture-fund/',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6210da28016b5b9c118fb222_Slingshot.png',
  },
  {
    title: 'Day One Ventures',
    description:
      'Day One Ventures, a venture fund launched in 2018 by 29-year-old Russian-born entrepreneur Masha Drokova',
    link: 'https://www.businessinsider.com/day-one-ventures-pitch-deck-2019-3',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6210daf6fe815b7b04600bdb_day%20one%20ventures.png',
  },
  {
    title: 'Alpha Bridge Ventures',
    description:
      'We take a humanistic approach by working closely with founding teams to help them accelerate towards their Series A, both personally and professionally',
    link: 'https://labyrinth.substack.com/p/alpha-bridge-deck-review-by-superlp?utm_source=url',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6210db9f7e04cb619ce3d144_Alpha%20Bridge%20Ventures%203.JPG',
  },
  {
    title: 'CapitalX',
    description: '@CindyBiSV fund - angel investor turned GP.',
    link: 'https://docs.google.com/presentation/d/1_wtVQPt6o-amrw7Y8XAeFHcYyus9VAV-jLDHZ9Pn-08/mobilepresent?slide=id.ga4a7146f5b_1_0',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/624e91327b2d41294ba042e8_rs%3Dw-1200%2Ch-600%2Ccg-true%2Cm.jpeg',
  },
  {
    title: 'AWESOME PEOPLE VENTURES',
    description:
      'AWESOME PEOPLE VENTURES is focused on improving the way we live and work.',
    link: 'https://drive.google.com/file/d/1kCq-9yWa3mmeIiaUnLPztmvdkWUGwVMH/view',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63467689475b5483c3644ef7_awesome-people-ventures-fund-deck.png',
  },
  {
    title: 'Earl Grey Capital',
    description:
      'Earl Grey is an $20M early stage venture fund with founders backing founders.',
    link: 'https://drive.google.com/file/d/1z-aUhdYYeIiHdb_zwrEcV5bmNDx4oCu7/view',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/634677481835ea5879ccfe59_earl-grey-capital.jpg',
  },
  {
    title: 'Long Journey Ventures',
    description:
      '$35M early stage fund - going long with long-term people.',
    link: 'https://drive.google.com/file/d/1loQ4CddQVGWnLxZTXBKqMPFaehu7sf1j/view',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63467859c9af4603bb6aece9_long-journey-ventures-pitch-deck.jpeg',
  },
  {
    title: 'Not Boring Capital',
    description:
      'Not Boring Capital invests in companies with stories to tell, and helps tell them.',
    link: 'https://drive.google.com/file/d/1IAkd9JzlMGhrqPjOMDsynuDKaE9qZ7-7/view',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/634678d2e1eb3157a973538a_not-boring-capital-fund-deck.png',
  },
  {
    title: 'Not Boring Capital Fund II',
    description: '$25M fund II of Packy McCormick',
    link: 'https://drive.google.com/file/d/1iR4DVyIIOi6OYU6VWvDq2opX_i-wVIhS/view',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/634678d2e1eb3157a973538a_not-boring-capital-fund-deck.png',
  },
  {
    title: 'Precursor Ventures',
    description: '$40 Million Pre-Seed Venture Fund',
    link: 'https://drive.google.com/file/d/1Jhpbz95IfFE8iyVMS7oAvIYC0OtBtVlE/view',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63467a2e3d77ee8e7e50e186_precusor-ventures-deck.jpeg',
  },
  {
    title: 'Susa Ventures',
    description:
      'SF-based seed-stage VC fund investing in founders building value & defensibility through data, network effects, & economies of scale.',
    link: 'https://drive.google.com/file/d/1WZnQYPIVY6L_Vqe1-1eJBMdv0dLpQX2q/view',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63467aac3d77ee15b350e22e_susa-ventures-pitch-deck.webp',
  },
  {
    title: "Todd and Rahul\u2019s Angel Fund",
    description:
      'We help startups find product/market fit faster, supercharge their distribution, and raise from the best investors.',
    link: 'https://drive.google.com/file/d/1XkcnKnvNiZX7SZft9kqZBHvOE-5LvdEW/view',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63467b21bbc98fa2d92b2f60_tandrahul-angel-fund.png',
  },
]

export default function PitchDecksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Pitch Decks</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          VC Pitch Decks
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Browse real pitch decks used by venture capital funds to raise
          capital. Learn from the best and get inspired for your own fund
          raise.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PITCH_DECKS.map((deck, i) => (
          <a
            key={`${deck.title}-${i}`}
            href={deck.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden card-hover"
          >
            {/* Image */}
            <div className="relative h-44 bg-slate-100 flex items-center justify-center p-6">
              <img
                src={deck.image}
                alt={deck.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                {deck.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                {deck.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                View deck
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
