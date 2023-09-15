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
        status: "Operational / For calibration",
    },
    {
        equipmentName: "Autoclave",
        serialNumber: "17L-0093",
        modelNoOrManufacturer: "PTS-B50L",
        description: "vol. cap. 50L; w.p.: 0.22 mPaa @ 134 oC",
        quantity: 1,
        unitCost: 214384.62,
        propertyNumber: "2017-02-38-05140-01-014",
        acquisitionType: "GAA",
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
        acquisitionType: "Donation",
        status: "Operational",
    },
    {
        equipmentName: "Bead Rupture Homogenizer",
        serialNumber: "04A1200",
        modelNoOrManufacturer: "Bead raptor 4 / Omni",
        description: "220V",
        quantity: 1,
        unit: "unit",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope w/ camera",
        serialNumber: "5A42214",
        modelNoOrManufacturer: "Omni",
        description: "220V",
        quantity: 1,
        unit: "unit",
        status: "Operational",
    },

    // 15 Biological (blank) Microscopes

    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
    {
        equipmentName: "Biological Microscope",
        modelNoOrManufacturer: "XSP-13A",
        description: "1250x magnification / manual",
        quantity: 1,
        unit: "unit",
        acquisitionType: "GAA",
        status: "Operational",
    },
];

// prisma.createMany does not store the created elements just the counnt
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

console.log(`${updatedEquipment.length} equipment created and updated`);