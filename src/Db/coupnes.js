const coupnes = [
    { name: "   ", amount: 4000 },
    { name: "GOD", amount: 10000 },
    { name: "NEW50", amount: 1000 }, 
    { name: "FREETRIP", amount: 70000 },
    { name: "DIWALI25", amount: 5000 },
    { name: "REPUBLICDAY", amount: 2026 },
    { name: "NIGHTLIGHT", amount: 2000 },
    { name: "WINTER15", amount: 1500 },
    { name: "LONGDRIVE", amount: 4000},
    { name: "FREEDOM", amount: 100 },
];

export default coupnes;
export const getCoupne = (name) => {
    const coupne = coupnes.find((coupne) => coupne.name === name);
    return coupne ? coupne : null;
}
export const getCoupneList = () => {
    return coupnes.map((coupne) => coupne.name);
}
export const removeCoupne = (name) => {
    const coupneIndex = coupnes.findIndex((coupne) => coupne.name === name);
    if (coupneIndex !== -1) {
        coupnes.splice(coupneIndex, 1);
        return true;
    }
    return false;
}