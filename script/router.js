function projectHandler(e){console.log("projectHandler",e),console.log("projectHandler/getFile",window.router.getFile(e)),!0===Spruce.stores.slideover.open?(window.animation.slideoverFadeOutContent.play(),window.animation.slideoverFadeOutContent.finished.then((()=>{document.querySelector("#slideoverContentWrapper").scrollTo(0,0),setTimeout((()=>{Spruce.stores.project.loadContent(window.router.getFile(e)).then((()=>{window.animation.slideoverFadeInContent.play(),window.router.updatePageLinks()}))}),50)}))):waitFor((()=>!0===window.animation.ready)).then((()=>{Spruce.stores.slideover.open=!0,setTimeout((()=>{window.animation.slideoverOpen.play(),window.animation.slideoverOpen.finished.then((()=>{Spruce.stores.global.showWindowUnderlay=!0,setTimeout((()=>{window.animation.showWindowUnderlay.play()}),50),document.querySelector("#slideoverContentWrapper").scrollTo(0,0),setTimeout((()=>{Spruce.stores.project.loadContent(window.router.getFile(e)).then((()=>{window.animation.slideoverFadeInContent.play(),window.router.updatePageLinks()}))}),50)}))}),50)}))}console.log("window.location",window.location,"bohemicastudio.github.io"===window.location.hostname),window.router=new Navigo("bohemicastudio.github.io"===window.location.hostname?"/bohemica-studio-website":"/",{strategy:"ONE",hash:!1,noMatchWarning:!1}),Spruce.stores.global.language=void 0!==localStorage.language&&null!==localStorage.language&&Spruce.stores.global.languages.some((e=>e.code===localStorage.language))?localStorage.language:"en",localStorage.setItem("language",Spruce.stores.global.language),window.router.hooks({before:function(e,o){console.log("before",o,router),e(!1),window.Spruce.stores.global.openSectionClue=!1,o.data?.language?(Spruce.stores.global.languages.some((e=>e.code===o.data.language))?(Spruce.stores.global.language=o.data.language,localStorage.setItem("language",Spruce.stores.global.language)):window.router.navigate(Spruce.stores.global.language,{callHandler:!1}),e()):(console.log("NO PARAM"),window.router.navigate("en",{callHandler:!1}))},after:function(e){console.log("after",e,router),console.log(e.route.name.substr(0,e.route.name.lastIndexOf("-"))),router.paths.some((o=>o.route===e.route.name.substr(0,e.route.name.lastIndexOf("-"))))&&console.log("matched")}}),window.router.paths=[{file:"overview",path:{en:"overview",cs:"prehled"},route:"project"},{file:"media-server",path:{en:"t-mobile",cs:"t-mobile"},route:"project"},{file:"mmt",path:{en:"mmt",cs:"mmt"},route:"project"},{file:"lancaster-maloney",path:{en:"lancaster-maloney",cs:"lancaster-maloney"},route:"project"},{file:"subtitle-editor",path:{en:"slideslive",cs:"slideslive"},route:"project"},{file:"superflow",path:{en:"superflow",cs:"superflow"},route:"project"},{file:"landing-pages",path:{en:"landing-pages",cs:"webove-stranky"},route:"project"},{file:"branding",path:{en:"branding",cs:"firemni-identita"},route:"project"}],window.router.getPath=function(e){let o,a;return router.paths.find((o=>o.file===e))?(o=router.paths.find((o=>o.file===e)).route+"-"+Spruce.stores.global.language,a=router.paths.find((o=>o.file===e)).path[Spruce.stores.global.language]):console.error("getPath:",e,"(Path does not exist)"),console.log(o,a,router.generate(o,{language:Spruce.stores.global.language,name:a})),router.generate(o,{language:Spruce.stores.global.language,name:a})},window.router.getFile=function(e){return router.paths.find((o=>o.path[Spruce.stores.global.language]===e)).file},window.router.on({":language":function({data:e}){console.log("Root - has param;","params:",e),!0===Spruce.stores.slideover.open&&(window.animation.slideoverClose.play(),window.animation.slideoverClose.finished.then((()=>{Spruce.stores.slideover.open=!1,window.animation.showWindowUnderlay.reverse(),window.animation.showWindowUnderlay.play(),window.animation.showWindowUnderlay.finished.then((()=>{window.animation.slideoverFadeOutContent.play(),window.animation.showWindowUnderlay.reverse(),setTimeout((()=>{Spruce.stores.global.showWindowUnderlay=!1}),50)})),Spruce.stores.project.content=""})))},":language/projects/:name":{as:"project-en",uses:({data:e})=>{console.log("Project; en","params:",e),projectHandler(e.name)}},":language/projekty/:name":{as:"project-cs",uses:({data:e})=>{console.log("Projekt; cs","params:",e),projectHandler(e.name)}},"*":function({data:e}){console.log("Root - no language;","data:",e,!e),!e&&Spruce.stores.global.language?(console.log("redirecting with language from local storage"),window.router.navigate(Spruce.stores.global.language,{callHandler:!1})):(console.log("redirecting without language from local storage"),window.router.navigate("en",{callHandler:!1}))}}).resolve(),console.log(window.router.match("/en/projects/overview"));