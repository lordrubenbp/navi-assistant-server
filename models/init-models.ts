import type { Sequelize, Model } from "sequelize";
import { action } from "./action";
import type { actionAttributes, actionCreationAttributes } from "./action";
import { element } from "./element";
import type { elementAttributes, elementCreationAttributes } from "./element";
import { element_data } from "./element_data";
import type { element_dataAttributes, element_dataCreationAttributes } from "./element_data";
import { element_has_element_data } from "./element_has_element_data";
import type { element_has_element_dataAttributes, element_has_element_dataCreationAttributes } from "./element_has_element_data";
import { platform } from "./platform";
import type { platformAttributes, platformCreationAttributes } from "./platform";
import { project } from "./project";
import type { projectAttributes, projectCreationAttributes } from "./project";
import { screen } from "./screen";
import type { screenAttributes, screenCreationAttributes } from "./screen";
import { user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  action,
  element,
  element_data,
  element_has_element_data,
  platform,
  project,
  screen,
  user,
};

export type {
  actionAttributes,
  actionCreationAttributes,
  elementAttributes,
  elementCreationAttributes,
  element_dataAttributes,
  element_dataCreationAttributes,
  element_has_element_dataAttributes,
  element_has_element_dataCreationAttributes,
  platformAttributes,
  platformCreationAttributes,
  projectAttributes,
  projectCreationAttributes,
  screenAttributes,
  screenCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  action.initModel(sequelize);
  element.initModel(sequelize);
  element_data.initModel(sequelize);
  element_has_element_data.initModel(sequelize);
  platform.initModel(sequelize);
  project.initModel(sequelize);
  screen.initModel(sequelize);
  user.initModel(sequelize);

  element.belongsToMany(element_data, { as: 'element_data_iddata_element_data', through: element_has_element_data as typeof Model, foreignKey: "element_idelement", otherKey: "element_data_iddata" });
  element.belongsToMany(user, { as: 'user_iduser_users', through: action as typeof Model, foreignKey: "element_idelement", otherKey: "user_iduser" });
  element_data.belongsToMany(element, { as: 'element_idelement_elements', through: element_has_element_data as typeof Model, foreignKey: "element_data_iddata", otherKey: "element_idelement" });
  platform.belongsToMany(user, { as: 'user_iduser_users', through: project as typeof Model, foreignKey: "platform_idplatform", otherKey: "user_iduser" });
  user.belongsToMany(element, { as: 'element_idelement_elements', through: action as typeof Model, foreignKey: "user_iduser", otherKey: "element_idelement" });
  user.belongsToMany(platform, { as: 'platform_idplatform_platforms', through: project as typeof Model, foreignKey: "user_iduser", otherKey: "platform_idplatform" });
  action.belongsTo(element, { as: "element_idelement_element", foreignKey: "element_idelement"});
  element.hasMany(action, { as: "actions", foreignKey: "element_idelement"});
  element_has_element_data.belongsTo(element, { as: "element_idelement_element", foreignKey: "element_idelement"});
  element.hasMany(element_has_element_data, { as: "element_has_element_data", foreignKey: "element_idelement"});
  element_has_element_data.belongsTo(element_data, { as: "element_data_iddata_element_datum", foreignKey: "element_data_iddata"});
  element_data.hasMany(element_has_element_data, { as: "element_has_element_data", foreignKey: "element_data_iddata"});
  project.belongsTo(platform, { as: "platform_idplatform_platform", foreignKey: "platform_idplatform"});
  platform.hasMany(project, { as: "projects", foreignKey: "platform_idplatform"});
  screen.belongsTo(project, { as: "project_idproject_project", foreignKey: "project_idproject"});
  project.hasMany(screen, { as: "screens", foreignKey: "project_idproject"});
  element.belongsTo(screen, { as: "screen_idscreen_screen", foreignKey: "screen_idscreen"});
  screen.hasMany(element, { as: "elements", foreignKey: "screen_idscreen"});
  action.belongsTo(user, { as: "user_iduser_user", foreignKey: "user_iduser"});
  user.hasMany(action, { as: "actions", foreignKey: "user_iduser"});
  project.belongsTo(user, { as: "user_iduser_user", foreignKey: "user_iduser"});
  user.hasMany(project, { as: "projects", foreignKey: "user_iduser"});

  return {
    action: action,
    element: element,
    element_data: element_data,
    element_has_element_data: element_has_element_data,
    platform: platform,
    project: project,
    screen: screen,
    user: user,
  };
}
