var readTextFile = require("read-text-file");

function normalizeString(str) {
    try {
        const words = str.split(" ");
        const normalizedWords = words.map((word) => {
            const firstLetter = word[0].toUpperCase();
            const rest = word.slice(1).toLowerCase();
            return firstLetter + rest;
        });
        return normalizedWords.join(" ");
    } catch (error) {
        return str;
    }
}

function getNumbers() {
    return readTextFile.read("./user_list.txt").then((rs) => {
        const lines = rs.split("\n");
        let numbers = lines.map((line, index) => {
            if (index === 0) return false; // skip header (optional)
            const fields = line.split(",");
            let name = fields[2];
            let fijo = fields[3] !== undefined ? fields[3] : "";
            fijo = fijo.replace(" ", "").replace(/['"]+/g, "");
            let movil = fields[4] !== undefined ? fields[4] : "";
            movil = movil.replace(" ", "").replace(/['"]+/g, "");
            const number = movil !== "" ? movil : fijo;
            if (number === "") return false;
            name = name
                .replace(/['"]+/g, "")
                .replace("SUSPENDIDO", "")
                .replace("ACTIVO", "")
                .replace("(FACTURA)", "")
                .replace("(RECIBO)", "")
                .trim();
            return {
                name: normalizeString(name),
                phone: parseInt(number),
            };
        });
        numbers = numbers.filter((n) => n !== false);
        return numbers;
    });
}

module.exports = getNumbers;
