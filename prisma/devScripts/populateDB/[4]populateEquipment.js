import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const equipmentData = [
    {
        equipmentName: "Analytical Balance",
        serialNumber: "32202383",
        modelNoOrManufacturer: "Entris224-1S/Sartorius",
        description: "readability: 0.1mg",
        quantity: 1,
        unit: "unit",
        status: "For Preventive Maintenance",
    },
    {
        equipmentName: "Analytical Balance",
        serialNumber: "33405439",
        modelNoOrManufacturer: "Entris224-1S/Sartorius",
        description: "readability: 0.1mg",
        quantity: 1,
        unit: "unit",
        status: "Operaational / For caalibration",
    },
    {
        equipmentName: "Autoclave",
        serialNumber: "17L-0093",
        modelNoOrManufacturer: "PTS-B50L",
        description: "vol. cap. 50L; w.p.: 0.22 mPaa @ 134 oC",
        quantity: 1,
        unit: "unit",
        status: "Operational",
    },
    {
        equipmentName: "Autoclave",
        serialNumber: "071917MB010S",
        modelNoOrManufacturer: "STME / Market Forge Inddustries Inc.",
        description: "240 V; w.p. 17.8 psi @ 254 oF",
        quantity: 1,
        unit: "unit",
        status: "Operational",
    },
];

// prisma.createMany does not 
let createdEquipment = [];
// Add to the dataabase
for (const equipment of equipmentData) {
    const created = await prisma.inventoryOfEqupiment.create({
        data: equipment,
    });
    createdEquipment.push(created);
}

// Update the equipment code
let updatedEquipment = [];    
for (const equipment of createdEquipment) {
    const updated = await prisma.inventoryOfEqupiment.update({
        where: { id: equipment.id },
        data: {
            equipmentCode: `LE-${equipment.equipmentCodeNumber}`,
        },
    });
    updatedEquipment.push(updated);
}   

console.log(updatedEquipment);