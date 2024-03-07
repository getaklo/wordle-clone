export async function getRandomWord(length: number){
    try{
        const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${length}`)
        const data = await response.json()
        console.log(data)
        return data[0]
    }
    catch(error){
        console.error(error)
    }   

}

export async function isItAWord(word: string): Promise<boolean> {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            // Word exists and has definitions
            return true;
        } else if (data.title === "No Definitions Found") {
            // No definitions found for the word
            return false;
        } else {
            // Handle other cases if needed
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}