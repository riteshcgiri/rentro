import tokenConfig from "../../api/tokenConfig"


export default getCarById = async (id) => {
    try {
        const res =   await tokenConfig.get(`/cars/car/${id}`)
        return res;          
    } catch (error) {
        return error
    }
}