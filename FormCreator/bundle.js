(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var form_1 = require("./scripts/classes/form");
var documentList_1 = require("./scripts/classes/documentList");
var router_1 = require("./scripts/classes/router");
var formCreator_1 = require("./scripts/classes/formCreator");
var App = /** @class */ (function () {
    function App() {
        var p = window.location.pathname;
        // index.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('index') > -1) {
            new formCreator_1.FormCreator().newForm();
        }
        //document-list.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('document-list') > -1) {
            var documentList = new documentList_1.DocumentList();
            documentList.render();
        }
        // new-document.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('new-document') > -1) {
            //new FormCreator().renderFormList();
            var id = router_1.Router.getParam();
            var gottenForm = new formCreator_1.FormCreator().getForm(id);
            var form = new form_1.Form('name', gottenForm);
            form.render(id);
        }
        // edit-document.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('edit-document') > -1) {
            var id = router_1.Router.getParam();
            var document_1 = new documentList_1.DocumentList().getDocument(id);
            var form = new form_1.Form('name', document_1);
            form.render(id);
        }
        // form-list.html
        if (document.location.pathname === '/' || document.location.pathname.indexOf('form-list') > -1) {
            new formCreator_1.FormCreator().renderFormList();
        }
    }
    return App;
}());
exports.App = App;
},{"./scripts/classes/documentList":4,"./scripts/classes/form":6,"./scripts/classes/formCreator":7,"./scripts/classes/router":9}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
new app_1.App();
},{"./app":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldType = void 0;
var FieldType;
(function (FieldType) {
    FieldType[FieldType["Input"] = 0] = "Input";
    FieldType[FieldType["TextArea"] = 1] = "TextArea";
    FieldType[FieldType["Date"] = 2] = "Date";
    FieldType[FieldType["Email"] = 3] = "Email";
    FieldType[FieldType["SelectField"] = 4] = "SelectField";
    FieldType[FieldType["CheckBox"] = 5] = "CheckBox";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentList = void 0;
var locStorage_1 = require("./locStorage");
var DocumentList = /** @class */ (function () {
    function DocumentList() {
        this.renderResult = '';
        if (!(localStorage.getItem('allDocuments'))) {
            localStorage.setItem('allDocuments', '');
        }
        if (localStorage.getItem("allDocuments").length < 1) {
            this.allDocuments = [];
        }
        else {
            this.getDocumentList();
            //this.render();
        }
    }
    DocumentList.prototype.getDocumentList = function () {
        this.allDocuments = new locStorage_1.LocStorage().getDocuments();
    };
    DocumentList.prototype.render = function () {
        var allDocs = this.allDocuments;
        this.renderResult = '<h1>Lista dokumentów</h1>';
        this.getDocumentList();
        var removeButtons = [,];
        this.renderResult += '<table border=1><tr><td>id</td><td>Edytuj</td><td>Usuń</td></tr>';
        for (var i = 0; i < this.allDocuments.length; i++) {
            this.renderResult += "<tr><td><p id=doc-id-" + i + ">" + this.allDocuments[i] + "</p></td><td><a href=\"./edit-document.html?id=" + this.allDocuments[i] + "\">Edytuj</a></td><td><input id=btn-remove-doc-" + allDocs[i] + " type=button value=Usu\u0144></td></tr>";
        }
        this.renderResult += '</table>';
        document.getElementById('document-list').innerHTML = this.renderResult; // Rendering list
        var _loop_1 = function (j) {
            removeButtons[j] = document.querySelector("#btn-remove-doc-" + allDocs[j]);
            if (removeButtons[j]) {
                removeButtons[j].addEventListener('click', function () {
                    new DocumentList().removeDocument(allDocs[j]);
                });
            }
        };
        // Adding click events to remove buttons
        for (var j = 0; j < allDocs.length; j++) {
            _loop_1(j);
        }
    };
    DocumentList.prototype.getDocument = function (id) {
        var doc = JSON.parse(localStorage.getItem("" + id));
        return doc;
    };
    DocumentList.prototype.removeDocument = function (id) {
        localStorage.removeItem("" + id);
        var allDocumentsTab = JSON.parse(localStorage.getItem("allDocuments"));
        var index = allDocumentsTab.indexOf(id);
        if (index > -1) {
            allDocumentsTab.splice(index, 1);
        }
        localStorage.setItem("allDocuments", JSON.stringify(allDocumentsTab));
        window.location.reload();
    };
    return DocumentList;
}());
exports.DocumentList = DocumentList;
},{"./locStorage":8}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxField = exports.SelectedField = exports.EmailField = exports.DateField = exports.TextAreaField = exports.InputField = void 0;
var InputField = /** @class */ (function () {
    function InputField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    InputField.prototype.getValue = function () {
        return this.value;
    };
    return InputField;
}());
exports.InputField = InputField;
var TextAreaField = /** @class */ (function () {
    function TextAreaField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    TextAreaField.prototype.getValue = function () {
        return this.value;
    };
    return TextAreaField;
}());
exports.TextAreaField = TextAreaField;
var DateField = /** @class */ (function () {
    function DateField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    DateField.prototype.getValue = function () {
        return this.value;
    };
    return DateField;
}());
exports.DateField = DateField;
var EmailField = /** @class */ (function () {
    function EmailField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    EmailField.prototype.getValue = function () {
        return this.value;
    };
    return EmailField;
}());
exports.EmailField = EmailField;
var SelectedField = /** @class */ (function () {
    function SelectedField(name, label, fieldType, value, options) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
        this.options = options;
    }
    SelectedField.prototype.getValue = function () {
        return this.value;
    };
    return SelectedField;
}());
exports.SelectedField = SelectedField;
var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label, fieldType, value) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
    CheckboxField.prototype.getValue = function () {
        return this.value;
    };
    return CheckboxField;
}());
exports.CheckboxField = CheckboxField;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
var locStorage_1 = require("./locStorage");
var router_1 = require("./router");
var Form = /** @class */ (function () {
    function Form(name, fieldTab) {
        this.result = ' '; // render result
        this.getValueResult = ' ';
        this.name = name;
        this.fieldTab = fieldTab;
    }
    Form.prototype.getValue = function () {
        for (var i = 0; i < this.fieldTab.length; i++) {
            var inputValue = void 0;
            if (this.fieldTab[i].fieldType === 0) {
                inputValue = document.querySelector("input[name='" + this.fieldTab[i].name + "']").value;
            }
            if (this.fieldTab[i].fieldType === 1) {
                inputValue = document.querySelector("textarea[name='" + this.fieldTab[i].name + "']").value;
            }
            if (this.fieldTab[i].fieldType === 2) {
                inputValue = document.querySelector("input[name='" + this.fieldTab[i].name + "']").value;
            }
            if (this.fieldTab[i].fieldType === 3) {
                inputValue = document.querySelector("input[name='" + this.fieldTab[i].name + "']").value;
            }
            if (this.fieldTab[i].fieldType === 4) {
                inputValue = document.querySelector("select[name='" + this.fieldTab[i].name + "']").value;
            }
            if (this.fieldTab[i].fieldType === 5) {
                if (document.querySelector("input[name='" + this.fieldTab[i].name + "']").checked) {
                    inputValue = "Tak";
                }
                else {
                    inputValue = "Nie";
                }
            }
            this.fieldTab[i].value = inputValue;
        }
    };
    Form.prototype.render = function (documentId) {
        this.result += "<form name=" + this.name + "> <table>";
        var fieldTab = this.fieldTab;
        for (var i = 0; i < this.fieldTab.length; i++) {
            /*
                Input,          0
                TextArea,       1
                Date,           2
                Email,          3
                SelectField,    4
                CheckBox        5
            */
            switch (this.fieldTab[i].fieldType) {
                case 0:
                    this.result += "<tr><td><p>" + this.fieldTab[i].label + ":</p> </td><td><input name=\"" + this.fieldTab[i].name + "\", type=\"text\", value=\"" + this.fieldTab[i].value + "\"></td>";
                    break;
                case 1:
                    this.result += "<tr><td><p>" + this.fieldTab[i].label + ":</p></td> <td><textarea name=\"" + this.fieldTab[i].name + "\">" + this.fieldTab[i].value + "</textarea></td></tr>";
                    break;
                case 2:
                    this.result += "<tr><td><p>" + this.fieldTab[i].label + ":</p></td> <td><input name=\"" + this.fieldTab[i].name + "\", type=\"date\", value=\"" + this.fieldTab[i].value + "\"></td></tr>";
                    break;
                case 3:
                    this.result += "<tr><td><p>" + this.fieldTab[i].label + ":</p></td> <td><input name=\"" + this.fieldTab[i].name + "\", type=\"email\", value=\"" + this.fieldTab[i].value + "\"></td></tr>";
                    break;
                case 4:
                    this.result += "<tr><td><p>" + this.fieldTab[i].label + ": </p></td><td><select name=\"" + this.fieldTab[i].name + "\" >";
                    for (var j = 0; j < this.fieldTab[i].options.length; j++) {
                        if (this.fieldTab[i].value == this.fieldTab[i].options[j])
                            this.result += "<option id=\"" + this.fieldTab[i].options[j] + "\" selected>" + this.fieldTab[i].options[j] + "</option>";
                        else
                            this.result += "<option id=\"" + this.fieldTab[i].options[j] + "\">" + this.fieldTab[i].options[j] + "</option>";
                    }
                    this.result += "</select></td></tr>";
                    break;
                case 5:
                    if (this.fieldTab[i].value == "Tak")
                        this.result += "<tr><td><p>" + this.fieldTab[i].label + ": </p></td><td><input name=\"" + this.fieldTab[i].name + "\", type=\"checkbox\"checked></td></tr>";
                    else
                        this.result += "<tr><td><p>" + this.fieldTab[i].label + ":</p></td> <td><input name=\"" + this.fieldTab[i].name + "\", type=\"checkbox\"></td></tr>";
                    break;
            }
        }
        this.result += "<tr><td><input id=\"btn-back-form\" value=\"Wstecz\" type=\"button\"></td><td><input id=\"btn-save-form\" value=\"Zapisz\" type=\"button\"></td></tr>";
        this.result += "</table></form>";
        document.getElementById('form').innerHTML = this.result;
        var btnBackForm = document.querySelector('#btn-back-form');
        var btnSaveForm = document.querySelector('#btn-save-form');
        if (document.location.pathname === '/' || document.location.pathname.indexOf('new-document') > -1) {
            btnBackForm.addEventListener("click", function () {
                window.location.href = "./index.html";
            });
            btnSaveForm.addEventListener("click", function () {
                var form = new Form('name', fieldTab);
                form.getValue();
                form.save();
            });
        }
        else {
            btnBackForm.addEventListener("click", function () {
                window.location.href = "./document-list.html";
            });
            btnSaveForm.addEventListener("click", function () {
                var id = router_1.Router.getParam();
                var form = new Form('name', fieldTab);
                form.getValue();
                form.saveEditedForm(documentId);
            });
        }
    };
    Form.prototype.save = function () {
        var doc = new locStorage_1.LocStorage();
        doc.saveDocument(this.fieldTab);
        console.log('Document has been saved');
        window.location.href = "./index.html";
    };
    Form.prototype.saveEditedForm = function (documentId) {
        localStorage.setItem("" + documentId, JSON.stringify(this.fieldTab));
        window.location.href = "./document-list.html";
    };
    return Form;
}());
exports.Form = Form;
},{"./locStorage":8,"./router":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormCreator = void 0;
var fieldType_1 = require("../Enumerators/fieldType");
var fields_1 = require("./fields");
var form_1 = require("./form");
var locStorage_1 = require("./locStorage");
var FormCreator = /** @class */ (function () {
    function FormCreator() {
        this.renderResult = '';
    }
    FormCreator.prototype.newForm = function () {
        var result = '';
        var fieldsTab = [];
        var fieldTypeTab = [];
        result += "<table>\n            <form name=form-creator>\n            <tr><td>Nazwa formularza: </td><td><input type='text' id=form-creator-formname></td></tr>\n            <tr><td>Etykieta: </td> <td><input type=text name=field-label></td></tr>\n            <tr><td>Typ pola: </td> <td><select id=form-creator-select name=field-type>\n                <option>Pole jednolinijkowe</option>\n                <option>Pole tekstowe</option>\n                <option>Data</option>\n                <option>E-mail</option>\n                <option id=selected-field-creator>Lista rozwijana</option>\n                <option>Checkbox</option>\n            </select></td></tr>\n            <tr><td>Nazwa: </td><td><input type=text name=field-name></td></tr>\n                <tr><td colspan=2><div id=form-creator-options>\n                    <div id=form-creator-options-quantity></div>\n                    <div id=form-creator-options-options></div>\n                    <div id=form-creator-options-error style=\"color: red\"></div>\n                </div></td></tr>\n                <tr id=form-creator-default-value><td><p >Domy\u015Blna warto\u015B\u0107: </p></td><td><input name=field-default-value type=text></td></tr>\n                <tr><td><p>Liczba opcji: </p></td><td><input type=number id=form-creator-options-quantity-input disabled></td></tr>\n                <tr><td colspan=2><input type=button id=btn-form-creator-submit value=Dodaj></td></tr>\n            \n            </form>\n            </table>";
        document.getElementById('form-creator-creator').innerHTML = result;
        var formQuantityOpts = document.querySelector("#form-creator-options-quantity");
        var formOptions = document.querySelector("#form-creator-options-options");
        var formOptionsError = document.querySelector("#form-creator-options-error");
        var inputDefaultValue = document.querySelector('#form-creator-default-value');
        var selectFormCreator = document.querySelector("#form-creator-select");
        var inputQuantityOpts = document.querySelector("#form-creator-options-quantity-input");
        selectFormCreator.addEventListener("change", function (event) {
            if (selectFormCreator.selectedIndex == 0) {
                inputDefaultValue.innerHTML = "<tr><td><p>Domy\u015Blna warto\u015B\u0107: </p></td><td><input name=field-default-value type=text></tr>";
                formQuantityOpts.innerHTML = '';
                formOptions.innerHTML = "";
                formOptionsError.innerHTML = "";
                inputQuantityOpts.disabled = true;
            }
            else if (selectFormCreator.selectedIndex == 1) {
                inputDefaultValue.innerHTML = "<tr><td><p>Domy\u015Blna warto\u015B\u0107:</p></td> <td><textarea name=field-default-value></textarea></td></tr>";
                formQuantityOpts.innerHTML = '';
                formOptions.innerHTML = "";
                formOptionsError.innerHTML = "";
                inputQuantityOpts.disabled = true;
            }
            else if (selectFormCreator.selectedIndex == 2) {
                inputDefaultValue.innerHTML = "<tr><td><p>Domy\u015Blna warto\u015B\u0107: </p></td><td><input name=field-default-value type=date></td></tr>";
                formQuantityOpts.innerHTML = '';
                formOptions.innerHTML = "";
                formOptionsError.innerHTML = "";
                inputQuantityOpts.disabled = true;
            }
            else if (selectFormCreator.selectedIndex == 3) {
                inputDefaultValue.innerHTML = "<tr><td><p>Domy\u015Blna warto\u015B\u0107: </p></td><td><input name=field-default-value type=email></td></tr>";
                formQuantityOpts.innerHTML = '';
                formOptions.innerHTML = "";
                formOptionsError.innerHTML = "";
                inputQuantityOpts.disabled = true;
            }
            else if (selectFormCreator.selectedIndex == 4) {
                //formQuantityOpts.innerHTML = '<tr><td><p>Liczba opcji: </p></td><td><input type=number id=form-creator-options-quantity-input></td></tr>';
                inputQuantityOpts.disabled = false;
                inputQuantityOpts.addEventListener("change", function () {
                    var quantity = inputQuantityOpts.value;
                    var result = '<table><tr><td colspan=2><p>Opcje:</p></td></tr>';
                    if (quantity > 100)
                        formOptionsError.textContent = "Mo\u017Cna wybra\u0107 maksymalnie 100 opcji!";
                    else {
                        for (var i = 0; i < quantity; i++) {
                            result += "<tr><td>Opcja nr " + (i + 1) + ": </td><td><input type=text name=option" + i + "></td></tr>";
                        }
                        result += "</table>";
                        formOptions.innerHTML = result;
                    }
                });
                inputDefaultValue.innerHTML = "<tr><td><p>Domy\u015Blna warto\u015B\u0107: </p></td><td><input name=field-default-value type=text disabled value=\"Zablokowana funkcja\"></td></tr>";
            }
            else if (selectFormCreator.selectedIndex == 5) {
                inputDefaultValue.innerHTML = "<tr><td><p>Domy\u015Blna warto\u015B\u0107: </p></td><td><input name=field-default-value type=checkbox></td></tr>";
                formQuantityOpts.innerHTML = '';
                formOptions.innerHTML = "";
                formOptionsError.innerHTML = "";
                inputQuantityOpts.disabled = true;
            }
            else {
            }
        });
        var btnFormCreatorAddField = document.querySelector("#btn-form-creator-submit");
        btnFormCreatorAddField.addEventListener("click", function () {
            var result = '<form><table>';
            var formNameField = document.querySelector("input[id=form-creator-formname]");
            var fieldLabel = document.querySelector('input[name=field-label]').value;
            var fieldName = document.querySelector('input[name=field-name]').value;
            var fieldDefaultValue = document.querySelector('input[name=field-default-value]');
            var fieldDefaultValueTA = document.querySelector('textarea[name=field-default-value]');
            if (fieldLabel.length < 1 || fieldName.length < 1) {
                alert('Uzupełnij wszystkie pola');
            }
            else {
                formNameField.disabled = true;
                if (selectFormCreator.selectedIndex == 0) {
                    fieldTypeTab.push("<tr><td><p>" + fieldLabel + ": </p></td><td><input name=\"" + fieldName + "\" type=text value=\"" + fieldDefaultValue.value + "\"></td></tr>");
                    fieldsTab.push(new fields_1.InputField(fieldName, fieldLabel, fieldType_1.FieldType.Input, fieldDefaultValue.value));
                }
                if (selectFormCreator.selectedIndex == 1) {
                    fieldTypeTab.push("<tr><td><p>" + fieldLabel + ":</p></td> <td><textarea name=" + fieldName + ">" + fieldDefaultValueTA.value + "</textarea></td></tr>");
                    fieldsTab.push(new fields_1.TextAreaField(fieldName, fieldLabel, fieldType_1.FieldType.TextArea, fieldDefaultValueTA.value));
                }
                if (selectFormCreator.selectedIndex == 2) {
                    fieldTypeTab.push("<tr><td><p>" + fieldLabel + ":</p></td> <td><input name=\"" + fieldName + "\" type=date value=\"" + fieldDefaultValue.value + "\"></td></tr>");
                    fieldsTab.push(new fields_1.DateField(fieldName, fieldLabel, fieldType_1.FieldType.Date, fieldDefaultValue.value));
                }
                if (selectFormCreator.selectedIndex == 3) {
                    fieldTypeTab.push("<tr><td><p>" + fieldLabel + ":</p></td> <td><input name=\"" + fieldName + "\" type=email value=\"" + fieldDefaultValue.value + "\"></td></tr>");
                    fieldsTab.push(new fields_1.EmailField(fieldName, fieldLabel, fieldType_1.FieldType.Email, fieldDefaultValue.value));
                }
                if (selectFormCreator.selectedIndex == 4) {
                    var result_1 = "<tr><td><p>" + fieldLabel + ": </p></td> <td><select name=\"" + fieldName + "\">";
                    var options = [];
                    var inputQuantityOpts_1 = document.querySelector("#form-creator-options-quantity-input");
                    for (var i = 0; i < inputQuantityOpts_1.value; i++) {
                        result_1 += "<option>" + document.querySelector("input[name=option" + i + "]").value + "</option>";
                        options.push(document.querySelector("input[name=option" + i + "]").value);
                    }
                    result_1 += "</select></td></tr>";
                    fieldTypeTab.push(result_1);
                    fieldsTab.push(new fields_1.SelectedField(fieldName, fieldLabel, fieldType_1.FieldType.SelectField, fieldDefaultValue.value, options));
                }
                if (selectFormCreator.selectedIndex == 5) {
                    if (fieldDefaultValue.checked == true) {
                        fieldTypeTab.push("<tr><td><p>" + fieldLabel + ":</p></td> <td><input name=\"" + fieldName + "\" type=\"checkbox\" checked></td></tr>");
                        fieldsTab.push(new fields_1.CheckboxField(fieldName, fieldLabel, fieldType_1.FieldType.CheckBox, "Tak"));
                    }
                    else {
                        fieldTypeTab.push("<tr><td><p>" + fieldLabel + ":</p></td> <td><input name=\"" + fieldName + "\" type=\"checkbox\"></td></tr>");
                        fieldsTab.push(new fields_1.CheckboxField(fieldName, fieldLabel, fieldType_1.FieldType.CheckBox, "Nie"));
                    }
                }
                for (var i = 0; i < fieldTypeTab.length; i++) {
                    result += fieldTypeTab[i];
                }
                result += "<tr><td colspan=2><input type=button id='btn-formcreator-save-form' value='Zapisz formularz'></td></tr>";
                result += "</table></form>";
                document.querySelector("#form-creator-view").innerHTML = result;
                var btnFormCreatorSaveForm = document.querySelector("#btn-formcreator-save-form");
                btnFormCreatorSaveForm.addEventListener("click", function () {
                    var name = document.querySelector("input[id=form-creator-formname]").value;
                    var form = new form_1.Form(name, fieldsTab);
                    new FormCreator().saveForm(form);
                    window.location.href = "./index.html";
                });
            }
        });
    };
    FormCreator.prototype.saveForm = function (form) {
        new locStorage_1.LocStorage().saveForm(form.name, form.fieldTab);
    };
    FormCreator.prototype.getForm = function (id) {
        var form = JSON.parse(localStorage.getItem("" + id));
        return form;
    };
    FormCreator.prototype.getFormName = function (id) {
        var formName = JSON.parse(localStorage.getItem("" + id + 'name'));
        return formName;
    };
    FormCreator.prototype.renderFormList = function () {
        this.renderResult = '<h1>Lista formularzy</h1><br>';
        this.allForms = new locStorage_1.LocStorage().getForms();
        this.renderResult += '<table border=1><tr><td>ID</td><td>Nazwa</td><td>Wypełnij</td></tr>';
        for (var i = 0; i < this.allForms.length; i++) {
            this.renderResult += "<tr><td><p id=form-id-" + i + ">" + this.allForms[i] + "</p></td><td>" + this.getFormName(this.allForms[i]) + "</td><td><a href=\"./new-document.html?id=" + this.allForms[i] + "\">Wype\u0142nij</a></td></tr>";
        }
        this.renderResult += '</table>';
        document.getElementById('form-list').innerHTML = this.renderResult; // Rendering list
    };
    return FormCreator;
}());
exports.FormCreator = FormCreator;
},{"../Enumerators/fieldType":3,"./fields":5,"./form":6,"./locStorage":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocStorage = void 0;
var LocStorage = /** @class */ (function () {
    function LocStorage() {
        this.allDocuments = []; // Contains all saved documents (document ID in string array)
        this.allForms = []; // Contains all forms
        if (!(localStorage.getItem('allDocuments'))) {
            localStorage.setItem('allDocuments', '');
        }
        if (localStorage.getItem("allDocuments").length < 1) {
            this.allDocuments = [];
        }
        else {
            this.allDocuments = JSON.parse(localStorage.getItem("allDocuments"));
        }
        if (!(localStorage.getItem('allForms'))) {
            localStorage.setItem('allForms', '');
        }
        if (localStorage.getItem("allForms").length < 1) {
            this.allForms = [];
        }
        else {
            this.allForms = JSON.parse(localStorage.getItem("allForms"));
        }
    }
    LocStorage.prototype.saveDocument = function (fieldsValue) {
        if (!(localStorage.getItem('allDocuments'))) {
            localStorage.setItem('allDocuments', '');
            this.allDocuments = [];
        }
        var idDocument;
        var timestamp = Date.now();
        idDocument = timestamp.toString();
        localStorage.setItem(idDocument, JSON.stringify(fieldsValue));
        this.allDocuments.push(idDocument);
        localStorage.setItem("allDocuments", JSON.stringify(this.allDocuments));
        return idDocument;
    };
    LocStorage.prototype.loadDocument = function (idDocument) {
        var docValues;
        docValues = JSON.parse(localStorage.getItem(idDocument));
        return docValues;
    };
    LocStorage.prototype.getDocuments = function () {
        var idDocTab = JSON.parse(localStorage.getItem("allDocuments"));
        return idDocTab;
    };
    LocStorage.prototype.removeDocument = function (id) {
        localStorage.removeItem("" + id);
        var allDocumentsTab = JSON.parse(localStorage.getItem("allDocuments"));
        var index = allDocumentsTab.indexOf(id);
        if (index > -1) {
            allDocumentsTab.splice(index, 1);
        }
        localStorage.setItem("allDocuments", JSON.stringify(allDocumentsTab));
        window.location.reload();
    };
    LocStorage.prototype.saveForm = function (name, fieldsTab) {
        if (!(localStorage.getItem('allForms'))) {
            localStorage.setItem('allForms', '');
            this.allForms = [];
        }
        var idForm;
        var timestamp = Date.now();
        var idFormName;
        idForm = timestamp.toString();
        idFormName = timestamp.toString() + "name";
        localStorage.setItem(idForm, JSON.stringify(fieldsTab));
        localStorage.setItem(idFormName, JSON.stringify(name));
        this.allForms.push(idForm);
        localStorage.setItem("allForms", JSON.stringify(this.allForms));
        return idForm;
    };
    LocStorage.prototype.loadForm = function (idForm) {
        var formFields;
        formFields = JSON.parse(localStorage.getItem(idForm));
        return formFields;
    };
    LocStorage.prototype.getForms = function () {
        var idFormTab = JSON.parse(localStorage.getItem("allForms"));
        return idFormTab;
    };
    LocStorage.prototype.removeForm = function (id) {
        localStorage.removeItem("" + id);
        var allFormsTab = JSON.parse(localStorage.getItem("allForms"));
        var index = allFormsTab.indexOf(id);
        if (index > -1) {
            allFormsTab.splice(index, 1);
        }
        localStorage.setItem("allForms", JSON.stringify(allFormsTab));
        window.location.reload();
    };
    return LocStorage;
}());
exports.LocStorage = LocStorage;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.getParam = function () {
        var query = window.location.search.substr(1);
        var urlParams = new URLSearchParams(query);
        var id = urlParams.get('id');
        return id;
    };
    return Router;
}());
exports.Router = Router;
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLnRzIiwic3JjL2luZGV4LnRzIiwic3JjL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlLnRzIiwic3JjL3NjcmlwdHMvY2xhc3Nlcy9kb2N1bWVudExpc3QudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2ZpZWxkcy50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvZm9ybS50cyIsInNyYy9zY3JpcHRzL2NsYXNzZXMvZm9ybUNyZWF0b3IudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL2xvY1N0b3JhZ2UudHMiLCJzcmMvc2NyaXB0cy9jbGFzc2VzL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0lBLCtDQUE4QztBQUU5QywrREFBOEQ7QUFDOUQsbURBQWtEO0FBQ2xELDZEQUE0RDtBQUc1RDtJQUVJO1FBQ0ksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFakMsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRSxDQUFDLENBQUMsRUFBRztZQUN4RixJQUFJLHlCQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUUvQjtRQUNELG9CQUFvQjtRQUNwQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUUsQ0FBQyxDQUFDLEVBQUc7WUFDaEcsSUFBSSxZQUFZLEdBQWlCLElBQUksMkJBQVksRUFBRSxDQUFDO1lBQ3BELFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN6QjtRQUNELG9CQUFvQjtRQUNwQixJQUFJLFFBQVEs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LENBckdBLEFBcUdDLElBQUE7QUFyR1ksZ0NBQVU7Ozs7O0FDSnZCO0lBQUE7SUFTQSxDQUFDO0lBUFUsZUFBUSxHQUFmO1FBQ0ksSUFBTSxLQUFLLEdBQVcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQU0sU0FBUyxHQUFvQixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxJQUFNLEVBQUUsR0FBVyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLHdCQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL3NjcmlwdHMvSW50ZXJmYWNlcy9maWVsZCc7XHJcbmltcG9ydCB7IERhdGFTdG9yYWdlIH0gZnJvbSBcIi4vc2NyaXB0cy9JbnRlcmZhY2VzL2RhdGFTdG9yYWdlXCI7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gXCIuL3NjcmlwdHMvRW51bWVyYXRvcnMvZmllbGRUeXBlXCI7XHJcbmltcG9ydCB7IElucHV0RmllbGQsIFRleHRBcmVhRmllbGQsIERhdGVGaWVsZCwgRW1haWxGaWVsZCwgU2VsZWN0ZWRGaWVsZCwgQ2hlY2tib3hGaWVsZCB9IGZyb20gJy4vc2NyaXB0cy9jbGFzc2VzL2ZpZWxkcyc7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tIFwiLi9zY3JpcHRzL2NsYXNzZXMvZm9ybVwiO1xyXG5pbXBvcnQgeyBMb2NTdG9yYWdlIH0gZnJvbSBcIi4vc2NyaXB0cy9jbGFzc2VzL2xvY1N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgRG9jdW1lbnRMaXN0IH0gZnJvbSAnLi9zY3JpcHRzL2NsYXNzZXMvZG9jdW1lbnRMaXN0JztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NsYXNzZXMvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybUNyZWF0b3IgfSBmcm9tICcuL3NjcmlwdHMvY2xhc3Nlcy9mb3JtQ3JlYXRvcic7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB2YXIgcCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuXHJcbiAgICAgICAgLy8gaW5kZXguaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2luZGV4JykgPi0xICkge1xyXG4gICAgICAgICAgICBuZXcgRm9ybUNyZWF0b3IoKS5uZXdGb3JtKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2RvY3VtZW50LWxpc3QuaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2RvY3VtZW50LWxpc3QnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIGxldCBkb2N1bWVudExpc3Q6IERvY3VtZW50TGlzdCA9IG5ldyBEb2N1bWVudExpc3QoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnRMaXN0LnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBuZXctZG9jdW1lbnQuaHRtbFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ25ldy1kb2N1bWVudCcpID4tMSApIHtcclxuICAgICAgICAgICAgLy9uZXcgRm9ybUNyZWF0b3IoKS5yZW5kZXJGb3JtTGlzdCgpO1xyXG4gICAgICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IFJvdXRlci5nZXRQYXJhbSgpO1xyXG4gICAgICAgICAgICBsZXQgZ290dGVuRm9ybTogYW55ID0gbmV3IEZvcm1DcmVhdG9yKCkuZ2V0Rm9ybShpZCk7XHJcbiAgICAgICAgICAgIGxldCBmb3JtOiBGb3JtID0gbmV3IEZvcm0oJ25hbWUnLCBnb3R0ZW5Gb3JtKTtcclxuICAgICAgICAgICAgZm9ybS5yZW5kZXIoaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlZGl0LWRvY3VtZW50Lmh0bWxcclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCdlZGl0LWRvY3VtZW50JykgPi0xICkge1xyXG4gICAgICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IFJvdXRlci5nZXRQYXJhbSgpO1xyXG4gICAgICAgICAgICBsZXQgZG9jdW1lbnQ6IGFueSA9IG5ldyBEb2N1bWVudExpc3QoKS5nZXREb2N1bWVudChpZCk7XHJcbiAgICAgICAgICAgIGxldCBmb3JtOiBGb3JtID0gbmV3IEZvcm0oJ25hbWUnLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIGZvcm0ucmVuZGVyKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZm9ybS1saXN0Lmh0bWxcclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCdmb3JtLWxpc3QnKSA+LTEgKSB7XHJcbiAgICAgICAgICAgIG5ldyBGb3JtQ3JlYXRvcigpLnJlbmRlckZvcm1MaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICIsImltcG9ydCB7IEFwcCB9IGZyb20gJy4vYXBwJztcclxuXHJcbm5ldyBBcHAoKTtcclxuIiwiZXhwb3J0IGVudW0gRmllbGRUeXBlIHtcclxuICAgIElucHV0LFxyXG4gICAgVGV4dEFyZWEsXHJcbiAgICBEYXRlLFxyXG4gICAgRW1haWwsXHJcbiAgICBTZWxlY3RGaWVsZCxcclxuICAgIENoZWNrQm94XHJcbn0iLCJpbXBvcnQgeyBMb2NTdG9yYWdlIH0gZnJvbSBcIi4vbG9jU3RvcmFnZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERvY3VtZW50TGlzdCB7XHJcbiAgICBhbGxEb2N1bWVudHM6IEFycmF5PHN0cmluZz47XHJcbiAgICByZW5kZXJSZXN1bHQ6IHN0cmluZyA9ICcnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgaWYoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsRG9jdW1lbnRzJykpKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbERvY3VtZW50cycsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbERvY3VtZW50c2ApLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLmFsbERvY3VtZW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmdldERvY3VtZW50TGlzdCgpO1xyXG4gICAgICAgICAgICAvL3RoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldERvY3VtZW50TGlzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFsbERvY3VtZW50cyA9IG5ldyBMb2NTdG9yYWdlKCkuZ2V0RG9jdW1lbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBhbGxEb2NzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5hbGxEb2N1bWVudHM7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgPSAnPGgxPkxpc3RhIGRva3VtZW50w7N3PC9oMT4nO1xyXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnRMaXN0KCk7XHJcbiAgICAgICAgbGV0IHJlbW92ZUJ1dHRvbnM6IEFycmF5PEVsZW1lbnQ+ID0gWyxdO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSAnPHRhYmxlIGJvcmRlcj0xPjx0cj48dGQ+aWQ8L3RkPjx0ZD5FZHl0dWo8L3RkPjx0ZD5Vc3XFhDwvdGQ+PC90cj4nO1xyXG4gICAgICAgIGZvcih2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhpcy5hbGxEb2N1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHQgKz0gYDx0cj48dGQ+PHAgaWQ9ZG9jLWlkLSR7aX0+JHt0aGlzLmFsbERvY3VtZW50c1tpXX08L3A+PC90ZD48dGQ+PGEgaHJlZj1cIi4vZWRpdC1kb2N1bWVudC5odG1sP2lkPSR7dGhpcy5hbGxEb2N1bWVudHNbaV19XCI+RWR5dHVqPC9hPjwvdGQ+PHRkPjxpbnB1dCBpZD1idG4tcmVtb3ZlLWRvYy0ke2FsbERvY3NbaV19IHR5cGU9YnV0dG9uIHZhbHVlPVVzdcWEPjwvdGQ+PC90cj5gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyUmVzdWx0ICs9ICc8L3RhYmxlPidcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvY3VtZW50LWxpc3QnKS5pbm5lckhUTUwgPSB0aGlzLnJlbmRlclJlc3VsdDsgLy8gUmVuZGVyaW5nIGxpc3RcclxuXHJcbiAgICAgICAgLy8gQWRkaW5nIGNsaWNrIGV2ZW50cyB0byByZW1vdmUgYnV0dG9uc1xyXG4gICAgICAgIGZvcihsZXQgajogbnVtYmVyID0gMDsgajwgYWxsRG9jcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgIHJlbW92ZUJ1dHRvbnNbal0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuLXJlbW92ZS1kb2MtJHthbGxEb2NzW2pdfWApO1xyXG4gICAgICAgICAgICBpZihyZW1vdmVCdXR0b25zW2pdKXtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUJ1dHRvbnNbal0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBEb2N1bWVudExpc3QoKS5yZW1vdmVEb2N1bWVudChhbGxEb2NzW2pdKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RG9jdW1lbnQoaWQ6IHN0cmluZyk6IGFueXtcclxuICAgICAgICBsZXQgZG9jOiBhbnkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2lkfWApKTtcclxuICAgICAgICByZXR1cm4gZG9jO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZURvY3VtZW50KGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtpZH1gKTtcclxuICAgICAgICBsZXQgYWxsRG9jdW1lbnRzVGFiOiBBcnJheTxzdHJpbmc+ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkpO1xyXG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gYWxsRG9jdW1lbnRzVGFiLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGFsbERvY3VtZW50c1RhYi5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGFsbERvY3VtZW50c2AsIEpTT04uc3RyaW5naWZ5KGFsbERvY3VtZW50c1RhYikpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSBcIi4uL0ludGVyZmFjZXMvZmllbGRcIjtcclxuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSBcIi4uL0VudW1lcmF0b3JzL2ZpZWxkVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIElucHV0RmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dEFyZWFGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlRmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogRmllbGRUeXBlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWxGaWVsZCBpbXBsZW1lbnRzIEZpZWxke1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGZpZWxkVHlwZTogRmllbGRUeXBlO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RlZEZpZWxkIGltcGxlbWVudHMgRmllbGR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZmllbGRUeXBlOiBGaWVsZFR5cGU7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgb3B0aW9uczogQXJyYXk8c3RyaW5nPjtcclxuICAgIHJlbmRlcjogKCkgPT4gSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRWYWx1ZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgZmllbGRUeXBlOiBGaWVsZFR5cGUsIHZhbHVlOiBzdHJpbmcsIG9wdGlvbnM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLmZpZWxkVHlwZSA9IGZpZWxkVHlwZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrYm94RmllbGQgaW1wbGVtZW50cyBGaWVsZHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICByZW5kZXI6ICgpID0+IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMuZmllbGRUeXBlID0gZmllbGRUeXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vSW50ZXJmYWNlcy9maWVsZCc7XHJcbmltcG9ydCB7IExvY1N0b3JhZ2UgfSBmcm9tICcuL2xvY1N0b3JhZ2UnO1xyXG5pbXBvcnQgeyBEb2N1bWVudExpc3QgfSBmcm9tICcuL2RvY3VtZW50TGlzdCc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJy4vcm91dGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3Jte1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZmllbGRUYWI6IEFycmF5PEZpZWxkPjtcclxuICAgIHJlc3VsdDogc3RyaW5nID0gJyAnOyAvLyByZW5kZXIgcmVzdWx0XHJcbiAgICBnZXRWYWx1ZVJlc3VsdDogc3RyaW5nID0gJyAnO1xyXG4gICAgSUQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZTogc3RyaW5nLCBmaWVsZFRhYjogQXJyYXk8RmllbGQ+KSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmZpZWxkVGFiID0gZmllbGRUYWI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsdWUoKTogdm9pZHtcclxuICAgICAgICBmb3IobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmZpZWxkVGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JyR7dGhpcy5maWVsZFRhYltpXS5uYW1lfSddYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHRleHRhcmVhW25hbWU9JyR7dGhpcy5maWVsZFRhYltpXS5uYW1lfSddYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JyR7dGhpcy5maWVsZFRhYltpXS5uYW1lfSddYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JyR7dGhpcy5maWVsZFRhYltpXS5uYW1lfSddYCkpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNlbGVjdFtuYW1lPScke3RoaXMuZmllbGRUYWJbaV0ubmFtZX0nXWApKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLmZpZWxkVHlwZSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgaWYoKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9JyR7dGhpcy5maWVsZFRhYltpXS5uYW1lfSddYCkpLmNoZWNrZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IFwiVGFrXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IFwiTmllXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRUYWJbaV0udmFsdWUgPSBpbnB1dFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihkb2N1bWVudElkPzogc3RyaW5nKTogdm9pZHtcclxuICAgICAgICB0aGlzLnJlc3VsdCArPSBgPGZvcm0gbmFtZT0ke3RoaXMubmFtZX0+IDx0YWJsZT5gO1xyXG4gICAgICAgIGxldCBmaWVsZFRhYjogQXJyYXk8RmllbGQ+ID0gdGhpcy5maWVsZFRhYjtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5maWVsZFRhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgSW5wdXQsICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgIFRleHRBcmVhLCAgICAgICAxXHJcbiAgICAgICAgICAgICAgICBEYXRlLCAgICAgICAgICAgMlxyXG4gICAgICAgICAgICAgICAgRW1haWwsICAgICAgICAgIDNcclxuICAgICAgICAgICAgICAgIFNlbGVjdEZpZWxkLCAgICA0XHJcbiAgICAgICAgICAgICAgICBDaGVja0JveCAgICAgICAgNVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZmllbGRUYWJbaV0uZmllbGRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDx0cj48dGQ+PHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTo8L3A+IDwvdGQ+PHRkPjxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJ0ZXh0XCIsIHZhbHVlPVwiJHt0aGlzLmZpZWxkVGFiW2ldLnZhbHVlfVwiPjwvdGQ+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHRyPjx0ZD48cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OjwvcD48L3RkPiA8dGQ+PHRleHRhcmVhIG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIj4ke3RoaXMuZmllbGRUYWJbaV0udmFsdWV9PC90ZXh0YXJlYT48L3RkPjwvdHI+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHRyPjx0ZD48cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OjwvcD48L3RkPiA8dGQ+PGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cImRhdGVcIiwgdmFsdWU9XCIke3RoaXMuZmllbGRUYWJbaV0udmFsdWV9XCI+PC90ZD48L3RyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDx0cj48dGQ+PHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTo8L3A+PC90ZD4gPHRkPjxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJlbWFpbFwiLCB2YWx1ZT1cIiR7dGhpcy5maWVsZFRhYltpXS52YWx1ZX1cIj48L3RkPjwvdHI+YDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHRyPjx0ZD48cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8L3A+PC90ZD48dGQ+PHNlbGVjdCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIgPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuZmllbGRUYWJbaV0ub3B0aW9ucy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmZpZWxkVGFiW2ldLnZhbHVlID09IHRoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ICs9IGA8b3B0aW9uIGlkPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm9wdGlvbnNbal19XCIgc2VsZWN0ZWQ+JHt0aGlzLmZpZWxkVGFiW2ldLm9wdGlvbnNbal19PC9vcHRpb24+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDxvcHRpb24gaWQ9XCIke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX1cIj4ke3RoaXMuZmllbGRUYWJbaV0ub3B0aW9uc1tqXX08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPC9zZWxlY3Q+PC90ZD48L3RyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5maWVsZFRhYltpXS52YWx1ZSA9PSBcIlRha1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHRyPjx0ZD48cD4ke3RoaXMuZmllbGRUYWJbaV0ubGFiZWx9OiA8L3A+PC90ZD48dGQ+PGlucHV0IG5hbWU9XCIke3RoaXMuZmllbGRUYWJbaV0ubmFtZX1cIiwgdHlwZT1cImNoZWNrYm94XCJjaGVja2VkPjwvdGQ+PC90cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgKz0gYDx0cj48dGQ+PHA+JHt0aGlzLmZpZWxkVGFiW2ldLmxhYmVsfTo8L3A+PC90ZD4gPHRkPjxpbnB1dCBuYW1lPVwiJHt0aGlzLmZpZWxkVGFiW2ldLm5hbWV9XCIsIHR5cGU9XCJjaGVja2JveFwiPjwvdGQ+PC90cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlc3VsdCArPSBgPHRyPjx0ZD48aW5wdXQgaWQ9XCJidG4tYmFjay1mb3JtXCIgdmFsdWU9XCJXc3RlY3pcIiB0eXBlPVwiYnV0dG9uXCI+PC90ZD48dGQ+PGlucHV0IGlkPVwiYnRuLXNhdmUtZm9ybVwiIHZhbHVlPVwiWmFwaXN6XCIgdHlwZT1cImJ1dHRvblwiPjwvdGQ+PC90cj5gO1xyXG4gICAgICAgIHRoaXMucmVzdWx0ICs9IFwiPC90YWJsZT48L2Zvcm0+XCI7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtJykuaW5uZXJIVE1MID0gdGhpcy5yZXN1bHQ7XHJcblxyXG4gICAgICAgIGxldCBidG5CYWNrRm9ybTogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tYmFjay1mb3JtJyk7XHJcbiAgICAgICAgbGV0IGJ0blNhdmVGb3JtOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1zYXZlLWZvcm0nKTtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLycgfHwgZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignbmV3LWRvY3VtZW50JykgPi0xICkge1xyXG4gICAgICAgICAgICBidG5CYWNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL2luZGV4Lmh0bWxcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgYnRuU2F2ZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybTogRm9ybSA9IG5ldyBGb3JtKCduYW1lJywgZmllbGRUYWIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBidG5CYWNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL2RvY3VtZW50LWxpc3QuaHRtbFwiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICBidG5TYXZlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCBpZDogc3RyaW5nID0gUm91dGVyLmdldFBhcmFtKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybTogRm9ybSA9IG5ldyBGb3JtKCduYW1lJywgZmllbGRUYWIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zYXZlRWRpdGVkRm9ybShkb2N1bWVudElkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzYXZlKCk6IHZvaWR7XHJcbiAgICAgICAgbGV0IGRvYzogTG9jU3RvcmFnZSA9IG5ldyBMb2NTdG9yYWdlKCk7XHJcbiAgICAgICAgZG9jLnNhdmVEb2N1bWVudCh0aGlzLmZpZWxkVGFiKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnRG9jdW1lbnQgaGFzIGJlZW4gc2F2ZWQnKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9pbmRleC5odG1sXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUVkaXRlZEZvcm0oZG9jdW1lbnRJZDogc3RyaW5nKTogdm9pZHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtkb2N1bWVudElkfWAsIEpTT04uc3RyaW5naWZ5KHRoaXMuZmllbGRUYWIpKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9kb2N1bWVudC1saXN0Lmh0bWxcIjtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vSW50ZXJmYWNlcy9maWVsZCc7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gXCIuLi9FbnVtZXJhdG9ycy9maWVsZFR5cGVcIjtcclxuaW1wb3J0IHsgSW5wdXRGaWVsZCwgVGV4dEFyZWFGaWVsZCwgRGF0ZUZpZWxkLCBFbWFpbEZpZWxkLCBTZWxlY3RlZEZpZWxkLCBDaGVja2JveEZpZWxkIH0gZnJvbSAnLi9maWVsZHMnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcclxuaW1wb3J0IHsgTG9jU3RvcmFnZSB9IGZyb20gJy4vbG9jU3RvcmFnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybUNyZWF0b3Ige1xyXG4gICAgYWxsRm9ybXM6IEFycmF5PHN0cmluZz47XHJcbiAgICByZW5kZXJSZXN1bHQ6IHN0cmluZyA9ICcnO1xyXG5cclxuICAgIG5ld0Zvcm0oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZHNUYWI6IEFycmF5PEZpZWxkPiA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgZmllbGRUeXBlVGFiOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBgPHRhYmxlPlxyXG4gICAgICAgICAgICA8Zm9ybSBuYW1lPWZvcm0tY3JlYXRvcj5cclxuICAgICAgICAgICAgPHRyPjx0ZD5OYXp3YSBmb3JtdWxhcnphOiA8L3RkPjx0ZD48aW5wdXQgdHlwZT0ndGV4dCcgaWQ9Zm9ybS1jcmVhdG9yLWZvcm1uYW1lPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0ZD5FdHlraWV0YTogPC90ZD4gPHRkPjxpbnB1dCB0eXBlPXRleHQgbmFtZT1maWVsZC1sYWJlbD48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgIDx0cj48dGQ+VHlwIHBvbGE6IDwvdGQ+IDx0ZD48c2VsZWN0IGlkPWZvcm0tY3JlYXRvci1zZWxlY3QgbmFtZT1maWVsZC10eXBlPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbj5Qb2xlIGplZG5vbGluaWprb3dlPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uPlBvbGUgdGVrc3Rvd2U8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24+RGF0YTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbj5FLW1haWw8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gaWQ9c2VsZWN0ZWQtZmllbGQtY3JlYXRvcj5MaXN0YSByb3p3aWphbmE8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24+Q2hlY2tib3g8L29wdGlvbj5cclxuICAgICAgICAgICAgPC9zZWxlY3Q+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRkPk5hendhOiA8L3RkPjx0ZD48aW5wdXQgdHlwZT10ZXh0IG5hbWU9ZmllbGQtbmFtZT48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgICAgICA8dHI+PHRkIGNvbHNwYW49Mj48ZGl2IGlkPWZvcm0tY3JlYXRvci1vcHRpb25zPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9Zm9ybS1jcmVhdG9yLW9wdGlvbnMtcXVhbnRpdHk+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1mb3JtLWNyZWF0b3Itb3B0aW9ucy1vcHRpb25zPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9Zm9ybS1jcmVhdG9yLW9wdGlvbnMtZXJyb3Igc3R5bGU9XCJjb2xvcjogcmVkXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgICAgICA8dHIgaWQ9Zm9ybS1jcmVhdG9yLWRlZmF1bHQtdmFsdWU+PHRkPjxwID5Eb215xZtsbmEgd2FydG/Fm8SHOiA8L3A+PC90ZD48dGQ+PGlucHV0IG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZSB0eXBlPXRleHQ+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICAgICAgPHRyPjx0ZD48cD5MaWN6YmEgb3Bjamk6IDwvcD48L3RkPjx0ZD48aW5wdXQgdHlwZT1udW1iZXIgaWQ9Zm9ybS1jcmVhdG9yLW9wdGlvbnMtcXVhbnRpdHktaW5wdXQgZGlzYWJsZWQ+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICAgICAgPHRyPjx0ZCBjb2xzcGFuPTI+PGlucHV0IHR5cGU9YnV0dG9uIGlkPWJ0bi1mb3JtLWNyZWF0b3Itc3VibWl0IHZhbHVlPURvZGFqPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgPC90YWJsZT5gO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLWNyZWF0b3ItY3JlYXRvcicpLmlubmVySFRNTCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBmb3JtUXVhbnRpdHlPcHRzOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm0tY3JlYXRvci1vcHRpb25zLXF1YW50aXR5YCk7XHJcbiAgICAgICAgICAgIGxldCBmb3JtT3B0aW9uczogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLWNyZWF0b3Itb3B0aW9ucy1vcHRpb25zYCk7XHJcbiAgICAgICAgICAgIGxldCBmb3JtT3B0aW9uc0Vycm9yOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm0tY3JlYXRvci1vcHRpb25zLWVycm9yYCk7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dERlZmF1bHRWYWx1ZTogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLWNyZWF0b3ItZGVmYXVsdC12YWx1ZScpO1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0Rm9ybUNyZWF0b3I6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm0tY3JlYXRvci1zZWxlY3RgKTtcclxuICAgICAgICAgICAgbGV0IGlucHV0UXVhbnRpdHlPcHRzOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm0tY3JlYXRvci1vcHRpb25zLXF1YW50aXR5LWlucHV0YCk7XHJcbiAgICAgICAgICAgIHNlbGVjdEZvcm1DcmVhdG9yLmFkZEV2ZW50TGlzdGVuZXIoYGNoYW5nZWAsIChldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RGVmYXVsdFZhbHVlLmlubmVySFRNTCA9IGA8dHI+PHRkPjxwPkRvbXnFm2xuYSB3YXJ0b8WbxIc6IDwvcD48L3RkPjx0ZD48aW5wdXQgbmFtZT1maWVsZC1kZWZhdWx0LXZhbHVlIHR5cGU9dGV4dD48L3RyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVF1YW50aXR5T3B0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9ucy5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9uc0Vycm9yLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UXVhbnRpdHlPcHRzLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZS5pbm5lckhUTUwgPSBgPHRyPjx0ZD48cD5Eb215xZtsbmEgd2FydG/Fm8SHOjwvcD48L3RkPiA8dGQ+PHRleHRhcmVhIG5hbWU9ZmllbGQtZGVmYXVsdC12YWx1ZT48L3RleHRhcmVhPjwvdGQ+PC90cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1RdWFudGl0eU9wdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnMuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnNFcnJvci5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFF1YW50aXR5T3B0cy5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHNlbGVjdEZvcm1DcmVhdG9yLnNlbGVjdGVkSW5kZXggPT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUuaW5uZXJIVE1MID0gYDx0cj48dGQ+PHA+RG9tecWbbG5hIHdhcnRvxZvEhzogPC9wPjwvdGQ+PHRkPjxpbnB1dCBuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWUgdHlwZT1kYXRlPjwvdGQ+PC90cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1RdWFudGl0eU9wdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnMuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnNFcnJvci5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFF1YW50aXR5T3B0cy5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHNlbGVjdEZvcm1DcmVhdG9yLnNlbGVjdGVkSW5kZXggPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUuaW5uZXJIVE1MID0gYDx0cj48dGQ+PHA+RG9tecWbbG5hIHdhcnRvxZvEhzogPC9wPjwvdGQ+PHRkPjxpbnB1dCBuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWUgdHlwZT1lbWFpbD48L3RkPjwvdHI+YDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtUXVhbnRpdHlPcHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1PcHRpb25zRXJyb3IuaW5uZXJIVE1MID0gYGA7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRRdWFudGl0eU9wdHMuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2Zvcm1RdWFudGl0eU9wdHMuaW5uZXJIVE1MID0gJzx0cj48dGQ+PHA+TGljemJhIG9wY2ppOiA8L3A+PC90ZD48dGQ+PGlucHV0IHR5cGU9bnVtYmVyIGlkPWZvcm0tY3JlYXRvci1vcHRpb25zLXF1YW50aXR5LWlucHV0PjwvdGQ+PC90cj4nO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UXVhbnRpdHlPcHRzLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRRdWFudGl0eU9wdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2hhbmdlYCwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHF1YW50aXR5OiBudW1iZXIgPSBpbnB1dFF1YW50aXR5T3B0cy52YWx1ZSBhcyB1bmtub3duIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nID0gJzx0YWJsZT48dHI+PHRkIGNvbHNwYW49Mj48cD5PcGNqZTo8L3A+PC90ZD48L3RyPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHF1YW50aXR5ID4gMTAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnNFcnJvci50ZXh0Q29udGVudCA9IGBNb8W8bmEgd3licmHEhyBtYWtzeW1hbG5pZSAxMDAgb3BjamkhYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk6IG51bWJlciA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGA8dHI+PHRkPk9wY2phIG5yICR7aSsxfTogPC90ZD48dGQ+PGlucHV0IHR5cGU9dGV4dCBuYW1lPW9wdGlvbiR7aX0+PC90ZD48L3RyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYDwvdGFibGU+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9wdGlvbnMuaW5uZXJIVE1MID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUuaW5uZXJIVE1MID0gYDx0cj48dGQ+PHA+RG9tecWbbG5hIHdhcnRvxZvEhzogPC9wPjwvdGQ+PHRkPjxpbnB1dCBuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWUgdHlwZT10ZXh0IGRpc2FibGVkIHZhbHVlPVwiWmFibG9rb3dhbmEgZnVua2NqYVwiPjwvdGQ+PC90cj5gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RGVmYXVsdFZhbHVlLmlubmVySFRNTCA9IGA8dHI+PHRkPjxwPkRvbXnFm2xuYSB3YXJ0b8WbxIc6IDwvcD48L3RkPjx0ZD48aW5wdXQgbmFtZT1maWVsZC1kZWZhdWx0LXZhbHVlIHR5cGU9Y2hlY2tib3g+PC90ZD48L3RyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVF1YW50aXR5T3B0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9ucy5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtT3B0aW9uc0Vycm9yLmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UXVhbnRpdHlPcHRzLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgbGV0IGJ0bkZvcm1DcmVhdG9yQWRkRmllbGQ6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuLWZvcm0tY3JlYXRvci1zdWJtaXRgKTtcclxuICAgICAgICAgICAgYnRuRm9ybUNyZWF0b3JBZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSAnPGZvcm0+PHRhYmxlPic7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybU5hbWVGaWVsZDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W2lkPWZvcm0tY3JlYXRvci1mb3JtbmFtZV1gKTtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZExhYmVsOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1maWVsZC1sYWJlbF0nKSkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGROYW1lOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1maWVsZC1uYW1lXScpKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZERlZmF1bHRWYWx1ZTogSFRNTElucHV0RWxlbWVudCA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPWZpZWxkLWRlZmF1bHQtdmFsdWVdJykpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRGVmYXVsdFZhbHVlVEE6IEhUTUxJbnB1dEVsZW1lbnQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGV4dGFyZWFbbmFtZT1maWVsZC1kZWZhdWx0LXZhbHVlXScpKTtcclxuICAgICAgICAgICAgICAgIGlmKGZpZWxkTGFiZWwubGVuZ3RoIDwgMSB8fCBmaWVsZE5hbWUubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1V6dXBlxYJuaWogd3N6eXN0a2llIHBvbGEnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybU5hbWVGaWVsZC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZVRhYi5wdXNoKGA8dHI+PHRkPjxwPiR7ZmllbGRMYWJlbH06IDwvcD48L3RkPjx0ZD48aW5wdXQgbmFtZT1cIiR7ZmllbGROYW1lfVwiIHR5cGU9dGV4dCB2YWx1ZT1cIiR7ZmllbGREZWZhdWx0VmFsdWUudmFsdWV9XCI+PC90ZD48L3RyPmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUYWIucHVzaChuZXcgSW5wdXRGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5JbnB1dCwgZmllbGREZWZhdWx0VmFsdWUudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZVRhYi5wdXNoKGA8dHI+PHRkPjxwPiR7ZmllbGRMYWJlbH06PC9wPjwvdGQ+IDx0ZD48dGV4dGFyZWEgbmFtZT0ke2ZpZWxkTmFtZX0+JHtmaWVsZERlZmF1bHRWYWx1ZVRBLnZhbHVlfTwvdGV4dGFyZWE+PC90ZD48L3RyPmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUYWIucHVzaChuZXcgVGV4dEFyZWFGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5UZXh0QXJlYSwgZmllbGREZWZhdWx0VmFsdWVUQS52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlVGFiLnB1c2goYDx0cj48dGQ+PHA+JHtmaWVsZExhYmVsfTo8L3A+PC90ZD4gPHRkPjxpbnB1dCBuYW1lPVwiJHtmaWVsZE5hbWV9XCIgdHlwZT1kYXRlIHZhbHVlPVwiJHtmaWVsZERlZmF1bHRWYWx1ZS52YWx1ZX1cIj48L3RkPjwvdHI+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkc1RhYi5wdXNoKG5ldyBEYXRlRmllbGQoZmllbGROYW1lLCBmaWVsZExhYmVsLCBGaWVsZFR5cGUuRGF0ZSwgZmllbGREZWZhdWx0VmFsdWUudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0Rm9ybUNyZWF0b3Iuc2VsZWN0ZWRJbmRleCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZVRhYi5wdXNoKGA8dHI+PHRkPjxwPiR7ZmllbGRMYWJlbH06PC9wPjwvdGQ+IDx0ZD48aW5wdXQgbmFtZT1cIiR7ZmllbGROYW1lfVwiIHR5cGU9ZW1haWwgdmFsdWU9XCIke2ZpZWxkRGVmYXVsdFZhbHVlLnZhbHVlfVwiPjwvdGQ+PC90cj5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzVGFiLnB1c2gobmV3IEVtYWlsRmllbGQoZmllbGROYW1lLCBmaWVsZExhYmVsLCBGaWVsZFR5cGUuRW1haWwsIGZpZWxkRGVmYXVsdFZhbHVlLnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGVjdEZvcm1DcmVhdG9yLnNlbGVjdGVkSW5kZXggPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSBgPHRyPjx0ZD48cD4ke2ZpZWxkTGFiZWx9OiA8L3A+PC90ZD4gPHRkPjxzZWxlY3QgbmFtZT1cIiR7ZmllbGROYW1lfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dFF1YW50aXR5T3B0czogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLWNyZWF0b3Itb3B0aW9ucy1xdWFudGl0eS1pbnB1dGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk6IG51bWJlciA9IDA7IGkgPCAoaW5wdXRRdWFudGl0eU9wdHMudmFsdWUgYXMgdW5rbm93biBhcyBudW1iZXIpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgPG9wdGlvbj4keyg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPW9wdGlvbiR7aX1dYCkpLnZhbHVlfTwvb3B0aW9uPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaCgoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1vcHRpb24ke2l9XWApKS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYDwvc2VsZWN0PjwvdGQ+PC90cj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZVRhYi5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkc1RhYi5wdXNoKG5ldyBTZWxlY3RlZEZpZWxkKGZpZWxkTmFtZSwgZmllbGRMYWJlbCwgRmllbGRUeXBlLlNlbGVjdEZpZWxkLCBmaWVsZERlZmF1bHRWYWx1ZS52YWx1ZSwgb3B0aW9ucykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxlY3RGb3JtQ3JlYXRvci5zZWxlY3RlZEluZGV4ID09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmllbGREZWZhdWx0VmFsdWUuY2hlY2tlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGVUYWIucHVzaChgPHRyPjx0ZD48cD4ke2ZpZWxkTGFiZWx9OjwvcD48L3RkPiA8dGQ+PGlucHV0IG5hbWU9XCIke2ZpZWxkTmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPjwvdGQ+PC90cj5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkc1RhYi5wdXNoKG5ldyBDaGVja2JveEZpZWxkKGZpZWxkTmFtZSwgZmllbGRMYWJlbCwgRmllbGRUeXBlLkNoZWNrQm94LCBcIlRha1wiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGVUYWIucHVzaChgPHRyPjx0ZD48cD4ke2ZpZWxkTGFiZWx9OjwvcD48L3RkPiA8dGQ+PGlucHV0IG5hbWU9XCIke2ZpZWxkTmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcIj48L3RkPjwvdHI+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUYWIucHVzaChuZXcgQ2hlY2tib3hGaWVsZChmaWVsZE5hbWUsIGZpZWxkTGFiZWwsIEZpZWxkVHlwZS5DaGVja0JveCwgXCJOaWVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpOiBudW1iZXIgPSAwOyBpPGZpZWxkVHlwZVRhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGZpZWxkVHlwZVRhYltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgPHRyPjx0ZCBjb2xzcGFuPTI+PGlucHV0IHR5cGU9YnV0dG9uIGlkPSdidG4tZm9ybWNyZWF0b3Itc2F2ZS1mb3JtJyB2YWx1ZT0nWmFwaXN6IGZvcm11bGFyeic+PC90ZD48L3RyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgPC90YWJsZT48L2Zvcm0+YDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLWNyZWF0b3Itdmlld2ApLmlubmVySFRNTCA9IHJlc3VsdDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidG5Gb3JtQ3JlYXRvclNhdmVGb3JtOiBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi1mb3JtY3JlYXRvci1zYXZlLWZvcm1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgYnRuRm9ybUNyZWF0b3JTYXZlRm9ybS5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCl7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbaWQ9Zm9ybS1jcmVhdG9yLWZvcm1uYW1lXWApKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm06IEZvcm0gPSBuZXcgRm9ybShuYW1lLCBmaWVsZHNUYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZvcm1DcmVhdG9yKCkuc2F2ZUZvcm0oZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9pbmRleC5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzYXZlRm9ybShmb3JtOiBGb3JtKTogdm9pZHtcclxuICAgICAgICBuZXcgTG9jU3RvcmFnZSgpLnNhdmVGb3JtKGZvcm0ubmFtZSwgZm9ybS5maWVsZFRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Rm9ybShpZDogc3RyaW5nKTogdm9pZHtcclxuICAgICAgICBsZXQgZm9ybTogYW55ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtpZH1gKSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Rm9ybU5hbWUoaWQ6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgZm9ybU5hbWU6IHN0cmluZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7aWR9YCArICduYW1lJykpO1xyXG4gICAgICAgIHJldHVybiBmb3JtTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb3JtTGlzdCgpOiB2b2lke1xyXG4gICAgICAgIHRoaXMucmVuZGVyUmVzdWx0ID0gJzxoMT5MaXN0YSBmb3JtdWxhcnp5PC9oMT48YnI+JztcclxuICAgICAgICB0aGlzLmFsbEZvcm1zID0gbmV3IExvY1N0b3JhZ2UoKS5nZXRGb3JtcygpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSAnPHRhYmxlIGJvcmRlcj0xPjx0cj48dGQ+SUQ8L3RkPjx0ZD5OYXp3YTwvdGQ+PHRkPld5cGXFgm5pajwvdGQ+PC90cj4nO1xyXG4gICAgICAgIGZvcih2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhpcy5hbGxGb3Jtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSBgPHRyPjx0ZD48cCBpZD1mb3JtLWlkLSR7aX0+JHt0aGlzLmFsbEZvcm1zW2ldfTwvcD48L3RkPjx0ZD4ke3RoaXMuZ2V0Rm9ybU5hbWUodGhpcy5hbGxGb3Jtc1tpXSl9PC90ZD48dGQ+PGEgaHJlZj1cIi4vbmV3LWRvY3VtZW50Lmh0bWw/aWQ9JHt0aGlzLmFsbEZvcm1zW2ldfVwiPld5cGXFgm5pajwvYT48L3RkPjwvdHI+YFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlclJlc3VsdCArPSAnPC90YWJsZT4nXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLWxpc3QnKS5pbm5lckhUTUwgPSB0aGlzLnJlbmRlclJlc3VsdDsgLy8gUmVuZGVyaW5nIGxpc3RcclxuICAgIH1cclxufSIsImltcG9ydCB7IERhdGFTdG9yYWdlIH0gZnJvbSBcIi4uL0ludGVyZmFjZXMvZGF0YVN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gXCIuL2Zvcm1cIjtcclxuaW1wb3J0IHsgRmllbGQgfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9maWVsZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExvY1N0b3JhZ2UgaW1wbGVtZW50cyBEYXRhU3RvcmFnZSB7XHJcbiAgICBhbGxEb2N1bWVudHM6IEFycmF5PHN0cmluZz4gPSBbXTsgICAgLy8gQ29udGFpbnMgYWxsIHNhdmVkIGRvY3VtZW50cyAoZG9jdW1lbnQgSUQgaW4gc3RyaW5nIGFycmF5KVxyXG4gICAgYWxsRm9ybXM6IEFycmF5PHN0cmluZz4gPSBbXTsgLy8gQ29udGFpbnMgYWxsIGZvcm1zXHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxEb2N1bWVudHMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRG9jdW1lbnRzJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRG9jdW1lbnRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsRm9ybXMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRm9ybXMnLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxGb3Jtc2ApLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLmFsbEZvcm1zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRm9ybXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxGb3Jtc2ApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVEb2N1bWVudChmaWVsZHNWYWx1ZTogYW55KXtcclxuICAgICAgICBpZighKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxEb2N1bWVudHMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRG9jdW1lbnRzJywgJycpO1xyXG4gICAgICAgICAgICB0aGlzLmFsbERvY3VtZW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWREb2N1bWVudDogc3RyaW5nO1xyXG4gICAgICAgIGxldCB0aW1lc3RhbXA6IG51bWJlciA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWREb2N1bWVudCA9IHRpbWVzdGFtcC50b1N0cmluZygpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGlkRG9jdW1lbnQsIEpTT04uc3RyaW5naWZ5KGZpZWxkc1ZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5hbGxEb2N1bWVudHMucHVzaChpZERvY3VtZW50KTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYWxsRG9jdW1lbnRzYCwgSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxEb2N1bWVudHMpKTtcclxuICAgICAgICByZXR1cm4gaWREb2N1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRG9jdW1lbnQoaWREb2N1bWVudDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgZG9jVmFsdWVzOiBBcnJheTxvYmplY3Q+O1xyXG4gICAgICAgIGRvY1ZhbHVlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oaWREb2N1bWVudCkpO1xyXG4gICAgICAgIHJldHVybiBkb2NWYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERvY3VtZW50cygpe1xyXG4gICAgICAgIGxldCBpZERvY1RhYjogQXJyYXk8c3RyaW5nPiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGFsbERvY3VtZW50c2ApKTtcclxuICAgICAgICByZXR1cm4gaWREb2NUYWI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZURvY3VtZW50KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtpZH1gKTtcclxuICAgICAgICBsZXQgYWxsRG9jdW1lbnRzVGFiOiBBcnJheTxzdHJpbmc+ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYWxsRG9jdW1lbnRzYCkpO1xyXG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gYWxsRG9jdW1lbnRzVGFiLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGFsbERvY3VtZW50c1RhYi5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGFsbERvY3VtZW50c2AsIEpTT04uc3RyaW5naWZ5KGFsbERvY3VtZW50c1RhYikpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZUZvcm0obmFtZTogc3RyaW5nLCBmaWVsZHNUYWI6IGFueSl7XHJcbiAgICAgICAgaWYoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsRm9ybXMnKSkpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRm9ybXMnLCAnJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRm9ybXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkRm9ybTogc3RyaW5nO1xyXG4gICAgICAgIGxldCB0aW1lc3RhbXA6IG51bWJlciA9IERhdGUubm93KCk7XHJcbiAgICAgICAgbGV0IGlkRm9ybU5hbWU6IHN0cmluZztcclxuICAgICAgICBpZEZvcm0gPSB0aW1lc3RhbXAudG9TdHJpbmcoKTtcclxuICAgICAgICBpZEZvcm1OYW1lID0gdGltZXN0YW1wLnRvU3RyaW5nKCkgKyBgbmFtZWA7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaWRGb3JtLCBKU09OLnN0cmluZ2lmeShmaWVsZHNUYWIpKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpZEZvcm1OYW1lLCBKU09OLnN0cmluZ2lmeShuYW1lKSk7XHJcbiAgICAgICAgdGhpcy5hbGxGb3Jtcy5wdXNoKGlkRm9ybSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGFsbEZvcm1zYCwgSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxGb3JtcykpO1xyXG4gICAgICAgIHJldHVybiBpZEZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEZvcm0oaWRGb3JtOiBzdHJpbmcpOiBBcnJheTxvYmplY3Q+e1xyXG4gICAgICAgIGxldCBmb3JtRmllbGRzOiBBcnJheTxvYmplY3Q+O1xyXG4gICAgICAgIGZvcm1GaWVsZHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGlkRm9ybSkpO1xyXG4gICAgICAgIHJldHVybiBmb3JtRmllbGRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRGb3JtcygpOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIGxldCBpZEZvcm1UYWI6IEFycmF5PHN0cmluZz4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxGb3Jtc2ApKTtcclxuICAgICAgICByZXR1cm4gaWRGb3JtVGFiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW1vdmVGb3JtKGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtpZH1gKTtcclxuICAgICAgICBsZXQgYWxsRm9ybXNUYWI6IEFycmF5PHN0cmluZz4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhbGxGb3Jtc2ApKTtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IGFsbEZvcm1zVGFiLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGFsbEZvcm1zVGFiLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYWxsRm9ybXNgLCBKU09OLnN0cmluZ2lmeShhbGxGb3Jtc1RhYikpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH1cclxuICAgIFxyXG59IiwiZXhwb3J0IGNsYXNzIFJvdXRlciB7XHJcblxyXG4gICAgc3RhdGljIGdldFBhcmFtKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcXVlcnk6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpO1xyXG4gICAgICAgIGNvbnN0IHVybFBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeSk7IFxyXG4gICAgICAgIGNvbnN0IGlkOiBzdHJpbmcgPSB1cmxQYXJhbXMuZ2V0KCdpZCcpO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuXHJcbn0iXX0=
