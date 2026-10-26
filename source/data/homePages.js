// Homepage in every language, plus "/" which serves English (canonical /en/) and redirects returning Czech visitors
export default [
	{ lang: "en", url: "/en/" },
	{ lang: "cs", url: "/cs/" },
	{ lang: "en", url: "/", root: true },
];
