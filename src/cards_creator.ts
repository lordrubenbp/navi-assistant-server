import { translate } from "./locale";


export function createEvaluationCard(analysis: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }, evaluation: string, user_language?: string) {

  let responseFormated: CardItem[] = [];

  let imageItem = new CardItem();

    imageItem.type = "image";
    imageItem.rawUrl = "http://naviassistant.com/api/v1/resources/evaluation/" + user_language + ".jpg";
    imageItem.accessibilityText = user_language;

    responseFormated.push(imageItem);

  let cardItem = new CardItem();
  cardItem.type = "info";
  //cardItem.title = `The score obtained for your project is: ${evaluation}`;
  cardItem.title = translate("evaluation.card.title", user_language, { evaluation: evaluation });
  cardItem.subtitle = translate("evaluation.card.subtitle", user_language);

  responseFormated.push(cardItem);
  for (const key in analysis) {


    console.log(key + " -> " + analysis[key]);
    if (analysis[key] == 1) {

      let accordionItem = new CardItem();
      accordionItem.type = "accordion";
      //accordionItem.title = getTip(key).name;
      accordionItem.title = translate("evaluation.fields." + key + ".name", user_language);
      accordionItem.subtitle = translate("evaluation.card.improve", user_language, { field: translate("evaluation.fields." + key + ".name", user_language) });
      accordionItem.text = translate("evaluation.fields." + key + ".text", user_language);

      responseFormated.push(accordionItem);

      let buttonItem = new CardItem();
      let icon = new Icon();
      icon.type = "chevron_right";
      icon.color = "#03a9f4";
      buttonItem.type = "button";
      buttonItem.icon = icon;
      buttonItem.text = translate("evaluation.card.more_info", user_language, { field: translate("evaluation.fields." + key + ".name", user_language) });
      buttonItem.link = translate("evaluation.fields." + key + ".link", user_language);
      //console.log(buttonItem);
      responseFormated.push(buttonItem);
    }

  }
  //console.log(JSON.stringify(responseFormated));
  
  return JSON.stringify(responseFormated);
 

}


export function createProjectsGuidedCardJSON(projects: any, language: string) {

  let responseFormated: CardItem[] = [];

  let dividerItem = new CardItem();
  dividerItem.type = "divider";

  let descriptionItem = new CardItem();

  descriptionItem.type = "accordion";
  descriptionItem.title = translate("projects_guided.title", language);
  descriptionItem.subtitle = translate("projects_guided.subtitle", language);
  descriptionItem.text = "";

  responseFormated.push(descriptionItem);



  for (const project in projects) {

    responseFormated.push(dividerItem);

    let imageItem = new CardItem();

    imageItem.type = "image";
    imageItem.rawUrl = "http://naviassistant.com/api/v1/resources/projects/" + project + "/" + project + ".jpg";
    imageItem.accessibilityText = project;

    responseFormated.push(imageItem);


    let accordionItem = new CardItem();
    accordionItem.type = "accordion";
    accordionItem.title = translate("projects_guided.appinventor." + project + ".name", language);
    //accordionItem.subtitle = `Project Level: ${translate("projects_guided.appinventor."+project+".level",language)}`;
    accordionItem.subtitle = translate("projects_guided.level", language, { level: translate("projects_guided.appinventor." + project + ".level", language) });
    accordionItem.text = translate("projects_guided.appinventor." + project + ".text", language);

    responseFormated.push(accordionItem);
    responseFormated.push(dividerItem);

    let buttonItem = new CardItem();
    let icon = new Icon();
    icon.type = "chevron_right";
    icon.color = "#03a9f4";
    buttonItem.type = "button";
    buttonItem.icon = icon;
    buttonItem.text = translate("projects_guided.start", language);
    let event = new Event();
    event.name = "LOAD_PROJECT_GUIDED";
    event.languageCode = language;
    let parameters = new Parameter();
    parameters.project = project;
    event.parameters = parameters;
    buttonItem.event = event;

    responseFormated.push(buttonItem);


  }

  //console.log(JSON.stringify(responseFormated));
  return responseFormated;

}

export function createProjectGuidedCardStart(project:string,language:string){

  let responseFormated: CardItem[] = [];

  let dividerItem = new CardItem();
  dividerItem.type = "divider";

  let descriptionItem = new CardItem();

  descriptionItem.type = "accordion";
  descriptionItem.title = translate("projects_guided.started.title", language,{project:translate("projects_guided.appinventor."+project+".name", language)});
  descriptionItem.subtitle = translate("projects_guided.started.subtitle", language);
  descriptionItem.text = "";

  responseFormated.push(descriptionItem);
  responseFormated.push(dividerItem);

  let buttonItem = new CardItem();
    let icon = new Icon();
    icon.type = "file_download";
    icon.color = "#03a9f4";
    buttonItem.type = "button";
    buttonItem.icon = icon;
    buttonItem.text = translate("projects_guided.started.resources", language);
    buttonItem.link="http://naviassistant.com/api/v1/resources/projects/"+project+"/"+project+".zip";
    
    responseFormated.push(buttonItem);

    buttonItem= new CardItem();
    buttonItem.type = "button";
    icon = new Icon();
    icon.type = "question_mark";
    icon.color = "#03a9f4";
    buttonItem.icon = icon;
    buttonItem.text = translate("projects_guided.started.resources_help", language);

    let event = new Event();
    event.name = "HOW_ADD_MEDIA";
    event.languageCode = language;
    buttonItem.event = event;

  responseFormated.push(buttonItem);

  buttonItem= new CardItem();
    buttonItem.type = "button";
    icon = new Icon();
    icon.type = "play_circle_outline";
    icon.color = "#03a9f4";
    buttonItem.icon = icon;
    buttonItem.text = translate("projects_guided.started.show_steps", language);

    event = new Event();
    event.name = "START_PROJECT_GUIDED";
    event.languageCode = language;
    let parameters = new Parameter();
    parameters.project = project;
    event.parameters = parameters;

    buttonItem.event = event;

    responseFormated.push(buttonItem);

  return responseFormated;


}
export function createProjectGuidedCardEnd(project:string,language:string){

  let responseFormated: CardItem[] = [];

  let dividerItem = new CardItem();
  dividerItem.type = "divider";

  let descriptionItem = new CardItem();

  descriptionItem.type = "accordion";
  descriptionItem.title = translate("projects_guided.ended.title", language,{project:translate("projects_guided.appinventor."+project+".name", language)});
  descriptionItem.subtitle = translate("projects_guided.ended.subtitle", language);
  descriptionItem.text = "";

  responseFormated.push(descriptionItem);
  responseFormated.push(dividerItem);

  let buttonItem = new CardItem();
  let icon = new Icon();
  icon.type = "stop_circle";
  icon.color = "#03a9f4";
  buttonItem.type = "button";
  buttonItem.icon = icon;
  buttonItem.text = translate("projects_guided.end", language);
  let event = new Event();
  event.name = "STOP_PROJECT_GUIDED";
  event.languageCode = language;
  buttonItem.event = event;

  responseFormated.push(buttonItem);
  responseFormated.push(dividerItem);

  buttonItem = new CardItem();
  buttonItem.type = "button";
  icon = new Icon();
  icon.type = "question_mark";
  icon.color = "#03a9f4";
  buttonItem.icon = icon;
  buttonItem.text = translate("projects_guided.test", language);
  event = new Event();
  event.name = "TEST_APP";
  event.languageCode = language;
  buttonItem.event = event;

  responseFormated.push(buttonItem);

  return JSON.stringify(responseFormated);

}
export function createLanguageSelectorCard(language:string){

  let responseFormated: CardItem[] = [];

  let dividerItem = new CardItem();
  dividerItem.type = "divider";

  let descriptionItem = new CardItem();

  descriptionItem.type = "accordion";
  descriptionItem.title = translate("language.title", language);
  descriptionItem.subtitle = translate("language.subtitle", language);
  descriptionItem.text = "";

  responseFormated.push(descriptionItem);
  responseFormated.push(dividerItem);

  let buttonItem = new CardItem();
  let icon = new Icon();
  icon.type = "chevron_right";
  icon.color = "#03a9f4";
  buttonItem.type = "button";
  buttonItem.icon = icon;
  buttonItem.text = translate("language.en",language);
  let event = new Event();
    event.name = "CHANGE_LANGUAGE";
    event.languageCode = language;
    let parameters = new Parameter();
    parameters.language = "en";
    event.parameters = parameters;
    buttonItem.event = event;

  responseFormated.push(buttonItem);
  responseFormated.push(dividerItem);

  buttonItem = new CardItem();
  icon = new Icon();
  icon.type = "chevron_right";
  icon.color = "#03a9f4";
  buttonItem.type = "button";
  buttonItem.icon = icon;
  buttonItem.text = translate("language.es",language);
   event = new Event();
    event.name = "CHANGE_LANGUAGE";
    event.languageCode = language;
     parameters = new Parameter();
    parameters.language = "es";
    event.parameters = parameters;
    buttonItem.event = event;

  responseFormated.push(buttonItem); 


  return responseFormated;



}
export function createFeaturesListCard(features:any,language:string){

  let responseFormated: CardItem[] = [];
  let dividerItem = new CardItem();
  dividerItem.type = "divider";

  let imageItem = new CardItem();

    imageItem.type = "image";
    imageItem.rawUrl = "http://naviassistant.com/api/v1/resources/features/" + language + ".jpg";
    imageItem.accessibilityText = language;

    responseFormated.push(imageItem);
  

  let descriptionItem = new CardItem();

  descriptionItem.type = "accordion";
  descriptionItem.title = translate("features.title", language);
  descriptionItem.subtitle = translate("features.subtitle", language);
  descriptionItem.text = "";

  responseFormated.push(descriptionItem);

  for (const feature in features) {

    responseFormated.push(dividerItem);

  
    let accordionItem = new CardItem();
    accordionItem.type = "accordion";
    accordionItem.title = translate("features.feature." + feature + ".title", language);
    accordionItem.text = translate("features.feature." + feature + ".text", language);

    responseFormated.push(accordionItem);
    

  }
  return responseFormated;
  
}

export function createHelperCards(type:string,language:string){

  let responseFormated: CardItem[] = [];

  let buttonItem = new CardItem();
  let icon = new Icon();
  icon.type = "question_mark";
  icon.color = "#03a9f4";
  buttonItem.type = "button";
  buttonItem.icon = icon;
  buttonItem.text = translate("projects_guided."+type, language);
  let event = new Event();
  event.name = type;
  event.languageCode = language;
  buttonItem.event = event;

  responseFormated.push(buttonItem);

  return JSON.stringify(responseFormated);

}
class CardItem {

  public type: string;
  public title?: string;
  public subtitle?: string;
  public text?: string;
  public link?: string;
  public icon?: Icon;
  public rawUrl?: string;
  public accessibilityText?: string;
  public event?: Event;


}
class Icon {
  public type: string;
  public color: string;
}
class Event {
  public name: string;
  public languageCode: string;
  public parameters: Parameter;
}
class Parameter {
  public project?: string;
  public language?:string;
}