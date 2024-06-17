
import { initModels } from "../models/init-models";
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import express from "express";
import { Socket } from "socket.io";
//import path from "path";
import cors from 'cors';
import { Register } from "./register";
import { Sequelize } from "sequelize";
//import { get } from "https";
import { insertToDB, getProjectGuidedScreen, getScreenBlocksAndFormsProject, getGuidedProjectScreenSources } from "./controller";
import { db, port } from "./config";
import { createEvaluationCard, createProjectGuidedCardEnd, createHelperCards } from "./cards_creator";
import { callPython } from "./python";
//import { ConversationProfilesClient } from "@google-cloud/dialogflow";
//import { callToDialogflow } from "./dialogflow";
import { compareProjectsForm } from "./compare_form";
import { compareBlockScreen } from "./compare_block";
//import { WebhookClient, Payload, Platforms } from "dialogflow-fulfillment";

import { translate } from "./locale";
import path from "path";
import fs from "fs";
//import translations from "../locales/en.json";


const sequelize = new Sequelize(`mysql://${db.user_name}:${db.user_pass}@${db.db_url}/${db.db_name}`, { logging: false });

initModels(sequelize);

const app = express();
const dialogflow_webhook = require("./dialogflow_webhook");
app.use("/api/v1", dialogflow_webhook);
app.use("/api/v1/resources", express.static(path.join(__dirname, '../public')));
app.use("/", express.static(path.join(__dirname, '../naviassistant.com')));
app.set("port", process.env.PORT || 3000);
app.use(cors({
  origin: '*'
}));
// app.get("/", function (req, res) {
//   res.send("Hello Navi assistant server");
// });

let http = require("http").createServer(app);
let io = require("socket.io")(http);

io.on("connection", function (socket: Socket) {
  console.log("a user connected");

  let registers: Register[] = [];
  let idProject: number;
  let project: string;
  let idProjectGuided: string;
  let projectGuided: string;
  let projectGuidedFinish: boolean = false;
  let lastProjectGuidedStep: string;
  let screen: any;

  let pg_add_component: boolean = false;
  let pg_delete_component: boolean = false;
  let pg_change_component: boolean = false;
  let pg_add_block: boolean = false;
  let pg_delete_block: boolean = false;
  let pg_add_block_value: boolean = false;
  let pg_delete_block_value: boolean = false;
  let pg_add_block_next: boolean = false;
  let pg_delete_block_next: boolean = false;
  let pg_add_block_statement: boolean = false;
  let pg_delete_block_statement: boolean = false;

  let pg_initStep:Date;

  socket.on('from_extension', async (response: Register) => {

    const register = await plainToClass(Register, response);

    //console.log(JSON.stringify(register));


    function sendTimeStepsMsg(){

      if(pg_initStep!=undefined){

        let secondBetweenSteps= Math.abs((new Date().getTime()-pg_initStep.getTime())/1000);

        let random= Math.floor((Math.random() * 3) + 1)-1
        if(secondBetweenSteps<=15){

          socket.emit('from_server', { type: "tutorial_time", data: translate("projects_guided.motivator_msg.time_btw_steps.short", register._user._lang).split("||")[random]});

        }else if (secondBetweenSteps>15 && secondBetweenSteps<=25){

          socket.emit('from_server', { type: "tutorial_time", data: translate("projects_guided.motivator_msg.time_btw_steps.medium", register._user._lang).split("||")[random]});

        }else{

          socket.emit('from_server', { type: "tutorial_time", data: translate("projects_guided.motivator_msg.time_btw_steps.long", register._user._lang).split("||")[random]});

        }
      }



    }
    function sendHelpCard(typeTip: string, typeFlag: boolean) {

      if (!typeFlag) {

        socket.emit('from_server', { type: "evaluation", data: createHelperCards(typeTip, register._user._lang) });

        typeFlag = true;
      }

      return typeFlag;


    }
    function manageTypeTip(component_tips: string[][], block_tips: string[][]) {

      if (component_tips.length != 0) {

        switch (component_tips[0][1]) {
          case "ADD_COMPONENT":

            pg_add_component=sendHelpCard(component_tips[0][1], pg_add_component);
            // if (!pg_add_component) {

            //   socket.emit('from_server', { type: "evaluation", data: createHelperCards(component_tips[0][1], register._user._lang) });

            //   pg_add_component = true;
            // }

            break;

          case "DELETE_COMPONENT":

            pg_delete_component=sendHelpCard(component_tips[0][1], pg_delete_component);

            // if (!pg_delete_component) {

            //   socket.emit('from_server', { type: "evaluation", data: createHelperCards(component_tips[0][1], register._user._lang) });

            //   pg_delete_component = true;
            // }

            break;

          case "CHANGE_COMPONENT":

            pg_change_component=sendHelpCard(component_tips[0][1], pg_change_component);

            // if (!pg_change_component) {

            //   socket.emit('from_server', { type: "evaluation", data: createHelperCards(component_tips[0][1], register._user._lang) });

            //   pg_change_component = true;
            // }

            break;

          default:
            break;
        }
      } else {

        if (block_tips.length != 0) {

          switch (block_tips[0][1]) {
            case "ADD_BLOCK":

              pg_add_block= sendHelpCard(block_tips[0][1], pg_add_block);

              // if (!pg_add_block) {

              //   socket.emit('from_server', { type: "evaluation", data: createHelperCards(block_tips[0][1], register._user._lang) });
              //   pg_add_block = true;

              // }

              break;
            case "DELETE_BLOCK":

              pg_delete_block= sendHelpCard(block_tips[0][1], pg_delete_block);

              // if (!pg_delete_block) {
              //   socket.emit('from_server', { type: "evaluation", data: createHelperCards(block_tips[0][1], register._user._lang) });
              //   pg_delete_block = true;

              // }
              break;

            case "ADD_BLOCK_NEXT":

              pg_add_block_next=sendHelpCard(block_tips[0][1], pg_add_block_next);

              break;

            case "DELETE_BLOCK_NEXT":

              pg_delete_block_next= sendHelpCard(block_tips[0][1], pg_delete_block_next);

              break;
            case "ADD_BLOCK_VALUE":

              pg_add_block_value=sendHelpCard(block_tips[0][1], pg_add_block_value);
              break;

            case "DELETE_BLOCK_VALUE":

              pg_delete_block_value=sendHelpCard(block_tips[0][1], pg_delete_block_value);
              break;

            case "ADD_BLOCK_STATEMENT":

              pg_add_block_statement=sendHelpCard(block_tips[0][1], pg_add_block_statement);
              break;

            case "DELETE_BLOCK_STATEMENT":

              pg_delete_block_statement=sendHelpCard(block_tips[0][1], pg_delete_block_statement);
              break;

            default:
              break;
          }

        }
      }

    }

    try {

      //Cuando se activa un proyecto guiado
      if (register.project_guided != "none") {


        //Si se cambia de proyecto guiado se recargan las fuentes para comparar
        if (projectGuided != register.project_guided) {

          projectGuided = register.project_guided;

          idProjectGuided = translate("projects_guided.appinventor." + projectGuided.toLowerCase() + ".id", register._user._lang);

          //screen = await getProjectGuidedScreen(idProjectGuided, register.screen);
          screen = getGuidedProjectScreenSources(projectGuided);

          projectGuidedFinish = false;

        }
        //Siempre que obtengamos las fuentes del proyecto guiado...

        if (screen != undefined) {


          const component_tips: string[][] = await compareProjectsForm(JSON.parse(screen.formJson), JSON.parse(register.formJson), register._user._lang);

          const block_tips: string[][] = await compareBlockScreen(screen.blocksXml, register.blocksXml, register._user._lang);
          

          //Si hay pasos pendientes en ambos entornos

          if (component_tips.length != 0 && block_tips.length != 0) {

            projectGuidedFinish = false;

            if (register.workspace == "Designer") {

              if (lastProjectGuidedStep != component_tips[0][0]) {

                sendTimeStepsMsg();

                manageTypeTip(component_tips, block_tips);
                socket.emit('from_server', { type: "tutorial", data: component_tips[0][0] });

                lastProjectGuidedStep = component_tips[0][0];

                pg_initStep= new Date();

              }

            }
            else {

              if (lastProjectGuidedStep != translate("compare_blocks.forms_incomplete", register._user._lang)) {


                socket.emit('from_server', { type: "tutorial", data: translate("compare_blocks.forms_incomplete", register._user._lang) });

                lastProjectGuidedStep = translate("compare_blocks.forms_incomplete", register._user._lang)
              }

            }

          }
          //Si hay pasos pendientes solo en el espacio de bloques

          else if (component_tips.length == 0 && block_tips.length != 0) {

            projectGuidedFinish = false;

            if (register.workspace == "Designer") {

              if (lastProjectGuidedStep != translate("compare_forms.complete", register._user._lang)) {

                socket.emit('from_server', { type: "tutorial", data: translate("compare_forms.complete", register._user._lang) });
                lastProjectGuidedStep = translate("compare_forms.complete", register._user._lang)

              }


            }
            else {

              if (lastProjectGuidedStep != block_tips[0][0]) {

                sendTimeStepsMsg();

                manageTypeTip(component_tips, block_tips);
                socket.emit('from_server', { type: "tutorial", data: block_tips[0][0] });

                lastProjectGuidedStep = block_tips[0][0];
                pg_initStep= new Date();
              }

            }

            //Si hay pasos pendientes solo en el espacio de diseño
          } else if (component_tips.length != 0 && block_tips.length == 0) {

            projectGuidedFinish = false;

            if (register.workspace == "Designer") {

              if (lastProjectGuidedStep != component_tips[0][0]) {

                sendTimeStepsMsg();

                manageTypeTip(component_tips, block_tips);
                socket.emit('from_server', { type: "tutorial", data: component_tips[0][0] });

                lastProjectGuidedStep = component_tips[0][0];

                pg_initStep= new Date();

              }

            }
            else {

              if (lastProjectGuidedStep != translate("compare_blocks.complete", register._user._lang)) {

                socket.emit('from_server', { type: "tutorial", data: translate("compare_blocks.complete", register._user._lang) });
                lastProjectGuidedStep = translate("compare_blocks.complete", register._user._lang)

              }

            }

            //Si no hay pasos pendientes en ningun espacio

          } else {

            if (!projectGuidedFinish) {
              socket.emit('from_server', { type: "tutorial_end", data: createProjectGuidedCardEnd(projectGuided, register._user._lang) });
              projectGuidedFinish = true;
            }


          }

        }


      } else {
        projectGuided = undefined;
        lastProjectGuidedStep = undefined;
        projectGuidedFinish = false;
      }

    } catch (error) {

      console.log(error);

    }

    if (project == undefined) {

      project = register.project;



    } else {


      if (project != register.project) {

        //console.log("PROYECTO CAMBIADO!!!!!");
        socket.emit('from_server', { type: "project_changed", data: "" });

        project = register.project;

      }

    }

    idProject = await insertToDB(register);

    console.log("¿REQUIRE EVALUATION?: " + register.require_evaluation);

    //const[bloques,forms]= await insertToDB(register,socket);

    if (register.require_evaluation == true) {


      const [bloques, forms] = await getScreenBlocksAndFormsProject(idProject);


      callPython(forms, bloques)
        .then(async function (results: string[]) {

          let cuantitaveResponse = JSON.parse(results[0].replace(/'/g, "\""));
          let cualitativeResponse = results[1];

          //console.log(analysis);
          const formatedResponse = await createEvaluationCard(cuantitaveResponse, cualitativeResponse, register._user._lang);

          socket.emit('from_server', { type: "evaluation", data: formatedResponse });

        });
    } else {

    }

  });

});

http.listen(port, function () {
  console.log(`listening on *:${port}`);


});