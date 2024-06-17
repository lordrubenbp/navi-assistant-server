import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { platform, platformId } from './platform';
import type { screen, screenId } from './screen';
import type { user, userId } from './user';

export interface projectAttributes {
  idproject: number;
  name: string;
  user_iduser: number;
  platform_idplatform: number;
  description?: string;
  level?: string;
}

export type projectPk = "idproject" | "user_iduser" | "platform_idplatform";
export type projectId = project[projectPk];
export type projectCreationAttributes = Optional<projectAttributes, projectPk>;

export class project extends Model<projectAttributes, projectCreationAttributes> implements projectAttributes {
  idproject!: number;
  name!: string;
  user_iduser!: number;
  platform_idplatform!: number;
  description?: string;
  level?: string;

  // project belongsTo platform via platform_idplatform
  platform_idplatform_platform!: platform;
  getPlatform_idplatform_platform!: Sequelize.BelongsToGetAssociationMixin<platform>;
  setPlatform_idplatform_platform!: Sequelize.BelongsToSetAssociationMixin<platform, platformId>;
  createPlatform_idplatform_platform!: Sequelize.BelongsToCreateAssociationMixin<platform>;
  // project hasMany screen via project_idproject
  screens!: screen[];
  getScreens!: Sequelize.HasManyGetAssociationsMixin<screen>;
  setScreens!: Sequelize.HasManySetAssociationsMixin<screen, screenId>;
  addScreen!: Sequelize.HasManyAddAssociationMixin<screen, screenId>;
  addScreens!: Sequelize.HasManyAddAssociationsMixin<screen, screenId>;
  createScreen!: Sequelize.HasManyCreateAssociationMixin<screen>;
  removeScreen!: Sequelize.HasManyRemoveAssociationMixin<screen, screenId>;
  removeScreens!: Sequelize.HasManyRemoveAssociationsMixin<screen, screenId>;
  hasScreen!: Sequelize.HasManyHasAssociationMixin<screen, screenId>;
  hasScreens!: Sequelize.HasManyHasAssociationsMixin<screen, screenId>;
  countScreens!: Sequelize.HasManyCountAssociationsMixin;
  // project belongsTo user via user_iduser
  user_iduser_user!: user;
  getUser_iduser_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser_iduser_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser_iduser_user!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project {
    project.init({
    idproject: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    user_iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'iduser'
      }
    },
    platform_idplatform: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'platform',
        key: 'idplatform'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    level: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'project',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idproject" },
          { name: "user_iduser" },
          { name: "platform_idplatform" },
        ]
      },
      {
        name: "pk_user_platform_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
          { name: "user_iduser" },
          { name: "platform_idplatform" },
        ]
      },
      {
        name: "fk_project_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_iduser" },
        ]
      },
      {
        name: "fk_project_platform1_idx",
        using: "BTREE",
        fields: [
          { name: "platform_idplatform" },
        ]
      },
    ]
  });
  return project;
  }
}
