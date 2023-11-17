import { newUnitValues, saveAddRowConfirmButton, updateTable, discardAdd, addUnitModalIsOpen } from "./Units.vue";

// Confirm add new record
export async function confirmAddRow() {
// Second confirmation press check
if (newUnitValues.value.unit == null) {
saveAddRowConfirmButton.value.text = "PLEASE FILL ALL PAGES";
saveAddRowConfirmButton.value.color = "red";
return null;
} else if (saveAddRowConfirmButton.value.text === "ADD" ||
saveAddRowConfirmButton.value.text === "PLEASE FILL ALL PAGES") {
saveAddRowConfirmButton.value.text = "PRESS AGAIN TO CONFIRM";
saveAddRowConfirmButton.value.color = "red";
return null;
}

// Add new record to database
const request = await useFetch("/api/db/editForms/updateUnits", {
method: "POST",
body: {
user,
change: { ...newUnitValues.value },
changeType: "add",
},
});

updateTable();
discardAdd();
addUnitModalIsOpen.value = false;
}
