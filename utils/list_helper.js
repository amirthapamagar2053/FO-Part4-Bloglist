const dummy = (blogs) => {
    return 1
  }
  
  
const totalLikes = (blogs) =>{
  if(blogs.length === 1){
    return blogs[0].likes
  }
  else{
    let totallike=0;
    totallike=blogs.reduce((sum,blogs) => sum+blogs.likes,0)
    return totallike
  }
}



module.exports = {
  dummy,totalLikes
}
