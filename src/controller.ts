import { platform, project, user, screen, element, element_data, element_has_element_data, action } from "../models/init-models";
import { Register } from "./register";
import path from "path";
import fs from "fs";
import { translate } from "./locale";
//const created_msg = "[INFO] New row inserted into DB"

async function findOrCreateUser(user_mail: string, user_age: string, user_gender: string, user_education: string, user_experience: string) {

  const [new_user, created] = await user.findOrCreate({
    where: { mail: user_mail },
    defaults: {
      mail: user_mail,
      age: user_age,
      gender: user_gender,
      education: user_education,
      experience: user_experience

    }

  });

  if (created) {
    //console.log(created_msg);
  }
  return new_user.iduser;

}
async function findOrCreatePlatform(platform_url: string) {

  const [new_platform, created] = await platform.findOrCreate({
    where: { url: platform_url },
    defaults: {
      url: platform_url
    }

  });

  if (created) {
    //console.log(created_msg);
  }
  return new_platform.idplatform;

}
async function findOrCreateProject(idUser: number, idPlatform: number, name: string) {

  const [new_project, created] = await project.findOrCreate({
    where:
    {
      name: name,
      user_iduser: idUser,
      platform_idplatform: idPlatform
    },
    defaults: {
      name: name,
      user_iduser: idUser,
      platform_idplatform: idPlatform
    }

  });

  if (created) {
    //console.log(created_msg);
  }
  return new_project.idproject;

}

async function updateOrCreateScreen(idProject: number, screen_name: string, formJson: string, blocksXml: string) {
  let new_screen: screen;
  const foundScreen = await screen.findOne(
    {
      where:
      {
        name: screen_name,
        project_idproject: idProject,
      }
    });

  if (!foundScreen) {
    // Item not found, create a new one
    new_screen = await screen.create({
      name: screen_name,
      project_idproject: idProject,
      formJson: formJson,
      blocksXml: blocksXml
    });

  } else {

    // Found an item, update it
    await screen.update({
      formJson: formJson,
      blocksXml: blocksXml
    }, {
      where: {
        name: screen_name,
        project_idproject: idProject,
      }
    });
    new_screen = foundScreen;
  }
  return new_screen.idscreen;
}

async function createElement(idScreen: number, type: string) {



  const new_element = await element.create(
    {
      screen_idscreen: idScreen,
      type: type,

    }

  );

  if (new_element) {
    //console.log(created_msg);
  }
  return new_element.idelement;
}

async function findOrCreateElementData(key: string, value: string) {

  try {

    const [new_element_data, created] = await element_data.findOrCreate({
      where:
      {
        key: key,
        value: value

      },
      defaults: {
        key: key,
        value: value

      }

    });

    if (created) {
      //console.log(new_element_data);
    }else{
      //console.log()
    }
    return new_element_data.iddata;

  } catch (error) {

    console.error(error);

  }

}

async function findOrCreateElementHasElementData(idElement: number, idData: number) {

  try {

    const [new_element_has_data, created] = await element_has_element_data.findOrCreate({
      where:
      {
        element_data_iddata: idData,
        element_idelement: idElement

      },
      defaults: {
        element_data_iddata: idData,
        element_idelement: idElement

      }

    });

    if (created) {
      //console.log(created_msg);
    }


  } catch (error) {

    console.error(error);

  }




}

async function createAction(idUser: number, idElement: number, name: string, time: Date, workspace: string) {

  const new_action = await action.create({
    
      name: name,
      user_iduser: idUser,
      element_idelement: idElement,
      time: time,
      workspace: workspace

  });

  if (new_action) {
    //console.log(created_msg);
  }
}

function getScreenBlocksAndForms(screens: screen[]) {

  let screens_blocks: string[] = [];
  let screens_forms: string[] = [];
  screens.forEach((screen: screen) => {

    screens_blocks.push(screen.blocksXml + "_/_");
    screens_forms.push(screen.formJson);

  });

  return [screens_blocks, screens_forms];
}

async function findAllProjectScreen(idProject: number) {

  const screens = await screen.findAll({
    where:
    {
      project_idproject: idProject
    }
  });

  return screens;

}

export async function insertToDB(register: Register) {

  //console.log(register.element);
  //console.log(register.element.data);

  let idUser = await findOrCreateUser(register.user.mail, register.user.age, register.user.gender, register.user.education, register.user.experience);
  let idPlatform = await findOrCreatePlatform(register.url);
  let idProject = await findOrCreateProject(idUser, idPlatform, register.project);
  let idScreen = await updateOrCreateScreen(idProject, register.screen, register.formJson, register.blocksXml);
  let idElement = await createElement(idScreen, register.element.type);
  await register.element.data.forEach(async element_data => {

    let idData = await findOrCreateElementData(element_data.key, element_data.value);
    await findOrCreateElementHasElementData(idElement, idData);

  });

  await createAction(idUser, idElement, register.action, new Date(register.timeStamp), register.workspace);



  //let screens: screen[];
  //screens = await findAllProjectScreen(idProject);

  //return getScreenBlocksAndForms(screens);

  return idProject;

}

export async function getScreenBlocksAndFormsProject(idProject:number){

  let screens: screen[];

  screens = await findAllProjectScreen(idProject);
  
  return getScreenBlocksAndForms(screens)

}
//Experimental

export function getGuidedProjectScreenSources(project:string){

  project=project.toLowerCase();
  let form:string;
  let blocks:string;

  let text:string=fs.readFileSync(path.join(__dirname, translate(`projects_guided.appinventor.${project}.path`,"en")+"/Screen1.scm"), { encoding: "utf8" });
  let lines= text.split('\n');

  form=lines[2];

  blocks=fs.readFileSync(path.join(__dirname, translate(`projects_guided.appinventor.${project}.path`,"en")+"/Screen1.bky"), { encoding: "utf8" });

  if(blocks.length==0){

    blocks=`<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`;
  }

  return {
    formJson:form,
    blocksXml:blocks
  };
  
}
export async function getProjectGuidedScreen(idProjectGuided:string, screenName:string){

    const foundScreen= await screen.findOne(
      {
        where:
        {
          name: screenName,
          project_idproject:parseInt(idProjectGuided)
        }
      });

    //console.log(foundScreen);
      return foundScreen;
}
