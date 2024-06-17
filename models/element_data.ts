import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { element, elementId } from './element';
import type { element_has_element_data, element_has_element_dataId } from './element_has_element_data';

export interface element_dataAttributes {
  iddata: number;
  key: string;
  value: string;
}

export type element_dataPk = "iddata";
export type element_dataId = element_data[element_dataPk];
export type element_dataCreationAttributes = Optional<element_dataAttributes, element_dataPk>;

export class element_data extends Model<element_dataAttributes, element_dataCreationAttributes> implements element_dataAttributes {
  iddata!: number;
  key!: string;
  value!: string;

  // element_data belongsToMany element via element_data_iddata and element_idelement
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
  // element_data hasMany element_has_element_data via element_data_iddata
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

  static initModel(sequelize: Sequelize.Sequelize): typeof element_data {
    element_data.init({
    iddata: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'element_data',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "iddata" },
        ]
      },
    ]
  });
  return element_data;
  }
}
