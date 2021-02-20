Spruce.store("global",{loaded:!1,language:null,sectionInView:"",openSectionClue:!1,showWindowUnderlay:!1,onlyWhySection:!1,showRepos:!0,translation:{en:{sections:{what:{name:"What",title:"What we do",subtitle:"Individuals, startups and established firms entrust us with crafting functional web & mobile based applications and eye-catching brand identities that support their specific business aims."},how:{name:"How",title:"How we do it",subtitle:"Every client & project have a unique set of requirements and priorities.There is no universal process or workflow. Clear communication, personal experience and reliable technological stack are part of our tested formula for finding the right solution."},"how-much":{name:"How much",title:"How much we charge",subtitle:"???"},why:{name:"Why",title:"Why to work with us",subtitle:!1},who:{name:"Who",title:"Who we have worked with",subtitle:!1},where:{name:"Where",title:"Where to reach us",subtitle:"We are a small team of hard-working geeks & nerds scattered across the European continent, although we operate in any corner of the internet space."}},head:{title:"Hello there!",subtitle:"We are a friendly team of qualified full-stack programmers and visual designers"},tooltip:{scheduleCall:"Schedule a call",changeLanguage:"Change language",twitter:"See what we have to say on Twitter",linkedin:"Connect with us on LinkedIn"},recentActivity:"Recent activity",lastUpdated:"Last updated",loading:"Loading...",backToTop:"Back to top",backToProjectOverview:"Back to the project overview"},cs:{sections:{what:{name:"Co",title:"Co umíme",subtitle:""},how:{name:"Jak",title:"Jak pracujeme",subtitle:""},"how-much":{name:"Kolik",title:"Kolik to stojí",subtitle:""},why:{name:"Proč",title:"Proč si vybrat nás",subtitle:!1},who:{name:"Kdo",title:"Kdo s námi spolupracuje",subtitle:!1},where:{name:"Kde",title:"Kde se nacházíme",subtitle:""}},head:{title:"Nazdárek!",subtitle:"Jsme přátelský tým kvalifikovaných programátorů a designerů informačních technologií"},tooltip:{scheduleCall:"Zarezervovat online schůzku",changeLanguage:"Změnit jazyk",twitter:"Koukni, co máme na srdci na Twitteru",linkedin:"Spoj se s námi na síti LinkedIn"},recentActivity:"Nedávná aktivita",lastUpdated:"Naposledy aktualizováno",loading:"Načítám...",backToTop:"Zpět nahoru",backToProjectOverview:"Zpět na přehled projektů"}},return:function(e){return Object.getProperty(Spruce.stores.global,"translation."+Spruce.stores.global.language+"."+e)},languages:[{code:"en",name:"English"},{code:"cs",name:"Čeština"}],async switchTranslation(e){this.language=e,localStorage.setItem("language",e),console.log("router",router);let t=router.current[0].url;t=t.includes("/")?t.split("/").reduce(((t,a,o)=>0===o?e:t+"/"+a),e):e,window.tooltips.forEach((e=>{e.forEach((e=>{e.destroy()}))})),window.initialiseTooltips(),router.navigate(t,{callHandler:!1})},mobileMenuOpen:!1,openMobileMenu(){return this.mobileMenuOpen=!0,new Promise((e=>{anime({targets:"#mobileMenu",translateY:"0%",duration:600,easing:"easeOutQuart",begin:()=>{console.log("opening mobileMenu")},complete:()=>{Spruce.stores.global.showWindowUnderlay=!0,window.animation.showWindowUnderlay.play()}}).finished.then((()=>{e()}))}))},closeMobileMenu(){window.router.navigate(Spruce.stores.global.language,{callHandler:!1}),anime({targets:"#mobileMenu",translateY:"-100%",duration:400,easing:"easeInQuart",complete:()=>{window.animation.showWindowUnderlay.reverse(),window.animation.showWindowUnderlay.play(),window.animation.showWindowUnderlay.finished.then((()=>{window.animation.showWindowUnderlay.reverse(),this.mobileMenuOpen=!1,setTimeout((()=>{Spruce.stores.global.showWindowUnderlay=!1}),50)}))}})}}),Spruce.store("activity",{random:null,activities:[{en:{content:'<span class="mt-0.5">Website project for MMT company completed in Q3/2020</span><img class="max-w-none" src="./images/activity/checkmark-emoji.svg">',url:"/project/mmt"},cs:{content:'<span class="mt-0.5">Web pro společnost MMT s.r.o. dokončen na podzim roku 2020</span><img class="max-w-none" src="./images/activity/checkmark-emoji.svg">',url:"/projekt/mmt"}},{en:{content:'<span class="mt-0.5">We are an official partner of ApostrophCMS</span><img class="max-w-none" src="./images/activity/apostrophecms-logo.svg">',url:"https://apostrophecms.com/",target:"_blank"},cs:{content:'<span class="mt-0.5">Jsme oficiálními partnery ApostropheCMS</span><img class="max-w-none" src="./images/activity/apostrophecms-logo.svg">',url:"https://apostrophecms.com/",target:"_blank"}},{en:{content:'<span class="mt-0.5">We open-sourced our website on GitHub</span><img class="max-w-none" src="./images/activity/github-logo.svg">',url:"https://github.com/",target:"_blank"},cs:{content:'<span class="mt-0.5">Vypustili jsme kód našeho webu GitHub komunitě</span><img class="max-w-none" src="./images/activity/github-logo.svg">',url:"https://github.com/",target:"_blank"}}],get getContent(){if(Spruce.stores.global.language&&(!this.random||0!==this.random))return this.activities[this.random][Spruce.stores.global.language].content},get getUrl(){if(Spruce.stores.global.language&&(!this.random||0!==this.random))return this.activities[this.random][Spruce.stores.global.language].url.includes("://")?this.activities[this.random][Spruce.stores.global.language].url:window.router.generate("project-"+Spruce.stores.global.language,{language:Spruce.stores.global.language,name:"mmt"})}}),Spruce.starting((function(){console.log("Spruce starting",Spruce.stores,Math.floor(Math.random()*Spruce.stores.activity.activities.length)),Spruce.stores.activity.random=Math.floor(Math.random()*Spruce.stores.activity.activities.length)})),Spruce.store("project",{loadContent:e=>fetch(`./${window.router.root}/projects/${e}.html`).then((e=>e.text())).then((e=>{document.querySelector("#slideoverContent").innerHTML=e}))}),Spruce.store("slideover",{open:!1,animationFinished:!1}),Spruce.store("translation.badge",{en:{officialPartner:"Official partner",sourceCode:"Source code available",latestProject:"Latest project"},cs:{officialPartner:"Oficiální partner",sourceCode:"Zdrojový kód k dostání",latestProject:"Nejnovější project"},return:function(e){return Object.getProperty(Spruce.stores["translation.badge"],Spruce.stores.global.language+"."+e)}});