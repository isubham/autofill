

INPUTS_TO_TARGET = ['text', 'email'];
LOAD_MESSAGE = 'Jobhunt autofill';

function repeatInputs() {
    // get all inputs
    const inputs = document.getElementsByTagName("input")
    // iterate
    const rInputs = []
    for (i in inputs) {
        if (INPUTS_TO_TARGET.indexOf(inputs[i].type) > -1) {
            rInputs.push(inputs[i]);
        }
    }
    return { rInputs, inputs };
};

function getLabelOfInput(input)  {
    input
}


function fillInputs(inputs, myInfo) {

    // fill about 
    let allInfo = { ...myInfo.about, ...myInfo.links, ...myInfo.address };
    const infoLeft = { ...allInfo };
    const inputsWithTouch = inputs.map(e => ({ input: e, touched: false }));

    for (key in allInfo) { // key is always lower
        let value = allInfo[key];
        // find the input field with that name
        inputsWithTouch.forEach(inputWithTouch => {
            const { input } = inputWithTouch;
            const inputNameProp = input.name.toLowerCase();
            const absoluteMatch = inputNameProp == key;
            const isKeyInInputNameProp = inputNameProp.indexOf(key) > -1;
            const matched = absoluteMatch || isKeyInInputNameProp;
            if (matched) {
                input.value = value;
                delete infoLeft[key];
                inputWithTouch.touched = true;
            }
        })

    }

    // send this for analytics
    const inputsNotFilled = inputsWithTouch.filter(e => !e.touched);

    // send to analytics to improve
    const improvement = { infoLeftKeys: Object.keys(infoLeft), inputsNotFilled };
    return { improvement };
}

function main() {
    console.log(LOAD_MESSAGE);

    // read this info from UI and store it in web storage and then read later on
    let myInfo = {
        about: {
            name: "Subham Kumar",
            firstName: "Subham",
            lastName: "Kumar",
            fullname: "Subham Kumar",
            email: "subhamkumarchandrawansi@gmail.com",
            mobile: "8002299020",
            phone: "8002299020",
            org: "Recro"
        },

        links: {
            linkedin: "https://linkedin.com/in/isubham",
            twitter: "",
            github: "https://github.com/isubham",
            website: "https://isubham.github.io",
            portfolio: "https://isubham.github.io",
            other: "https://isubham.github.io/blog"
        },

        address: {
            address1: "chandwara",
            pincode: "825409",
            state: "Jharkhand",
            country: "India",
            city: "Jhumri Telaiya",
        }
    }

    let { rInputs, inputs } = repeatInputs();
    const { improvement } = fillInputs(rInputs, myInfo);
    console.log("input not filled ", improvement.inputsNotFilled);
    console.log("all inputs", inputs);

    console.log(`targeted ${improvement.inputsNotFilled.length / rInputs.length * 100}%`);

}

main()
