import { Router } from "express";
import AboutPage from "../models/AboutPage.js";

const router = Router();

const heroImagePath = "/images/about/sigiriya-hero.jpg";
const previousHeroImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80";
const aboutImagePath = "/images/about/lion-rock-legacy.png";
const previousAboutImage =
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1400&q=80";
const previousAboutImageAlt = "Sigiriya rock fortress rising above the jungle";
const galleryImagePath = "/images/about/sigiriya-rock-at-dawn.png";
const previousGalleryImage =
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80";
const galleryImageTitle = "Sigiriya Rock at Dawn";
const galleryImageAlt = "Sigiriya rock at dawn";
const galleryImageId = "photo-1472396961693-142e6e269027";
const luxurySafariImagePath = "/images/about/luxury-safari-jeep.png";
const previousLuxurySafariImage =
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=1200&q=80";
const previousLuxurySafariAlt = "Safari jeep on a jungle path";
const luxurySafariImageId = "photo-1499696010180-025ef6e1a8f9";
const luxurySafariTitle = "Luxury Safari Jeeps";
const luxurySafariAlt = "Luxury safari jeep by the lake";
const elephantsImagePath = "/images/about/elephants-in-the-wild.png";
const previousElephantsImage =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80";
const elephantsImageId = "photo-1500534314209-a25ddb2bd429";
const elephantsImageTitle = "Elephants in the Wild";
const elephantsImageAlt = "Elephants grazing";
const jungleCanopyImagePath = "/images/about/jungle-canopy.png";
const previousJungleCanopyImage =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80";
const jungleCanopyImageId = "photo-1441974231531-c6227db76b6e";
const jungleCanopyTitle = "Jungle Canopy";
const jungleCanopyAlt = "Tropical jungle landscape";
const lakesSunsetsImagePath = "/images/about/lakes-sunsets.png";
const previousLakesSunsetsImage =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80";
const lakesSunsetsImageId = "photo-1501785888041-af3ef285b470";
const lakesSunsetsTitle = "Lakes & Sunsets";
const lakesSunsetsAlt = "Sunset over a lake";
const sigiriyaPanoramaImagePath = "/images/about/sigiriya-panorama.png";
const sigiriyaPanoramaTitle = "Sigiriya Panorama";
const sigiriyaPanoramaAlt = "Panoramic view from Sigiriya";
const normalizeText = value => (typeof value === "string" ? value.trim().toLowerCase() : "");

const defaultAboutData = {
  slug: "sigiriya-safari",
  hero: {
    title: "Discover the Ancient Wonder of Sigiriya",
    subtitle:
      "Sigiriya is a UNESCO World Heritage destination where royal history, lush jungles, wildlife corridors, and safari adventures blend into an unforgettable journey.",
    badge: "Sigiriya Safari",
    backgroundImage: heroImagePath,
    highlights: ["UNESCO Heritage", "Wildlife Safaris", "Cultural Immersion", "Luxury Escapes"]
  },
  about: {
    eyebrow: "The Lion Rock Legacy",
    title: "A citadel carved into the sky",
    description:
      "Rising from the heart of Sri Lanka, Sigiriya is an ancient rock fortress built by King Kashyapa in the 5th century. Its terraced gardens, mirror wall, and sky palace reveal a mastery of art, engineering, and mythology that continues to inspire modern travelers.",
    image: aboutImagePath,
    imageAlt: "Sigiriya rock fortress and water gardens",
    caption: "Walk through water gardens, frescoed caves, and panoramic summit views.",
    highlights: [
      {
        title: "King Kashyapa's Vision",
        text: "The royal citadel blends defensive architecture with poetic artistry, a masterpiece of ancient urban planning."
      },
      {
        title: "UNESCO World Heritage",
        text: "Recognized globally for its cultural impact, archaeology, and extraordinary landscape."
      },
      {
        title: "Jungle & Wildlife",
        text: "Surrounded by tropical forests, Sigiriya is a gateway to elephant corridors and rare birdlife."
      },
      {
        title: "Safari Experiences",
        text: "Luxury jeep safaris, village tours, and eco-lodges offer immersive adventures just beyond the rock."
      }
    ]
  },
  features: {
    eyebrow: "Signature Highlights",
    title: "Crafted journeys in every direction",
    description: "Each experience balances ancient wonder, untamed nature, and refined safari comfort.",
    items: [
      {
        title: "Lion Rock Fortress",
        description: "Climb the legendary staircase to panoramic views and ancient frescoes.",
        icon: "lion"
      },
      {
        title: "Wildlife Safaris",
        description: "Spot elephants, leopards, and endemic birds in nearby national parks.",
        icon: "wildlife"
      },
      {
        title: "Village Experiences",
        description: "Meet local artisans, taste traditional cuisine, and cruise serene lakes.",
        icon: "village"
      },
      {
        title: "Sunrise & Nature Views",
        description: "Golden light over misty jungles and Sigiriya’s royal gardens.",
        icon: "sunrise"
      }
    ]
  },
  stats: {
    eyebrow: "Sigiriya by the Numbers",
    title: "A wonder shaped by time",
    description: "Signature milestones that define Sigiriya’s enduring global appeal.",
    items: [
      {
        label: "UNESCO Heritage Site Since",
        value: 1982,
        suffix: "",
        description: "Internationally protected for its archaeological and cultural significance.",
        icon: "heritage"
      },
      {
        label: "Rock Height",
        value: 200,
        suffix: "m",
        description: "A dramatic volcanic plug towering over the surrounding plains.",
        icon: "height"
      },
      {
        label: "Visitors Each Year",
        value: 180,
        suffix: "k+",
        description: "A magnet for global travelers seeking history and wildlife.",
        icon: "visitors"
      },
      {
        label: "Nearby National Parks",
        value: 4,
        suffix: "+",
        description: "Easy access to Minneriya, Kaudulla, and other safari reserves.",
        icon: "parks"
      }
    ]
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Cinematic moments from Sigiriya",
    description: "A curated glimpse of the landscapes, wildlife, and golden light awaiting you.",
    items: [
      {
        title: "Sigiriya Rock at Dawn",
        image: "/images/about/sigiriya-rock-at-dawn.png",
        alt: "Sigiriya rock at dawn"
      },
      {
        title: "Luxury Safari Jeeps",
        image: luxurySafariImagePath,
        alt: luxurySafariAlt
      },
      {
        title: elephantsImageTitle,
        image: elephantsImagePath,
        alt: elephantsImageAlt
      },
      {
        title: jungleCanopyTitle,
        image: jungleCanopyImagePath,
        alt: jungleCanopyAlt
      },
      {
        title: lakesSunsetsTitle,
        image: lakesSunsetsImagePath,
        alt: lakesSunsetsAlt
      },
      {
        title: sigiriyaPanoramaTitle,
        image: sigiriyaPanoramaImagePath,
        alt: sigiriyaPanoramaAlt
      }
    ]
  },
  whyVisit: {
    eyebrow: "Why Visit",
    title: "Reasons travelers fall in love with Sigiriya",
    description: "An experience designed for culture seekers, wildlife lovers, and luxury explorers.",
    items: [
      {
        title: "Cultural Heritage",
        description: "Walk through palace ruins, gardens, and frescoes that tell royal stories.",
        icon: "culture"
      },
      {
        title: "Wildlife Adventures",
        description: "Enjoy curated safaris with expert guides in nearby national parks.",
        icon: "wildlife"
      },
      {
        title: "Photography Moments",
        description: "Capture golden-hour climbs, misty jungles, and rare wildlife sightings.",
        icon: "photography"
      },
      {
        title: "Eco-Tourism Experiences",
        description: "Stay in eco-lodges and support conservation-led travel.",
        icon: "eco"
      },
      {
        title: "Family-Friendly Tours",
        description: "Gentle trails, cultural workshops, and safe safari routes for all ages.",
        icon: "family"
      },
      {
        title: "Peaceful Landscapes",
        description: "Slow down with lakeside sunsets, forest trails, and panoramic viewpoints.",
        icon: "landscape"
      }
    ]
  }
};

router.get("/", async (req, res) => {
  try {
    let aboutPage = await AboutPage.findOne({ slug: defaultAboutData.slug });
    if (!aboutPage) {
      aboutPage = await AboutPage.create(defaultAboutData);
    } else {
      let needsSave = false;
      if (
        !aboutPage.hero?.backgroundImage ||
        aboutPage.hero.backgroundImage === previousHeroImage
      ) {
        aboutPage.hero.backgroundImage = heroImagePath;
        needsSave = true;
      }
      const shouldUpdateImage = aboutPage.about?.image !== aboutImagePath;
      const shouldUpdateAlt =
        !aboutPage.about?.imageAlt || aboutPage.about.imageAlt === previousAboutImageAlt;
      if (shouldUpdateImage || shouldUpdateAlt) {
        const currentAbout = aboutPage.about ?? {};
        aboutPage.about = {
          ...defaultAboutData.about,
          ...currentAbout,
          image: aboutImagePath,
          imageAlt: shouldUpdateAlt
            ? "Sigiriya rock fortress and water gardens"
            : currentAbout.imageAlt
        };
        needsSave = true;
      }
      const currentGallery = aboutPage.gallery ?? {};
      const currentItems = Array.isArray(currentGallery.items) ? currentGallery.items : [];
      if (currentItems.length === 0) {
        aboutPage.gallery = defaultAboutData.gallery;
        needsSave = true;
      } else {
        let galleryNeedsSave = false;
        const galleryUpdates = [
          {
            title: galleryImageTitle,
            image: galleryImagePath,
            alt: galleryImageAlt,
            previousImage: previousGalleryImage,
            previousImageId: galleryImageId
          },
          {
            title: luxurySafariTitle,
            image: luxurySafariImagePath,
            alt: luxurySafariAlt,
            previousImage: previousLuxurySafariImage,
            previousImageId: luxurySafariImageId,
            previousAlt: previousLuxurySafariAlt
          },
          {
            title: elephantsImageTitle,
            image: elephantsImagePath,
            alt: elephantsImageAlt,
            previousImage: previousElephantsImage,
            previousImageId: elephantsImageId
          },
          {
            title: jungleCanopyTitle,
            image: jungleCanopyImagePath,
            alt: jungleCanopyAlt,
            previousImage: previousJungleCanopyImage,
            previousImageId: jungleCanopyImageId
          },
          {
            title: lakesSunsetsTitle,
            image: lakesSunsetsImagePath,
            alt: lakesSunsetsAlt,
            previousImage: previousLakesSunsetsImage,
            previousImageId: lakesSunsetsImageId
          },
          {
            title: sigiriyaPanoramaTitle,
            image: sigiriyaPanoramaImagePath,
            alt: sigiriyaPanoramaAlt
          }
        ];
        const nextItems = currentItems.map(item => {
          const update = galleryUpdates.find(entry => {
            const titleMatches = normalizeText(item?.title) === normalizeText(entry.title);
            const altMatches = entry.previousAlt
              ? normalizeText(item?.alt) === normalizeText(entry.previousAlt)
              : false;
            const imageMatches =
              typeof item?.image === "string" &&
              (item.image === entry.previousImage ||
                (entry.previousImageId && item.image.includes(entry.previousImageId)));
            return titleMatches || altMatches || imageMatches;
          });
          if (update) {
            const nextItem = {
              ...item,
              title: update.title,
              image: update.image,
              alt: update.alt
            };
            if (
              item.title !== nextItem.title ||
              item.image !== nextItem.image ||
              item.alt !== nextItem.alt
            ) {
              galleryNeedsSave = true;
            }
            return nextItem;
          }
          return item;
        });
        const hasSigiriyaPanorama = nextItems.some(item => {
          const titleMatches =
            normalizeText(item?.title) === normalizeText(sigiriyaPanoramaTitle);
          const imageMatches = item?.image === sigiriyaPanoramaImagePath;
          return titleMatches || imageMatches;
        });
        if (!hasSigiriyaPanorama) {
          const lakesIndex = nextItems.findIndex(item => {
            const titleMatches = normalizeText(item?.title) === normalizeText(lakesSunsetsTitle);
            const imageMatches =
              typeof item?.image === "string" &&
              (item.image === lakesSunsetsImagePath ||
                (lakesSunsetsImageId && item.image.includes(lakesSunsetsImageId)));
            return titleMatches || imageMatches;
          });
          const newItem = {
            title: sigiriyaPanoramaTitle,
            image: sigiriyaPanoramaImagePath,
            alt: sigiriyaPanoramaAlt
          };
          if (lakesIndex >= 0) {
            nextItems.splice(lakesIndex + 1, 0, newItem);
          } else {
            nextItems.push(newItem);
          }
          galleryNeedsSave = true;
        }
        if (galleryNeedsSave) {
          aboutPage.gallery = {
            ...defaultAboutData.gallery,
            ...currentGallery,
            items: nextItems
          };
          needsSave = true;
        }
      }
      if (needsSave) {
        await aboutPage.save();
      }
    }
    res.json(aboutPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
