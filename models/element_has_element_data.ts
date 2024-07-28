import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { element, elementId } from './element';
import type { element_data, element_dataId } from './element_data';

export interface element_has_element_dataAttributes {
  element_idelement: number;
  element_data_iddata: number;
}

export type element_has_element_dataPk = "element_idelement" | "element_data_iddata";
export type element_has_element_dataId = element_has_element_data[element_has_element_dataPk];
export type element_has_element_dataCreationAttributes = Optional<element_has_element_dataAttributes, element_has_element_dataPk>;

export class element_has_element_data extends Model<element_has_element_dataAttributes, element_has_element_dataCreationAttributes> implements element_has_element_dataAttributes {
  element_idelement!: number;
  element_data_iddata!: number;

  // element_has_element_data belongsTo element via element_idelement
  element_idelement_element!: element;
  getElement_idelement_element!: Sequelize.BelongsToGetAssociationMixin<element>;
  setElement_idelement_element!: Sequelize.BelongsToSetAssociationMixin<element, elementId>;
  createElement_idelement_element!: Sequelize.BelongsToCreateAssociationMixin<element>;
  // element_has_element_data belongsTo element_data via element_data_iddata
  element_data_iddata_element_datum!: element_data;
  getElement_data_iddata_element_datum!: Sequelize.BelongsToGetAssociationMixin<element_data>;
  setElement_data_iddata_element_datum!: Sequelize.BelongsToSetAssociationMixin<element_data, element_dataId>;
  createElement_data_iddata_element_datum!: Sequelize.BelongsToCreateAssociationMixin<element_data>;

  static initModel(sequelize: Sequelize.Sequelize): typeof element_has_element_data {
    element_has_element_data.init({
    element_idelement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'element',
        key: 'idelement'
      }
    },
    element_data_iddata: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'element_data',
        key: 'iddata'
      }
    }
  }, {
    sequelize,
    tableName: 'element_has_element_data',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "element_idelement" },
          { name: "element_data_iddata" },
        ]
      },
      {
        name: "fk_element_has_element_data_element_data1_idx",
        using: "BTREE",
        fields: [
          { name: "element_data_iddata" },
        ]
      },
      {
        name: "fk_element_has_element_data_element1_idx",
        using: "BTREE",
        fields: [
          { name: "element_idelement" },
        ]
      },
    ]
  });
  return element_has_element_data;
  }
}
