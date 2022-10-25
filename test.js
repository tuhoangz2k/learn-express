console.log(1)
async function wibu (){
    const result = await fetch('https://api.jikan.moe/v4/random/anime')
    console.log('done')
    console.log(result)
}
wibu()
console.log(2)