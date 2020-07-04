const form = document.getElementById("form");
const submit = document.getElementById("submit");

submit.disabled = true;

const state = {
    formFields: {},
    userUnput: {},
    message: {},
    inputStatus: {},
    validInput: false,
};

function showMessage(element, message) {
    let formControl = element.parentElement;
    if (message.success) {
        state.validInput = true;
        formControl.className = "form-control success";
    } else {
        state.validInput = false;
        formControl.className = "form-control error";
        formControl.querySelector("small").innerText = message.text;
    }
    state.inputStatus = {
        ...state.inputStatus,
        [element.name]: state.validInput,
    };
}

function checkEmailValid(email) {
    const lookLikeEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!lookLikeEmail.test(email.value)) {
        state.message = { text: `Email is not valid`, success: false };
    } else {
        state.message = { success: true };
    }
    showMessage(email, state.message);
}

function valueIsRequired(input) {
    state.message = { text: `${input.name} is required`, success: false };
    showMessage(input, state.message);
}

function checkIdentical(input1) {
    let allIputs = Array.from(form.elements);
    let input2 = allIputs[allIputs.indexOf(input1) - 1];
    if (input1.value !== input2.value) {
        state.message = { text: `Password not identical`, success: false };
    } else {
        state.message = { success: true };
    }
    showMessage(input1, state.message);
}

function allInputsValid(inputs) {
    let values = Object.values(inputs);
    return values.every((e) => e);
}

function changeHandelr(e) {
    const input = e.target;
    let value = input.value || input.checked;
    if (input.name == "Email") {
        checkEmailValid(input);
    } else if (input.name == "Password2") {
        checkIdentical(input);
    } else if (!value) {
        valueIsRequired(input);
    } else {
        state.message = { success: true };
        showMessage(input, state.message);
    }

    state.userUnput = { [input.name]: value };
    state.formFields = {
        ...state.formFields,
        ...state.userUnput,
    };

    if (
        form.getElementsByTagName("input").length ===
            Object.values(state.inputStatus).length &&
        allInputsValid(state.inputStatus)
    ) {
        submit.disabled = false;
    }else{
        submit.disabled = true;
    }
}
function submitHandelr(e) {
    e.preventDefault();
    console.log(state.formFields);
}

form.addEventListener("change", changeHandelr);
form.addEventListener("submit", submitHandelr);
