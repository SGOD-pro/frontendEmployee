import axios from "axios";

const fetchJson = async () => {
    try {
        const response = await axios.get('./json/data.json');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}

export { fetchJson };