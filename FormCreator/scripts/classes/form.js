"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
var Form = /** @class */ (function () {
    function Form(fieldTab) {
        this.result = ' '; // render result
        this.getValueResult = ' ';
        this.fieldTab = fieldTab;
    }
    /*
    constructor (inputField: InputField, textAreaField: TextAreaField, dateField: DateField, emailField: EmailField, selectedField: SelectedField, checkboxField: CheckboxField){
        this.fieldTab[0] = inputField;
        this.fieldTab[1] = textAreaField;
        this.fieldTab[2] = dateField;
        this.fieldTab[3] = emailField;
        this.fieldTab[4] = selectedField;
        this.fieldTab[5] = checkboxField;
    }
    */
    Form.prototype.getValue = function () {
        for (var i = 0; i < this.fieldTab.length; i++) {
            var inputValue = void 0;
            if (this.fieldTab[i].fieldType === 0) {
                inputValue = document.querySelector("input[name=" + this.fieldTab[i].name + "]").value;
            }
            if (this.fieldTab[i].fieldType === 1) {
                inputValue = document.querySelector("textarea[name=" + this.fieldTab[i].name + "]").value;
            }
            if (this.fieldTab[i].fieldType === 2) {
                inputValue = document.querySelector("input[name=" + this.fieldTab[i].name + "]").value;
            }
            if (this.fieldTab[i].fieldType === 3) {
                inputValue = document.querySelector("input[name=" + this.fieldTab[i].name + "]").value;
            }
            if (this.fieldTab[i].fieldType === 4) {
                inputValue = document.querySelector("select[name=" + this.fieldTab[i].name + "]").value;
            }
            if (this.fieldTab[i].fieldType === 5) {
                if (document.querySelector("input[name=" + this.fieldTab[i].name + "]").checked) {
                    inputValue = "Tak";
                }
                else {
                    inputValue = "Nie";
                }
            }
            this.fieldTab[i].value = inputValue;
            this.getValueResult += "<p>" + this.fieldTab[i].label + ": " + this.fieldTab[i].value + "</p>";
        }
        document.getElementById('result').innerHTML = this.getValueResult;
        this.getValueResult = " ";
    };
    Form.prototype.render = function () {
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
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"text\", value=\"\"></p>";
                    break;
                case 1:
                    this.result += "<p>" + this.fieldTab[i].label + ": <textarea name=\"" + this.fieldTab[i].name + "\"></textarea></p>";
                    break;
                case 2:
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"date\", value=\"\"></p>";
                    break;
                case 3:
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"email\", value=\"\"></p>";
                    break;
                case 4:
                    this.result += "<p>" + this.fieldTab[i].label + ": <select name=\"" + this.fieldTab[i].name + "\" id=\"\">";
                    for (var j = 0; j < this.fieldTab[i].options.length; j++) {
                        this.result += "<option id=\"" + this.fieldTab[i].options[j] + "\">" + this.fieldTab[i].options[j] + "</option>";
                    }
                    this.result += "</select></p>";
                    break;
                case 5:
                    this.result += "<p>" + this.fieldTab[i].label + ": <input name=\"" + this.fieldTab[i].name + "\", type=\"checkbox\", value=\"\"></p>";
                    break;
            }
        }
        document.getElementById('form').innerHTML = this.result;
    };
    return Form;
}());
exports.Form = Form;
