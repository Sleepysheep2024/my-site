import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** 旅行：一个城市一个文件 */
const travel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/travel' }),
  schema: z.object({
    city: z.string(),
    province: z.string().default(''),
    date: z.coerce.date(),
    cover: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(999),
    draft: z.boolean().default(false),
    /** 图片 + 感受，成对出现，前台左右交错展示 */
    moments: z
      .array(
        z.object({
          image: z.string(),
          caption: z.string().default(''),
          feeling: z.string(),
        }),
      )
      .default([]),
  }),
});

/** 首页个人资料 */
const profile = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    avatar: z.string(),
    intro: z.string(),
    tags: z.array(z.string()).default([]),
    /** 人生照片：首页首屏轮播 */
    photos: z
      .array(
        z.object({
          image: z.string(),
          caption: z.string().default(''),
          place: z.string().default(''),
        }),
      )
      .default([]),
    /** 关于我：最喜欢的事物 */
    about: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          note: z.string().default(''),
          icon: z
            .enum([
              'food', 'fruit', 'color', 'goal', 'drink', 'season', 'music', 'place', 'flower', 'star',
              'user', 'cake', 'ruler', 'heart', 'cloud', 'lock', 'friends', 'gift', 'tear', 'smile', 'mic', 'coin',
            ])
            .default('star'),
          /** 颜色类条目可填色值，多个用英文逗号分隔 */
          swatch: z.string().default(''),
        }),
      )
      .default([]),
    contact: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .default([]),
  }),
});

/** 个人使用说明：/resume/ 页面，可在浏览器里一键存成 PDF */
const resume = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resume' }),
  schema: z.object({
    name: z.string(),
    headline: z.string().default(''),
    intro: z.string().default(''),
    /** 基本资料 */
    basics: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    /** 正文各章节，每条是一句话 */
    chapters: z
      .array(
        z.object({
          title: z.string(),
          note: z.string().default(''),
          items: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    closing: z.string().default(''),
  }),
});

/** 阅读：一本书一个文件。列表按日期倒序，左侧按「分类」筛选 */
const reading = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reading' }),
  schema: z.object({
    title: z.string(),
    author: z.string().default(''),
    cover: z.string(),
    /** 分类：文学 / 小说 / 学习 …… 决定它出现在左侧哪一栏 */
    category: z.string().default('其他'),
    status: z.enum(['想读', '在读', '读完']).default('读完'),
    rating: z.number().min(0).max(5).default(0),
    /** 读完 / 开始读的时间 */
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string().default(''),
    /** 抄下来的好句 + 我的批注 */
    quotes: z
      .array(
        z.object({
          text: z.string(),
          page: z.string().default(''),
          note: z.string().default(''),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

/** 生活：一次出行 / 一件值得记住的小事。列表按日期倒序，不用管排序 */
const life = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/life' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    place: z.string().default(''),
    address: z.string().default(''),
    lat: z.number().optional(),
    lng: z.number().optional(),
    cover: z.string(),
    people: z.array(z.string()).default([]),
    summary: z.string().default(''),
    photos: z
      .array(
        z.object({
          image: z.string(),
          caption: z.string().default(''),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

/** 生涯：做过的事，按「类别」分组展示，不用图片、不用排序 */
const career = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/career' }),
  schema: z.object({
    title: z.string(),
    org: z.string().default(''),
    date: z.coerce.date(),
    /** 分组：实习 / 班干 / 团委学习 / 比赛 …… */
    category: z.string().default('其他'),
    summary: z.string().default(''),
    /** 当时的想法 */
    thought: z.string().default(''),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { travel, profile, resume, reading, life, career };
