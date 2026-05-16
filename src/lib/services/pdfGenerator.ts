import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import es from '$lib/i18n/es.json';
import en from '$lib/i18n/en.json';

const translations = { es, en };

const ACCENT = '#161e3c';
const MUTED = '#555555';
const DARK = '#1a1a1a';

function stripHtml(text: string): string {
	return text.replace(/<[^>]*>/g, '');
}

function htmlToContent(text: string): any[] {
	const parts = text.split(/(<strong>.*?<\/strong>)/g);
	return parts.map((part) => {
		if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
			return { text: part.slice(8, -9), bold: true };
		}
		return { text: part };
	});
}

export async function generatePDF(locale: 'es' | 'en') {
	const pdfMakeModule = await import('pdfmake/build/pdfmake');
	const pdfFontsModule = await import('pdfmake/build/vfs_fonts');

	const pdfMake = (pdfMakeModule as any).default ?? pdfMakeModule;
	const vfs =
		(pdfFontsModule as any).default ??
		(pdfFontsModule as any).vfs ??
		pdfFontsModule;
	pdfMake.vfs = vfs;

	const t = (translations as any)[locale] ?? translations.en;

	const jobEntries = Object.values(t.experience.jobs) as any[];
	const projectEntries = Object.entries(t.projects)
		.filter(([_, v]: [string, any]) => typeof v === 'object' && v.title && v.desc)
		.map(([_, v]) => v);

	const skillEntries = Object.entries(t.stack.skills).map(([key, val]: [string, any]) => ({
		key,
		...val
	}));

	const pickSkills = (keys: string[]) =>
		skillEntries
			.filter((s) => keys.includes(s.key))
			.map((s) => s.name)
			.join(' · ');

	const aiSkillEntries = Object.values(t.stack.aiSkills) as any[];

	const docDefinition: TDocumentDefinitions = {
		content: [
			// Header
			{ text: t.hero.name, style: 'header', alignment: 'center' },
			{
				text: `${t.hero.role1} — ${t.hero.role2}`,
				style: 'subheader',
				alignment: 'center',
				margin: [0, 2, 0, 4]
			},
			{
				text: 'martinfarel.dev',
				style: 'link',
				alignment: 'center',
				margin: [0, 0, 0, 20]
			},

			// Profile
			{ text: t.about.title.toUpperCase(), style: 'sectionHeader' },
			...[t.about.p1, t.about.p2, t.about.p3].map((p: string) => ({
				text: htmlToContent(p),
				style: 'paragraph',
				margin: [0, 0, 0, 6]
			})),

			// Experience
			{ text: t.experience.title.toUpperCase(), style: 'sectionHeader' },
			...jobEntries
				.map(
					(job: any) =>
						[
							{
								columns: [
									{ text: job.company, style: 'jobCompany', width: '*' },
									{ text: job.date, style: 'jobDate', width: 'auto', alignment: 'right' }
								],
								margin: [0, 8, 0, 2]
							},
							{ text: job.role, style: 'jobRole', margin: [0, 0, 0, 2] },
							{ text: stripHtml(job.desc), style: 'jobDesc', margin: [0, 0, 0, 4] }
						] as any
				)
				.flat(),

			// Projects
			{
				text: t.projects.title.replace(/<br\s*\/?>/gi, ' ').toUpperCase(),
				style: 'sectionHeader',
				pageBreak: 'before'
			},
			...projectEntries
				.map(
					(proj: any) =>
						[
							{ text: proj.title, style: 'projectTitle', margin: [0, 8, 0, 2] },
							{ text: proj.desc, style: 'projectDesc', margin: [0, 0, 0, 2] },
							{ text: proj.tags.join('  ·  '), style: 'tags', margin: [0, 0, 0, 8] }
						] as any
				)
				.flat(),

			// Stack
			{ text: t.stack.title.replace(/<br\s*\/?>/gi, ' ').toUpperCase(), style: 'sectionHeader' },
			{ text: t.stack.categories.frontend + ':', style: 'stackCategory', margin: [0, 8, 0, 2] },
			{ text: pickSkills(['react', 'svelte', 'angular', 'html']), style: 'stackList', margin: [0, 0, 0, 4] },
			{ text: t.stack.categories.mobile + ':', style: 'stackCategory', margin: [0, 4, 0, 2] },
			{ text: pickSkills(['flutter', 'dart', 'kotlin']), style: 'stackList', margin: [0, 0, 0, 4] },
			{ text: t.stack.categories.backend + ':', style: 'stackCategory', margin: [0, 4, 0, 2] },
			{ text: pickSkills(['node', 'postgres', 'firebase']), style: 'stackList', margin: [0, 0, 0, 4] },
			{ text: t.stack.categories.devops + ':', style: 'stackCategory', margin: [0, 4, 0, 2] },
			{ text: pickSkills(['docker', 'heroku', 'vercel']), style: 'stackList', margin: [0, 0, 0, 4] },
			{ text: t.stack.categories.design + ':', style: 'stackCategory', margin: [0, 4, 0, 2] },
			{ text: pickSkills(['figma', 'illustrator', 'after']), style: 'stackList', margin: [0, 0, 0, 4] },
			{ text: t.stack.ai + ':', style: 'stackCategory', margin: [0, 4, 0, 2] },
			{
				text: aiSkillEntries.map((s: any) => s.name).join(' · '),
				style: 'stackList',
				margin: [0, 0, 0, 4]
			},

			// Contact
			{ text: t.contact.title.toUpperCase(), style: 'sectionHeader' },
			{ text: 'alejandrofarel62@gmail.com', style: 'contactItem' },
			{ text: 'linkedin.com/in/martinfarel', style: 'contactItem' },
			{ text: 'github.com/martinfarel', style: 'contactItem' },
			{ text: 'martinfarel.dev', style: 'contactItem' }
		],
		styles: {
			header: { fontSize: 22, bold: true, color: ACCENT },
			subheader: { fontSize: 10, color: MUTED, characterSpacing: 0.5 },
			link: { fontSize: 9, color: ACCENT, decoration: 'underline' },
			sectionHeader: {
				fontSize: 10,
				bold: true,
				color: ACCENT,
				characterSpacing: 1,
				margin: [0, 14, 0, 4]
			},
			paragraph: { fontSize: 9, color: DARK, lineHeight: 1.35 },
			jobCompany: { fontSize: 10, bold: true, color: DARK },
			jobDate: { fontSize: 9, color: MUTED },
			jobRole: { fontSize: 9, italics: true, color: MUTED },
			jobDesc: { fontSize: 9, color: DARK, lineHeight: 1.3 },
			projectTitle: { fontSize: 10, bold: true, color: DARK },
			projectDesc: { fontSize: 9, color: DARK, lineHeight: 1.3 },
			tags: { fontSize: 8, color: MUTED },
			stackCategory: { fontSize: 9, bold: true, color: DARK },
			stackList: { fontSize: 9, color: MUTED },
			contactItem: { fontSize: 9, color: DARK, margin: [0, 0, 0, 2] }
		},
		defaultStyle: {
			font: 'Roboto'
		},
		pageMargins: [40, 40, 40, 40]
	};

	pdfMake.createPdf(docDefinition).download(`Martin_Farel_CV_${locale.toUpperCase()}.pdf`);
}
