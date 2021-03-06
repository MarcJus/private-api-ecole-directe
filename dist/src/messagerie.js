"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Messagerie;
(function (Messagerie) {
    function getMessagerie(elevePromise) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnMessagerie = [];
            yield elevePromise.then((compte) => __awaiter(this, void 0, void 0, function* () {
                const eleve = compte;
                yield eleve.fetchMessagerie().then(result => {
                    const messages = result.messages;
                    console.log(messages);
                    returnMessagerie.push(result);
                }).catch(err => {
                    console.log("erreur fetch");
                    console.log(err);
                });
            })).catch(err => {
                console.log("erreur compte");
                console.error(err);
            });
            return returnMessagerie;
        });
    }
    Messagerie.getMessagerie = getMessagerie;
})(Messagerie || (Messagerie = {}));
module.exports = Messagerie;
