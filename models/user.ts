import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { action, actionId } from './action';
import type { element, elementId } from './element';
import type { platform, platformId } from './platform';
import type { project, projectId } from './project';

export interface userAttributes {
  iduser: number;
  mail: string;
  age: string;
  gender: string;
  education: string;
  experience: string;
}

export type userPk = "iduser";
export type userId = user[userPk];
export type userCreationAttributes = Optional<userAttributes, userPk>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  iduser!: number;
  mail!: string;
  age!: string;
  gender!: string;
  education!: string;
  experience!: string;

  // user hasMany action via user_iduser
  actions!: action[];
  getActions!: Sequelize.HasManyGetAssociationsMixin<action>;
  setActions!: Sequelize.HasManySetAssociationsMixin<action, actionId>;
  addAction!: Sequelize.HasManyAddAssociationMixin<action, actionId>;
  addActions!: Sequelize.HasManyAddAssociationsMixin<action, actionId>;
  createAction!: Sequelize.HasManyCreateAssociationMixin<action>;
  removeAction!: Sequelize.HasManyRemoveAssociationMixin<action, actionId>;
  removeActions!: Sequelize.HasManyRemoveAssociationsMixin<action, actionId>;
  hasAction!: Sequelize.HasManyHasAssociationMixin<action, actionId>;
  hasActions!: Sequelize.HasManyHasAssociationsMixin<action, actionId>;
  countActions!: Sequelize.HasManyCountAssociationsMixin;
  // user belongsToMany element via user_iduser and element_idelement
  element_idelement_elements!: element[];
  getElement_idelement_elements!: Sequelize.BelongsToManyGetAssociationsMixin<element>;
  setElement_idelement_elements!: Sequelize.BelongsToManySetAssociationsMixin<element, elementId>;
  addElement_idelement_element!: Sequelize.BelongsToManyAddAssociationMixin<element, elementId>;
  addElement_idelement_elements!: Sequelize.BelongsToManyAddAssociationsMixin<element, elementId>;
  createElement_idelement_element!: Sequelize.BelongsToManyCreateAssociationMixin<element>;
  removeElement_idelement_element!: Sequelize.BelongsToManyRemoveAssociationMixin<element, elementId>;
  removeElement_idelement_elements!: Sequelize.BelongsToManyRemoveAssociationsMixin<element, elementId>;
  hasElement_idelement_element!: Sequelize.BelongsToManyHasAssociationMixin<element, elementId>;
  hasElement_idelement_elements!: Sequelize.BelongsToManyHasAssociationsMixin<element, elementId>;
  countElement_idelement_elements!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user belongsToMany platform via user_iduser and platform_idplatform
  platform_idplatform_platforms!: platform[];
  getPlatform_idplatform_platforms!: Sequelize.BelongsToManyGetAssociationsMixin<platform>;
  setPlatform_idplatform_platforms!: Sequelize.BelongsToManySetAssociationsMixin<platform, platformId>;
  addPlatform_idplatform_platform!: Sequelize.BelongsToManyAddAssociationMixin<platform, platformId>;
  addPlatform_idplatform_platforms!: Sequelize.BelongsToManyAddAssociationsMixin<platform, platformId>;
  createPlatform_idplatform_platform!: Sequelize.BelongsToManyCreateAssociationMixin<platform>;
  removePlatform_idplatform_platform!: Sequelize.BelongsToManyRemoveAssociationMixin<platform, platformId>;
  removePlatform_idplatform_platforms!: Sequelize.BelongsToManyRemoveAssociationsMixin<platform, platformId>;
  hasPlatform_idplatform_platform!: Sequelize.BelongsToManyHasAssociationMixin<platform, platformId>;
  hasPlatform_idplatform_platforms!: Sequelize.BelongsToManyHasAssociationsMixin<platform, platformId>;
  countPlatform_idplatform_platforms!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany project via user_iduser
  projects!: project[];
  getProjects!: Sequelize.HasManyGetAssociationsMixin<project>;
  setProjects!: Sequelize.HasManySetAssociationsMixin<project, projectId>;
  addProject!: Sequelize.HasManyAddAssociationMixin<project, projectId>;
  addProjects!: Sequelize.HasManyAddAssociationsMixin<project, projectId>;
  createProject!: Sequelize.HasManyCreateAssociationMixin<project>;
  removeProject!: Sequelize.HasManyRemoveAssociationMixin<project, projectId>;
  removeProjects!: Sequelize.HasManyRemoveAssociationsMixin<project, projectId>;
  hasProject!: Sequelize.HasManyHasAssociationMixin<project, projectId>;
  hasProjects!: Sequelize.HasManyHasAssociationsMixin<project, projectId>;
  countProjects!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    user.init({
    iduser: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mail: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "mail_UNIQUE"
    },
    age: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    education: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    experience: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "iduser" },
        ]
      },
      {
        name: "mail_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mail" },
        ]
      },
    ]
  });
  return user;
  }
}
