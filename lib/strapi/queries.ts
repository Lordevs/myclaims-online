/**
 * Reusable Strapi populate configs.
 *
 * Centralise all `populate` objects here so every page/component
 * references the same shape instead of duplicating query params.
 * Pass these directly into fetchStrapi({ params: { populate: ... } }).
 *
 * Usage:
 *   import { globalPopulate, pagePopulate } from "@/lib/strapi/queries"
 *   const res = await fetchStrapi<StrapiSingleResponse<GlobalData>>("/api/global", {
 *     params: { populate: globalPopulate },
 *     nextOptions: { next: { tags: ["global"] } },
 *   })
 */

// ─── Shared sub-populates ────────────────────────────────────────────────────

const linkPopulate = {
  page: { fields: ["slug", "title"] },
}

const mediaPopulate = {
  file: true,
}

const menuItemPopulate = {
  page: { fields: ["slug", "title"] },
}

const contactItemPopulate = true

const featureCardPopulate = true

const listItemPopulate = true

// ─── Form (with full nested steps) ──────────────────────────────────────────

/**
 * Populates for /api/forms?filters[formId][$eq]=...
 * Fetches all steps → fields → selectOptions for rendering a full form.
 */
export const formPopulate = {
  steps: {
    populate: {
      fields: {
        populate: {
          selectOptions: true,
        },
      },
    },
  },
  footerItems: listItemPopulate,
}

// ─── Global single-type ──────────────────────────────────────────────────────

/**
 * Populates for /api/global
 * Fetches logo, favicon, defaultSeo, navbarItems (with dropdown items),
 * navbarCta, and footer (with socialLinks + pageLinks + blocks).
 */
export const globalPopulate = {
  logo: { populate: mediaPopulate },
  favicon: true,
  defaultSeo: {
    populate: { shareImage: true },
  },
  navbarItems: {
    on: {
      "shared.link": {
        populate: linkPopulate,
      },
      "shared.dropdown": {
        populate: {
          items: {
            populate: menuItemPopulate,
          },
        },
      },
    },
  },
  navbarCta: {
    populate: linkPopulate,
  },
  footer: {
    populate: {
      socialLinks: true,
      companyDetails: true,
      disclaimer: true,
      pageLinks: {
        populate: {
          links: {
            populate: linkPopulate,
          },
        },
      },
    },
  },
}

// ─── Page (with all DynamicZone sections) ────────────────────────────────────

/**
 * Populates for /api/pages and /api/pages/:documentId
 * Covers all 11 DynamicZone section types via the `on` syntax (Strapi v5).
 */
export const pagePopulate = {
  blocks: {
    on: {
      "sections.split-hero-section": {
        populate: {
          listItems: listItemPopulate,
          Image: { populate: mediaPopulate },
          ctaButtons: { populate: linkPopulate },
          form: { populate: formPopulate },
        },
      },
      "sections.rich-text-section": {
        populate: {
          content: true,
        },
      },
      "sections.media-and-text": {
        populate: {
          items: listItemPopulate,
          image: { populate: mediaPopulate },
        },
      },
      "sections.form-section": {
        populate: {
          listItems: listItemPopulate,
          image: { populate: mediaPopulate },
          form: { populate: formPopulate },
        },
      },
      "sections.feature-grid": {
        populate: {
          items: featureCardPopulate,
          ctaButton: { populate: linkPopulate },
        },
      },
      "sections.faq-section": {
        populate: {
          faqs: { fields: ["id", "documentId", "question", "answer"] },
        },
      },
      "sections.cta-section": {
        populate: {
          cta: {
            populate: {
              buttons: { populate: linkPopulate },
              contactItems: contactItemPopulate,
            },
          },
        },
      },
      "sections.trust-banner": {
        populate: true,
      },
      "sections.quiz-section": {
        populate: {
          form: { populate: formPopulate },
          trustBullets: listItemPopulate,
          supportPhone: { populate: linkPopulate },
        },
      },
      "sections.process-timeline": {
        populate: {
          steps: true,
        },
      },
      "sections.contact-with-map": {
        populate: {
          items: contactItemPopulate,
          ctaButton: {
            populate: {
              file: { populate: { file: true } },
            },
          },
        },
      },
    },
  },
}

// ─── FAQ list ─────────────────────────────────────────────────────────────────

/** Populates for /api/faqs — no relations to populate */
export const faqPopulate = {}

// ─── CTA ─────────────────────────────────────────────────────────────────────

/** Populates for /api/ctas/:documentId */
export const ctaPopulate = {
  buttons: { populate: linkPopulate },
  contactItems: contactItemPopulate,
}
