
import { translate } from "./locale";

enum TipType {
    Change,
    Create,
    Delete
}



export function compareProjectsForm(tComponents: any, uComponents: any, user_language?: string) {


    let component_tips: string[][] = [];

    let container: string;

    let default_language: string = "en";


    if (user_language == undefined) {

        user_language = default_language;
    }



    function addComponentsTips(component: string, atribute: string, container: string, tipType: TipType, atributeValue?: string) {

        if (typeof atributeValue !== 'undefined') {


            if (atributeValue.includes("&HFF")) {

                atributeValue = atributeValue.replace("&HFF", "#");

            }

        }


        if (container != undefined) {

            if (!isNaN(Number(container.substr(container.length - 1)))) {

                let trans_container = translate("components." + container.slice(0, container.length - 1).toLowerCase(), user_language);

                if (trans_container != undefined) {

                    container = trans_container + container.substr(container.length - 1);
                }

            }

        }
        if (atribute != "$Name" && atribute != "Uuid" && atribute != "$Version") {

            //console.log(atribute);

            let trans_component: any = translate("components." + component.toLowerCase(), user_language);

            if (trans_component != undefined) {

                component = trans_component;
            }

            if (atribute == "$Type") {


                if (tipType == TipType.Create) {

                    //component_tips.push(`You should add to the ${container} a component of type ${component}`)
                    component_tips.push([translate("compare_forms.create", user_language, { container: container, component: component }), "ADD_COMPONENT"]);
                }
                else if (tipType == TipType.Delete) {

                    //component_tips.push(`You should remove the component ${component} from ${container}`);
                    component_tips.push([translate("compare_forms.delete", user_language, { container: container, component: component }), "DELETE_COMPONENT"]);
                }


            } else {

                if (atribute == "Width" || atribute == "Height") {


                    if (!isNaN(Number(atributeValue))) {

                        let number_value: number = parseInt(atributeValue);

                        if (number_value < 0) {

                            atributeValue = ((number_value + 1000) * -1) + " percent";

                            if (((number_value + 1000) * -1) == -998) {

                                atributeValue = translate("compare_forms.misc.fill_parent", user_language);
                            }
                        } else {

                            atributeValue = number_value + " pixels";
                        }
                    }

                } else if (atribute == "FontTypeface") {

                    switch (atributeValue) {
                        case "1":

                            atributeValue = "sans serif"

                            break;
                        case "2":

                            atributeValue = "serif"

                            break;
                        case "3":

                            atributeValue = "monospace"

                            break;

                        default:
                            break;
                    }
                }

                let trans_atribute: any = translate("properties." + atribute.toLowerCase(), user_language);

                if (trans_atribute != undefined) {

                    atribute = trans_atribute;
                }

                if (container == undefined) {

                    //component_tips.push(`In the ${component} component, the ${atribute} attribute should have the value ${atributeValue}`);
                    component_tips.push([translate("compare_forms.change.no_container", user_language, { component: component, atribute: atribute, atributeValue: atributeValue }), "CHANGE_COMPONENT"]);
                } else {
                    //component_tips.push(`In the ${component} component of ${container}, the ${atribute} attribute should have the value ${atributeValue}`);
                    component_tips.push([translate("compare_forms.change.container", user_language, { component: component, container: container, atribute: atribute, atributeValue: atributeValue }), "CHANGE_COMPONENT"]);

                }

            }
        }

    }

    function diffFormComponents(tComponents: any, uComponents: any, container: string) {

        let score: number = 0;
        let hasAtribute: boolean = false;
        if (uComponents["$Components"] == undefined) {
            uComponents["$Components"] = [];
        }

        //El score debe hacerse a este nivel
        for (const tkey in tComponents) {

            hasAtribute = false;

            for (const ukey in uComponents) {

                //TODO deberia de idear un sistema para ver que nivel de match hacen entre si dos componentes, por si hay duplicidad en la parte del usuario

                if (tkey == ukey) {

                    hasAtribute = true;

                    if (tkey == "$Components") {

                        container = uComponents["$Name"];

                        let hasComponent: boolean = false;
                        tComponents[tkey].forEach((tComponent: { [x: string]: any; }) => {

                            hasComponent = false;

                            uComponents[tkey].every((uComponent: { [x: string]: any; }) => {


                                if (uComponent["$Type"] === tComponent["$Type"]) {

                                    hasComponent = true;

                                    uComponents[tkey].splice(uComponents[tkey].indexOf(uComponent), 1);

                                    //TODO deberia hacer que me de una puntuacion en base a los atributos coincidentes tanto en valor como en atributo

                                    //console.log(tComponent["$Name"]+" VS "+uComponent["$Name"]);
                                    diffFormComponents(tComponent, uComponent, container);

                                    return false;
                                }

                                return true;

                            });

                            if (!hasComponent) {

                                addComponentsTips(tComponent["$Type"], "$Type", container, TipType.Create);
                            }
                        });

                        uComponents[tkey].forEach((uComponent: { [x: string]: any; }) => {

                            addComponentsTips(uComponent["$Name"], "$Type", uComponents["$Name"], TipType.Delete);
                        });

                    } else {



                        if (tComponents[tkey].toString() != uComponents[ukey].toString()) {



                            addComponentsTips(uComponents["$Name"], tkey, container, TipType.Change, tComponents[tkey]);
                        } else {

                            score++;
                        }
                    }
                    break;

                } else {
                    hasAtribute = false;
                }
            }
            if (!hasAtribute) {
                addComponentsTips(uComponents["$Name"], tkey, container, TipType.Change, tComponents[tkey]);
            }

        }

        return score;

    }

    diffFormComponents(tComponents.Properties, uComponents.Properties, container);

    //console.log(component_tips);

    return component_tips;

}
