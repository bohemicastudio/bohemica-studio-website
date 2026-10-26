import site from "./site.js";

// Privacy policy text (HTML) per language, rendered by pages/privacy.njk.
// Titles and summaries live in i18n/<lang>.js under `privacy`.

const { company, email } = site;
const mail = `<a href="mailto:${email}">${email}</a>`;

export default {
	en: {
		updated: "26 October 2026",
		body: `
<p>This policy explains how Poweron s.r.o., the company behind the Bohemica Studio brand, handles personal data when you visit www.bohemicastudio.com, send us a message or book a call with us. Our digital signage service has its own policy at <a href="https://www.bohemicasignage.com/privacy">bohemicasignage.com/privacy</a>.</p>

<h2>1. Who we are</h2>
<p>The data controller is:</p>
<p><strong>${company.name}</strong><br>Company ID (IČ): ${company.idFormatted}<br>VAT ID: ${company.vatId}<br>${company.street}, ${company.postalCode} ${company.locality}, Czech Republic<br>Registered in the commercial register kept by the Regional Court in Ústí nad Labem, file ${company.register}<br>E-mail: ${mail}</p>
<p>We have not appointed a data protection officer. Send any privacy questions to the e-mail address above.</p>

<h2>2. What we collect and why</h2>
<ul>
<li><strong>Contact form.</strong> Your name, e-mail address, message and the language of the page you sent it from. We use them to reply to you and to discuss your enquiry. The form is delivered by Formspark (Trampoline Software SRL, Belgium; data stored in Ireland and Germany), which forwards it to our inbox and, to filter spam, keeps your IP address and approximate location for up to 12 months.</li>
<li><strong>E-mails and calls.</strong> Whatever you share with us when you write to us or talk to us, used to handle your request and, if we work together, to deliver the project.</li>
<li><strong>Booking a call.</strong> The “Schedule a call” button opens Calendly (Calendly LLC, USA). The details you enter there (name, e-mail and any answers) are processed by Calendly on our behalf so that the meeting can be scheduled.</li>
<li><strong>Website statistics.</strong> We use Simple Analytics (Simple Analytics B.V., the Netherlands), which counts page views without cookies, without storing IP addresses and without building profiles of visitors. We only see aggregated numbers such as visited pages, referring websites, countries and screen sizes.</li>
<li><strong>Hosting.</strong> The website is hosted by Render (Render Services, Inc., USA) and delivered through Cloudflare (Cloudflare, Inc., USA). Their servers process your IP address and technical details of each request to deliver the pages and protect the site from attacks.</li>
<li><strong>GitHub avatars.</strong> The section about the open-source projects we build with shows profile pictures loaded from GitHub (GitHub, Inc., USA), so GitHub receives your IP address when that part of the page loads.</li>
</ul>
<p>We process this data on the basis of steps taken at your request before entering into a contract (GDPR Art. 6(1)(b)) and our legitimate interest in answering enquiries, running a secure website and understanding how it is used (Art. 6(1)(f)). Once we work together, we process data to perform the contract (Art. 6(1)(b)) and to meet our accounting and tax obligations (Art. 6(1)(c)).</p>

<h2>3. Cookies</h2>
<p>This website sets no cookies. If you switch the language, your choice is remembered in your browser's local storage, on your device only. Calendly sets its own cookies when you open its booking page.</p>

<h2>4. Who receives your data</h2>
<p>We do not sell personal data. It is shared only with the providers listed in section 2, who act on our behalf, and with public authorities where the law requires it.</p>

<h2>5. Transfers outside the EU</h2>
<p>Render, Cloudflare, Calendly and GitHub are based in the United States. Transfers to them rely on the EU-US Data Privacy Framework for certified providers or on the European Commission's Standard Contractual Clauses. You can ask us for a copy of the relevant safeguards.</p>

<h2>6. How long we keep it</h2>
<ul>
<li>Messages, e-mails and call notes: for as long as needed to handle your enquiry and any project that follows, and afterwards for as long as needed to establish or defend legal claims.</li>
<li>Contracts and invoices: for the periods required by Czech accounting and tax law.</li>
<li>Website statistics: kept only in aggregated form, without personal data.</li>
</ul>

<h2>7. Your rights</h2>
<p>Under the GDPR you have the right to access your data, to have it corrected or erased, to restrict or object to its processing, and to data portability. To use any of these rights, e-mail ${mail}. We will reply within one month.</p>
<p>You can also lodge a complaint with the Czech Office for Personal Data Protection (Úřad pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, <a href="https://uoou.gov.cz">uoou.gov.cz</a>) or the supervisory authority of the EU country where you live or work.</p>

<h2>8. Changes</h2>
<p>We may update this policy, for example when we start using a new service. The date at the top shows the latest version.</p>
`,
	},
	cs: {
		updated: "26. října 2026",
		body: `
<p>Tyto zásady popisují, jak společnost Poweron s.r.o., která stojí za značkou Bohemica Studio, zpracovává osobní údaje, když navštívíte www.bohemicastudio.com, pošlete nám zprávu nebo si s námi domluvíte hovor. Naše služba pro digital signage má vlastní zásady na <a href="https://www.bohemicasignage.com/privacy">bohemicasignage.com/privacy</a> (v angličtině).</p>

<h2>1. Kdo jsme</h2>
<p>Správcem osobních údajů je:</p>
<p><strong>${company.name}</strong><br>IČ: ${company.idFormatted}<br>DIČ: ${company.vatId}<br>${company.street}, ${company.postalCode} ${company.locality}<br>Zapsaná v obchodním rejstříku vedeném Krajským soudem v Ústí nad Labem, spisová značka ${company.register}<br>E-mail: ${mail}</p>
<p>Pověřence pro ochranu osobních údajů jsme nejmenovali. S dotazy k ochraně osobních údajů se obracejte na e-mail výše.</p>

<h2>2. Jaké údaje zpracováváme a proč</h2>
<ul>
<li><strong>Kontaktní formulář.</strong> Jméno, e-mail, text zprávy a jazyk stránky, ze které jste ji odeslali. Použijeme je, abychom vám odpověděli a mohli s vámi probrat vaši poptávku. Formulář doručuje služba Formspark (Trampoline Software SRL, Belgie; data uložena v Irsku a Německu), která ho přeposílá do naší schránky a kvůli filtrování spamu uchovává vaši IP adresu a přibližnou polohu až 12 měsíců.</li>
<li><strong>E-maily a hovory.</strong> Cokoli nám sdělíte, když nám napíšete nebo s námi mluvíte. Používáme to k vyřízení vašeho požadavku, a pokud spolu začneme spolupracovat, k realizaci projektu.</li>
<li><strong>Rezervace hovoru.</strong> Tlačítko pro rezervaci hovoru otevře službu Calendly (Calendly LLC, USA). Údaje, které tam vyplníte (jméno, e-mail a případné odpovědi), zpracovává Calendly naším jménem, aby bylo možné schůzku naplánovat.</li>
<li><strong>Statistiky návštěvnosti.</strong> Používáme Simple Analytics (Simple Analytics B.V., Nizozemsko), která počítá návštěvy bez cookies, bez ukládání IP adres a bez vytváření profilů návštěvníků. Vidíme jen souhrnná čísla, například navštívené stránky, odkazující weby, země a velikosti obrazovek.</li>
<li><strong>Hosting.</strong> Web hostuje Render (Render Services, Inc., USA) a doručuje ho Cloudflare (Cloudflare, Inc., USA). Jejich servery zpracovávají vaši IP adresu a technické údaje o každém požadavku, aby mohly stránky doručit a chránit web před útoky.</li>
<li><strong>Avatary z GitHubu.</strong> Sekce s open-source projekty, se kterými pracujeme, zobrazuje profilové obrázky načítané z GitHubu (GitHub, Inc., USA), takže GitHub při načtení této části stránky obdrží vaši IP adresu.</li>
</ul>
<p>Údaje zpracováváme na základě opatření přijatých před uzavřením smlouvy na vaši žádost (čl. 6 odst. 1 písm. b) GDPR) a našeho oprávněného zájmu odpovídat na dotazy, provozovat bezpečný web a rozumět tomu, jak se používá (čl. 6 odst. 1 písm. f)). Pokud spolu začneme spolupracovat, zpracováváme údaje pro plnění smlouvy (písm. b)) a pro splnění účetních a daňových povinností (písm. c)).</p>

<h2>3. Cookies</h2>
<p>Tento web nepoužívá cookies. Pokud přepnete jazyk, vaše volba se uloží do místního úložiště prohlížeče, pouze ve vašem zařízení. Calendly používá vlastní cookies, když otevřete jeho rezervační stránku.</p>

<h2>4. Komu údaje předáváme</h2>
<p>Osobní údaje neprodáváme. Předáváme je jen poskytovatelům uvedeným v bodě 2, kteří je zpracovávají naším jménem, a orgánům veřejné moci, pokud to vyžaduje zákon.</p>

<h2>5. Předávání mimo EU</h2>
<p>Render, Cloudflare, Calendly a GitHub sídlí ve Spojených státech. Předávání údajů k nim se řídí rámcem EU-US Data Privacy Framework u certifikovaných poskytovatelů, nebo standardními smluvními doložkami Evropské komise. Kopii příslušných záruk vám na požádání poskytneme.</p>

<h2>6. Jak dlouho údaje uchováváme</h2>
<ul>
<li>Zprávy, e-maily a poznámky z hovorů: po dobu nutnou k vyřízení poptávky a případného navazujícího projektu, a poté po dobu nutnou k uplatnění nebo obhajobě právních nároků.</li>
<li>Smlouvy a faktury: po dobu, kterou vyžadují české účetní a daňové předpisy.</li>
<li>Statistiky návštěvnosti: uchováváme jen v souhrnné podobě, bez osobních údajů.</li>
</ul>

<h2>7. Vaše práva</h2>
<p>Podle GDPR máte právo na přístup ke svým údajům, na jejich opravu nebo výmaz, na omezení zpracování, právo vznést námitku a právo na přenositelnost údajů. Svá práva můžete uplatnit e-mailem na ${mail}. Odpovíme do jednoho měsíce.</p>
<p>Máte také právo podat stížnost u Úřadu pro ochranu osobních údajů (Pplk. Sochora 27, 170 00 Praha 7, <a href="https://uoou.gov.cz">uoou.gov.cz</a>) nebo u dozorového úřadu státu EU, kde žijete nebo pracujete.</p>

<h2>8. Změny</h2>
<p>Tyto zásady můžeme aktualizovat, například když začneme používat novou službu. Datum nahoře ukazuje poslední verzi.</p>
`,
	},
};
