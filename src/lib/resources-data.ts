/**
 * Resources data scraped from vcstack.io
 * Includes: VC firm stacks, pitch decks, market map, articles
 */

export interface FirmTool {
  name: string
  category: string
  logo: string
  link: string
}

export interface Firm {
  name: string
  slug: string
  description: string
  logo: string
  location: string
  website: string
  twitter?: string
  linkedin?: string
  tools: FirmTool[]
}

export interface PitchDeck {
  title: string
  description: string
  link: string
  image: string
}

export interface Article {
  title: string
  author: string
  url: string
}

// ─── VC Firm Stacks ──────────────────────────────────────────────────────────

export const FIRMS: Firm[] = [
  {
    name: 'Weekend Fund',
    slug: 'weekend-fund',
    description: 'An early-stage fund from the founder of Product Hunt Ryan Hoover',
    logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/62037938a59d8a56833c7917_weekend-fund.png',
    location: 'San Francisco, California, US',
    website: 'https://www.weekend.fund/',
    twitter: 'https://twitter.com/weekendfund',
    linkedin: 'https://www.linkedin.com/company/weekend-fund/',
    tools: [
      { name: 'Zapier',    category: 'Other Tools',          logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f7544b9818e3000d14943_zapier.jpg',           link: '/product/zapier' },
      { name: 'Airtable',  category: 'Other Tools',          logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f751d1c9f767d0c98ffc5_airtable.jpg',         link: '/product/airtable' },
      { name: 'Spark',     category: 'Email',                logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f743d94ad3c4ff6a2eb10_SparkMailApp.png',      link: '/product/spark' },
      { name: 'Vimcal',    category: 'Calendar',             logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f83eb3f4e72c653e97ed9_vimcal-logo.jpeg',     link: '/product/vimcal' },
      { name: 'AngelList', category: 'Fund Admin & Reporting', logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/67efc61f0f0757586adbc3e7_VC%20Stack_AL%20Logo.jpg', link: '/product/angellist' },
      { name: 'Slack',     category: 'Other Tools',          logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f823c6ae82182a86c1c33_slack.jpeg',           link: '/product/slack' },
    ],
  },
  {
    name: 'Point Nine',
    slug: 'point-nine',
    description: "An early-stage venture capital fund focused on backing seed-stage B2B SaaS and B2B marketplace entrepreneurs anywhere in the world.",
    logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/62037cc7ca7fbd32e5bb4804_point-nine%201.svg',
    location: 'Berlin, Germany',
    website: 'https://www.pointnine.com/',
    twitter: 'https://twitter.com/pointninecap',
    linkedin: 'https://www.linkedin.com/company/point-nine-capital/',
    tools: [
      { name: 'Mailchimp',   category: 'Newsletter Tools',  logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f9091a377dc2ac8969ae7_mailchimp-logo.jpeg',  link: '/product/mailchimp' },
      { name: 'Zapier',      category: 'Other Tools',       logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f7544b9818e3000d14943_zapier.jpg',           link: '/product/zapier' },
      { name: 'Calendly',    category: 'Calendar',          logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f9022a2e9f060c9c7b438_calendly.jpeg',        link: '/product/calendly' },
      { name: 'Slack',       category: 'Other Tools',       logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f823c6ae82182a86c1c33_slack.jpeg',           link: '/product/slack' },
      { name: 'Zoom',        category: 'Video Conferencing', logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f79469ce7805fda828af9_Zoom.jpg',            link: '/product/zoom' },
      { name: 'Recruitee',   category: 'Hiring & Payroll',  logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/621491a9d027c43ec88141b2_recruitee.png',        link: '/product/recruitee' },
      { name: 'Typeform',    category: 'Other Tools',       logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/621557e8693a152b66d49882_Typeform.png',         link: '/product/typeform' },
      { name: 'Unbounce',    category: 'Website',           logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/621557fbb8ffd0e4d3a4ac25_Unbounce.png',        link: '/product/unbounce' },
      { name: 'Contentful',  category: 'Website',           logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/621557a08ff6d38268f60ab9_Contentful.png',       link: '/product/contentful' },
      { name: 'Qwilr',       category: 'Other Tools',       logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/621557adc0d806ca51e7d36d_qwilr.png',           link: '/product/qwilr' },
      { name: '15Five',      category: 'Hiring & Payroll',  logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6215571cc2a22edfc46d412b_15five.png',           link: '/product/15five' },
      { name: 'ChartMogul',  category: 'Data',              logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6215572dc0d8064cdbe7cee1_Chartmogul.png',       link: '/product/chartmogul' },
    ],
  },
  {
    name: 'COCOA',
    slug: 'cocoa',
    description: 'Prev VC, now angels \ud83d\ude07',
    logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6346715a4f11843a9a9afa81_cocoa.jpg',
    location: 'London, UK',
    website: 'https://www.cocoa.vc/',
    twitter: 'https://twitter.com/cocoadotvc',
    tools: [
      { name: 'AngelList',   category: 'Fund Admin & Reporting', logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/67efc61f0f0757586adbc3e7_VC%20Stack_AL%20Logo.jpg', link: '/product/angellist' },
      { name: 'Vestberry',   category: 'Portfolio Management',   logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/69cf4341db4a772b06eb0a78_logo_icon_vestberry.png',  link: '/product/vestberry' },
      { name: 'Attio',       category: 'CRM',                    logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63a08d0b3286ec5ebf9919bf_attio_Logo.png',            link: '/product/attio' },
      { name: 'Airtable',    category: 'Other Tools',            logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f751d1c9f767d0c98ffc5_airtable.jpg',              link: '/product/airtable' },
      { name: 'Superhuman',  category: 'Email',                  logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f743637a61e1a4744e005_Superhuman.jpg',            link: '/product/superhuman' },
      { name: 'Asana',       category: 'Project Management',     logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f748b256f1283d768a756_asana.jpg',                 link: '/product/asana' },
      { name: 'DocSend',     category: 'Data Room',              logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/62876995b8868b1d167f8770_docsend.jpg',               link: '/product/docsend' },
      { name: 'Zoom',        category: 'Video Conferencing',     logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f79469ce7805fda828af9_Zoom.jpg',                  link: '/product/zoom' },
    ],
  },
  {
    name: 'Hustle Fund',
    slug: 'hustle-fund',
    description: 'Great hustlers look like anyone and come from anywhere. \ud83d\udc9b',
    logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63f761cd41d6554c29ae42f0_hustle-fund.jpeg',
    location: 'San Carlos, California',
    website: 'https://www.hustlefund.vc/',
    twitter: 'https://twitter.com/HustleFundVC',
    linkedin: 'https://www.linkedin.com/company/hustle-fund/',
    tools: [
      { name: 'Carta',       category: 'Captable / Equity Management', logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6352538ab5ad36dc03d74ec2_carta.svg',         link: '/product/carta' },
      { name: 'Pipedrive',   category: 'CRM',                          logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e199d5ee21c80242b7a4f_pipedrive.jpg',     link: '/product/pipedrive' },
      { name: 'Airtable',    category: 'Other Tools',                  logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f751d1c9f767d0c98ffc5_airtable.jpg',      link: '/product/airtable' },
      { name: 'Calendly',    category: 'Calendar',                     logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f9022a2e9f060c9c7b438_calendly.jpeg',     link: '/product/calendly' },
      { name: 'Typeform',    category: 'Other Tools',                  logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/621557e8693a152b66d49882_Typeform.png',      link: '/product/typeform' },
      { name: 'Slack',       category: 'Other Tools',                  logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f823c6ae82182a86c1c33_slack.jpeg',        link: '/product/slack' },
      { name: 'Mailchimp',   category: 'Newsletter Tools',             logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f9091a377dc2ac8969ae7_mailchimp-logo.jpeg', link: '/product/mailchimp' },
      { name: 'Superhuman',  category: 'Email',                        logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f743637a61e1a4744e005_Superhuman.jpg',    link: '/product/superhuman' },
      { name: 'Notion',      category: 'Project Management',           logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f7fcfc79e7397441544d1_notion.png',        link: '/product/notion' },
      { name: 'Vimcal',      category: 'Calendar',                     logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f83eb3f4e72c653e97ed9_vimcal-logo.jpeg',  link: '/product/vimcal' },
      { name: 'Webflow',     category: 'Website',                      logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f73ff7808424572ca8194_Webflow.jpg',       link: '/product/webflow' },
      { name: 'Zapier',      category: 'Other Tools',                  logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f7544b9818e3000d14943_zapier.jpg',        link: '/product/zapier' },
    ],
  },
  {
    name: 'Angel School',
    slug: 'angel-school',
    description: 'We help Angel investors build, run and scale their own syndicates',
    logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/641d820672db5f969fc2f9f9_angelschool.svg',
    location: 'Singapore',
    website: 'https://www.angelschool.vc/',
    linkedin: 'https://www.linkedin.com/company/angelschool/',
    tools: [
      { name: 'Affinity',    category: 'CRM',                          logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/62038b0866390345a74f8a30_affinity.png',      link: '/product/affinity' },
      { name: 'Airtable',    category: 'Other Tools',                  logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f751d1c9f767d0c98ffc5_airtable.jpg',      link: '/product/airtable' },
      { name: 'Crunchbase',  category: 'Data',                         logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e0d63a00dc07e99e22bee_Crunchbase1.jpg',   link: '/product/crunchbase' },
      { name: 'Seedscout',   category: 'Deal Sourcing',                logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620d779a1c91a5b89196733a_seedscout.jpg',     link: '/product/seedscout' },
      { name: 'Visible.vc',  category: 'Portfolio Management',         logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/65a01577266a13d8f29bf44d_Visible_Logo.png',  link: '/product/visible-vc' },
      { name: 'Pulley',      category: 'Captable / Equity Management', logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e1660487ccbd64ffc7c89_pulley.jpg',        link: '/product/pulley' },
      { name: 'Sydecar',     category: 'Infrastructure',               logo: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/65c2cb0b9e92b89e776dbcdc_3.svg',             link: '/product/sydecar' },
    ],
  },
]

// ─── Pitch Decks ─────────────────────────────────────────────────────────────

export const PITCH_DECKS: PitchDeck[] = [
  { title: 'Shrug Capital',              description: 'This is the deck Shrug Capital uses to promote their early stage consumer vc fund.',                                                                  link: 'https://docsend.com/view/q7t34yjccmcbvrrn',                                                                                  image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e7bf6e78b0cf5f3bdb05d_shrug-capital.jpg' },
  { title: 'Spacecadet',                 description: 'Spacecadet used a very unusual, but very successful approach to pitching their $10M fund to investors.',                                              link: 'https://spacecadet.ventures/fund/',                                                                                          image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e7cdd6c004e32b37ff44d_spacecadet.png' },
  { title: 'Seedcamp Fund V',            description: 'This is the deck seedcamp used to raise their heavily-oversubscribed Seedcamp Fund V.',                                                              link: 'https://www.slideshare.net/seedcamp/seedcamp-fund-v-fundraising-deck/1',                                                     image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e91bc2d1e1e347ad05139_seedcamp.png' },
  { title: 'Hack Fund V',                description: 'This is the presentation Hack Fund used to raise their publicly-traded Fund V.',                                                                     link: 'https://www.slideshare.net/hackersandfounders/hack-fund-v-pitch-deck',                                                       image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e92f5aab2526ba7424fda_hackfund.png' },
  { title: 'Notation Capital Fund 1',    description: 'This is the pitch deck they used to raise Notation Capital Fund 1 in 2014.',                                                                         link: 'https://www.slideshare.net/Notation/notation-capital-fund-1-pitch-deck',                                                     image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e93ac46158a50f5b5f1b0_notation-capital.jpeg' },
  { title: 'Worklife.vc',                description: 'These are parts of the deck Brianne Kimmel used to convince Marc Andreessen and other investors to invest in her first fund.',                        link: 'http://briannekimmel.com/what-it-takes-to-start-your-own-vc-fund/',                                                          image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620e947b6589187f68f8259e_work-life-ventures-icon-idx3kss9po.jpeg' },
  { title: 'Slingshot Venture Fund',     description: 'The $15 million fund has been formed as an Early Stage Venture Capital Limited Partnership (ESVCLP) registered with Innovation and Science Australia.', link: 'https://www.alexanderjarvis.com/vc-pitch-deck-slingshot-venture-fund/',                                                      image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6210da28016b5b9c118fb222_Slingshot.png' },
  { title: 'Day One Ventures',           description: 'Day One Ventures, a venture fund launched in 2018 by 29-year-old Russian-born entrepreneur Masha Drokova',                                           link: 'https://www.businessinsider.com/day-one-ventures-pitch-deck-2019-3',                                                         image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6210daf6fe815b7b04600bdb_day%20one%20ventures.png' },
  { title: 'Alpha Bridge Ventures',      description: 'We take a humanistic approach by working closely with founding teams to help them accelerate towards their Series A.',                                link: 'https://labyrinth.substack.com/p/alpha-bridge-deck-review-by-superlp?utm_source=url',                                        image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6210db9f7e04cb619ce3d144_Alpha%20Bridge%20Ventures%203.JPG' },
  { title: 'CapitalX',                   description: '@CindyBiSV fund - angel investor turned GP.',                                                                                                        link: 'https://docs.google.com/presentation/d/1_wtVQPt6o-amrw7Y8XAeFHcYyus9VAV-jLDHZ9Pn-08/mobilepresent?slide=id.ga4a7146f5b_1_0', image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/624e91327b2d41294ba042e8_rs%3Dw-1200%2Ch-600%2Ccg-true%2Cm.jpeg' },
  { title: 'Awesome People Ventures',    description: 'AWESOME PEOPLE VENTURES is focused on improving the way we live and work.',                                                                          link: 'https://drive.google.com/file/d/1kCq-9yWa3mmeIiaUnLPztmvdkWUGwVMH/view',                                                    image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63467689475b5483c3644ef7_awesome-people-ventures-fund-deck.png' },
  { title: 'Earl Grey Capital Fund II',  description: 'Earl Grey is an $20M early stage venture fund with founders backing founders.',                                                                      link: 'https://drive.google.com/file/d/1z-aUhdYYeIiHdb_zwrEcV5bmNDx4oCu7/view',                                                    image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/634677481835ea5879ccfe59_earl-grey-capital.jpg' },
  { title: 'Long Journey Ventures',      description: '$35M early stage fund - going long with long-term people.',                                                                                          link: 'https://drive.google.com/file/d/1loQ4CddQVGWnLxZTXBKqMPFaehu7sf1j/view',                                                    image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63467859c9af4603bb6aece9_long-journey-ventures-pitch-deck.jpeg' },
  { title: 'Not Boring Capital Fund I',  description: 'Not Boring Capital invests in companies with stories to tell, and helps tell them.',                                                                 link: 'https://drive.google.com/file/d/1IAkd9JzlMGhrqPjOMDsynuDKaE9qZ7-7/view',                                                    image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/634678d2e1eb3157a973538a_not-boring-capital-fund-deck.png' },
  { title: 'Not Boring Capital Fund II', description: '$25M fund II of Packy McCormick',                                                                                                                    link: 'https://drive.google.com/file/d/1iR4DVyIIOi6OYU6VWvDq2opX_i-wVIhS/view',                                                    image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/634678d2e1eb3157a973538a_not-boring-capital-fund-deck.png' },
  { title: 'Precursor Ventures Fund III', description: '$40 Million Pre-Seed Venture Fund',                                                                                                                 link: 'https://drive.google.com/file/d/1Jhpbz95IfFE8iyVMS7oAvIYC0OtBtVlE/view',                                                    image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63467a2e3d77ee8e7e50e186_precusor-ventures-deck.jpeg' },
  { title: 'Susa Ventures IV',           description: 'SF-based seed-stage VC fund investing in founders building value & defensibility through data, network effects, & economies of scale.',              link: 'https://drive.google.com/file/d/1WZnQYPIVY6L_Vqe1-1eJBMdv0dLpQX2q/view',                                                    image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63467aac3d77ee15b350e22e_susa-ventures-pitch-deck.webp' },
  { title: "Todd and Rahul\u2019s Angel Fund", description: 'We help startups find product/market fit faster, supercharge their distribution, and raise from the best investors.',                           link: 'https://drive.google.com/file/d/1XkcnKnvNiZX7SZft9kqZBHvOE-5LvdEW/view',                                                    image: 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63467b21bbc98fa2d92b2f60_tandrahul-angel-fund.png' },
]

// ─── Market Map ──────────────────────────────────────────────────────────────

export const MARKET_MAP = {
  title: 'VC Tool Stack Market Map',
  description: 'A quick visual overview of all the tools that VC and angel investors can use for their investing activities.',
  image: 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/634ecd22dd8cb35a6df195eb_vcstack-marketmap.png',
  pdf: 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/634ecd86ed422607ffdcab05_vc-stack-marketmap_compressed.pdf',
}

// ─── Articles & Resources ────────────────────────────────────────────────────

export const ARTICLES: Article[] = [
  { title: 'The VC Tech Stack',                                       author: 'Francesco Corea',      url: 'https://francesco-ai.medium.com/the-vc-tech-stack-77eb94f6e230' },
  { title: 'VC Tech Stack - 2021',                                    author: 'Miguel Pinho, Seedcamp', url: 'https://www.slideshare.net/megafu/vc-tech-stack-2021-249369712' },
  { title: 'Tech Stacks to Scale a VC Fund Efficiently',              author: 'Erica Amatori',        url: 'https://medium.com/alpaca-vc/part-2-tech-stacks-to-scale-avc-fund-efficiently-8fd2bb42ba1b' },
  { title: 'How PE & VC investors are using technology and analytics', author: 'David Teten',          url: 'https://versatilevc.com/tech-stack/' },
  { title: 'The Future of VC: Augmenting Humans with AI',             author: 'Andre Retterath',      url: 'https://medium.com/birds-view/the-future-of-vc-augmenting-humans-with-ai-30f1d79a09c3' },
  { title: 'The syndicates toolbox',                                  author: 'Sam Loui',             url: 'https://www.sydecar.io/blog-detail/the-syndicates-toolbox' },
  { title: 'Evolving from spreadsheets to Vestberry',                 author: 'Connect Ventures',     url: 'https://medium.com/@andrew_44578/portfolio-fund-management-software-evolution-2874bd162954' },
  { title: 'Data-driven Landscape 2024 powered by VESTBERRY',         author: 'VESTBERRY',            url: 'https://vestberry.com/blog/the-data-driven-vc-landscape-2024-report' },
]
