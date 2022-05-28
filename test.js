import sha256 from 'crypto-js/sha256';


export function getName() {
    console.log("My name is Jad")
    console.log(sha256("Hello"))
}