/**
 * This script scrapes the categories from the aljam3's website and saves them to a JSON file.
 */
import { load } from 'cheerio';

const categories: { id: number; name: string }[] = [];

console.log('Fetching categories...');
const html = await (await fetch('https://aljam3.com/categories')).text();
const $ = load(html);

$('body > div.px-4.sm\\:px-4.py-4.sm\\:container > a').each((_, el) => {
  const href = $(el).attr('href');
  if (!href) return;

  // get first p tag
  const text = $(el).find('p').first().text();
  categories.push({
    id: Number(href.split('/').pop()!.trim()),
    name: text.split('.')[1]!.trim(),
  });
});

// some categories have a slight difference in the name, so we need to map them to the correct id
const extraMappings = [
  {
    name: 'الحديث الستة',
    id: 62,
  },
  {
    name: 'الرد الصهيونية والماسونية',
    id: 37,
  },
  {
    name: 'الرد الأشاعرة والماتريدية',
    id: 34,
  },
  {
    name: 'الرد الشيوعية والإلحاد',
    id: 36,
  },
  {
    name: 'الرد الصوفية والطرقية',
    id: 38,
  },
  {
    name: 'الرد العلمانية والليبرالية',
    id: 39,
  },
  {
    name: 'الرد اليهود والنصارى',
    id: 40,
  },
  {
    name: 'الرد الشيعة والرافضة',
    id: 35,
  },
  {
    name: 'أصول الفقه وقواعده',
    id: 2,
  },
  {
    name: 'البلاغة',
    id: 5,
  },
  {
    name: 'الأدب',
    id: 5,
  },
  {
    name: 'دواوين الشعر',
    id: 31,
  },
  {
    name: 'الجغرافيا والرحلات',
    id: 14,
  },
  {
    name: 'التراجم والأعلام',
    id: 18,
  },
  {
    name: 'التراجم والطبقات',
    id: 18,
  },
  {
    name: 'السياسة الشرعية',
    id: 43,
  },
  {
    name: 'تاريخ أوربا',
    id: 77,
  },
  {
    name: 'العقيدة',
    id: 24,
  },
  {
    name: 'التزكية والأخلاق والآداب',
    id: 41,
  },
  {
    name: 'الفرق والردود',
    id: 54,
  },
  {
    name: 'السيرة والشمائل',
    id: 44,
  },
  {
    name: 'فقه حنبلي',
    id: 55,
  },
  {
    name: 'فقه حنفي',
    id: 56,
  },
  {
    name: 'فقه شافعي',
    id: 57,
  },
  {
    name: 'فقه عام',
    id: 58,
  },
  {
    name: 'فقه مالكي',
    id: 59,
  },
  {
    name: 'كتب اللغة',
    id: 63,
  },
  {
    name: 'المجاميع المكررة',
    id: 65,
  },
  {
    name: 'اللغة العربية',
    id: 63,
  },
];

Bun.write(
  'data/categories.json',
  JSON.stringify(categories.concat(extraMappings), null, 2),
);

console.log(`Done! Total categories: ${categories.length}`);
