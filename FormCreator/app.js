"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var fieldType_1 = require("./scripts/Enumerators/fieldType");
var fields_1 = require("./scripts/classes/fields");
var form_1 = require("./scripts/classes/form");
var locStorage_1 = require("./scripts/classes/locStorage");
var App = /** @class */ (function () {
    function App() {
        var btnSend = document.querySelector('#btn-submit');
        var name1 = new fields_1.InputField('name', 'Imię', fieldType_1.FieldType.Input, "");
        var lastName = new fields_1.InputField('lastName', 'Nazwisko', fieldType_1.FieldType.Input, "");
        var email = new fields_1.EmailField('email', 'E-mail', fieldType_1.FieldType.Email, "");
        var options = ['Informatyka', 'Ekonometria', 'Plastyka'];
        var fieldOfStudy = new fields_1.SelectedField('fieldOfStudy', 'Kierunek studiów', fieldType_1.FieldType.SelectField, options[0], options);
        var eLearningPreferation = new fields_1.CheckboxField('eLearn', 'Czy preferujesz e-learning?', fieldType_1.FieldType.CheckBox, '');
        var notes = new fields_1.TextAreaField('notes', 'Uwagi', fieldType_1.FieldType.TextArea, '');
        var fieldTab = [name1, lastName, email, fieldOfStudy, eLearningPreferation, notes];
        var form = new form_1.Form(fieldTab);
        form.render();
        var doc = new locStorage_1.LocStorage();
        btnSend.addEventListener("click", function () {
            form.getValue();
            doc.saveDocument(fieldTab);
            console.log(localStorage.getItem("allDocuments"));
        });
    }
    return App;
}());
exports.App = App;
