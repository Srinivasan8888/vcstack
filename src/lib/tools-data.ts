/**
 * Comprehensive tool catalog for vcstack.io clone.
 * All ~500 tools from the real vcstack.io, mapped to their correct categories.
 */

import type { Tool, Category, PricingModel } from './types'

// ─── Compact tool builder ────────────────────────────────────────────────────

let _catResolver: (id: string) => Category

export function setCategoryResolver(fn: (id: string) => Category) {
  _catResolver = fn
}

// Logo overrides — Google favicon API (free, reliable, no auth)
// Format: https://www.google.com/s2/favicons?domain={domain}&sz=128
const G = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

const LOGO_OVERRIDES: Record<string, string> = {
  // ── Deal Sourcing ─────────────────────────────────────────────────────────
  'pitchbook':          G('pitchbook.com'),
  'cb-insights':        G('cbinsights.com'),
  'crunchbase':         G('crunchbase.com'),
  'harmonic':           G('harmonic.ai'),
  'tracxn':             G('tracxn.com'),
  'dealroom':           G('dealroom.co'),
  'grata':              G('grata.com'),
  'sourcescrub':        G('sourcescrub.com'),
  'angellist':          G('angellist.com'),
  'product-hunt':       G('producthunt.com'),
  'ourcrowd':           G('ourcrowd.com'),
  'republic':           G('republic.com'),
  'crowdcube':          G('crowdcube.com'),
  'flippa':             G('flippa.com'),
  'wefunder':           G('wefunder.com'),
  // ── CRM ──────────────────────────────────────────────────────────────────
  'affinity':           G('affinity.co'),
  'attio':              G('attio.com'),
  'salesforce':         G('salesforce.com'),
  'hubspot':            G('hubspot.com'),
  'pipedrive':          G('pipedrive.com'),
  'copper':             G('copper.com'),
  'close':              G('close.com'),
  'streak':             G('streak.com'),
  'folk':               G('folk.app'),
  'notion':             G('notion.so'),
  'airtable':           G('airtable.com'),
  // ── Portfolio Management ──────────────────────────────────────────────────
  'visible':            G('visible.vc'),
  'carta':              G('carta.com'),
  'edda':               G('edda.co'),
  'causal':             G('causal.app'),
  // ── Fund Admin ────────────────────────────────────────────────────────────
  'juniper-square':     G('junipersquare.com'),
  'allvue':             G('allvue.com'),
  // ── Data Room ─────────────────────────────────────────────────────────────
  'docsend':            G('docsend.com'),
  'dropbox':            G('dropbox.com'),
  'box':                G('box.com'),
  'digify':             G('digify.com'),
  'intralinks':         G('intralinks.com'),
  'datasite':           G('datasite.com'),
  // ── Research ─────────────────────────────────────────────────────────────
  'linkedin':           G('linkedin.com'),
  'semrush':            G('semrush.com'),
  'similarweb':         G('similarweb.com'),
  'g2':                 G('g2.com'),
  'glassdoor':          G('glassdoor.com'),
  'owler':              G('owler.com'),
  // ── Email ─────────────────────────────────────────────────────────────────
  'mailchimp':          G('mailchimp.com'),
  'sendgrid':           G('sendgrid.com'),
  'klaviyo':            G('klaviyo.com'),
  'constant-contact':   G('constantcontact.com'),
  // ── ESG ──────────────────────────────────────────────────────────────────
  'workiva':            G('workiva.com'),
  'novata':             G('novata.com'),
  // ── Hiring & Payroll ─────────────────────────────────────────────────────
  'greenhouse':         G('greenhouse.io'),
  'lever':              G('lever.co'),
  'workable':           G('workable.com'),
  'rippling':           G('rippling.com'),
  'gusto':              G('gusto.com'),
  'deel':               G('deel.com'),
  'remote':             G('remote.com'),
  // ── Infrastructure / Platform ─────────────────────────────────────────────
  'slack':              G('slack.com'),
  'linear':             G('linear.app'),
  'webflow':            G('webflow.com'),
  'wordpress':          G('wordpress.com'),
  'squarespace':        G('squarespace.com'),
  'framer':             G('framer.com'),
  'ghost':              G('ghost.org'),
  // ── Calendar ─────────────────────────────────────────────────────────────
  'calendly':           G('calendly.com'),
  'cal-com':            G('cal.com'),
  'savvycal':           G('savvycal.com'),
  'doodle':             G('doodle.com'),
  // ── Video Conferencing ────────────────────────────────────────────────────
  'zoom':               G('zoom.us'),
  'loom':               G('loom.com'),
  // ── Project Management ────────────────────────────────────────────────────
  'asana':              G('asana.com'),
  'monday-com':         G('monday.com'),
  'trello':             G('trello.com'),
  'clickup':            G('clickup.com'),
  'basecamp':           G('basecamp.com'),
  // ── Newsletter ───────────────────────────────────────────────────────────
  'substack':           G('substack.com'),
  'beehiiv':            G('beehiiv.com'),
  'convertkit':         G('convertkit.com'),
  // ── Captable ─────────────────────────────────────────────────────────────
  'pulley':             G('pulley.com'),
  // ── Community ────────────────────────────────────────────────────────────
  'circle':             G('circle.so'),
  'discord':            G('discord.com'),
  'mighty-networks':    G('mightynetworks.com'),
  // ── LP Tools ─────────────────────────────────────────────────────────────
  'dynamo':             G('dynamosoftware.com'),
}

const SCREENSHOT_OVERRIDES: Record<string, string> = {
}

function t(
  id: string,
  name: string,
  slug: string,
  shortDesc: string,
  description: string,
  websiteUrl: string,
  pricingModel: PricingModel,
  categoryId: string,
  isFeatured = false,
  logoUrl: string | null = null,
  screenshotUrl: string | null = null,
): Tool {
  // Auto-derive logo from websiteUrl when no explicit override or logoUrl given
  let resolvedLogo = LOGO_OVERRIDES[slug] ?? logoUrl ?? null
  if (!resolvedLogo && websiteUrl) {
    try {
      const domain = new URL(websiteUrl).hostname.replace(/^www\./, '')
      resolvedLogo = G(domain)
    } catch { /* malformed URL — skip */ }
  }

  return {
    id, name, slug, shortDesc, description, websiteUrl,
    logoUrl: resolvedLogo,
    screenshotUrl: SCREENSHOT_OVERRIDES[slug] ?? screenshotUrl ?? null,
    pricingModel, isFeatured, categoryId, category: _catResolver(categoryId),
    tags: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  }
}

// ─── Build all tools ─────────────────────────────────────────────────────────

export function buildAllTools(): Tool[] {
  return [
    // ═══════════════════════════════════════════════════════════════════════
    // DEAL SOURCING (cat-1) — ~55 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-1', 'PitchBook', 'pitchbook', 'Comprehensive private market data and analytics platform.', 'PitchBook is a financial data and software company providing data on the capital markets including venture capital, private equity, and M&A transactions.', 'https://pitchbook.com', 'PAID', 'cat-1', true),
    t('t-2', 'CB Insights', 'cb-insights', 'AI-powered market intelligence for private markets.', 'CB Insights is a business analytics platform that provides technology market intelligence data for VC firms.', 'https://cbinsights.com', 'PAID', 'cat-1', true),
    t('t-3', 'Crunchbase', 'crunchbase', 'Startup data and investment intelligence platform.', 'Crunchbase is the leading destination for company insights from early-stage startups to the Fortune 1000.', 'https://crunchbase.com', 'FREEMIUM', 'cat-1'),
    t('t-4', 'Harmonic', 'harmonic', 'Real-time company intelligence for deal sourcing.', 'Harmonic provides real-time company intelligence and signals to help investors find the best companies before everyone else.', 'https://harmonic.ai', 'PAID', 'cat-1', true, 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/65522cf53ea3eaefaf2e450d_harmonic.svg', 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/655233fc4c1efee3dcbde35b_harmonic-ipo.jpg'),
    t('t-5', 'Tracxn', 'tracxn', 'Startup tracking and market research for VCs.', 'Tracxn is a market intelligence platform enabling investors to track startups and emerging technology trends across thousands of sectors.', 'https://tracxn.com', 'PAID', 'cat-1'),
    t('t-6', 'Dealroom', 'dealroom', 'Global startup & VC database with deal flow tools.', 'Dealroom provides data-driven intelligence on startups, growth companies and tech ecosystems globally.', 'https://dealroom.co', 'PAID', 'cat-1', true),
    t('t-7', 'Grata', 'grata', 'AI-powered company search for deal sourcing.', 'Grata helps private equity and venture capital firms find and research privately-held companies using AI-driven search.', 'https://grata.com', 'PAID', 'cat-1'),
    t('t-8', 'SourceScrub', 'sourcescrub', 'Data-driven deal origination platform.', 'SourceScrub provides proprietary data and research tools that help deal professionals find, track and connect with privately held businesses.', 'https://sourcescrub.com', 'PAID', 'cat-1'),
    t('t-9', 'Cyndx', 'cyndx', 'AI-driven deal sourcing and data analytics.', 'Cyndx uses artificial intelligence and machine learning to help investors discover, analyze and connect with companies and opportunities.', 'https://cyndx.com', 'PAID', 'cat-1'),
    t('t-10', 'Specter', 'specter', 'Startup intelligence and deal sourcing platform.', 'Specter provides actionable startup data and AI-powered insights to help investors identify promising investment opportunities.', 'https://specter.com', 'PAID', 'cat-1'),
    t('t-11', 'Koble', 'koble', 'AI matchmaking between startups and investors.', 'Koble uses AI to match startups with investors based on investment thesis, stage, and sector preferences.', 'https://koble.com', 'FREEMIUM', 'cat-1'),
    t('t-12', 'Foundernest', 'foundernest', 'AI-powered deal flow management for VCs.', 'Foundernest helps venture capital firms automate and optimize their deal flow using artificial intelligence.', 'https://foundernest.com', 'PAID', 'cat-1'),
    t('t-13', 'Syfter', 'syfter', 'AI startup screening and deal sourcing.', 'Syfter uses machine learning to help investors screen and evaluate startups at scale.', 'https://syfter.com', 'PAID', 'cat-1'),
    t('t-14', 'Valuer AI', 'valuer-ai', 'AI-powered innovation and startup discovery.', 'Valuer uses AI to help corporations and investors discover, track, and evaluate innovative startups and technologies.', 'https://valuer.ai', 'PAID', 'cat-1'),
    t('t-15', 'StartUs Insights', 'startus-insights', 'Data-driven startup scouting platform.', 'StartUs Insights covers 4.7M+ startups and scale-ups globally, providing data-driven innovation intelligence.', 'https://startus-insights.com', 'PAID', 'cat-1'),
    t('t-16', 'StartupRadar', 'startupradar', 'AI-powered startup discovery and analysis.', 'StartupRadar helps investors discover and analyze startups using machine learning and data analytics.', 'https://startupradar.co', 'FREEMIUM', 'cat-1'),
    t('t-17', 'Novable', 'novable', 'AI startup scouting for investors and corporates.', 'Novable uses deep matching AI to connect organizations with relevant startups for investment or collaboration.', 'https://novable.com', 'PAID', 'cat-1'),
    t('t-18', 'Raized.AI', 'raized-ai', 'AI-driven startup analysis and deal evaluation.', 'Raized.AI leverages artificial intelligence to analyze startups and help investors make data-driven decisions.', 'https://raized.ai', 'PAID', 'cat-1'),
    t('t-19', 'OpenScout', 'openscout', 'Open-source startup scouting tool.', 'OpenScout provides open-source tools for discovering and evaluating startup investment opportunities.', 'https://openscout.com', 'FREE', 'cat-1'),
    t('t-20', 'Metabeta', 'metabeta', 'Startup-investor matching platform.', 'Metabeta connects startups with relevant investors based on sector, stage, and geographic preferences.', 'https://metabeta.com', 'FREEMIUM', 'cat-1'),
    t('t-21', 'Oddup', 'oddup', 'Startup ratings and analytics for investors.', 'Oddup provides startup health ratings and analytics to help investors evaluate potential investments.', 'https://oddup.com', 'FREEMIUM', 'cat-1'),
    t('t-22', 'InnoSpot', 'innospot', 'Innovation and startup scouting platform.', 'InnoSpot helps corporations and investors discover and track innovative startups and emerging technologies.', 'https://innospot.de', 'PAID', 'cat-1'),
    t('t-23', 'Early Metrics', 'early-metrics', 'Startup rating and innovation analytics.', 'Early Metrics provides independent startup ratings and innovation analytics for investors and corporates.', 'https://earlymetrics.com', 'PAID', 'cat-1'),
    t('t-24', 'EasyVC', 'easyvc', 'VC deal flow management simplified.', 'EasyVC streamlines deal flow management for venture capital firms with an intuitive platform.', 'https://easyvc.io', 'FREEMIUM', 'cat-1'),
    t('t-25', 'DealPotential', 'dealpotential', 'AI deal sourcing for private equity and VC.', 'DealPotential uses AI and big data to help PE and VC firms discover and evaluate potential investment targets.', 'https://dealpotential.com', 'PAID', 'cat-1'),
    t('t-26', 'DealFabric', 'dealfabric', 'CRM and deal management for investors.', 'DealFabric is a CRM built for private equity, venture capital, and investment banking professionals.', 'https://dealfabric.com', 'PAID', 'cat-1'),
    t('t-27', 'Venture Source', 'venture-source', 'Private company data from Dow Jones.', 'Venture Source by Dow Jones provides comprehensive data on venture-backed companies, investors, and deals.', 'https://dowjones.com', 'PAID', 'cat-1'),
    t('t-28', 'CircleUp', 'circleup', 'ML-powered deal sourcing for consumer brands.', 'CircleUp uses machine learning to identify promising consumer and retail companies for investment.', 'https://circleup.com', 'PAID', 'cat-1'),
    t('t-29', 'Axial', 'axial', 'Deal sourcing network for lower middle market.', 'Axial connects business owners, advisors, and capital partners for lower middle-market M&A transactions.', 'https://axial.net', 'PAID', 'cat-1'),
    t('t-30', 'Gust', 'gust', 'Startup funding platform for angel investors.', 'Gust connects startups with a global network of angel investors, accelerators, and venture capital firms.', 'https://gust.com', 'FREEMIUM', 'cat-1'),
    t('t-31', 'Fundable', 'fundable', 'Crowdfunding platform for startup fundraising.', 'Fundable is a crowdfunding platform that helps startups raise capital from accredited investors.', 'https://fundable.com', 'PAID', 'cat-1'),
    t('t-32', 'AngelList', 'angellist', 'Platform for startups, angels, and VCs.', 'AngelList is the leading platform connecting startups with investors, offering syndication, fund management, and recruiting.', 'https://angellist.com', 'FREEMIUM', 'cat-1', true),
    t('t-33', 'SeedInvest', 'seedinvest', 'Equity crowdfunding for vetted startups.', 'SeedInvest is a leading equity crowdfunding platform offering vetted startup investment opportunities.', 'https://seedinvest.com', 'FREE', 'cat-1'),
    t('t-34', 'WeFunder', 'wefunder', 'Community-powered startup investing.', 'WeFunder enables anyone to invest as little as $100 in startups they believe in through equity crowdfunding.', 'https://wefunder.com', 'FREE', 'cat-1'),
    t('t-35', 'Republic', 'republic', 'Investment platform for private deals.', 'Republic provides access to private investment opportunities across startups, crypto, real estate, and more.', 'https://republic.com', 'FREE', 'cat-1'),
    t('t-36', 'Crowdcube', 'crowdcube', 'UK-based equity crowdfunding platform.', 'Crowdcube is one of the largest equity crowdfunding platforms in Europe, connecting investors with ambitious businesses.', 'https://crowdcube.com', 'FREE', 'cat-1'),
    t('t-37', 'Indiegogo', 'indiegogo', 'Crowdfunding marketplace for ideas.', 'Indiegogo is a global crowdfunding platform where entrepreneurs launch and fund innovative products and ideas.', 'https://indiegogo.com', 'FREEMIUM', 'cat-1'),
    t('t-38', 'MicroVentures', 'microventures', 'Online venture capital and crowdfunding.', 'MicroVentures provides access to startup investment opportunities through online venture capital and equity crowdfunding.', 'https://microventures.com', 'FREE', 'cat-1'),
    t('t-39', 'Funderbeam', 'funderbeam', 'Startup funding and secondary trading platform.', 'Funderbeam combines startup funding and secondary market trading for private company shares.', 'https://funderbeam.com', 'FREEMIUM', 'cat-1'),
    t('t-40', 'SeedBlink', 'seedblink', 'European equity crowdfunding for tech startups.', 'SeedBlink is a European co-investment platform for technology startups connecting investors and founders.', 'https://seedblink.com', 'FREE', 'cat-1'),
    t('t-41', 'StartEngine', 'startengine', 'Equity crowdfunding for everyone.', 'StartEngine enables companies to raise capital through Regulation Crowdfunding and Regulation A+ offerings.', 'https://startengine.com', 'FREE', 'cat-1'),
    t('t-42', 'Netcapital', 'netcapital', 'Online investment platform for startups.', 'Netcapital is a fintech company that operates an online investment platform enabling investors to buy shares in startups.', 'https://netcapital.com', 'FREE', 'cat-1'),
    t('t-43', 'OurCrowd', 'ourcrowd', 'Global venture investing platform.', 'OurCrowd is a global venture investing platform that provides investors access to curated startup deals.', 'https://ourcrowd.com', 'PAID', 'cat-1'),
    t('t-44', 'Acquire.com', 'microacquire', 'Startup acquisition marketplace.', 'Acquire.com (formerly MicroAcquire) is the #1 startup acquisition marketplace connecting buyers and sellers of startups.', 'https://acquire.com', 'FREEMIUM', 'cat-1'),
    t('t-45', 'Flippa', 'flippa', 'Marketplace for buying & selling online businesses.', 'Flippa is the leading marketplace for buying and selling online businesses including websites, apps, and e-commerce stores.', 'https://flippa.com', 'FREEMIUM', 'cat-1'),
    t('t-46', 'FE International', 'fe-international', 'M&A advisory for SaaS, e-commerce & content.', 'FE International is an M&A advisory firm specializing in the sale of SaaS, e-commerce, and content businesses.', 'https://feinternational.com', 'PAID', 'cat-1'),
    t('t-47', 'Empire Flippers', 'empire-flippers', 'Curated marketplace for online businesses.', 'Empire Flippers is a marketplace for buying and selling established, profitable online businesses.', 'https://empireflippers.com', 'PAID', 'cat-1'),
    t('t-48', 'BetaList', 'betalist', 'Discover and get early access to startups.', 'BetaList provides a community of makers and early adopters to discover upcoming startups before they launch.', 'https://betalist.com', 'FREEMIUM', 'cat-1'),
    t('t-49', 'Product Hunt', 'product-hunt', 'Platform for discovering new tech products.', 'Product Hunt surfaces the best new products every day, serving as a discovery platform for tech enthusiasts and investors.', 'https://producthunt.com', 'FREE', 'cat-1'),
    t('t-50', 'Hacker News', 'hackernews', 'Tech news and startup community by Y Combinator.', 'Hacker News is a social news website focusing on computer science and entrepreneurship run by Y Combinator.', 'https://news.ycombinator.com', 'FREE', 'cat-1'),
    t('t-51', 'Score My Deck', 'score-my-deck', 'AI pitch deck analysis and scoring.', 'Score My Deck uses AI to analyze and score startup pitch decks, providing feedback for founders.', 'https://scoremydeck.com', 'FREEMIUM', 'cat-1'),
    t('t-52', 'DeckMatch', 'deckmatch', 'AI-powered investor-startup matching.', 'DeckMatch uses AI to analyze pitch decks and match startups with relevant investors.', 'https://deckmatch.com', 'FREEMIUM', 'cat-1'),
    t('t-53', 'House of Pitch', 'house-of-pitch', 'Pitch practice and investor matching.', 'House of Pitch helps founders practice their pitches and connect with relevant investors.', 'https://houseofpitch.com', 'FREEMIUM', 'cat-1'),
    t('t-54', 'Tell Your Startup', 'tell-your-startup', 'Startup publicity and investor discovery.', 'Tell Your Startup helps startups gain visibility and connect with potential investors and media.', 'https://tellyourstartup.com', 'FREE', 'cat-1'),
    t('t-55', 'Deal Tinder', 'deal-tinder', 'Swipe-based deal sourcing for investors.', 'Deal Tinder provides a swipe-based interface for investors to quickly evaluate deal flow opportunities.', 'https://deal-tinder.com', 'FREE', 'cat-1'),
    t('t-56', 'Flowlie', 'flowlie', 'Deal flow management for investors.', 'Flowlie helps investors manage and track deal flow from sourcing to closing with an intuitive platform.', 'https://flowlie.com', 'FREEMIUM', 'cat-1'),
    t('t-57', 'Finta', 'finta', 'Fundraising automation for startups.', 'Finta automates the fundraising process for startups, from investor outreach to closing.', 'https://finta.com', 'FREEMIUM', 'cat-1'),
    t('t-58', 'Proseeder', 'proseeder', 'Investment platform for private companies.', 'Proseeder provides investment infrastructure for private companies to manage their investor relations and fundraising.', 'https://proseeder.com', 'PAID', 'cat-1'),
    t('t-59', 'Questa AI', 'questa-ai', 'AI-powered startup analysis and due diligence.', 'Questa AI uses artificial intelligence to help investors analyze startups and conduct due diligence faster.', 'https://questa.ai', 'PAID', 'cat-1'),
    t('t-60', 'OpenVC', 'openvc', 'Open database of VC funds and investors.', 'OpenVC is an open database connecting startups with venture capital funds based on investment criteria.', 'https://openvc.app', 'FREE', 'cat-1'),
    t('t-61', 'Aquaty', 'aquaty', 'Digital investment platform for private markets.', 'Aquaty provides digital infrastructure for private market investments, connecting founders and investors.', 'https://aquaty.com', 'FREEMIUM', 'cat-1'),
    t('t-62', 'Floww', 'floww', 'Private market connectivity and deal management.', 'Floww connects companies and investors in private markets with deal flow management and portfolio tools.', 'https://floww.io', 'PAID', 'cat-1'),
    t('t-63', 'ConnectD', 'connectd', 'Investment-ready startup matching platform.', 'ConnectD connects investment-ready startups with relevant investors and advisors.', 'https://connectd.co', 'FREEMIUM', 'cat-1'),
    t('t-64', 'Blazebegin', 'blazebegin-2', 'AI startup evaluation and matching.', 'Blazebegin uses AI to evaluate startups and match them with compatible investors.', 'https://blazebegin.com', 'FREEMIUM', 'cat-1'),
    t('t-65', 'AQVC Discovery', 'aqvc-discovery-platform', 'VC deal discovery and analysis platform.', 'AQVC Discovery Platform helps venture capital firms discover and analyze potential investment opportunities.', 'https://aqvc.com', 'PAID', 'cat-1'),
    t('t-66', 'FundSup', 'fundsup', 'Investor-startup matching network.', 'FundSup is a matching network that connects startups with the right investors based on criteria matching.', 'https://fundsup.co', 'FREEMIUM', 'cat-1'),
    t('t-67', 'Seedscout', 'seedscout', 'Scout network for early-stage deal flow.', 'Seedscout enables VC firms to build and manage scout networks for sourcing early-stage deals.', 'https://seedscout.com', 'FREEMIUM', 'cat-1'),
    t('t-68', 'Callbox', 'callbox', 'B2B lead generation and deal sourcing.', 'Callbox provides AI-powered B2B lead generation and appointment setting services for investors and companies.', 'https://callboxinc.com', 'PAID', 'cat-1'),
    t('t-69', 'BuiltFirst', 'builtfirst', 'Technology-driven deal sourcing intelligence.', 'BuiltFirst provides technology intelligence to help investors identify companies based on their tech stack and growth signals.', 'https://builtfirst.com', 'PAID', 'cat-1'),
    t('t-70', 'Ventroduce', 'ventroduce', 'Warm introduction network for fundraising.', 'Ventroduce facilitates warm introductions between startups and investors through a structured referral network.', 'https://ventroduce.com', 'FREEMIUM', 'cat-1'),
    t('t-71', 'Contora', 'contora', 'Private market intelligence platform.', 'Contora provides proprietary private market data and intelligence for investors to discover and evaluate opportunities.', 'https://contora.ai', 'PAID', 'cat-1'),
    t('t-72', 'GatherVector', 'gathervector', 'Data-driven deal sourcing for VCs.', 'GatherVector helps venture capital firms source deals using data-driven approaches and automated intelligence.', 'https://gathervector.com', 'PAID', 'cat-1'),
    t('t-73', 'Thunder VC', 'thunder-vc', 'VC deal flow and portfolio management.', 'Thunder VC provides deal flow management and portfolio monitoring tools specifically designed for venture capital firms.', 'https://thunder.vc', 'PAID', 'cat-1'),
    t('t-74', 'Rings AI', 'rings-ai', 'AI relationship intelligence for deal sourcing.', 'Rings AI uses artificial intelligence to map relationship networks and surface deal sourcing opportunities.', 'https://rings.ai', 'PAID', 'cat-1'),
    t('t-75', 'Superwarm AI', 'superwarm-ai', 'AI-powered warm intros for investors.', 'Superwarm AI automates warm introductions between investors and startups using AI relationship mapping.', 'https://superwarm.ai', 'FREEMIUM', 'cat-1'),
    t('t-76', 'Dealum', 'dealum', 'Deal flow management for angel groups and VCs.', 'Dealum provides deal flow management tools for angel investor groups, syndicates and VC firms.', 'https://dealum.com', 'FREEMIUM', 'cat-1'),
    t('t-77', 'Foundersuite', 'foundersuite', 'Startup fundraising CRM and tools.', 'Foundersuite provides fundraising CRM, investor database, and startup tools for entrepreneurs raising capital.', 'https://foundersuite.com', 'FREEMIUM', 'cat-1'),
    t('t-78', 'FundersClub', 'fundersclub', 'Online venture capital platform.', 'FundersClub is an online venture capital platform enabling accredited investors to invest in top startups.', 'https://fundersclub.com', 'PAID', 'cat-1'),
    t('t-79', 'Zapflow', 'zapflow', 'Deal flow management for PE and VC.', 'Zapflow is a deal flow management platform designed for private equity and venture capital firms.', 'https://zapflow.com', 'PAID', 'cat-1'),
    t('t-80', 'RocketDAO', 'rocketdao', 'Decentralized startup evaluation platform.', 'RocketDAO provides decentralized startup evaluation and connects projects with investors and experts.', 'https://rocketdao.io', 'FREE', 'cat-1'),
    t('t-81', 'LeadLoft', 'leadloft', 'Prospecting and outreach for investors.', 'LeadLoft helps investors find and reach out to potential investment targets with automated prospecting tools.', 'https://leadloft.com', 'PAID', 'cat-1'),

    // ═══════════════════════════════════════════════════════════════════════
    // CRM (cat-2) — ~22 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-100', 'Affinity', 'affinity', 'Relationship intelligence CRM for dealmakers.', 'Affinity is a relationship intelligence platform that captures your team\'s network data to help win more deals. Purpose-built for VC and PE firms.', 'https://affinity.co', 'PAID', 'cat-2', true),
    t('t-101', 'DealCloud', 'dealcloud', 'Deal management and CRM for capital markets.', 'DealCloud is a deal and relationship management platform built specifically for private capital markets.', 'https://dealcloud.com', 'PAID', 'cat-2', true),
    t('t-102', 'Salesforce', 'salesforce', 'World\'s leading CRM with VC configurations.', 'Salesforce is the world\'s most popular CRM. Many VC firms use it with custom configurations to manage deal flow and portfolio relationships.', 'https://salesforce.com', 'PAID', 'cat-2'),
    t('t-103', 'Streak', 'streak', 'CRM built directly inside Gmail.', 'Streak is a CRM that lives inside Gmail, allowing VC firms to manage deal flow and relationships without leaving their email.', 'https://streak.com', 'FREEMIUM', 'cat-2'),
    t('t-104', 'HubSpot', 'hubspot', 'All-in-one CRM and marketing platform.', 'HubSpot is a comprehensive CRM platform with marketing, sales, and service tools used by many investment firms.', 'https://hubspot.com', 'FREEMIUM', 'cat-2'),
    t('t-105', 'Pipedrive', 'pipedrive', 'Sales CRM designed for deal tracking.', 'Pipedrive is a sales-focused CRM that helps investment professionals track deals through their pipeline stages.', 'https://pipedrive.com', 'PAID', 'cat-2'),
    t('t-106', 'Attio', 'attio', 'Next-gen CRM with real-time data enrichment.', 'Attio is a flexible CRM that automatically enriches contacts and companies with real-time data.', 'https://attio.com', 'FREEMIUM', 'cat-2'),
    t('t-107', 'Copper', 'copper', 'CRM built for Google Workspace.', 'Copper is a CRM designed to work seamlessly with Google Workspace, popular among investment firms using Gmail.', 'https://copper.com', 'PAID', 'cat-2'),
    t('t-108', 'Folk', 'folk', 'Lightweight CRM for relationship management.', 'Folk is a lightweight CRM that helps teams manage contacts and relationships across deal flow and portfolio.', 'https://folk.app', 'FREEMIUM', 'cat-2'),
    t('t-109', 'Insightly', 'insightly', 'CRM and project management for growing teams.', 'Insightly combines CRM and project management capabilities for mid-size investment firms.', 'https://insightly.com', 'FREEMIUM', 'cat-2'),
    t('t-110', 'CRMone', 'crmone', 'CRM for private equity and venture capital.', 'CRMone provides CRM solutions tailored for private equity and venture capital investment workflows.', 'https://crmone.com', 'PAID', 'cat-2'),
    t('t-111', 'Navatar', 'navatar', 'CRM for private equity deal management.', 'Navatar is a CRM platform built on Salesforce, tailored for private equity and investment banking deal management.', 'https://navatar.com', 'PAID', 'cat-2'),
    t('t-112', 'Satuit', 'satuit', 'CRM for asset and wealth management.', 'Satuit Technologies provides CRM and investor relations software for asset management and private equity.', 'https://satuit.com', 'PAID', 'cat-2'),
    t('t-113', 'EquityTouch', 'equity-touch', 'CRM for private equity professionals.', 'EquityTouch is a deal management CRM built for private equity firms to manage relationships and pipeline.', 'https://equitytouch.com', 'PAID', 'cat-2'),
    t('t-114', '4Degrees', '4degrees', 'Relationship intelligence CRM for investors.', '4Degrees is a relationship intelligence platform that helps investment professionals manage their networks and deal flow.', 'https://4degrees.ai', 'PAID', 'cat-2', true),
    t('t-115', 'Dialllog', 'dialllog', 'CRM designed for investor relations.', 'Dialllog provides CRM tools specifically designed for managing investor and startup relationships.', 'https://dialllog.com', 'PAID', 'cat-2'),
    t('t-116', 'Salesforge', 'salesforge', 'AI-powered sales engagement platform.', 'Salesforge helps investment teams scale outreach with AI-generated personalized communications.', 'https://salesforge.ai', 'PAID', 'cat-2'),
    t('t-117', 'Totem VC', 'totem-vc', 'CRM and deal flow for emerging VCs.', 'Totem VC provides deal flow management and CRM tools designed for emerging venture capital fund managers.', 'https://totemvc.com', 'FREEMIUM', 'cat-2'),
    t('t-118', 'Altvia', 'altvia', 'CRM and investor relations for alternatives.', 'Altvia provides CRM, data management, and investor portal solutions for alternative investment firms.', 'https://altvia.com', 'PAID', 'cat-2'),
    t('t-119', 'Edda', 'edda', 'VC deal flow and portfolio management platform.', 'Edda (formerly Kushim) provides deal flow management, portfolio monitoring, and CRM for VC and PE firms.', 'https://edda.co', 'PAID', 'cat-2', true),
    t('t-120', 'Auptimate', 'auptimate', 'Fundraising and investor management platform.', 'Auptimate helps fund managers and startups manage investor relations and fundraising processes.', 'https://auptimate.com', 'PAID', 'cat-2'),

    // ═══════════════════════════════════════════════════════════════════════
    // PORTFOLIO MANAGEMENT (cat-3) — ~25 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-130', 'Visible', 'visible-vc', 'Portfolio monitoring, LP reporting, and data collection.', 'Visible is a founders-first portfolio monitoring and reporting solution used by 400+ VC investors.', 'https://visible.vc', 'PAID', 'cat-3', true, 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/65a0173e003e9fdbbbd95145_visible.svg', 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/65a01696066523c1e67d740f_VC_Stack_Hero_01.png'),
    t('t-131', 'Vestberry', 'vestberry', 'Portfolio management software for data-driven VCs.', 'Vestberry is portfolio management and reporting software helping investment funds manage their capital smarter.', 'https://vestberry.com', 'PAID', 'cat-3', true, 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/645d36a57b3b815ec372669e_vestberry.svg', 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/69d827a720f62944b1c9fea5_Directories_HP_V1.png'),
    t('t-132', 'Standard Metrics', 'standardmetrics', 'Automated portfolio monitoring for VCs.', 'Standard Metrics is an automated data collection and portfolio monitoring solution for VCs and 10,000+ companies.', 'https://standardmetrics.io', 'PAID', 'cat-3', true, 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/67b2d9525d6e7dad4b35d606_Standard%20Metrics%20Long%20Logo.png', 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/67b2d87b58f526de14f13c70_download.jpeg'),
    t('t-133', 'Evertrace', 'evertrace', 'Portfolio monitoring & KPI tracking for VCs.', 'Evertrace helps VC and PE firms monitor portfolio companies through automated data collection and KPI dashboards.', 'https://evertrace.co', 'PAID', 'cat-3', true, 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/6904e989a960d272c9d65bb6_img-1818-135.jpg', 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/6904e99d7ebff962cc4d06da_Evertrace-vcstack.io-thumbnail%20(1).png'),
    t('t-134', 'Compass', 'compass', 'Portfolio analytics and benchmarking.', 'Compass provides portfolio analytics, benchmarking, and reporting tools for venture capital firms.', 'https://compass.vc', 'PAID', 'cat-3'),
    t('t-135', 'Dynamo', 'dynamo', 'Investment management for private markets.', 'Dynamo provides investment management software for venture capital, private equity, and private credit.', 'https://dynamo.com', 'PAID', 'cat-3'),
    t('t-136', 'Portfolio', 'portfolio', 'Portfolio tracking and reporting platform.', 'Portfolio provides tracking and reporting tools for investment firms managing diverse portfolios.', 'https://portfolio.com', 'PAID', 'cat-3'),
    t('t-137', 'Venture360', 'venture360', 'Fund management and LP portal for VCs.', 'Venture360 provides fund management, portfolio monitoring, and investor portal solutions for VC firms.', 'https://venture360.com', 'PAID', 'cat-3'),
    t('t-138', 'NorthStar', 'northstar', 'Portfolio management for venture funds.', 'NorthStar provides portfolio management and reporting tools tailored for venture capital fund managers.', 'https://northstar.vc', 'PAID', 'cat-3'),
    t('t-139', 'Reporting VC', 'reporting-vc', 'LP reporting and portfolio monitoring.', 'Reporting VC automates LP reporting and portfolio monitoring for venture capital fund managers.', 'https://reporting.vc', 'PAID', 'cat-3'),
    t('t-140', 'Seraf', 'seraf', 'Angel portfolio management and tracking.', 'Seraf provides portfolio management tools specifically designed for angel investors and angel groups.', 'https://seraf-investor.com', 'PAID', 'cat-3'),
    t('t-141', 'Scope Money', 'scope-money', 'Portfolio tracking for private investments.', 'Scope Money helps investors track and manage their private investment portfolios with real-time analytics.', 'https://scope.money', 'FREEMIUM', 'cat-3'),
    t('t-142', 'Quva', 'quva', 'Data-driven portfolio management.', 'Quva provides data-driven portfolio management and analytics tools for investment firms.', 'https://quva.fi', 'PAID', 'cat-3'),
    t('t-143', 'DaviGold', 'davigold', 'VC portfolio management and analytics.', 'DaviGold provides portfolio management and analytics solutions for venture capital firms.', 'https://davigold.com', 'PAID', 'cat-3'),
    t('t-144', 'TwoTensor', 'twotensor', 'AI-powered investment analytics.', 'TwoTensor uses AI to provide investment analytics and portfolio insights for fund managers.', 'https://twotensor.com', 'PAID', 'cat-3'),
    t('t-145', 'FundingStack', 'fundingstack', 'Fundraising and portfolio management.', 'FundingStack provides fundraising tools and portfolio management solutions for emerging fund managers.', 'https://fundingstack.com', 'FREEMIUM', 'cat-3'),
    t('t-146', 'Fundrbird', 'fundrbird', 'Portfolio monitoring automation.', 'Fundrbird automates portfolio monitoring and data collection from portfolio companies.', 'https://fundrbird.com', 'PAID', 'cat-3'),
    t('t-147', 'Rundit', 'rundit', 'Portfolio monitoring for VCs and PEs.', 'Rundit provides automated portfolio monitoring and KPI tracking for venture capital and private equity firms.', 'https://rundit.com', 'PAID', 'cat-3'),
    t('t-148', 'VenturePort', 'ventureport', 'Portfolio analytics and LP reporting.', 'VenturePort provides portfolio analytics, LP reporting, and investor relations tools for fund managers.', 'https://ventureport.co', 'PAID', 'cat-3'),
    t('t-149', 'VentureInsights by 8VdX', 'ventureinsights-by-8vdx', 'VC portfolio insights and analytics.', 'VentureInsights provides portfolio analytics and insights for venture capital fund managers.', 'https://8vdx.com', 'PAID', 'cat-3'),
    t('t-150', 'Venturelytic', 'venturelytic', 'Venture fund analytics platform.', 'Venturelytic provides analytics and modeling tools for venture capital fund managers.', 'https://venturelytic.com', 'PAID', 'cat-3'),
    t('t-151', 'Starcier', 'starcier', 'Portfolio management for private markets.', 'Starcier provides portfolio management and reporting solutions for private market investors.', 'https://starcier.com', 'PAID', 'cat-3'),

    // ═══════════════════════════════════════════════════════════════════════
    // FUND ADMIN & REPORTING (cat-4) — ~30 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-160', 'Allvue', 'allvue', 'Integrated investment management for alt assets.', 'Allvue Systems provides software solutions for alternative investment management including portfolio management and fund accounting.', 'https://allvuesystems.com', 'PAID', 'cat-4'),
    t('t-161', 'Backstop Solutions', 'backstop-solutions', 'Institutional investor management platform.', 'Backstop Solutions provides cloud-based productivity tools for institutional and alternative investors.', 'https://backstopsolutions.com', 'PAID', 'cat-4'),
    t('t-162', 'eFront', 'efront', 'End-to-end alternative investment management.', 'eFront provides end-to-end software solutions for alternative investment management, from fund raising to exit.', 'https://efront.com', 'PAID', 'cat-4'),
    t('t-163', 'FundWave', 'fundwave', 'Fund administration and reporting software.', 'FundWave provides fund administration, accounting, and investor reporting software for private funds.', 'https://fundwave.com', 'PAID', 'cat-4'),
    t('t-164', 'FundPanel', 'fundpanel', 'Digital fund administration platform.', 'FundPanel provides digital fund administration services for alternative investment funds.', 'https://fundpanel.com', 'PAID', 'cat-4'),
    t('t-165', 'FundSheet', 'fundsheet', 'Spreadsheet-based fund reporting.', 'FundSheet provides spreadsheet-based fund reporting tools that integrate with existing workflows.', 'https://fundsheet.com', 'PAID', 'cat-4'),
    t('t-166', 'Canoe', 'canoe', 'AI-powered data management for alternatives.', 'Canoe Intelligence provides AI-powered data management solutions for alternative investment firms.', 'https://canoeintelligence.com', 'PAID', 'cat-4'),
    t('t-167', 'PFA Solutions', 'pfa-solutions', 'Private fund accounting software.', 'PFA Solutions provides private fund accounting and administration software for fund managers.', 'https://pfasolutions.com', 'PAID', 'cat-4'),
    t('t-168', 'Cobalt GP', 'cobalt-gp', 'Fund administration for GP operations.', 'Cobalt GP provides fund administration and operational tools for general partners managing private funds.', 'https://cobaltgp.com', 'PAID', 'cat-4'),
    t('t-169', 'PE Front Office', 'pe-front-office', 'PE fund management software.', 'PE Front Office provides fund management and administration software for private equity professionals.', 'https://pefrontoffice.com', 'PAID', 'cat-4'),
    t('t-170', 'PE-Cube', 'pe-cube', 'Cloud-based PE fund management.', 'PE-Cube is a cloud-based platform for private equity fund management, reporting, and administration.', 'https://pe-cube.com', 'PAID', 'cat-4'),
    t('t-171', 'InvestorFlow', 'investorflow', 'Digital engagement for alternative investments.', 'InvestorFlow provides digital engagement, CRM, and investor onboarding solutions for alternative investments.', 'https://investorflow.com', 'PAID', 'cat-4'),
    t('t-172', 'Accelex', 'accelex', 'AI-powered data extraction for PE/VC.', 'Accelex uses AI to automate data extraction and analytics from private market documents.', 'https://accelex.com', 'PAID', 'cat-4'),
    t('t-173', 'Daappa', 'daappa', 'Fund management and administration.', 'Daappa provides fund management and administration solutions for private equity and venture capital firms.', 'https://daappa.com', 'PAID', 'cat-4'),
    t('t-174', 'Entrilia', 'entrilia', 'AI-powered fund operations platform.', 'Entrilia automates fund operations and administration using AI-powered tools.', 'https://entrilia.com', 'PAID', 'cat-4'),
    t('t-175', 'LemonEdge', 'lemonedge', 'Modern fund accounting platform.', 'LemonEdge provides modern, flexible fund accounting and administration software for complex fund structures.', 'https://lemonedge.com', 'PAID', 'cat-4'),
    t('t-176', 'Different Funds', 'different-funds', 'Fund administration simplified.', 'Different Funds simplifies fund administration and reporting for emerging fund managers.', 'https://differentfunds.com', 'PAID', 'cat-4'),
    t('t-177', 'Pacific Fund', 'pacific-fund', 'Fund administration services.', 'Pacific Fund provides fund administration and accounting services for investment funds.', 'https://pacificfund.com', 'PAID', 'cat-4'),
    t('t-178', 'FundCraft', 'fundcraft', 'Digital fund administration platform.', 'FundCraft provides digital fund administration, accounting, and reporting for alternative investment funds.', 'https://fundcraft.lu', 'PAID', 'cat-4'),
    t('t-179', 'Passthrough', 'passthrough', 'Digital subscription document management.', 'Passthrough digitizes and automates the fund subscription process, reducing manual data entry and errors.', 'https://passthrough.com', 'PAID', 'cat-4'),
    t('t-180', 'Verivend', 'verivend', 'Digital payment verification for funds.', 'Verivend provides digital payment processing and verification for alternative investment funds.', 'https://verivend.com', 'PAID', 'cat-4'),
    t('t-181', 'ArkPES', 'arkpes', 'Private equity fund administration.', 'ArkPES provides fund administration and investor services for private equity and venture capital.', 'https://arkpes.com', 'PAID', 'cat-4'),
    t('t-182', 'ExchangeLodge', 'exchangelodge', 'Fund data management platform.', 'ExchangeLodge provides data management and reporting tools for fund administrators and investors.', 'https://exchangelodge.com', 'PAID', 'cat-4'),
    t('t-183', 'ExchangeLodge Playbook', 'exchangelodge-playbook', 'Fund operations playbook.', 'ExchangeLodge Playbook provides fund operations workflows and best practices for fund administrators.', 'https://exchangelodge.com/playbook', 'PAID', 'cat-4'),
    t('t-184', 'N2 Technology', 'n2-technology', 'Fund accounting and reporting software.', 'N2 Technology provides fund accounting, reporting, and administration software for alternative investments.', 'https://n2technology.com', 'PAID', 'cat-4'),
    t('t-185', 'Qodeo', 'qodeo', 'Fund compliance and regulatory reporting.', 'Qodeo provides compliance and regulatory reporting tools for alternative investment funds.', 'https://qodeo.com', 'PAID', 'cat-4'),
    t('t-186', 'FundSub', 'fundsub', 'Digital fund subscription management.', 'FundSub digitizes fund subscription and investor onboarding processes for alternative investment funds.', 'https://fundsub.com', 'PAID', 'cat-4'),
    t('t-187', 'Investory', 'investory', 'Fund reporting and investor relations.', 'Investory provides fund reporting and investor relations tools for private equity and VC fund managers.', 'https://investory.io', 'PAID', 'cat-4'),
    t('t-188', 'Carta Portfolio Insights', 'carta-portfolio-insights', 'Portfolio analytics by Carta.', 'Carta Portfolio Insights provides portfolio analytics and benchmarking for VC fund managers using Carta data.', 'https://carta.com/portfolio-insights', 'PAID', 'cat-4'),

    // ═══════════════════════════════════════════════════════════════════════
    // LP TOOLS (cat-5) — ~15 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-200', 'Preqin', 'preqin', 'Alternative assets data and analytics.', 'Preqin is the leading source of data, analytics, and insights for the alternative assets community.', 'https://preqin.com', 'PAID', 'cat-5', true),
    t('t-201', 'Chronograph', 'chronograph', 'LP portfolio analytics and reporting.', 'Chronograph is a portfolio analytics and reporting platform for limited partners and fund managers.', 'https://chronograph.pe', 'PAID', 'cat-5'),
    t('t-202', 'Cobalt LP', 'cobalt-lp', 'LP portfolio management platform.', 'Cobalt LP provides portfolio management and analytics tools for limited partners investing in private funds.', 'https://cobaltlp.com', 'PAID', 'cat-5'),
    t('t-203', 'Colmore', 'colmore', 'Private equity data management for LPs.', 'Colmore provides data management and analytics services for institutional investors in private markets.', 'https://colmore.com', 'PAID', 'cat-5'),
    t('t-204', 'Burgiss', 'burgiss', 'Private capital data and analytics.', 'Burgiss provides private capital data, analytics, and portfolio management tools for institutional investors.', 'https://burgiss.com', 'PAID', 'cat-5'),
    t('t-205', 'eVestment', 'evestment', 'Institutional investment data and analytics.', 'eVestment provides data and analytics for institutional investors to research and evaluate investment managers.', 'https://evestment.com', 'PAID', 'cat-5'),
    t('t-206', 'Diligence Vault', 'diligence-vault', 'Digital due diligence platform.', 'Diligence Vault provides a digital platform for institutional investors to manage operational due diligence.', 'https://diligencevault.com', 'PAID', 'cat-5'),
    t('t-207', 'AssetMetrix', 'assetmetrix', 'PE/VC data analytics for LPs.', 'AssetMetrix provides data analytics and reporting tools for institutional investors in private equity.', 'https://assetmetrix.com', 'PAID', 'cat-5'),
    t('t-208', 'iLevel', 'ilevel', 'Portfolio monitoring for PE/VC investors.', 'iLevel by Ipreo provides portfolio monitoring and data management solutions for private equity investors.', 'https://ilevel.com', 'PAID', 'cat-5'),
    t('t-209', 'LP Analyst', 'lp-analyst', 'LP research and benchmarking.', 'LP Analyst provides research and benchmarking tools for limited partners evaluating private market opportunities.', 'https://lpanalyst.com', 'PAID', 'cat-5'),
    t('t-210', 'The Trusted Insight', 'thetrustedinsight', 'Network for institutional investors.', 'The Trusted Insight is a network platform for institutional investors to discover and evaluate fund managers.', 'https://thetrustedinsight.com', 'PAID', 'cat-5'),
    t('t-211', 'Palico', 'palico', 'Digital marketplace for private equity.', 'Palico provides a digital marketplace connecting LPs with private equity fund managers for fundraising.', 'https://palico.com', 'PAID', 'cat-5'),
    t('t-212', 'J-Curve Portfolio Management', 'j-curve-portfolio-management', 'PE portfolio optimization.', 'J-Curve provides portfolio management and cash flow modeling tools for private equity investors.', 'https://jcurve.com', 'PAID', 'cat-5'),
    t('t-213', 'CEPRES', 'cepres', 'Private markets investment analytics.', 'CEPRES provides investment analytics and benchmarking for private capital markets.', 'https://cepres.com', 'PAID', 'cat-5'),
    t('t-214', 'Vantage Software', 'vantage-software', 'Portfolio management for alternatives.', 'Vantage Software provides portfolio management and administration solutions for alternative investments.', 'https://vantagesoftware.com', 'PAID', 'cat-5'),
    t('t-215', 'VC/PE Pro', 'vc-pe-pro', 'Research platform for VC and PE.', 'VC/PE Pro provides research, benchmarking, and analytics for venture capital and private equity professionals.', 'https://vcpepro.com', 'PAID', 'cat-5'),

    // ═══════════════════════════════════════════════════════════════════════
    // DATA ROOM (cat-6) — ~18 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-230', 'DocSend', 'docsend', 'Secure document sharing with analytics.', 'DocSend is a secure document sharing and analytics platform used extensively in VC fundraising and due diligence.', 'https://docsend.com', 'PAID', 'cat-6', true),
    t('t-231', 'Datasite', 'datasite', 'Virtual data room for M&A and capital raises.', 'Datasite is a leading provider of virtual data rooms for M&A, IPO, and capital raise transactions.', 'https://datasite.com', 'PAID', 'cat-6'),
    t('t-232', 'Ansarada', 'ansarada', 'AI-powered virtual data rooms.', 'Ansarada provides AI-powered virtual data rooms for M&A, capital raising, and board governance.', 'https://ansarada.com', 'PAID', 'cat-6'),
    t('t-233', 'iDeals', 'ideals', 'Secure virtual data room solution.', 'iDeals provides secure virtual data room solutions for due diligence, M&A, and fundraising processes.', 'https://idealsvdr.com', 'PAID', 'cat-6'),
    t('t-234', 'CapLinked', 'caplinked', 'Virtual data room and document sharing.', 'CapLinked provides virtual data room and secure document sharing for investment transactions.', 'https://caplinked.com', 'PAID', 'cat-6'),
    t('t-235', 'Drooms', 'drooms', 'Virtual data room for real estate and M&A.', 'Drooms provides virtual data rooms specializing in real estate, M&A, and corporate transactions.', 'https://drooms.com', 'PAID', 'cat-6'),
    t('t-236', 'SecureDocs', 'securedocs', 'Simple, secure virtual data rooms.', 'SecureDocs offers straightforward and secure virtual data rooms with flat-rate pricing.', 'https://securedocs.com', 'PAID', 'cat-6'),
    t('t-237', 'Digify', 'digify', 'Secure document sharing with access control.', 'Digify provides secure document sharing with detailed tracking, DRM, and access control features.', 'https://digify.com', 'FREEMIUM', 'cat-6'),
    t('t-238', 'Netfiles', 'netfiles', 'German virtual data room provider.', 'Netfiles provides secure virtual data rooms with German data hosting for due diligence and M&A.', 'https://netfiles.com', 'PAID', 'cat-6'),
    t('t-239', 'idgard', 'idgard', 'Sealed cloud data room.', 'idgard provides data rooms with sealed cloud technology for maximum data protection and confidentiality.', 'https://idgard.com', 'PAID', 'cat-6'),
    t('t-240', 'Papermark', 'papermark', 'Open-source document sharing alternative.', 'Papermark is an open-source alternative to DocSend for secure document sharing and analytics.', 'https://papermark.io', 'FREE', 'cat-6'),
    t('t-241', 'HelpRange', 'helprange', 'Document tracking and analytics.', 'HelpRange provides PDF and document tracking with analytics for sales and fundraising teams.', 'https://helprange.com', 'FREEMIUM', 'cat-6'),
    t('t-242', 'Intralinks Deal Nexus', 'intralinks-deal-nexus', 'Deal marketing and data room platform.', 'Intralinks Deal Nexus provides deal marketing and virtual data room solutions for M&A and capital markets.', 'https://intralinks.com', 'PAID', 'cat-6'),
    t('t-243', 'Anduin Data Room', 'anduin-data-room', 'Data room for fund subscription.', 'Anduin provides digital data rooms specifically designed for fund subscription and investor onboarding.', 'https://anduintransact.com', 'PAID', 'cat-6'),
    t('t-244', 'Dedoco', 'dedoco', 'Blockchain-verified document management.', 'Dedoco provides blockchain-verified digital signatures and document management for secure transactions.', 'https://dedoco.com', 'FREEMIUM', 'cat-6'),
    t('t-245', 'PandaDoc', 'pandadoc', 'Document automation and e-signatures.', 'PandaDoc provides document automation, e-signatures, and proposal management for business transactions.', 'https://pandadoc.com', 'FREEMIUM', 'cat-6'),
    t('t-246', 'Siphter ScreenBox', 'siphter-screenbox', 'Secure document viewing with DRM.', 'Siphter ScreenBox provides secure document viewing with digital rights management and anti-screenshot protection.', 'https://siphter.com', 'PAID', 'cat-6'),

    // ═══════════════════════════════════════════════════════════════════════
    // DATA (cat-7) — ~60 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-260', '42matters', '42matters', 'App market data and intelligence.', '42matters provides app market data, mobile analytics, and app intelligence for investors and businesses.', 'https://42matters.com', 'PAID', 'cat-7'),
    t('t-261', 'Clearbit', 'clearbit', 'Business data enrichment and intelligence.', 'Clearbit provides business data enrichment, lead scoring, and company intelligence for sales and investors.', 'https://clearbit.com', 'FREEMIUM', 'cat-7'),
    t('t-262', 'Datanyze', 'datanyze', 'Technographic data for lead generation.', 'Datanyze provides technographic data and insights to help identify companies based on their technology usage.', 'https://datanyze.com', 'FREEMIUM', 'cat-7'),
    t('t-263', 'SimilarWeb', 'similarweb', 'Digital market intelligence and web analytics.', 'SimilarWeb provides website traffic data, competitive analysis, and digital market intelligence.', 'https://similarweb.com', 'FREEMIUM', 'cat-7', true),
    t('t-264', 'BuiltWith', 'builtwith', 'Technology profiling for websites.', 'BuiltWith provides technology profiling, lead generation, and competitive analysis of websites and online tools.', 'https://builtwith.com', 'FREEMIUM', 'cat-7'),
    t('t-265', 'Owler', 'owler', 'Community-driven competitive intelligence.', 'Owler provides AI-driven competitive intelligence with company profiles, news, and industry insights.', 'https://owler.com', 'FREEMIUM', 'cat-7'),
    t('t-266', 'Baremetrics', 'baremetrics', 'Subscription analytics and insights.', 'Baremetrics provides real-time subscription analytics, insights, and forecasting for SaaS businesses.', 'https://baremetrics.com', 'PAID', 'cat-7'),
    t('t-267', 'ChartMogul', 'chartmogul', 'Subscription data analytics platform.', 'ChartMogul provides subscription analytics and revenue reporting for SaaS and subscription businesses.', 'https://chartmogul.com', 'FREEMIUM', 'cat-7'),
    t('t-268', 'SEMrush', 'semrush', 'Online marketing and SEO analytics.', 'SEMrush provides SEO, SEM, content, and competitive analysis tools used by investors for market research.', 'https://semrush.com', 'FREEMIUM', 'cat-7'),
    t('t-269', 'Apptopia', 'apptopia', 'Mobile app performance intelligence.', 'Apptopia provides mobile app intelligence with download estimates, revenue data, and SDK insights.', 'https://apptopia.com', 'PAID', 'cat-7'),
    t('t-270', 'Appfigures', 'appfigures', 'App analytics and intelligence.', 'Appfigures provides app store analytics, market intelligence, and ASO tools for mobile apps.', 'https://appfigures.com', 'FREEMIUM', 'cat-7'),
    t('t-271', 'AppTweak', 'apptweak', 'App store optimization and intelligence.', 'AppTweak provides ASO tools and app market intelligence for app developers and investors.', 'https://apptweak.com', 'PAID', 'cat-7'),
    t('t-272', 'Sensor Tower', 'sensor-tower', 'App store intelligence and analytics.', 'Sensor Tower provides app store intelligence, mobile analytics, and digital advertising insights.', 'https://sensortower.com', 'PAID', 'cat-7'),
    t('t-273', 'Flurry', 'flurry', 'Mobile app analytics by Yahoo.', 'Flurry provides free mobile app analytics for tracking user acquisition, engagement, and retention.', 'https://flurry.com', 'FREE', 'cat-7'),
    t('t-274', 'Kochava', 'kochava', 'Mobile attribution and app analytics.', 'Kochava provides mobile attribution, analytics, and data management for app marketers and investors.', 'https://kochava.com', 'PAID', 'cat-7'),
    t('t-275', 'App Radar', 'app-radar', 'App store optimization platform.', 'App Radar provides ASO tools and app marketing intelligence for growing mobile app businesses.', 'https://appradar.com', 'FREEMIUM', 'cat-7'),
    t('t-276', 'App Annie', 'appannie', 'Mobile market data and analytics.', 'App Annie (now data.ai) provides mobile market data, analytics, and insights for the global app economy.', 'https://data.ai', 'PAID', 'cat-7'),
    t('t-277', 'TheTool', 'thetool', 'App store optimization and analytics.', 'TheTool provides ASO tools and app analytics for mobile app growth and investment analysis.', 'https://thetool.io', 'FREEMIUM', 'cat-7'),
    t('t-278', 'Mobile Action', 'mobile-action', 'App intelligence and ASO platform.', 'Mobile Action provides app intelligence, ASO tools, and ad intelligence for mobile app investors.', 'https://mobileaction.co', 'FREEMIUM', 'cat-7'),
    t('t-279', 'MixRank', 'mixrank', 'Mobile and web competitive intelligence.', 'MixRank provides competitive intelligence data on mobile apps, SDKs, and advertising campaigns.', 'https://mixrank.com', 'PAID', 'cat-7'),
    t('t-280', 'AMZ Scout', 'amz-scout', 'Amazon market research and analytics.', 'AMZ Scout provides Amazon product research, sales tracking, and market analysis for e-commerce investors.', 'https://amzscout.net', 'PAID', 'cat-7'),
    t('t-281', 'Mighty Signal', 'mighty-signal', 'Mobile SDK intelligence.', 'Mighty Signal provides mobile SDK intelligence to track technology adoption across millions of apps.', 'https://mightysignal.com', 'PAID', 'cat-7'),
    t('t-282', 'Coresignal', 'coresignal', 'Business data for investment research.', 'Coresignal provides web data for investment research including company, employee, and job posting data.', 'https://coresignal.com', 'PAID', 'cat-7'),
    t('t-283', 'People Data Labs', 'people-data-labs', 'Person and company data API.', 'People Data Labs provides person and company data through APIs for enrichment and analytics.', 'https://peopledatalabs.com', 'FREEMIUM', 'cat-7'),
    t('t-284', 'Proxycurl', 'proxycurl', 'LinkedIn data API for enrichment.', 'Proxycurl provides APIs to pull LinkedIn profile and company data for enrichment and research.', 'https://proxycurl.com', 'PAID', 'cat-7'),
    t('t-285', 'Live Data Technologies', 'live-data-technologies', 'Real-time employment data.', 'Live Data Technologies provides real-time employment and job change data for investors and recruiters.', 'https://livedatatechnologies.com', 'PAID', 'cat-7'),
    t('t-286', 'Revelio Labs', 'revelio-labs', 'Workforce intelligence platform.', 'Revelio Labs provides workforce intelligence and human capital analytics for investors and companies.', 'https://reveliolabs.com', 'PAID', 'cat-7'),
    t('t-287', 'Thinknum', 'thinknum', 'Alternative data for investment research.', 'Thinknum provides alternative data and analytics for investment research across multiple data sources.', 'https://thinknum.com', 'PAID', 'cat-7'),
    t('t-288', 'Second Measure', 'second-measure', 'Consumer transaction data analytics.', 'Second Measure provides consumer transaction data analytics for investors to track company performance.', 'https://secondmeasure.com', 'PAID', 'cat-7'),
    t('t-289', 'Bombora', 'bombora', 'B2B intent data for sales and investing.', 'Bombora provides B2B intent data to identify companies actively researching specific topics.', 'https://bombora.com', 'PAID', 'cat-7'),
    t('t-290', 'PredictHQ', 'predicthq', 'Event data intelligence for demand.', 'PredictHQ provides event data intelligence to help predict demand patterns and market trends.', 'https://predicthq.com', 'PAID', 'cat-7'),
    t('t-291', 'PredictLeads', 'predictleads', 'Company intelligence from alternative data.', 'PredictLeads provides company intelligence by analyzing job postings, news, and tech data.', 'https://predictleads.com', 'PAID', 'cat-7'),
    t('t-292', 'Growth Ranker', 'growth-ranker', 'Startup growth tracking and ranking.', 'Growth Ranker tracks and ranks startup growth signals to help investors identify fast-growing companies.', 'https://growthranker.com', 'FREEMIUM', 'cat-7'),
    t('t-293', 'StackShare', 'stackshare', 'Technology stack intelligence.', 'StackShare provides intelligence on technology stacks used by companies for investment and competitive analysis.', 'https://stackshare.io', 'FREEMIUM', 'cat-7'),
    t('t-294', 'G2', 'g2', 'B2B software reviews and market data.', 'G2 is the leading B2B software review platform providing market intelligence and buyer intent data.', 'https://g2.com', 'FREEMIUM', 'cat-7'),
    t('t-295', 'IT Central Station', 'it-central-station', 'Enterprise tech reviews and data.', 'IT Central Station (now PeerSpot) provides enterprise technology reviews and buyer intelligence data.', 'https://peerspot.com', 'FREEMIUM', 'cat-7'),
    t('t-296', 'TrustRadius', 'trustradius', 'B2B technology review platform.', 'TrustRadius provides authenticated B2B technology reviews and buyer intelligence for investors.', 'https://trustradius.com', 'FREEMIUM', 'cat-7'),
    t('t-297', 'Capterra', 'capterra', 'Software reviews and comparison.', 'Capterra provides software reviews, comparisons, and buying guides for business technology.', 'https://capterra.com', 'FREE', 'cat-7'),
    t('t-298', 'ReviewBolt', 'reviewbolt', 'Product review monitoring and analytics.', 'ReviewBolt monitors and analyzes product reviews across platforms for market intelligence.', 'https://reviewbolt.com', 'FREEMIUM', 'cat-7'),
    t('t-299', 'Glimpse', 'glimpse', 'Consumer trend spotting platform.', 'Glimpse uses AI to identify emerging consumer trends from search, social, and other data sources.', 'https://meetglimpse.com', 'PAID', 'cat-7'),
    t('t-300', 'Exploding Topics', 'exploding-topics', 'Trend discovery before they trend.', 'Exploding Topics surfaces rapidly growing topics and trends before they become mainstream.', 'https://explodingtopics.com', 'FREEMIUM', 'cat-7'),
    t('t-301', 'Google Trends', 'trends', 'Search trend analysis by Google.', 'Google Trends provides data on search interest over time for topics, companies, and industries.', 'https://trends.google.com', 'FREE', 'cat-7'),
    t('t-302', 'Golden', 'golden', 'AI-powered knowledge platform.', 'Golden provides AI-powered company and technology intelligence for investors and researchers.', 'https://golden.com', 'FREEMIUM', 'cat-7'),
    t('t-303', 'DataProvider', 'dataprovider', 'Web data for business intelligence.', 'DataProvider provides web-derived company data for investment research and market analysis.', 'https://dataprovider.com', 'PAID', 'cat-7'),
    t('t-304', 'IPqwery', 'ipqwery', 'Patent and IP analytics.', 'IPqwery provides patent analytics and intellectual property intelligence for investment evaluation.', 'https://ipqwery.com', 'PAID', 'cat-7'),
    t('t-305', 'PublicComps', 'publiccomps', 'Public company comparable data.', 'PublicComps provides public company comparable data and valuation metrics for private market investors.', 'https://publiccomps.com', 'FREEMIUM', 'cat-7'),
    t('t-306', 'Quartr', 'quartr', 'Earnings calls and financial data.', 'Quartr provides access to earnings calls, financial data, and investor presentations for research.', 'https://quartr.com', 'FREEMIUM', 'cat-7'),
    t('t-307', 'BoardEx', 'boardex', 'Board and executive relationship data.', 'BoardEx provides data on board members, executives, and their professional relationships.', 'https://boardex.com', 'PAID', 'cat-7'),
    t('t-308', 'Comparables', 'comparables', 'Company valuation comparable data.', 'Comparables provides company valuation data and comparable analysis for investment professionals.', 'https://comparables.ai', 'PAID', 'cat-7'),
    t('t-309', 'Mattermark', 'mattermark', 'Startup data and business intelligence.', 'Mattermark provides startup growth signals and business intelligence data for investors.', 'https://mattermark.com', 'PAID', 'cat-7'),
    t('t-310', 'PrivCo', 'privco', 'Private company financials database.', 'PrivCo provides financial data on privately-held companies including revenue, valuation, and funding.', 'https://privco.com', 'PAID', 'cat-7'),
    t('t-311', 'DueDil', 'duedil', 'UK company intelligence platform.', 'DueDil provides company intelligence and due diligence data for UK and European businesses.', 'https://duedil.com', 'PAID', 'cat-7'),
    t('t-312', 'Companies House', 'companies-house', 'UK company registry data.', 'Companies House is the official UK company registry providing free company information and filings.', 'https://companieshouse.gov.uk', 'FREE', 'cat-7'),
    t('t-313', 'Beauhurst', 'beauhurst', 'UK high-growth company data.', 'Beauhurst tracks every high-growth company in the UK, providing data on funding, grants, and growth.', 'https://beauhurst.com', 'PAID', 'cat-7'),
    t('t-314', 'modeFinance', 'modefinance', 'AI credit scoring and analytics.', 'modeFinance provides AI-powered credit scoring and financial analytics for companies and investors.', 'https://modefinance.com', 'PAID', 'cat-7'),
    t('t-315', 'MNAI', 'mnai', 'Machine learning company analytics.', 'MNAI provides machine learning-driven company analytics and alternative data for investment research.', 'https://mnai.tech', 'PAID', 'cat-7'),
    t('t-316', 'Crustdata', 'crustdata', 'Company growth data API.', 'Crustdata provides API access to company growth signals and alternative data for investors.', 'https://crustdata.com', 'PAID', 'cat-7'),
    t('t-317', 'SeSAmM', 'sesamm', 'NLP-powered alternative data.', 'SeSAmM provides NLP-powered analytics of big text data for investment research and market insights.', 'https://sesamm.com', 'PAID', 'cat-7'),
    t('t-318', 'Attest', 'attest', 'Consumer research and survey platform.', 'Attest provides consumer research and survey tools for brands and investors to understand markets.', 'https://askattest.com', 'PAID', 'cat-7'),
    t('t-319', 'DataBell', 'databell', 'Business intelligence data platform.', 'DataBell provides business intelligence and company data for investment research and analysis.', 'https://databell.com', 'PAID', 'cat-7'),
    t('t-320', 'GainPro', 'gainpro', 'Competitive intelligence for investors.', 'GainPro provides competitive intelligence and market analysis tools for investors and corporates.', 'https://gainpro.com', 'PAID', 'cat-7'),
    t('t-321', 'StockInsights AI', 'stockinsights-ai', 'AI stock and market analysis.', 'StockInsights AI provides AI-powered market analysis and investment insights for public and private markets.', 'https://stockinsights.ai', 'FREEMIUM', 'cat-7'),
    t('t-322', 'Bounce Watch', 'bounce-watch', 'Website monitoring and analytics.', 'Bounce Watch monitors website changes and provides analytics for competitive intelligence.', 'https://bouncewatch.com', 'FREEMIUM', 'cat-7'),
    t('t-323', 'Supertrends', 'supertrends', 'Investment megatrend tracking.', 'Supertrends provides megatrend analysis and investment theme tracking for forward-looking investors.', 'https://supertrends.com', 'PAID', 'cat-7'),
    t('t-324', 'Latka', 'latka', 'SaaS company revenue data.', 'Latka provides verified revenue and growth metrics for thousands of SaaS companies.', 'https://getlatka.com', 'FREEMIUM', 'cat-7'),
    t('t-325', 'Earnest Research', 'earnest-research', 'Alternative data and consumer intelligence.', 'Earnest Research provides alternative data and consumer intelligence from anonymized transaction data.', 'https://earnestresearch.com', 'PAID', 'cat-7'),
    t('t-326', 'Watch My Competitor', 'watch-my-competitor', 'Automated competitive intelligence.', 'Watch My Competitor provides automated competitive intelligence monitoring and alerts.', 'https://watchmycompetitor.com', 'PAID', 'cat-7'),
    t('t-327', 'Visualping', 'visualping', 'Website change monitoring.', 'Visualping monitors website changes and sends alerts for competitive intelligence and research.', 'https://visualping.io', 'FREEMIUM', 'cat-7'),
    t('t-328', 'Unwrangle', 'unwrangle', 'Web scraping API for data extraction.', 'Unwrangle provides web scraping APIs for extracting structured data from websites at scale.', 'https://unwrangle.com', 'PAID', 'cat-7'),

    // ═══════════════════════════════════════════════════════════════════════
    // CAPTABLE / EQUITY MANAGEMENT (cat-8) — ~18 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-340', 'Carta', 'carta', 'Equity management platform for startups and investors.', 'Carta helps companies and investors manage equity with cap table management, 409A valuations, and fund administration.', 'https://carta.com', 'PAID', 'cat-8', true),
    t('t-341', 'Pulley', 'pulley', 'Modern equity management for startups.', 'Pulley makes it easy for startups to issue equity, manage cap tables, and model scenarios.', 'https://pulley.com', 'FREEMIUM', 'cat-8'),
    t('t-342', 'Ledgy', 'ledgy', 'European equity management platform.', 'Ledgy provides equity management, cap table management, and employee stock option plans for European companies.', 'https://ledgy.com', 'FREEMIUM', 'cat-8'),
    t('t-343', 'Capdesk', 'capdesk', 'Equity management and cap table.', 'Capdesk provides digital equity management, cap table management, and share scheme administration.', 'https://capdesk.com', 'FREEMIUM', 'cat-8'),
    t('t-344', 'Eqvista', 'eqvista', 'Free cap table management.', 'Eqvista provides free cap table management, 409A valuations, and equity management for startups.', 'https://eqvista.com', 'FREEMIUM', 'cat-8'),
    t('t-345', 'ShareWorks', 'shareworks', 'Equity compensation management by Morgan Stanley.', 'ShareWorks by Morgan Stanley provides equity compensation management and cap table solutions.', 'https://shareworks.com', 'PAID', 'cat-8'),
    t('t-346', 'Astrella', 'astrella', 'Cap table and equity management.', 'Astrella provides cap table management, 409A valuations, and equity administration for private companies.', 'https://astrella.com', 'PAID', 'cat-8'),
    t('t-347', 'Cake', 'cake', 'Free equity management for startups.', 'Cake provides free equity management, cap table management, and vesting schedule tools for startups.', 'https://cake.co', 'FREE', 'cat-8'),
    t('t-348', 'Equity Effect', 'equity-effect', 'Cap table and equity management.', 'Equity Effect provides cap table management and equity administration for private companies.', 'https://equityeffect.com', 'PAID', 'cat-8'),
    t('t-349', 'Qapita', 'qapita', 'Asian equity management platform.', 'Qapita provides equity management, cap table management, and ESOP solutions for Asian companies.', 'https://qapita.com', 'PAID', 'cat-8'),
    t('t-350', 'Capboard', 'capboard', 'Cap table management for European startups.', 'Capboard provides cap table management and investor relations tools for European startups and investors.', 'https://capboard.com', 'FREEMIUM', 'cat-8'),
    t('t-351', 'Fairmint', 'fairmint', 'Continuous equity offerings platform.', 'Fairmint enables companies to raise capital continuously through automated equity offerings.', 'https://fairmint.com', 'PAID', 'cat-8'),
    t('t-352', 'Certent', 'certent', 'Equity compensation management.', 'Certent provides equity compensation management, disclosure management, and analytics solutions.', 'https://certent.com', 'PAID', 'cat-8'),
    t('t-353', 'Shoobx', 'shoobx', 'Automated corporate governance.', 'Shoobx provides automated corporate governance, equity management, and compliance for startups.', 'https://shoobx.com', 'PAID', 'cat-8'),
    t('t-354', 'JP Morgan Workplace Solutions', 'jp-morgan-workplace-solutions', 'Stock plan administration.', 'JP Morgan Workplace Solutions provides stock plan administration and equity compensation management.', 'https://jpmorgan.com', 'PAID', 'cat-8'),
    t('t-355', 'Relevant Equity Works', 'relevant-equity-works', 'Equity planning and analytics.', 'Relevant Equity Works provides equity planning, modeling, and analytics for companies and investors.', 'https://relevantequityworks.com', 'PAID', 'cat-8'),
    t('t-356', 'Vega Equity', 'vega-equity', 'Equity management for Indian startups.', 'Vega Equity provides equity and ESOP management solutions for Indian startups and investors.', 'https://vegaequity.com', 'FREEMIUM', 'cat-8'),
    t('t-357', 'SeedLegals', 'seedlegals', 'Legal and equity for UK startups.', 'SeedLegals provides legal documents, funding round management, and equity tools for UK startups.', 'https://seedlegals.com', 'FREEMIUM', 'cat-8'),
    t('t-358', 'NthRound', 'nthround', 'Investor relations and cap table.', 'NthRound provides investor relations and cap table management for private companies and fund managers.', 'https://nthround.com', 'PAID', 'cat-8'),

    // ═══════════════════════════════════════════════════════════════════════
    // RESEARCH (cat-9) — ~30 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-370', 'Eilla AI', 'eilla-ai', 'AI-powered research for VCs & PEs.', 'Eilla\'s AI Analysts streamline VC workflow by delivering data-driven research and insights across 8M+ companies.', 'https://eilla.ai', 'PAID', 'cat-9', true, 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/67efc434f8fc4917beffaae1_eilla2.png', 'https://cdn.prod.website-files.com/61fe68941d6778510afa422e/67f3b97c2d7439b8ae201bed_Screenshot%202025-04-04%20at%2013.59.44.png'),
    t('t-371', 'Gartner', 'gartner', 'Technology research and advisory.', 'Gartner provides objective technology research and advisory services for investors and business leaders.', 'https://gartner.com', 'PAID', 'cat-9'),
    t('t-372', 'Forrester', 'forrester', 'Research and advisory firm.', 'Forrester provides research and advisory services focused on technology and its impact on business.', 'https://forrester.com', 'PAID', 'cat-9'),
    t('t-373', 'IDC', 'idc', 'Technology market research.', 'IDC provides technology market research, analysis, and advisory services for IT and investors.', 'https://idc.com', 'PAID', 'cat-9'),
    t('t-374', 'Omdia', 'omdia', 'Technology research and analysis.', 'Omdia provides critical analysis and market data on the technology industry for investors and businesses.', 'https://omdia.informa.com', 'PAID', 'cat-9'),
    t('t-375', '451 Research', '451-research', 'Tech industry research by S&P Global.', '451 Research by S&P Global provides technology industry research and analysis for investors.', 'https://451research.com', 'PAID', 'cat-9'),
    t('t-376', 'Constellation Research', 'constellation-research', 'Digital transformation research.', 'Constellation Research provides advisory and research focused on digital business transformation.', 'https://constellationr.com', 'PAID', 'cat-9'),
    t('t-377', 'Frost & Sullivan', 'frost-and-sullivan', 'Growth strategy consulting and research.', 'Frost & Sullivan provides growth strategy consulting, market research, and industry analysis.', 'https://frost.com', 'PAID', 'cat-9'),
    t('t-378', 'IBISWorld', 'ibis-world', 'Industry market research.', 'IBISWorld provides industry market research, statistics, and analysis for investment professionals.', 'https://ibisworld.com', 'PAID', 'cat-9'),
    t('t-379', 'Statista', 'statista', 'Statistics and market data portal.', 'Statista provides access to statistics, market data, and research from over 22,500 sources.', 'https://statista.com', 'FREEMIUM', 'cat-9'),
    t('t-380', 'Third Bridge', 'thirdbridge', 'Expert network for investment research.', 'Third Bridge provides expert network services connecting investors with industry specialists for due diligence.', 'https://thirdbridge.com', 'PAID', 'cat-9', true),
    t('t-381', 'GLG', 'glg', 'Expert network for investors.', 'GLG is the world\'s largest expert network, connecting investors with industry experts for research.', 'https://glg.it', 'PAID', 'cat-9'),
    t('t-382', 'Tegus', 'tegus', 'Expert call transcripts and research.', 'Tegus provides expert call transcripts, interviews, and investment research for fund managers.', 'https://tegus.com', 'PAID', 'cat-9'),
    t('t-383', 'Guidepoint', 'guidepoint', 'Expert network for market research.', 'Guidepoint connects investors and businesses with subject-matter experts for research and due diligence.', 'https://guidepoint.com', 'PAID', 'cat-9'),
    t('t-384', 'OnFrontiers', 'onfrontiers', 'Expert network for emerging markets.', 'OnFrontiers provides expert network services focused on emerging and frontier markets.', 'https://onfrontiers.com', 'PAID', 'cat-9'),
    t('t-385', 'Prosapient', 'prosapient', 'Expert network for investors.', 'Prosapient connects investors and consultants with industry experts for primary research.', 'https://prosapient.com', 'PAID', 'cat-9'),
    t('t-386', 'Maven', 'maven', 'Expert network marketplace.', 'Maven provides an expert network marketplace connecting investors with thousands of industry experts.', 'https://maven.co', 'PAID', 'cat-9'),
    t('t-387', 'Dialectica', 'dialectica', 'Expert insights for investors.', 'Dialectica connects investors with curated industry experts for primary research and due diligence.', 'https://dialectica.com', 'PAID', 'cat-9'),
    t('t-388', 'Lynk', 'lynk', 'Asian expert network.', 'Lynk provides expert network services with a focus on Asia-Pacific markets for investors.', 'https://lynk.global', 'PAID', 'cat-9'),
    t('t-389', 'Capvision', 'capvision', 'Expert consulting network.', 'Capvision provides expert consulting services connecting investors with industry specialists.', 'https://capvision.com', 'PAID', 'cat-9'),
    t('t-390', 'Atheneum', 'atheneum', 'Expert network platform.', 'Atheneum provides AI-matched expert calls and research for investors and consultants.', 'https://atheneum.ai', 'PAID', 'cat-9'),
    t('t-391', 'Techspert.io', 'techspert-io', 'AI-powered expert matching.', 'Techspert.io uses AI to match investors with hard-to-find technical and scientific experts.', 'https://techspert.io', 'PAID', 'cat-9'),
    t('t-392', 'AlphaSights', 'alphasights', 'Expert network for knowledge on demand.', 'AlphaSights connects investors with industry experts for insights and primary research.', 'https://alphasights.com', 'PAID', 'cat-9'),
    t('t-393', 'Coleman Research', 'coleman-research-group', 'Expert network services.', 'Coleman Research provides expert network services for investors conducting primary research.', 'https://colemanrg.com', 'PAID', 'cat-9'),
    t('t-394', 'InsightAlpha', 'insightalpha', 'Expert network for Asia.', 'InsightAlpha provides expert network services with a focus on Asian markets.', 'https://insightalpha.com', 'PAID', 'cat-9'),
    t('t-395', 'Expert Focus', 'expert-focus', 'Expert network services.', 'Expert Focus connects investors with subject matter experts for research consultations.', 'https://expertfocus.com', 'PAID', 'cat-9'),
    t('t-396', 'Arbolus', 'arbolus', 'Expert research platform.', 'Arbolus provides a platform for expert research with recorded calls and knowledge management.', 'https://arbolus.com', 'PAID', 'cat-9'),
    t('t-397', 'Papers with Code', 'papers-with-code', 'ML research papers and code.', 'Papers with Code provides free access to machine learning research papers with linked code repositories.', 'https://paperswithcode.com', 'FREE', 'cat-9'),
    t('t-398', 'Technote AI', 'technote-ai', 'AI-powered technology research.', 'Technote AI provides AI-powered technology research and analysis for investors.', 'https://technote.ai', 'PAID', 'cat-9'),
    t('t-399', 'Glass AI', 'glass-ai', 'AI research assistant.', 'Glass AI provides AI-powered research assistance for investors conducting due diligence.', 'https://glass.ai', 'PAID', 'cat-9'),
    t('t-400', 'Amplyfi', 'amplyfi', 'AI research and insights.', 'Amplyfi uses AI to analyze vast amounts of data and generate research insights for investors.', 'https://amplyfi.com', 'PAID', 'cat-9'),
    t('t-401', 'Quid', 'quid', 'AI-powered market intelligence.', 'Quid provides AI-powered analytics for contextual insights from news, patents, and company data.', 'https://quid.com', 'PAID', 'cat-9'),
    t('t-402', 'Acuity Knowledge Partners', 'acuity-knowledge-partners', 'Research and analytics outsourcing.', 'Acuity provides research and analytics support services for investment firms and banks.', 'https://acuitykp.com', 'PAID', 'cat-9'),
    t('t-403', 'NewtonX', 'newtonx', 'B2B professional research.', 'NewtonX provides access to verified B2B professionals for custom research and expert insights.', 'https://newtonx.com', 'PAID', 'cat-9'),
    t('t-404', 'Nextyn', 'nextyn', 'Expert advisory network.', 'Nextyn provides expert advisory and consulting network services for investors and consultants.', 'https://nextyn.com', 'PAID', 'cat-9'),
    t('t-405', 'Reknowledge', 'reknowledge', 'Knowledge management for research.', 'Reknowledge provides knowledge management tools for organizing and sharing investment research.', 'https://reknowledge.io', 'PAID', 'cat-9'),
    t('t-406', 'Vertical Knowledge', 'vertical-knowledge', 'Expert network for investments.', 'Vertical Knowledge provides expert network services connecting investors with industry specialists.', 'https://verticalknowledge.com', 'PAID', 'cat-9'),
    t('t-407', 'Primary Insight', 'primary-insight', 'Expert network research.', 'Primary Insight provides expert network research services for investors and hedge funds.', 'https://primaryinsight.com', 'PAID', 'cat-9'),
    t('t-408', 'Factiva', 'factiva', 'Global news and data by Dow Jones.', 'Factiva by Dow Jones provides access to global news, data, and research from thousands of sources.', 'https://dowjones.com/factiva', 'PAID', 'cat-9'),
    t('t-409', 'Merger Market', 'merger-market', 'M&A intelligence and deal data.', 'Merger Market provides intelligence on M&A activity, deal data, and market trends for investors.', 'https://mergermarket.com', 'PAID', 'cat-9'),
    t('t-410', 'Refinitiv', 'refinitv', 'Financial data and infrastructure.', 'Refinitiv (LSEG) provides financial data, analytics, and trading infrastructure for investors.', 'https://lseg.com', 'PAID', 'cat-9'),
    t('t-411', 'Alpha Sense', 'alpha-sense', 'AI-powered financial research.', 'AlphaSense provides AI-powered search and analytics across financial documents, transcripts, and research.', 'https://alpha-sense.com', 'PAID', 'cat-9', true),

    // ═══════════════════════════════════════════════════════════════════════
    // VIDEO CONFERENCING (cat-10) — ~7 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-420', 'Zoom', 'zoom', 'Video conferencing platform.', 'Zoom provides video conferencing, online meetings, and collaboration tools for business communication.', 'https://zoom.us', 'FREEMIUM', 'cat-10', true),
    t('t-421', 'Webex', 'webex', 'Enterprise video conferencing by Cisco.', 'Webex by Cisco provides enterprise-grade video conferencing, messaging, and collaboration tools.', 'https://webex.com', 'FREEMIUM', 'cat-10'),
    t('t-422', 'Whereby', 'wherby', 'Browser-based video meetings.', 'Whereby provides simple browser-based video meetings with no app installation required.', 'https://whereby.com', 'FREEMIUM', 'cat-10'),
    t('t-423', 'Sessions', 'sessions', 'Interactive video meeting platform.', 'Sessions provides interactive video meetings with built-in collaboration and engagement tools.', 'https://sessions.us', 'FREEMIUM', 'cat-10'),
    t('t-424', 'tl;dv', 'tl-dv', 'AI meeting recorder and summarizer.', 'tl;dv records, transcribes, and summarizes video meetings with AI-powered highlights and action items.', 'https://tldv.io', 'FREEMIUM', 'cat-10'),
    t('t-425', 'Airr', 'airr', 'AI meeting assistant.', 'Airr provides AI-powered meeting recording, transcription, and highlights for important conversations.', 'https://airr.io', 'FREEMIUM', 'cat-10'),

    // ═══════════════════════════════════════════════════════════════════════
    // FUND MODELING & FORECASTING (cat-11) — ~10 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-430', 'Tactyc', 'tactyc', 'VC portfolio construction and modeling.', 'Tactyc helps VC fund managers model portfolio construction, forecast returns, and optimize investment strategies.', 'https://tactyc.io', 'PAID', 'cat-11', true),
    t('t-431', 'Clockwork', 'clockwork', 'Financial modeling and forecasting.', 'Clockwork provides AI-driven financial modeling and forecasting for venture capital and finance teams.', 'https://clockwork.ai', 'PAID', 'cat-11'),
    t('t-432', 'Caissa', 'caissa', 'Portfolio analytics for institutional investors.', 'Caissa provides portfolio analytics, risk management, and allocation tools for institutional investors.', 'https://caissa.com', 'PAID', 'cat-11'),
    t('t-433', 'Allocator', 'allocator', 'Portfolio allocation optimization.', 'Allocator provides portfolio allocation and optimization tools for fund managers and institutional investors.', 'https://allocator.com', 'PAID', 'cat-11'),
    t('t-434', 'Tail Skew', 'tail-skew', 'Fund modeling for venture capital.', 'Tail Skew provides fund modeling and portfolio forecasting tools designed for venture capital managers.', 'https://tailskew.com', 'PAID', 'cat-11'),
    t('t-435', 'Portf', 'portf', 'Portfolio simulation and modeling.', 'Portf provides portfolio simulation and modeling tools for investment fund managers.', 'https://portf.io', 'PAID', 'cat-11'),
    t('t-436', 'Equidam', 'equidam', 'Startup valuation tools.', 'Equidam provides automated startup valuation tools using multiple methodologies for investors and founders.', 'https://equidam.com', 'FREEMIUM', 'cat-11'),
    t('t-437', 'Instaval', 'instaval', 'Quick company valuations.', 'Instaval provides quick and automated company valuations for investment professionals.', 'https://instaval.io', 'FREEMIUM', 'cat-11'),
    t('t-438', 'Valu8', 'valu8', 'Private company valuation analytics.', 'Valu8 provides valuation analytics and insights for private companies and venture portfolios.', 'https://valu8.com', 'PAID', 'cat-11'),
    t('t-439', 'Valuat', 'valuat', 'Company valuation platform.', 'Valuat provides company valuation tools and analytics for investors and business advisors.', 'https://valuat.com', 'FREEMIUM', 'cat-11'),

    // ═══════════════════════════════════════════════════════════════════════
    // PROJECT MANAGEMENT (cat-12) — ~8 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-450', 'Notion', 'notion', 'All-in-one workspace for teams.', 'Notion is an all-in-one workspace where VC teams write, plan, collaborate, and organize their work.', 'https://notion.so', 'FREEMIUM', 'cat-12', true),
    t('t-451', 'Asana', 'asana', 'Work management platform.', 'Asana helps VC teams organize, track, and manage their work with tasks, projects, and timelines.', 'https://asana.com', 'FREEMIUM', 'cat-12'),
    t('t-452', 'Monday', 'monday', 'Work operating system.', 'Monday.com provides a flexible work operating system for managing projects, workflows, and team collaboration.', 'https://monday.com', 'FREEMIUM', 'cat-12'),
    t('t-453', 'Trello', 'trello', 'Visual project management boards.', 'Trello uses boards, lists, and cards to help teams organize and prioritize projects visually.', 'https://trello.com', 'FREEMIUM', 'cat-12'),
    t('t-454', 'Flow', 'flow', 'Task and project management.', 'Flow provides task management and project planning tools for teams to collaborate effectively.', 'https://getflow.com', 'PAID', 'cat-12'),
    t('t-455', 'Airtable', 'airtable', 'Flexible database and project management.', 'Airtable combines spreadsheet simplicity with database power for flexible project and data management.', 'https://airtable.com', 'FREEMIUM', 'cat-12'),

    // ═══════════════════════════════════════════════════════════════════════
    // EMAIL (cat-13) — ~5 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-460', 'Superhuman', 'superhuman', 'Fastest email experience.', 'Superhuman provides the fastest email experience with AI, keyboard shortcuts, and productivity features.', 'https://superhuman.com', 'PAID', 'cat-13', true),
    t('t-461', 'Spark', 'spark', 'Smart email for teams.', 'Spark provides smart email features with team collaboration, email templates, and scheduling.', 'https://sparkmailapp.com', 'FREEMIUM', 'cat-13'),
    t('t-462', 'Gmelius', 'gmelius', 'Shared inbox and automation for Gmail.', 'Gmelius transforms Gmail into a collaborative workspace with shared inboxes and workflow automation.', 'https://gmelius.com', 'FREEMIUM', 'cat-13'),
    t('t-463', 'Signed', 'signed', 'Email signature management.', 'Signed provides email signature management and branding tools for professional teams.', 'https://signed.com', 'PAID', 'cat-13'),

    // ═══════════════════════════════════════════════════════════════════════
    // PLATFORM (cat-14) — ~8 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-470', 'Slack', 'slack', 'Business communication platform.', 'Slack is the leading business messaging platform for team communication and portfolio company engagement.', 'https://slack.com', 'FREEMIUM', 'cat-14', true),
    t('t-471', 'GitHub', 'github', 'Software development platform.', 'GitHub provides version control and collaboration tools for software development used by portfolio companies.', 'https://github.com', 'FREEMIUM', 'cat-14'),
    t('t-472', 'Zapier', 'zapier', 'Workflow automation platform.', 'Zapier connects and automates workflows across 5,000+ apps for investment operations.', 'https://zapier.com', 'FREEMIUM', 'cat-14'),
    t('t-473', 'Integromat', 'integromat', 'Visual automation platform.', 'Integromat (now Make) provides visual workflow automation connecting apps and services.', 'https://make.com', 'FREEMIUM', 'cat-14'),
    t('t-474', 'TagHash', 'taghash', 'Startup and investor platform.', 'TagHash provides a platform connecting startups with investors and facilitating deal management.', 'https://taghash.com', 'FREEMIUM', 'cat-14'),
    t('t-475', 'Notissia', 'notissia', 'Investment memo and collaboration.', 'Notissia provides investment memo creation and collaboration tools for VC teams.', 'https://notissia.com', 'FREEMIUM', 'cat-14'),
    t('t-476', 'AppSumo', 'appsumo', 'Software deals marketplace.', 'AppSumo provides lifetime deals on software tools for entrepreneurs and businesses.', 'https://appsumo.com', 'FREEMIUM', 'cat-14'),
    t('t-477', 'Typeform', 'typeform', 'Interactive forms and surveys.', 'Typeform provides interactive forms, surveys, and questionnaires for data collection and engagement.', 'https://typeform.com', 'FREEMIUM', 'cat-14'),

    // ═══════════════════════════════════════════════════════════════════════
    // ESG (cat-15) — ~8 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-490', 'Apiday', 'apiday', 'ESG data management and reporting.', 'Apiday provides ESG data management, reporting, and analytics for investment firms.', 'https://apiday.com', 'PAID', 'cat-15'),
    t('t-491', 'Net Zero Insights', 'net-zero-insights', 'Climate tech data and intelligence.', 'Net Zero Insights provides data and intelligence on climate tech startups and sustainability trends.', 'https://netzeroinsights.com', 'PAID', 'cat-15'),
    t('t-492', 'FirmNav', 'firmnav', 'ESG analytics for SMEs and investors.', 'FirmNav provides ESG analytics and sustainability assessment tools for SMEs and investors.', 'https://firmnav.com', 'PAID', 'cat-15'),
    t('t-493', 'ImpactNexus', 'impactnexus', 'Impact measurement and management.', 'ImpactNexus helps investors and companies measure and manage their sustainability impact.', 'https://impactnexus.io', 'PAID', 'cat-15'),
    t('t-494', 'Celsia', 'celsia', 'Climate risk analytics.', 'Celsia provides climate risk analytics and ESG assessment tools for investors and companies.', 'https://celsia.io', 'PAID', 'cat-15'),
    t('t-495', 'ESG Bay', 'esg-bay', 'ESG reporting platform.', 'ESG Bay provides ESG reporting, monitoring, and compliance tools for investment firms.', 'https://esgbay.com', 'PAID', 'cat-15'),
    t('t-496', 'FinGreen AI', 'fingreen-ai', 'AI-powered ESG data.', 'FinGreen AI provides AI-powered ESG data collection and analysis for financial institutions.', 'https://fingreen.ai', 'PAID', 'cat-15'),
    t('t-497', 'Baromitr', 'baromitr', 'Sustainability measurement platform.', 'Baromitr helps investors and companies measure and benchmark sustainability performance.', 'https://baromitr.com', 'PAID', 'cat-15'),
    t('t-498', 'Planetly', 'planetly', 'Carbon management platform.', 'Planetly provides carbon management and climate action tools for companies and investors.', 'https://planetly.com', 'PAID', 'cat-15'),

    // ═══════════════════════════════════════════════════════════════════════
    // HIRING & PAYROLL (cat-16) — ~8 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-510', 'Deel', 'deel', 'Global payroll and HR platform.', 'Deel provides global payroll, compliance, and HR solutions for hiring international talent.', 'https://deel.com', 'FREEMIUM', 'cat-16', true),
    t('t-511', 'Oyster HR', 'oyster-hr', 'Global employment platform.', 'Oyster HR enables companies to hire, pay, and manage employees and contractors globally.', 'https://oysterhr.com', 'PAID', 'cat-16'),
    t('t-512', 'Recruitee', 'recruitee', 'Collaborative hiring platform.', 'Recruitee provides collaborative hiring software with ATS, employer branding, and analytics.', 'https://recruitee.com', 'PAID', 'cat-16'),
    t('t-513', 'Beamery', 'beamery', 'Talent lifecycle management.', 'Beamery provides talent acquisition and management platform with AI-driven talent intelligence.', 'https://beamery.com', 'PAID', 'cat-16'),
    t('t-514', 'Skuad', 'skuad', 'Global employment and payroll.', 'Skuad provides global employment, payroll, and compliance solutions for hiring remote talent.', 'https://skuad.io', 'PAID', 'cat-16'),
    t('t-515', '15Five', '15five', 'Performance management platform.', '15Five provides performance management, employee engagement, and OKR tracking for teams.', 'https://15five.com', 'PAID', 'cat-16'),
    t('t-516', 'Bolster', 'bolster', 'Executive talent marketplace.', 'Bolster connects growing companies with experienced executives for interim and fractional roles.', 'https://bolster.com', 'PAID', 'cat-16'),
    t('t-517', 'Consider', 'consider', 'Talent marketplace for startups.', 'Consider helps startups and VC portfolio companies find and hire top talent through a curated marketplace.', 'https://consider.com', 'PAID', 'cat-16'),

    // ═══════════════════════════════════════════════════════════════════════
    // INFRASTRUCTURE (cat-17) — ~12 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-530', 'Sydecar', 'sydecar', 'Investment infrastructure for VCs.', 'Sydecar provides automated investment infrastructure for fund managers including SPVs and fund formation.', 'https://sydecar.io', 'PAID', 'cat-17', true),
    t('t-531', 'Syndicate', 'syndicate', 'Web3 investment infrastructure.', 'Syndicate provides decentralized investment infrastructure and tools for Web3 communities.', 'https://syndicate.io', 'PAID', 'cat-17'),
    t('t-532', 'Syndicately', 'syndicately', 'SPV and syndication platform.', 'Syndicately provides SPV creation and syndication tools for angel investors and fund managers.', 'https://syndicately.com', 'PAID', 'cat-17'),
    t('t-533', 'Odin', 'odin-1', 'SPV platform for investors.', 'Odin provides SPV creation and management tools for angel investors and VC syndicates.', 'https://odin.xyz', 'PAID', 'cat-17'),
    t('t-534', 'Allocations', 'allocations', 'Fund and SPV formation platform.', 'Allocations provides fund and SPV formation, administration, and management services for investors.', 'https://allocations.com', 'PAID', 'cat-17'),
    t('t-535', 'Party Round', 'party-round', 'Startup fundraising made simple.', 'Party Round simplifies the startup fundraising process with automated cap table and SPV tools.', 'https://partyround.com', 'FREE', 'cat-17'),
    t('t-536', 'Katipult', 'katipult', 'Digital securities and investment management.', 'Katipult provides digital securities issuance and investment management infrastructure.', 'https://katipult.com', 'PAID', 'cat-17'),
    t('t-537', 'FundFormer', 'fundformer', 'Fund formation services.', 'FundFormer provides fund formation and legal structuring services for emerging fund managers.', 'https://fundformer.com', 'PAID', 'cat-17'),
    t('t-538', 'Electric AI', 'electric-ai', 'IT management for startups.', 'Electric AI provides IT management services for startups and small businesses with AI-powered support.', 'https://electric.ai', 'PAID', 'cat-17'),
    t('t-539', 'NAKIVO', 'nakivo', 'Data backup and recovery.', 'NAKIVO provides data protection and disaster recovery solutions for businesses and investment firms.', 'https://nakivo.com', 'PAID', 'cat-17'),
    t('t-540', 'Consilience Ventures', 'consilience-ventures', 'VC fund infrastructure services.', 'Consilience Ventures provides infrastructure and operational support for venture capital fund managers.', 'https://consilienceventures.com', 'PAID', 'cat-17'),
    t('t-541', 'Austin Technology', 'austin-technology', 'Fund administration technology.', 'Austin Technology provides fund administration technology solutions for alternative investment managers.', 'https://austintechnology.com', 'PAID', 'cat-17'),

    // ═══════════════════════════════════════════════════════════════════════
    // INSURANCE (cat-18) — ~2 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-550', 'Vouch', 'vouch', 'Insurance for startups and VCs.', 'Vouch provides insurance solutions specifically designed for startups, including D&O, E&O, and cyber insurance.', 'https://vouch.us', 'PAID', 'cat-18', true),
    t('t-551', 'Apperio', 'apperio', 'Legal spend management.', 'Apperio provides real-time legal spend analytics and management for investment firms and corporates.', 'https://apperio.com', 'PAID', 'cat-18'),

    // ═══════════════════════════════════════════════════════════════════════
    // JOB BOARD & TALENT POOL (cat-19) — ~5 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-560', 'Getro', 'getro', 'Portfolio talent network management.', 'Getro helps VC firms build and manage talent networks across their portfolio companies.', 'https://getro.com', 'PAID', 'cat-19', true),
    t('t-561', 'Pallet', 'pallet', 'Community-powered job boards.', 'Pallet enables communities, investors, and thought leaders to create curated job boards.', 'https://pallet.com', 'FREEMIUM', 'cat-19'),
    t('t-562', 'SplendUp', 'splendup', 'Talent matching for startups.', 'SplendUp helps VC portfolio companies find and attract top talent through AI-powered matching.', 'https://splendup.com', 'PAID', 'cat-19'),
    t('t-563', 'KingsCrowd', 'kingscrowd', 'Startup investment ratings and data.', 'KingsCrowd provides ratings, analytics, and data on startup investment opportunities.', 'https://kingscrowd.com', 'FREEMIUM', 'cat-19'),
    t('t-564', 'Velvet', 'velvet', 'Portfolio talent management.', 'Velvet helps venture firms manage talent across their portfolio with job boards and candidate matching.', 'https://velvet.co', 'PAID', 'cat-19'),

    // ═══════════════════════════════════════════════════════════════════════
    // LIQUIDITY INSTRUMENTS (cat-20) — ~12 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-570', 'Forge', 'forge', 'Private market trading platform.', 'Forge provides a marketplace for buying and selling private company shares before IPO.', 'https://forgeglobal.com', 'PAID', 'cat-20', true),
    t('t-571', 'EquityZen', 'equity-zen', 'Pre-IPO share marketplace.', 'EquityZen provides access to pre-IPO investments by connecting shareholders with accredited investors.', 'https://equityzen.com', 'PAID', 'cat-20'),
    t('t-572', 'Caplight', 'caplight', 'Private stock trading data.', 'Caplight provides pricing data and analytics for private company stock trading.', 'https://caplight.com', 'PAID', 'cat-20'),
    t('t-573', 'Stableton Financial', 'stableton-financial', 'Private market access platform.', 'Stableton Financial provides institutional and qualified investors access to private market investments.', 'https://stableton.com', 'PAID', 'cat-20'),
    t('t-574', 'Templum', 'templum', 'Digital securities marketplace.', 'Templum provides a digital securities marketplace for issuing and trading alternative investments.', 'https://templuminc.com', 'PAID', 'cat-20'),
    t('t-575', 'Securitize', 'securitize', 'Digital securities issuance and trading.', 'Securitize provides end-to-end digital securities solutions for issuing, managing, and trading assets.', 'https://securitize.io', 'PAID', 'cat-20'),
    t('t-576', 'Tokeny Solutions', 'tokeny-solutions', 'Tokenized securities infrastructure.', 'Tokeny Solutions provides infrastructure for issuing and managing tokenized securities.', 'https://tokeny.com', 'PAID', 'cat-20'),
    t('t-577', 'RealBlocks', 'realblocks', 'Digital alternative investment platform.', 'RealBlocks provides a digital platform for managing and distributing alternative investments.', 'https://realblocks.com', 'PAID', 'cat-20'),
    t('t-578', 'iCapital Network', 'icapital-network', 'Alternative investments for wealth management.', 'iCapital Network provides technology to access, manage, and administer alternative investments.', 'https://icapitalnetwork.com', 'PAID', 'cat-20'),
    t('t-579', 'BITE Investments', 'bite-investments', 'Fund distribution technology.', 'BITE Investments provides technology for distributing alternative investment funds to global investors.', 'https://biteinvestments.com', 'PAID', 'cat-20'),
    t('t-580', 'Portagon', 'portagon', 'Digital fund distribution platform.', 'Portagon provides digital fund distribution and investor onboarding for alternative investments.', 'https://portagon.com', 'PAID', 'cat-20'),
    t('t-581', 'Quoroom', 'quoroom', 'Investor relations and shareholder management.', 'Quoroom provides investor relations, shareholder management, and secondary trading tools.', 'https://quoroom.com', 'PAID', 'cat-20'),
    t('t-582', 'Delio', 'delio', 'White-label investment platform.', 'Delio provides white-label technology for managing and distributing alternative investments.', 'https://deliowealth.com', 'PAID', 'cat-20'),
    t('t-583', 'Harvest Exchange', 'harvest-exchange', 'Fund distribution marketplace.', 'Harvest Exchange provides a marketplace connecting fund managers with allocators and advisors.', 'https://harvestexchange.com', 'PAID', 'cat-20'),

    // ═══════════════════════════════════════════════════════════════════════
    // NEWSLETTER TOOLS (cat-21) — ~4 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-590', 'Mailchimp', 'mailchimp', 'Email marketing and newsletter platform.', 'Mailchimp provides email marketing, newsletters, and audience management for VC firms.', 'https://mailchimp.com', 'FREEMIUM', 'cat-21', true),
    t('t-591', 'MailerLite', 'mailerlite', 'Email marketing made simple.', 'MailerLite provides simple and affordable email marketing and newsletter tools for businesses.', 'https://mailerlite.com', 'FREEMIUM', 'cat-21'),
    t('t-592', 'Substack', 'substack', 'Newsletter publishing platform.', 'Substack enables writers and investors to publish newsletters and build subscription-based audiences.', 'https://substack.com', 'FREE', 'cat-21'),
    t('t-593', 'Medium', 'medium', 'Online publishing platform.', 'Medium provides an open platform for publishing long-form content, insights, and thought leadership.', 'https://medium.com', 'FREEMIUM', 'cat-21'),

    // ═══════════════════════════════════════════════════════════════════════
    // NEWS & RESOURCES (cat-22) — ~15 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-600', 'TechCrunch', 'techcrunch-extra', 'Technology and startup news.', 'TechCrunch provides the latest technology news, startup coverage, and venture capital reporting.', 'https://techcrunch.com', 'FREEMIUM', 'cat-22', true),
    t('t-601', 'VentureBeat', 'venturebeat', 'Technology innovation news.', 'VentureBeat provides news and analysis on technology innovation, AI, and digital transformation.', 'https://venturebeat.com', 'FREE', 'cat-22'),
    t('t-602', 'Sifted', 'sifted', 'European startup news by FT.', 'Sifted is the Financial Times-backed news site covering European startups and venture capital.', 'https://sifted.eu', 'FREEMIUM', 'cat-22'),
    t('t-603', 'Tech.eu', 'tech-eu', 'European technology journalism.', 'Tech.eu provides journalism and data on European technology startups and ecosystem.', 'https://tech.eu', 'FREEMIUM', 'cat-22'),
    t('t-604', 'Silicon Canals', 'silicon-canals', 'European startup ecosystem news.', 'Silicon Canals covers the European startup ecosystem with news, analysis, and funding data.', 'https://siliconcanals.com', 'FREE', 'cat-22'),
    t('t-605', 'UKTN', 'uktn', 'UK tech news and insights.', 'UKTN provides news, insights, and analysis about the UK tech industry and startup ecosystem.', 'https://uktn.com', 'FREE', 'cat-22'),
    t('t-606', 'StrictlyVC', 'strictlyvc', 'Daily VC industry newsletter.', 'StrictlyVC is a daily newsletter covering venture capital deals, news, and industry trends.', 'https://strictlyvc.com', 'FREE', 'cat-22'),
    t('t-607', 'Axios Pro Rata', 'axios-pro-rata', 'Deals and dealmakers newsletter.', 'Axios Pro Rata provides daily coverage of deals, dealmakers, and the venture capital industry.', 'https://axios.com/pro-rata', 'FREE', 'cat-22'),
    t('t-608', 'Forbes', 'forbes', 'Business news and entrepreneurship.', 'Forbes provides business news, entrepreneurship coverage, and wealth/investment analysis.', 'https://forbes.com', 'FREEMIUM', 'cat-22'),
    t('t-609', 'Fortune', 'fortune', 'Business and finance news.', 'Fortune provides business and finance news, leadership insights, and industry analysis.', 'https://fortune.com', 'FREEMIUM', 'cat-22'),
    t('t-610', 'Wired', 'wired', 'Technology and culture magazine.', 'Wired covers technology, science, business, and culture with deep-dive reporting and analysis.', 'https://wired.com', 'FREEMIUM', 'cat-22'),
    t('t-611', 'AVCJ', 'avcj', 'Asian venture capital & PE news.', 'AVCJ provides news, data, and events covering private equity and venture capital in Asia.', 'https://avcj.com', 'PAID', 'cat-22'),
    t('t-612', 'MoreThanDigital', 'morethandigital', 'Digital transformation insights.', 'MoreThanDigital provides insights and resources on digital transformation, innovation, and entrepreneurship.', 'https://morethandigital.info', 'FREE', 'cat-22'),
    t('t-613', 'Countercyclical', 'countercyclical', 'Contrarian investing insights.', 'Countercyclical provides contrarian investing insights and analysis for forward-thinking investors.', 'https://countercyclical.io', 'FREE', 'cat-22'),

    // ═══════════════════════════════════════════════════════════════════════
    // COMMUNITY (cat-23) — ~6 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-620', 'Circle', 'circle', 'Community platform for creators and businesses.', 'Circle provides community platform tools for creators, businesses, and investment firms to build engaged communities.', 'https://circle.so', 'PAID', 'cat-23', true),
    t('t-621', 'Tribe', 'tribe', 'Customizable community platform.', 'Tribe provides a customizable community platform for building branded online communities.', 'https://tribe.so', 'FREEMIUM', 'cat-23'),
    t('t-622', 'MeltingSpot', 'meltingspot', 'Community-led growth platform.', 'MeltingSpot provides community-led growth tools for B2B companies and investment firms.', 'https://meltingspot.io', 'PAID', 'cat-23'),
    t('t-623', 'Bunch', 'bunch', 'AI leadership coach.', 'Bunch provides AI-powered leadership coaching and team development tools.', 'https://bunch.ai', 'FREEMIUM', 'cat-23'),
    t('t-624', 'Cabal', 'cabal', 'Community for founders and investors.', 'Cabal provides community and communication tools connecting founders with their investors and advisors.', 'https://getcabal.com', 'PAID', 'cat-23'),
    t('t-625', 'Kumu', 'kumu', 'Relationship mapping and visualization.', 'Kumu provides relationship mapping and network visualization tools for understanding complex systems.', 'https://kumu.io', 'FREEMIUM', 'cat-23'),

    // ═══════════════════════════════════════════════════════════════════════
    // CALENDAR (cat-24) — 8 tools (from vcstack.io/category/calendar)
    // ═══════════════════════════════════════════════════════════════════════
    t('t-630', 'Calendly', 'calendly', 'When connecting is easy, your teams can get more done. Calendly is modern scheduling that makes "finding time" a breeze.', 'Calendly is the leading scheduling automation platform for eliminating the back-and-forth of meeting coordination. It integrates with your calendar, sends reminders, and lets invitees pick times that work for everyone.', 'https://calendly.com', 'FREEMIUM', 'cat-24', true, 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f9022a2e9f060c9c7b438_calendly.jpeg'),
    t('t-631', 'Cal.com', 'cal', 'Scheduling infrastructure for absolutely everyone.', 'Cal.com provides open-source scheduling infrastructure for individuals and teams. It is the flexible, privacy-friendly Calendly alternative that puts you in control of your meeting links and workflows.', 'https://cal.com', 'FREEMIUM', 'cat-24', false, 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6347fdf0735a4d978499388a_cal.com.png', 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6347fe5d7bdf62255b8d6ceb_cal.com-vc.jpg'),
    t('t-632', 'Cron', 'cron', 'Information Technology & Services', 'Cron (acquired by Notion) provides a next-generation calendar experience with scheduling, time management, and team availability features built for modern professionals.', 'https://cron.com', 'FREE', 'cat-24', false, 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f920636cf98529a1c6bad_Cron.jpg'),
    t('t-633', 'Doodle', 'doodle', 'Meetings made simple', 'Doodle provides group scheduling and meeting coordination tools that eliminate back-and-forth emails. Create polls, find the best meeting time, and schedule with confidence.', 'https://doodle.com', 'FREEMIUM', 'cat-24', false, 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f92db95ca800828273f56_doodle.png'),
    t('t-635', 'Zcal', 'zcal', 'The next-gen, free Calendly alternative that makes scheduling personal again', 'Zcal is a free scheduling platform with beautiful, customizable booking pages. It makes scheduling feel personal again with branded pages, time zone detection, and team scheduling features.', 'https://zcal.co', 'FREE', 'cat-24', false, 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f924c1d61a33a3563f8a6_zcalHQ.jpg'),
    t('t-636', 'Timing.is', 'timing-is', 'Your calendar, reminders and tasks in a powerful and beautiful experience.', 'Timing.is combines your calendar, reminders, and tasks into one powerful and beautiful experience, helping professionals stay on top of their schedule without switching between apps.', 'https://timing.is', 'PAID', 'cat-24', false, 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/64035a2e7d01f740531ef8b5_timing_Logo.png'),
    t('t-634', 'Vimcal', 'vimcal', 'The world\'s fastest calendar, beautifully designed for remote teams.', 'Vimcal is the world\'s fastest calendar, beautifully designed for remote teams. It features keyboard shortcuts, time zone management, and scheduling links built for busy investors and founders.', 'https://vimcal.com', 'PAID', 'cat-24', false, 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/620f83eb3f4e72c653e97ed9_vimcal-logo.jpeg'),

    // ═══════════════════════════════════════════════════════════════════════
    // OTHER TOOLS (cat-25) — ~10 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-650', 'Qwilr', 'qwilr', 'Beautiful business documents.', 'Qwilr transforms business documents into beautiful, interactive web pages for proposals and reports.', 'https://qwilr.com', 'PAID', 'cat-25'),
    t('t-651', 'Unbounce', 'unbounce', 'Landing page builder.', 'Unbounce provides AI-powered landing page builder for creating conversion-focused web pages.', 'https://unbounce.com', 'PAID', 'cat-25'),
    t('t-652', 'BaseTemplates', 'basetemplates', 'Startup templates and tools.', 'BaseTemplates provides free templates and tools for startups including pitch decks and financial models.', 'https://basetemplates.com', 'FREE', 'cat-25'),
    t('t-653', 'Magic Design', 'magic-design', 'AI-powered design platform.', 'Magic Design provides AI-powered design tools for creating presentations and marketing materials.', 'https://magicdesign.io', 'PAID', 'cat-25'),
    t('t-654', 'PaperStreet', 'paperstreet', 'Investment document management.', 'PaperStreet provides document management and collaboration tools for investment professionals.', 'https://paperstreet.vc', 'PAID', 'cat-25'),
    t('t-655', 'Sketchnote', 'sketchnote', 'Visual communication tools.', 'Sketchnote provides visual communication and presentation tools for business professionals.', 'https://sketchnote.co', 'FREEMIUM', 'cat-25'),
    t('t-656', 'Lookback', 'lookback', 'User research and testing.', 'Lookback provides user research and usability testing tools for product teams and investors.', 'https://lookback.com', 'PAID', 'cat-25'),
    t('t-657', 'Parsers', 'parsers', 'Document parsing and data extraction.', 'Parsers provides intelligent document parsing and data extraction for automating business processes.', 'https://parsers.me', 'FREEMIUM', 'cat-25'),
    t('t-658', 'Domos', 'domos', 'Business analytics and data visualization.', 'Domos provides business analytics and data visualization tools for investment reporting.', 'https://domos.com', 'PAID', 'cat-25'),
    t('t-659', 'Vizmark', 'vizmark', 'Visual bookmarking and organization.', 'Vizmark provides visual bookmarking and web content organization tools for research.', 'https://vizmark.com', 'FREEMIUM', 'cat-25'),
    t('t-660', 'Dual Space', 'dual-space', 'Virtual office and meeting space.', 'Dual Space provides virtual office environments and meeting spaces for remote teams.', 'https://dualspace.io', 'PAID', 'cat-25'),
    t('t-661', 'Due Dash', 'due-dash', 'Due diligence dashboard.', 'Due Dash provides due diligence tracking and management dashboards for investment professionals.', 'https://duedash.com', 'PAID', 'cat-25'),
    t('t-662', 'Venture Analytics', 'venture-analytics', 'VC fund analytics.', 'Venture Analytics provides fund analytics and performance tracking for venture capital managers.', 'https://ventureanalytics.com', 'PAID', 'cat-25'),
    t('t-663', 'Venture IQ', 'venture-iq', 'VC intelligence and analytics.', 'Venture IQ provides intelligence and analytics tools for venture capital investment decisions.', 'https://ventureiq.com', 'PAID', 'cat-25'),
    t('t-664', 'Vector AIS', 'vector-ais', 'AI solutions for investment firms.', 'Vector AIS provides AI-powered solutions and analytics for investment management firms.', 'https://vectorais.com', 'PAID', 'cat-25'),

    // ═══════════════════════════════════════════════════════════════════════
    // WEBSITE (cat-26) — ~5 tools
    // ═══════════════════════════════════════════════════════════════════════
    t('t-670', 'Webflow', 'webflow', 'Visual web development platform.', 'Webflow provides visual web development with CMS and hosting, popular among VC firms for websites.', 'https://webflow.com', 'FREEMIUM', 'cat-26', true),
    t('t-671', 'WordPress', 'wordpress', 'Open-source website platform.', 'WordPress is the world\'s most popular open-source website and CMS platform.', 'https://wordpress.org', 'FREE', 'cat-26'),
    t('t-672', 'Squarespace', 'squarespace', 'Website builder and hosting.', 'Squarespace provides all-in-one website building, hosting, and e-commerce solutions.', 'https://squarespace.com', 'PAID', 'cat-26'),
    t('t-673', 'Contentful', 'contentful', 'Headless CMS platform.', 'Contentful provides a headless CMS for creating and managing digital content across platforms.', 'https://contentful.com', 'FREEMIUM', 'cat-26'),

    // ═══════════════════════════════════════════════════════════════════════
    // REMAINING TOOLS (misc categories)
    // ═══════════════════════════════════════════════════════════════════════
    // Additional Deal Sourcing / Data tools
    t('t-700', 'Synaptic', 'synaptic', 'AI-powered deal sourcing platform.', 'Synaptic uses AI to help private equity and VC firms source, screen, and evaluate investment opportunities.', 'https://synaptic.com', 'PAID', 'cat-1'),
    t('t-701', 'Clade', 'clade', 'Company taxonomy and classification.', 'Clade provides AI-powered company taxonomy and classification for market mapping and analysis.', 'https://clade.io', 'PAID', 'cat-7'),
    t('t-702', 'GXE', 'gxe', 'Alternative data for PE.', 'GXE provides alternative data and analytics for private equity investment research.', 'https://gxe.com', 'PAID', 'cat-7'),
    t('t-703', 'Relationship Science', 'relationship-science', 'Relationship intelligence for dealmakers.', 'Relationship Science provides relationship mapping and intelligence for business development and deal sourcing.', 'https://relsci.com', 'PAID', 'cat-2'),
    t('t-704', 'Govin', 'govin', 'Government funding intelligence.', 'Govin provides intelligence on government funding, grants, and contracts for investors and companies.', 'https://govin.com', 'PAID', 'cat-7'),
    t('t-705', 'Get Proven', 'get-proven', 'Startup funding and investor matching.', 'Get Proven connects startups with investors through a matching platform and virtual pitching.', 'https://getproven.com', 'FREEMIUM', 'cat-1'),
    t('t-706', 'The Investor Net', 'theinvestornet', 'Investor community and deal flow.', 'The Investor Net provides a community platform connecting investors with curated deal flow.', 'https://theinvestornet.com', 'FREEMIUM', 'cat-1'),
    t('t-707', 'Radicle', 'radicle', 'Impact investment platform.', 'Radicle provides impact investment data and tools for investors focused on social and environmental returns.', 'https://radicle.com', 'PAID', 'cat-15'),
    t('t-708', 'RaiseGlobal', 'raiseglobal', 'Global fundraising platform.', 'RaiseGlobal helps startups raise capital globally with investor matching and fundraising tools.', 'https://raiseglobal.com', 'FREEMIUM', 'cat-1'),
    t('t-709', 'Allermuir Capital', 'allermuir-capital', 'Investment advisory services.', 'Allermuir Capital provides investment advisory and capital raising services for fund managers.', 'https://allermuircapital.com', 'PAID', 'cat-17'),
    t('t-710', 'Aperture', 'aperture', 'Portfolio company intelligence.', 'Aperture provides portfolio company intelligence and monitoring tools for VC firms.', 'https://aperture.co', 'PAID', 'cat-3'),
    t('t-711', 'Atlas', 'atlas', 'Startup formation by Stripe.', 'Atlas by Stripe helps startups incorporate and get started with banking, legal, and payments.', 'https://stripe.com/atlas', 'PAID', 'cat-17'),
    t('t-712', 'Atom Invest', 'atom-invest', 'Social investing platform.', 'Atom Invest provides social investing tools and community features for retail investors.', 'https://atominvest.com', 'FREEMIUM', 'cat-20'),
    t('t-713', 'Aumni', 'aumni', 'VC deal analytics and intelligence.', 'Aumni provides analytics and intelligence on venture capital deal terms and portfolio company data.', 'https://aumni.fund', 'PAID', 'cat-7'),
    t('t-714', 'Aurigin', 'aurigin', 'AI-powered deal origination.', 'Aurigin provides AI-powered deal origination and management tools for investment banks and PE firms.', 'https://aurigin.com', 'PAID', 'cat-1'),
    t('t-715', 'BetterFront', 'betterfront', 'White-label investment platform.', 'BetterFront provides white-label investment technology for fund managers and financial advisors.', 'https://betterfront.com', 'PAID', 'cat-20'),
    t('t-716', 'Bullet Point Network', 'bullet-point-network', 'Expert consulting network.', 'Bullet Point Network connects investors with operating executives for expert consulting.', 'https://bulletpointnetwork.com', 'PAID', 'cat-9'),
    t('t-717', 'CapitalxAI', 'capitalxai', 'AI investment research.', 'CapitalxAI provides AI-powered investment research and analysis tools for fund managers.', 'https://capitalxai.com', 'PAID', 'cat-9'),
    t('t-718', 'Dari by Kiota', 'dari-by-kiota', 'Impact investment platform.', 'Dari by Kiota provides impact investment management and reporting tools for fund managers.', 'https://kiota.com', 'PAID', 'cat-15'),
    t('t-719', 'Derivatas', 'derivatas', 'Financial modeling tools.', 'Derivatas provides financial modeling and analytics tools for investment professionals.', 'https://derivatas.com', 'PAID', 'cat-11'),
    t('t-720', 'Eivora', 'eivora', 'Investment management platform.', 'Eivora provides investment management and portfolio analytics for alternative asset managers.', 'https://eivora.com', 'PAID', 'cat-3'),
    t('t-721', 'ENG', 'eng', 'Engineering talent platform.', 'ENG helps companies find and hire engineering talent through a specialized talent network.', 'https://eng.com', 'PAID', 'cat-19'),
    t('t-722', 'Evalify', 'evalify', 'Assessment and evaluation platform.', 'Evalify provides assessment and evaluation tools for talent acquisition and team building.', 'https://evalify.com', 'PAID', 'cat-16'),
    t('t-723', 'FiFi', 'fiifi', 'Financial intelligence platform.', 'FiFi provides financial intelligence and data analytics for investment professionals.', 'https://fiifi.com', 'PAID', 'cat-7'),
    t('t-724', 'FuelUp', 'fuelup', 'Startup growth platform.', 'FuelUp provides growth tools and resources for startups and emerging companies.', 'https://fuelup.com', 'FREEMIUM', 'cat-25'),
    t('t-725', 'Graypes', 'graypes', 'Startup ecosystem mapping.', 'Graypes provides startup ecosystem mapping and investment analysis tools.', 'https://graypes.com', 'FREEMIUM', 'cat-7'),
    t('t-726', 'Gravity', 'gravity', 'VC fund operations platform.', 'Gravity provides fund operations and management tools for venture capital firms.', 'https://gravity.co', 'PAID', 'cat-4'),
    t('t-727', 'Holland Mountain Atlas', 'holland-mountain-atlas', 'PE operations consulting.', 'Holland Mountain Atlas provides operations consulting and technology advisory for private equity firms.', 'https://hollandmountain.com', 'PAID', 'cat-17'),
    t('t-728', 'INEX', 'inex', 'Investment exchange platform.', 'INEX provides an investment exchange platform connecting investors with opportunities.', 'https://inex.co', 'PAID', 'cat-20'),
    t('t-729', 'Kaiku', 'kaiku', 'Startup signal intelligence.', 'Kaiku provides startup signal intelligence and growth tracking for investors.', 'https://kaiku.co', 'PAID', 'cat-7'),
    t('t-730', 'Katch', 'katch', 'Unlock your calendar', 'Katch provides smart calendar management and meeting scheduling tools that help investors unlock more time from their busy calendars and manage meeting requests effortlessly.', 'https://gokatch.com', 'FREEMIUM', 'cat-24', false, 'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/622142f89872d714ca4353f4_gokatch.png'),
    t('t-731', 'KernelApps', 'kernelapps-private-limited', 'Software development services.', 'KernelApps provides software development and technology solutions for businesses.', 'https://kernelapps.com', 'PAID', 'cat-25'),
    t('t-732', 'Kiota', 'kiota', 'Impact fund management.', 'Kiota provides impact fund management and reporting solutions for sustainable investors.', 'https://kiota.com', 'PAID', 'cat-15'),
    t('t-733', 'Lantern', 'lantern', 'VC portfolio intelligence.', 'Lantern provides portfolio intelligence and monitoring tools for venture capital firms.', 'https://lantern.ai', 'PAID', 'cat-3'),
    t('t-734', 'Larvato', 'larvato', 'Startup discovery platform.', 'Larvato helps investors discover and evaluate early-stage startups.', 'https://larvato.com', 'FREEMIUM', 'cat-1'),
    t('t-735', 'Leva', 'leva', 'Investment management platform.', 'Leva provides investment management and reporting tools for private market investors.', 'https://leva.pe', 'PAID', 'cat-4'),
    t('t-736', 'Lighthouse', 'lighthouse', 'Investment research platform.', 'Lighthouse provides investment research and analytics tools for institutional investors.', 'https://lighthouse.app', 'PAID', 'cat-9'),
    t('t-737', 'Mandate Wired', 'mandate-wired', 'Investment mandate tracking.', 'Mandate Wired tracks and provides intelligence on institutional investment mandates.', 'https://mandatewired.com', 'PAID', 'cat-5'),
    t('t-738', 'Mobbo', 'mobbo', 'Mobile app analytics.', 'Mobbo provides mobile app analytics and intelligence for app market research.', 'https://mobbo.com', 'FREEMIUM', 'cat-7'),
    t('t-739', 'NR2', 'nr2', 'Investor relations platform.', 'NR2 provides investor relations and reporting tools for fund managers and corporates.', 'https://nr2.com', 'PAID', 'cat-4'),
    t('t-740', 'Orchestra.io', 'orchestra-io', 'VC workflow automation.', 'Orchestra.io provides workflow automation and operations tools for venture capital firms.', 'https://orchestra.io', 'PAID', 'cat-14'),
    t('t-741', 'PIN', 'pin', 'Private investment network.', 'PIN provides a private investment network connecting qualified investors with opportunities.', 'https://pin.com', 'PAID', 'cat-1'),
    t('t-742', 'Qashqade', 'qashqade', 'Fund administration platform.', 'Qashqade provides fund administration and investor services for alternative investment funds.', 'https://qashqade.com', 'PAID', 'cat-4'),
    t('t-743', 'Roundtable', 'roundtable', 'Private investment community.', 'Roundtable provides a private investment community and deal sharing platform for investors.', 'https://roundtable.co', 'PAID', 'cat-23'),
    t('t-744', 'Shipshape', 'shipshape', 'VC operations and compliance.', 'Shipshape provides operations and compliance management tools for venture capital firms.', 'https://shipshape.vc', 'PAID', 'cat-17'),
    t('t-745', 'StandD', 'standd', 'Startup due diligence platform.', 'StandD provides structured due diligence tools and frameworks for startup evaluation.', 'https://standd.io', 'PAID', 'cat-25'),
    t('t-746', 'Autopsy', 'autopsy', 'Startup failure analysis.', 'Autopsy provides post-mortem analysis and lessons learned from failed startups.', 'https://autopsy.io', 'FREE', 'cat-22'),
    t('t-747', 'Vestlane', 'vestlane', 'Digital fund onboarding.', 'Vestlane provides digital fund onboarding and subscription document management for alternative investments.', 'https://vestlane.com', 'PAID', 'cat-4'),
    t('t-748', 'Abaca', 'abaca', 'AML and compliance platform.', 'Abaca provides anti-money laundering and compliance tools for financial institutions and fund managers.', 'https://abaca.app', 'PAID', 'cat-17'),
    t('t-749', 'Aberdeen', 'aberdeen', 'Investment management services.', 'Aberdeen (abrdn) provides investment management services across public and private markets.', 'https://abrdn.com', 'PAID', 'cat-5'),
    t('t-750', 'Alkymi', 'alkymi', 'Data extraction and automation.', 'Alkymi provides AI-powered data extraction and workflow automation for financial services.', 'https://alkymi.io', 'PAID', 'cat-7'),
    t('t-751', 'AlternativeSoft', 'alternativesoft', 'Alternative investment analytics.', 'AlternativeSoft provides analytics and risk management tools for alternative investment portfolios.', 'https://alternativesoft.com', 'PAID', 'cat-5'),
    t('t-752', 'Ameetee', 'ameetee', 'Meeting scheduling for teams.', 'Ameetee provides meeting scheduling and coordination tools for business teams.', 'https://ameetee.com', 'FREEMIUM', 'cat-25'),
    t('t-753', 'ArchLabs', 'archlabs', 'Investment architecture platform.', 'ArchLabs provides investment architecture and fund structuring tools for fund managers.', 'https://archlabs.com', 'PAID', 'cat-17'),
    t('t-754', 'Assette', 'assette', 'Client reporting automation.', 'Assette provides automated client reporting and document assembly for investment firms.', 'https://assette.com', 'PAID', 'cat-4'),
    t('t-755', 'Dalia Research', 'dalia-research', 'Consumer survey data.', 'Dalia Research provides real-time consumer survey data and market research intelligence.', 'https://daliaresearch.com', 'PAID', 'cat-7'),
    t('t-756', 'Quantium', 'quantium', 'Data analytics and AI.', 'Quantium provides data analytics and AI solutions for businesses and investors.', 'https://quantium.com', 'PAID', 'cat-7'),
    t('t-757', 'Xpedition', 'xpedition', 'VC operations platform.', 'Xpedition provides operations and workflow management tools for venture capital firms.', 'https://xpedition.co', 'PAID', 'cat-14'),
    t('t-758', 'Thread', 'thread', 'Team communication platform.', 'Thread provides team communication and messaging tools for business collaboration.', 'https://thread.com', 'FREEMIUM', 'cat-14'),
    t('t-759', 'Wonderai', 'wonder', 'Research and consulting.', 'Wonder provides on-demand research and consulting services for businesses and investors.', 'https://askwonder.com', 'PAID', 'cat-9'),
  ]
}
