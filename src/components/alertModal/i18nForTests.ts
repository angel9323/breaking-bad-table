import i18n from 'i18next'  

i18n      
.init({  
    lng: 'en',  
    fallbackLng: 'en',  

    // have a common namespace used around the full app    
ns: ['site'],  
    defaultNS: 'site',  

    debug: false,  

    interpolation: {  
      escapeValue: false, // not needed for react!!    
},  

    resources: { fr: { site: {}  } },  
  })  

export default i18n;
