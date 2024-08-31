// Get all Works from API
try {
    const responseWorks = await fetch('http://localhost:5678/api/works');    
    const works = await responseWorks.json(); 
    console.log(works); 
    
    const responseCategories = await fetch('http://localhost:5678/api/categories');
    const categories = await responseCategories.json();
    console.log(categories);
}
catch (error) {
    throw new Error(error);
}


