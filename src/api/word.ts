export async function getRandomWord(){
    try{
        const response = await fetch('https://random-word-api.herokuapp.com/word?length=5')
        const data = await response.json()
        console.log(data)
        return data[0]
    }
    catch(error){
        console.error(error)
    }   

}