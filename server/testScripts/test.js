let object = {}

object["hello"] = "World";

for(const property in object) {
    console.log(`${property}: ${object[property]}`);
}