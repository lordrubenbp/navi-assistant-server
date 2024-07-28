import i18n, { __ } from "i18n";
import path from "path";
const translatte = require('translatte');



i18n.configure(
  {
    locales:['en','es'],
    directory:path.join(__dirname,'../locales'),
    register:global,
    objectNotation:true,
    updateFiles: false,
    missingKeyFn: function (locale, value) {

      return undefined;
    },
  }
)

 export function translate (p: any,l: any,ph?: any){

  return __({phrase:p,locale:l},ph);
  
}

export async function atranslate(text:string,lang:string){
  
  const response= await translatte(text, {to: lang}).then((res:any) => {

    return res.text;
    
}).catch((err: any) => {
    console.error(err);
});

return response;
}