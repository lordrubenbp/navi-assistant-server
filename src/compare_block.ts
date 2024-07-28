
import xml2_js from "xml2js";
const replaceAll = require('string.prototype.replaceall');
import { translate, atranslate } from "./locale";



enum TipBlock {
    ADD,
    DELETE,
    ADD_STATEMENT,
    DELETE_STATEMENT,
    ADD_VALUE,
    DELETE_VALUE,
    ADD_NEXT,
    DELETE_NEXT
}
enum TransBlock {
    COMPONENT,
    EVENT,
    METHOD,
    PROPERTY
}


export async function compareBlockScreen(tblockXML: any, ublockXML: any, user_language?: string) {

    let block_tips: string[][] = [];

    let default_language: string = "en";


    if (user_language == undefined) {

        user_language = default_language;
    }

    const tblocks = await xml2_js.parseStringPromise(tblockXML).then(async function (tresult: any) {

        return tresult.xml.block;;

    });

    const ublocks = await xml2_js.parseStringPromise(ublockXML).then(function (uresult: any) {

        return uresult.xml.block;


    });

    function translateBlockElement(element: string, typeBlock: TransBlock) {

        switch (typeBlock) {
            case TransBlock.COMPONENT:

                if (!isNaN(Number(element.substr(element.length - 1)))) {

                    let trans_component = translate("components." + element.slice(0, element.length - 1).toLowerCase(), user_language);

                    if (trans_component != undefined) {

                        element = trans_component + element.substr(element.length - 1);
                    }
                }

                break;

            case TransBlock.EVENT:

                let trans_event: any = translate("events." + element.toLowerCase(), user_language);

                if (trans_event != undefined) {

                    element = trans_event;
                }

                break;
            case TransBlock.METHOD:

                let trans_method: any = translate("methods." + element.toLowerCase(), user_language);

                if (trans_method != undefined) {

                    element = trans_method;
                }

                break;
            case TransBlock.PROPERTY:

                let trans_property: any = translate("properties." + element.toLowerCase(), user_language);

                if (trans_property != undefined) {

                    element = trans_property;
                }

                break;
            default:
                break;
        }

        return element;





    }
    // La traduccion de todos los bloques es humanamente imposible, se ha optado por solo traducir las ordenes pero dejar el nombre de los bloques en ingles
    function addTip(blockName: any, tip_type: TipBlock, container?: any, specific?: any, value?: any) {


        switch (tip_type) {
            case TipBlock.ADD:

                if (container != undefined) {

                    if (specific != undefined) {

                        //block_tips.push(`Dentro del ${specific} del bloque ${container} deberias añadir un bloque ${blockName}`);

                        //block_tips.push(`Inside the ${specific} of the ${container} block you should add a ${blockName} block`);

                        block_tips.push([translate("compare_blocks.add.container_specific", user_language, { specific: specific, container: container, blockName: blockName }), "ADD_BLOCK"]);

                    } else {

                        //block_tips.push(`Dentro del bloque ${container} deberias añadir un bloque ${blockName}`);

                        //block_tips.push(`Inside the ${container} block you should add a ${blockName} block`);

                        block_tips.push([translate("compare_blocks.add.container", user_language, { container: container, blockName: blockName }), "ADD_BLOCK"]);

                    }

                }
                else {

                    //block_tips.push(`En la pantalla principal deberias añadir un bloque ${blockName}`);
                    //block_tips.push(`On the screen you should add a ${blockName} block`);

                    block_tips.push([translate("compare_blocks.add.single", user_language, { blockName: blockName }), "ADD_BLOCK"]);


                }


                break;

            case TipBlock.DELETE:

                if (container != undefined) {

                    //block_tips.push(`Dentro del bloque ${container} deberias eliminar el bloque ${blockName}`);
                    //block_tips.push(`Inside the ${container} block you should remove the ${blockName} block`);

                    block_tips.push([translate("compare_blocks.delete.container", user_language, { blockName: blockName, container: container }), "DELETE_BLOCK"]);



                }
                else {

                    //block_tips.push(`En la pantalla principal deberias eliminar el bloque ${blockName}`);
                    //block_tips.push(`On the screen you should remove the ${blockName} block`);

                    block_tips.push([translate("compare_blocks.delete.single", user_language, { blockName: blockName }), "DELETE_BLOCK"]);

                }

                break;
            case TipBlock.ADD_NEXT:

                //block_tips.push(`Debajo del bloque ${container} deberias añadir un bloque ${blockName}`);

                //block_tips.push(`Next to the ${container} block you should add a ${blockName} block`);

                block_tips.push([translate("compare_blocks.add.add_next", user_language, { container: container, blockName: blockName }), "ADD_BLOCK_NEXT"]);



                break;
            case TipBlock.DELETE_NEXT:

                //block_tips.push(`Debajo del bloque ${container} deberias eliminar el bloque ${blockName}`);
                //block_tips.push(`Next to the ${container} block you should remove the ${blockName} block`);

                block_tips.push([translate("compare_blocks.delete.delete_next", user_language, { blockName: blockName, container: container }), "DELETE_BLOCK_NEXT"]);

                break;

            case TipBlock.ADD_VALUE:

                if (value != undefined) {

                    if (specific != undefined) {

                        //block_tips.push(`En el bloque ${container} deberias añadir como valor del ${specific} un bloque ${blockName} con el valor ${value}`);
                        //block_tips.push(`In the ${container} block you should add a ${blockName} block with the value ${value} as the value of the ${specific}`);

                        block_tips.push([translate("compare_blocks.add.add_value.value_specific", user_language, { specific: specific, container: container, blockName: blockName, value: value }), "ADD_BLOCK_VALUE"]);

                    } else {

                        //block_tips.push(`Deberias añadir como valor del bloque ${container} un bloque ${blockName} con el valor ${value}`);
                        //block_tips.push(`You should add as a value of the ${container} block a ${blockName} block with the value ${value}`);

                        block_tips.push([translate("compare_blocks.add.add_value.value", user_language, { container: container, blockName: blockName, value: value }), "ADD_BLOCK_VALUE"]);
                    }


                } else {

                    if (specific != undefined) {

                        //block_tips.push(`En el bloque ${container} deberias añadir como valor del ${specific} un bloque ${blockName}`);
                        //block_tips.push(`In the ${container} block you should add a ${blockName} block as the value of the ${specific}`);

                        block_tips.push([translate("compare_blocks.add.add_value.specific", user_language, { container: container, blockName: blockName, specific: specific }), "ADD_BLOCK_VALUE"]);

                    }
                    else {

                        //block_tips.push(`Deberias añadir como valor del bloque ${container} un bloque ${blockName}`);
                        //block_tips.push(`You should add a ${blockName} block as the value of the ${container} block`);
                        block_tips.push([translate("compare_blocks.add.add_value.single", user_language, { container: container, blockName: blockName }), "ADD_BLOCK_VALUE"]);
                    }

                }


                break;

            case TipBlock.DELETE_VALUE:
                if (value != undefined) {

                    if (specific != undefined) {

                        //block_tips.push(`En el bloque ${container} deberias eliminar como valor del ${specific} el bloque ${blockName} con el valor ${value}`);
                        //block_tips.push(`In the ${container} block you should remove the ${blockName} block with the value ${value} as the value of the ${specific}`);

                        block_tips.push([translate("compare_blocks.delete.delete_value.value_specific", user_language, { blockName: blockName, container: container, value: value, specific: specific }), "DELETE_BLOCK_VALUE"]);

                    } else {

                        //block_tips.push(`Deberias eliminar como valor del bloque ${container} el bloque ${blockName} con el valor ${value}`);
                        //block_tips.push(`You should remove as value of the ${container} block the ${blockName} block with the value ${value}`);
                        block_tips.push([translate("compare_blocks.delete.delete_value.value", user_language, { blockName: blockName, container: container, value: value }), "DELETE_BLOCK_VALUE"]);
                    }


                } else {

                    if (specific != undefined) {

                        //block_tips.push(`En el bloque ${container} deberias eliminar como valor del ${specific} el bloque ${blockName}`);
                        //block_tips.push(`In the ${container} block you should remove the ${blockName} block as the value of the ${specific} block`);

                        block_tips.push([translate("compare_blocks.delete.delete_value.specific", user_language, { blockName: blockName, container: container, specific: specific }), "DELETE_BLOCK_VALUE"]);

                    }
                    else {

                        //block_tips.push(`Deberias eliminar como valor del bloque ${container} el bloque ${blockName}`);
                        //block_tips.push(`You should remove the ${blockName} block as the value of the ${container} block`);
                        block_tips.push([translate("compare_blocks.delete.delete_value.single", user_language, { blockName: blockName, container: container }), "DELETE_BLOCK_VALUE"]);

                    }

                }
                break;

            case TipBlock.ADD_STATEMENT:

                if (specific != undefined) {

                    //block_tips.push(`Dentro del ${specific} del bloque ${container} deberias añadir un bloque ${blockName}`);
                    //block_tips.push(`Inside the ${specific} of the ${container} block you should add a ${blockName} block`);
                    block_tips.push([translate("compare_blocks.add.add_statement.specific", user_language, { container: container, blockName: blockName, specific: specific }), "ADD_BLOCK_STATEMENT"]);

                } else {

                    //block_tips.push(`Dentro del bloque ${container} deberias añadir un bloque ${blockName}`);
                    //block_tips.push(`Inside the ${container} block you should add a ${blockName} block`);
                    block_tips.push([translate("compare_blocks.add.add_statement.single", user_language, { container: container, blockName: blockName }), "ADD_BLOCK_STATEMENT"]);

                }

                break;

            case TipBlock.DELETE_STATEMENT:

                if (specific != undefined) {

                    //block_tips.push(`Dentro del ${specific} del bloque ${container} deberias eliminar el bloque ${blockName}`);
                    //block_tips.push(`Inside the ${specific} of the ${container} block you should remove the ${blockName} block`);

                    block_tips.push([translate("compare_blocks.delete.delete_statement.specific", user_language, { blockName: blockName, container: container, specific: specific }), "DELETE_BLOCK_STATEMENT"]);


                } else {

                    //block_tips.push(`Dentro del bloque ${container} deberias eliminar el bloque ${blockName}`);
                    //block_tips.push(`Inside the ${container} block you should remove the ${blockName} block`);
                    block_tips.push([translate("compare_blocks.delete.delete_statement.single", user_language, { blockName: blockName, container: container }), "DELETE_BLOCK_STATEMENT"]);

                }

                break;
            default:
                break;
        }


    }
    function createTip(block: any, tip_type: TipBlock, container?: string, specific?: any) {


        let blockName: string;
        let component_instance: string;
        let event_name: string;
        let method_name: string;
        let property_name: string;

        //TODO Mapear todos los bloques que existen en AI2 con el fin de personalizar los mensajes

        switch (block["$"].type) {
            case "component_event":

                //blockName = `"when ${block.mutation[0]["$"].instance_name} ${block.mutation[0]["$"].event_name}"`;


                component_instance = translateBlockElement(block.mutation[0]["$"].instance_name, TransBlock.COMPONENT);
                event_name = translateBlockElement(block.mutation[0]["$"].event_name, TransBlock.EVENT);

                blockName = translate("compare_blocks.block_types.component_event", user_language, { component_instance: component_instance, event_name: event_name });

                addTip(blockName, tip_type);

                break;

            case "component_method":

                //blockName = `"call ${block.mutation[0]["$"].instance_name} ${block.mutation[0]["$"].method_name}"`;

                component_instance = translateBlockElement(block.mutation[0]["$"].instance_name, TransBlock.COMPONENT);
                method_name = translateBlockElement(block.mutation[0]["$"].method_name, TransBlock.METHOD);

                blockName = translate("compare_blocks.block_types.component_method", user_language, { component_instance: component_instance, method_name: method_name });

                addTip(blockName, tip_type, container, specific);

                break;

            case "component_set_get":

                //los get no necesitan traduccion

                //blockName = `"${block.mutation[0]["$"].set_or_get} ${block.mutation[0]["$"].instance_name} ${block.mutation[0]["$"].property_name}"`;


                component_instance = translateBlockElement(block.mutation[0]["$"].instance_name, TransBlock.COMPONENT);
                property_name = translateBlockElement(block.mutation[0]["$"].property_name, TransBlock.PROPERTY);

                if (block.mutation[0]["$"].set_or_get == "set") {

                    blockName = translate("compare_blocks.block_types.component_set", user_language, { component_instance: component_instance, property_name: property_name });

                } else {

                    blockName = component_instance + " " + property_name;
                }


                addTip(blockName, tip_type, container, specific);

                break;

            case "controls_if":

                //blockName = `"if then"`;

                blockName = translate("compare_blocks.block_types.controls_if", user_language);

                addTip(blockName, tip_type, container, specific);

                break;

            case "global_declaration":

                //blockName = `"initialize global ${block.field[0]._}"`;

                blockName = translate("compare_blocks.block_types.global_declaration", user_language, { global_name: block.field[0]._ });

                addTip(blockName, tip_type);

                break;

            case "local_declaration_statement":

                //blockName = `"initialize local ${block.field[0]._} to"`;

                blockName = translate("compare_blocks.block_types.local_declaration_statement", user_language, { global_name: block.field[0]._ });

                addTip(blockName, tip_type, container, specific);

                break;

            case "procedures_defnoreturn":


                //blockName = `"to ${block.field[0]._} do"`;

                blockName = translate("compare_blocks.block_types.procedures_defnoreturn", user_language, { procedure_name: block.field[0]._ });

                addTip(blockName, tip_type);

                break;

            case "procedures_callnoreturn":

                //blockName = `"call ${block.field[0]._}"`;

                blockName = translate("compare_blocks.block_types.procedures_callnoreturn", user_language, { procedure_name: block.field[0]._ });

                addTip(blockName, tip_type, container, specific);

                break;

            case "procedures_defreturn":

                //blockName = `"to ${block.field[0]._} result"`;

                blockName = translate("compare_blocks.block_types.procedures_defreturn", user_language, { procedure_name: block.field[0]._ });

                addTip(blockName, tip_type);

                break;

            case "procedures_callreturn":

                //Al ser un get no tiene traduccion

                blockName = `"${block.field[0]._}"`;

                addTip(blockName, tip_type, container, specific);

                break;

                break;

            case "text_compare":

                //blockName = `"${getCompareOperationText(block.field[0]._.toString().toLowerCase())} compare texts"`;

                blockName = translate("compare_blocks.block_types.text_compare", user_language, { operation: getCompareOperationText(block.field[0]._.toString().toLowerCase()) });

                addTip(blockName, tip_type, container, specific);


                break;

            case "math_compare":

                //blockName = `"${getCompareOperationText(block.field[0]._.toString().toLowerCase())} compare numbers"`;

                blockName = translate("compare_blocks.block_types.math_compare", user_language, { operation: getCompareOperationText(block.field[0]._.toString().toLowerCase()) });


                addTip(blockName, tip_type, container, specific);


                break;

            case "logic_compare":



                blockName = translate("compare_blocks.block_types.logic_compare", user_language, { operation: getCompareOperationText(block.field[0]._.toString().toLowerCase()) });


                addTip(blockName, tip_type, container, specific);


                break;

            case "math_number":

                //blockName = `"${getCompareOperationText(block.field[0]._.toString().toLowerCase())} compare logics"`;

                blockName = translate("compare_blocks.block_types.math_number", user_language);


                addTip(blockName, tip_type, container, specific, `${block.field[0]._}`);


                break;

            case "text":

                //blockName = `"${getCompareOperationText(block.field[0]._.toString().toLowerCase())} compare logics"`;

                blockName = translate("compare_blocks.block_types.text", user_language);


                addTip(blockName, tip_type, container, specific, `${block.field[0]._}`);


                break;

            case "lexical_variable_get":

                //blockName = `"${getCompareOperationText(block.field[0]._.toString().toLowerCase())} compare logics"`;

                blockName = translate("compare_blocks.block_types.lexical_variable_get", user_language,{ variable_name: `${block.field[0]._}` });


                addTip(blockName, tip_type, container, specific);


                break;

            default:

                blockName = `${block['$'].type.toString().replace("_", " ")}`;

                blockName = replaceAll(blockName, "_", " ");

                container = replaceAll(container, "_", " ");


                try {

                    addTip(blockName, tip_type, container, specific, `${block.field[0]._}`);

                } catch (error) {

                    console.log("no se puede procesar este bloque");

                    addTip(blockName, tip_type, container, specific);

                }


                break;
        }


    }
    function getValueName(value: any) {


        let number_string: string = value.toString().substr(value.toString().length - 1);

        if (value.toString().includes("IF")) {

            if (value.toString().includes("0")) {
                //return symbol.toString().replace("IF0", "first if ");
                return translate("compare_blocks.misc.if", user_language);
            } else {

                //return symbol.toString().replace("IF", "else if number ");
                return getOrdinalNumber(number_string) + " " + translate("compare_blocks.misc.else_if", user_language);

            }


        }
        else if (value.toString().includes("ARG")) {


            let parse_number = parseInt(number_string) + 1;

            return getOrdinalNumber(parse_number.toString()) + " " + translate("compare_blocks.misc.argument", user_language);



        }


    }

    function getOrdinalNumber(number: string) {

        let ordinal: string;
        switch (number) {
            case "0":
                ordinal = translate("compare_blocks.ordinal.first", user_language)
                break;
            case "1":
                ordinal = translate("compare_blocks.ordinal.first", user_language)
                break;
            case "2":
                ordinal = translate("compare_blocks.ordinal.second", user_language)
                break;
            case "3":
                ordinal = translate("compare_blocks.ordinal.third", user_language)
                break;
            case "4":
                ordinal = translate("compare_blocks.ordinal.fourth", user_language)
                break;
            case "5":
                ordinal = translate("compare_blocks.ordinal.fifth", user_language)
                break;
            case "6":
                ordinal = translate("compare_blocks.ordinal.sixth", user_language)
                break;
            case "7":
                ordinal = translate("compare_blocks.ordinal.seventh", user_language)
                break;
            case "8":
                ordinal = translate("compare_blocks.ordinal.eighth", user_language)
                break;
            case "9":
                ordinal = translate("compare_blocks.ordinal.ninth", user_language)
                break;
            case "10":
                ordinal = translate("compare_blocks.ordinal.tenth", user_language)
                break;
            default:
                ordinal = number;
                break;
        }

        return ordinal;

    }
    function getStatementName(statement: any) {


        if (statement != "DO") {

            if (statement.toString().includes("DO")) {

                if (statement.toString().includes("0")) {

                    //return symbol.toString().replace("DO0", "first if");

                    return translate("compare_blocks.misc.if", user_language);

                } else {

                    //return symbol.toString().replace("DO", "else if number ");
                    return getOrdinalNumber(statement.toString().substr(statement.toString().length - 1)) + " " + translate("compare_blocks.misc.else_if", user_language);
                }


            }
            else if (statement.toString().includes("ELSE")) {

                return statement.toString().replace("ELSE", translate("compare_blocks.misc.else", user_language));
            }

        }

    }
    function compareBlocksValue(tblock: any, ublock: any, container: any) {


        if (tblock.value != undefined) {


            if (ublock.value == undefined) {

                tblock.value.forEach((value: any) => {


                    value.block.forEach((block: any) => {

                        if (!getValueName(value['$'].name)) {

                            createTip(block, TipBlock.ADD_VALUE, container);
                        } else {

                            createTip(block, TipBlock.ADD_VALUE, container, `${getValueName(value['$'].name)}`);
                        }


                    });

                });



            } else {

                let match = false;
                tblock.value.forEach((tvalue: any) => {

                    match = false;
                    ublock.value.forEach((uvalue: any) => {

                        if (tvalue['$'].name == uvalue['$'].name) {

                            ublock.value.splice(ublock.value.indexOf(uvalue), 1);

                            diffBlocksScreen(tvalue.block, uvalue.block, container);
                            match = true;
                            //return false;
                        }
                        //return true;

                    });

                    if (!match) {

                        //console.log(tvalue['$'].name);
                        //container = `"${getValueName(tvalue['$'].name)}" de ${container}`

                        if (!getValueName(tvalue['$'].name)) {

                            createTip(tvalue.block[0], TipBlock.ADD_VALUE, container);
                        } else {

                            createTip(tvalue.block[0], TipBlock.ADD_VALUE, container, `${getValueName(tvalue['$'].name)}`);
                        }

                    }

                });

                ublock.value.forEach((uvalue: any) => {

                    if (!getValueName(uvalue['$'].name)) {


                        createTip(uvalue.block[0], TipBlock.DELETE_VALUE, container);
                    } else {

                        //console.log(uvalue.block[0]);
                        createTip(uvalue.block[0], TipBlock.DELETE_VALUE, container, `${getValueName(uvalue['$'].name)}`);
                    }


                });

            }

        }

    }
    function compareBlocksNext(tblock: any, ublock: any, upperblock: any) {

        if (tblock.next != undefined) {


            if (ublock.next == undefined) {



                //console.log(tblock.next[0].block);
                tblock.next[0].block.forEach((block: any) => {

                    createTip(block, TipBlock.ADD_NEXT, upperblock);

                });


            } else {


                diffBlocksScreen(tblock.next[0].block, ublock.next[0].block, upperblock);


            }

        } else {

            if (ublock.next != undefined) {

                //console.log(ublock.mutation);
                createTip(ublock.next[0].block[0], TipBlock.DELETE_NEXT, upperblock);

            }
        }
    }
    function compareBlocksStatement(tblock: any, ublock: any, container: any) {
        if (tblock.statement != undefined) {


            if (ublock.statement == undefined) {

                tblock.statement.forEach((statement: any) => {


                    statement.block.forEach((block: any) => {


                        if (!getStatementName(statement['$'].name)) {

                            createTip(block, TipBlock.ADD_STATEMENT, container);
                        } else {

                            createTip(block, TipBlock.ADD_STATEMENT, container, `${getStatementName(statement['$'].name)}`);
                        }

                        //createTip(block, TipBlock.Create, container);

                    });

                });



            } else {

                let match = false;
                tblock.statement.forEach((tstatement: any) => {

                    match = false;
                    ublock.statement.forEach((ustatement: any) => {

                        if (tstatement['$'].name == ustatement['$'].name) {

                            ublock.statement.splice(ublock.statement.indexOf(ustatement), 1);

                            diffBlocksScreen(tstatement.block, ustatement.block, container);
                            match = true;
                            return false;

                        }

                        return true;

                    });

                    if (!match) {


                        if (!getStatementName(tstatement['$'].name)) {

                            createTip(tstatement.block[0], TipBlock.ADD_STATEMENT, container);
                        } else {

                            createTip(tstatement.block[0], TipBlock.ADD_STATEMENT, container, `${getStatementName(tstatement['$'].name)}`);
                        }


                    }

                });

                ublock.statement.forEach((ustatement: any) => {

                    if (!getStatementName(ustatement['$'].name)) {

                        createTip(ustatement.block[0], TipBlock.DELETE_STATEMENT, container);
                    } else {

                        createTip(ustatement.block[0], TipBlock.DELETE_STATEMENT, container, `${getStatementName(ustatement['$'].name)}`);
                    }


                });


            }

        }
    }
    function getCompareOperationText(symbol: any) {

        let operation: string;

        switch (symbol.toString().toLowerCase()) {
            case "eq":
                operation = translate("compare_blocks.operators.equal", user_language);
                break;
            case "equal":
                operation = translate("compare_blocks.operators.equal", user_language);
                break;
            case "neq":
                operation = translate("compare_blocks.operators.no_equal", user_language);
                break;
            case "lt":
                operation = translate("compare_blocks.operators.less_than", user_language);
                break;
            case "lte":
                operation = translate("compare_blocks.operators.less_than_or_equal", user_language);
                break;
            case "gt":
                operation = translate("compare_blocks.operators.greater_than", user_language);
                break;
            case "gte":
                operation = translate("compare_blocks.operators.greater_than_or_equal", user_language);
                break;

            default:
                break;
        }

        return operation;

    }
    function diffBlocksScreen(tblocks: any, ublocks: any, container?: string) {

        let matchBlock: boolean = false;

        //Recorre cada uno de los bloques que esta en la plantilla
        tblocks.forEach((tblock: any) => {

            //Creo una variable booleana para indicar si se ha encontrado el mismo tipo de bloque en ambas plantillas
            matchBlock = false;

            //Compara cada bloque de la plantilla con todos los bloques del usuario
            ublocks.every((ublock: any) => {

                //Si hay una coincidencia en el tipo de bloques.... (coincidencia de primer nivel)
                if (tblock["$"].type == ublock["$"].type) {


                    let component_instance: string;
                    let event_name: string;
                    let method_name: string;
                    let property_name: string;

                    //console.log(user);

                    //TODO Mapear todos los bloques que pueden tener como valor otro bloque o pueden contener otros bloques o pueden ser metidos en otros bloques

                    //Si dentro de cada tipo de bloques coinciden una serie de parametros(coincidencia de segundo nivel)
                    //Cada tipo de bloque puede a su vez, albergar mas bloques (statement), tener un bloque como valor suyo (value), o tener debajo suya otro bloque (next)
                    //Todas estas casuisticas se estan implementando bloque a bloque...
                    switch (tblock["$"].type) {

                        //Variable global de primer nivel
                        case "global_declaration":

                            if (ublock.field[0]._ == tblock.field[0]._) {

                                //compareBlocksValue(tblock, ublock, `"initialize global ${ublock.field[0]._}"`);

                                compareBlocksValue(tblock, ublock, translate("compare_blocks.block_types.global_declaration", user_language, { global_name: ublock.field[0]._ }));


                                matchBlock = true;
                                //return false;

                            }

                            break;

                        //Variable local declarada dentro de otro bloque     
                        case "local_declaration_statement":

                            if (ublock.field[0]._ == tblock.field[0]._) {

                                compareBlocksValue(tblock, ublock, translate("compare_blocks.block_types.local_declaration_statement", user_language, { global_name: ublock.field[0]._ }));
                                compareBlocksNext(tblock, ublock, translate("compare_blocks.block_types.local_declaration_statement", user_language, { global_name: ublock.field[0]._ }));
                                compareBlocksStatement(tblock, ublock, translate("compare_blocks.block_types.local_declaration_statement", user_language, { global_name: ublock.field[0]._ }));

                                matchBlock = true;
                                //return false;

                            }


                            break;
                        //Bloques de control de tipo IF    
                        case "controls_if":

                            compareBlocksValue(tblock, ublock, translate("compare_blocks.block_types.controls_if", user_language));
                            compareBlocksStatement(tblock, ublock, translate("compare_blocks.block_types.controls_if", user_language));
                            compareBlocksNext(tblock, ublock, translate("compare_blocks.block_types.controls_if", user_language));


                            matchBlock = true;
                            //return false;

                            break;
                        //Procedimientos sin retorno    
                        case "procedures_defnoreturn":


                            if (tblock.field[0]._ == ublock.field[0]._) {

                                compareBlocksStatement(tblock, ublock, translate("compare_blocks.block_types.procedures_defnoreturn", user_language, { procedure_name: tblock.field[0]._ }));

                                translate("compare_blocks.block_types.procedures_defnoreturn", user_language, { procedure_name: tblock.field[0]._ })

                                matchBlock = true;
                                //return false;

                            }


                            break;
                        //Procedimientos con retorno    
                        case "procedures_defreturn":


                            if (tblock.field[0]._ == ublock.field[0]._) {

                                compareBlocksValue(tblock, ublock, translate("compare_blocks.block_types.procedures_defreturn", user_language, { procedure_name: tblock.field[0]._ }));

                                matchBlock = true;
                                //return false;

                            }


                            break;

                        //Llamada a procedimientos sin retorno   
                        case "procedures_callnoreturn":

                            if (tblock.mutation[0]["$"].name == ublock.mutation[0]["$"].name) {

                                compareBlocksNext(tblock, ublock, translate("compare_blocks.block_types.procedures_callnoreturn", user_language, { procedure_name: tblock.mutation[0]["$"].name }));


                                matchBlock = true;
                                //return false;

                            }

                            break;
                        //Bloques de tipo evento
                        case "component_event":

                            if ((tblock.mutation[0]["$"].component_type == ublock.mutation[0]["$"].component_type)
                                && (tblock.mutation[0]["$"].event_name == ublock.mutation[0]["$"].event_name)) {


                                component_instance = translateBlockElement(ublock.mutation[0]["$"].instance_name, TransBlock.COMPONENT);
                                event_name = translateBlockElement(tblock.mutation[0]["$"].event_name, TransBlock.EVENT);



                                compareBlocksStatement(tblock, ublock, translate("compare_blocks.block_types.component_event", user_language, { component_instance: component_instance, event_name: event_name })
                                );



                                matchBlock = true;
                                //return false;


                            }
                            break;

                        //Bloques de tipo metodo    
                        case "component_method":

                            if ((tblock.mutation[0]["$"].component_type == ublock.mutation[0]["$"].component_type)
                                && (tblock.mutation[0]["$"].method_name == ublock.mutation[0]["$"].method_name)) {

                                component_instance = translateBlockElement(tblock.mutation[0]["$"].instance_name, TransBlock.COMPONENT);
                                method_name = translateBlockElement(tblock.mutation[0]["$"].method_name, TransBlock.METHOD);

                                translate("compare_blocks.block_types.component_method", user_language, { component_instance: component_instance, method_name: method_name });

                                compareBlocksValue(tblock, ublock, translate("compare_blocks.block_types.component_method", user_language, { component_instance: component_instance, method_name: method_name }));

                                component_instance = translateBlockElement(ublock.mutation[0]["$"].instance_name, TransBlock.COMPONENT);
                                method_name = translateBlockElement(ublock.mutation[0]["$"].method_name, TransBlock.METHOD);

                                compareBlocksNext(tblock, ublock, translate("compare_blocks.block_types.component_method", user_language, { component_instance: component_instance, method_name: method_name }));


                                matchBlock = true;

                                //return false;
                            }

                            break;

                        //Bloques de tipo set/get    
                        case "component_set_get":

                            //TODO traduccion pendiente

                            if ((tblock.mutation[0]["$"].component_type == ublock.mutation[0]["$"].component_type)
                                && (tblock.mutation[0]["$"].set_or_get == ublock.mutation[0]["$"].set_or_get)
                                && (tblock.mutation[0]["$"].property_name == ublock.mutation[0]["$"].property_name)) {

                                //let upperblock = `"${ublock.mutation[0]["$"].set_or_get} ${ublock.mutation[0]["$"].instance_name} ${ublock.mutation[0]["$"].property_name}"`;

                                component_instance = translateBlockElement(ublock.mutation[0]["$"].instance_name, TransBlock.COMPONENT);
                                property_name = translateBlockElement(ublock.mutation[0]["$"].property_name, TransBlock.PROPERTY);

                                if (ublock.mutation[0]["$"].set_or_get == "set") {

                                    //translate("compare_blocks.block_types.component_set",user_language,{component_instance:ublock.mutation[0]["$"].instance_name,property_name:ublock.mutation[0]["$"].property_name});
                                    compareBlocksValue(tblock, ublock, translate("compare_blocks.block_types.component_set", user_language, { component_instance: component_instance, property_name: property_name }));
                                    compareBlocksNext(tblock, ublock, translate("compare_blocks.block_types.component_set", user_language, { component_instance: component_instance, property_name: property_name }));

                                } else {

                                    compareBlocksValue(tblock, ublock, component_instance + " " + property_name);
                                    compareBlocksNext(tblock, ublock, component_instance + " " + property_name);
                                }

                                //compareBlocksValue(tblock, ublock, `"${ublock.mutation[0]["$"].set_or_get} ${ublock.mutation[0]["$"].instance_name} ${ublock.mutation[0]["$"].property_name}"`);
                                //compareBlocksNext(tblock, ublock, `"${ublock.mutation[0]["$"].set_or_get} ${ublock.mutation[0]["$"].instance_name} ${ublock.mutation[0]["$"].property_name}"`);

                                matchBlock = true;
                                //return false;
                            }

                            break;

                        //Bloque de comparador de texto    
                        case "text_compare":

                            compareBlocksValue(tblock, ublock, translate("compare_blocks.block_types.text_compare", user_language, { operation: getCompareOperationText(tblock.field[0]._.toString().toLowerCase()) }));

                            matchBlock = true;
                            //return false;
                            break;

                        //Bloque de comparador de numeros    
                        case "math_compare":


                            compareBlocksValue(tblock, ublock, translate("compare_blocks.block_types.math_compare", user_language, { operation: getCompareOperationText(tblock.field[0]._.toString().toLowerCase()) }));

                            matchBlock = true;
                            //return false;
                            break;

                        //Bloque de comparador logico    
                        case "logic_compare":

                            compareBlocksValue(tblock, ublock, translate("compare_blocks.block_types.logic_compare", user_language, { operation: getCompareOperationText(tblock.field[0]._.toString().toLowerCase()) }));

                            matchBlock = true;
                            //return false;

                            break;

                        //Bloques que aun no estan tratados en esta funcion....    
                        default:

                            //Se analizan de forma generica todas las posibilidades
                            compareBlocksStatement(tblock, ublock, `${replaceAll(tblock["$"].type, "_", " ")}`);
                            compareBlocksValue(tblock, ublock, `${replaceAll(tblock["$"].type, "_", " ")}`);
                            compareBlocksNext(tblock, ublock, `${replaceAll(tblock["$"].type, "_", " ")}`);
                            matchBlock = true;
                            //return false;
                            break;
                    }

                    //Si se ha cumplido la doble comprobacion...
                    if (matchBlock) {

                        //Elimino el bloque de la lista de bloques del usuario
                        ublocks.splice(ublocks.indexOf(ublock), 1);

                        //Return false rompe el bucle de every
                        return false;

                        //Sino se encuentra el bloque de template se pasa al siguiente bloque de la lista de user con return true en every    
                    } else {

                        return true;
                    }


                }
                //return true;

            });

            //Si el bloque a comparar de la plantilla no se ha creado aun por parte del usuario...
            if (!matchBlock) {

                //Se crea el mensaje indicando al usuario que lo cree
                createTip(tblock, TipBlock.ADD, container);

            }

        });

        //console.log(user);

        //Cuando acaba la comparacion entre plantilla y usuario, solo quedan en la lista de user aquellos bloques que no aparecen en la plantilla pero que el usuario ha decidido poner....
        ublocks.forEach((ublock: any) => {

            //Se crean consejos para que elimine esos bloques que no concuerdan con la plantilla
            createTip(ublock, TipBlock.DELETE, container);
        });


    }


    if (ublocks != undefined && tblocks != undefined) {

        diffBlocksScreen(tblocks, ublocks);
    }

    else if (ublocks == undefined && tblocks != undefined) {

        //da al usuario el consejo de anadir los bloques que estan en primer nivel en la plantilla
        tblocks.forEach((tblock: any) => {

            createTip(tblock, TipBlock.ADD);

        });

        // await Promise.all(tblocks.map(async (tblock: any) => {
        //     await createTip(tblock, TipBlock.ADD);
        // }));
    }

    //console.log(tblock);
    return block_tips;

}






