class Category {
    id: string;
    title: string;
    description: string;
    color: string;
  
    constructor(id: string, title: string, description:string, color: string) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.color = color;
    }
  }
  
  export default Category;
  