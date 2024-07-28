import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { element, elementId } from './element';
import type { user, userId } from './user';

export interface actionAttributes {
  idaction: number;
  name: string;
  user_iduser: number;
  element_idelement: number;
  time: Date;
  workspace: string;
}

export type actionPk = "idaction" | "user_iduser" | "element_idelement";
export type actionId = action[actionPk];
export type actionCreationAttributes = Optional<actionAttributes, actionPk>;

export class action extends Model<actionAttributes, actionCreationAttributes> implements actionAttributes {
  idaction!: number;
  name!: string;
  user_iduser!: number;
  element_idelement!: number;
  time!: Date;
  workspace!: string;

  // action belongsTo element via element_idelement
  element_idelement_element!: element;
  getElement_idelement_element!: Sequelize.BelongsToGetAssociationMixin<element>;
  setElement_idelement_element!: Sequelize.BelongsToSetAssociationMixin<element, elementId>;
  createElement_idelement_element!: Sequelize.BelongsToCreateAssociationMixin<element>;
  // action belongsTo user via user_iduser
  user_iduser_user!: user;
  getUser_iduser_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser_iduser_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser_iduser_user!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof action {
    action.init({
    idaction: {
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
    element_idelement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'element',
        key: 'idelement'
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    workspace: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'action',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idaction" },
          { name: "user_iduser" },
          { name: "element_idelement" },
        ]
      },
      {
        name: "fk_action_user_idx",
        using: "BTREE",
        fields: [
          { name: "user_iduser" },
        ]
      },
      {
        name: "fk_action_element1_idx",
        using: "BTREE",
        fields: [
          { name: "element_idelement" },
        ]
      },
    ]
  });
  return action;
  }
}
