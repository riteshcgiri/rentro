import tokenConfig from "../../api/tokenConfig";


const getUser = async () => {
    try {
        const res = await tokenConfig.get(`/users/${userId}`);
        // console.log("User data:", res.data);
        return res;

    } catch (err) {
        // console.error("❌ Full error object:", err); // full raw object
        return err;
    }
};

export default getUser;