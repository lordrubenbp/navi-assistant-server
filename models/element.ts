import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { action, actionId } from './action';
import type { element_data, element_dataId } from './element_data';
import type { element_has_element_data, element_has_element_dataId } from './element_has_element_data';
import type { screen, screenId } from './screen';
import type { user, userId } from './user';

export interface elementAttributes {
  idelement: number;
  type: string;
  screen_idscreen: number;
}

export type elementPk = "idelement" | "screen_idscreen";
export type elementId = element[elementPk];
export type elementCreationAttributes = Optional<elementAttributes, elementPk>;

export class element extends Model<elementAttributes, elementCreationAttributes> implements elementAttributes {
  idelement!: number;
  type!: string;
  screen_idscreen!: number;

  // element hasMany action via element_idelement
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
  // element belongsToMany element_data via element_idelement and element_data_iddata
  element_data_iddata_element_data!: element_data[];
  getElement_data_iddata_element_data!: Sequelize.BelongsToManyGetAssociationsMixin<element_data>;
  setElement_data_iddata_element_data!: Sequelize.BelongsToManySetAssociationsMixin<element_data, element_dataId>;
  addElement_data_iddata_element_datum!: Sequelize.BelongsToManyAddAssociationMixin<element_data, element_dataId>;
  addElement_data_iddata_element_data!: Sequelize.BelongsToManyAddAssociationsMixin<element_data, element_dataId>;
  createElement_data_iddata_element_datum!: Sequelize.BelongsToManyCreateAssociationMixin<element_data>;
  removeElement_data_iddata_element_datum!: Sequelize.BelongsToManyRemoveAssociationMixin<element_data, element_dataId>;
  removeElement_data_iddata_element_data!: Sequelize.BelongsToManyRemoveAssociationsMixin<element_data, element_dataId>;
  hasElement_data_iddata_element_datum!: Sequelize.BelongsToManyHasAssociationMixin<element_data, element_dataId>;
  hasElement_data_iddata_element_data!: Sequelize.BelongsToManyHasAssociationsMixin<element_data, element_dataId>;
  countElement_data_iddata_element_data!: Sequelize.BelongsToManyCountAssociationsMixin;
  // element hasMany element_has_element_data via element_idelement
  element_has_element_data!: element_has_element_data[];
  getElement_has_element_data!: Sequelize.HasManyGetAssociationsMixin<element_has_element_data>;
  setElement_has_element_data!: Sequelize.HasManySetAssociationsMixin<element_has_element_data, element_has_element_dataId>;
  addElement_has_element_datum!: Sequelize.HasManyAddAssociationMixin<element_has_element_data, element_has_element_dataId>;
  addElement_has_element_data!: Sequelize.HasManyAddAssociationsMixin<element_has_element_data, element_has_element_dataId>;
  createElement_has_element_datum!: Sequelize.HasManyCreateAssociationMixin<element_has_element_data>;
  removeElement_has_element_datum!: Sequelize.HasManyRemoveAssociationMixin<element_has_element_data, element_has_element_dataId>;
  removeElement_has_element_data!: Sequelize.HasManyRemoveAssociationsMixin<element_has_element_data, element_has_element_dataId>;
  hasElement_has_element_datum!: Sequelize.HasManyHasAssociationMixin<element_has_element_data, element_has_element_dataId>;
  hasElement_has_element_data!: Sequelize.HasManyHasAssociationsMixin<element_has_element_data, element_has_element_dataId>;
  countElement_has_element_data!: Sequelize.HasManyCountAssociationsMixin;
  // element belongsToMany user via element_idelement and user_iduser
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
  // element belongsTo screen via screen_idscreen
  screen_idscreen_screen!: screen;
  getScreen_idscreen_screen!: Sequelize.BelongsToGetAssociationMixin<screen>;
  setScreen_idscreen_screen!: Sequelize.BelongsToSetAssociationMixin<screen, screenId>;
  createScreen_idscreen_screen!: Sequelize.BelongsToCreateAssociationMixin<screen>;

  static initModel(sequelize: Sequelize.Sequelize): typeof element {
    element.init({
    idelement: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    screen_idscreen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'screen',
        key: 'idscreen'
      }
    }
  }, {
    sequelize,
    tableName: 'element',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idelement" },
          { name: "screen_idscreen" },
        ]
      },
      {
        name: "fk_element_screen1_idx",
        using: "BTREE",
        fields: [
          { name: "screen_idscreen" },
        ]
      },
    ]
  });
  return element;
  }
}
