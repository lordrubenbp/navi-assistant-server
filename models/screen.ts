import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { element, elementId } from './element';
import type { project, projectId } from './project';

export interface screenAttributes {
  idscreen: number;
  name: string;
  project_idproject: number;
  formJson: string;
  blocksXml: string;
}

export type screenPk = "idscreen" | "name" | "project_idproject";
export type screenId = screen[screenPk];
export type screenCreationAttributes = Optional<screenAttributes, screenPk>;

export class screen extends Model<screenAttributes, screenCreationAttributes> implements screenAttributes {
  idscreen!: number;
  name!: string;
  project_idproject!: number;
  formJson!: string;
  blocksXml!: string;

  // screen belongsTo project via project_idproject
  project_idproject_project!: project;
  getProject_idproject_project!: Sequelize.BelongsToGetAssociationMixin<project>;
  setProject_idproject_project!: Sequelize.BelongsToSetAssociationMixin<project, projectId>;
  createProject_idproject_project!: Sequelize.BelongsToCreateAssociationMixin<project>;
  // screen hasMany element via screen_idscreen
  elements!: element[];
  getElements!: Sequelize.HasManyGetAssociationsMixin<element>;
  setElements!: Sequelize.HasManySetAssociationsMixin<element, elementId>;
  addElement!: Sequelize.HasManyAddAssociationMixin<element, elementId>;
  addElements!: Sequelize.HasManyAddAssociationsMixin<element, elementId>;
  createElement!: Sequelize.HasManyCreateAssociationMixin<element>;
  removeElement!: Sequelize.HasManyRemoveAssociationMixin<element, elementId>;
  removeElements!: Sequelize.HasManyRemoveAssociationsMixin<element, elementId>;
  hasElement!: Sequelize.HasManyHasAssociationMixin<element, elementId>;
  hasElements!: Sequelize.HasManyHasAssociationsMixin<element, elementId>;
  countElements!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof screen {
    screen.init({
    idscreen: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    project_idproject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'project',
        key: 'idproject'
      }
    },
    formJson: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    blocksXml: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'screen',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idscreen" },
          { name: "name" },
          { name: "project_idproject" },
        ]
      },
      {
        name: "pk_name_project_user",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
          { name: "project_idproject" },
        ]
      },
      {
        name: "fk_screen_project1_idx",
        using: "BTREE",
        fields: [
          { name: "project_idproject" },
        ]
      },
    ]
  });
  return screen;
  }
}
