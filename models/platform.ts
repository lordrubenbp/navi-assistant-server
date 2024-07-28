import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { project, projectId } from './project';
import type { user, userId } from './user';

export interface platformAttributes {
  idplatform: number;
  url: string;
}

export type platformPk = "idplatform";
export type platformId = platform[platformPk];
export type platformCreationAttributes = Optional<platformAttributes, platformPk>;

export class platform extends Model<platformAttributes, platformCreationAttributes> implements platformAttributes {
  idplatform!: number;
  url!: string;

  // platform hasMany project via platform_idplatform
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
  // platform belongsToMany user via platform_idplatform and user_iduser
  user_iduser_users!: user[];
  getUser_iduser_users!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUser_iduser_users!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUser_iduser_user!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUser_iduser_users!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUser_iduser_user!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUser_iduser_user!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUser_iduser_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUser_iduser_user!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUser_iduser_users!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUser_iduser_users!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof platform {
    platform.init({
    idplatform: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "url_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'platform',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idplatform" },
        ]
      },
      {
        name: "url_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "url" },
        ]
      },
    ]
  });
  return platform;
  }
}
