import { Tiktoken } from 'js-tiktoken/lite';
import o200k_base from 'js-tiktoken/ranks/o200k_base';

const enc = new Tiktoken(o200k_base);

const userQuery = "hey there, i am gurkirat singh ok ok";
const tokens = enc.encode(userQuery);

console.log({ tokens });

const inputTokens = [
    48467, 1354, 11,
    575, 939, 30466,
    44882, 266, 6211,
    71, 4763, 4763
];

const decode = enc.decode(inputTokens);
console.log({ decode });


// CUSTOM TOKENIZER
// class AsciiTokenizer {
//     encode(text){
//         // convert the character to ASCII code
//         return [...text].map(char => char.charCodeAt(0));
//     }

//     decode(tokens){
//         // convert the tokens i.e. ASCII code to characters
//         return tokens.map(code => String.fromCharCode(code)).join('');
//     }
// }

// const tokenizer = new AsciiTokenizer();

// const userQuery = "hey there, i am rich now";
// const encoded = tokenizer.encode(userQuery);
// console.log(encoded);

// const decoded = tokenizer.decode(encoded);
// console.log(decoded);
