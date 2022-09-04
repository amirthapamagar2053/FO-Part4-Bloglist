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


const favoriteBlog =(blogs) =>{
  let blogLikesarr = (blogs.map(blog => blog.likes))
  const index =blogLikesarr.indexOf( Math.max(...blogLikesarr));
  return blogs[index]  
}

module.exports = {
  dummy,totalLikes,favoriteBlog
}
