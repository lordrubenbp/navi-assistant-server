import express from "express";
import { WebhookClient, Payload} from "dialogflow-fulfillment";
import { translate } from "./locale";
import translations from "../locales/en.json";
import { Sequelize } from "sequelize";
import { db} from "./config";
import { createProjectsGuidedCardJSON,createProjectGuidedCardStart, createLanguageSelectorCard,createFeaturesListCard} from "./cards_creator";


const router=express.Router()


router.post("/webhook", express.json(), function (req, res) {
    const agent = new WebhookClient({ request: req, response: res });
    //console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
    //console.log("Dialogflow Request body: " + JSON.stringify(req.body));
  
  
    function handleEvaluationFieldImprove(agent: WebhookClient) {
      
      let response: string = translate("evaluation.fields." + agent.parameters.evaluation_fields + ".text", agent.locale);
  
      agent.add(response);
  
    }
  
    function handlePropertyInformation(agent: WebhookClient) {
  
      const sequelize = new Sequelize(`mysql://${db.user_name}:${db.user_pass}@${db.db_url}/${db.db_name}`);
  
      var query = `SELECT text FROM information WHERE type="INFO" AND object_idobject=
      (SELECT object_idobject FROM object_has_component WHERE object_idobject=(
          SELECT idobject FROM object WHERE name="${agent.parameters.properties}" AND type="PROPERTY"
      ) AND component_idcomponent=(
          SELECT idcomponent FROM component WHERE name="${agent.parameters.components}"
      ))`;
  
      return sequelize.query(query).then(([results, metadata]) => {
  
        var result: any = results[0];
  
        if (result == undefined) {
          agent.add(
            "The property for which you are requesting information does not belong to that component"
          );
        } else {
          agent.add(result.text);
        }
  
        sequelize.close();
  
      });
    }
  
    function handlePropertyChange(agent: WebhookClient) {
  
      const sequelize = new Sequelize(`mysql://${db.user_name}:${db.user_pass}@${db.db_url}/${db.db_name}`);
  
      var query = `SELECT text FROM information WHERE type="INFO" AND object_idobject=
      (SELECT object_idobject FROM object_has_component WHERE object_idobject=(
          SELECT idobject FROM object WHERE name="${agent.parameters.properties}" AND type="PROPERTY"
      ) AND component_idcomponent=(
          SELECT idcomponent FROM component WHERE name="${agent.parameters.components}"
      ))`;
  
  
      return sequelize.query(query).then(([results, metadata]) => {
  
        var result: any = results[0];
  
        if (result == undefined) {
          agent.add(
            "The property for which you are requesting information does not belong to that component"
          );
        } else {
          agent.add(
            `In order to change the property ${agent.parameters.properties} you must first select the component ${agent.parameters.components} from the "Components" column. When you do this, all the properties of the component ${agent.parameters.components}, including the property ${agent.parameters.properties}, will appear in the column "Properties". If you want to know more information about this property just ask me.`
          );
        }
  
        sequelize.close();
  
      });
  
    }
  
    function handleShowProjectGuidedList(agent: any) {
  
  
      const payload = {
        "richContent": [
          createProjectsGuidedCardJSON(translations.projects_guided.appinventor, agent.locale)
        ]
      };
      agent.add(
        new Payload(agent.UNSPECIFIED, payload, {
          rawPayload: true,
          sendAsMessage: true,
        })
      );
  
    }
    function handleGetProjectGuidedResources(agent: any) {
  
  
      let project:string=agent.parameters.project;
      project=project.toLowerCase();
      const payload = {
        "richContent": [
          createProjectGuidedCardStart(project, agent.locale)
        ]
      };
      agent.add(
        new Payload(agent.UNSPECIFIED, payload, {
          rawPayload: true,
          sendAsMessage: true,
        })
      );
  
    }
    function handleChooseLanguageSelector(agent:any){

      const payload = {
        "richContent": [
          createLanguageSelectorCard(agent.locale)
        ]
      };
      agent.add(
        new Payload(agent.UNSPECIFIED, payload, {
          rawPayload: true,
          sendAsMessage: true,
        })
      );

    }
  function handleShowFeaturesList(agent:any){

    const payload = {
      "richContent": [
        createFeaturesListCard(translations.features.feature,agent.locale)
      ]
    };
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );

  }
    let intentMap = new Map();
    intentMap.set("[How] [Webhook] Improve_evaluation_field", handleEvaluationFieldImprove);
    intentMap.set("[Experimental] [Info] [Webhook] Info_component_property", handlePropertyInformation);
    intentMap.set("[Experimental] [How] [Webhook] Change_component_property", handlePropertyChange);
    intentMap.set("[Feature] [Webhook] Show_project_guided_catalog", handleShowProjectGuidedList);
    intentMap.set("[Feature] [Webhook] Load_project_guided", handleGetProjectGuidedResources);
    intentMap.set("[Feature] [Webhook] Choose_language", handleChooseLanguageSelector);
    intentMap.set("[Info] [Webhook] Catalogue_of_features", handleShowFeaturesList);
  
    agent.handleRequest(intentMap);
  });

module.exports=router;
  

