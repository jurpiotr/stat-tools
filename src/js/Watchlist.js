export class Watchlist {
   constructor(){
      this.currentList = JSON.parse(localStorage.getItem('watchlist')) || [];
   }
   createItem = (id, image, name ) => {
      const item = {
         id: id,
         image: image,
         name: name
      }
      return item;
   }
   getStorage = () => {
      const storage = JSON.parse(localStorage.getItem('watchlist')) || [];
      return storage;
   }
   add = (obj) => {
      console.log(obj)
      obj ? this.currentList.push(obj) : '';
      localStorage.setItem('watchlist', JSON.stringify(this.currentList));
   }
   contains = (id, text) => {
      let show = '';
      this.currentList.forEach((item, index, object) => {
         if(item.id === Number(id)){
            show = text;
         }
      });
      return show;
   }
}
