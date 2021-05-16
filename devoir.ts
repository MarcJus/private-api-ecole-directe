import * as ec from "node-ecole-directe"
import ent from "ent"

namespace Devoir{
    export async function getDevoir(properties: PropertiesDevoir): Promise<object[]>{
        const returnDevoir: object[] = new Array<object>()
        const elevePromise = properties.eleve
        try{
            await elevePromise.then(async compte => {
                const eleve: ec.Eleve = (compte as ec.Eleve)
                if(properties.date != undefined){
                    await eleve.fetchCahierDeTexteJour(properties.date)
                    .then(value => {
                        value.forEach(devoirs => {
                            if(devoirs == undefined)
                            {console.log("devoirs null"); return returnDevoir}
                            const devoir = (devoirs as any)
                            if(devoir.matiere.aFaire != undefined){
                                const contenuEncoded:string = devoir.matiere.aFaire.contenu
                                if(contenuEncoded != undefined)
                                    devoir.matiere.aFaire.contenu = decodeText(contenuEncoded)
                                if(devoir.matiere.contenuDeSeance != undefined){
                                    if(devoir.matiere.contenuDeSeance.contenu != ""){
                                        const seanceEncoded:string =
                                         devoir.matiere.aFaire.contenuDeSeance.contenu
                                        const decoded: string = decodeText(seanceEncoded)
                                        devoir.matiere.aFaire.contenuDeSeance.contenu = decoded
                                        devoir.matiere.contenuDeSeance.contenu = decoded
                                    }
                                }
                                returnDevoir.push(devoir)
                            } else {
                                console.log("Aucun contenu : "+devoir.matiere.matiere)
                            }
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    await eleve.fetchCahierDeTexte()
                    .then(value => {
                        value.forEach(devoirs => {
                            const devoir: any = (devoirs as any)
                            const today = new Date()
                            const dateISO = today.toISOString().substr(0, 10)
                            if(devoir.day != dateISO){
                                returnDevoir.push(devoir)
                            }
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
        } catch (e){
            console.log(e)
        }
        return returnDevoir
    }
    
    export function removeHtmlTag(text: string): string{
        text = text.toString()
        return text.replace(/<[^>]*>/g, "").replace("\n", "")
    }
    
    export function decodeText(text: string): string{
        const buffer: Buffer = Buffer.from(text, "base64")
        return removeHtmlTag(ent.decode(buffer.toString("utf-8")))
    }
    
    export interface PropertiesDevoir{
        eleve: Promise<ec.Eleve | ec.Famille>,
        date?: string
    }
}

export = Devoir